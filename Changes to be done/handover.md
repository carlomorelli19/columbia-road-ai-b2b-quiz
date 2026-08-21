# Handover — AI Maturity quiz, scoring rework

Everything below is in addition to `scoring-v2.js`, which contains the five code edits.

---

## 1. Google Sheet columns change (do this first)

The payload keys changed. If `doPost` writes by fixed column order, or the sheet header row is hardcoded, this breaks silently — rows will land in the wrong columns and nobody will notice until after the event.

**Removed:** `score`, `score_max`, `score_pct`, `adoption_score`, `data_score`, `governance_score`, `team_readiness_score`

**Added:** `stage_index`, `readiness_score`, `readiness_band`, `fit`, `connected_tools_pct`, `data_pct`, `ownership_pct`, `team_pct`, `weakest_area`, `strongest_area`, `points_to_next_band`, `next_moves`

**Unchanged but now carries different strings:** `stage` (was "Stage 1: Pilots & POCs" etc, now "Stage 0: Nothing running yet" / "Stage 1: Testing and pilots" / "Stage 2: First agents live" / "Stage 3: Several agents live")

Full header row, in payload order:

```
submitted_at, name, email, stage, stage_index, readiness_score, readiness_band, fit,
connected_tools_pct, data_pct, ownership_pct, team_pct, weakest_area, strongest_area,
points_to_next_band, next_moves, roi_estimate_eur, role, team_size, deal_size,
close_rate, admin_time, monthly_leads, lead_to_conv, sales_process_docs, ai_tools,
ai_agents, ai_integration, ai_scalability, data_quality, knowledge_source,
governance_owner, sales_ai_contribution, team_attitude, top_opportunities,
top_blockers, biggest_time_waste, roadmap_headline
```

Suggestion: write to a **new tab** rather than changing the existing one. Old responses stay readable and you keep a rollback if something goes wrong on the day.

If `doPost` maps by key name rather than position, it should survive the change on its own, but the new columns still need adding to the header row or they get dropped.

---

## 2. Rename the webhook variable

`N8N_WEBHOOK_URL` → `APPS_SCRIPT_URL`, three places (lines 880, 1046, 1076). It is an Apps Script endpoint, not an n8n one.

```bash
sed -i 's/N8N_WEBHOOK_URL/APPS_SCRIPT_URL/g; s|Capture result snapshot for n8n webhook|Capture result snapshot for the Apps Script endpoint|' index.html
```

Leave the comment on line 1048 (`// required for Google Apps Script`) — already correct.

---

## 3. Dead code to remove

- **Lines 711–718** — `blockerHtml` is built and never used. The blockers panel renders from `blkInner` further down. Already dead before this change; safe to delete now.
- **Line 721** — `const scorePct = mx>0 ? tot/mx : 0;` — its only consumer was the `stageKey` line at 877, which EDIT 3 removes. `scorePct` is redefined in EDIT 3 and also goes unused, so it can go entirely.
- **Lines 660 + 669** — `const ms = S.find(...)` and the `ms.qs.forEach` loop are both inside the block EDIT 2 replaces. No separate action needed, just don't leave a stray `ms` behind.

---

## 4. Small copy fixes outside the scoring block

- **Line 962** — the button reads "See score details". The number is now readiness, so "See the detail" or "See your four areas" reads better.
- **Line 155** — `.ring-max` is coloured `--light-blue`, which was fine against the navy hero. The label text changes from "out of 100" to "readiness"; check it still sits well at 12px.
- **Line 301** — section intro says "This section is scored." Still true, all nine questions feed the result, no change needed.

---

## 5. Things to check on device

- **Stage 0 badge uses `--warm` (#E5E1DC) with `--black` text.** This is the only band colour not already in use on the results screen. Check contrast on a real phone in daylight.
- **Two new panels default to open** (`fit` and `gap`). The results screen gets longer. Check where the "Book a meeting" button ends up on a small screen — it should still be reachable without a long scroll, since that is the conversion.
- **Print styles (line 215)** hide nav, progress and the meeting button. Collapsed panels stay collapsed when printing, so `breakdown`, `roi` and `blockers` will not appear in a printed or saved page. Fine if nobody prints, worth knowing if anyone does.
- **`togglePanel` needs no change** — it resolves `#pw-{id}` generically, and the `detailsBtn` label logic is scoped to `id === 'breakdown'`.

---

## 6. QA cases

Force answers in the console (`A.A1 = 1` etc, then call `results()`) and check against these:

| Input | Expected |
|---|---|
| Everything lowest | readiness 0, Stage 0, band "Not there yet", fit `matched` |
| Everything highest | readiness 100, Stage 3, band "Solid ground", fit `matched` |
| A1=1 A2=2, everything else 1 | readiness 32, Stage 1, band "Early days", fit `matched`, 1 point to next band |
| A1=3 A2=4, data and ownership at 0–1 | Stage 3, band "Early days", fit `stretched`, weakest "Your data" |
| A1=1 A2=0, everything else highest | readiness 100, Stage 0, band "Solid ground", fit `ahead` |
| Every "not sure" option selected | readiness ~21, no crash, moves list shows "Nobody is sure about…" entries in taupe |

Also worth a pass: answer only Part 1 and Part 3 and skip Part 2 entirely. The ROI panel should not render, and the result should still produce a stage, a band and a gap list.

---

## 7. Security note, not blocking

`APPS_SCRIPT_URL` sits in client-side JS, so anyone viewing source can POST arbitrary rows into the sheet. That is inherent to calling Apps Script from the browser. If it matters for this event, add a shared secret to the payload and have `doPost` reject anything without it. Stops casual junk, no backend needed.

## 8. Questions updates

A4 Scalability is not super clear, draft example below

How mature is your AI setup?
- No AI tools used regularly enough or no alignment across the org, everyone uses their own tools?
- We use AI features inside each tool and are not connected
- Shared data fouhdation for most AI uses
- Shared data, AI specific context context layer with shared skills

C1 maybe make the distimctiom more clear between centralised and federated in the naming of those 2 options, people might not click the expand info button