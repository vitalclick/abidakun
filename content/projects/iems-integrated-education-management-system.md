---
layout: Post
title: IEMS - Integrated Education Management System
description: A multi-tenant school management platform that replaces the spreadsheets, paper registers and WhatsApp groups running a school - admissions, attendance, timetables, fees, assessment, report cards and parent communication in one system, built for low-bandwidth Android-first use.
date: '2026-08-20'
tags:
  - nestjs
  - next-js
  - typescript
  - postgresql
  - react-native
logo:
  alt: IEMS
images:
  - src: /projects/iems-1.png
    alt: IEMS - one platform for the whole school
    overlay:
      src: /projects/iems-mobile.png
      alt: IEMS principal dashboard on mobile, showing learner and staff totals, pending approvals and fees collected
  - src: /projects/iems-2.png
    alt: Guardian home with fees, wallet and school announcements
  - src: /projects/iems-3.png
    alt: Teacher home with register, marks and messages
  - src: /projects/iems-4.png
    alt: Learner home with today's timetable, learning and library
attributes:
  - label: Role
    value: Founder & Full-Stack Developer
  - label: Platform
    value: Web (PWA), Android & iOS
  - label: Technology
    value: NestJS, Next.js, TypeScript, PostgreSQL, React Native
---

### Project Overview

IEMS is a multi-tenant education management platform that gives a school one system for the work that usually lives in spreadsheets, paper registers and WhatsApp groups: learner records, admissions, attendance, timetables, fees, assessment, report cards and parent communication.

It is built for the conditions its schools actually run in. Roughly a third of them have unreliable connectivity, so every route ships under 200 KB of first-load JavaScript, every screen has a skeleton state, and guardians without a smartphone still get SMS. Android comes first because that is what parents and teachers carry.

The same codebase ships under two brands on separate domains, each run by its own proprietor with strict tenant isolation between them.

### Links

- **Website** - [iems.africa](https://iems.africa)

### Key Features

- **Learner lifecycle** - admissions with a public application form, learner records, academic structure, timetabling and daily attendance
- **Finance** - invoicing, payments, allocations and a school wallet, with money held as integer cents and financial records made immutable by database triggers, so corrections are reversal entries rather than edits
- **Assessment and reporting** - curriculum-aligned continuous assessment, computer-based testing, report cards and statutory data exports
- **Parent portal and MailBox** - guardians see fees, attendance and results, and school-to-home messaging runs in-app with SMS fallback
- **Staff operations** - HR and leave, pastoral care behind its own access controls, medical records, library, clubs, facilities and daily reporting
- **Public REST API** - scoped API keys for schools that need to integrate their own tools

### Multi-Tenancy

Every school shares one deployment, and keeping their data apart is the load-bearing part of the design. Isolation is enforced three independent ways: each request resolves its tenant into `AsyncLocalStorage` and a Prisma client extension injects `tenant_id` into every read and write, so querying a tenant-scoped model without tenant context is a hard error; PostgreSQL row-level security sits underneath as a policy-level safety net; and cross-tenant leakage tests run in CI and are not allowed to regress.

The audit log is insert-only at the database level with before and after snapshots on sensitive changes, kept for seven years.

### Tech Stack

The API is NestJS 10 on Node 22 with strict TypeScript, Prisma 5 against PostgreSQL 16, Redis and BullMQ for queues and rate limiting, S3 for files behind presigned URLs, and Meilisearch for per-tenant search indexes. The web client is Next.js 14 on the App Router, server-rendered for low-bandwidth performance, with Tailwind CSS over owned UI primitives, TanStack Query, and React Hook Form with Zod. The mobile app is React Native on Expo, sharing the same domain packages and API.

It is a pnpm monorepo with a domain-neutral core package that carries no domain vocabulary at all - a CI guard enforces that - so a second product line can build on the same engine. Authentication uses 15-minute access tokens with opaque refresh tokens rotated on every use, revoking the whole token family on replay, plus SMS OTP for financial actions and magic links for guardians. Nine roles carry module-scoped permissions.

Infrastructure is Terraform onto AWS, pinned to a single region for data-residency compliance, with Fargate services behind CloudFront, encrypted RDS, and secrets held in Secrets Manager rather than environment files.

### Conclusion

The hardest parts were not the modules themselves but the invariants underneath them: tenant isolation that fails closed, financial records the application cannot quietly rewrite, and a performance budget strict enough that a principal on a budget Android phone over 3G gets the same system as one on fibre. Those constraints shaped nearly every design decision in the codebase.
