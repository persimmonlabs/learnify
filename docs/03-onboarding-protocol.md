# The Onboarding Protocol v3

## Objective

Match the user's **Explicit Goal** (The Archetype) with their **Implicit Obsession** (The Domain).

**Key Innovation:** Questions adapt their vocabulary based on the Archetype selected.

---

## Step 1: The Goal (The "What")

**Question:** "What system do you want to architect?"

**Options:**
- **Digital Systems** (Coding, AI, Automation)
  - Sets Archetype: THE BUILDER
  - Sets Vocabulary: Entity, Loop, Database

- **Economic Systems** (Investing, Trading, Business)
  - Sets Archetype: THE ALLOCATOR
  - Sets Vocabulary: Asset, Cycle, Portfolio

- **Aesthetic Systems** (Music, Design, Writing)
  - Sets Archetype: THE COMPOSER
  - Sets Vocabulary: Element, Pattern, Composition

- **Biological Systems** (Health, Training, Nature)
  - Sets Archetype: THE OPTIMIZER
  - Sets Vocabulary: Nutrient, Process, Output

- **Cognitive Systems** (Persuasion, Focus, Strategy)
  - Sets Archetype: THE STRATEGIST
  - Sets Vocabulary: Model, Bias, Influence

**User selects:** Economic Systems

---

## Step 2: The Anchor (The "Context")

**Message:** "We don't teach Economics using 'Widgets' and 'Supply Curves'. We teach using your obsession."

**Question:** "What is the one topic you could talk about for 30 minutes without preparing?"

**User Input:** `Sneakers`

**System Check:** LLM validates domain validity.

**Variable Captured:** `{DOMAIN} = "Sneakers"`

---

## Step 3: The Calibration (Adaptive Extraction)

Questions **swap wording** based on Archetype from Step 1.

### Question 3.1: The Atom/Asset

**If Builder:**
"What is the single most important object you track?"

**If Allocator:**
"In your domain, what is the single unit of value you buy or sell?"

**If Composer:**
"What is the fundamental sound or note?"

**User sees (Allocator):**
"In your domain, what is the single unit of value you buy or sell?"

**User Input:** `"The Shoe"`

**Variable:** `{ENTITY_PRIMARY} = "Shoe"`

---

### Question 3.2: The Metric/Yield

**If Builder:**
"What data changes most often?"

**If Allocator:**
"How do you measure the value or performance of a [Shoe]?"

**User sees (Allocator):**
"How do you measure the value or performance of a [Shoe]?"

**User Input:** `"Resale Price"`

**Variable:** `{STATE_METRIC} = "Resale Price"`

---

### Question 3.3: The Collection/Portfolio

**If Builder:**
"Where do you store a list of [Shoe]s?"

**If Allocator:**
"Where do you store your assets to keep them safe?"

**User sees (Allocator):**
"Where do you store your assets to keep them safe?"

**User Input:** `"The Vault"`

**Variable:** `{ENTITY_SECONDARY} = "Vault"`

---

## Step 4: The Baseline (Skill Level)

**Question:** "What is your current tool for managing [Sneaker] data?"

**Options:**
- **"Intuition (I just guess)"**
  - Level: Novice
  - Start: Module 1 (The Asset)

- **"Spreadsheets / Excel"**
  - Level: Analyst
  - Start: Module 3 (The Workflow)
  - Focus: Models

- **"Complex Charts / Scripts"**
  - Level: Quant
  - Start: Module 2 (The Standard)
  - Focus: Risk Logic

**User selects:** Spreadsheets

---

## Step 5: The Recommendation (The Manifesto)

AI generates a personalized pitch using the user's vocabulary:

### Headline
**THE SNEAKER MARKET ARCHITECT**

### Subtitle
Stop collecting. Start allocating.

### The "Why" (Generated)
> "You selected Economic Systems, but standard finance courses are boring.
> You live and breathe Sneakers.
> So we aren't going to 'learn Economics'.
> We are going to build a Resale Vault Strategy that optimizes Resale Price."

### Personalized Curriculum

**Module 1: Defining the Asset Class (The Atom)**
Concept: Identity & State
Project: "Stop viewing shoes as objects. View them as Assets with liquidity and volatility."

**Module 3: The Market Cycle (The Workflow)**
Concept: Loops & Trends
Project: "Model the hype cycle of a Jordan release using market logic."

**Capstone: The Vault Fund (The Simulation)**
Concept: Full System Integration
Project: "Build a diversified portfolio strategy that beats the S&P 500."

**Action:** [Initialize System_01: Sneaker Edition]

---

## Data Payload (Sent to Engine)

```json
{
  "user_id": "88b9c0d",
  "archetype": "THE_ALLOCATOR",
  "config": {
    "domain": "Sneakers",
    "entity": "Shoe",
    "metric": "Resale Price",
    "container": "Vault",
    "metaphor_base": "Market"
  },
  "startModule": 3,
  "skillLevel": "analyst"
}
```

---

## Implementation Notes

### UI Components Needed
- `ArchetypeSelector` - Step 1 card selection
- `DomainInput` - Step 2 text input with validation
- `VariableExtractor` - Step 3 adaptive questions
- `SkillLevelPicker` - Step 4 tool selection
- `CurriculumRecommendation` - Step 5 manifesto display

### Backend Requirements
- LLM endpoint for domain validation
- Variable injection engine
- Curriculum generator API
- User profile persistence

---

## Next Steps

See `04-component-architecture.md` for UI implementation details.
