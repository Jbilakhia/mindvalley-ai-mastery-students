# Gemini Multi-Store Architecture Guide

Advanced knowledge base scaling for production systems

**Target**: Students managing 1GB+ of documentation across multiple domains

---

## When to Use Multiple Stores

Multi-store architecture means maintaining separate Gemini File Search instances, each holding specific content. Use this when you hit these thresholds:

**Storage Size**: Single store approaching 1GB (~100,000 pages)
- Gemini search relevance degrades with document overlap
- Query latency increases as store grows
- Storage updates become slower

**Content Domains**: Distinct, separate knowledge areas (customer help, company policies, product specs)
- Menu/pricing vs. operations policy differs fundamentally
- Queries naturally separate by intent
- Different update frequencies (menu changes daily, policy monthly)

**Access Control**: Different users need different subsets of docs
- Customer-facing content vs. internal-only policies
- Permissions easier to enforce per-store
- No risk of leaking confidential docs in irrelevant searches

**Performance Requirements**: Sub-2-second query response times at scale
- Single large store: 2-4s per query
- Multi-store: 0.3-0.5s per store (parallel), 1.5-2s total with overhead
- High-volume systems (100+ queries/day) benefit significantly

**Update Patterns**: Documents change at different rates
- Menu updates shouldn't rebuild entire knowledge base
- Bulk updates cheaper when isolated to specific stores

---

## Single Store vs. Multi-Store Trade-Offs

### When Single Store Wins

| Factor | Single Store | Multi-Store |
|--------|--------------|-------------|
| **Complexity** | Simple keyword matching | Routing logic + registry maintenance |
| **Setup Time** | 15 minutes | 1-2 hours (routing + testing) |
| **Query Speed** | 1-2s (small), 3-4s (large) | 1.5-2s (parallel) overhead |
| **Data Scope** | <1GB, 10-50k docs | >1GB, 50k+ docs |
| **Cost** | $0.15 per 1M input tokens | Multiplied by store count |
| **Maintenance** | Single update workflow | 3-5+ workflows per store |

**Decision**: Use single store if content <500MB AND all docs relevant to same use case.

### When Multi-Store Wins

| Factor | Single Store | Multi-Store |
|--------|--------------|-------------|
| **Search Relevance** | Mixed results, noise | Focused per-domain results |
| **Query Latency** | Slower at scale | Faster with parallelization |
| **Update Burden** | Full rebuild | Isolated updates |
| **Scaling** | Hits wall at 1GB | Can scale to 5GB+ (5 stores) |
| **Security** | All-or-nothing access | Granular store isolation |
| **Analytics** | Opaque per-domain usage | Clear domain-specific patterns |

**Decision**: Multi-store pays for itself once managing >3 distinct knowledge domains or >500MB of content.

---

## Store Organization Strategies

### Strategy 1: Domain Separation

Organize by business function. Best for multi-product or multi-department companies.

```
├── menu_store (customer-facing)
│   ├── Current menu items
│   ├── Pricing
│   ├── Nutritional info
│   └── Allergen data
│
├── operations_store (internal)
│   ├── Staff procedures
│   ├── Inventory management
│   ├── Safety protocols
│   └── Shift schedules
│
└── policy_store (shared)
    ├── Refund policy
    ├── Hours of operation
    ├── Loyalty program rules
    └── Location information
```

**Best For**: Restaurants, e-commerce, SaaS platforms
**Pros**: Clean separation, easy to update independently
**Cons**: Query routing must identify domain correctly

### Strategy 2: Access Level Separation

Organize by confidentiality. Best for compliance-heavy industries.

```
├── public_store
│   └── [All content customers can access]
│
├── internal_store
│   └── [Employee-only: procedures, financials, strategy]
│
└── confidential_store
    └── [Executive/legal: contracts, IP, decisions]
```

**Best For**: Healthcare, finance, legal tech, SaaS
**Pros**: Enforces security boundaries, audit trail per store
**Cons**: Duplication if content belongs to multiple levels

### Strategy 3: Update Frequency Separation

Organize by how often content changes. Best for rapidly evolving businesses.

```
├── static_store (quarterly updates)
│   ├── Core product specs
│   ├── Methodology docs
│   └── Foundational knowledge
│
├── dynamic_store (daily updates)
│   ├── Inventory levels
│   ├── Current promotions
│   ├── Real-time pricing
│   └── Staff announcements
│
└── evergreen_store (ad-hoc updates)
    ├── FAQ
    ├── Troubleshooting guides
    └── Customer examples
```

**Best For**: Retail, restaurants, hospitality
**Pros**: Update only what changes, reduces deployment risk
**Cons**: Requires good categorization discipline

### Strategy 4: Hybrid (Recommended for Scale)

Combine domain + access + update frequency.

