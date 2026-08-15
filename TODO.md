# Before this page goes live

Everything below is unconfirmed. Nothing here was invented — where a fact was
missing, the page either omits the claim or routes the visitor to a phone call.

## 0. Open

**The collection centre's printed address is a stand-in.** The map pin is
exact — it comes from the owner's own Google Maps listing at
`20.5024353, 86.4247906` — but the address *text* on the card is a guess:

```
Near Old Medical
Kendrapara town
Kendrapara, Odisha 754211
```

Replace `line1`, `line2` and `postalCode` for the `collection` entry in
`lib/site.ts` with the address as it would be written on a signboard.

**The laboratory has no Google Maps listing yet.** Its map is a name-and-
address search rather than an exact pin. Once it is listed, add `coords` and
`mapsUrl` to the `lab` entry in `lib/site.ts` — `mapEmbedFor` and
`mapLinkFor` already branch on whether those exist.

## 1. Blocking — none left

Every factual question has been answered by the owner:

- **Opening hours** — 6:00 AM – 9:00 PM, every day. Shown in the Timings card,
  surfaced in the hero, referenced in the fasting FAQ, and published in the
  structured data so Google can show "Open now".
- **The "(O)" marker** on the printed test list — dropped entirely. All 73 tests
  are listed as plain names with no annotation.
- **Second phone number** — deliberately not used. Only `78478 89009` appears
  anywhere on the page.
- **WhatsApp** — confirmed on the same handset as `78478 89009`.

The only remaining pre-launch step is the domain (§3).

## 2. Claims deliberately left OFF the page

- **NABL / ISO accreditation** — you answered "I don't know". A false accreditation
  claim is a regulatory and reputational risk, so it is not on the page anywhere.
  If you hold it, send the certificate number and it becomes a strong trust badge.
- **Pathologist name, qualification and registration number** — never invented. A
  named MD Pathology signatory is the single strongest trust element a diagnostics
  centre can display. Worth adding if you have one.
- **Prices** — the FAQ says prices depend on the test and to call. No number is printed.
- **"Daily controls run alongside it"** — step 03 of the How-it-works section
  claims daily quality-control runs. This came from the reference design you
  supplied, not from anything you confirmed. It is a specific QC practice
  claim: if you don't actually run daily controls, tell me and I'll change the
  line to "so the result doesn't depend on who is on shift", which makes the
  same point about automation without asserting a QC schedule.
- **Turnaround promises beyond "most reports the same day"** — kept deliberately soft.

## 3. Domain

Nothing to do to deploy — the GitHub Actions workflow derives the site URL from
the repository itself, so canonical tags, the sitemap and Open Graph images are
correct on a project site with no configuration. See [DEPLOY.md](DEPLOY.md).

Worth doing eventually: a real domain. `username.github.io/repo` ranks worse for
local searches like "blood test near Ichhapur" than `swayamsiddhadiagnostics.in`
would, and it is harder to say out loud to a patient. DEPLOY.md has the steps.

## 4. Photography — the honest assessment

The equipment photos are a genuine asset: the **Erba EM 200 NEO**, **H 560** and
**Carestream DryView 5850** are all legible in them, and named equipment is the
most persuasive proof a local lab has. They are used prominently.

`front.webp` and `reception.webp` were shot on opening day — protective film still
on the panels, cardboard boxes, an empty reception desk. `front.webp` is used small,
with the job of "look for this signboard", which is all it can honestly carry.
`reception.webp` is **not used at all**.

Worth reshooting when convenient, and these three would earn their place:

1. A technician at the analyser bench, mid-task, in a lab coat.
2. The reception desk in use — a real person behind it, film off the panels.
3. The X-ray room with the machine visible.

## 5. Deferred — Light Rays in the hero

You looked at Magic UI's Light Rays component and chose to hold off, with the
hero as the intended location. Nothing was added to the codebase. Two notes for
whenever you pick this up:

- **The stock component needs `motion/react`** (~50KB gzipped), which is not in
  the stack. Everything it animates is opacity and rotation, so it can be
  rebuilt in pure CSS with the same props and no dependency. That is the
  better route for an audience on mid-range Android over rural data.
- **The hero needs the blend mode changed.** The rays use `mix-blend-screen`,
  which brightens what is underneath. On the cream `#faf8f3` hero there is
  almost nothing left to brighten, so they render as invisible or muddy. It
  would need `multiply` or `soft-light` with a hand-tuned colour. The effect
  works as designed on the two dark `#08240f` surfaces (Equipment band, final
  CTA) if you ever want it somewhere it fights the design less.

## 6. Nice to have

- **Google Business Profile** — the map embed searches by name and address. Once the
  profile is verified, the pin becomes exact and the listing starts ranking.
- **A real report sample** (with patient details removed) would let people see the
  letterhead before they commit.
