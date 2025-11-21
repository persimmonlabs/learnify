# Database Schema

## Architecture Philosophy

**Template vs Instance:** The Universal Blueprint (template) is stored separately from Generated Courses (instances).

**Social Layer:** Users aren't just learners—they're part of a guild of architects. Progress is social proof.

---

## Schema Overview

### Layer 1: Identity & Profile (The "Who")
- `users` - Core user accounts
- `user_archetypes` - Onboarding results (meta-category, archetype, domain)
- `user_variables` - Key-value pairs from variable extraction

### Layer 2: Curriculum Engine (The "What")
- `blueprint_modules` - Universal curriculum templates
- `generated_courses` - User-specific course instances
- `generated_modules` - Hydrated content with injected variables
- `exercises` - Coding challenges and prompts
- `course_tags` - Discoverability metadata

### Layer 3: Progress & State (The "How")
- `user_progress` - Exercise attempts and completion
- `module_completions` - Module-level progress
- `architecture_reviews` - AI Senior Review scores

### Layer 4: Social Graph (The "Network")
- `user_relationships` - Follow/following connections
- `activity_feed` - Progress ticker events
- `achievements` - Gamification badges
- `user_achievements` - Earned achievements

### Layer 5: Discovery (The "Netflix")
- `recommendations` - Algorithmic course suggestions
- `trending_courses` - Cached velocity metrics
- `user_course_interactions` - View/start/complete events

---

## Detailed Schema

### 1. Identity & Profile

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### `user_archetypes`
```sql
CREATE TABLE user_archetypes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  meta_category VARCHAR(50) NOT NULL, -- 'digital', 'economic', etc.
  archetype VARCHAR(50) NOT NULL,     -- 'builder', 'allocator', etc.
  domain VARCHAR(100) NOT NULL,       -- User's passion (e.g., 'Sneakers')
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id) -- One archetype per user (for now)
);

CREATE INDEX idx_user_archetypes_user ON user_archetypes(user_id);
CREATE INDEX idx_user_archetypes_category ON user_archetypes(meta_category);
```

#### `user_variables`
```sql
-- Key-value store for variable injection
-- Flexible design supports different archetypes with different variables
CREATE TABLE user_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  variable_key VARCHAR(50) NOT NULL,   -- 'entity_primary', 'metric', 'container'
  variable_value TEXT NOT NULL,        -- 'Shoe', 'Resale Price', 'Vault'
  archetype_id UUID REFERENCES user_archetypes(id),
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, variable_key)
);

CREATE INDEX idx_user_variables_user ON user_variables(user_id);
```

---

### 2. Curriculum Engine

#### `blueprint_modules`
```sql
-- The static Universal Blueprint template
CREATE TABLE blueprint_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_number INTEGER NOT NULL,        -- 1-7
  title_template TEXT NOT NULL,          -- "The Atom: Encapsulating the {ENTITY}"
  concept_slug VARCHAR(50) NOT NULL,     -- 'atom_state', 'workflow_loops'
  description_template TEXT,
  learning_objectives JSONB,             -- Array of objectives with {ENTITY} placeholders
  rigor_level VARCHAR(20) DEFAULT 'standard', -- 'standard', 'advanced'
  estimated_hours INTEGER,
  prerequisites JSONB,                   -- Array of concept_slugs
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(module_number, concept_slug)
);

CREATE INDEX idx_blueprint_modules_number ON blueprint_modules(module_number);
CREATE INDEX idx_blueprint_modules_slug ON blueprint_modules(concept_slug);
```

#### `generated_courses`
```sql
-- User-specific course instances
CREATE TABLE generated_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,           -- "The Sneaker Market Architect"
  description TEXT,
  archetype_id UUID REFERENCES user_archetypes(id),
  status VARCHAR(20) DEFAULT 'active',   -- 'active', 'completed', 'archived'
  progress_percentage INTEGER DEFAULT 0,
  start_date TIMESTAMP DEFAULT NOW(),
  completion_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_generated_courses_user ON generated_courses(user_id);
CREATE INDEX idx_generated_courses_status ON generated_courses(status);
```

