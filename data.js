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
    { name: "Tony",  role: "Captain", out: [4, 5],               leave: "Away 10 & 17 Aug",             target: 6, finals: true,  played: 0 },
    { name: "Oscar", role: "Player",  out: [12, 13, 14],         leave: "Away all October",             target: 6, finals: true,  played: 0 },
    { name: "Kate",  role: "Player",  out: [4, 5, 6],            leave: "Most of Aug — back 31 Aug",    target: 6, finals: true,  played: 0 },
    { name: "Arul",  role: "Player",  out: [4],                  leave: "Away first fortnight of Aug",  target: 8, finals: true,  played: 0 },
    { name: "Angus", role: "Player",  out: [10,11,12,13,14,15,16], leave: "Available to 15 Sep, then unsure", target: 8, finals: false, played: 0 },
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
  ];

  // Set lineup — the 3 players rostered to play each week. Edit to change who's on.
  // Wks 1 & 2 set by Tony; the rest allocated for equal spread (≈9 games each) within leave.
  const lineups = {
    1:  ["Oscar", "Arul", "Angus"],
    2:  ["Tony", "Kate", "Angus"],
    4:  ["Oscar", "Angus"],            // only 2 available — needs a fill-in
    5:  ["Oscar", "Arul", "Angus"],
    6:  ["Tony", "Oscar", "Angus"],
    7:  ["Kate", "Arul", "Angus"],
    8:  ["Tony", "Oscar", "Arul"],
    9:  ["Oscar", "Kate", "Angus"],
    10: ["Oscar", "Kate", "Arul"],
    11: ["Tony", "Kate", "Arul"],
    12: ["Tony", "Kate", "Arul"],
    13: ["Tony", "Kate", "Arul"],
    14: ["Tony", "Kate", "Arul"],
    15: ["Tony", "Oscar", "Arul"],
    16: ["Tony", "Oscar", "Kate"],
  };
  fixtures.forEach(f => { f.lineup = lineups[f.wk] || []; });

  // The 13 Monday teams. Double Kiss first. (More per-team detail to come.)
  const teams = [
    { name: "Double Kiss",        captain: "Tony Brooks",              us: true },
    { name: "Balls Deep",         captain: "Fenn Warth" },
    { name: "Break & Enter",      captain: "Nathan Wood" },
    { name: "Cue The Good Times", captain: "Mike Dogan" },
    { name: "Dragonball Z",       captain: "Adam Wowk" },
    { name: "Extorting Dogs",     captain: "Will Yuan" },
    { name: "Freeballers",        captain: "Josh Leary" },
    { name: "Gilas",              captain: "John Tan" },
    { name: "Iron 4",             captain: "Graz Ferreri" },
    { name: "Marvin's Crew",      captain: "Shaun Oglesby" },
    { name: "Nice Rack",          captain: "Hadi Cherri" },
    { name: "Shooters",           captain: "Adis Coralic" },
    { name: "Unbelief",           captain: "Tony Habib / Kamal Melhem" },
  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "19 Jul 2026", title: "Season 28 starts Monday", body: "First up: away to Extorting Dogs, Table 7, 7:30pm at Club9. Full squad available." },
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

  // how many non-bye matches this player is available for across the season
  function matchesAvailable(p) {
    return fixtures.filter(f => f.ha !== "Bye" && !p.out.includes(f.wk)).length;
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
  // index of the next actual MATCH today-or-later (skips BYE)
  function nextMatchIndex(today) {
    const t = today || new Date(); t.setHours(0, 0, 0, 0);
    return fixtures.findIndex(f => f.ha !== "Bye" && new Date(f.iso + "T00:00:00") >= t);
  }

  return { TEAM, SEASON, LEAGUE, VENUE, PLAYERS_PER_NIGHT, roster, fixtures, teams, news, stats,
           fixture, matchesAvailable, scheduledGames, availability, nextIndex, nextMatchIndex };
})();
