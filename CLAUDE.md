# Website

A marketing landing page. The goal of every page is conversion: a visitor should
understand what this is, believe it, and act — without scrolling past dead space
or generic filler.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **shadcn/ui** for primitives (built on Radix) — add components with the shadcn
  CLI, don't hand-roll dialogs, dropdowns, or form controls
- Brand assets live in `assets/logo/` and `assets/img/`. Use what's there before
  generating anything new.

## Design direction — locked

**High-end agency polish.** Expensive-feeling, not loud. Precise spacing rhythm,
real light-modeled shadows, restrained purposeful motion, typography that carries
the hierarchy instead of decoration doing it.

This direction is a decision, not a starting point. Do **not** drift toward
brutalist, neon, glassmorphic, or motion-maximalist treatments unless I ask.

### Skills to use for design work

Invoke these — don't approximate them from memory:

| When | Skill |
|---|---|
| Starting or reshaping any page/section | `high-end-visual-design` |
| Component polish, interaction feel, animation decisions | `emil-design-eng` |
| Layout, color, type pairing, product-type patterns | `ui-ux-pro-max` |
| Tailwind + shadcn implementation details, theming, dark mode | `ui-styling` |
| Overall aesthetic direction when a section feels templated | `frontend-design` |

Load at most two or three per task. `high-end-visual-design` sets the bar;
`emil-design-eng` refines what's already built. Running both plus three others at
once produces mush.

### Skills that are installed but OFF by default

`minimalist-ui`, `industrial-brutalist-ui`, `gpt-taste`, `stitch-design-taste`,
`design-taste-frontend`, `design-taste-frontend-v1`, `brandkit`,
`imagegen-frontend-web`, `imagegen-frontend-mobile`, `image-to-code`,
`full-output-enforcement`.

These conflict with the locked direction or add cost we haven't opted into. Use
them only when I name one explicitly. Two worth knowing about:

- `imagegen-frontend-web` — generates one reference image per section before
  coding. Slower, noticeably better results. Ask if a section is visually
  ambitious and I might want it.
- `redesign-existing-projects` — audit-first upgrade of pages that already exist.
  Right tool once there's real code to improve.

## Mandatory workflow

**Design review before reporting done.** Every UI task ends with a critique pass —
use the `impeccable` skill (or `redesign-existing-projects` for existing pages) to
review what was just built against the direction above, then fix what it finds.
Only then report completion.

Look specifically for:

- Spacing that's uniform where it should have rhythm
- Type scale with too little contrast between levels
- Default shadows, default border radii, default gray — the templated tells
- Sections that repeat the same left-text/right-image composition
- Missing states: hover, focus, loading, empty, error
- Anything that would break below 768px

Report what the review found and what you changed. If a finding is real but you
chose not to fix it, say so and why.

## Not mandatory (ask first)

- Generating reference images before coding
- Running the page in a real browser to verify
- Adding dependencies beyond the stack above

If you think one of these is warranted for a specific task, say so and let me
decide. Don't do it silently.

## MCP servers available

- **Figma** — if I share a figma.com URL, pull the real design with
  `get_design_context`. Never eyeball a screenshot when the file is reachable.
- **Playwright / Browser** — for loading the site, screenshotting, checking
  console errors. Available on request, not automatic.

## MCPmarket plugin (`mcpmarket-me`)

Installed and enabled at **user level**, so it affects every project, not just
this one. It links sessions to an MCPmarket toolkit and ships one skill,
`mcpmarket-me:intent-engine`.

**What it is for:** describe a workflow in plain language and have it generate
the matching Claude Code extension — a hook, skill, subagent, slash command,
settings change or plugin.

**It cannot do that yet.** Do not treat `intent-engine` as an available tool
until the gaps below are closed:

- It is marked `user-invocable: false`. It is only Layer 1 of a multi-skill
  system and hands off to `extension-guide`, `smart-scaffold` and an
  `extension-concierge` — none of which are installed.
- It declares six dependency skills (`cc-ref-hooks`, `cc-ref-skills`,
  `cc-ref-settings`, `cc-ref-subagents`, `cc-ref-plugins`,
  `cc-ref-permissions`). None are present.
- The toolkit reported **0 skills synced** at session start, so the MCP side is
  empty. Add skills at mcpmarket.com, then restart Claude Code so the MCP
  server connects.

**Hooks it installs**, worth knowing because they run in this repo too:

- `SessionStart` → `hook-shim.sh`, syncs toolkit skills
- `PostToolUse` and `PostToolUseFailure` matching `Skill` →
  `shared/skill-invocation.sh`, which reports every skill call to MCPmarket

**Credential:** the plugin keeps an API token in plaintext in its `.mcp.json`
under `~/.claude/plugins/`. That is outside this repo so it will not be
committed, but rotate it at mcpmarket.com if it is ever exposed.

## Conventions

- Match the surrounding code's naming, comment density, and idiom
- Semantic HTML — sections, headings in order, real landmarks
- Every interactive element reachable and visible by keyboard
- No placeholder copy shipped as final. If copy is a stand-in, mark it.