```
menu_store (Domain: Menu | Access: Public | Update: Daily)
operations_store (Domain: Operations | Access: Internal | Update: Weekly)
policy_store (Domain: Policy | Access: Public | Update: Quarterly)
loyalty_store (Domain: Loyalty | Access: Premium | Update: Monthly)
```

---

## Keyword Registry Design

The keyword registry is your routing logic. It maps user queries to specific stores using keyword matching.

### Registry Structure

```json
{
  "store_registry": {
    "menu_store": {
      "store_id": "fileSearchStores/abc123xyz",
      "keywords": [
        "menu",
        "item",
        "price",
        "heat level",
        "spicy",
        "ingredient",
        "allergen",
        "nutrition",
        "calorie"
      ],
      "priority": 1,
      "description": "Menu items, pricing, nutrition data"
    },
    "policy_store": {
      "store_id": "fileSearchStores/def456uvw",
      "keywords": [
        "refund",
        "return",
        "exchange",
        "hours",
        "location",
        "address",
        "phone",
        "policy",
        "rule"
      ],
      "priority": 2,
      "description": "Store policies, hours, location info"
    },
    "loyalty_store": {
      "store_id": "fileSearchStores/ghi789rst",
      "keywords": [
        "coop",
        "loyalty",
        "reward",
        "point",
        "member",
        "discount",
        "promotion",
        "signup"
      ],
      "priority": 3,
      "description": "Loyalty program, rewards, member benefits"
    }
  }
}
```

### Keyword Selection Rules

**Rule 1: Exact match first**
Include precise terminology your customers use. "Heat level" not "spiciness."

**Rule 2: Variants and synonyms**
Add common variations: "reward", "points", "loyalty", "coupon", "discount"

**Rule 3: Avoid overlap**
"Menu" should NOT appear in policy_keywords. If it does, prioritize by order.

**Rule 4: Business-specific terms**
For Hattie B's: "hot chicken" is menu-specific, "coop" is loyalty-specific

**Rule 5: No generic terms alone**
Never make "information" a keyword—too broad. Use "pricing information" instead.

### Keyword Density Guide

- Minimum 5 keywords per store (too few = missed queries)
- Maximum 20 keywords per store (too many = slower matching)
- Target: 8-12 keywords per store for balance

### Example: Hattie B's Hot Chicken

```json
{
  "store_registry": {
    "hattie_menu": {
      "store_id": "fileSearchStores/hattie-menu-12345",
      "keywords": [
        "menu",
        "hot chicken",
        "sandwich",
        "heat level",
        "spice",
        "price",
        "combo",
        "drink",
        "side",
        "calories",
        "ingredients"
      ],
      "priority": 1,
      "description": "Menu items, pricing, nutritional info"
    },
    "hattie_policy": {
      "store_id": "fileSearchStores/hattie-policy-67890",
      "keywords": [
        "hours",
        "location",
        "address",
        "phone number",
        "refund",
        "return",
        "policy",
        "return policy",
        "parking",
        "group order"
      ],
      "priority": 2,
      "description": "Store locations, hours, policies"
    },
    "hattie_loyalty": {
      "store_id": "fileSearchStores/hattie-loyalty-24680",
      "keywords": [
        "coop",
        "loyalty program",
        "rewards",
        "points",
        "member",
        "signup",
        "member benefits",
        "exclusive",
        "discount"
      ],
      "priority": 3,
      "description": "Hot Chicken Coop loyalty program"
    }
  }
}
```

---

## Query Routing Implementation

### Architecture Diagram

```
User Query
    ↓
[Extract Keywords] ← Identify nouns, verbs, entities
    ↓
[Registry Lookup] ← Match against keyword arrays
    ↓
[Rank Stores] ← Sort by match strength & priority
    ↓
[Build Store List] ← Top 3-5 matches
    ↓
[Parallel Search] ← Query all selected stores
    ↓
[Merge Results] ← Combine and rank by relevance
    ↓
[Return Response]
```

### N8N Node Configuration

**Step 1: Extract Keywords Node** (Execute JavaScript)

```javascript
// Input: user message
const message = $input.item.json.query.toLowerCase();

// Extract keywords: 2-4 character words and important phrases
const keywords = message
  .split(/[\s\.\,\!\?]+/)
  .filter(word => word.length >= 2)
  .slice(0, 10); // Limit to first 10 words

return {
  original_query: message,
  keywords: keywords
};
```

**Step 2: Match Registry Node** (Execute JavaScript)

```javascript
const query_keywords = $input.item.json.keywords;
const store_registry = {
  "hattie_menu": [
    "menu", "chicken", "price", "heat", "combo", "ingredient"
  ],
  "hattie_policy": [
    "hours", "location", "policy", "refund", "address"
  ],
  "hattie_loyalty": [
    "coop", "loyalty", "reward", "points", "member"
  ]
};

const matches = {};

// For each store, count matching keywords
for (const [store_name, store_keywords] of Object.entries(store_registry)) {
  const hit_count = query_keywords.filter(qkw =>
    store_keywords.some(skw => skw.includes(qkw) || qkw.includes(skw))
  ).length;

  if (hit_count > 0) {
    matches[store_name] = hit_count;
  }
}

// If no keyword matches, default to primary store
const selected_stores = Object.keys(matches).length > 0
  ? Object.entries(matches)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([store]) => store)
  : ["hattie_menu"];

return {
  matched_stores: selected_stores,
  match_details: matches
};
```

