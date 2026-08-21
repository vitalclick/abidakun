---
layout: Post
title: Creating the Best Catholic App in Africa
description: What it actually took to build Lumen Christi - eleven Bible translations scraped into one shape, a font that turned Igbo into gibberish, a Yorùbá Lectionary that exists only on paper, and the long walk to both app stores.
date: '2026-08-21'
tags:
  - analytics
  - python
  - ocr
images:
  - src: /photos/lumen-christi-app-story.jpg
    alt: Creating the Best Catholic App in Africa - a Lumen Christi case study, showing the app's daily Mass reading screen alongside a snippet of its codebase
---

## Why I built it

I was raised in a Catholic family where the daily Mass readings were not optional. Our family of six woke at 5:00 a.m., read the readings of the day - usually from the Jerusalem Bible or the RSV-CE - then turned to *The Word Among Us* for the reflection. Afterwards each of us said what we had understood, we prayed the Psalms, and we finished with morning prayers.

That shaped how I read Scripture for life. It also left me with strong attachments to particular translations, which is how I ended up with a phone full of apps. YouVersion for the Bible. Laudate for the daily Mass readings. Something else for hymns, most of them badly designed and impossible to search. A separate app just to read the Psalms in NIV 1984, because that is the one that sounds right in my head. When my spouse began preparing for baptism I went looking for a good Catechism app and found nothing worth recommending.

Four or five apps to complete one morning devotion. That is the gap Lumen Christi was built to close.

This post is not about the React app. It is about the part nobody sees: getting the content in.

## The rule that made everything expensive

Before a line of the pipeline was written, I set a rule that has cost me more hours than any other decision on this project:

**Never use AI to generate Mass reading text.**

The Lectionary content has to come from authoritative scanned or scraped sources, word for word. The edge function that serves readings is strictly cache-only - on a cache miss it returns `{ available: false }` and the app shows an empty state. It does not improvise. It does not fall back to a Bible translation and pretend that is the reading.

That sounds like an obvious integrity choice, and it is, but understand what it commits you to. The whole point is that someone can hold the phone at Mass and follow along word for word with what is being read from the ambo. A paraphrase breaks that. A verse pulled from a different translation breaks that. The moment you accept that constraint, you have signed up to source every single reading, in every language, from the actual printed book.

Which is where the real work starts.

## Eleven Bibles, one shape

The app ships eleven Bible translations and eight separate Lectionaries. None of them arrived as a tidy dataset.

Every scraper - and there is a different one for nearly every source - had to produce the same JSON shape:

```json
{
  "GEN": {
    "name": "Genesis",
    "chapters": {
      "1": { "1": "In the beginning God created the heavens and the earth.", "2": "..." }
    }
  }
}
```

Three-letter book keys, string keys for chapters and verses, display name in the target language. Boring on purpose. If every source lands in the same shape, everything downstream - the importer, the reader, the search index, the offline cache - only has to understand one thing.

Getting there meant a folder of small, single-purpose Python scripts: `scrape_igbo_bible.py`, `scrape_yoruba_bible.py`, `scrape_hausa_bible.py`, `scrape_swahili_bible.py`, `scrape_gnb_bible.py`, `scrape_esv_bible.py`, and parsers for the versions that came as files rather than pages. `requests` and `BeautifulSoup`, nothing clever. The cleverness is never in the fetching.

## When the scrape lies to you

Here is the lesson that cost me the most: **a scraper that finishes without an error has told you nothing.**

I only found out how bad things were when I stopped trusting the scripts and counted. The integrity report I generated across all ten Bible files at the time read like a post-mortem:

| File | Verses | Status |
|---|---:|---|
| ESV | 40,306 | **Corrupted** - cross-references parsed as verses |
| Jerusalem Bible | 5,855 | **Unusable** - severely corrupted |
| New Jerusalem Bible | 7,908 | **Unusable** - failed scrape, contains raw HTML |
| NAB / NIV84 / NRSV | ~31,000 each | Fixed - book keys renamed |
| Yorùbá | 31,224 | Clean |

Seven of ten were importable. Three had to be thrown away and re-scraped from scratch.

The ESV failure is my favourite, because it looks like success. Forty thousand verses instead of roughly thirty-one thousand. Every script ran green. What actually happened is that cross-reference footnotes embedded in the verse text were being parsed as separate verses - Genesis 1 came out with 32 entries instead of 31. If I had shipped on the strength of "the scraper completed", the Bible reader would have had thousands of phantom verses in it.

