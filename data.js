/* =====================================================================
   Double Kiss — single source of truth.
   Edit THIS file to update the site. Every page reads from window.DK.
   - roster[].out  = week numbers (see fixtures) that player is unavailable
   - roster[].leave = plain-English leave note shown on the Roster page
   ===================================================================== */
window.DK = (function () {
  const TEAM   = "Double Kiss";
  const SEASON = "Season 28";
  const LEAGUE = "Sydney Diamond League";
  const VENUE  = "Club9, North Strathfield";

  // target = regular-season matches this player must PLAY to qualify for Finals
  // finals = whether the player is contesting Finals at all
  // played = matches played so far — bump these as the season goes
  const roster = [
    { name: "Tony",  role: "Captain", r: 453, out: [4, 5],               leave: "Away 10 & 17 Aug",             target: 6, finals: true,  played: 0 },
    { name: "Oscar", role: "Player",  r: 502, out: [12, 13, 14],         leave: "Away all October",             target: 6, finals: true,  played: 0 },
    { name: "Kate",  role: "Player",  r: 361, out: [4, 5, 6],            leave: "Most of Aug — back 31 Aug",    target: 6, finals: true,  played: 0 },
    { name: "Arul",  role: "Player",  r: 543, out: [4],                  leave: "Away first fortnight of Aug",  target: 8, finals: true,  played: 0 },
    { name: "Angus", role: "Player",  r: 525, out: [],                   leave: "Available all season",         target: 8, finals: true,  played: 0 },
  ];

  const PLAYERS_PER_NIGHT = 3; // only 3 play each Monday — the captain picks from those available

  const fixtures = [
    { wk: 1,  date: "Mon 20 Jul", iso: "2026-07-20", op: "Extorting Dogs",     ha: "Away", tbl: "7" },
    { wk: 2,  date: "Mon 27 Jul", iso: "2026-07-27", op: "Shooters",           ha: "Away", tbl: "5" },
    { wk: 3,  date: "Mon 3 Aug",  iso: "2026-08-03", op: "BYE",                ha: "Bye",  tbl: "—" },
    { wk: 4,  date: "Mon 10 Aug", iso: "2026-08-10", op: "Dragonball Z",       ha: "Home", tbl: "1" },
    { wk: 5,  date: "Mon 17 Aug", iso: "2026-08-17", op: "Break & Enter",      ha: "Away", tbl: "4" },
    { wk: 6,  date: "Mon 24 Aug", iso: "2026-08-24", op: "Freeballers",        ha: "Home", tbl: "4" },
    { wk: 7,  date: "Mon 31 Aug", iso: "2026-08-31", op: "Unbelief",           ha: "Home", tbl: "7" },
    { wk: 8,  date: "Mon 7 Sep",  iso: "2026-09-07", op: "Iron 4",             ha: "Home", tbl: "7" },
    { wk: 9,  date: "Mon 14 Sep", iso: "2026-09-14", op: "Cue The Good Times", ha: "Away", tbl: "1" },
    { wk: 10, date: "Mon 21 Sep", iso: "2026-09-21", op: "Balls Deep",         ha: "Away", tbl: "5" },
    { wk: 11, date: "Mon 28 Sep", iso: "2026-09-28", op: "Nice Rack",          ha: "Home", tbl: "2" },
    { wk: 12, date: "Mon 12 Oct", iso: "2026-10-12", op: "Gilas",              ha: "Away", tbl: "7" },
    { wk: 13, date: "Mon 19 Oct", iso: "2026-10-19", op: "Marvin's Crew",      ha: "Home", tbl: "5" },
    { wk: 14, date: "Mon 26 Oct", iso: "2026-10-26", op: "Nice Rack",          ha: "Home", tbl: "8" },
    { wk: 15, date: "Mon 2 Nov",  iso: "2026-11-02", op: "Balls Deep",         ha: "Away", tbl: "4" },
    { wk: 16, date: "Mon 9 Nov",  iso: "2026-11-09", op: "Dragonball Z",       ha: "Home", tbl: "1" },
    { wk: "F1", date: "Sat 21 Nov", iso: "2026-11-21", op: "Finals — Vegas Showdown (Day 1)", ha: "Finals", tbl: "—" },
    { wk: "F2", date: "Sun 22 Nov", iso: "2026-11-22", op: "Finals — Vegas Showdown (Day 2)", ha: "Finals", tbl: "—" },
  ];

  // Set lineup — the 3 players rostered to play each week. Edit to change who's on.
  // Wks 1 & 2 set by Tony; the rest allocated for equal spread (≈9 games each) within leave.
  // Rebalanced for an even ~9 games each now Angus is available all season
  // (Angus 8, everyone else 9). Tony is in Wk9 for Cue The Good Times.
  const lineups = {
    1:  ["Oscar", "Kate", "Angus"],
    2:  ["Tony", "Oscar", "Kate"],
    4:  ["Oscar", "Angus"],            // Tony/Kate/Arul all out — needs a fill-in
    5:  ["Oscar", "Arul", "Angus"],    // only 3 available — forced
    6:  ["Tony", "Oscar", "Arul"],
    7:  ["Tony", "Arul", "Angus"],
    8:  ["Oscar", "Kate", "Arul"],
    9:  ["Tony", "Oscar", "Angus"],    // vs Cue The Good Times — Tony in
    10: ["Kate", "Arul", "Angus"],
    11: ["Tony", "Oscar", "Kate"],
    12: ["Tony", "Kate", "Arul"],
    13: ["Tony", "Kate", "Angus"],
    14: ["Tony", "Kate", "Arul"],
    15: ["Tony", "Arul", "Angus"],
    16: ["Oscar", "Kate", "Arul"],
  };
  fixtures.forEach(f => { f.lineup = lineups[f.wk] || []; });

  // Weekly table allocations — every match's table for the round, from the
  // Diamond League Monday schedule (Monday-Schedule-S28.pdf). t = table number,
  // h = home team, a = away team. One team byes each week (no table).
  const tableAlloc = {
    1:  { bye: "Break & Enter",       rows: [ {t:1,h:"Balls Deep",a:"Iron 4"}, {t:2,h:"Unbelief",a:"Nice Rack"}, {t:4,h:"Cue The Good Times",a:"Shooters"}, {t:5,h:"Dragonball Z",a:"Marvin's Crew"}, {t:7,h:"Extorting Dogs",a:"Double Kiss"}, {t:8,h:"Freeballers",a:"Gilas"} ] },
    2:  { bye: "Extorting Dogs",       rows: [ {t:1,h:"Gilas",a:"Nice Rack"}, {t:2,h:"Iron 4",a:"Freeballers"}, {t:4,h:"Marvin's Crew",a:"Cue The Good Times"}, {t:5,h:"Shooters",a:"Double Kiss"}, {t:7,h:"Unbelief",a:"Dragonball Z"}, {t:8,h:"Break & Enter",a:"Balls Deep"} ] },
    3:  { bye: "Double Kiss",          rows: [ {t:1,h:"Extorting Dogs",a:"Cue The Good Times"}, {t:2,h:"Freeballers",a:"Unbelief"}, {t:4,h:"Balls Deep",a:"Gilas"}, {t:5,h:"Iron 4",a:"Break & Enter"}, {t:7,h:"Nice Rack",a:"Marvin's Crew"}, {t:8,h:"Dragonball Z",a:"Shooters"} ] },
    4:  { bye: "Nice Rack",            rows: [ {t:1,h:"Double Kiss",a:"Dragonball Z"}, {t:2,h:"Freeballers",a:"Extorting Dogs"}, {t:4,h:"Gilas",a:"Unbelief"}, {t:5,h:"Marvin's Crew",a:"Iron 4"}, {t:7,h:"Shooters",a:"Balls Deep"}, {t:8,h:"Cue The Good Times",a:"Break & Enter"} ] },
    5:  { bye: "Cue The Good Times",   rows: [ {t:1,h:"Nice Rack",a:"Shooters"}, {t:2,h:"Unbelief",a:"Balls Deep"}, {t:4,h:"Break & Enter",a:"Double Kiss"}, {t:5,h:"Dragonball Z",a:"Extorting Dogs"}, {t:7,h:"Iron 4",a:"Gilas"}, {t:8,h:"Marvin's Crew",a:"Freeballers"} ] },
    6:  { bye: "Balls Deep",           rows: [ {t:1,h:"Break & Enter",a:"Dragonball Z"}, {t:2,h:"Cue The Good Times",a:"Nice Rack"}, {t:4,h:"Double Kiss",a:"Freeballers"}, {t:5,h:"Extorting Dogs",a:"Iron 4"}, {t:7,h:"Gilas",a:"Shooters"}, {t:8,h:"Unbelief",a:"Marvin's Crew"} ] },
    7:  { bye: "Marvin's Crew",        rows: [ {t:1,h:"Iron 4",a:"Dragonball Z"}, {t:2,h:"Nice Rack",a:"Balls Deep"}, {t:4,h:"Shooters",a:"Extorting Dogs"}, {t:5,h:"Cue The Good Times",a:"Gilas"}, {t:7,h:"Double Kiss",a:"Unbelief"}, {t:8,h:"Freeballers",a:"Break & Enter"} ] },
    8:  { bye: "Gilas",                rows: [ {t:1,h:"Extorting Dogs",a:"Unbelief"}, {t:2,h:"Balls Deep",a:"Cue The Good Times"}, {t:4,h:"Marvin's Crew",a:"Shooters"}, {t:5,h:"Break & Enter",a:"Nice Rack"}, {t:7,h:"Double Kiss",a:"Iron 4"}, {t:8,h:"Dragonball Z",a:"Freeballers"} ] },
    9:  { bye: "Dragonball Z",         rows: [ {t:1,h:"Cue The Good Times",a:"Double Kiss"}, {t:2,h:"Gilas",a:"Break & Enter"}, {t:4,h:"Marvin's Crew",a:"Balls Deep"}, {t:5,h:"Nice Rack",a:"Extorting Dogs"}, {t:7,h:"Shooters",a:"Freeballers"}, {t:8,h:"Unbelief",a:"Iron 4"} ] },
    10: { bye: "Iron 4",              rows: [ {t:1,h:"Dragonball Z",a:"Nice Rack"}, {t:2,h:"Extorting Dogs",a:"Gilas"}, {t:4,h:"Freeballers",a:"Cue The Good Times"}, {t:5,h:"Balls Deep",a:"Double Kiss"}, {t:7,h:"Shooters",a:"Unbelief"}, {t:8,h:"Break & Enter",a:"Marvin's Crew"} ] },
    11: { bye: "Freeballers",         rows: [ {t:1,h:"Cue The Good Times",a:"Dragonball Z"}, {t:2,h:"Double Kiss",a:"Nice Rack"}, {t:4,h:"Extorting Dogs",a:"Balls Deep"}, {t:5,h:"Gilas",a:"Marvin's Crew"}, {t:7,h:"Shooters",a:"Iron 4"}, {t:8,h:"Unbelief",a:"Break & Enter"} ] },
    12: { bye: "Unbelief",            rows: [ {t:1,h:"Marvin's Crew",a:"Extorting Dogs"}, {t:2,h:"Nice Rack",a:"Freeballers"}, {t:4,h:"Break & Enter",a:"Shooters"}, {t:5,h:"Dragonball Z",a:"Balls Deep"}, {t:7,h:"Gilas",a:"Double Kiss"}, {t:8,h:"Iron 4",a:"Cue The Good Times"} ] },
    13: { bye: "Shooters",            rows: [ {t:1,h:"Balls Deep",a:"Freeballers"}, {t:2,h:"Nice Rack",a:"Iron 4"}, {t:4,h:"Cue The Good Times",a:"Unbelief"}, {t:5,h:"Double Kiss",a:"Marvin's Crew"}, {t:7,h:"Extorting Dogs",a:"Break & Enter"}, {t:8,h:"Gilas",a:"Dragonball Z"} ] },
    14: { bye: "Shooters",            rows: [ {t:1,h:"Freeballers",a:"Cue The Good Times"}, {t:2,h:"Iron 4",a:"Balls Deep"}, {t:4,h:"Marvin's Crew",a:"Gilas"}, {t:5,h:"Unbelief",a:"Extorting Dogs"}, {t:7,h:"Break & Enter",a:"Dragonball Z"}, {t:8,h:"Double Kiss",a:"Nice Rack"} ] },
    15: { bye: "Nice Rack",           rows: [ {t:1,h:"Extorting Dogs",a:"Marvin's Crew"}, {t:2,h:"Gilas",a:"Iron 4"}, {t:4,h:"Balls Deep",a:"Double Kiss"}, {t:5,h:"Shooters",a:"Break & Enter"}, {t:7,h:"Cue The Good Times",a:"Unbelief"}, {t:8,h:"Dragonball Z",a:"Freeballers"} ] },
    16: { bye: "Cue The Good Times",  rows: [ {t:1,h:"Double Kiss",a:"Dragonball Z"}, {t:2,h:"Freeballers",a:"Unbelief"}, {t:4,h:"Gilas",a:"Nice Rack"}, {t:5,h:"Iron 4",a:"Shooters"}, {t:7,h:"Marvin's Crew",a:"Balls Deep"}, {t:8,h:"Break & Enter",a:"Extorting Dogs"} ] },
  };

  // The 13 Monday teams. c: captain. r: FargoRate. (Our own ratings TBC.)
  const teams = [
    { name: "Double Kiss", captain: "Tony Brooks", us: true, players: [
      { name: "Arul Baskaran", r: 543 }, { name: "Angus Crump", r: 525 }, { name: "Oscar Kovacs", r: 502 },
      { name: "Tony Brooks", r: 453, c: true }, { name: "Kate Ridgeway", r: 361 } ] },
    { name: "Balls Deep", captain: "Fenn Warth", players: [
      { name: "Sev Gharedaghi", r: 452 }, { name: "Elliot Osborne", r: 397 },
      { name: "Gian Romeo", r: 350 }, { name: "Fenn Warth", r: 293, c: true } ] },
    { name: "Break & Enter", captain: "Nathan Wood", players: [
      { name: "Lee Hopwood", r: 610 }, { name: "Daniel Jenkins", r: 566 }, { name: "Nick Nicolaou", r: 550 },
      { name: "Rob Carnell", r: 542 }, { name: "Nathan Wood", r: 381, c: true } ] },
    { name: "Cue The Good Times", captain: "Mike Dogan", players: [
      { name: "Joe Chao", r: 704 }, { name: "Philip Campbell", r: 504 }, { name: "Wesley Valele", r: 489 },
      { name: "Mike Dogan", r: 432, c: true }, { name: "Kubilay Akin", r: 303 } ] },
    { name: "Dragonball Z", captain: "Adam Wowk", players: [
      { name: "John Bowkett", r: 707 }, { name: "Maghmud Sadien", r: 491 }, { name: "Shaun Matthews", r: 474 },
      { name: "Adam Wowk", r: 423, c: true }, { name: "Steven Tien", r: 376 } ] },
    { name: "Extorting Dogs", captain: "Will Yuan", players: [
      { name: "Chris Dam", r: 680 }, { name: "Sam Stacy", r: 630 }, { name: "Adam Taylor", r: 629 },
      { name: "Will Yuan", r: 473, c: true }, { name: "Liam Pratt", r: 456 } ] },
    { name: "Freeballers", captain: "Josh Leary", players: [
      { name: "Mark Harper", r: 560 }, { name: "Josh Leary", r: 463, c: true },
      { name: "Gerard Crowe", r: 457 }, { name: "Joshua Mackintosh", r: 450 } ] },
    { name: "Gilas", captain: "John Tan", players: [
      { name: "John Tan", r: 667, c: true }, { name: "Raymart Pangan", r: 619 }, { name: "Aldrin Aguilan", r: 530 },
      { name: "Mark Rillera", r: 529 }, { name: "Alfie Compuesto", r: 511 } ] },
    { name: "Iron 4", captain: "Graz Ferreri", players: [
      { name: "Andrew Samarjia", r: 589 }, { name: "Dinesh Sookgreep", r: 569 }, { name: "Dai Leota", r: 554 },
      { name: "Graz Ferreri", r: 547, c: true } ] },
    { name: "Marvin's Crew", captain: "Shaun Oglesby", players: [
      { name: "Shaun Oglesby", r: 668, c: true }, { name: "John McDermott", r: 616 }, { name: "David Gardner", r: 469 } ] },
    { name: "Nice Rack", captain: "Hadi Cherri", players: [
      { name: "Saif Mirza", r: 525 }, { name: "Michael Eskander", r: 467 }, { name: "Hadi Cherri", r: 409, c: true } ] },
    { name: "Shooters", captain: "Adis Coralic", players: [
      { name: "Adis Coralic", r: 626, c: true }, { name: "Nasa Munkhnasan", r: 544 }, { name: "Stephen Giddings", r: 525 } ] },
    { name: "Unbelief", captain: "Tony Habib / Kamal Melhem", players: [
      { name: "Tony Habib", r: 591, c: true }, { name: "Kah Weng Tan", r: 580 }, { name: "Kamal Melhem", r: 571, c: true } ] },
  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "20 Jul 2026", title: "Angus back full-time + Finals dates", body: "Angus is available all season now, so the set lineups have been evened out — roughly 9 games each. Finals are locked in: Sat 21 & Sun 22 Nov (Vegas Showdown, top 16, Club9). Check the Roster page for your weeks — and Tony's in for the Cue The Good Times match (Wk9)." },
    { date: "20 Jul 2026", title: "New: table allocations", body: "There's a new Table allocations link on the Home screen showing which tables every team's playing on each week — our table's highlighted. Handy for finding where we're set up when you get to Club9." },
    { date: "20 Jul 2026", title: "Opening night — reminders", body: "League shirts must be worn (brand-new players without one yet: buy ASAP). Matches start 7pm; tables open for free play from 6:30. Light supper from 8:15. BCA registration is due by Week 3 for anyone who didn't play last season. Need a sub or have an issue? Let Tony know ASAP." },
    { date: "19 Jul 2026", title: "Season 28 starts Monday", body: "First up: away to Extorting Dogs, Table 7, 7pm at Club9. Full squad available." },
    { date: "19 Jul 2026", title: "Team site is live", body: "Fixtures, roster, availability and league info all in one place. Stats and per-team pages to come." },
  ];

  // Season stats — fill these in as results come in.
  const stats = {
    played: 0, won: 0, drawn: 0, lost: 0,
    ladderPoints: 0, position: null,
    scalpFor: 0, scalpAgainst: 0, br: 0, tr: 0,
    results: [], // e.g. { wk:1, op:"Extorting Dogs", ha:"Away", result:"W", score:"—" }
  };

  /* ---- helpers ---- */
  function fixture(wk) { return fixtures.find(f => f.wk === wk); }

  // is this fixture a real league match (not a Bye or Finals)?
  function isMatch(f) { return f.ha === "Home" || f.ha === "Away"; }

  // how many non-bye matches this player is available for across the season
  function matchesAvailable(p) {
    return fixtures.filter(f => isMatch(f) && !p.out.includes(f.wk)).length;
  }

  // how many matches this player is actually rostered (set lineup) to play
  function scheduledGames(p) {
    return fixtures.filter(f => f.lineup.includes(p.name)).length;
  }

  function availability(wk) {
    const f = fixture(wk);
    const bye = !!f && f.ha === "Bye";
    const inP = [], outP = [];
    roster.forEach(p => (p.out.includes(wk) ? outP : inP).push(p));
    return { fixture: f, bye, inP, outP, count: inP.length };
  }

  // index of the next fixture today-or-later (may be a BYE); -1 if season done
  function nextIndex(today) {
    const t = today || new Date(); t.setHours(0, 0, 0, 0);
    return fixtures.findIndex(f => new Date(f.iso + "T00:00:00") >= t);
  }
  // index of the next actual MATCH today-or-later (skips BYE and Finals)
  function nextMatchIndex(today) {
    const t = today || new Date(); t.setHours(0, 0, 0, 0);
    return fixtures.findIndex(f => isMatch(f) && new Date(f.iso + "T00:00:00") >= t);
  }

  // table allocations for a given week (or null if none listed)
  function tablesFor(wk) { return tableAlloc[wk] || null; }

  return { TEAM, SEASON, LEAGUE, VENUE, PLAYERS_PER_NIGHT, roster, fixtures, teams, tableAlloc, news, stats,
           fixture, isMatch, matchesAvailable, scheduledGames, availability, nextIndex, nextMatchIndex, tablesFor };
})();
