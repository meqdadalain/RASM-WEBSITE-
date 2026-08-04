# 09 — RASM MVP Architecture

## Purpose

This document defines the technical architecture for the first RASM MVP.

The objective is **not** to build the final enterprise platform.

The objective is to deliver a credible industrial demonstration capable of convincing a first pilot customer.

The MVP must prove that RASM can:

- understand an industrial model
- identify engineering issues
- explain why they matter
- visualize them in 3D
- generate an engineering report

Everything else is intentionally deferred.

---

# MVP Principles

## Build the minimum product that creates trust

The MVP is centered around one industrial model.

The intelligence is demonstrated through predefined engineering checks validated by engineers.

The user must leave the demo convinced that:

> "I want to run this on my own project."

---

## Architecture Goals

The architecture must be:

- simple
- understandable
- easy to extend
- frontend-first
- compatible with future backend services

Avoid unnecessary abstraction until real customers require it.

---

# High-Level Architecture

```
Home

↓

Launch Demo

↓

Analysis Initialization

↓

Workspace

├── 3D Viewer
├── Analysis Progress
├── Dashboard
├── Issue Panel
└── AI Assistant

↓

Engineering Report

↓

Pilot Request
```

---

# Frontend Stack

Current repository:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Three Fiber
- Three.js
- Lucide Icons

No backend is required for the MVP.

---

# Routes

Maximum routes:

```
/

Home

/demo

Workspace

/demo/report

Report Preview
```

No authentication.

No administration.

No settings pages.

---

# Folder Structure

```
src/

pages/

components/

three/

context/

data/

lib/

App.tsx

main.tsx
```

Keep the project intentionally small.

---

# Workspace Layout

```
+------------------------------------------------------+

Header

+----------------+----------------------+

Issue List

3D Viewer

Dashboard

Assistant

+------------------------------------------------------+

Analysis Progress

+------------------------------------------------------+
```

The viewer remains the visual center of the application.

---

# Data Sources

The MVP uses static data.

```
demo-model.glb

manifest.json

issues.json

analysis.json

assistant.json
```

No API is required.

---

# Viewer

Responsibilities:

- load one GLB model
- orbit
- zoom
- pan
- select components
- highlight issues
- fly camera to issue

Deferred:

- exploded view
- section cut
- annotations
- measurements

---

# Issue System

Each issue references:

- affected components
- engineering rule
- severity
- impact
- recommendation

The issue list is synchronized with the viewer.

Selecting an issue automatically focuses the camera.

---

# Analysis Engine

The MVP analysis is scripted.

The progression simulates a real engineering workflow:

1. Reading geometry
2. Recognizing equipment
3. Checking standards
4. Running engineering rules
5. Building report

The objective is transparency rather than artificial intelligence theatre.

---

# Dashboard

Display:

- Overall Engineering Score
- Critical Issues
- Major Issues
- Minor Issues
- Estimated Savings (illustrative)
- Project Readiness

Every KPI must be explainable.

---

# AI Assistant

The assistant is template-driven.

Responses come from predefined engineering notes.

Each answer references:

- engineering rule
- detected issue
- recommendation

No LLM is required.

---

# Engineering Report

Generated directly in the browser.

Contains:

- Executive Summary
- KPI Summary
- Issue List
- Risk Assessment
- Recommendations
- Methodology
- Rules Applied

---

# State Management

Use React Context only.

Store:

- selected issue
- highlighted components
- analysis progress
- viewer state

Avoid external state libraries until required.

---

# Backend Strategy

MVP:

No backend.

Pilot:

- file upload
- worker
- rule engine
- report generation

Enterprise:

- multi-tenant
- API
- RBAC
- Knowledge Base
- integrations

---

# Design Principles

The interface should communicate:

- precision
- engineering rigor
- trust
- clarity

Animations should support understanding, never distract.

---

# Out of Scope

The following are intentionally excluded:

- authentication
- organizations
- project management
- custom rules
- admin dashboard
- notifications
- API
- plugins
- collaboration
- version comparison
- CAD integrations
- mobile application

These belong to future product horizons.

---

# Success Criteria

The MVP is successful when an industrial customer can:

- understand the workflow
- inspect one industrial model
- review engineering issues
- understand recommendations
- download a report
- request a pilot

Nothing more is required for the first commercial validation.