So the pipeline grew a second half that matters more than the first: `check_integrity.py` to count books, chapters and verses against expected totals per book, `inspect_html.py` for when the output looks wrong and you need to see what the page actually served, and `fix_heading_leak.py` for the day I discovered section headings bleeding into verse text.

Write the validator before you trust the scraper. Every time.

## The Igbo bulletins, and a font that lied

The Igbo Mass readings come from thirty monthly PDF bulletins - the *Maranatha Bulletin*, published by the Nigerian Igbo Catholic Community of San Jose Diocese in California for the Catholic Diocese of Ekwulobia. Each one is bilingual, printing every reading, antiphon and psalm twice, English and Igbo side by side.

I extracted the first one and got this:

```
any[ Osebxrxwa Oziqma
```

My first assumption was a broken encoding. My second was that I would need OCR after all. Both were wrong, and the truth was much better news.

The bulletins are born-digital - CorelDRAW exported to PDF - so the text layer is exact and there is no OCR step at all. The problem is that the Igbo is set in a legacy hack-font called `IgboTimesNewRoman`, from the era before Unicode support for African diacritics was something you could rely on. Its `ToUnicode` map deliberately points the dotted-vowel glyphs at ASCII punctuation. The characters were never wrong. They were just wearing someone else's clothes.

The fix is a substitution table:

```python
IGBO_GLYPH_MAP = str.maketrans({
    "[": "ị", "{": "Ị",
    "x": "ụ", "X": "Ụ",
    "q": "ọ", "Q": "Ọ",
    "]": "ṅ", "}": "Ṅ",
})
```

Run the raw text through that, normalise to NFC, and the Igbo comes out as perfect Unicode. Deterministic, not probabilistic - no character-level proofreading needed, only a fluent reader confirming the meaning.

There was a second win hiding in the same place. Because the extractor reads spans by font, and only the Igbo column is set in `IgboTimesNewRoman`, asking for that font gives you the Igbo and silently drops the English. No column geometry, no heuristics about page layout. Just: give me the text drawn in this typeface.

## The Yorùbá book that exists only on paper

Then there is Yorùbá, which had no shortcut at all.

The source is a single printed book - *Mísà Ojoojúmọ́ ní Yorùbá*, the official Yorùbá Missal and Lectionary. **There is no digital edition.** Not paywalled, not badly formatted. It does not exist. Every reading has to be scanned, OCR'd, proofread and ingested, one page at a time.

The first attempt was phone photos: a curved book, pages rotated ninety and a hundred and eighty degrees, columns bleeding into each other. The OCR output was close to useless. What eventually worked was a flatbed scanner and twenty-one PDFs, plus a pipeline:

1. **Render** each page with `pymupdf` at roughly 3x, because tesseract is far more forgiving of a large image than a sharp one.
2. **Split** - each scanned page is a two-page spread, so cut it into left and right book pages, then into narrow columns where the text flow requires it.
3. **OCR** with `tesseract -l yor --psm 3` for whole pages, falling back to `--psm 6` per column when the reading order interleaves.
4. **Map the spread** from its running headers to a week, a day and a cycle.
5. **Extract every cycle at once.** A Temporale spread prints Sunday A, B and C plus weekday cycles I and II simultaneously. One liturgical day spans one and a half to two pages, and readings run across column breaks.
6. **Verify every citation** against the Roman Lectionary for that day - this is what catches OCR errors in chapter and verse numbers, which are the ones that would actually mislead someone.
7. **Keep the body text verbatim.** Fix obvious OCR noise, change nothing else.

Yorùbá tone marks and under-dots are exactly where OCR is weakest, and the parser has to fold diacritics just to match a heading reliably. Here is untouched output from one page, mid-reading:

```
pé: 'Gbogbo ohun tí Olúwa wí ni awa yòò ṣe, tí a ô si
tẹ̀lé." Nígbà náà ni Mòsẹ̀ bu ẹ̀jẹ̀ náàà wọn àwọn ẹ̀nìyàn bi
é ti wí pé: 'Éyí ni májẹ̀mú ti Olúwa bá yín dá pẹ̀lú gbogbc
ìlànà wònyí.'
```

Mostly right, and wrong in the ways OCR is always wrong. `gbogbc` for `gbogbo`, where a worn `o` at the end of a line reads as a `c`. `náàà` with a diacritic doubled. A `ô` standing in for an `ó`. An opening single quote closed with a double. None of that is catastrophic on its own, and all of it needs a human who reads Yorùbá to catch, because a spellchecker has no opinion about a language this book may be the most authoritative digital source for.

