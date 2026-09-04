---
layout: Post
title: Africa-Ready Usually Means South Africa With a Different Flag
description: Four countries, four curriculum authorities, four exit examinations, four teacher registration councils and four tax regimes - and why the systems that claim to serve all of them usually only serve one.
date: '2026-09-04'
tags:
  - edtech
  - africa
  - product
images:
  - src: /projects/iems-1.png
    alt: IEMS running in four markets - one platform, four curriculum authorities
---

## The field that gives it away

There is a field on every school management system built for this continent: the teacher's professional registration number.

In South Africa that is a SACE number, issued by the South African Council for Educators. It is the field I would have built first too, because South Africa has the most mature school software market on the continent and it is where most of these products start.

Now put that same system in front of a school in Lagos. A Nigerian teacher does not have a SACE number. They have a TRCN number, from the Teachers Registration Council of Nigeria, printed on a licence they renew every three years. Teaching without one is an offence under the TRCN Act. In Accra it is an NTC licence, `PT/XXXXXX/YY`, issued under the Education Regulatory Bodies Act 2020. In Nairobi it is a TSC certificate from the Teachers Service Commission, required in private schools as well as public ones.

Four countries. Four compulsory registration regimes. Four different bodies. One field.

If your system asks a Lagos teacher for a SACE number, you have not localised anything. You have translated the currency symbol.

That field is a small thing, and it is the tell. Behind it sit four or five decisions that cannot be find-and-replaced, and this post is about what it actually costs to get them right.

## Africa is not a market

The pattern is easy to fall into and hard to see from the inside. You build for the market you know. You win schools. Someone asks whether it works in Nigeria, and the honest answer - *it would need a real piece of work* - is a worse sales answer than *yes*. So the deck gets a new flag, the price gets converted, and the product ships.

I have never seen that convert. What happens instead is that the school signs, the first term goes fine because the first term is mostly data entry, and then the system meets its first real deadline - an examination entry, a statutory return, a payroll run - and cannot produce the thing the school actually needs.

Here is what genuinely differs between the four markets IEMS serves. Not culturally. Structurally, in ways that reach the schema.

| | South Africa | Nigeria | Ghana | Kenya |
|---|---|---|---|---|
| Curriculum authority | DBE (CAPS) | NERDC | NaCCA / GES | KICD (CBC) |
| Exit examination | NSC | WAEC, NECO | WASSCE (WAEC) | KNEC |
| Teacher registration | SACE | TRCN | NTC | TSC |
| Year runs | Jan - Dec | Sept - July | Sept - July | Jan - Nov |
| Called a | academic year | session | academic year | academic year |
| Year level called a | Grade | Class | Class | Grade |
| Currency | ZAR | NGN | GHS | KES |

Read that table across rather than down. There is no column you can derive from another one.

## The same examination board is not the same examination

The clearest example is WASSCE.

Nigeria and Ghana both sit it. It is administered by the same body, the West African Examinations Council. A reasonable engineer looks at that and models one examination.

They are not one examination. Ghana's WASSCE is written against Ghana's national syllabus, set by NaCCA under the Ghana Education Service. Nigeria's is written against NERDC's. The core subjects differ. The syllabuses differ. A Ghanaian candidate and a Nigerian candidate share a certificate name and very little else, so in our system they key off entirely separate curriculum models.

The mirror case is more interesting, because it goes the other way. Nigeria's other examination board, NECO, genuinely does share the national curriculum with WAEC. Same syllabus, same grading scale, same paper structure. So NECO and WAEC share a model in IEMS.

Both of those are one-line outcomes. Neither could be reached by looking at the acronyms. **Shared board does not mean shared examination, and different board does not mean different curriculum.** The only way to know is to go and read what each authority actually publishes, one at a time, and accept that half of that work confirms what you already believed and produces no code at all.

## Geography does not predict vocabulary

This one caught me out, and it is the reason I stopped trusting regional intuition.

Nigeria and Ghana are neighbours. Both run a September-to-July year that spans two calendar years. Both call a year level a *class* - JSS 1, SS 2, Primary 4 in Nigeria; Class 1 through Class 6 in Ghana's own GES naming. So far, so consistent.

But Nigerian calendars and communications say **session** - "the 2024/2025 academic session" - and Ghana's GES, running the identical calendar shape, consistently says **academic year**. Same structure, different word.

