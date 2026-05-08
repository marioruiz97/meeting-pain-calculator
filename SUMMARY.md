## 📊 **MEETING PAIN CALCULATOR — Project Overview**

### **🎯 For Non-Technical Partners & Business Stakeholders**

**The Problem:**
Most organizations waste significant money on unnecessary or poorly-planned meetings. A single 1-hour meeting with 10 people earning $50/hour costs $500 in lost productivity. But companies have no tool to quickly assess whether a meeting is worth its cost before it happens.

**The Solution:**
Meeting Pain Calculator is a **real-time cost awareness tool** that helps teams:
1. **See the financial impact** — Watch in real-time how much money a meeting costs per minute (e.g., "$5/second")
2. **Get AI feedback on agendas** — Paste your meeting agenda and get an honest assessment: Is this meeting necessary? Which topics could be handled via email instead?
3. **Make smarter decisions** — Before scheduling a 1-hour meeting with 15 people, know if it's truly worth $750+

**Business Value:**
- Reduces unnecessary meetings and wasted time
- Encourages async communication (email, Slack, docs) for items that don't need real-time discussion
- Helps teams be more intentional about when they gather
- Provides instant ROI visualization

---

### **👨‍💻 For Developers**

#### **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│           FRONTEND (Next.js 14 App Router)              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Dashboard (main component)                             │
│  ├─ MeetingConfigPanel (set attendees, rate, duration) │
│  ├─ CostBurnCounter (real-time ticker)                 │
│  ├─ AgendaAnalyzer (textarea + submit button)          │
│  └─ AnalysisResults (charts, recommendations)          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│            BACKEND API (Route Handler)                  │
├─────────────────────────────────────────────────────────┤
│  POST /api/analyze                                      │
│  ├─ Validates input (agenda, attendees, rate, duration)│
│  ├─ Calls OpenAI GPT-4o-mini with structured prompt   │
│  ├─ Returns structured analysis (Zod validated)        │
│  └─ Data: pain score, efficiency, recommendations      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│              EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────┤
│  OpenAI GPT-4o-mini (for agenda analysis)              │
│  Vercel AI SDK (abstraction + streaming support)       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### **Data Flow**

1. **User Input Phase:**
   - User enters meeting details (attendee count, hourly rate, duration, agenda)
   - Cost counter updates in real-time as the timer runs

2. **Analysis Phase:**
   - User clicks "Analyze Agenda"
   - Frontend sends `POST /api/analyze` with agenda + meeting details
   - Backend constructs prompt + sends to OpenAI
   - Returns structured JSON with:
     - **Pain Score** (0-10): how wasteful the meeting is
     - **Efficiency Score** (0-100): overall meeting quality
     - **Agenda Items**: breakdown with priorities & async candidates
     - **Recommendations**: top 3-5 actionable improvements
     - **Async Candidates**: topics that should be emails/docs

3. **Results Display:**
   - Charts visualize necessary vs. wasted time
   - Recommendations are actionable and specific

#### **Key Components**

| Component | Role | Key Logic |
|-----------|------|-----------|
| **CostBurnCounter** | Real-time cost ticker | Timer runs via `setInterval`, calculates: `attendees × hourly_rate × elapsed_hours`, updates every 1 second |
| **MeetingConfigPanel** | Input form | Lets users set attendee count, avg hourly rate, duration minutes |
| **AgendaAnalyzer** | Textarea + AI trigger | Collects agenda text, calls `/api/analyze` endpoint |
| **AnalysisResults** | Results display | Shows pain score, pie chart (necessary vs wasted), item breakdown, recommendations |
| **Dashboard** | Container | Manages state, coordinates child components, layout |

#### **Type System** (types.ts)

```typescript
MeetingConfig          // User inputs: attendees, rate, duration, agenda
MeetingAnalysis        // AI output: pain score, recommendations, items
AgendaItem             // Individual topic with priority & async flag
AnalysisState          // "idle" | "loading" | "success" | "error"
```

#### **Utilities** (utils.ts)

- `calculateMeetingCost()` — Converts seconds + hourly rates to total cost
- `formatCurrency()` — Formats numbers as USD
- `formatDuration()` — Converts seconds to "1h 23m 45s"
- `getPainColor()` — Color code for pain scores (green=low, red=high)
- `getPainLabel()` — Human text ("Essential", "Wasteful", etc.)
- `cn()` — Tailwind class merging utility

#### **API Endpoint** (route.ts)