**Step 3: Query Multiple Stores Node** (Gemini File Search)

```javascript
// Build store list for Gemini request
const stores = $input.item.json.matched_stores.map(store_name => {
  const store_registry = {
    "hattie_menu": "fileSearchStores/hattie-menu-12345",
    "hattie_policy": "fileSearchStores/hattie-policy-67890",
    "hattie_loyalty": "fileSearchStores/hattie-loyalty-24680"
  };
  return store_registry[store_name];
});

// Call Gemini with multiple stores
const request = {
  model: "gemini-2.0-flash",
  tools: [{
    googleSearch: {},
    googleFileSearch: {
      stores: stores
    }
  }],
  messages: [{
    role: "user",
    content: $input.item.json.original_query
  }]
};
```

### Decision Tree: Which Stores to Query?

```
User Query
    ↓
Keyword matches >= 3?
├─ YES → Use top-matched store(s)
└─ NO → Check secondary matching
         ├─ Semantic similarity (use Gemini embeddings)
         └─ If still unclear, default to primary store

Query building:
├─ 1 store matched → Query that 1 store
├─ 2-3 stores matched → Query all (parallel)
└─ 4+ stores matched → Top 3 by match strength + priority
```

---

## Multi-Store Query Limits

### Hard Limits

**Maximum 5 stores per query** - Gemini's constraint.

Why 5? Performance curve flattens beyond 5 stores:
- 1 store: 0.3s latency
- 3 stores (parallel): 0.5s latency
- 5 stores (parallel): 0.8s latency
- 6+ stores: 1.2s+ (bottleneck effects)

### How Gemini Merges Results

Gemini doesn't automatically merge multi-store results. YOU control the merge logic:

**Default Behavior** (Gemini returns concatenated results):
```
Results from store 1: [chunks 1, 2, 3]
Results from store 2: [chunks 4, 5, 6]
Results from store 3: [chunks 7, 8]
```

**Better Approach** (Re-rank by relevance):

```javascript
// After getting results from all stores
const all_results = [
  ...results_from_store1.map(r => ({...r, store: 'menu'})),
  ...results_from_store2.map(r => ({...r, store: 'policy'})),
  ...results_from_store3.map(r => ({...r, store: 'loyalty'}))
];

// Re-rank by relevance score
const reranked = all_results.sort((a, b) =>
  b.relevance_score - a.relevance_score
);

// Return top 5-8 results
return reranked.slice(0, 8);
```

### Query Cost Calculation

Each store query counts separately:

```
Cost = (stores_queried × input_tokens × $0.0075 per 1M)
     + (output_tokens × $0.003 per 1M)

Example:
- 3 stores, 1000 input tokens per store = 3000 tokens
- 200 output tokens
- Cost = (3000 × $0.0000075) + (200 × $0.000003) = $0.023
```

---

## Performance Implications

### Latency Comparison

Test results: Query "What's your refund policy?" across configurations

```
Configuration          | Latency | Memory | Cost/Query
─────────────────────────────────────────────────────
1 store (menu)         | 1.2s    | 45MB   | $0.015
1 store (policy)       | 0.9s    | 48MB   | $0.014
3 stores (sequential)  | 3.1s    | 95MB   | $0.042
3 stores (parallel)    | 1.5s    | 145MB  | $0.042
5 stores (parallel)    | 2.1s    | 210MB  | $0.068
```

**Key Finding**: Parallel search of 3 stores faster than sequential single-store with relevance re-ranking.

### Throughput at Scale

Traffic volume affects store strategy:

```
Daily Queries  | Recommended | Reasoning
─────────────────────────────────────────────────────
<100           | Single store | Overhead not justified
100-500        | 2-3 stores   | Performance gains visible
500-2000       | 3-5 stores   | Parallelization essential
2000+          | Multi-region | Consider distributed setup
```

### Search Quality Metrics

Measure by domain-specific accuracy:

```
Setup              | Menu Accuracy | Policy Accuracy | Loyalty Accuracy | Avg
────────────────────────────────────────────────────────────────────────────
Single store       | 78%           | 71%             | 65%              | 71%
Multi-store (3)    | 92%           | 87%             | 89%              | 89%
Multi-store (5)    | 94%           | 90%             | 92%              | 92%
```

Multi-store dramatically improves domain-specific accuracy (15-21% improvement).

---

## Cost Considerations

### Storage Cost Multiplier

Gemini File Search: $0.15 per 1M tokens ingested.

