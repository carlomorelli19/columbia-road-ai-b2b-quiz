/* ============================================================================
   AI MATURITY QUIZ — SCORING v2 (two axes)

   Stage     = what you actually have running   (from A1 + A2)
   Readiness = whether your foundations can hold the next step (A3, A4, B1, B2, C1, C2, D1)

   Five edits, all inside index.html. Marked EDIT 1..5.
   ========================================================================= */


/* ---------------------------------------------------------------------------
   EDIT 1 — Add all of this ABOVE  function results()
   (top level, next to MEET_URL and APPS_SCRIPT_URL).
------------------------------------------------------------------------- */

const NA_CREDIT = 0.25;   // "not sure" is a real answer, not the bottom of the scale

// The four things that decide whether the next step will hold.
const DIMS = {
  'Connected tools': { w:25, c:'var(--navy)',     ids:['A3','A4'] },
  'Your data':       { w:30, c:'var(--forest)',   ids:['B1','B2'] },
  'Ownership':       { w:30, c:'var(--burgundy)', ids:['C1','C2'] },
  'Your team':       { w:15, c:'var(--taupe)',    ids:['D1'] },
};

// n  = number of real options   na = index of the "not sure" option (-1 if none)
const QCFG = {
  A3:{ n:4, na:4,  short:'how your systems connect',            up:'Connect your main systems properly instead of moving information by hand.' },
  A4:{ n:4, na:4,  short:'shared data across tools',            up:'Give your tools one shared set of customer and sales data to read from.' },
  B1:{ n:4, na:4,  short:'the state of your data',              up:'Clear out duplicates and fill in the fields your first use case depends on.' },
  B2:{ n:4, na:4,  short:'where AI gets its background',        up:'Put the background your AI needs in one place, with someone responsible for keeping it right.' },
  C1:{ n:5, na:-1, short:'who owns AI',                         up:'Put one name against AI, and agree how ideas get picked.' },
  C2:{ n:4, na:4,  short:'how involved sales and marketing are',up:'Get sales and marketing writing their own instructions rather than handing over a wish list.' },
  D1:{ n:4, na:4,  short:'how your team feels about AI',        up:'Get a handful of people using one tool every day on real work.' },
};

// ── Axis 1: what you have running. Comes straight from A2, nudged by A1.
const STAGES = [
  { lv:'Stage 0: Nothing running yet', sub:'The starting line', bg:'var(--warm)', fg:'var(--black)',
    desc:'No AI is doing work for you yet. Plenty of companies are in the same position, and it means you get to skip the mistakes everyone else made first. Start with one job your team dislikes, not with a tool.' },
  { lv:'Stage 1: Testing and pilots', sub:'Where most companies are', bg:'var(--pink)', fg:'var(--black)',
    desc:'You have tried things. Nothing has made it into daily use yet. The gap between a pilot and something people rely on is mostly a decision: pick one, set a date, ship it.' },
  { lv:'Stage 2: First agents live', sub:'Ahead of most', bg:'var(--light-blue)', fg:'var(--black)',
    desc:'Something is running and people use it. That already puts you ahead of most B2B companies. Next comes joining up what you have, because two agents that share what they know beat four that do not.' },
  { lv:'Stage 3: Several agents live', sub:'At the front', bg:'var(--forest)', fg:'var(--white)',
    desc:'You have more than one thing running across sales and marketing. Very few companies are here. From now on your advantage comes from your own data rather than your tools, because everyone can buy the same tools.' },
];

// ── Axis 2: whether your foundations can hold it.
const READY = [
  { max:22,  lv:'Not there yet',  desc:'The basics are missing in more than one place. Anything you build now will need rebuilding.' },
  { max:32,  lv:'Early days',     desc:'Some pieces are in place, most are not. Enough to run one thing carefully, not enough to run several.' },
  { max:41,  lv:'Getting there',  desc:'A workable base with real gaps in it. Fix the weakest area below and the rest gets easier.' },
  { max:50,  lv:'Ready for more', desc:'Your foundations can carry more than one thing at a time. The limit now is what you choose to build.' },
  { max:100, lv:'Solid ground',   desc:'Data, ownership and people all hold up. Very few companies get here.' },
];

