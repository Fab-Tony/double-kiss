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
    { name: "Tony",  role: "Captain", r: 442, out: [4, 5],       leave: "Away 10 & 17 Aug",            target: 6, finals: true,  played: 1, gp: 7, gw: 1 },
    { name: "Oscar", role: "Player",  r: 499, out: [12, 13, 14], leave: "Away all October",            target: 6, finals: true,  played: 1, gp: 7, gw: 2 },
    { name: "Kate",  role: "Player",  r: 360, out: [4, 5, 6],    leave: "Most of Aug — back 31 Aug",   target: 6, finals: true,  played: 1, gp: 7, gw: 2 },
    { name: "Arul",  role: "Player",  r: 542, out: [4],          leave: "Away first fortnight of Aug", target: 8, finals: true,  played: 2, gp: 14, gw: 8 },
    { name: "Angus", role: "Player",  r: 527, out: [],           leave: "Available all season",        target: 8, finals: true,  played: 1, gp: 7, gw: 3 },
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
  // Set lineup — 3 players each week. W1 & W2 are Tony's fixed picks (W1
  // Oscar/Arul/Angus; W2 Tony/Kate/Arul — must be Tony+Kate, NOT Oscar). The
  // rest is balanced to an even 9 games each (Angus 8) and rotated so nobody is
  // rostered more than 3 weeks in a row. Tony plays Wk9 (Cue The Good Times).
  // Wk4 & Wk5 are leave-forced (only 2 / 3 available).
  const lineups = {
    1:  ["Oscar", "Arul", "Angus"],    // set by Tony
    2:  ["Tony", "Kate", "Arul"],      // set by Tony (Tony + Kate, not Oscar)
    4:  ["Oscar", "Angus", "Liam Anderson (sub)"], // Tony/Kate/Arul out — Liam Anderson subbing
    5:  ["Oscar", "Arul", "Angus"],    // only 3 available — forced
    6:  ["Tony", "Arul", "Oscar"],
    7:  ["Tony", "Kate", "Angus"],
    8:  ["Arul", "Oscar", "Kate"],
    9:  ["Tony", "Kate", "Angus"],     // vs Cue The Good Times — Tony in
    10: ["Arul", "Oscar", "Tony"],
    11: ["Oscar", "Angus", "Kate"],
    12: ["Tony", "Kate", "Arul"],
    13: ["Angus", "Tony", "Arul"],
    14: ["Kate", "Arul", "Angus"],
    15: ["Kate", "Oscar", "Tony"],
    16: ["Tony", "Oscar", "Kate"],
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
    { name: "Balls Deep", captain: "Fenn Warth", players: [
      { name: "Sev Gharedaghi", r: 445, wp: 50, gw: 7, gp: 14 },
      { name: "Elliot Osborne", r: 398, wp: 36, gw: 5, gp: 14 },
      { name: "Gian Romeo", r: 350, wp: 14, gw: 1, gp: 7 },
      { name: "Fenn Warth", r: 279, wp: 0, gw: 0, gp: 7, c: true },
    ] },
    { name: "Break & Enter", captain: "Nathan Wood", players: [
      { name: "Rob Carnell", r: 539, wp: 71, gw: 5, gp: 7 },
      { name: "Rachel Lewis", r: 412, wp: 57, gw: 4, gp: 7 },
      { name: "Nathan Wood", r: 380, wp: 29, gw: 2, gp: 7, c: true },
      { name: "Greg Jenkins", r: 698 },
    ] },
    { name: "Cue The Good Times", captain: "Mike Dogan", players: [
      { name: "Joe Chao", r: 702, wp: 86, gw: 12, gp: 14 },
      { name: "Mike Dogan", r: 432, wp: 29, gw: 2, gp: 7, c: true },
      { name: "Philip Campbell", r: 502, wp: 21, gw: 3, gp: 14 },
      { name: "Wesley Valele", r: 487, wp: 14, gw: 1, gp: 7 },
      { name: "Kubilay Akin", r: 302 },
    ] },
    { name: "Double Kiss", captain: "Tony Brooks", us: true, players: [
      { name: "Arul Baskaran", r: 542, wp: 57, gw: 8, gp: 14 },
      { name: "Angus Crump", r: 527, wp: 43, gw: 3, gp: 7 },
      { name: "Oscar Kovacs", r: 499, wp: 29, gw: 2, gp: 7 },
      { name: "Kate Ridgeway", r: 360, wp: 29, gw: 2, gp: 7 },
      { name: "Tony Brooks", r: 442, wp: 14, gw: 1, gp: 7, c: true },
    ] },
    { name: "Dragonball Z", captain: "Adam Wowk", players: [
      { name: "Adam Wowk", r: 422, wp: 43, gw: 3, gp: 7, c: true },
      { name: "Maghmud Sadien", r: 492, wp: 43, gw: 3, gp: 7 },
      { name: "Steven Tien", r: 375, wp: 29, gw: 2, gp: 7 },
      { name: "John Bowkett", r: 707 },
      { name: "Shaun Matthews", r: 474 },
    ] },
    { name: "Extorting Dogs", captain: "Will Yuan", players: [
      { name: "Adam Taylor", r: 629, wp: 100, gw: 7, gp: 7 },
      { name: "Chris Dam", r: 679, wp: 57, gw: 4, gp: 7 },
      { name: "Ned Pulido", r: 399, wp: 29, gw: 2, gp: 7 },
      { name: "Will Yuan", r: 471, c: true },
      { name: "Sam Stacy", r: 629 },
      { name: "Liam Pratt", r: 455 },
    ] },
    { name: "Freeballers", captain: "Josh Leary", players: [
      { name: "Mark Harper", r: 562, wp: 86, gw: 12, gp: 14 },
      { name: "Josh Leary", r: 463, wp: 43, gw: 6, gp: 14, c: true },
      { name: "Joshua Mackintosh", r: 450, wp: 21, gw: 3, gp: 14 },
      { name: "Gerard Crowe", r: 460 },
    ] },
    { name: "Gilas", captain: "John Tan", players: [
      { name: "Mark Rillera", r: 525, wp: 71, gw: 5, gp: 7 },
      { name: "Alfie Compuesto", r: 530, wp: 64, gw: 9, gp: 14 },
      { name: "Aldrin Aguilan", r: 529, wp: 57, gw: 4, gp: 7 },
      { name: "John Tan", r: 668, wp: 57, gw: 4, gp: 7, c: true },
      { name: "Jan Amiel Baste", r: 530, wp: 43, gw: 3, gp: 7 },
      { name: "Raymart Pangan", r: 620 },
    ] },
    { name: "Iron 4", captain: "Graz Ferreri", players: [
      { name: "Graz Ferreri", r: 547, wp: 71, gw: 10, gp: 14, c: true },
      { name: "Dai Leota", r: 553, wp: 71, gw: 10, gp: 14 },
      { name: "Dinesh Sookgreep", r: 571, wp: 57, gw: 8, gp: 14 },
      { name: "Andrew Samarjia", r: 587 },
    ] },
    { name: "Marvin's Crew", captain: "Shaun Oglesby", players: [
      { name: "John McDermott", r: 615, wp: 71, gw: 5, gp: 7 },
      { name: "Shaun Oglesby", r: 666, wp: 57, gw: 4, gp: 7, c: true },
      { name: "David Gardner", r: 468, wp: 43, gw: 3, gp: 7 },
    ] },
    { name: "Nice Rack", captain: "Hadi Cherri", players: [
      { name: "Kate Harrison", r: 536, wp: 71, gw: 5, gp: 7 },
      { name: "Saif Mirza", r: 582, wp: 43, gw: 6, gp: 14 },
      { name: "Hadi Cherri", r: 406, wp: 29, gw: 4, gp: 14, c: true },
      { name: "Kevin Wang", r: 431, wp: 29, gw: 2, gp: 7 },
      { name: "Michael Eskander", r: 467 },
    ] },
    { name: "Shooters", captain: "Adis Coralic", players: [
      { name: "Adis Coralic", r: 626, wp: 79, gw: 11, gp: 14, c: true },
      { name: "Nasa Munkhnasan", r: 533, wp: 50, gw: 7, gp: 14 },
      { name: "Stephen Giddings", r: 527, wp: 50, gw: 7, gp: 14 },
    ] },
    { name: "Unbelief", captain: "Tony Habib / Kamal Melhem", players: [
      { name: "Kamal Melhem", r: 569, wp: 64, gw: 9, gp: 14, c: true },
      { name: "Tony Habib", r: 588, wp: 57, gw: 8, gp: 14, c: true },
      { name: "Kah Weng Tan", r: 580, wp: 50, gw: 7, gp: 14 },
      { name: "Phil Deschanel", r: 568 },
    ] },
  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "28 Jul 2026", title: "First win of the season \u2014 5\u20132 over Shooters", body: "We took it 5\u20132 away at Shooters on Monday night. Arul was the difference, winning 5 of his 7 and putting away a table run \u2014 he now leads the team on 57% for the season. Kate got 2 on debut and Tony got 1 in his first outing. That squares our record at 1\u20131 and lifts us to 7th on 7/7." },
    { date: "27 Jul 2026", title: "Live Fargos and win rates now on the site", body: "The Teams page now shows everyone\u2019s current FargoRate and win rate, and there\u2019s a new All players page ranking all 57 in the division \u2014 handy for sizing up an opponent before you play them. Our own results are on the Stats page. All of it refreshes weekly from the league\u2019s official report." },
    { date: "27 Jul 2026", title: "Liam Anderson subbing on 10 Aug", body: "Wk 4 (Mon 10 Aug, home vs Dragonball Z, Table 1) is sorted — Liam Anderson is filling in alongside Oscar and Angus. Tony, Kate and Arul are all away that night, so we\u2019re a full three again." },
    { date: "27 Jul 2026", title: "Next Monday is a bye", body: "No match on Mon 3 Aug — Week 3 is our bye. Next time out is Wk 4, Mon 10 Aug at home vs Dragonball Z on Table 1, 7pm at Club9." },
    { date: "20 Jul 2026", title: "New: table allocations", body: "There\u2019s a new Table allocations link on the Home screen showing which tables every team\u2019s playing on each week — our table\u2019s highlighted. Handy for finding where we\u2019re set up when you get to Club9." },
  ];

  // Season stats — fill these in as results come in.
  // FargoRate LMS public reports — where the live data comes from. Swap the ID to
  // re-pull; no login needed. Refreshed weekly (see FARGO_ASOF).
  const FARGO_ASOF = "28 Jul 2026";
  const FARGO_SOURCES = {
    divisionId: "aa6347f2-a437-4bd5-b84d-b48a0186a411",
    teamId:     "f74f1874-1ccf-41bb-85b1-b48a0186a4e9",
  };

  // Every player in DLS28 Monday, ranked by live FargoRate. Synced from the
  // FargoRate LMS public reports (see FARGO_SOURCES). wp/gw/gp = win %, games won,
  // games played this season; absent means they haven't played yet.
  const divisionPlayers = [
    { name: "John Bowkett", r: 707, team: "Dragonball Z" },
    { name: "Joe Chao", r: 702, team: "Cue The Good Times", wp: 86, gw: 12, gp: 14 },
    { name: "Greg Jenkins", r: 698, team: "Break & Enter" },
    { name: "Chris Dam", r: 679, team: "Extorting Dogs", wp: 57, gw: 4, gp: 7 },
    { name: "John Tan", r: 668, team: "Gilas", wp: 57, gw: 4, gp: 7 },
    { name: "Shaun Oglesby", r: 666, team: "Marvin's Crew", wp: 57, gw: 4, gp: 7 },
    { name: "Adam Taylor", r: 629, team: "Extorting Dogs", wp: 100, gw: 7, gp: 7 },
    { name: "Sam Stacy", r: 629, team: "Extorting Dogs" },
    { name: "Adis Coralic", r: 626, team: "Shooters", wp: 79, gw: 11, gp: 14 },
    { name: "Raymart Pangan", r: 620, team: "Gilas" },
    { name: "John McDermott", r: 615, team: "Marvin's Crew", wp: 71, gw: 5, gp: 7 },
    { name: "Tony Habib", r: 588, team: "Unbelief", wp: 57, gw: 8, gp: 14 },
    { name: "Andrew Samarjia", r: 587, team: "Iron 4" },
    { name: "Saif Mirza", r: 582, team: "Nice Rack", wp: 43, gw: 6, gp: 14 },
    { name: "Kah Weng Tan", r: 580, team: "Unbelief", wp: 50, gw: 7, gp: 14 },
    { name: "Dinesh Sookgreep", r: 571, team: "Iron 4", wp: 57, gw: 8, gp: 14 },
    { name: "Kamal Melhem", r: 569, team: "Unbelief", wp: 64, gw: 9, gp: 14 },
    { name: "Phil Deschanel", r: 568, team: "Unbelief" },
    { name: "Mark Harper", r: 562, team: "Freeballers", wp: 86, gw: 12, gp: 14 },
    { name: "Dai Leota", r: 553, team: "Iron 4", wp: 71, gw: 10, gp: 14 },
    { name: "Graz Ferreri", r: 547, team: "Iron 4", wp: 71, gw: 10, gp: 14 },
    { name: "Arul Baskaran", r: 542, team: "Double Kiss", wp: 57, gw: 8, gp: 14 },
    { name: "Rob Carnell", r: 539, team: "Break & Enter", wp: 71, gw: 5, gp: 7 },
    { name: "Kate Harrison", r: 536, team: "Nice Rack", wp: 71, gw: 5, gp: 7 },
    { name: "Nasa Munkhnasan", r: 533, team: "Shooters", wp: 50, gw: 7, gp: 14 },
    { name: "Alfie Compuesto", r: 530, team: "Gilas", wp: 64, gw: 9, gp: 14 },
    { name: "Jan Amiel Baste", r: 530, team: "Gilas", wp: 43, gw: 3, gp: 7 },
    { name: "Aldrin Aguilan", r: 529, team: "Gilas", wp: 57, gw: 4, gp: 7 },
    { name: "Angus Crump", r: 527, team: "Double Kiss", wp: 43, gw: 3, gp: 7 },
    { name: "Stephen Giddings", r: 527, team: "Shooters", wp: 50, gw: 7, gp: 14 },
    { name: "Mark Rillera", r: 525, team: "Gilas", wp: 71, gw: 5, gp: 7 },
    { name: "Philip Campbell", r: 502, team: "Cue The Good Times", wp: 21, gw: 3, gp: 14 },
    { name: "Oscar Kovacs", r: 499, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Maghmud Sadien", r: 492, team: "Dragonball Z", wp: 43, gw: 3, gp: 7 },
    { name: "Wesley Valele", r: 487, team: "Cue The Good Times", wp: 14, gw: 1, gp: 7 },
    { name: "Shaun Matthews", r: 474, team: "Dragonball Z" },
    { name: "Will Yuan", r: 471, team: "Extorting Dogs" },
    { name: "David Gardner", r: 468, team: "Marvin's Crew", wp: 43, gw: 3, gp: 7 },
    { name: "Michael Eskander", r: 467, team: "Nice Rack" },
    { name: "Josh Leary", r: 463, team: "Freeballers", wp: 43, gw: 6, gp: 14 },
    { name: "Gerard Crowe", r: 460, team: "Freeballers" },
    { name: "Liam Pratt", r: 455, team: "Extorting Dogs" },
    { name: "Joshua Mackintosh", r: 450, team: "Freeballers", wp: 21, gw: 3, gp: 14 },
    { name: "Sev Gharedaghi", r: 445, team: "Balls Deep", wp: 50, gw: 7, gp: 14 },
    { name: "Tony Brooks", r: 442, team: "Double Kiss", wp: 14, gw: 1, gp: 7 },
    { name: "Mike Dogan", r: 432, team: "Cue The Good Times", wp: 29, gw: 2, gp: 7 },
    { name: "Kevin Wang", r: 431, team: "Nice Rack", wp: 29, gw: 2, gp: 7 },
    { name: "Adam Wowk", r: 422, team: "Dragonball Z", wp: 43, gw: 3, gp: 7 },
    { name: "Rachel Lewis", r: 412, team: "Break & Enter", wp: 57, gw: 4, gp: 7 },
    { name: "Hadi Cherri", r: 406, team: "Nice Rack", wp: 29, gw: 4, gp: 14 },
    { name: "Ned Pulido", r: 399, team: "Extorting Dogs", wp: 29, gw: 2, gp: 7 },
    { name: "Elliot Osborne", r: 398, team: "Balls Deep", wp: 36, gw: 5, gp: 14 },
    { name: "Nathan Wood", r: 380, team: "Break & Enter", wp: 29, gw: 2, gp: 7 },
    { name: "Steven Tien", r: 375, team: "Dragonball Z", wp: 29, gw: 2, gp: 7 },
    { name: "Kate Ridgeway", r: 360, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Gian Romeo", r: 350, team: "Balls Deep", wp: 14, gw: 1, gp: 7 },
    { name: "Kubilay Akin", r: 302, team: "Cue The Good Times" },
    { name: "Fenn Warth", r: 279, team: "Balls Deep", wp: 0, gw: 0, gp: 7 },
  ];

  const stats = {
    // Team record. matchFor/matchAgainst = match points (7 per night).
    played: 2, won: 1, drawn: 0, lost: 1,
    matchFor: 7, matchAgainst: 7,
    gamesWon: 16, gamesPlayed: 42,   // sum across our players
    br: 0, tr: 2,
    results: [
      { wk: 1, op: "Extorting Dogs", ha: "Away", result: "L", score: "2\u20135" },
      { wk: 2, op: "Shooters",       ha: "Away", result: "W", score: "5\u20132" },
    ],
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

  return { TEAM, SEASON, LEAGUE, VENUE, PLAYERS_PER_NIGHT, roster, fixtures, teams, divisionPlayers, FARGO_ASOF, FARGO_SOURCES, tableAlloc, news, stats,
           fixture, isMatch, matchesAvailable, scheduledGames, availability, nextIndex, nextMatchIndex, tablesFor };
})();
