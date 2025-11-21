# Social Architecture

## Philosophy: Strava for Brains

**Not Facebook. Not Twitter. Strava.**

We build **Passive Social** — automated activity logs that showcase work, not fluff. No likes, no comments, no status updates. Just data-driven progress that inspires.

---

## The Three Pillars

### 1. The Ticker (Activity Feed)
**What:** Live stream of friend progress
**Why:** Proof of life. Learning feels multiplayer, not lonely.
**Format:** Data-driven achievements

**Examples:**
- "Alex optimized O(n²) → O(n) in Module 3"
- "Sarah passed Senior Review with 95% Architecture Score"
- "Jordan completed The Allocator in 6 days"

**Not This:**
- "Feeling motivated today! 💪"
- "Just started learning to code"
- Generic status updates

---

### 2. The Netflix Rows
**What:** Algorithmic course recommendations
**Why:** Solves "What next?" paralysis. Keeps users in ecosystem.

**Row Types:**

#### A. Continue Learning
User's in-progress courses (obvious)

#### B. Trending Among Architects
Social proof — what the network is taking this week
- Velocity metric: Signups per hour
- Friend overlay: "Alex and 2 others started this"

#### C. Your Friends Are Learning
Specific courses your network is currently taking
- Reason: "Because Sarah is taking this"
- Progress: "Module 3 of 7"

#### D. Because You Mastered [X]
Algorithmic — skill adjacency graph
- Logic: "Loops → Recursion"
- Logic: "Market Mechanics → Risk Modeling"

---

### 3. The Living Resume
**What:** Your profile is a system of record for skills
**Why:** Status + FOMO. Reason to stay even after course completion.

**Profile Elements:**
- Archetype title ("The Sneaker Architect")
- Courses completed (public)
- Architecture Review scores (optional public)
- Achievement badges
- Current learning (live progress ring)

**Not a LinkedIn clone:**
- No job history
- No endorsements
- No "skills" checkboxes
- Pure learning achievements

---

## Recommendation Engine

### Collaborative Filtering
"Users who built X also built Y"

```
Algorithm:
1. Find users with >80% overlap in completed courses
2. Identify courses they took that user hasn't
3. Rank by completion rate (higher = better match)
4. Display with reason: "Similar Architects learned this"
```

### Skill Adjacency
"You mastered Loops, next is Recursion"

```
Knowledge Graph:
- Loops → Recursion
- Encapsulation → Inheritance
- Market Mechanics → Risk Models
- Harmony → Counterpoint

Algorithm:
1. Detect completed concepts
2. Query graph for adjacent nodes
3. Filter for user's archetype
4. Display with reason: "Next logical step"
```

### Social Signals
"3 friends are taking this"

```
Algorithm:
1. Query user's following list
2. Find courses with 2+ active followers
3. Rank by recency (started in last 7 days)
4. Display with avatars + reason
```

### Trending Velocity
"Hot this week"

```
Metric: (Signups last 24h) / (Signups previous 24h)
- Velocity > 2.0 = "Trending"
- Velocity > 5.0 = "Hot"

Cache in trending_courses table
Refresh every hour
```

---

## Anti-Patterns (What We Avoid)

### ❌ Fluff Social
- No "like" buttons
- No comments on progress
- No status updates
- No "walls" or "feeds" of text

**Why:** Dilutes the rigor. We are not Facebook.

### ❌ Vanity Metrics
- No follower count races
- No "streak" anxiety
- No artificial gamification

**Why:** Extrinsic motivation corrupts intrinsic learning.

### ❌ Noise
- No notifications for every action
- No "X started following you"
- No email spam

**Why:** Respect attention. Signal > Noise.

---

## The Right Amount of Social

### ✅ What We Do
**Data-Driven Progress Broadcasts:**
- Module completions
- Senior Review passes
- Code optimizations
- Achievement unlocks

**Algorithmic Discovery:**
- Personalized recommendations
- Trending courses
- Friend activity highlights

**Passive Inspiration:**
- See friends building systems
- Compare architectures (optional)
- Learn from others' solutions (post-completion)

---

## Privacy Tiers

### Public (Default)
- Courses completed
- Achievements earned
- Archetype title

### Friends-Only
- In-progress courses
- Module completions
- Architecture Review scores

### Private
- Code submissions
- Failed attempts
- Hint usage

---

## The UX Flow

### Dashboard Layout

```
┌─────────────────────────────────────┬──────────────┐
│ Continue Learning                   │ Activity     │
│ [Course Card] [Course Card]         │ Feed         │
│                                     │ [Ticker]     │
│ Trending Among Architects           │              │
│ [Horizontal Scroll Row]             │ People to    │
│                                     │ Follow       │
│ Your Friends Are Learning           │ [Cards]      │
│ [Horizontal Scroll Row]             │              │
│                                     │              │
│ Because You Mastered X              │              │
│ [Horizontal Scroll Row]             │              │
└─────────────────────────────────────┴──────────────┘
```

### Activity Ticker Item

```
┌────────────────────────────────────┐
│ [Avatar] Alex just optimized       │
│          O(n²) → O(n) in Module 3  │
│          2h ago • 95% score        │
└────────────────────────────────────┘
```

### Recommendation Card

```
┌──────────────────────────┐
│ [Thumbnail]              │
│ ┌────────────────────┐   │
│ │ 87% Match          │   │
│ └────────────────────┘   │
│                          │
│ The High-Frequency       │
│ Trading Architect        │
│                          │
│ Because you finished     │
│ "Optimization Logic"     │
│                          │
│ Medium • 4 weeks         │
│ 👥 3 friends             │
└──────────────────────────┘
```

---

## Success Metrics

### Engagement
- **Ticker views per session:** Target >5
- **Recommendation clicks:** Target >20% CTR
- **Friend follows per week:** Target 2-3

### Retention
- **7-day return rate:** Target >70% (with social vs. 40% without)
- **Course completion rate:** Target >60% (with social vs. 35% without)

### Network Effects
- **DAU grows faster than signups:** Viral coefficient >1.2
- **Friend invites per user:** Target 3+ within first 30 days

---

## Implementation Priority

### Phase 1: The Ticker (Critical)
Without this, it's not social. Build first.
- `activity_feed` table
- `ActivityTicker` component
- Real-time updates (polling or WebSocket)

### Phase 2: Netflix Rows
Keeps users engaged post-completion.
- `recommendations` table
- Collaborative filtering algorithm
- `RecommendationRow` component

### Phase 3: Profiles
Gives users a "home" on the platform.
- Public profile pages
- Achievement showcase
- Optional architecture portfolio

### Phase 4: Discovery
Helps network grow organically.
- Friend suggestions
- Architect search
- Course sharing

---

## Technical Considerations

### Performance
- **Cache aggressively:** Trending courses, recommendations
- **Denormalize activity feed:** Read-optimized, write-heavy is fine
- **Paginate everything:** Never load full feed at once

### Real-Time
- **Polling (Phase 1):** 10-second intervals, good enough
- **WebSocket (Phase 2):** If >10k DAU, upgrade for instant updates

### Privacy
- **Default to friends-only:** Respect introversion
- **Easy opt-out:** Global setting to hide all social features
- **No surprise broadcasts:** Explicit consent for profile visibility

---

## Next Steps

See `05-database-schema.md` for table structure.
See `SocialDashboardPage.jsx` for UI implementation.

---

**Remember:** We are building **Strava for Brains**, not Facebook for Learning.
- Data-driven
- Passive social
- Work > Fluff