Meanwhile Kenya shares Nigeria's three-term rhythm and sits between it and nowhere in particular, and then runs January to November, entirely inside one calendar year, like South Africa. And Kenya says *Grade*, because KICD explicitly renamed the old Standard 1-8 system when the Competency-Based Curriculum came in.

So on calendar shape, Kenya groups with South Africa. On terms, it groups with Nigeria. On vocabulary, it groups with South Africa again. There is no regional rule. There are four answers.

Getting this wrong is not cosmetic. A South African school looking at a screen that says *Session* thinks it has selected something unfamiliar. A Nigerian principal reading *Academic Year 2024* wants to know which of the two years that means. It is the difference between software that was built for you and software that was translated at you.

## The curriculum moves under you

The other thing nobody warns you about: these are not stable documents you model once.

Kenya rationalised its CBC learning areas in 2024, on the advice of the Presidential Working Party on Education Reform. Junior School went from roughly fourteen optional learning areas to nine compulsory ones. Agriculture merged with Home Science and Nutrition. Visual Arts, Performing Arts and Sports merged into Creative Arts and Sports. A system carrying the original CBC design is now offering schools subjects that no longer exist.

Ghana's Common Core Programme runs from B7 to B10 - which is JHS 1 to 3 *plus* SHS 1 - so the point where subject sets change is not the point where the school changes buildings. Any model that splits its subjects at the JHS/SHS line has SHS 1 in the wrong place.

Nigeria's Federal Ministry pushed through a curriculum overhaul for the 2025/26 session: subject loads cut across every band, Nigerian History restored as compulsory to JSS 3, and thirty-odd trade subjects reduced to six with one now compulsory for every JSS and SSS learner.

All three of those landed inside about eighteen months. Localisation is not a project you finish. It is a maintenance commitment you take on, and the only honest way to carry it is to know the state of every model you ship.

## Which is why we publish the state of ours

This is the part I would want to know as a buyer, and it is the part almost nobody offers.

In IEMS a school does not configure a curriculum from a blank page. It selects a **pack** - a versioned model of its own market's structure: year levels, phases, subject lists, the grading scale, the promotion rule. Those are small, stable, load-bearing things, and no school should be typing them in.

Each pack carries its own validation record, and the school sees it when choosing. A pack that has been checked against the authority's own published documents says so. A pack that has been built from published structure but not yet reviewed against a ministry document says *that* - along with the specific things known not to be modelled yet.

Nobody enjoys shipping a status that says *not fully validated*. But the alternative is a school discovering it in March, on a report card, and the alternative is also what the entire industry does. A curriculum model with no stated provenance is being presented as authoritative by omission.

The same principle runs the rest of the platform. Currency, the data-protection regime, the payment and SMS rails a school can actually reach, the public holidays a school is closed on, the registration council on the staff form - all of it resolves from the country the school is in, and none of it is derived from another market's answer.

## The rule underneath all of it

When I built Lumen Christi I set one hard rule before writing any of the pipeline - never generate Mass reading text, source every word from the authoritative book - and every expensive decision downstream followed from it.

IEMS has the equivalent, and it is this:

**Never model a market by analogy with another market.**

Not the calendar, not the vocabulary, not the grading scale, not the tax table, not the public holidays. Each one gets read from that country's own authority, or it does not ship. Where something cannot be established, the product says so rather than filling the gap with a plausible neighbour's answer.

It is slower. It is the reason the work exists at all.

## What is coming in this series

Over the next few posts I want to show the receipts rather than the summary, because the individual findings are more convincing than the argument:

- **Public holidays**, where Nigeria's Act says the literal opposite of South Africa's, Ghana's dates are set by the President each year, and some of the biggest holidays in the calendar cannot be computed by any algorithm at all.
- **Payroll**, where the four markets differ in the actual arithmetic, and where a wrong answer means a teacher and their school both owe a revenue authority.
- **School fees**, and why we will never touch them.
- **What we do when we do not know something** - the null-instead-of-zero rule, and why an empty cell is more honest than a confident number.
- And finally the part that is not software at all: what we ship to Nigerian schools alongside the platform, because a system nobody can open is not a system.

IEMS is at [iems.africa](https://iems.africa).
