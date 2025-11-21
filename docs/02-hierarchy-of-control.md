# The Hierarchy of Control

## The 3-Layer System

Users don't choose "topics" — they choose **Systems of Control**. The platform has 3 layers that generate courses via runtime injection.

---

## Layer 1: The Meta-Category (The Domain)

**The 5 domains where architecture matters more than labor:**

### 1. Digital Systems (Tools & Logic)
**Core Desire:** "I want to build tools that work while I sleep."
**Physics:** Algorithms, APIs, Automation
**Examples:** Software, AI Agents, Cybersecurity

### 2. Economic Systems (Value & Exchange)
**Core Desire:** "I want to understand how value moves so I can capture it."
**Physics:** Assets, Markets, Compounding
**Examples:** Trading, DeFi, Venture Capital

### 3. Aesthetic Systems (Pattern & Emotion)
**Core Desire:** "I want to curate experiences that move people."
**Physics:** Harmony, Composition, Narrative
**Examples:** Music, Design, Game Design

### 4. Biological Systems (Energy & Matter)
**Core Desire:** "I want to optimize my physical vessel."
**Physics:** Metabolism, Chemistry, Biomechanics
**Examples:** Nutrition, Training, Permaculture

### 5. Cognitive Systems (Information & Bias)
**Core Desire:** "I want to master my mind and influence others."
**Physics:** Mental Models, Persuasion, Game Theory
**Examples:** Negotiation, Rhetoric, Focus

---

## Layer 2: The Archetype (The Configuration)

**The identity you choose within a domain. This injects variables into the course engine.**

### Example: Digital Systems

#### Archetype A: The Builder (Software Engineer)
- **Focus:** Constructing applications
- `{ENTITY}` = Object
- `{FLOW}` = Loop
- **Courses:** System_01, Distributed Systems

#### Archetype B: The Commander (Agent Orchestrator)
- **Focus:** Managing AI swarms
- `{ENTITY}` = Agent
- `{FLOW}` = Workflow
- **Courses:** Swarm Logic, Automation

#### Archetype C: The Defender (Cybersecurity)
- **Focus:** Protecting systems
- `{ENTITY}` = Vulnerability
- `{FLOW}` = Attack Vector
- **Courses:** Penetration Testing, Zero-Trust

### Example: Economic Systems

#### Archetype A: The Allocator (Investor)
- **Focus:** Moving capital to highest yield
- `{ENTITY}` = Asset
- `{FLOW}` = Compound Interest
- **Courses:** Market Mechanics, Risk Topology

#### Archetype B: The Founder (Venture)
- **Focus:** Creating new value
- `{ENTITY}` = Product
- `{FLOW}` = Iteration Cycle
- **Courses:** Cap Table Logic, PMF Systems

---

## Layer 3: The System (The Course)

**The actual curriculum using the 7 Universal Modules.**

Each Archetype has 3 difficulty levels:
1. **System_01:** Foundation (Modules 1-3)
2. **System_02:** Scale & Complexity (Modules 4-5)
3. **System_03:** Integration Capstone (Modules 6-7)

---

## Why the Middle Layer is Necessary

### Without Archetypes (Wrong):
```
Meta-Category: Digital Systems
↓
Course: ??? (Which variables to inject?)
```

### With Archetypes (Correct):
```
Meta-Category: Digital Systems
↓
Archetype: The Builder
  → {ENTITY} = Object
  → {FLOW} = Loop
↓
Course: System_01 (Foundation)
  → Module 1 uses Object as {ENTITY}
  → Module 3 uses Loop as {FLOW}
```

---

## The User Journey

1. **"What system do you want to architect?"**
   - User selects Meta-Category (e.g., Economic Systems)

2. **"Which architect do you want to be?"**
   - User selects Archetype (e.g., The Allocator)

3. **Personalization**
   - User enters obsession (e.g., Sneakers)
   - System injects domain-specific variables

4. **Curriculum Generated**
   - "THE SNEAKER MARKET ARCHITECT"
   - Modules use Sneakers as context for economic concepts

---

## Data Structure

```javascript
{
  "metaCategory": "economic_systems",
  "archetype": {
    "id": "allocator",
    "name": "The Allocator",
    "variables": {
      "entity": "Asset",
      "flow": "Compound Interest",
      "logic": "Market Dynamics"
    }
  },
  "personalization": {
    "domain": "Sneakers",
    "entity": "Shoe",
    "metric": "Resale Price",
    "container": "Vault"
  },
  "course": "system_01",
  "startModule": 1
}
```

---

## Next Steps

See `03-onboarding-protocol.md` for the adaptive questionnaire system.