**Input Validation:**
- Agenda must be ≥10 characters
- Attendee count, hourly rate, duration are optional context

**Prompt Strategy:**
- Sends structured prompt to GPT-4o-mini asking for:
  - Meeting type classification
  - Agenda item breakdown with necessity assessment
  - Items that could be async (email/Slack/doc)
  - Overall pain score (0=essential, 10=pure waste)

**Output Validation:**
- Zod schema enforces response structure
- Ensures pain score is 0-10, efficiency is 0-100
- Validates all required fields before returning

#### **Tech Stack & Why**

| Tech | Purpose |
|------|---------|
| **Next.js 14** | React framework with built-in API routes, Server Components |
| **TypeScript** | Type safety across frontend + backend |
| **Tailwind CSS** | Utility-first styling, fire theme (oranges/reds) |
| **Radix UI** | Accessible component primitives (dialogs, labels, progress) |
| **Vercel AI SDK** | Abstracts OpenAI API, provides `generateObject()` for structured outputs |
| **OpenAI GPT-4o-mini** | Fast, cost-effective LLM for analysis |
| **Zod** | Runtime validation of API responses |
| **Recharts** | Charts for visualizing necessary vs. wasted time |
| **Lucide Icons** | Icon library (Flame, Play, Pause icons) |

---

### **📁 Folder Structure Explained**

```
app/
├── api/analyze/route.ts      → Backend: AI analysis endpoint
├── page.tsx                   → Frontend: Home page, renders Dashboard
├── layout.tsx                 → Root HTML wrapper
└── globals.css                → Global styles + fire theme (dark mode by default)

components/
├── dashboard/                 → Main UI components
│   ├── Dashboard.tsx          → Main container, state management
│   ├── MeetingConfigPanel.tsx → Input fields (attendees, rate)
│   ├── CostBurnCounter.tsx    → Real-time cost ticker
│   ├── AgendaAnalyzer.tsx     → Textarea + analyze button
│   └── AnalysisResults.tsx    → Results display + charts
└── ui/                        → Shadcn-style base components (button, card, input, etc.)

lib/
├── types.ts                   → TypeScript interfaces (MeetingConfig, MeetingAnalysis)
└── utils.ts                   → Helper functions (cost calculations, formatting)

public/
└── [screenshots/icons]

Configuration Files:
├── next.config.mjs            → Next.js settings
├── tailwind.config.ts         → Tailwind customization (fire theme)
├── tsconfig.json              → TypeScript config
├── postcss.config.mjs         → CSS processing
└── package.json               → Dependencies + scripts
```

---

### **🚀 Development Workflow**

**Local Development:**
```bash
npm install              # Install dependencies
npm run dev              # Start dev server at http://localhost:3000
npm run type-check       # Verify TypeScript
npm run lint             # Check code quality
```

**Environment Setup:**
- Create .env.local with `OPENAI_API_KEY=sk-...`
- Without this key, the analysis endpoint returns an error

**Production:**
```bash
npm run build            # Compile Next.js app
npm start                # Run production server
```

---

### **💡 Key Features Explained**

| Feature | How It Works | Why It Matters |
|---------|-------------|---|
| **Real-time Cost Ticker** | Timer runs while meeting proceeds, shows total $ burned per attendee | Makes cost visible & immediate |
| **AI Agenda Analysis** | GPT-4o-mini evaluates each agenda item for necessity & async potential | Helps teams make smarter decisions pre-meeting |
| **Pain Score (0-10)** | ML-based scoring where 10 = "this should be an email" | Simple, memorable metric for meeting quality |
| **Async Candidate Detection** | AI identifies topics for email/doc/Slack instead of sync meeting | Reduces unnecessary meeting time |
| **Efficiency Score (0-100)** | Overall assessment of meeting structure & necessity | Quantifies meeting quality |
| **Dark Mode + Fire Theme** | Orange/red gradient, animated flame icon | Emphasizes the "money burning" metaphor visually |

---

### **🔧 Future Enhancement Ideas**

- Export analysis reports (PDF/CSV)
- Calendar integration (auto-pull attendee data)
- Recurring meeting tracking (trend analysis)
- Slack/Teams bot integration
- Meeting transcription + retrospective analysis
- Benchmark against industry standards

---

**Bottom Line:** This tool is a **meeting health checker** that combines real-time financial visibility with AI-powered recommendations to help teams eliminate waste and be more intentional about their time.