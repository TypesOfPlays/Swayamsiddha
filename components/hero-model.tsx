"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/**
 * The entrance, in three dimensions, as the hero's subject.
 *
 * The source mesh carries geometry and nothing else — no materials, no UVs,
 * no normals — so everything you see here is applied rather than shipped.
 * Colour comes from a vertical gradient baked into vertex colours: the
 * brand's deep green at the plinth rising to a warm stone at the roofline,
 * which grounds the building the way real light does. Normals are computed
 * on load; at 98k triangles that is a few milliseconds and it saves an
 * attribute on the wire.
 *
 * Everything expensive is conditional. three.js and the model are dynamic
 * imports, so nothing here is in the initial bundle and the page's first
 * paint is unaffected. The render loop stops when the canvas leaves the
 * viewport or the tab goes to the background, so a visitor reading the test
 * list is not paying for a building they cannot see.
 *
 * If WebGL is missing or anything throws, `onStatus("failed")` hands the
 * hero back to the photograph. That path is not a nicety: a meaningful share
 * of low-end Android browsers either lack WebGL or lose the context under
 * memory pressure, and this page's audience is mostly on exactly those
 * handsets.
 */

/** Bottom and top of the vertical colour ramp, from the brand palette. */
const RAMP_BASE = 0x0f3d18; // --color-brand-deep
const RAMP_TOP = 0xe6dcc6; // warm stone, a touch deeper than --color-canvas

/**
 * The model is fetched once per page, however many times the effect runs.
 *
 * Without this it was measured going over the wire five times on a single
 * load — React's development double-invoke, plus a remount — which is 1.5 MB
 * for a 314 KB file. Caching the promise rather than the parsed result is
 * deliberate: each mount still parses its own geometry, so disposing on
 * unmount stays correct and a later mount is not handed a freed buffer.
 */
let modelBuffer: Promise<ArrayBuffer> | null = null;

function fetchModel(url: string) {
  modelBuffer ??= fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`model ${r.status}`);
      return r.arrayBuffer();
    })
    .catch((err) => {
      /* Let a later attempt retry rather than caching the failure forever. */
      modelBuffer = null;
      throw err;
    });
  return modelBuffer;
}

