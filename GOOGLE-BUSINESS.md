# Google Business Profile — fields to paste

Everything below is written to match `lib/site.ts` and the live site exactly.
Where Google and the website disagree about a business, Google trusts neither.
So copy these as they are; if you change one, change it on the site too.

Create the listing at **google.com/business**. You have to do this yourself —
it needs your Google account and a verification step tied to the address.

---

## Listing 1 — the laboratory (does not exist yet, create this)

### Name

```
Swayamsiddha Diagnostics
```

Exactly that. **Not** "Swayamsiddha Diagnostics — Best Lab in Kendrapara" or
"Swayamsiddha Diagnostics | Blood Test & X-Ray". Keyword-stuffed names are
against Google's guidelines, competitors do report them, and the penalty is
suspension of the listing rather than a warning.

### Categories

| Slot | Category |
|---|---|
| Primary | `Diagnostic center` |
| Additional | `Medical laboratory` |
| Additional | `X-ray lab` |
| Additional | `Blood testing service` |

The primary category is a real ranking input, not a label — it decides which
searches you are eligible to appear in at all. Set it deliberately.

Do **not** add `Pathologist`. That category describes a named doctor, and there
isn't one on record.

### Address

```
Main Chhagharia Road
Shamagudia, Ichhapur
Kendrapara, Odisha 754212
India
```

Drag the map pin onto the actual building rather than accepting where Google
places it from the text. The pin is what the "Directions" button uses.

### Phone

```
+91 78478 89009
```

The primary number only. Do not add a second number — the site publishes one
number and they must agree.

### Website

```
https://swayamsiddhadiagnostics.in
```

With `https://`, no `www`, no trailing path.

### Hours

Every day, **6:00 am – 9:00 pm**, including Sunday.

The site publishes these same hours in its structured data, which is what lets
Google show "Open now" against you. Two sources saying the same thing is the
entire point.

### Description

Under 750 characters, which this is. No phone numbers or URLs inside it —
Google strips or rejects those.

```
Swayamsiddha Diagnostics is a pathology laboratory, digital X-ray and ECG
centre on Main Chhagharia Road at Shamagudia, Ichhapur, serving Kendrapara
district. 73 tests are run on fully automated analysers, with daily quality
controls run alongside them, so a result does not depend on who is on shift.
Most reports are ready the same day and can be sent on WhatsApp. Home sample
collection is available depending on distance. A sample collection centre near
Old Medical in Kendrapara town draws samples that are carried here and run on
the same machines. Open 6 am to 9 pm, every day.
```

### Services

Add these under the Services section. They match what the site claims, and
nothing more:

- Pathology blood tests
- Urine tests
- Digital X-ray
- ECG
- Home sample collection
- Corporate and group health checkups
- Same-day reports

### Attributes

Tick only what is true. The ones worth having if they apply: *Wheelchair
accessible entrance*, *Toilets*, *Appointment required — no*, *On-site
services*, *Accepts new patients*.

### Photos

Photos are the most-looked-at part of a listing and the most neglected. Aim
for at least ten, and add a new one every few weeks — recency is visible to
Google.

Worth uploading:

1. The green signboard from the road, so people recognise it while driving.
2. The analyser bench — the Erba EM 200 NEO and H 560 are legible and named
   equipment is persuasive.
3. The X-ray room with the machine visible.
4. Reception, in use, with a real person behind the desk.
5. The logo, as the profile picture.

Avoid the opening-day shots with protective film still on the panels and
cardboard boxes around. They read as "not open yet".

---

## Listing 2 — the collection centre (already exists)

The pin at `20.5024353, 86.4247906` is already live, which is where the site's
map for that branch comes from. Three things to fix on it:

1. **Name it** `Swayamsiddha Diagnostics — Collection Centre`. The site's
   structured data declares it under exactly that name, as a department of the
   lab.
2. **Primary category** `Blood testing service`, not `Diagnostic center`. It
   does not run analysers, and claiming the same category as the lab makes two
   listings compete with each other for the same searches.
3. Once the lab's listing is verified, **link this one to it** as a second
   location of the same business rather than an unrelated listing.

Same phone, same hours, same website as the lab.

Its description should be honest about what it is:

```
A sample collection centre of Swayamsiddha Diagnostics, near Old Medical in
Kendrapara town. Blood and urine samples are drawn here and carried to the
main laboratory on Main Chhagharia Road, where they are run on fully
automated analysers. Reports can be sent on WhatsApp. Open 6 am to 9 pm,
every day.
```

---

## After verification

Verification is usually a postcard to the address and takes one to two weeks.
Nothing below works until it completes.

**Get the review link.** In the profile dashboard there is an "Ask for
reviews" option that gives you a short link. Turn it into a QR code, print it,
and put it at the desk where reports are handed over. That handover moment is
the only time asking for a review reliably works.

**Reply to every review**, including the unhappy ones. Replies are read by the
next patient and are visible to Google.

**Never buy reviews and never post them yourself.** The failure case is not a
low ranking, it is a suspended listing.

**Add the pin back to the site.** Once the lab is listed, send me its Maps
link and I will set `coords` and `mapsUrl` on the `lab` entry in `lib/site.ts`
— the map helpers already branch on whether those exist, so the site's map
switches from a name-and-address guess to your exact pin.

**Then do the other directories**, with byte-identical name, address and
phone: Bing Places, Justdial, Practo, Sulekha, Apple Business Connect,
IndiaMART.
