# 13 — 3D Viewer

## Purpose

The 3D Viewer is the core of the RASM experience.

It is not a generic CAD viewer.

Its purpose is to help engineers understand industrial models, visualize engineering issues and make informed decisions.

The viewer transforms engineering analysis into an interactive visual experience.

---

# Mission

The viewer must answer three questions immediately:

- Where is the issue?
- What components are involved?
- Why is it important?

If those three questions are answered in seconds, the viewer succeeds.

---

# Design Principles

## Engineering First

The model is a technical document.

Rendering should prioritize clarity over visual realism.

---

## Explain Through Interaction

Every interaction reveals engineering information.

Selecting an object should explain its role.

Selecting an issue should explain its impact.

---

## One Source of Truth

The model displayed is always linked to:

- component metadata
- engineering rules
- detected issues
- AI explanations

The viewer never contains isolated visual elements.

---

# Responsibilities

The Viewer is responsible for:

- displaying the industrial model
- camera navigation
- component selection
- issue highlighting
- issue localization
- engineering context visualization

It is not responsible for analysis.

---

# Supported Model

MVP:

One GLB model.

Future:

- IFC
- STEP
- Revit (through IFC workflow)

---

# Viewer Layout

```
+------------------------------------------------------+

Toolbar

+------------------------------------------------------+

Navigation Controls

3D Model

Issue Overlay

+------------------------------------------------------+

Status Bar

+------------------------------------------------------+
```

---

# Camera Controls

Supported interactions:

- Orbit
- Pan
- Zoom
- Reset View
- Focus Component
- Focus Issue

Future:

- Saved viewpoints
- Section planes
- Exploded view

---

# Component Selection

Clicking a component displays:

- Name
- Discipline
- Category
- Engineering metadata
- Associated issues

Selected components remain highlighted.

---

# Issue Highlighting

Each issue references one or more components.

Severity colors:

Critical

Red

Major

Orange

Minor

Yellow

Information

Blue

Only affected components are highlighted.

The rest of the model remains visible.

---

# Camera Focus

Selecting an issue automatically:

1. Computes target position

2. Animates camera

3. Centers affected components

4. Highlights components

5. Opens issue details

Camera movement should feel smooth and predictable.

---

# Viewer Toolbar

MVP buttons:

- Reset Camera
- Fit Model
- Toggle Issue Highlights
- Screenshot
- Export Report

Future:

- Section View
- Exploded View
- Measurement Tool
- View Presets

---

# Component Information

Each component contains:

- Component ID
- Name
- Type
- Discipline
- Standard Reference
- Status

The viewer retrieves this information from the component manifest.

---

# Rendering

Rendering priorities:

- readability
- performance
- precision

Avoid excessive visual effects.

Engineering information must remain readable.

---

# Performance Targets

Initial load:

< 5 seconds

Frame rate:

60 FPS target

Selection latency:

< 100 ms

Camera animation:

< 500 ms

---

# Data Flow

```
GLB Model

↓

Component Manifest

↓

Viewer

↓

User Interaction

↓

Selected Component

↓

Issue Lookup

↓

AI Explanation
```

The Viewer never performs engineering analysis.

It only visualizes analysis results.

---

# Integration

The Viewer communicates with:

Issue Panel

↓

Dashboard

↓

AI Assistant

↓

Report Generator

Every interaction updates all connected modules.

---

# Future Evolution

Pilot:

- IFC loading
- Multiple models
- Component search

Enterprise:

- Section cuts
- Exploded assemblies
- Clash visualization
- Model comparison
- Review annotations
- Collaborative sessions

---

# Success Criteria

The Viewer succeeds when an engineer can:

- navigate the model intuitively
- identify affected components immediately
- understand engineering context
- locate every issue in seconds
- trust the visualization

The Viewer is the visual foundation of RASM.