#### `generated_modules`
```sql
-- Hydrated content with user's variables injected
CREATE TABLE generated_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES generated_courses(id) ON DELETE CASCADE,
  blueprint_module_id UUID REFERENCES blueprint_modules(id),
  title VARCHAR(255) NOT NULL,           -- "Defining the Asset Class"
  description TEXT,
  content_json JSONB NOT NULL,           -- Full lesson: {sections, examples, visualizations}
  order_index INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(course_id, order_index)
);

CREATE INDEX idx_generated_modules_course ON generated_modules(course_id);
CREATE INDEX idx_generated_modules_blueprint ON generated_modules(blueprint_module_id);
```

#### `exercises`
```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES generated_modules(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,             -- 'code_review', 'refactor', 'build', 'diagnosis'
  title VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,                  -- The challenge description
  starter_code TEXT,                     -- The "Spaghetti Code"
  solution_code TEXT,                    -- The clean refactored version
  test_cases JSONB,                      -- Array of test case definitions
  flaws JSONB,                           -- Array of intentional flaws for diagnosis
  hints JSONB,                           -- Array of hints with penalty values
  difficulty VARCHAR(20),                -- 'easy', 'medium', 'hard'
  points INTEGER DEFAULT 100,
  time_limit_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_exercises_module ON exercises(module_id);
CREATE INDEX idx_exercises_type ON exercises(type);
```

#### `course_tags`
```sql
CREATE TABLE course_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES generated_courses(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,              -- 'high-rigor', 'finance', 'fast-paced'
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(course_id, tag)
);

CREATE INDEX idx_course_tags_tag ON course_tags(tag);
```

---

### 3. Progress & State

#### `user_progress`
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  submitted_code TEXT,
  status VARCHAR(20) NOT NULL,           -- 'pending', 'passed', 'failed'
  score INTEGER,                         -- 0-100
  attempts INTEGER DEFAULT 0,
  execution_time_ms INTEGER,
  memory_used_mb DECIMAL(10,2),
  test_results JSONB,                    -- Detailed test case results
  hints_revealed JSONB,                  -- Array of hint IDs revealed
  submitted_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, exercise_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
```

#### `module_completions`
```sql
CREATE TABLE module_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES generated_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  time_spent_minutes INTEGER,
  final_score INTEGER,

  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_module_completions_user ON module_completions(user_id);
```

#### `architecture_reviews`
```sql
-- AI Senior Review scores
CREATE TABLE architecture_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id),
  module_id UUID REFERENCES generated_modules(id),
  overall_score INTEGER NOT NULL,        -- 0-100
  code_sense_score INTEGER,              -- Category scores
  efficiency_score INTEGER,
  edge_cases_score INTEGER,
  taste_score INTEGER,
  strengths JSONB,                       -- Array of strength descriptions
  weaknesses JSONB,                      -- Array of improvement areas
  suggestions JSONB,                     -- Array of next steps
  passed BOOLEAN DEFAULT FALSE,
  reviewed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_architecture_reviews_user ON architecture_reviews(user_id);
```

---

### 4. Social Graph

#### `user_relationships`
```sql
CREATE TABLE user_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active',   -- 'active', 'muted', 'blocked'
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_relationships_follower ON user_relationships(follower_id);
CREATE INDEX idx_relationships_following ON user_relationships(following_id);
```

#### `activity_feed`
```sql
-- Read-optimized table for the "Ticker"
CREATE TABLE activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,    -- 'started_course', 'completed_module', 'passed_review', 'earned_achievement'
  reference_type VARCHAR(50),            -- 'course', 'module', 'exercise', 'achievement'
  reference_id UUID,                     -- FK to the relevant entity
  metadata JSONB,                        -- Additional context (score, time, etc.)
  visibility VARCHAR(20) DEFAULT 'friends', -- 'public', 'friends', 'private'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_feed_user ON activity_feed(user_id);
