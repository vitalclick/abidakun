---
layout: Post
title: Lumen Christi - A Daily Catholic Companion App
description: A Progressive Web App and mobile companion for daily Catholic devotion, offering Mass readings, prayers, hymns, Bible study, saints, and the Catechism - fully offline-capable and available in five languages.
date: '2026-08-20'
tags:
  - react
  - typescript
  - vite
  - supabase
  - pwa
logo:
  src: /icons/lumen-christi-logo.svg
  alt: Lumen Christi
images:
  - src: /projects/lumen-christi-1.png
    alt: Lumen Christi home screen showing the daily liturgy, readings of the day, and verse of the day
    overlay:
      src: /projects/lumen-christi-mobile.png
      alt: Lumen Christi home screen on mobile
  - src: /projects/lumen-christi-2.png
    alt: Bible reader with book selection across the Old and New Testament
  - src: /projects/lumen-christi-3.png
    alt: Hymns library with audio playback and hymnals in multiple languages
  - src: /projects/lumen-christi-4.png
    alt: Prayers screen with the Holy Rosary, Divine Mercy Chaplet, and Stations of the Cross
attributes:
  - label: Role
    value: Founder & Full-Stack Developer
  - label: Platform
    value: Web (PWA), iOS & Android
  - label: Technology
    value: React, TypeScript, Vite, Supabase, Tailwind CSS
---

### Project Overview

Lumen Christi is a daily Catholic companion app I built to bring Mass readings, prayers, hymns, Bible study tools, saints information, and the Catechism of the Catholic Church into a single, offline-capable experience. It's designed to be the app someone opens every morning to pray with the Church - the daily liturgy, readings, and a verse of the day are front and center the moment it loads.

The app ships as a Progressive Web App and as native iOS and Android builds via Capacitor, so the same codebase serves the browser, App Store, and Play Store.

### Links

- **Web app** - [lumenchristi.app](https://lumenchristi.app/)
- **iOS** - [Download on the App Store](https://apps.apple.com/us/app/lumen-christi/id6765803546)
- **Android** - [Get it on Google Play](https://play.google.com/store/apps/details?id=com.lumenchristi.app)

### Key Features

- **Daily liturgy at a glance** - today's feast, liturgical color, lectionary cycle, and Mass readings surfaced immediately on open
- **Full Bible reader** - complete Old and New Testament, with multiple translations (including RSV-CE) and multiple languages
- **Prayers and devotions** - the Holy Rosary with guided mysteries, Stations of the Cross, Divine Mercy Chaplet, Lectio Divina, Liturgy of the Hours, and novenas
- **Hymns with audio** - hymnals spanning English, Yoruba, Igbo, Hausa, and Latin, with playback and personal playlists
- **Catechism of the Catholic Church** - full-text reader plus a Duolingo-style guided study mode
- **Saints and liturgical calendar** - daily saints, feast days, and a browsable liturgical calendar
- **Offline-first** - readings, prayers, hymn lyrics, and the Catechism are cached locally so the app works without a connection
- **Community features** - user profiles, prayer streaks, and the ability to connect with other users praying the same devotions

### Tech Stack

The frontend is React 18 with TypeScript on Vite 5, styled with Tailwind CSS using a custom liturgical design system, and built on shadcn/ui (Radix primitives). The backend runs on Supabase - Postgres with row-level security across more than 20 tables, auth, storage for hymn audio and saint imagery, and Deno edge functions for daily-reading sync and AI-generated reflections. Offline support is handled through a PWA service worker with IndexedDB caching, and the native iOS/Android apps are produced from the same codebase through Capacitor.

### Conclusion

Lumen Christi is an ongoing project I actively maintain and ship updates to - the offline-first architecture and multi-language hymn and Bible content were the two hardest problems to get right, since the app needs to stay genuinely useful for someone praying with no signal. It's live on the web and published on the App Store and Google Play.
