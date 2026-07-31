# humanise-copy

Review the quiz copy in `ai-maturity-quiz.html` for AI-generated-sounding language and rewrite it to sound human. Apply all changes directly to the file.

## How to run

1. Read `ai-maturity-quiz.html` in full.
2. Work through every anti-pattern section below. Flag any matching phrase and rewrite it in place.
3. Apply every change using the Edit tool — do not just report what you'd change.
4. After applying, list what changed, grouped by location. One line per change.

## Tone target

A sharp Columbia Road consultant speaking at a breakfast event — direct, specific, no filler. The audience knows AI: skip hype, skip definitions, don't over-explain. Say what to do, not what "the priority" is.

---

## A. Rhythm and sentence structure

### A1. Uniform sentence length — the single biggest AI tell

AI produces sentences of similar length in every paragraph. Human writing varies dramatically: short sentences land a point, long ones build context. "Burstiness" — the statistical variation in sentence length — is low in AI text and high in human text.

**What to look for:** Three or more consecutive sentences of similar length (roughly same word count) in the same paragraph.

**Fix:** Break the rhythm. Follow a long sentence with a short one. Or start with a fragment.

Bad:
```
You've got tools in place and you're starting to see results. The challenge now is moving from individual tools to connected workflows. The teams that do this well tend to see compounding gains across the funnel.
```
Better:
```
You've got tools and early results. Now the question is whether they talk to each other. Most don't — yet.
```

---

### A2. The triplet addiction

AI defaults to three-part constructions: "X, Y, and Z". In prose, three items in a row feels manufactured. Humans use two, or four, or just one thing stated well.

Bad: `"It covers adoption, data readiness, and governance."`
Better: `"It covers adoption and what's blocking it."`

Bad: `"You need the right tools, the right data, and the right team."`
Better: `"You need data your agents can actually use."`

---

### A3. Parallel structure overdose

AI loves matching verb forms across bullet lists and sentences: "Identifying gaps, Building workflows, Measuring impact." One parallel construction is fine; three in a row reads as generated.

**Fix:** Vary the syntax. Use a noun phrase, then a clause, then a directive.

---

### A4. Uniform paragraph length

AI produces paragraphs of near-identical length. Human writing has one-sentence paragraphs next to seven-sentence ones.

**Fix:** If every paragraph in a section is 2-4 sentences, add a one-sentence paragraph or expand one significantly.

---

## B. Punctuation

### B1. Em-dash overuse

Em-dashes are the most statistically reliable AI tell in 2024–2025 research. AI uses them to bolt a clever payoff onto a statement — like this — rather than letting the sentence end. One em-dash per paragraph is fine. Two or more in close proximity is a flag.

**Also flag:** sentences that use an em-dash where a full stop would be cleaner.

Bad: `"Real traction, but still project-based — that's what separates the experimenters from the operators."`
Better: `"You've got real traction. Now ship one thing properly."`

---

### B2. Semicolon chains

AI overuses semicolons to join independent clauses that should be separate sentences. Semicolons are rare in natural speech-register writing; two in one paragraph is almost always a flag.

Bad: `"The tools are in place; the data isn't ready; the team hasn't been trained."`
Better: `"The tools are in place. The data isn't ready, and neither is the team."`

**Rule:** If you find a semicolon, ask whether it should be a full stop instead. Most of the time: yes.

---

### B3. Announcement colons

AI uses colons to announce what it's about to say, restating the sentence that just asked the question.

Bad: `"There are three things you need to do: first, audit your data. Second, pick a use case. Third, assign an owner."`
Better: `"Audit your data. Pick one use case. Assign an owner."`

---

### B4. Over-parenthesised relative clauses

AI inserts parenthetical asides (like this one) where a simpler construction would read more naturally.

**Fix:** Either cut the aside entirely or rewrite it as a separate sentence.

---

## C. Transitions and discourse flow

### C1. Adverb openers

AI opens paragraphs and sentences with transition adverbs. These are among the most statistically reliable AI tells.

**Banned as sentence/paragraph openers:**
- Additionally, Furthermore, Moreover, Subsequently, Consequently
- Notably, Importantly, Significantly, Interestingly
- Ultimately, Essentially, Fundamentally, Basically
- In essence, In reality, In practice, In fact (when used as filler)
- To that end, With that in mind, Building on this