export function HeroModel({
  className = "",
  onStatus,
}: {
  className?: string;
  onStatus?: (s: "loading" | "ready" | "failed") => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  /* Held in a ref, and synced in an effect rather than during render, so the
     setup effect below can stay dependency-free — it must run exactly once,
     and a caller passing an inline arrow would otherwise rebuild the whole
     scene on every parent render. */
  const statusRef = useRef(onStatus);
  useEffect(() => {
    statusRef.current = onStatus;
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    const fail = () => {
      if (disposed) return;
      setFailed(true);
      statusRef.current?.("failed");
    };

    (async () => {
      /* Half a megabyte of renderer and mesh is a fair trade on a laptop and
         a poor one on a 2G connection outside Kendrapara. Where the browser
         tells us plainly that data is expensive or the device is small, the
         photograph is the better hero and nothing further is fetched. Only
         explicit signals count — an absent Network Information API means a
         desktop browser, not a slow phone. */
      type Conn = { saveData?: boolean; effectiveType?: string };
      const nav = navigator as Navigator & {
        connection?: Conn;
        deviceMemory?: number;
      };
      const conn = nav.connection;
      const frugal =
        conn?.saveData === true ||
        conn?.effectiveType === "slow-2g" ||
        conn?.effectiveType === "2g" ||
        (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory < 2);

      if (frugal) {
        fail();
        return;
      }

      /* Cheapest possible check before pulling down the library. */
      try {
        const probe = document.createElement("canvas");
        if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
          fail();
          return;
        }
      } catch {
        fail();
        return;
      }

      let THREE: typeof import("three");
      let GLTFLoader: typeof import("three/examples/jsm/loaders/GLTFLoader.js")["GLTFLoader"];
      let MeshoptDecoder: (typeof import("three/examples/jsm/libs/meshopt_decoder.module.js"))["MeshoptDecoder"];

      try {
        [THREE, { GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/libs/meshopt_decoder.module.js"),
        ]);
      } catch {
        fail();
        return;
      }
      if (disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(host.clientWidth, host.clientHeight, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

      /* Warm key from the upper right, cool fill from the left, and a
         hemisphere that bounces the brand green up from below. Three lights
         doing the job an environment map would otherwise need a texture for. */
      const key = new THREE.DirectionalLight(0xffe9c4, 2.4);
      key.position.set(3, 4.2, 2.6);
      const fill = new THREE.DirectionalLight(0xcfe0ff, 0.75);
      fill.position.set(-3.4, 1.2, 1.8);
      const rim = new THREE.DirectionalLight(0xe8b44a, 1.1);
      rim.position.set(-1.2, 1.6, -3.2);
      const hemi = new THREE.HemisphereLight(0xfaf8f3, 0x1d6b24, 1.15);
      scene.add(key, fill, rim, hemi);

      const pivot = new THREE.Group();
      scene.add(pivot);

      let frame = 0;
      let running = false;
      let mesh: import("three").Mesh | null = null;

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      let gltf: import("three/examples/jsm/loaders/GLTFLoader.js").GLTF;
      try {
        /* asset() carries the base path — the same reason every <Image src>
           goes through it. A bare "/models/…" 404s on a project site. */
        const buffer = await fetchModel(asset("/models/entrance.glb"));
        gltf = await loader.parseAsync(buffer.slice(0), "");
      } catch {
        renderer.dispose();
        canvas.remove();
        fail();
        return;
      }
      if (disposed) {
        renderer.dispose();
        canvas.remove();
        return;
      }

      /* One primitive, positions only. Find it, give it normals, colour it. */
      let geometry: import("three").BufferGeometry | null = null;
      gltf.scene.traverse((child) => {
        if (!geometry && (child as import("three").Mesh).isMesh) {
          geometry = (child as import("three").Mesh).geometry;
        }
      });

      if (!geometry) {
        renderer.dispose();
        canvas.remove();
        fail();
        return;
      }

      const geo = geometry as import("three").BufferGeometry;
      geo.computeVertexNormals();
      geo.computeBoundingBox();

      const bbox = geo.boundingBox!;
      const size = new THREE.Vector3();
      const centre = new THREE.Vector3();
      bbox.getSize(size);
      bbox.getCenter(centre);

      /* Vertical ramp, in linear space so the tone mapper receives sensible
         values rather than gamma-encoded ones. */
      const pos = geo.attributes.position;
      const colours = new Float32Array(pos.count * 3);
      const lo = new THREE.Color(RAMP_BASE).convertSRGBToLinear();
      const hi = new THREE.Color(RAMP_TOP).convertSRGBToLinear();
      const mixed = new THREE.Color();
      const spanY = size.y || 1;

      for (let i = 0; i < pos.count; i++) {
        const t = THREE.MathUtils.clamp((pos.getY(i) - bbox.min.y) / spanY, 0, 1);
        /* Eased so the green hugs the base instead of washing halfway up. */
        mixed.copy(lo).lerp(hi, t * t * (3 - 2 * t));
        colours[i * 3] = mixed.r;
        colours[i * 3 + 1] = mixed.g;
        colours[i * 3 + 2] = mixed.b;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colours, 3));

      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.72,
        metalness: 0.04,
      });

      mesh = new THREE.Mesh(geo, material);
      mesh.position.sub(centre);
      pivot.add(mesh);

      /* Frame it: normalise scale so the camera distance is independent of
         whatever units the export happened to use. */
      const longest = Math.max(size.x, size.y, size.z) || 1;
      const scale = 2 / longest;
      pivot.scale.setScalar(scale);
      pivot.rotation.y = -0.5;
      pivot.rotation.x = 0.06;

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        /* Pull back on narrow, tall boxes so the building never crops. */
        camera.position.set(0, 0.28, camera.aspect < 0.9 ? 5.2 : 4.3);
        camera.lookAt(0, -0.05, 0);
        camera.updateProjectionMatrix();
      };
      resize();

      let pointerX = 0;
      let pointerY = 0;
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
        pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      let last = performance.now();
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;

        /* One revolution in roughly ninety seconds. Slow enough that it
           reads as a considered object rather than a spinning product. */
        if (!reduced) pivot.rotation.y += dt * 0.07;

        /* The camera leans toward the pointer; the model itself never
           follows it, which keeps the motion architectural. */
        const targetX = pointerX * 0.22;
        const targetY = 0.28 - pointerY * 0.14;
        camera.position.x += (targetX - camera.position.x) * Math.min(dt * 3, 1);
        camera.position.y += (targetY - camera.position.y) * Math.min(dt * 3, 1);
        camera.lookAt(0, -0.05, 0);

        renderer.render(scene, camera);
      };

      const start = () => {
        if (running || disposed) return;
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      };

      /* Render once immediately so the first frame is correct even if the
         loop is never allowed to start (reduced motion, or off-screen). */
      renderer.render(scene, camera);
      statusRef.current?.("ready");

      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0.01 },
      );
      io.observe(host);

      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVisibility);

      const ro = new ResizeObserver(() => {
        resize();
        if (!running) renderer.render(scene, camera);
      });
      ro.observe(host);

      window.addEventListener("pointermove", onPointer, { passive: true });

      /* A lost context on a memory-starved handset should fall back to the
         photograph rather than leaving a blank rectangle. */
      const onLost = (e: Event) => {
        e.preventDefault();
        stop();
        fail();
      };
      canvas.addEventListener("webglcontextlost", onLost);

      teardown = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointer);
        canvas.removeEventListener("webglcontextlost", onLost);
        geo.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  if (failed) return null;

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
