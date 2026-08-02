# RASM MVP Engineering Notes

## Purpose

This document contains engineering assumptions, validation notes, and technical considerations for the RASM MVP demonstration.

The objective is to ensure that product, engineering, and software development teams share the same understanding of what the MVP demonstrates.

The MVP objective is not to build a complete CAD analysis platform.

The objective is to prove:

> RASM can review an industrial 3D model, identify meaningful engineering risks, explain them clearly, and generate an actionable report.

---

# 1. MVP Engineering Scope

## What RASM Demonstrates

The MVP demonstrates:

- Industrial 3D model visualization
- Component identification
- Engineering issue detection
- Risk explanation
- 3D issue localization
- Engineering report generation

---

## What RASM Does Not Demonstrate Yet

The MVP does not include:

- Real-time CAD parsing
- Full IFC intelligence
- Automatic rule discovery
- Machine learning component recognition
- Customer-specific standards
- Multi-user collaboration
- Enterprise integrations

These capabilities belong to future versions.

---

# 2. Demo Model Definition

## Model Objective

The demo model must represent a realistic industrial environment.

Preferred examples:

- Water pumping station
- Water treatment unit
- Industrial process skid
- Mechanical installation

The model must contain enough complexity to demonstrate:

- Equipment relationships
- Piping systems
- Mechanical components
- Potential conflicts

---

# 3. Model Requirements

## Minimum Components

The model should contain:

### Equipment

Examples:

- Pumps
- Motors
- Valves
- Tanks
- Filters

### Piping

Examples:

- Process pipes
- Connections
- Supports

### Structures

Examples:

- Frames
- Platforms
- Access zones


---

# 4. 3D Model Preparation

## MVP Approach

The model is prepared offline.

Pipeline:

IFC / STEP Model

↓

Conversion

↓

GLB Model

↓

Component Manifest

↓

RASM Viewer


---

# 5. Component Identification

## MVP Principle

RASM does not use AI recognition in the MVP.

Component understanding comes from a prepared manifest.

Example:

```json
{
  "id": "PUMP-001",
  "type": "centrifugal_pump",
  "discipline": "mechanical",
  "nodeName": "Pump_Main_001"
}

Component Identity Requirements

Every component involved in an issue must have:

Unique identifier
Name
Type
3D node reference
Position information
6. Issue Validation Process
Principle

An issue must be meaningful for an industrial engineer.

A visually impressive problem is not enough.

Each issue must answer:

What is wrong?
Where is it located?
Why does it matter?
What is the recommended action?
7. Issue Quality Criteria

An MVP issue is valid if:

Technical Relevance

The problem represents a real engineering concern.

Example:

Incorrect maintenance clearance.

Visual Proof

The user can see the issue in the 3D model.

Example:

Highlighted pump with restricted access area.

Explanation Quality

The explanation is understandable by:

Engineer
Project manager
Decision maker
Actionability

The recommendation suggests a possible correction.

8. Engineering Review Workflow

Before adding an issue to the demo:

Identify Problem

↓

Define Engineering Rule

↓

Validate With Expert

↓

Map To 3D Component

↓

Create Issue Data

↓

Test Demo Experience

9. Severity Definition
Critical

Issue can cause:

Major redesign
Construction conflict
Safety concern
Significant cost impact
High

Issue can cause:

Maintenance difficulty
Operational impact
Additional engineering work
Medium

Issue represents:

Optimization opportunity
Minor design improvement
Low

Issue has:

Limited operational impact
10. Score Calculation Principles

The MVP dashboard must avoid creating a false impression of precision.

The score is illustrative.

Example:

Risk Score =

Number of detected issues
+
Severity weighting
+
Category distribution

The score must always show:

Methodology
Issue count
Severity breakdown

Never display:

"AI confidence = 97%"

unless technically justified.

11. AI Assistant Principles
MVP Approach

The assistant uses predefined engineering explanations.

Reason:

A reliable engineering answer is more valuable than a hallucinated AI answer.

Future Approach

Pilot version:

LLM
Engineering context
Rule references
Customer documentation
12. Report Requirements

The generated report must be credible enough to share internally.

Required sections:

Project information
Model analyzed
Analysis methodology
Detected issues
Engineering impact
Recommendations
Summary
13. Industrial Credibility Rules

RASM must always:

Avoid
Fake AI claims
Unsupported savings
Generic engineering statements
Black-box scores
Prefer
Explainable results
Engineering references
Visible evidence
Clear assumptions
14. Future Technical Evolution

MVP
GLB Model
+
Manifest
+
Curated Issues
+
Report
-----
Pilot
IFC Upload

↓

Geometry Processing

↓

Rule Engine

↓

Issue Database

↓

AI Explanation

----
Enterprise

Multi-format CAD/BIM

↓

Engineering Intelligence Platform

↓

Customer Rule Libraries

↓

Continuous Learning

-----
Final Engineering Principle

The MVP succeeds if an industrial customer says:

"I recognize my engineering problems, I understand the detected risks, and I want to test RASM on my own model."

The MVP fails if it only demonstrates:

"A beautiful 3D interface."
