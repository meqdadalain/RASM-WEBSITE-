# 18 — Data Model

## Purpose

This document defines the core data structures used by RASM.

The MVP is intentionally simple.

All engineering intelligence is represented through structured JSON files.

The frontend never depends on how the analysis is produced.

It only consumes standardized objects.

---

# Core Objects

The MVP uses six primary entities:

- Project
- Component
- Rule
- Issue
- Analysis
- Report

---

# Project

Represents one analyzed industrial model.

```ts
Project {
  id
  name
  customer
  industry
  modelVersion
  createdAt
}
```

Example

```json
{
  "id": "demo-water-001",
  "name": "Water Treatment Plant",
  "industry": "Water",
  "modelVersion": "v1"
}
```

---

# Component

Represents one object inside the 3D model.

```ts
Component {
  id
  nodeName
  type
  discipline
  name
  bbox
}
```

Fields

| Field | Description |
|--------|-------------|
| id | Stable identifier |
| nodeName | Mesh name inside GLB |
| type | Pipe, Valve, Pump... |
| discipline | Mechanical, Civil, Process |
| bbox | Bounding box |

Example

```json
{
  "id":"VALVE_021",
  "nodeName":"Valve021",
  "type":"Gate Valve",
  "discipline":"Mechanical"
}
```

---

# Rule

Defines one engineering verification.

```ts
Rule {
  id
  name
  category
  discipline
  standardRef
  severity
}
```

Example

```json
{
  "id":"RULE-003",
  "name":"Maintenance Clearance",
  "category":"Accessibility",
  "standardRef":"ISO XXXX"
}
```

---

# Issue

Represents one detected engineering problem.

```ts
Issue {
  id
  ruleId
  severity
  componentIds[]
  title
  description
  impact
  recommendations[]
  camera
}
```

Fields

| Field | Description |
|--------|-------------|
| ruleId | Originating rule |
| severity | Critical / High / Medium / Low |
| componentIds | Related components |
| impact | Engineering consequence |
| camera | Fly-to position |

Example

```json
{
  "id":"ISSUE-002",
  "ruleId":"RULE-003",
  "severity":"High",
  "componentIds":["VALVE_021"],
  "title":"Insufficient maintenance access"
}
```

---

# Analysis

Global result produced by the analysis.

```ts
Analysis {
  score
  totalIssues
  criticalIssues
  warnings
  estimatedSavings
  readiness
}
```

Example

```json
{
  "score":82,
  "criticalIssues":2,
  "warnings":7,
  "estimatedSavings":"€420,000"
}
```

---

# Report

Represents the exported engineering report.

```ts
Report {
  summary
  kpis
  issues[]
  recommendations[]
}
```

---

# JSON Files (MVP)

The MVP uses static JSON.

```
src/data/

demo-analysis.json
demo-issues.json
demo-manifest.json
demo-assistant.json
```

No database is required.

---

# Future Database

Pilot phase introduces PostgreSQL.

Tables:

- projects
- components
- analyses
- issues
- rules

The frontend data model remains identical.

Only the source changes.

---

# Design Principle

The UI never performs engineering analysis.

It only visualizes standardized data.

This separation allows:

- offline demos
- deterministic testing
- future rule engines
- future AI systems

without changing the interface.

---

# MVP Scope

Included

- Project
- Component
- Rule
- Issue
- Analysis
- Report

Deferred

- User
- Organization
- Permissions
- Comments
- Version history
- Notifications
- Audit logs

These belong to later product stages.
