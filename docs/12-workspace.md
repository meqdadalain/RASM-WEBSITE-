# 12 — Workspace

## Purpose

The Workspace is the operational heart of RASM.

It is where engineers inspect industrial models, review engineering issues, understand project risks and generate decision-ready reports.

Unlike the marketing website, the Workspace is designed for productivity, clarity and engineering confidence.

Every interface element must contribute to one objective:

> Help engineers understand the model faster than a traditional design review.

---

# Design Principles

The Workspace follows five principles.

## 1. Viewer First

The 3D model is always the center of attention.

Every action originates from or returns to the model.

---

## 2. Engineering Before Aesthetics

Visual effects never compete with engineering information.

Animations exist only to improve comprehension.

---

## 3. Explain Everything

Every score.

Every issue.

Every recommendation.

Every AI answer.

must explain:

- why
- how
- impact
- recommendation

Nothing is presented as a "black box."

---

## 4. Progressive Disclosure

Only show information when needed.

Example:

Issue List

↓

Issue Details

↓

Engineering Rule

↓

AI Explanation

↓

Supporting Recommendation

---

## 5. One Screen, One Workflow

The user should never feel lost.

Everything important remains visible.

---

# Workspace Objectives

The Workspace allows users to:

- inspect the industrial model
- navigate components
- review engineering issues
- understand engineering risks
- follow analysis progress
- interact with the AI assistant
- export an engineering report

---

# Overall Layout

```
+--------------------------------------------------------------+

Header

+--------------------------------------------------------------+

Issue List | 3D Viewer | Dashboard

Issue Details | AI Assistant

+--------------------------------------------------------------+

Analysis Progress

+--------------------------------------------------------------+
```

The 3D Viewer occupies the largest area.

---

# Main Areas

## Header

Contains:

- Project Name
- Model Name
- Analysis Status
- Engineering Score
- Export Report
- Book Pilot

---

## Viewer

Responsible for:

- rendering the industrial model
- camera navigation
- issue highlighting
- component selection

The viewer is described in detail in **13-3d-viewer.md**.

---

## Issue Panel

Displays detected engineering issues.

Each issue includes:

- title
- severity
- engineering discipline
- affected components
- engineering rule
- status

Selecting an issue updates the viewer.

---

## Dashboard

Displays project health.

Includes:

- Engineering Score
- Critical Issues
- Major Issues
- Minor Issues
- Project Readiness
- Estimated Savings

Detailed specification:

See **14-dashboard.md**

---

## AI Assistant

Provides engineering explanations.

Examples:

- Why is this issue critical?
- Which standard is violated?
- What should be corrected?

Specification:

See **15-ai-assistant.md**

---

## Analysis Progress

Displays current analysis stage.

Typical sequence:

Reading Geometry

↓

Recognizing Equipment

↓

Checking Standards

↓

Running Engineering Rules

↓

Building Report

The progress remains visible throughout the session.

---

# Navigation Philosophy

The Workspace minimizes navigation.

Maximum depth:

Workspace

↓

Issue

↓

Issue Details

No hidden menus.

No nested navigation.

No modal-driven workflow.

---

# User Workflow

Typical engineering review.

```
Open Workspace

↓

Inspect Dashboard

↓

Review Critical Issues

↓

Locate Issue in 3D

↓

Read Explanation

↓

Review Recommendation

↓

Continue

↓

Generate Report
```

This flow should feel natural.

---

# Workspace States

## Loading

Display:

- loading animation
- current analysis stage

---

## Analysis Running

Display:

- animated progress
- completed stages
- estimated remaining time

---

## Analysis Complete

Display:

- dashboard
- issue list
- report generation

---

## Report Generated

Display confirmation.

Offer:

- Download PDF
- Share Report
- Book Pilot

---

# Responsiveness

Priority:

Desktop.

Secondary:

Large tablets.

Mobile devices are limited to report viewing.

Industrial review is not optimized for smartphones.

---

# Accessibility

Minimum requirements:

- keyboard navigation
- sufficient contrast
- scalable typography
- focus indicators
- screen reader compatibility

---

# Performance Targets

Workspace loading:

< 3 seconds

Model loading:

< 5 seconds

Issue selection:

< 100 ms

Camera transition:

< 500 ms

Report generation:

< 3 seconds

---

# Future Evolution

Pilot:

- customer projects
- multiple analyses
- issue history

Enterprise:

- collaboration
- annotations
- model comparison
- review sessions
- project management

---

# Success Criteria

The Workspace succeeds when an engineer can:

- understand the project status in seconds
- identify critical issues quickly
- locate every issue in the 3D model
- understand why the issue exists
- generate a professional engineering report
- leave the session confident in the analysis

The Workspace is therefore the operational core of RASM.