CREATE INDEX idx_activity_feed_created ON activity_feed(created_at DESC);
CREATE INDEX idx_activity_feed_type ON activity_feed(activity_type);
```

#### `achievements`
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT,
  category VARCHAR(50),                  -- 'completion', 'speed', 'quality', 'social'
  criteria_json JSONB NOT NULL,          -- Rules for earning
  rarity VARCHAR(20),                    -- 'common', 'rare', 'legendary'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_achievements_category ON achievements(category);
```

#### `user_achievements`
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,     -- Show on profile

  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
```

---

### 5. Discovery (The Netflix Layer)

#### `recommendations`
```sql
-- Algorithmic course suggestions
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recommended_course_id UUID REFERENCES generated_courses(id),
  score DECIMAL(3,2) NOT NULL,           -- 0.0-1.0 match probability
  reason_code VARCHAR(50),               -- 'similar_users', 'next_step', 'trending', 'friend_activity'
  display_text TEXT,                     -- "Because you finished Module 3..."
  metadata JSONB,                        -- Additional context
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_dismissed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_recommendations_score ON recommendations(score DESC);
```

#### `trending_courses`
```sql
-- Cached view for performance
CREATE TABLE trending_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES generated_courses(id),
  velocity_score DECIMAL(10,2) NOT NULL, -- Signups per hour
  rank_position INTEGER,
  time_window VARCHAR(20),               -- 'hour', 'day', 'week'
  calculated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(course_id, time_window)
);

CREATE INDEX idx_trending_courses_window ON trending_courses(time_window, rank_position);
```

#### `user_course_interactions`
```sql
-- Track views/starts/completions for recommendation engine
CREATE TABLE user_course_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES generated_courses(id),
  interaction_type VARCHAR(20) NOT NULL, -- 'viewed', 'started', 'completed', 'saved'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_interactions_user ON user_course_interactions(user_id);
CREATE INDEX idx_interactions_course ON user_course_interactions(course_id);
```

---

## Key Design Decisions

### 1. Template vs Instance Separation
- `blueprint_modules` = Universal template
- `generated_modules` = User-specific instance
- **Why:** One template, infinite personalized courses

### 2. Key-Value Variables
- `user_variables` uses flexible key-value pairs
- **Why:** Different archetypes need different variables

### 3. JSONB for Flexibility
- Content, test cases, flaws, hints stored as JSONB
- **Why:** LLM-generated content structure varies

### 4. Activity Feed Optimization
- Denormalized for read performance
- **Why:** The ticker is the most-viewed feature

### 5. Recommendations as Computed
- Pre-calculated and cached
- **Why:** Complex collaborative filtering is expensive

---

## Indexing Strategy

### High-Traffic Queries
```sql
-- Dashboard: User's courses
CREATE INDEX idx_courses_user_status ON generated_courses(user_id, status);

-- Ticker: Friend activity
CREATE INDEX idx_activity_user_created ON activity_feed(user_id, created_at DESC);

-- Recommendations: Top suggestions
CREATE INDEX idx_recs_user_score ON recommendations(user_id, score DESC, is_dismissed);

-- Social: Follower count
CREATE INDEX idx_relationships_counts ON user_relationships(following_id, status);
```

---

## Data Flow

### Onboarding → Course Generation
```
1. User completes onboarding
   → Insert into user_archetypes, user_variables

2. Trigger course generation
   → Read blueprint_modules
   → Inject user_variables into templates
   → LLM generates content
   → Insert into generated_courses, generated_modules

3. User starts learning
   → Read generated_modules
   → Display content with visualizations
```

### Progress → Social Feed
```
1. User completes exercise
   → Update user_progress
   → Check for achievements
   → Insert into activity_feed

2. Followers see activity
   → Query activity_feed for followed users
   → Display in ticker
```

### Recommendation Engine
```
1. Nightly job runs
   → Analyze user_course_interactions
   → Calculate collaborative filtering
   → Detect trending courses
   → Generate recommendations
   → Insert into recommendations table

2. User opens dashboard
   → Read cached recommendations
   → Display personalized rows
```