// ── How the two axes sit against each other.
const FIT = {
  ahead:   { t:'You could be doing more than you are',
             d:'Your data, ownership and people are in better shape than what you actually have running. That is an unusual place to be, and an easy one to fix. You do not need to prepare more. Pick something and put it live.' },
  matched: { t:'Your foundations match what you are running',
             d:'Nothing is badly out of step. Growing is a question of pace rather than repair. Keep what you have moving and tidy up the weakest area below as you go.' },
  stretched:{ t:'You are running ahead of your foundations',
             d:'More is live than your data and ownership can comfortably carry. It works until it does not: the output gets unreliable, nobody can say why, and people stop trusting it. Steady the weakest area below before you add anything else.' },
};

const BOTTLENECK_COPY = {
  'Connected tools':'Your data and your people are further along than your plumbing. Information still has to be carried by hand between systems, which caps how much you can run at once. This is usually the cheapest of the four to fix.',
  'Your data':'Everything else waits on this. AI can only work with what it can read, and right now that is incomplete or spread out. Buying more tools will not move it.',
  'Ownership':'You have the pieces but nobody is deciding. Without a clear owner, AI stays a set of side projects that never get a deadline or a budget line.',
  'Your team':'Your setup is ahead of your people. Tools nobody opens produce nothing, and that is a habit problem rather than a technology one.',
};

const DIM_ADVICE = {
  'Connected tools':[
    'Your tools do not talk to each other, so somebody has to move information by hand. Fine for a trial, impossible at any real volume. Pick the two systems that matter most and connect them properly.',
    'The main connections are there. What is missing is one shared source they all read from, so a fix in one place does not have to be repeated in four.',
    'Your tools share what they know. That is the setup that lets you add the next one in days rather than months.'],
  'Your data':[
    'This is what breaks AI fastest. If records are duplicated, half empty or spread across systems, anything built on top will be confidently wrong. A week of tidying saves months of chasing bad output.',
    'Your data sits in one place but the detail is uneven. Fill the gaps your first use case actually depends on rather than trying to clean all of it.',
    'Your data is in good shape. That opens up the harder jobs: full account context, live pipeline signals, scoring people will actually trust.'],
  'Ownership':[
    'Nobody owns this yet. Without a name against it, people quietly use whatever tools they like, spend adds up that nobody tracks, and no one can say what worked. One person and one page of rules is enough to start.',
    'There is ownership but no way to choose between ideas. Agree what you are measuring before you build, so projects compete on results rather than on who asks loudest.',
    'Ownership is clear and decisions have a home. Now show the numbers. Proving one case makes the next five easier to fund.'],
  'Your team':[
    'Interest is low, and no tool survives that. Get four or five people using one thing on a real task every day. The habit matters more than which tool you picked.',
    'People know about it and use it now and then. Training days rarely change how anyone works. Daily use on real work does.',
    'Your team wants to go further. Give them a clear problem and a way to tell whether they solved it, rather than open permission to experiment.'],
};


/* ---------------------------------------------------------------------------
   EDIT 2 — Inside results(), REPLACE everything from
       const ms = S.find(s => s.id === 'mat');
   down to and including the closing brace of the  for(const c in cats)
   advice loop (roughly lines 660–697 today).
------------------------------------------------------------------------- */

  const cats = {};
  for (const d in DIMS) cats[d] = { s:0, mx:DIMS[d].w, c:DIMS[d].c, a:'', p:0 };

  const moves = [];

  for (const d in DIMS) {
    const ids = DIMS[d].ids, per = DIMS[d].w / ids.length;
    ids.forEach(id => {
      const cfg = QCFG[id], raw = A[id];
      const isNA = (raw === undefined || raw === cfg.na);
      cats[d].s += per * (isNA ? NA_CREDIT : raw / (cfg.n - 1));

      if (isNA) {
        moves.push({ id, dim:d, gain: per * (0.5 - NA_CREDIT), unknown:true,
                     text:'Nobody is sure about ' + cfg.short + '. Worth finding out before you plan around it.' });
      } else if (raw < cfg.n - 1) {
        moves.push({ id, dim:d, gain: per * (1 / (cfg.n - 1)), unknown:false, text: cfg.up });
      }
    });
  }

  let exact = 0;
  for (const d in cats) exact += cats[d].s;
  const tot = Math.round(exact);          // readiness, 0–100
  const mx  = 100;
  for (const d in cats) { cats[d].p = cats[d].s / cats[d].mx; cats[d].s = Math.round(cats[d].s); }
  for (const d in cats) cats[d].a = DIM_ADVICE[d][ cats[d].p < .5 ? 0 : cats[d].p < .75 ? 1 : 2 ];


/* ---------------------------------------------------------------------------
   EDIT 3 — REPLACE the  let lv,stage,bg,fg,desc;  block
   (the four if/else lines using .44 / .68 / .92), and DELETE the later line
       const stageKey = scorePct<=.44 ? 0 : ... ;
------------------------------------------------------------------------- */

  // Stage: what you actually have running
  const a1 = A['A1'], a2 = A['A2'];
  const stageKey = a2 >= 4 ? 3 : a2 === 3 ? 2 : a2 === 2 ? 1 : (a2 === 1 && a1 > 0) ? 1 : 0;
  const { lv, sub:stage, bg, fg, desc } = STAGES[stageKey];

  // Readiness band
  const readyKey = READY.findIndex(b => tot <= b.max);
  const ready = READY[readyKey];
  const scorePct = tot / 100;

  // How the two sit together
  const fitKey = readyKey > stageKey + 1 ? 'ahead' : readyKey < stageKey ? 'stretched' : 'matched';
  const fit = FIT[fitKey];

  // Weakest of the four. Ties break toward the heavier dimension.
  const ranked = Object.keys(cats).sort((a,b) => cats[a].p - cats[b].p || DIMS[b].w - DIMS[a].w);
  const bnDim = ranked[0], stDim = ranked[ranked.length - 1];
  const bnPct = Math.round(cats[bnDim].p * 100), stPct = Math.round(cats[stDim].p * 100);
  const spread = Math.round((cats[stDim].p - cats[bnDim].p) * 100);
  const balanced = spread < 15;

  // What it would take to reach the next readiness band
  const nextCut = readyKey < READY.length - 1 ? READY[readyKey].max + 1 : null;
  const need = nextCut ? nextCut - tot : 0;
  moves.sort((a,b) => b.gain - a.gain);
  const plan = []; let acc = 0;
  for (const m of moves) {
    if (acc >= need || plan.length >= 3) break;
    plan.push(m); acc += m.gain;
  }
  const crosses = nextCut !== null && acc >= need;


/* ---------------------------------------------------------------------------
   EDIT 4 — REPLACE the whole  nextSteps  object and the  blockerMsgs  object.
   nextSteps is now keyed by stage 0–3, same as before, new copy.
------------------------------------------------------------------------- */

  const nextSteps = {
    0:{ headline:'Start with one job, not a strategy', steps:[
      {n:'1',title:'Pick the job people complain about',body:'Ask your team what they would hand over tomorrow if they could. Start there. Do not run a tool comparison first.'},
      {n:'2',title:'Get five people using one thing',body:'One tool, five people, every day. Five regular users teach you more than fifty licences nobody opens.'},
      {n:'3',title:'Put a name against it',body:'Not a working group. One person who decides what gets tried, what gets kept and what it costs. Without that, this dies in the first busy quarter.'},
      {n:'4',title:'Write down how the work is done',body:'How your best rep actually works is the raw material any AI needs. Writing it down is the most useful thing you can do before spending anything.'},
    ]},
    1:{ headline:'Pick one pilot and give it a date', steps:[
      {n:'1',title:'Choose one and drop the rest',body:'Three experiments that never ship are worth less than one thing people use on Monday. Pick whichever is closest to done.'},
      {n:'2',title:'Agree the number first',body:'Decide what you are trying to move before you build. Afterwards, everyone measures whatever makes the result look best.'},
      {n:'3',title:'Give it real users, not reviewers',body:'A pilot nobody depends on tells you nothing. Put it in front of people whose week gets worse if it stops working.'},
      {n:'4',title:'Fix only what blocks go-live',body:'Data and process problems are endless. Sort out the ones standing between you and launch, and leave the rest for later.'},
    ]},
    2:{ headline:'Join up what you already have', steps:[
      {n:'1',title:'Find where the handovers break',body:'Look at every point where your agent passes work to a person or another system. That is where the time you saved goes missing.'},
      {n:'2',title:'Start keeping what you learn',body:'Record what the agent did and whether it worked. Almost nobody does this, and it is what makes the next one better.'},
      {n:'3',title:'Build the second one on the first',body:'Do not start from scratch. Reuse the data and instructions the first one runs on, or you will end up maintaining two of everything.'},
      {n:'4',title:'Show the numbers while they are fresh',body:'You have a working example. Use it now. Budget follows proof faster than it follows plans.'},
    ]},
    3:{ headline:'Your advantage is your own data now', steps:[
      {n:'1',title:'Build the data nobody else has',body:'Anyone can buy the same tools. What they cannot buy is your customer history, your deal context and what your market told you last quarter. Capture it on purpose.'},
      {n:'2',title:'Close the loop',body:'Track what each agent did and whether the outcome was any good. Without that, they repeat the same mistakes forever.'},
      {n:'3',title:'Decide what keeps them in order',body:'Once several are running, something has to sequence them and settle conflicts. Sketch it before you need it. Retrofitting is painful.'},
      {n:'4',title:'Look outside your own walls',body:'Agents that work with your partners and customers reach further than anything you automate internally. That is the bigger prize.'},
    ]},
  };

  const blockerMsgs = {
    0:'Messy data is the most common blocker we see and the most fixable. You do not have to sort all of it first. Clean the part your first use case touches and leave the rest.',
    1:'Skill gaps close faster than most people expect. Do not wait until you feel ready. One project with a clear goal teaches more than any training course.',
    2:'It is hard to prove a return before you have shipped anything. Pick something where you already measure the before, and agree the number you are chasing up front.',
    3:'Compliance worries are the most common brake across European B2B, so you are in good company. Clear rules speed things up. It is the not-knowing that stalls projects.',
    4:'Too many options is usually a strategy problem rather than a technology one. Look at where your sales process hurts most and start there.',
    5:'Buy-in follows results, not slides. Find something you can prove in six to eight weeks and let the number do the arguing.',
    6:'Tool limits are usually data limits in disguise. The question is rarely whether your stack can run agents. It is what you can give them to work with.',
  };


/* ---------------------------------------------------------------------------
   EDIT 5a — In the hero block, REPLACE the ring text and badge so the ring
   shows readiness and the badge shows stage. Everything else stays.
------------------------------------------------------------------------- */

  //  <div class="ring-txt"><div class="ring-num">${tot}</div><div class="ring-max">readiness</div></div>
  //  </div></div>
  //  <div class="badge" style="background:${bg};color:${fg}">${lv}</div>
  //  <div style="font-size:12px;opacity:.7;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase;font-weight:500">${stage}</div>
  //  <p class="res-desc">${desc}</p>


