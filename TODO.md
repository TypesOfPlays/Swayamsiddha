# Open items and the ranking plan

The page is live at `swayamsiddhadiagnostics.in` and nothing blocks it. What
remains is listed below, in rough order of what it is worth.

Nothing on the page was invented — where a fact was missing, the page either
omits the claim or routes the visitor to a phone call.

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
`mapLinkFor` already branch on whether those exist.

**Every field to paste in is written out in [GOOGLE-BUSINESS.md](GOOGLE-BUSINESS.md).**
§6 is the wider ranking plan this sits inside.

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

The domain is live and verified (§3). Nothing blocks this page.

## 2. Claims deliberately left OFF the page

- **NABL / ISO accreditation** — the owner has confirmed the lab is **not
  accredited**. It stays off the page permanently. This is ordinary for a local
  lab and nothing on the page depends on it. If that ever changes, the
  certificate number and issuing body turn it into a strong trust badge.
- **Pathologist name, qualification and registration number** — confirmed: there
  is no named pathologist, so nothing is claimed. This remains the largest gap
  on the page, and it is a real one rather than cosmetic — see §6.4.
- **Prices** — the FAQ says prices depend on the test and to call. No number is printed.
- **Turnaround promises beyond "most reports the same day"** — kept deliberately soft.

Confirmed and therefore **kept** on the page:

- **"Daily controls run alongside it"** — step 03 of the How-it-works section.
  The owner has confirmed daily quality controls are genuinely run, so the
  line stands as written.

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

## 6. Ranking plan

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
the map pack at all, for any search, at any distance.

**[GOOGLE-BUSINESS.md](GOOGLE-BUSINESS.md) has every field written out**, for
both the new lab listing and the corrections needed on the collection
centre's existing one. It is a copy-paste job.

Two things from it worth repeating here, because they are the ones people get
wrong:

- The name is exactly `Swayamsiddha Diagnostics`. Keyword-stuffed names get
  listings suspended, not demoted, and competitors do report them.
- Verification is usually a postcard, so it takes 1–2 weeks. Start it now —
  nothing else in this list works without it.

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
nothing now.

One real gap remains, and it is about **trust rather than keywords**: there is
**no named pathologist**. Google holds health and medical pages to a higher
bar than ordinary pages — it wants to see who is accountable for a result, and
so does the patient reading the page. A page naming an MD Pathology signatory
with a registration number is a different class of page to one that doesn't.

The owner has confirmed there is no such person on record, so nothing is
claimed and nothing can be. It stays listed here because it is the single
highest-value addition the *site* could ever receive — if a pathologist is
ever engaged, even part-time, that changes the page more than any other edit
available.

Accreditation is settled: the lab is not accredited, and the claim stays off
permanently (§2).

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

## 7. Nice to have

- **A real report sample** (with patient details removed) would let people see the
  letterhead before they commit.
- **The three marquee lines I dropped** from the equipment band — DR flat-panel
  detector, fluorescence immunoassay, 12-lead ECG — are plausible for this
  equipment but were never confirmed, so they are off. Confirm any of them and
  they go back.