**Fix:** Delete the opener and start with the actual point. Or find a concrete connector ("That means", "So", "The result:").

Bad: `"Additionally, the team needs clear ownership of AI initiatives."`
Better: `"Someone needs to own this — not a committee, one person."`

---

### C2. "It is worth noting" and variants

These constructions are AI's way of inserting hedged observations without committing to them.

**Banned:**
- It is worth noting that…
- It is important to note that…
- It should be mentioned that…
- One thing to consider is…
- What's particularly interesting here is…

**Fix:** Either cut it and state the observation directly, or cut the observation entirely if it can't survive without hedging.

---

### C3. Rhetorical questions as transitions

AI uses rhetorical questions to introduce the next point. It reads as a formula.

Bad: `"So what does this mean for your business? It means the window for competitive advantage is closing."`
Better: `"The window for competitive advantage is closing."`

---

### C4. Topic sentences that restate the heading

If a section heading says "Data Readiness" and the first sentence says "Data readiness is one of the key foundations of AI adoption," delete that sentence. Start with the actual content.

---

### C5. False pivots — "however" and "while"

AI creates artificial balance by pivoting with "however," "while," or "although" even when no real tension exists. It reads as manufactured nuance.

Bad: `"While AI tools are powerful, it's important to remember that they require proper data."`
Better: `"AI tools are only as good as the data behind them."`

---

## D. Vocabulary

### D1. The banned word list

Flag any of these and replace with plain language:

**Overused AI intensifiers:**
- robust → strong, solid, reliable (or just cut)
- comprehensive → (usually cut — show the range instead)
- holistic → (almost always cut — be specific instead)
- nuanced → (cut — then add the nuance)
- pivotal, paramount, crucial → important, key (or just state why it matters)
- meticulous, rigorous → careful, thorough
- dynamic → (cut — it means nothing)
- innovative, cutting-edge, groundbreaking → (cut — describe the actual thing)
- seamlessly → (cut — if it's seamless, show it)
- synergy, synergies → (always cut — say what actually combines)
- multifaceted → complex (or describe the facets)

**AI verbs:**
- delve (into) → look at, dig into, explore
- leverage → use
- utilize → use
- navigate → handle, work through, deal with
- unlock → open, release, get to
- underscore → show, confirm
- showcase → show
- foster → build, create, develop

**Ecosystem and landscape nouns (vague abstractions):**
- ecosystem → tools, market, suppliers (be specific)
- landscape → market, situation, field
- realm, sphere, space → industry, market, area
- tapestry, mosaic → (cut — always metaphorical filler)
- journey → process, path (or just cut and describe the steps)
- roadmap → plan (unless it literally means a product roadmap)

**Praise words applied to mundane things:**
- fascinating, remarkable, incredible, exciting applied to a business process → delete

**Compounding / stacking:**
- compounding → cumulative, growing (describe the actual compounding)
- proprietary data loops → data only you have, your own customer data
- agentic commercial engine → commercial operation where AI handles the repetitive work
- agentic workflows → automated workflows (unless the agentic distinction matters)

---

### D2. "In today's world" and time-locator openers

AI grounds claims in the present as if the observation would otherwise seem timeless.

**Banned openers:**
- In today's world / In today's landscape / In today's competitive environment
- In the current era of AI / In an age of rapid AI development
- As AI continues to evolve / As we move forward

**Fix:** Delete the opener. The claim stands on its own or it doesn't.

---

### D3. Hedging stacks

AI combines multiple hedges in one phrase where one or zero would do.

Bad: `"This may potentially suggest a possible shift in approach."`
Better: `"This points to a shift in approach."` or cut entirely.

**Banned stacks:** may potentially, could possibly, might arguably, seems to suggest, appears to indicate.

**Note:** Single hedges ("this suggests," "this may mean") are fine when uncertainty is genuine.

---

### D4. Superlatives applied to soft claims

AI uses superlatives ("the most important", "the key factor") without being able to back them up.

Bad: `"Data quality is the most critical factor in AI success."`
Better: `"Bad data breaks AI faster than anything else."`

---

## E. Specificity

### E1. Unnamed examples

AI illustrates with "for example" but gives no actual example — just a rephrasing of the original claim.

Bad: `"For example, teams that align AI initiatives with business goals tend to see better outcomes."`
Better: Name a real outcome, a real function, or a real tool. If you can't, cut the example.

---

### E2. Claimed consensus without evidence

AI asserts that experts, studies, or research support a claim, without naming them.

**Banned:**
- Studies show / Research suggests / Experts agree / Many companies find
- It's widely recognized / It's well established / It's generally accepted

**Fix:** Either name the source or cut the claim to what you can state directly.

---

### E3. Emotional generics

AI describes reactions ("this can feel overwhelming", "teams often struggle with") without grounding them in anything specific.

**Fix:** Either cut the emotional framing or replace it with something concrete ("Most teams pick too many use cases at once").

---

### E4. Averaged-out opinions

AI gives balanced, non-committal assessments to avoid being wrong. Real consultants take positions.

Bad: `"The right approach will depend on your specific situation and goals."`
Better: `"Start with the highest-volume, lowest-risk process in your pipeline."` (or whatever the actual recommendation is)

---

## F. Tonal patterns

### F1. False balance — "While X has benefits, it also has limitations"

AI manufactures balance even when the answer isn't actually balanced. This reads as diplomatic filler.

Bad: `"While AI can speed up prospecting, it's worth remembering that human judgment remains essential."`
Better: `"AI handles the repetitive prospecting work. Human judgment still picks which accounts matter."`

---

### F2. Enthusiasm inflation

AI applies enthusiastic framing to ordinary information.

**Banned in professional copy:** "exciting," "thrilling," "game-changing," "transformative" applied to anything that is just a tool or a process. If something is genuinely a big deal, describe why — don't assert it.

---

### F3. Preamble constructions — "The X is Y"

These delay the point and sound templated.

Bad: `"The gap to close is moving from isolated pilots to a single agent running in production."`
Better: `"Pick one pilot and ship it properly."`

Bad: `"The priority is moving from scattered tools to a narrow, well-defined use case."`
Better: `"Pick one use case and get it running. Breadth is the enemy right now."`

---

### F4. Inspirational closers

AI ends sections with a motivational flourish. Cut these entirely.

**Banned:**
- The future of X is Y
- Together, we can…
- This is just the beginning
- The opportunity is immense
- [Anything that sounds like it belongs on a startup homepage]

---

### F5. Clever-sounding binaries

AI creates memorable contrast pairs that are hollow on inspection.

Bad: `"that's what separates the experimenters from the operators"`
Better: delete the clause, or state the concrete outcome instead

Bad: `"the difference between companies that thrive and those that fall behind"`
Better: describe one specific thing the successful companies actually do

---

## G. Quiz-specific patterns

These are flagged patterns found in this codebase. Check all of them on each pass.

### G1. Stage descriptions (in `results()`)

Each stage description should read as a quick, direct verdict — not a balanced assessment. Check for:
- Preamble constructions → fix per F3
- Em-dash overuse → fix per B1
- "Compounding" → replace with cumulative or a specific outcome
- Inspirational closes → cut per F4

### G2. Category advice blocks (in `results()`)

The advice for each maturity category (Adoption, Data, Governance, Team) should sound like a consultant giving a verdict in 60 seconds. If it sounds like it could appear in any company's AI report, rewrite it to be more specific.

### G3. Roadmap step bodies (Stage 3 especially)

Stage 3 uses the most jargon. Check for and replace:
- "Dreaming loops", "self-critique patterns" → plain language on feedback loops
- "Proprietary data advantages" → data only you have
- "Widen the moat" → cut or rewrite as a specific competitive action
- "Agent ops muscle" → running agents in production

### G4. Gate and hero copy

- `"Benchmark your AI readiness"` → `"See where you stand on AI"`
- `"receive a personalised follow-up"` → `"We'll send your results after the event"`
- `"Quick context so we can tailor the results"` → `"A bit of context so the results are relevant"`

---

## What NOT to change

- Question text — leave all quiz questions as-is unless they contain an obvious anti-pattern
- Labels, button text, section headings (unless flagged above)
- Structural HTML/CSS/JS — copy changes only
- The ROI disclaimer (it's intentionally hedged)
- Score breakdown labels and column headers

---

## After applying changes

List each change made, grouped by location (stage descriptions, category advice, roadmap steps, gate/hero copy). One line per change is enough.