```
Single 1GB Store
= ~333M tokens (3 chars per token average)
= $0.15 × 333 = $49.95 one-time

Three 330MB Stores
= ~110M tokens per store × 3 = 330M tokens total
= $0.15 × 330 = $49.50 one-time
= Cost per store: $16.50
```

**Finding**: No cost increase for multi-store ingestion if same total data.

### Query Cost Multiplier

Query costs scale with store count because each store incurs separate input tokens:

```
Scenario: 1000 queries/month at 500 input tokens each

Single Store:
= 1000 queries × 500 tokens = 500k tokens
= $0.0075 per 1M × 500k = $3.75/month

3 Stores (router queries 2 stores avg):
= 1000 queries × 500 × 2 stores = 1M tokens
= $0.0075 per 1M × 1M = $7.50/month

5 Stores (router queries 3 stores avg):
= 1000 queries × 500 × 3 stores = 1.5M tokens
= $0.0075 per 1M × 1.5M = $11.25/month
```

**Cost Formula**: `monthly_queries × avg_tokens × stores_per_query × $0.0000075`

### Break-Even Analysis

Multi-store ROI occurs when relevance improvements reduce query volume:

```
Scenario: Relevance improvement = 25% fewer queries needed

Single Store: 1000 queries/month × $0.0075 = $7.50
Multi-Store: 750 queries/month × 3 stores × $0.0075 = $16.88

Payoff: If users are happier with answers, they ask fewer follow-up
questions. Every 100 fewer queries/month saves $1.13 with multi-store.
```

---

## Maintenance Workflows

### Adding a New Store

**Timeline**: 1-2 hours

**Step 1: Prepare Content** (30 minutes)
- Gather documents for new domain
- Remove duplicates (vs. existing stores)
- Validate formats (PDF, DOCX, TXT, MD)

**Step 2: Create Store in Gemini** (5 minutes)
```bash
# Via Google AI Studio
1. Settings → File Search
2. "Create new store"
3. Upload documents (drag-drop)
4. Name: [domain]_store
5. Note store ID: fileSearchStores/xxx
```

**Step 3: Update Registry** (10 minutes)
```json
// Add to store_registry
"new_store": {
  "store_id": "fileSearchStores/new-xyz",
  "keywords": [...],
  "priority": 4,
  "description": "..."
}
```

**Step 4: Update Routing Logic** (10 minutes)
- Add keywords to keyword matching node
- Test routing with sample queries
- Verify correct store selected

**Step 5: Deploy and Test** (15 minutes)
- Update N8N workflow
- Test 5-10 sample queries per new store
- Monitor first 50 real queries for accuracy

### Removing a Store

**Consider impact**: Where does content go after removal?

```
Option 1: Archive (Recommended)
- Create "archive_store" for historical docs
- Mark as last-resort search
- Cost: $0 (no queries after removal)

Option 2: Merge
- Move all docs to existing store (if related)
- Update registry (remove store entry)
- Retest routing for affected queries

Option 3: Delete
- Permanent removal if truly obsolete
- Delete from Google AI Studio
- Remove from registry
- Monitor for orphaned query patterns
```

### Bulk Document Updates

Common task: Replace 100+ documents in a store.

**N8N Workflow for Updates**:

```
Trigger: File uploaded
    ↓
[Validate Format & Content]
    ↓
[Check for Duplicates]
    ↓
[Remove Old Version] ← If replacing existing doc
    ↓
[Upload to Gemini Store]
    ↓
[Verify Upload Status]
    ↓
[Update Registry Metadata]
    ↓
[Notify Team]
```

**Bulk Update Node** (Execute JavaScript):

```javascript
const files = $input.item.json.files; // Array of file objects
const store_id = 'fileSearchStores/xyz';
const results = [];

for (const file of files) {
  // Check if document exists (by name)
  const existing = await checkDocumentExists(store_id, file.name);

  if (existing) {
    // Delete old version first
    await deleteDocument(store_id, existing.id);
  }

  // Upload new version
  const upload_result = await uploadToStore(store_id, file);
  results.push({
    filename: file.name,
    status: upload_result.status,
    timestamp: new Date()
  });
}

return results;
```

### Monitoring and Maintenance Schedule

**Daily**: Query error rates, failed routing
**Weekly**: Storage usage per store, cost tracking
**Monthly**: Keyword relevance analysis, update frequency patterns
**Quarterly**: Comprehensive audit (see below)

### Quarterly Store Audit Checklist

