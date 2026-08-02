# RASM MVP Issue Catalog

## Purpose

This document defines the engineering issues demonstrated in the RASM MVP.

Each issue represents a type of design risk that RASM can detect during a 3D model review.

The MVP does not contain a complete rule engine.
Issues are curated engineering scenarios used to demonstrate the product value:

"Detect design risks before they become construction or operational problems."

---

# Issue Categories

## 1. Maintenance Accessibility

Issues related to equipment access, operation and maintenance constraints.

## 2. Spatial Conflicts (Clashes)

Issues related to physical interference between components.

## 3. Constructability

Issues related to installation difficulties and construction sequence.

## 4. Design Completeness

Issues related to missing or inconsistent elements.

## 5. Engineering Standards Compliance

Issues related to required engineering practices and references.

---

# ISSUE-001 — Insufficient Maintenance Clearance

## Category

Maintenance Accessibility

## Status

MVP Demo Issue

## Severity

High

## Description

The equipment does not have sufficient free space to allow normal maintenance operations.

The operator or maintenance technician may not be able to safely access the equipment without removing adjacent components.

## Affected Components

Example:

- Pump P-001
- Motor M-001
- Valve V-012

## Engineering Rule

ID:

MAINT-001

Name:

Minimum maintenance clearance

## Standard Reference

Example references:

- Manufacturer maintenance requirements
- Industrial design guidelines
- Customer specifications

## Detection Logic (Future)

Compare:

Required clearance distance

vs

Available 3D space around equipment

## Evidence

Example:

Required clearance:
1200 mm

Available clearance:
650 mm

## Impact

Potential consequences:

- Increased maintenance duration
- Unsafe intervention conditions
- Additional operational downtime

## Recommendation

Increase accessible space around the equipment or modify the equipment layout.

## 3D Behavior

When selected:

- Highlight affected equipment
- Move camera to equipment
- Display clearance area


---

# ISSUE-002 — Pipe Clash Detection

## Category

Spatial Conflict

## Status

MVP Demo Issue

## Severity

Critical

## Description

Two components occupy the same physical space or have insufficient separation.

## Affected Components

Example:

- Pipe P-034
- Cable tray CT-006

## Engineering Rule

ID:

CLASH-001

Name:

Physical interference detection

## Detection Logic (Future)

Calculate intersection between component geometries.

## Evidence

Example:

Detected overlap:

45 mm

## Impact

Potential consequences:

- Construction rework
- Installation delay
- Additional engineering cost

## Recommendation

Modify routing or elevation of affected components.

## 3D Behavior

When selected:

- Highlight both components
- Show collision area
- Focus camera on intersection


---

# ISSUE-003 — Missing Isolation Valve

## Category

Design Completeness

## Status

MVP Demo Issue

## Severity

Medium

## Description

A required isolation component is missing from the process design.

## Affected Components

Example:

Pipeline:

PIPE-102

Associated equipment:

Pump P-002

## Engineering Rule

ID:

DESIGN-001

Name:

Required isolation points

## Detection Logic (Future)

Check equipment connections against expected configuration.

## Impact

Potential consequences:

- Difficult maintenance operation
- Reduced operational flexibility

## Recommendation

Add isolation valve according to engineering requirements.

## 3D Behavior

When selected:

- Highlight pipeline area
- Display recommended component location


---

# ISSUE-004 — Equipment Access Obstruction

## Category

Maintenance Accessibility

## Status

MVP Demo Issue

## Severity

High

## Description

A component blocks access to another critical equipment element.

## Affected Components

Example:

- Pump P-003
- Pipe rack PR-01

## Engineering Rule

ID:

ACCESS-001

Name:

Equipment accessibility verification

## Evidence

Example:

Access path blocked by adjacent pipe.

## Impact

Potential consequences:

- Difficult intervention
- Increased maintenance risk

## Recommendation

Review equipment arrangement.

## 3D Behavior

When selected:

- Highlight blocking component
- Highlight affected equipment


---

# ISSUE-005 — Inadequate Equipment Space Allocation

## Category

Constructability

## Status

MVP Demo Issue

## Severity

Medium

## Description

The allocated space around equipment is insufficient for installation activities.

## Affected Components

Example:

- Tank T-001
- Structural frame S-003

## Engineering Rule

ID:

CONST-001

Name:

Installation space verification

## Impact

Potential consequences:

- Difficult installation sequence
- Additional site modifications

## Recommendation

Review equipment positioning before construction.

---

# ISSUE-006 — Incorrect Component Position

## Category

Design Consistency

## Status

MVP Demo Issue

## Severity

Medium

## Description

A component position does not respect expected engineering constraints.

## Affected Components

Example:

- Valve V-025

## Engineering Rule

ID:

DESIGN-002

Name:

Component positioning rule

## Impact

Potential operational inconvenience.

## Recommendation

Review component location.


---

# Issue Data Model
Each RASM issue must contain:
Issue {
id
title
category
severity
ruleId
standardReference
componentIds[]
description
evidence
impact
recommendation
cameraTarget
}
Issue {
id
title
category
severity
ruleId
standardReference
componentIds[]
description
evidence
impact
recommendation
cameraTarget
}

Each RASM issue must contain:
