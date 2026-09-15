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
    { name: "Tony",  role: "Captain", r: 438, out: [4, 5],       leave: "Was away 10 & 17 Aug \u2014 back now", target: 6, finals: true,  played: 2, gp: 14, gw: 5 },
    { name: "Oscar", role: "Player",  r: 485, out: [12, 13, 14], leave: "Away all October",                target: 6, finals: true,  played: 5, gp: 35, gw: 13 },
    { name: "Kate",  role: "Player",  r: 365, out: [4, 5, 6],    leave: "Was away most of Aug \u2014 back now", target: 6, finals: true,  played: 4, gp: 28, gw: 7 },
    { name: "Arul",  role: "Player",  r: 570, out: [4],          leave: "Was away first fortnight of Aug", target: 8, finals: true,  played: 6, gp: 42, gw: 23 },
    { name: "Angus", role: "Player",  r: 517, out: [],           leave: "Available all season",            target: 8, finals: true,  played: 6, gp: 42, gw: 13 },
  ];;

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
    7:  ["Arul", "Kate", "Angus"],   // set by Tony, 25 Aug
    8:  ["Arul", "Angus", "Kate"],  // corrected 8 Sep \u2014 Angus played, not Oscar
    9:  ["Oscar", "Kate", "Angus"],    // vs Cue The Good Times — Tony swapped out for Oscar (19 Aug)
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
      { name: "Sev Gharedaghi", r: 474, wp: 48, gw: 27, gp: 56 },
      { name: "Elliot Osborne", r: 399, wp: 40, gw: 17, gp: 42 },
      { name: "Gian Romeo", r: 335, wp: 23, gw: 8, gp: 35 },
      { name: "Fenn Warth", r: 277, wp: 14, gw: 5, gp: 35, c: true },
    ] },

    { name: "Break & Enter", captain: "Nathan Wood", players: [
      { name: "Greg Jenkins", r: 698, wp: 63, gw: 22, gp: 35 },
      { name: "Rob Carnell", r: 540, wp: 61, gw: 30, gp: 49 },
      { name: "Rachel Lewis", r: 422, wp: 46, gw: 13, gp: 28 },
      { name: "Nathan Wood", r: 385, wp: 35, gw: 17, gp: 49, c: true },
    ] },

    { name: "Cue The Good Times", captain: "Mike Dogan", players: [
      { name: "Joe Chao", r: 706, wp: 81, gw: 34, gp: 42 },
      { name: "Alex Koussas", r: 587, wp: 61, gw: 17, gp: 28 },
      { name: "Philip Campbell", r: 502, wp: 37, gw: 13, gp: 35 },
      { name: "Wesley Valele", r: 491, wp: 36, gw: 10, gp: 28 },
      { name: "Mike Dogan", r: 435, wp: 43, gw: 15, gp: 35, c: true },
      { name: "Kubilay Akin", r: 288, wp: 0, gw: 0, gp: 7 },
    ] },

    { name: "Double Kiss", captain: "Tony Brooks", us: true, players: [
      { name: "Arul Baskaran", r: 570, wp: 55, gw: 23, gp: 42 },
      { name: "Angus Crump", r: 517, wp: 31, gw: 13, gp: 42 },
      { name: "Oscar Kovacs", r: 485, wp: 37, gw: 13, gp: 35 },
      { name: "Tony Brooks", r: 438, wp: 36, gw: 5, gp: 14, c: true },
      { name: "Liam Anderson", r: 427, wp: 29, gw: 2, gp: 7 },
      { name: "Kate Ridgeway", r: 365, wp: 25, gw: 7, gp: 28 },
    ] },

    { name: "Dragonball Z", captain: "Adam Wowk", players: [
      { name: "John Bowkett", r: 716, wp: 71, gw: 20, gp: 28 },
      { name: "Maghmud Sadien", r: 498, wp: 52, gw: 22, gp: 42 },
      { name: "Shaun Matthews", r: 473, wp: 46, gw: 13, gp: 28 },
      { name: "Adam Wowk", r: 419, wp: 26, gw: 9, gp: 35, c: true },
      { name: "Steven Tien", r: 412, wp: 31, gw: 11, gp: 35 },
    ] },

    { name: "Extorting Dogs", captain: "Will Yuan", players: [
      { name: "Chris Dam", r: 681, wp: 57, gw: 16, gp: 28 },
      { name: "Adam Taylor", r: 629, wp: 67, gw: 14, gp: 21 },
      { name: "Sam Stacy", r: 628, wp: 57, gw: 28, gp: 49 },
      { name: "Will Yuan", r: 474, wp: 41, gw: 14, gp: 34, c: true },
      { name: "Liam Pratt", r: 456, wp: 38, gw: 8, gp: 21 },
      { name: "Ned Pulido", r: 399, wp: 24, gw: 5, gp: 21 },
    ] },

    { name: "Freeballers", captain: "Josh Leary", players: [
      { name: "Mark Harper", r: 571, wp: 59, gw: 29, gp: 49 },
      { name: "Josh Leary", r: 466, wp: 37, gw: 23, gp: 63, c: true },
      { name: "Gerard Crowe", r: 445, wp: 38, gw: 8, gp: 21 },
      { name: "Joshua Mackintosh", r: 430, wp: 27, gw: 15, gp: 56 },
    ] },

    { name: "Gilas", captain: "John Tan", players: [
      { name: "John Tan", r: 670, wp: 51, gw: 18, gp: 35, c: true },
      { name: "Raymart Pangan", r: 626 },
      { name: "Alfie Compuesto", r: 546, wp: 60, gw: 21, gp: 35 },
      { name: "Mark Rillera", r: 540, wp: 57, gw: 20, gp: 35 },
      { name: "Aldrin Aguilan", r: 538, wp: 54, gw: 15, gp: 28 },
      { name: "Jan Amiel Baste", r: 534, wp: 46, gw: 13, gp: 28 },
    ] },

    { name: "Iron 4", captain: "Graz Ferreri", players: [
      { name: "Andrew Samarjia", r: 592 },
      { name: "Dinesh Sookgreep", r: 579, wp: 52, gw: 33, gp: 63 },
      { name: "Dai Leota", r: 576, wp: 65, gw: 41, gp: 63 },
      { name: "Graz Ferreri", r: 558, wp: 59, gw: 37, gp: 63, c: true },
    ] },

    { name: "Marvin's Crew", captain: "Shaun Oglesby", players: [
      { name: "Shaun Oglesby", r: 668, wp: 70, gw: 39, gp: 56, c: true },
      { name: "Mitchell Tucker", r: 619, wp: 43, gw: 3, gp: 7 },
      { name: "John McDermott", r: 618, wp: 64, gw: 27, gp: 42 },
      { name: "Stuart Rogers", r: 543, wp: 43, gw: 3, gp: 7 },
      { name: "Sean McAllister", r: 472, wp: 29, gw: 2, gp: 7 },
      { name: "David Gardner", r: 469, wp: 40, gw: 17, gp: 42 },
    ] },

    { name: "Nice Rack", captain: "Hadi Cherri", players: [
      { name: "Saif Mirza", r: 585, wp: 64, gw: 18, gp: 28 },
      { name: "Kate Harrison", r: 541, wp: 76, gw: 16, gp: 21 },
      { name: "Kevin Wang", r: 515, wp: 45, gw: 22, gp: 49 },
      { name: "Michael Eskander", r: 469, wp: 39, gw: 11, gp: 28 },
      { name: "Hadi Cherri", r: 427, wp: 38, gw: 21, gp: 56, c: true },
    ] },

    { name: "Shooters", captain: "Adis Coralic", players: [
      { name: "Adis Coralic", r: 639, wp: 89, gw: 56, gp: 63, c: true },
      { name: "Omid Neshadi", r: 576, wp: 57, gw: 4, gp: 7 },
      { name: "Nasa Munkhnasan", r: 544, wp: 62, gw: 39, gp: 63 },
      { name: "Stephen Giddings", r: 517, wp: 51, gw: 25, gp: 49 },
    ] },

    { name: "Unbelief", captain: "Tony Habib / Kamal Melhem", players: [
      { name: "Tony Habib", r: 584, wp: 51, gw: 32, gp: 63, c: true },
      { name: "Kamal Melhem", r: 579, wp: 65, gw: 41, gp: 63, c: true },
      { name: "Kah Weng Tan", r: 577, wp: 50, gw: 10, gp: 20 },
      { name: "Phil Deschanel", r: 567, wp: 55, gw: 23, gp: 42 },
    ] },

  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "15 Sep 2026", title: "T\u2011shirts are on the way", body: "The team t\u2011shirts are ordered and on their way \u2014 black or navy, along the lines of what Gilas have done. Nothing more to do for now; Tony will let everyone know when they land and how pickup works." },
    { date: "15 Sep 2026", title: "Wk 9: 5\u20132 away over Cue The Good Times", body: "A proper response after two rough Mondays. Away at Cue The Good Times, Oscar led the night with 4 from 7, Kate and Angus took 2 each \u2014 8 games from 21 \u2014 and it finished 5\u20132. That\u2019s our third win of the season and lifts us to 28\u201331 on match points. Oscar\u2019s night pushed him to 37% for the season. Next up: Wk 10, Mon 21 Sep, away vs Balls Deep \u2014 Arul, Oscar and Tony in." },
    { date: "8 Sep 2026", title: "T\u2011shirts are on order", body: "The team t\u2011shirts are officially on order \u2014 black or navy, along the lines of what Gilas have done. More to follow on when they land and how pickup will work." },
    { date: "8 Sep 2026", title: "Wk 7\u20138: back\u2011to\u2011back losses at home, 2\u20135 both nights", body: "A rough fortnight at Club9. Wk 7 v Unbelief and Wk 8 v Iron 4 both went 2\u20135. Arul kept grinding (2 and 3 games) and Angus and Kate shared the load each night, but neither was enough against two of the stronger sides in the division. We\u2019re now 3\u20135 on the season and 23\u201329 on match points. Next up: Wk 9, Mon 14 Sep, away vs Cue The Good Times \u2014 Oscar in for Tony." },
    { date: "25 Aug 2026", title: "T\u2011shirt sizes to Tony by Sat 29 Aug", body: "Team t\u2011shirts are moving \u2014 black or navy, along the lines of what Gilas have put together. Get your size to Tony by the end of this week, Saturday 29 Aug, so nobody gets missed. The colour still isn\u2019t locked, so say something if you have a preference." },
    { date: "25 Aug 2026", title: "Wk 6: 6\u20131 over Freeballers \u2014 back to even", body: "Our best night of the season at home on Monday. Arul took 5 from 7, Tony 4 and Oscar 4 \u2014 13 games out of 21 \u2014 and it finished 6\u20131. That squares the season at 3\u20133 and 19\u201319 on match points. Arul is up to 64%, and Tony\u2019s second outing lifted him to 36%. Next up: Wk 7, Mon 31 Aug, home vs Unbelief on Table 7 \u2014 Arul, Kate and Angus in." },
  ];;

  // Season stats — fill these in as results come in.
  // FargoRate LMS public reports — where the live data comes from. Swap the ID to
  // re-pull; no login needed. Refreshed weekly (see FARGO_ASOF).
  const FARGO_ASOF = "15 Sep 2026";
  const FARGO_SOURCES = {
    divisionId: "aa6347f2-a437-4bd5-b84d-b48a0186a411",
    teamId:     "f74f1874-1ccf-41bb-85b1-b48a0186a4e9",
  };

  // Every player in DLS28 Monday, ranked by live FargoRate. Synced from the
  // FargoRate LMS public reports (see FARGO_SOURCES). wp/gw/gp = win %, games won,
  // games played this season; absent means they haven't played yet.
  const divisionPlayers = [

    { name: "John Bowkett", r: 716, team: "Dragonball Z", wp: 71, gw: 20, gp: 28 },
    { name: "Joe Chao", r: 706, team: "Cue The Good Times", wp: 81, gw: 34, gp: 42 },
    { name: "Greg Jenkins", r: 698, team: "Break & Enter", wp: 63, gw: 22, gp: 35 },
    { name: "Chris Dam", r: 681, team: "Extorting Dogs", wp: 57, gw: 16, gp: 28 },
    { name: "John Tan", r: 670, team: "Gilas", wp: 51, gw: 18, gp: 35 },
    { name: "Shaun Oglesby", r: 668, team: "Marvin's Crew", wp: 70, gw: 39, gp: 56 },
    { name: "Adis Coralic", r: 639, team: "Shooters", wp: 89, gw: 56, gp: 63 },
    { name: "Adam Taylor", r: 629, team: "Extorting Dogs", wp: 67, gw: 14, gp: 21 },
    { name: "Sam Stacy", r: 628, team: "Extorting Dogs", wp: 57, gw: 28, gp: 49 },
    { name: "Raymart Pangan", r: 626, team: "Gilas" },
    { name: "Mitchell Tucker", r: 619, team: "Marvin's Crew", wp: 43, gw: 3, gp: 7 },
    { name: "John McDermott", r: 618, team: "Marvin's Crew", wp: 64, gw: 27, gp: 42 },
    { name: "Andrew Samarjia", r: 592, team: "Iron 4" },
    { name: "Alex Koussas", r: 587, team: "Cue The Good Times", wp: 61, gw: 17, gp: 28 },
    { name: "Saif Mirza", r: 585, team: "Nice Rack", wp: 64, gw: 18, gp: 28 },
    { name: "Tony Habib", r: 584, team: "Unbelief", wp: 51, gw: 32, gp: 63 },
    { name: "Dinesh Sookgreep", r: 579, team: "Iron 4", wp: 52, gw: 33, gp: 63 },
    { name: "Kamal Melhem", r: 579, team: "Unbelief", wp: 65, gw: 41, gp: 63 },
    { name: "Kah Weng Tan", r: 577, team: "Unbelief", wp: 50, gw: 10, gp: 20 },
    { name: "Dai Leota", r: 576, team: "Iron 4", wp: 65, gw: 41, gp: 63 },
    { name: "Omid Neshadi", r: 576, team: "Shooters", wp: 57, gw: 4, gp: 7 },
    { name: "Mark Harper", r: 571, team: "Freeballers", wp: 59, gw: 29, gp: 49 },
    { name: "Arul Baskaran", r: 570, team: "Double Kiss", wp: 55, gw: 23, gp: 42 },
    { name: "Phil Deschanel", r: 567, team: "Unbelief", wp: 55, gw: 23, gp: 42 },
    { name: "Graz Ferreri", r: 558, team: "Iron 4", wp: 59, gw: 37, gp: 63 },
    { name: "Alfie Compuesto", r: 546, team: "Gilas", wp: 60, gw: 21, gp: 35 },
    { name: "Nasa Munkhnasan", r: 544, team: "Shooters", wp: 62, gw: 39, gp: 63 },
    { name: "Stuart Rogers", r: 543, team: "Marvin's Crew", wp: 43, gw: 3, gp: 7 },
    { name: "Kate Harrison", r: 541, team: "Nice Rack", wp: 76, gw: 16, gp: 21 },
    { name: "Mark Rillera", r: 540, team: "Gilas", wp: 57, gw: 20, gp: 35 },
    { name: "Rob Carnell", r: 540, team: "Break & Enter", wp: 61, gw: 30, gp: 49 },
    { name: "Aldrin Aguilan", r: 538, team: "Gilas", wp: 54, gw: 15, gp: 28 },
    { name: "Jan Amiel Baste", r: 534, team: "Gilas", wp: 46, gw: 13, gp: 28 },
    { name: "Angus Crump", r: 517, team: "Double Kiss", wp: 31, gw: 13, gp: 42 },
    { name: "Stephen Giddings", r: 517, team: "Shooters", wp: 51, gw: 25, gp: 49 },
    { name: "Kevin Wang", r: 515, team: "Nice Rack", wp: 45, gw: 22, gp: 49 },
    { name: "Philip Campbell", r: 502, team: "Cue The Good Times", wp: 37, gw: 13, gp: 35 },
    { name: "Maghmud Sadien", r: 498, team: "Dragonball Z", wp: 52, gw: 22, gp: 42 },
    { name: "Wesley Valele", r: 491, team: "Cue The Good Times", wp: 36, gw: 10, gp: 28 },
    { name: "Oscar Kovacs", r: 485, team: "Double Kiss", wp: 37, gw: 13, gp: 35 },
    { name: "Sev Gharedaghi", r: 474, team: "Balls Deep", wp: 48, gw: 27, gp: 56 },
    { name: "Will Yuan", r: 474, team: "Extorting Dogs", wp: 41, gw: 14, gp: 34 },
    { name: "Shaun Matthews", r: 473, team: "Dragonball Z", wp: 46, gw: 13, gp: 28 },
    { name: "Sean McAllister", r: 472, team: "Marvin's Crew", wp: 29, gw: 2, gp: 7 },
    { name: "David Gardner", r: 469, team: "Marvin's Crew", wp: 40, gw: 17, gp: 42 },
    { name: "Michael Eskander", r: 469, team: "Nice Rack", wp: 39, gw: 11, gp: 28 },
    { name: "Josh Leary", r: 466, team: "Freeballers", wp: 37, gw: 23, gp: 63 },
    { name: "Liam Pratt", r: 456, team: "Extorting Dogs", wp: 38, gw: 8, gp: 21 },
    { name: "Gerard Crowe", r: 445, team: "Freeballers", wp: 38, gw: 8, gp: 21 },
    { name: "Tony Brooks", r: 438, team: "Double Kiss", wp: 36, gw: 5, gp: 14 },
    { name: "Mike Dogan", r: 435, team: "Cue The Good Times", wp: 43, gw: 15, gp: 35 },
    { name: "Joshua Mackintosh", r: 430, team: "Freeballers", wp: 27, gw: 15, gp: 56 },
    { name: "Hadi Cherri", r: 427, team: "Nice Rack", wp: 38, gw: 21, gp: 56 },
    { name: "Liam Anderson", r: 427, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Rachel Lewis", r: 422, team: "Break & Enter", wp: 46, gw: 13, gp: 28 },
    { name: "Adam Wowk", r: 419, team: "Dragonball Z", wp: 26, gw: 9, gp: 35 },
    { name: "Steven Tien", r: 412, team: "Dragonball Z", wp: 31, gw: 11, gp: 35 },
    { name: "Elliot Osborne", r: 399, team: "Balls Deep", wp: 40, gw: 17, gp: 42 },
    { name: "Ned Pulido", r: 399, team: "Extorting Dogs", wp: 24, gw: 5, gp: 21 },
    { name: "Nathan Wood", r: 385, team: "Break & Enter", wp: 35, gw: 17, gp: 49 },
    { name: "Kate Ridgeway", r: 365, team: "Double Kiss", wp: 25, gw: 7, gp: 28 },
    { name: "Gian Romeo", r: 335, team: "Balls Deep", wp: 23, gw: 8, gp: 35 },
    { name: "Kubilay Akin", r: 288, team: "Cue The Good Times", wp: 0, gw: 0, gp: 7 },
    { name: "Fenn Warth", r: 277, team: "Balls Deep", wp: 14, gw: 5, gp: 35 },

  ];

  const stats = {
    // Team record. matchFor/matchAgainst = match points (7 per night); the Wk 3
    // bye is credited 3-0 by the league, so it counts in both the record and the
    // match points, exactly as the official ladder has it.
    played: 9, won: 4, drawn: 0, lost: 5,
    matchFor: 28, matchAgainst: 31,
    gamesWon: 63, gamesPlayed: 168,  // sum across our players (incl. Liam Anderson's Wk 4 sub)
    br: 6, tr: 4,
    ladder: "10th of 13",
    ladderNote: "Take the ladder position with a pinch of salt. The league's public report ranks on match wins alone \u2014 it ignores losses and doesn't use league points. We're level with Extorting Dogs on 28 match wins, and we have the better record (28\u201331 to their 28\u201333), but the report still lists them 9th and us 10th.",
    subs: [
      { name: "Liam Anderson", wk: 4, gw: 2, gp: 7 },
    ],
    results: [
      { wk: 1, op: "Extorting Dogs", ha: "Away", result: "L", score: "2\u20135" },
      { wk: 2, op: "Shooters",       ha: "Away", result: "W", score: "5\u20132" },
      { wk: 3, op: "BYE",            ha: "Bye",  result: "\u2014", score: "3\u20130 credited" },
      { wk: 4, op: "Dragonball Z",   ha: "Home", result: "L", score: "1\u20136" },
      { wk: 5, op: "Break & Enter",  ha: "Away", result: "L", score: "2\u20135" },
      { wk: 6, op: "Freeballers",    ha: "Home", result: "W", score: "6\u20131" },
      { wk: 7, op: "Unbelief",       ha: "Home", result: "L", score: "2\u20135" },
      { wk: 8, op: "Iron 4",         ha: "Home", result: "L", score: "2\u20135" },
      { wk: 9, op: "Cue The Good Times", ha: "Away", result: "W", score: "5\u20132" },
    ],
  };;

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