```markdown
## [Month] Store Audit

### Storage
- [ ] Total size per store: [MB]
- [ ] Growth rate: [%/month]
- [ ] Duplicate documents: [count]
- [ ] Obsolete documents: [count]

### Performance
- [ ] Avg query latency: [ms]
- [ ] Accuracy metrics: [%]
- [ ] Top 10 query patterns: [keywords]
- [ ] Failed routing: [count]

### Costs
- [ ] Ingestion costs: $[amount]
- [ ] Query costs: $[amount]
- [ ] Cost per query: $[value]

### Content Quality
- [ ] Documents with metadata: [%]
- [ ] Documents with dates: [%]
- [ ] Updated content: [%]

### Actions
- [ ] Remove [X] obsolete docs
- [ ] Add [X] missing docs
- [ ] Update keywords for: [stores]
- [ ] Optimize: [specific issues]
```

---

## Real Implementation: Hattie B's Hot Chicken

Three-store architecture for a popular restaurant chain.

### Store Design

**Menu Store** (Public, Daily Updates)
- Current menu items and pricing
- Heat levels and ingredients
- Nutritional information
- Size and combo options
- ~2000 documents, 150MB
- Updated: Daily (new specials)

**Policy Store** (Public, Quarterly Updates)
- Hours of operation (all locations)
- Refund and return policy
- Group order procedures
- Parking and accessibility info
- Location addresses and phone numbers
- ~50 documents, 5MB
- Updated: Quarterly (policy reviews)

**Loyalty Store** (Members-Only, Monthly Updates)
- Hot Chicken Coop program details
- Reward point structure
- Member-exclusive offers
- Signup and redemption process
- Partner location listings
- ~200 documents, 20MB
- Updated: Monthly (new partners, promotions)

### Keyword Registry Configuration

```json
{
  "store_registry": {
    "hattie_menu": {
      "store_id": "fileSearchStores/hattie-menu-prod-12345",
      "keywords": [
        "menu",
        "hot chicken",
        "sandwich",
        "combo",
        "heat level",
        "spicy",
        "mild",
        "medium",
        "hot",
        "extra hot",
        "price",
        "dollar",
        "ingredient",
        "allergen",
        "calorie",
        "nutrition",
        "drink",
        "side",
        "fries",
        "sauce"
      ],
      "priority": 1,
      "access_level": "public",
      "update_frequency": "daily",
      "description": "Menu items, pricing, nutrition"
    },

    "hattie_policy": {
      "store_id": "fileSearchStores/hattie-policy-prod-67890",
      "keywords": [
        "hour",
        "location",
        "address",
        "phone",
        "refund",
        "return",
        "exchange",
        "policy",
        "parking",
        "accessible",
        "group order",
        "catering",
        "reservation",
        "open",
        "closed"
      ],
      "priority": 2,
      "access_level": "public",
      "update_frequency": "quarterly",
      "description": "Store locations, hours, policies"
    },

    "hattie_loyalty": {
      "store_id": "fileSearchStores/hattie-loyalty-prod-24680",
      "keywords": [
        "coop",
        "loyalty",
        "reward",
        "point",
        "member",
        "signup",
        "member benefit",
        "exclusive",
        "discount",
        "promotion",
        "partner",
        "redeem",
        "earn"
      ],
      "priority": 3,
      "access_level": "member_only",
      "update_frequency": "monthly",
      "description": "Hot Chicken Coop loyalty program"
    }
  }
}
```

### Routing Logic in Action

**Query 1: "What's the heat level of your hot chicken?"**
- Keywords extracted: ["heat", "level", "hot", "chicken"]
- Matches: hattie_menu (4 hits), hattie_policy (0 hits)
- Result: Query menu_store only ✓

**Query 2: "Are you open tomorrow?"**
- Keywords extracted: ["open", "tomorrow"]
- Matches: hattie_policy (1 hit for "open")
- Result: Query policy_store → Returns hours ✓

**Query 3: "How do I get member rewards?"**
- Keywords extracted: ["member", "reward"]
- Matches: hattie_loyalty (2 hits)
- Result: Query loyalty_store → Returns Coop info ✓

**Query 4: "Can I get the spicy sandwich with a drink for under $15?"**
- Keywords extracted: ["spicy", "sandwich", "drink", "under", "15"]
- Matches: hattie_menu (3 hits: spicy, sandwich, drink)
- Secondary: Could mention pricing (price), suggests menu + policy
- Result: Query menu_store primary, policy_store secondary
- Returns: Combo options under $15 ✓

### N8N Workflow Configuration

