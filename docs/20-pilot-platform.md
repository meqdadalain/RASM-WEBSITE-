# 20. Pilot Platform

## Purpose

After the MVP demo has validated market interest, RASM evolves into a pilot platform allowing industrial customers to analyze their own projects.

The objective is not to become a complete SaaS platform immediately.

The objective is to validate the engineering engine on real customer projects.

---

# Pilot Objectives

The pilot platform must allow a customer to:

- Upload an IFC model
- Launch an analysis
- Receive an engineering report
- Review detected issues
- Validate or reject findings
- Share the report internally

---

# Initial Capabilities

## Project

- One organization
- One project
- Multiple analysis runs

---

## Upload

Supported format:

- IFC

Future:

- STEP
- Revit export
- Navisworks

---

## Processing Pipeline

Customer Upload

↓

Storage

↓

IFC Conversion

↓

Component Manifest

↓

Rule Engine

↓

Issues

↓

Dashboard

↓

Report

---

# Authentication

Simple authentication only.

- Email magic link
- Optional SSO for enterprise pilots

No complex permissions.

---

# Feedback Loop

Each issue can be marked as:

- Open
- Confirmed
- False Positive
- Resolved

This feedback improves future rule quality.

---

# Success Criteria

A pilot is successful when:

- Customer uploads their own project.
- RASM detects at least one validated engineering issue.
- Customer requests another analysis.

The objective is engineering validation, not feature completeness.
