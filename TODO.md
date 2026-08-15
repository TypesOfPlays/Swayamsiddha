# Before this page goes live

Everything below is unconfirmed. Nothing here was invented — where a fact was
missing, the page either omits the claim or routes the visitor to a phone call.

## 0. Open

**The laboratory is not on Google Maps.** This is the single highest-value
item left on this list — bigger than anything on the website itself.

The collection centre has a listing (pin `20.5024353, 86.4247906`, which is
why its map is exact). The laboratory does not, so its map is Google
guessing from the address text. More importantly, a business with no Google
Business Profile cannot appear in the map pack — the three results with pins
that sit above the normal blue links for searches like "blood test near me".
That block is where local searches actually get decided.

Create the profile at google.com/business, verify it, then add `coords` and
`mapsUrl` to the `lab` entry in `lib/site.ts` — `mapEmbedFor` and
`mapLinkFor` already branch on whether those exist. See §7 for the full
ranking plan this sits inside.

**The collection centre's address is confirmed** by the owner as written.

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

## 3. Domain — done

Live on `swayamsiddhadiagnostics.in`. Registrar email verified. HTTPS is
enforced, `www` redirects to the apex, and the old
`typesofplays.github.io/swayamsiddha/` address redirects to the domain, so
there is no duplicate copy of the site competing with itself in search.

Search Console is verified on the new domain and the sitemap is submitted.

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

## 7. Ranking plan

### The honest shape of it

For a diagnostics centre, **the website is not where local rank is decided.**
Somebody in Kendrapara searching "blood test near me" gets a block of three
results with map pins above the blue links. That block is the Google
Business Profile index, not the web index. Most people tap it and never
scroll. Everything the website does well — structured data, speed, clean
headings — mostly helps you *confirm* a listing that already exists.

So the order below is deliberate. Steps 1–3 are worth more than everything
after them combined, and none of them are code.

### 1. Google Business Profile for the laboratory — do this first

There is no listing for the main lab. Until there is, it cannot appear in
the map pack at all, for any search, at any distance. Create it at
google.com/business, then:

- Primary category **Diagnostic center**. Secondaries: *Medical laboratory*,
  *X-ray lab*, *Blood testing service*. The primary category is a genuine
  ranking factor — not a label.
- Name exactly `Swayamsiddha Diagnostics`. Not "Swayamsiddha Diagnostics —
  Best Lab in Kendrapara". Keyword-stuffed names get listings suspended, and
  competitors do report them.
- Hours 6:00 AM – 9:00 PM, all seven days. The site already publishes these
  in structured data, so the two agree.
- Website field → `https://swayamsiddhadiagnostics.in`
- Phone `+91 78478 89009` — the same number as the site and the signboard.
- Verification is usually by postcard to the address, so it takes 1–2 weeks.
  Start it now; nothing else in this list works without it.

Then link the collection centre to it as a second location under the same
business rather than leaving it as an unrelated listing. The site's
structured data already declares it a `department` of the lab, so this makes
the two sources agree.

### 2. Reviews

After proximity, review volume and recency are the strongest things you can
actually move in the map pack. A lab with 40 recent reviews outranks one
with 4 from two years ago at the same distance.

- Ask every patient collecting a report. The moment a report is handed over
  is the only moment this ever works.
- A printed QR code at the desk pointing at the review link removes the
  friction of searching for you.
- Reply to all of them, including the bad ones. Replies are visible to both
  Google and the next patient reading.
- Never buy reviews and never post them yourself. Removal is not the worst
  case — suspension of the listing is.

### 3. NAP consistency, then the directories

NAP = name, address, phone. It must be **byte-identical** everywhere it
appears. `78478 89009` on the site, `7847889009` on Justdial and
`+91-78478-89009` on Practo read as three businesses to a crawler and dilute
all three.

The list worth doing for an Odisha diagnostics centre, roughly in order:
Google Business Profile, Bing Places, Justdial, Practo, Sulekha, Apple
Business Connect, IndiaMART. Free, tedious, and it is the ordinary price of
local rank.

### 4. What the website still needs — and it is not more keywords

The on-page work is done: title, headings, canonical, sitemap, structured
data, image weight, mobile layout. Grinding further on those returns almost
nothing now. Two real gaps remain, both about **trust rather than keywords**:

- **A named pathologist**, with qualification and registration number.
  Google holds health and medical pages to a higher bar than ordinary pages
  — it wants to see who is accountable for the results. A page that names an
  MD Pathology signatory is a different class of page to one that does not,
  and it is also the thing a patient looks for. This is the highest-value
  addition left to the site itself.
- **Accreditation**, if it exists. Still unanswered, still off the page.

### 5. Pages that could exist later

One page per major test — "CBC test in Kendrapara", "Lipid profile in
Kendrapara", "Thyroid test in Kendrapara" — each with what the test is, the
fasting requirement, and the turnaround. That is real, slow, useful content
that catches searches the single landing page never will.

Worth doing only **after** steps 1–3. Ten thin test pages on a business with
no Business Profile rank for nothing.

### 6. Expectations

Nothing here works in a week. A new Business Profile takes 1–2 weeks to
verify and a further 4–8 to settle in the map pack. Reviews accumulate at
the speed of patients. And proximity is a factor nobody can buy: for a
searcher standing in Kendrapara town the collection centre is the nearer
pin, and for one near Ichhapur it is the lab. That is why both belong on the
site and both belong on Google.

Watch it in Search Console: Performance → Queries tells you what people
actually typed. That is a better guide to the next page to write than any
keyword tool.

## 6. Nice to have

- **Google Business Profile** — the map embed searches by name and address. Once the
  profile is verified, the pin becomes exact and the listing starts ranking.
- **A real report sample** (with patient details removed) would let people see the
  letterhead before they commit.