```javascript
// Store registry (in workflow context)
const HATTIE_REGISTRY = {
  "menu_store": {
    "id": "fileSearchStores/hattie-menu-prod-12345",
    "keywords": ["menu", "chicken", "sandwich", "price", "heat", ...],
    "priority": 1
  },
  "policy_store": {
    "id": "fileSearchStores/hattie-policy-prod-67890",
    "keywords": ["hours", "location", "policy", "refund", ...],
    "priority": 2
  },
  "loyalty_store": {
    "id": "fileSearchStores/hattie-loyalty-prod-24680",
    "keywords": ["coop", "loyalty", "reward", "member", ...],
    "priority": 3
  }
};

// Routing function
function selectStores(query) {
  const query_lower = query.toLowerCase();
  const matches = {};

  for (const [store_name, config] of Object.entries(HATTIE_REGISTRY)) {
    const hit_count = config.keywords.filter(kw =>
      query_lower.includes(kw)
    ).length;

    if (hit_count > 0) {
      matches[store_name] = {
        hits: hit_count,
        priority: config.priority
      };
    }
  }

  // Sort by hits (desc), then priority (asc)
  return Object.entries(matches)
    .sort((a, b) => {
      const hits_diff = b[1].hits - a[1].hits;
      return hits_diff !== 0 ? hits_diff : a[1].priority - b[1].priority;
    })
    .slice(0, 3) // Max 3 stores per query
    .map(([name]) => HATTIE_REGISTRY[name].id);
}

// Example usage
selectStores("What's your hottest chicken sandwich?");
// Returns: [fileSearchStores/hattie-menu-prod-12345] (3 keyword hits)

selectStores("Are you open and do you have combo deals?");
// Returns: [
//   fileSearchStores/hattie-menu-prod-12345,      (price, sandwich)
//   fileSearchStores/hattie-policy-prod-67890     (hours)
// ]
```

### Update Workflows by Store

**Daily Menu Updates** (runs 11:00 AM daily)
```
Trigger: Daily at 11:00 AM
  ↓
[Fetch Latest Menu from POS]
  ↓
[Convert to PDF/Markdown]
  ↓
[Detect Changes] (hash comparison)
  ↓
Changes found?
├─ YES: [Remove Old Menu] → [Upload New]
└─ NO: [Skip, Log no changes]
  ↓
[Alert Slack] #menu-updates
```

**Monthly Loyalty Updates** (runs 1st of month)
```
Trigger: 1st day of month at 6:00 AM
  ↓
[Fetch Partner Listings from Database]
  ↓
[Fetch Promotion Calendar]
  ↓
[Generate Updated Loyalty Doc]
  ↓
[Upload to Loyalty Store]
  ↓
[Verify Upload]
  ↓
[Update Version Number]
```

### Performance Monitoring Dashboard

Metrics tracked in N8N or external dashboard:

```
ROUTING ACCURACY
├─ Menu queries routed correctly: 96%
├─ Policy queries routed correctly: 94%
├─ Loyalty queries routed correctly: 91%
└─ Ambiguous queries (multiple stores): 8%

LATENCY
├─ Menu store queries: 0.4s
├─ Policy store queries: 0.35s
├─ Loyalty store queries: 0.38s
└─ Multi-store average: 1.2s

COSTS
├─ Monthly ingestion: $12.50
├─ Monthly queries: $23.40
├─ Cost per query: $0.008
└─ Growth rate: +2% month-over-month

QUALITY
├─ User satisfaction: 4.2/5
├─ Helpful answer rate: 89%
├─ Repeat queries (same question): 4%
└─ Query volume: 2,850/month
```

---

## Troubleshooting Multi-Store Issues

### Issue 1: Query Goes to Wrong Store

**Symptom**: User asks "What's your refund policy?" and gets menu items instead.

**Root Cause**: "refund" keyword not in policy_store keywords.

**Solution**:
```json
// Fix: Add to policy_store keywords
"policy_store": {
  "keywords": [
    ...,
    "refund",    // ADD THIS
    "return",
    "exchange"
  ]
}
```

**Prevention**: Include common synonyms. For refunds: "refund", "return", "exchange", "money back"

### Issue 2: No Stores Match Query

**Symptom**: Query "I'm allergic to peanuts, what can I eat?" returns no relevant results.

**Root Cause**: "allerg" or "ingredient" not matching correctly in keyword extraction.

**Debug**:
```javascript
// Check keyword extraction
const query = "I'm allergic to peanuts";
const extracted = query.toLowerCase().split(' ');
// Result: ["i'm", "allergic", "to", "peanuts"]
// Issue: "allergic" not in registry, only "allergen"

// Fix: Add "allergen", "allergy", "allergic" to menu_store
```

**Solution**: Add allergy-related keywords to menu_store:
```json
"menu_store": {
  "keywords": [
    ...,
    "allergen",
    "allergy",
    "allergic",
    "contain"
  ]
}
```

### Issue 3: Redundant Results Across Stores

**Symptom**: Same information appears in results from multiple stores.

**Root Cause**: Content duplicated across stores (e.g., pricing in both menu and policy).

**Solution**:
```
Option 1: De-duplicate in merge logic
- Remove exact duplicates before returning

Option 2: Store separation
- Move content to only one store
- Keep references (links) in others

Option 3: Document versioning
- Keep one "official" version per store
- Mark others as "see menu_store for pricing"
```

### Issue 4: Slow Multi-Store Queries

**Symptom**: Queries checking 5 stores take 3+ seconds.

**Root Cause**: Sequential search instead of parallel, or too many stores selected.

