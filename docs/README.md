# Learnify Documentation

## Quick Navigation

1. **[The Universal Blueprint](./01-universal-blueprint.md)** - Core philosophy and learning methodology
2. **[Hierarchy of Control](./02-hierarchy-of-control.md)** - Meta-categories, archetypes, and course structure
3. **[Onboarding Protocol](./03-onboarding-protocol.md)** - Adaptive user questionnaire system
4. **[Component Architecture](./04-component-architecture.md)** - UI component inventory and usage

---

## TL;DR

**The Problem:** Traditional education teaches "how to do" in a world where AI does the doing.

**The Solution:** Teach "how to verify, architect, and judge" — the skills AI cannot replace.

**The Method:**
- Present working systems with intentional flaws
- Student diagnoses architectural problems
- Visual feedback shows transformation
- AI evaluates judgment, not syntax

---

## Core Concepts

### The Variable Engine
Every course injects 5 universal variables:
- `{ENTITY}` - The atom
- `{STATE}` - Internal data
- `{FLOW}` - Interaction over time
- `{LOGIC}` - Rules
- `{INTERFACE}` - Abstraction

**Example:** Teaching loops via Tennis instead of abstract syntax.

### The 7 Modules
1. **The Atom** - Identity & State (encapsulation)
2. **The Standard** - Testing & Verification
3. **The Workflow** - Loops & Efficiency
4. **The Decision Tree** - Logic & Edge Cases
5. **The Archetype** - Interfaces & Polymorphism
6. **The Flow State** - Timing & Async
7. **The Capstone** - Full System Integration

### The 5 Meta-Categories
1. **Digital Systems** (Software, AI, Security)
2. **Economic Systems** (Trading, DeFi, Venture)
3. **Aesthetic Systems** (Music, Design, Games)
4. **Biological Systems** (Nutrition, Training, Nature)
5. **Cognitive Systems** (Strategy, Persuasion, Focus)

---

## Getting Started

### For Developers
1. Read: `01-universal-blueprint.md` for philosophy
2. Read: `04-component-architecture.md` for implementation
3. Check: `../src/components/` for code

### For Educators
1. Read: `01-universal-blueprint.md` for methodology
2. Read: `02-hierarchy-of-control.md` for course structure
3. Use: Variable Engine to design new courses

### For Product
1. Read: `03-onboarding-protocol.md` for user flow
2. Read: `02-hierarchy-of-control.md` for IA
3. Build: Missing onboarding components

---

## Architecture Overview

```
User Journey:
1. Select Meta-Category (e.g., Economic Systems)
   ↓
2. Choose Archetype (e.g., The Allocator)
   ↓
3. Input Obsession (e.g., Sneakers)
   ↓
4. System injects variables:
   - {ENTITY} = "Shoe"
   - {METRIC} = "Resale Price"
   ↓
5. Generate personalized course:
   "THE SNEAKER MARKET ARCHITECT"
```

---

## Component Count

- **19 Atoms** - Basic UI primitives
- **16 Molecules** - Simple combinations
- **10 Organisms** - Complex sections
- **5 Templates** - Complete page layouts

**Total: 50 components**

---

## What's Next

### Phase 1: Onboarding (Current)
- [ ] Build `ArchetypeSelector` component
- [ ] Build `DomainInput` component
- [ ] Build `VariableExtractor` component
- [ ] Build `SkillLevelPicker` component
- [ ] Build `CurriculumRecommendation` component
- [ ] Build `OnboardingPage` template

### Phase 2: Course Engine
- [ ] Implement variable injection system
- [ ] Build LLM integration for validation
- [ ] Create curriculum generator
- [ ] Add AI review system

### Phase 3: Content
- [ ] Build System_01 (Foundation) for each archetype
- [ ] Create example courses for each meta-category
- [ ] Design visualizations for each module

### Phase 4: Platform
- [ ] Add authentication
- [ ] Implement progress tracking
- [ ] Build analytics dashboard
- [ ] Add social features

---

## Key Insights

### Why This Works

1. **Cognitive Conflict** - Breaking flawed code teaches better than writing from scratch
2. **Domain Relevance** - Tennis/Sneakers reduce cognitive load vs. Foo/Bar
3. **Visualization** - Abstract concepts become concrete mental images
4. **Senior Eye** - Trains judgment (reading) not typing (writing)

### Why the Middle Layer Matters

```
❌ Wrong:
Meta-Category → Course
(Too abstract, no context)

✅ Correct:
Meta-Category → Archetype → Course
(Identity + Variables + Structure)
```

The Archetype is the configuration that injects variables into the template.

---

## Support

- **Issues:** [GitHub](https://github.com/your-org/learnify)
- **Docs:** This folder
- **Components:** `../src/components/`
- **Examples:** `../src/components/templates/`