That is why the raw OCR is archived rather than thrown away. There are 424 of those text files under `scanned/ocr-raw/`, one per page side, named for the book pages they came from - `1080_1129_p04.txt` and so on - alongside 34 extracted JSON files. The rule is process-once: if a reading needs re-transcribing, you go back to the stored OCR text, not to the scanner. Re-OCR'ing is slow, it is not perfectly reproducible across tesseract versions, and the scans themselves are the one artefact that cannot be regenerated without the physical book on a flatbed again.

Some pages simply lost. Book page 1150 stayed jumbled even with the fallback mode and is flagged for a rescan. One gospel verse was corrupted by a column-break artifact. Another was left illegible where a sentence split across columns. Those are recorded as known gaps rather than quietly patched, because patching them would mean writing Scripture myself, and that is the one thing the rule forbids.

Every ingested reading carries its provenance - the book page it came from, the method (`tesseract-ocr (yor) + proofread`), and a status that still reads *draft - pending native-speaker verification*. A fluent proofread is the required final step before any of it counts as canonical.

There is a related rule I learned the hard way. A Yorùbá Lectionary must be entirely self-contained: no borrowing a string from another translation, not even the day's title. We had a real bug on Android where a Yorùbá screen briefly lacked a heading, the cross-version fallback kicked in, and an English title appeared on a Yorùbá page. When a heading is missing now it is computed in Yorùbá from Yorùbá vocabulary, or it is left blank.

## The rest of the corpus

The **Catechism** was gentler: 2,865 paragraphs from a structured JSON edition of the Vatican text, walked as a table-of-contents tree to resolve the Part / Section / Chapter / Article hierarchy for each paragraph, heading casing normalised, deduplicated, sorted, then upserted into Supabase in batches of a hundred keyed on paragraph number so the import is idempotent and safe to re-run.

The **hymns** taught a different lesson. The Mariarch hymn site is an Angular single-page app, which usually means reaching for a headless browser. It is backed by a Spring Data REST API, so the scraper calls the API directly - 656 hymns, no browser, faster and far more reliable. Before you automate a browser, check whether the page is just talking to an endpoint you could talk to yourself.

Add the Yorùbá hymnbook PDFs, the Nigerian praise and worship collections, and audio pulled per-hymn, and the resources directory ends up holding over 150 PDFs.

## Getting it onto both stores

The app is a React and Vite PWA wrapped with Capacitor, so the web build, the Android app and the iOS app are the same codebase. Codemagic runs the workflows - Android debug, Android release bundle, Play internal track, iOS TestFlight.

The part that surprised me was not the build. It was the paperwork.

Apple's privacy nutrition label has to match `PrivacyInfo.xcprivacy` in the repository exactly. Declare something in the dashboard that the app's actual behaviour contradicts and you get rejected - so the manifest and the dashboard answers have to be kept in lockstep as a code change, not a form you fill in once. Review needs a working demo account, tested the day before submission rather than assumed. Release notes have to exist per locale, in both consoles, worded for someone praying rather than someone reading a changelog.

None of it is hard. All of it is easy to get wrong at 11pm on a submission night.

## What I would tell someone starting

**Decide your integrity rule first, and write it down.** Ours is a numbered hard rule in the repository's own documentation, so it survives me forgetting it. Every expensive decision downstream follows from it.

**Count everything.** A scraper that finishes is not a scraper that worked. Forty thousand verses where thirty-one thousand belong is a silent failure that ships.

**Look before you reach for OCR.** One of these sources looked like a scanning job and turned out to be a font-mapping problem with a deterministic fix. That is a different class of problem, and a much better one.

**Record provenance on every row.** Source page, method, verification status. Months later, that is the difference between knowing what you have and guessing.

**A blank is more honest than a guess.** The app shows an empty state on a missing reading, and most blank dates are correct rather than bugs - unscanned saints' feasts, mostly. That is the right trade when someone is holding your app at Mass.

The scanning is not finished. Whole months of the Yorùbá Sanctoral are still on paper, and everything ingested so far is waiting on a native-speaker proofread. But the Bible reader, the readings, the hymns, the Catechism and the prayers now live in one place, offline, in five languages - and my mornings need one app instead of five.

Lumen Christi is live on the web, the App Store and Google Play at [lumenchristi.app](https://lumenchristi.app/).