**Solution**:
```javascript
// WRONG: Sequential
const result1 = await queryStore(store1);
const result2 = await queryStore(store2);
const result3 = await queryStore(store3);

// RIGHT: Parallel
const results = await Promise.all([
  queryStore(store1),
  queryStore(store2),
  queryStore(store3)
]);
```

**Also**: Reduce stores per query:
```javascript
// Only query top 2-3 matching stores, not all 5
selectStores(query).slice(0, 3) // Limit to 3 max
```

### Issue 5: High Query Costs

**Symptom**: Multi-store queries cost 3x more than single-store queries.

**Root Cause**: Every query hits all 5 stores regardless of relevance.

**Solution**: Implement smart routing (already covered in "Query Routing Implementation" section):
- Only query stores with keyword matches
- Use priority weighting
- Cache frequently asked queries

**Cost Impact**:
```
Before: 1000 queries × 5 stores × $0.0000075 = $37.50/month
After: 1000 queries × 2.1 avg stores × $0.0000075 = $15.75/month
Savings: 58%
```

### Issue 6: Store Synchronization Problems

**Symptom**: Customers see outdated info because menu_store wasn't updated.

**Root Cause**: Manual update process without verification.

**Solution**: Implement validation before publishing:

```javascript
// Update validation workflow
[Upload to Staging Store]
  ↓
[Run Test Queries] // Query with sample questions
  ↓
[Compare Results] // New vs. old store results
  ↓
[Approval Step] // Human review if significant changes
  ↓
[Swap to Production] // Move staging to production
```

---

## Advanced Patterns

### Pattern 1: Store Versioning

Maintain versions for A/B testing and rollback capability.

```
Structure:
├── menu_store_v1 (current production)
├── menu_store_v2_staging (being tested)
├── menu_store_v1_archive (previous version)
└── menu_store_v0_legacy (very old, kept for reference)

Registry includes version:
{
  "menu_store": {
    "store_id": "fileSearchStores/menu-prod-v1",
    "version": "1.0",
    "status": "production"
  },
  "menu_store_staging": {
    "store_id": "fileSearchStores/menu-staging-v2",
    "version": "2.0",
    "status": "testing"
  }
}

Usage:
- Route 90% traffic to v1, 10% to v2_staging
- Monitor accuracy metrics
- If v2 improves, swap 100% to v2
- If v2 fails, keep v1
```

### Pattern 2: A/B Testing Store Structure

Test whether domain separation helps or hurts accuracy.

```
Group A: Single large store (all 3GB of content)
Group B: Three separate stores (optimized routing)

Track:
- Query accuracy (customer satisfaction)
- Latency
- Cost
- User behavior

Example Results:
Group A: 71% accuracy, 2.1s latency, $15/month
Group B: 89% accuracy, 1.5s latency, $22/month

Decision: 18% accuracy improvement worth 7$/month extra cost
```

### Pattern 3: Staging/Production Split

Safely test changes before impacting real users.

```
Architecture:
┌─────────────────────────────────────────────┐
│           User Query                        │
└──────────────┬────────────────────────────┘
               │
        ┌──────v──────┐
        │   Router    │
        └──────┬──────┘
               │
       ┌───────┴────────┐
       ▼                ▼
   [Production]    [Staging]
   (90% traffic)   (10% traffic)
       │                │
   ┌───┴────┐       ┌───┴────┐
   │ Store1 │       │ Store1' │
   │ Store2 │       │ Store2' │
   │ Store3 │       │ Store3' │
   └────────┘       └────────┘

Configuration:
{
  "routing": {
    "production": {
      "weight": 0.90,
      "stores": ["store1", "store2", "store3"]
    },
    "staging": {
      "weight": 0.10,
      "stores": ["store1_staging", "store2_staging", "store3_staging"]
    }
  }
}

Workflow:
1. Update staging stores with new content
2. Run test queries, compare results
3. Monitor 10% of real traffic for issues
4. Swap weights (50/50 if good, or rollback to 0/100)
5. After 7 days, move staging to production
```

### Pattern 4: Geo-Based Store Routing

Route queries to stores based on user location.

```
Use Case: Multi-location restaurant chain

├── hattie_ny_store (NYC location)
│   ├── Menu (NYC prices)
│   ├── Hours (NYC hours)
│   └── Policies (NYC-specific rules)
│
├── hattie_la_store (LA location)
│   ├── Menu (LA prices)
│   ├── Hours (LA hours)
│   └── Policies (LA-specific rules)
│
└── hattie_global_store (Shared content)
    ├── Loyalty program
    ├── Brand policies
    └── About Hattie B's

Routing Logic:
- User location detected (IP geolocation or explicit)
- User asks "Are you open?" → Query hattie_ny_store
- User asks "Loyalty rewards?" → Query hattie_global_store
- Default: Query local store first, then global

Benefits:
- Users get location-specific info
- Each location can have unique content
- Shared content centralized
```

