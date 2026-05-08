# 🔥 Meeting Pain Calculator

> **Stop burning money on unproductive meetings.**

A real-time meeting cost tracker with AI-powered agenda analysis. Built with Next.js 14, Vercel AI SDK, and OpenAI GPT-4o-mini.

![Dark theme dashboard with real-time cost counter and AI agenda analysis](./public/screenshot-placeholder.png)

---

## Features

- **Real-time cost counter** — Watch money burn as your meeting progresses, with per-minute and per-hour breakdowns.
- **AI agenda analysis** — Paste your agenda and get a pain score (0–10), efficiency rating, and actionable recommendations.
- **Async candidate detection** — Identify agenda items that could be handled via email or Slack.
- **Time waste visualization** — Pie chart showing necessary vs. wasted time.
- **Dark mode by default** — Fire-themed UI with orange/red accents.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| AI | Vercel AI SDK + OpenAI GPT-4o-mini |
| Validation | Zod |
| Charts | Recharts |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18.17+
- An OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/meeting-pain-calculator.git
cd meeting-pain-calculator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

## Configuration

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for meeting analysis |

## Project Structure

```
meeting-pain-calculator/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # AI analysis endpoint
│   ├── globals.css             # Global styles + fire theme
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── dashboard/
│   │   ├── AgendaAnalyzer.tsx  # Agenda input + AI trigger
│   │   ├── AnalysisResults.tsx # Results display + charts
│   │   ├── CostBurnCounter.tsx # Real-time cost counter
│   │   ├── Dashboard.tsx       # Main dashboard layout
│   │   └── MeetingConfigPanel.tsx # Attendees/rate/duration inputs
│   └── ui/                     # Shadcn-style base components
├── lib/
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Helpers (formatting, calculations)
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## API Reference

### `POST /api/analyze`

Analyzes a meeting agenda using GPT-4o-mini.

**Request Body:**
```json
{
  "agenda": "string (min 10 chars)",
  "attendeeCount": "number",
  "hourlyRate": "number",
  "durationMinutes": "number"
}
```

**Response:**
```json
{
  "analysis": {
    "meetingTitle": "string",
    "painScore": "0-10",
    "overallEfficiencyScore": "0-100",
    "estimatedNecessaryMinutes": "number",
    "estimatedWastedMinutes": "number",
    "agendaItems": [...],
    "topRecommendations": [...],
    "asyncCandidates": [...],
    "meetingType": "status-update | decision-making | ...",
    "verdict": "string"
  }
}
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
