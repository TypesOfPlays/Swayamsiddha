# Open items and the ranking plan

The page is live at `swayamsiddhadiagnostics.in` and nothing blocks it. What
remains is listed below, in rough order of what it is worth.

Nothing on the page was invented — where a fact was missing, the page either
omits the claim or routes the visitor to a phone call.

## 0. Locations — settled

Both branches are pinned exactly and both are on Google Business.

| | Coordinates | Listing |
|---|---|---|
| Laboratory | `20.4788066, 86.4452888` | `/g/11nr14147m` |
| Collection centre | `20.5024353, 86.4247906` | linked |

They sit 3.39 km apart, which matches the story the page tells — the lab out
at Shamagudia, the centre closer to town. Both pairs are published as
`GeoCoordinates` in the structured data, so a search engine knows how far a
searcher is from each door instead of having to geocode a rural postal
address. Distance is most of what decides which businesses appear on the map
above the results, and "Main Chhagharia Road" is not a unique string.

The collection centre's address text is confirmed by the owner as written.

One trap worth recording, because whoever updates a pin next will hit it: a
resolved Google Maps URL contains **two** coordinate pairs. The `/@…` pair is
wherever the camera happened to sit — it was 32 m off here — and the
`!3d…!4d…` pair is the place itself. Use the second. A share link copied from
Google *Search* rather than the Maps app carries neither.

Still worth a pass while the listings are open:
[GOOGLE-BUSINESS.md](GOOGLE-BUSINESS.md) has every field written to match this
site, and flags three likely fixes on the collection centre's listing — its
name, its category, and linking it to the lab so the two stop competing for
the same searches. §6 is the wider ranking plan.

## 1. Blocking — none left

Every factual question has been answered by the owner:

- **Opening hours** — 6:00 AM – 9:00 PM, every day. Shown in the Timings card,
  surfaced in the hero, referenced in the fasting FAQ, and published in the
  structured data so Google can show "Open now".
- **The "(O)" marker** on the printed test list — dropped entirely. All 73 tests
  are listed as plain names with no annotation.
- **Second phone number** — `94397 79118` stays off, confirmed twice. Only
  `78478 89009` appears on the page, and it is the number to use on Google and
  every directory. Inconsistent phone numbers read as separate businesses and
  weaken all of them.
- **Flat-panel X-ray detector** — confirmed. The image goes straight to the
  screen with no cassette to develop, which is now stated in the Equipment
  section and the scrolling band. ECG lead count and assay chemistry were *not*
  confirmed and remain unstated.
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

## 5. Light Rays — done

Running in three places: the hero, the Equipment band and the final call to
action. The component was rebuilt from Magic UI's without `motion/react`
(~50KB gzipped, and not in this stack) — everything it animates is opacity
and rotation, which CSS keyframes do natively, so it costs no JavaScript at
all on a page whose traffic is mostly mid-range Android over rural data.

The three calls are tuned differently on purpose:

- **Hero** uses `normal` blend with a warm low-alpha gold. The stock
  `screen` brightens whatever is beneath it, and cream `#faf8f3` has nothing
  left to brighten.
- **Equipment band** uses `screen` as designed — deep green `#08240f` has all
  the headroom it needs.
- **Final CTA** uses `screen` too, but weaker and slower. That panel already
  has a radial glow; the rays only give it a direction, and at matching
  strength the two would fight.

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

### 1. Google Business Profile — exists for both branches

The hard part is done. What remains is making the two listings correct and
consistent with each other, which [GOOGLE-BUSINESS.md](GOOGLE-BUSINESS.md)
sets out field by field. The three that matter most:

- **The lab's name must be exactly `Swayamsiddha Diagnostics`.** Not "Best
  Lab in Kendrapara". Keyword-stuffed names get listings suspended rather
  than demoted, and rival labs do report them.
- **The two listings need different primary categories.** The lab is a
  `Diagnostic center`; the collection centre is a `Blood testing service`. If
  both claim the same category they compete against each other for the same
  searches instead of reinforcing one business.
- **Link the collection centre to the lab** as a second location. The site's
  structured data already declares it a `department` of the lab, so this makes
  Google and the website tell the same story.

Then photos. A listing with ten photos and a new one every few weeks
outperforms one with two from the day it opened, and photo recency is
something Google can see.

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

## 7. Closed by the owner — do not re-ask

- **Sample report on the page** — declined. Off the list permanently.
- **Second phone number** — declined, twice. See §1.
- **12-lead ECG** and **fluorescence immunoassay** — not confirmed, so both
  stay off the page. Only the flat-panel X-ray detector was confirmed of the
  three capability claims offered.
- **NABL / ISO accreditation** and a **named pathologist** — neither exists.
  See §2.

## 8. Still open, owner-dependent

- **Photographs** — a reshoot is not possible right now, so `front.webp` keeps
  its small "look for this signboard" role and `reception.webp` stays unused.
  Revisit whenever the film is off the panels and the desk is in use; these
  feed the Google listing as well as the site, where photo count and recency
  are visible to Google.
- **The Odia lines** through the page have never been read by a native
  speaker. They are short and were written carefully, but a wrong particle in
  a headline is the kind of thing only a reader catches. Worth ten minutes
  from anyone local.