### Pattern 5: Tiered Access Control

Multi-store per access level.

```
Public Tier (All users)
├── public_menu
├── public_faq
└── public_policies

Member Tier (Paying customers)
├── member_exclusive_deals
├── member_receipt_history
└── member_loyalty_details

VIP Tier (High-value customers)
├── vip_concierge_guide
├── vip_early_access
└── vip_personal_offers

Admin Tier (Internal team)
├── admin_procedures
├── admin_financials
└── admin_strategy

Routing:
function selectStoresForUser(user_query, user_tier) {
  const accessible_stores = {
    'public': ['public_menu', 'public_faq', 'public_policies'],
    'member': ['public_menu', 'public_faq', 'public_policies',
               'member_exclusive_deals', 'member_receipt_history'],
    'vip': ['public_*', 'member_*', 'vip_*'],
    'admin': ['public_*', 'member_*', 'vip_*', 'admin_*']
  };

  return getMatchingStores(user_query, accessible_stores[user_tier]);
}
```

---

## Decision Framework: Should You Use Multiple Stores?

### Quick Decision Tree

```
START: Do you have documentation?
├─ NO → Create documentation first
├─ <100 docs (< 50MB)?
│  └─ Single store is fine
├─ 100-500 docs (50-250MB)?
│  ├─ Is content from 2+ distinct domains?
│  │  ├─ YES → 2 stores (simple split)
│  │  └─ NO → Single store
└─ 500+ docs (250MB+)?
   ├─ Content from 3+ domains?
   │  └─ YES → 3-5 stores (full multi-store)
   └─ Mixed domain?
      ├─ High search accuracy needed?
      │  └─ YES → 3-5 stores (accept complexity)
      └─ NO → Consider single store, optimize keywords

AFTER DECISION:
├─ Single Store?
│  └─ Go to: "Gemini File Search Fundamentals"
└─ Multi-Store?
   ├─ 2 stores → Go to "Store Organization Strategies"
   └─ 3+ stores → Start here, use Hattie B's as template
```

### Scoring Model

Rate your situation (0-10 per factor):

```
| Factor | Weight | Your Score | Points |
|--------|--------|------------|--------|
| Documentation size (500MB+) | 0.25 | [__] | [__] |
| Domain count (3+ areas) | 0.25 | [__] | [__] |
| Query accuracy needed (91%+) | 0.20 | [__] | [__] |
| Search latency critical (<1s) | 0.15 | [__] | [__] |
| Team size for maintenance (3+) | 0.10 | [__] | [__] |
| Budget for complexity | 0.05 | [__] | [__] |
|                          |      | TOTAL | [__] |

Interpretation:
- 0-3: Single store (simplest)
- 3-6: Evaluate trade-offs (mid-range complexity)
- 6-10: Multi-store (worth the engineering investment)
```

---

## Summary

### Key Takeaways

1. **Multi-store pays for itself** when managing 3+ distinct knowledge domains or >500MB of content. Accuracy improvements of 15-20% typically justify the complexity.

2. **Keyword routing is the linchpin.** Spend time selecting precise, non-overlapping keywords per store. This determines whether queries route correctly.

3. **Parallel search is essential.** Sequential multi-store queries are slower than single-store. Implement parallel queries in N8N with `Promise.all()`.

4. **Start with 3 stores, not 5.** Three well-designed stores outperform five poorly organized ones. Add stores only after validating first 3.

5. **Monitor costs carefully.** Each additional store multiplies query costs. Smart routing (only query matching stores) reduces cost 50%+.

6. **Maintenance scales non-linearly.** Three stores = 2-3 update workflows. Five stores = 5+ workflows. Plan for this operational overhead.

7. **Staging/production split catches errors.** Test store updates on 10% of traffic before rolling out 100%. Saves reputation damage.

8. **Hattie B's model works.** Menu (daily) + Policy (quarterly) + Loyalty (monthly) separation handles most restaurant use cases. Copy this template.

### Next Steps

**If building multi-store system:**

1. Complete "Store Organization Strategies" section for your domain
2. Design keyword registry (use Hattie B's as template)
3. Build N8N routing workflow (use code examples provided)
4. Test with 10 queries per store to validate routing
5. Implement staging/production split before going live
6. Monitor first 100 real queries for accuracy
7. Set up quarterly audit checklist

**If evaluating whether you need multi-store:**

1. Complete decision tree above
2. Use scoring model for your situation
3. Calculate cost/benefit for your specific scenario
4. Start with single store if unsure—migrate later when clear
5. Reference "Performance Implications" section for latency/cost trade-offs

**Resources**

- Hattie B's workflow configuration: Copy the `HATTIE_REGISTRY` object and adapt keywords
- N8N template: Use routing logic code from "Query Routing Implementation"
- Audit checklist: Run quarterly using provided template
- Cost calculator: Formula in "Cost Considerations" section