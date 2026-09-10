---
layout: Post
title: The Day Your School Is Closed Is a Legal Question
description: Four public holiday statutes that do not agree with each other, one country where the date is set by the President every year, and holidays that no calendar algorithm can ever compute.
date: '2026-09-10'
tags:
  - edtech
  - africa
  - product
images:
  - src: /projects/iems-2.png
    alt: A school calendar spanning four countries, each with its own public holiday law
---

## The sentence that gives it away

Here is a sentence from South Africa's Public Holidays Act:

> Whenever any public holiday falls on a Sunday, the following Monday shall be a public holiday.

Here is the equivalent sentence from Nigeria's:

> If any day appointed to be a public holiday falls on a Saturday or a Sunday, only the Saturday or Sunday concerned and no other day in lieu... shall be kept as a public holiday.

Read those twice. They are answering the same question - what happens when a public holiday lands on a weekend - and they give opposite answers. South Africa's law manufactures an extra day off. Nigeria's law explicitly refuses to.

If your school calendar was built against South Africa's rule and you sell it into Lagos with a currency symbol swapped, you have invented a school closure that Nigerian law does not grant. A register marked "closed" on a day the statute says is a normal school day is not a rounding error. It is a wrong answer on an attendance record, and attendance records get read by people outside the school.

## Four laws, not one calendar

This is the second post in a series about what it actually costs to build one system for South Africa, Nigeria, Ghana and Kenya rather than one system with four flags on it. The [first post](/blog/edtech/africa-ready-usually-means-south-africa-with-a-different-flag) was about the things that look like configuration and turn out to be structure - curriculum, examinations, vocabulary. Public holidays are the same shape, and they are the clearest example, because the rule that decides whether a school is open is a specific clause in a specific act, and none of the four countries' clauses match.

| | South Africa | Nigeria | Ghana | Kenya |
|---|---|---|---|---|
| Governing law | Public Holidays Act 36 of 1994 | Public Holidays Act | Act 601, amended by Act 1142 (2025) | Public Holidays Act, Cap 110 |
| Sunday-falling holiday | Moves to Monday | Kept on the Sunday, nothing added | Not addressed this way | Moves to Monday |
| Saturday-falling holiday | No substitute | Kept on the Saturday, nothing added | Not addressed this way | No substitute |
| Tue/Wed/Thu-falling holiday | Not addressed | Not addressed | May be moved to Friday or Monday, by presidential order, decided per year | Not addressed |
| Who actually decides | The Act, automatically | The Act, automatically | The President, annually | The Act, automatically |

South Africa and Kenya land in the same place - a Sunday holiday becomes a Monday one, a Saturday holiday gets nothing. But that is not one rule shared by two countries. It is two separate statutes that happen to produce the same answer. Kenya's Cap 110 section 2(2) does not defer to South Africa's Act, and the only way to know it agrees is to go and read it, on its own, the same way you would if you expected it to disagree. Getting the same answer by assumption and getting the same answer by verification are not the same piece of work, and only one of them is worth trusting for the next amendment.

Ghana does not have a fixed substitution rule at all. It has a discretionary power. Under Act 1142, passed in 2025, a holiday landing on a Tuesday, Wednesday or Thursday can be moved to the nearest Friday or Monday - and whether it actually is, is a decision the President makes for that specific year. In 2026, Constitution Day fell on Wednesday 7 January and was observed on Friday 9 January. Republic Day fell on Wednesday 1 July and was observed on Friday 3 July. Neither of those dates can be derived from the Act itself. They can only be read off the government's own notice for that year, which means a Ghanaian school calendar is not a thing you compute once. It is a thing you re-confirm annually, on purpose, whether or not the rest of the calendar has changed.

## The holidays no algorithm can place

All of the above is at least, eventually, knowable. There is a fourth category that is not.

Eid al-Fitr and Eid al-Adha are public holidays in Nigeria and Ghana. Nigeria also observes Maulid, Ghana observes Shaqq Day. All four are set by the sighting of the moon, declared by the relevant religious authority, typically one or two days ahead of the day itself. There is no proleptic calendar calculation that reliably reproduces a sighting-based declaration - astronomical prediction and the actual announcement can and do disagree by a day, and for a religious observance, the day that was actually declared is the only one that counts.

That is a different kind of gap from the other three. Ghana's substitution rule is knowable in principle and unconfirmed until a government notice is published. A moon-sighted date is not knowable in principle, months in advance, by anyone, including the people who will make the decision.

Which means a "full year" calendar shown to a Nigerian or Ghanaian school in January is either quietly running an astronomical guess dressed up as a fact, or it is silently missing some of the highest-attendance-impact days of the year and presenting itself as complete regardless. Neither is acceptable on a document a school prints and hands to parents. The honest version says, next to those specific dates, that the date is not yet known and why - and updates the moment an authority actually declares it. An empty cell with a reason attached is worth more to a school than a guess that looks finished.

## The list itself is not fixed either

It would be convenient if, once you had each country's substitution rule right, the underlying list of holidays just sat there. It does not.

Ghana's Act 1142, the same 2025 amendment that introduced the discretionary Tuesday/Wednesday/Thursday power, also restored 1 July as Republic Day, repealed the 4 August holiday, reinstated 21 September as Founder's Day, and added Shaqq Day. That is four separate line-item changes to one country's public holiday list, in one act, in one year. A calendar built against the pre-2025 list is now wrong on four rows, not because a developer made a mistake, but because the law changed under it.

Kenya's holiday on 10 October has been renamed twice in living memory - Moi Day, then Utamaduni Day, and under a 2024 amendment, Mazingira Day. The date has not moved. The name attached to it, by statute, has.

This is the same finding as the last post, applied to a different part of the calendar: none of this is a problem you solve once. A curriculum pack goes stale the moment a ministry issues a new syllabus. A public holiday list goes stale the moment a legislature amends the act that defines it. Both need to be treated as something you maintain on an ongoing basis, not something you shipped correctly in the year you built it.

## What we actually do with all of this

The rule from the first post holds here without needing a special case: never model a market by analogy with another market. Not the substitution rule, not the list, not even when - as with South Africa and Kenya - two countries turn out to agree.

In practice that means each country's calendar is built and checked against that country's own act, on its own, every time, rather than derived from a neighbour's or from last year's copy. Where a date genuinely cannot be known yet - a moon-sighted holiday, a Ghanaian observed-day declaration still pending for the year - the calendar says so, next to the date, rather than presenting a guess as a fact or silently dropping the row. And where an existing list turns out to have been wrong - built against an act that has since been amended - the fix corrects only what the amendment actually changed, leaving whatever a school has already configured for itself untouched. A platform correction should never look, to the school it lands on, indistinguishable from someone else quietly editing their calendar.

None of this is difficult engineering. All of it is the discipline of treating a public holiday as a fact you source, per country, per year, rather than a value you compute.

## Next in this series

The next post is about a smaller-looking problem with the same shape: what a year, a term and a year level are actually called, and why the same two neighbouring countries that share a calendar can disagree about the word for both.

IEMS is at [iems.africa](https://iems.africa).
