# 19 — Rule Engine

## Purpose

The Rule Engine is the core intelligence of RASM.

Its mission is to transform engineering geometry into actionable engineering findings.

The frontend never executes engineering rules.

It only displays the resulting issues.

---

# MVP Philosophy

The MVP does **not** implement a real rule engine.

Instead, engineering issues are curated beforehand and stored as structured JSON.

This allows:

- realistic demonstrations
- deterministic behavior
- trustworthy explanations
- rapid iteration with industrial experts

The objective is to validate customer interest before investing in automation.

---

# Rule Pipeline

```
Industrial Model

↓

Component Manifest

↓

Engineering Rules

↓

Detected Issues

↓

Dashboard

↓

3D Viewer

↓

Engineering Report
```

---

# Rule Structure

Every rule contains:

```ts
Rule {
  id
  name
  category
  discipline
  standardRef
  severity
  description
}
```

Example

```json
{
  "id":"RULE-005",
  "name":"Pipe Clash Detection",
  "discipline":"Mechanical",
  "category":"Constructability",
  "severity":"Critical"
}
```

---

# Issue Generation

Each violated rule produces one Issue.

```
One Rule

↓

One or Multiple Issues
```

Example

```
Rule

Minimum maintenance clearance

↓

Issue 1

Valve A inaccessible

↓

Issue 2

Pump maintenance blocked
```

---

# Issue Structure

```ts
Issue {
  id
  ruleId
  severity
  componentIds[]
  description
  impact
  recommendation
}
```

---

# Rule Categories

The MVP focuses on a limited set of engineering checks.

### Clash Detection

Detects physical interference between components.

---

### Maintenance Accessibility

Verifies required maintenance clearances.

---

### Constructability

Detects configurations difficult or impossible to build.

---

### Missing Components

Detects required equipment absent from the model.

---

### Engineering Standards

Checks compliance with predefined engineering rules.

---

# Severity Levels

Critical

Immediate design correction required.

High

Major engineering risk.

Medium

Requires review before construction.

Low

Improvement recommended.

---

# Rule References

Every issue must reference:

- engineering rule
- standard
- methodology

This improves customer trust.

Example

```
Rule

Maintenance Clearance

Reference

ISO XXXX

Required Clearance

800 mm

Measured

420 mm
```

---

# MVP Data Source

Rules are stored as documentation.

Issues are stored inside:

```
demo-issues.json
```

No runtime calculations are performed.

---

# Pilot Evolution

The Pilot introduces a deterministic rule engine.

Pipeline

```
IFC

↓

Geometry Extraction

↓

Spatial Analysis

↓

Rule Evaluation

↓

Issue Generation

↓

JSON Output
```

Possible technologies

- IfcOpenShell
- OpenCascade
- Python
- Node.js

---

# Long-Term Vision

The Rule Engine evolves through three stages.

### MVP

Curated engineering findings.

### Pilot

Automated deterministic checks.

### Platform

Customer-specific rule libraries, configurable engineering standards, continuous learning from validated issues.

---

# Guiding Principle

Engineering rules must remain explainable.

Every issue must answer:

- What is wrong?
- Why is it wrong?
- Which rule is violated?
- What is the engineering impact?
- How can it be corrected?

Trust is more important than automation.

The objective of RASM is not to generate the highest number of issues.

The objective is to generate the most useful engineering insights.
