# RASM MVP Rules Catalog

## Purpose

This document defines the engineering rules applied during the RASM MVP demonstration.

A rule represents an engineering verification principle used to identify potential design risks in an industrial 3D model.

The MVP uses curated rules to demonstrate the RASM value proposition:

"Automatically review industrial designs and identify risks before construction."

---

# Rule Architecture

Each rule contains:
Rule {
id
name
category
discipline
description
objective
inputData
verificationMethod
outputIssue
severityCriteria
engineeringReference
}


---

# Rule Categories

| Category | Description |
|---|---|
| MAINT | Maintenance accessibility rules |
| CLASH | Physical conflict detection |
| DESIGN | Design completeness and consistency |
| CONST | Constructability verification |
| SAFETY | Operational safety checks |
| STANDARD | Engineering standard compliance |

---

# MAINTENANCE RULES

---

# MAINT-001 — Minimum Maintenance Clearance

## Category

MAINT

## Name

Minimum equipment maintenance clearance verification

## Objective

Verify that critical equipment has sufficient surrounding space for maintenance operations.

## Engineering Question

"Can an operator safely access and maintain this equipment?"

## Applies To

Equipment:

- Pumps
- Motors
- Valves
- Filters
- Mechanical equipment

## Input Data Required

MVP:

- Component ID
- Equipment type
- Bounding box
- Required clearance value

Future:

- IFC properties
- Manufacturer specifications
- Customer standards

## Verification Method

Compare:

Available clearance

VS

Required clearance


## Example

Required:

1200 mm

Available:

650 mm

Result:

Non-compliant

## Generated Issue

ISSUE-001

Insufficient Maintenance Clearance

## Severity

High if:
Clearance < 70% required distance

Medium if:
70% - 100% required distance


## Reference

Manufacturer recommendations

Customer engineering standards

---

# ACCESS-001 — Equipment Accessibility Path

## Category

MAINT

## Name

Verify access path around equipment

## Objective

Ensure that operators can physically reach critical components.

## Engineering Question

"Is the equipment accessible without removing other components?"

## Applies To

- Pumps
- Valves
- Control equipment

## Input Data Required

- Equipment position
- Surrounding components
- Access zone

## Verification Method

Detect:

- Physical obstruction
- Restricted access corridor

## Generated Issue

ISSUE-004

Equipment Access Obstruction

---

# CLASH RULES

---

# CLASH-001 — Physical Geometry Intersection

## Category

CLASH

## Name

Component collision detection

## Objective

Identify components occupying the same physical space.

## Engineering Question

"Will these components physically conflict during construction?"

## Applies To

- Pipes
- Cable trays
- Structures
- Equipment

## Input Data Required

MVP:

- Component IDs
- Bounding boxes

Future:

- Mesh geometry
- Spatial index
- Topology graph

## Verification Method

Detect:
Geometry A intersects Geometry B


## Generated Issue

ISSUE-002

Pipe Clash Detection

## Severity Criteria

Critical:

Direct collision

High:

Insufficient separation distance

Medium:

Potential installation difficulty

---

# DESIGN RULES

---

# DESIGN-001 — Required Component Presence

## Category

DESIGN

## Name

Required equipment verification

## Objective

Verify that mandatory components exist in the design.

## Engineering Question

"Is any required element missing from the model?"

## Example

A pump installation requires:

- Pump
- Isolation valves
- Check valve
- Instrumentation

## Input Data Required

- Component list
- Equipment hierarchy

## Verification Method

Compare:

Expected components

against

Detected components

## Generated Issue

ISSUE-003

Missing Isolation Valve

---

# DESIGN-002 — Component Position Verification

## Category

DESIGN

## Name

Equipment positioning consistency

## Objective

Verify that components respect expected layout constraints.

## Engineering Question

"Is this component placed in a logical engineering position?"

## Input Data Required

- Component type
- Position
- Connected components

## Verification Method

Check:

- Distance
- Orientation
- Connection logic

## Generated Issue

ISSUE-006

Incorrect Component Position

---

# CONSTRUCTABILITY RULES

---

# CONST-001 — Installation Space Verification

## Category

CONST

## Name

Construction accessibility check

## Objective

Verify that equipment can be installed within the available environment.

## Engineering Question

"Can the construction team install this equipment as designed?"

## Applies To

- Large equipment
- Tanks
- Skids
- Mechanical assemblies

## Input Data Required

- Equipment dimensions
- Surrounding structures
- Installation zones

## Verification Method

Check:

Available installation volume

against

Required installation envelope

## Generated Issue

ISSUE-005

Inadequate Equipment Space Allocation

---

# SAFETY RULES

---

# SAFETY-001 — Operator Safety Zone

## Category

SAFETY

## Name

Operator intervention space

## Objective

Verify safe operating conditions around equipment.

## Engineering Question

"Can an operator safely interact with this equipment?"

## Input Data Required

- Equipment type
- Operator zone
- Obstacles

## Verification Method

Check minimum operating area.

## Generated Issue

Future Version

---

# MVP Rule Execution Strategy

## Current MVP

Rules are:

- Engineer-defined
- Preconfigured
- Demonstration-focused

Execution:


3D Model
|
|
Component Manifest
|
|
Rule Evaluation
|
|
Issue JSON
|
|
RASM Viewer + Report


---

# Pilot Evolution

Future rule engine:

IFC Model

↓

Component Recognition

↓

Geometry Analysis

↓

Rule Library

↓

Issue Generation

↓

AI Explanation

↓

Engineering Report


---

# Rule Development Principles

## 1. Explainability First

Every detected issue must explain:

- What was detected
- Why it matters
- Which rule was applied
- How to fix it

---

## 2. Engineering Validation

A rule is not considered valid until reviewed by an engineering expert.

---

## 3. Customer Feedback Loop

Future versions will track:

- Accepted issues
- False positives
- Customer modifications
- Preferred standards

This feedback becomes the foundation of RASM's engineering intelligence.

---

# MVP Rule Priority

Priority order:

1. MAINT-001 — Maintenance clearance
2. CLASH-001 — Geometry collision
3. ACCESS-001 — Equipment accessibility
4. DESIGN-001 — Missing component
5. CONST-001 — Installation space

Target:

5 validated rules for first industrial demo.

Maximum:

10 rules for MVP.