/* ---------------------------------------------------------------------------
   EDIT 5b — Add these two panels right after  <div class="bd-grid">`;
   and BEFORE the ROI panel.
------------------------------------------------------------------------- */

  // ── How the two axes fit together, plus the weakest area
  const fitInner = `<div style="padding:16px">
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
      <div style="flex:1;min-width:120px;padding:10px 12px;background:var(--cream)">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--taupe);margin-bottom:3px">Running today</div>
        <div style="font-size:13px;font-weight:600;color:var(--navy)">${lv.replace(/^Stage \d: /,'')}</div>
      </div>
      <div style="flex:1;min-width:120px;padding:10px 12px;background:var(--cream)">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--taupe);margin-bottom:3px">Foundations</div>
        <div style="font-size:13px;font-weight:600;color:var(--navy)">${ready.lv}</div>
      </div>
    </div>
    <div style="font-family:var(--display);font-size:1.2rem;color:var(--navy);line-height:1.25;margin-bottom:8px">${fit.t}</div>
    <div style="font-size:13px;color:var(--grey-b);line-height:1.55;margin-bottom:16px">${fit.d}</div>
    ${balanced
      ? `<div style="padding:12px 14px;background:var(--cream);border-left:3px solid var(--forest);font-size:13px;color:var(--grey-b);line-height:1.5">Your four areas are within ${spread} points of each other, which is not common. Nothing is holding you back more than anything else, so this is about pace rather than repair.</div>`
      : `<div style="padding:12px 14px;background:var(--cream);border-left:3px solid var(--burgundy)">
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--burgundy);margin-bottom:4px">Weakest area &middot; ${bnDim} (${bnPct}%)</div>
          <div style="font-size:13px;color:var(--grey-b);line-height:1.5;margin-bottom:8px">${BOTTLENECK_COPY[bnDim]}</div>
          <div style="font-size:13px;color:var(--grey-b);line-height:1.5"><span style="font-weight:600;color:var(--navy)">Strongest is ${stDim} at ${stPct}%.</span> You are held back by the weakest of the four rather than the average, so work spent there pays back more than work spent here.</div>
        </div>`}
  </div>`;
  h += panel('fit', 'Where you stand', fitInner, true);

  // ── What it would take to move up
  if (nextCut) {
    const gapInner = `<div style="padding:16px">
      <div style="font-size:13px;color:var(--grey-b);line-height:1.55;margin-bottom:14px">
        You are <span style="font-weight:600;color:var(--navy)">${need} point${need===1?'':'s'}</span> off
        <span style="font-weight:600;color:var(--navy)">${READY[readyKey+1].lv}</span>.
        ${crosses ? (plan.length===1 ? 'This one change gets you there:' : 'These changes get you there:')
                  : 'The biggest things you can move right now:'}
      </div>` +
      plan.map(m => `<div style="display:flex;gap:12px;margin-bottom:12px">
        <div style="min-width:26px;height:26px;border-radius:9999px;background:${m.unknown?'var(--taupe)':'var(--forest)'};color:var(--white);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:1px">${m.id}</div>
        <div>
          <div style="font-size:13px;color:var(--black);line-height:1.5">${m.text}</div>
          <div style="font-size:11px;color:var(--taupe);margin-top:2px">${m.dim} &middot; +${m.gain.toFixed(1)}</div>
        </div>
      </div>`).join('') + `</div>`;
    h += panel('gap', 'What moves you up', gapInner, true);
  }


/* ---------------------------------------------------------------------------
   EDIT 5c — In QUIZ_RESULT, replace the score and *_score lines with these.
   Everything else in QUIZ_RESULT stays exactly as it is.
------------------------------------------------------------------------- */

  //  stage:                lv,
  //  stage_index:          stageKey,
  //  readiness_score:      tot,
  //  readiness_band:       ready.lv,
  //  fit:                  fitKey,
  //  connected_tools_pct:  Math.round(cats['Connected tools'].p * 100),
  //  data_pct:             Math.round(cats['Your data'].p * 100),
  //  ownership_pct:        Math.round(cats['Ownership'].p * 100),
  //  team_pct:             Math.round(cats['Your team'].p * 100),
  //  weakest_area:         balanced ? 'none' : bnDim,
  //  strongest_area:       stDim,
  //  points_to_next_band:  need,
  //  next_moves:           plan.map(m => m.id + ': ' + m.text).join(' | '),
