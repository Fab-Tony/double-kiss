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
    { name: "Tony",  role: "Captain", r: 433, out: [4, 5],       leave: "Was away 10 & 17 Aug \u2014 back now", target: 6, finals: true,  played: 2, gp: 14, gw: 5 },
    { name: "Oscar", role: "Player",  r: 485, out: [12, 13, 14], leave: "Away all October",                target: 6, finals: true,  played: 4, gp: 28, gw: 9 },
    { name: "Kate",  role: "Player",  r: 359, out: [4, 5, 6],    leave: "Was away most of Aug \u2014 back now", target: 6, finals: true,  played: 1, gp: 7,  gw: 2 },
    { name: "Arul",  role: "Player",  r: 596, out: [4],          leave: "Was away first fortnight of Aug", target: 8, finals: true,  played: 4, gp: 28, gw: 18 },
    { name: "Angus", role: "Player",  r: 518, out: [],           leave: "Available all season",            target: 8, finals: true,  played: 3, gp: 21, gw: 8 },
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
    8:  ["Arul", "Oscar", "Kate"],
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
      { name: "Sev Gharedaghi", r: 482, wp: 60, gw: 21, gp: 35 },
      { name: "Elliot Osborne", r: 399, wp: 38, gw: 8, gp: 21 },
      { name: "Gian Romeo", r: 329, wp: 18, gw: 5, gp: 28 },
      { name: "Fenn Warth", r: 260, wp: 10, gw: 2, gp: 21, c: true },
    ] },
    { name: "Break & Enter", captain: "Nathan Wood", players: [
      { name: "Rob Carnell", r: 537, wp: 63, gw: 22, gp: 35 },
      { name: "Greg Jenkins", r: 697, wp: 57, gw: 12, gp: 21 },
      { name: "Nathan Wood", r: 386, wp: 39, gw: 11, gp: 28, c: true },
      { name: "Rachel Lewis", r: 413, wp: 36, gw: 5, gp: 14 },
    ] },
    { name: "Cue The Good Times", captain: "Mike Dogan", players: [
      { name: "Joe Chao", r: 704, wp: 81, gw: 17, gp: 21 },
      { name: "Mike Dogan", r: 434, wp: 48, gw: 10, gp: 21, c: true },
      { name: "Wesley Valele", r: 490, wp: 38, gw: 8, gp: 21 },
      { name: "Alex Koussas", r: 590, wp: 29, gw: 2, gp: 7 },
      { name: "Philip Campbell", r: 501, wp: 29, gw: 8, gp: 28 },
      { name: "Kubilay Akin", r: 288, wp: 0, gw: 0, gp: 7 },
    ] },
    { name: "Double Kiss", captain: "Tony Brooks", us: true, players: [
      { name: "Arul Baskaran", r: 596, wp: 64, gw: 18, gp: 28 },
      { name: "Angus Crump", r: 518, wp: 38, gw: 8, gp: 21 },
      { name: "Tony Brooks", r: 433, wp: 36, gw: 5, gp: 14, c: true },
      { name: "Oscar Kovacs", r: 485, wp: 32, gw: 9, gp: 28 },
      { name: "Liam Anderson", r: 413, wp: 29, gw: 2, gp: 7 },
      { name: "Kate Ridgeway", r: 359, wp: 29, gw: 2, gp: 7 },
    ] },
    { name: "Dragonball Z", captain: "Adam Wowk", players: [
      { name: "John Bowkett", r: 717, wp: 76, gw: 16, gp: 21 },
      { name: "Shaun Matthews", r: 473, wp: 52, gw: 11, gp: 21 },
      { name: "Maghmud Sadien", r: 496, wp: 46, gw: 16, gp: 35 },
      { name: "Steven Tien", r: 436, wp: 29, gw: 8, gp: 28 },
      { name: "Adam Wowk", r: 420, wp: 19, gw: 4, gp: 21, c: true },
    ] },
    { name: "Extorting Dogs", captain: "Will Yuan", players: [
      { name: "Chris Dam", r: 681, wp: 71, gw: 10, gp: 14 },
      { name: "Sam Stacy", r: 631, wp: 71, gw: 20, gp: 28 },
      { name: "Adam Taylor", r: 629, wp: 67, gw: 14, gp: 21 },
      { name: "Will Yuan", r: 476, wp: 46, gw: 13, gp: 28, c: true },
      { name: "Liam Pratt", r: 454, wp: 43, gw: 3, gp: 7 },
      { name: "Ned Pulido", r: 401, wp: 14, gw: 2, gp: 14 },
    ] },
    { name: "Freeballers", captain: "Josh Leary", players: [
      { name: "Mark Harper", r: 575, wp: 75, gw: 21, gp: 28 },
      { name: "Gerard Crowe", r: 475, wp: 38, gw: 8, gp: 21 },
      { name: "Josh Leary", r: 462, wp: 31, gw: 13, gp: 42, c: true },
      { name: "Joshua Mackintosh", r: 435, wp: 29, gw: 10, gp: 35 },
    ] },
    { name: "Gilas", captain: "John Tan", players: [
      { name: "Mark Rillera", r: 536, wp: 67, gw: 14, gp: 21 },
      { name: "Alfie Compuesto", r: 532, wp: 61, gw: 17, gp: 28 },
      { name: "John Tan", r: 668, wp: 57, gw: 12, gp: 21, c: true },
      { name: "Aldrin Aguilan", r: 535, wp: 54, gw: 15, gp: 28 },
      { name: "Jan Amiel Baste", r: 532, wp: 46, gw: 13, gp: 28 },
      { name: "Raymart Pangan", r: 621 },
    ] },
    { name: "Iron 4", captain: "Graz Ferreri", players: [
      { name: "Dai Leota", r: 566, wp: 62, gw: 26, gp: 42 },
      { name: "Dinesh Sookgreep", r: 576, wp: 55, gw: 23, gp: 42 },
      { name: "Graz Ferreri", r: 551, wp: 52, gw: 22, gp: 42, c: true },
      { name: "Andrew Samarjia", r: 591 },
    ] },
    { name: "Marvin's Crew", captain: "Shaun Oglesby", players: [
      { name: "Shaun Oglesby", r: 667, wp: 76, gw: 32, gp: 42, c: true },
      { name: "John McDermott", r: 617, wp: 63, gw: 22, gp: 35 },
      { name: "Stuart Rogers", r: 542, wp: 43, gw: 3, gp: 7 },
      { name: "David Gardner", r: 468, wp: 40, gw: 17, gp: 42 },
    ] },
    { name: "Nice Rack", captain: "Hadi Cherri", players: [
      { name: "Kate Harrison", r: 537, wp: 79, gw: 11, gp: 14 },
      { name: "Saif Mirza", r: 581, wp: 57, gw: 12, gp: 21 },
      { name: "Kevin Wang", r: 526, wp: 39, gw: 11, gp: 28 },
      { name: "Hadi Cherri", r: 424, wp: 34, gw: 12, gp: 35, c: true },
      { name: "Michael Eskander", r: 468, wp: 21, gw: 3, gp: 14 },
    ] },
    { name: "Shooters", captain: "Adis Coralic", players: [
      { name: "Adis Coralic", r: 632, wp: 83, gw: 35, gp: 42, c: true },
      { name: "Nasa Munkhnasan", r: 537, wp: 57, gw: 24, gp: 42 },
      { name: "Stephen Giddings", r: 522, wp: 54, gw: 19, gp: 35 },
    ] },
    { name: "Unbelief", captain: "Tony Habib / Kamal Melhem", players: [
      { name: "Kamal Melhem", r: 573, wp: 64, gw: 27, gp: 42, c: true },
      { name: "Phil Deschanel", r: 565, wp: 54, gw: 15, gp: 28 },
      { name: "Kah Weng Tan", r: 575, wp: 50, gw: 7, gp: 14 },
      { name: "Tony Habib", r: 585, wp: 48, gw: 20, gp: 42, c: true },
    ] },

  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "25 Aug 2026", title: "T\u2011shirt sizes to Tony by Sat 29 Aug", body: "Team t\u2011shirts are moving \u2014 black or navy, along the lines of what Gilas have put together. Get your size to Tony by the end of this week, Saturday 29 Aug, so nobody gets missed. The colour still isn\u2019t locked, so say something if you have a preference." },
    { date: "25 Aug 2026", title: "Wk 6: 6\u20131 over Freeballers \u2014 back to even", body: "Our best night of the season at home on Monday. Arul took 5 from 7, Tony 4 and Oscar 4 \u2014 13 games out of 21 \u2014 and it finished 6\u20131. That squares the season at 3\u20133 and 19\u201319 on match points. Arul is up to 64%, and Tony\u2019s second outing lifted him to 36%. Next up: Wk 7, Mon 31 Aug, home vs Unbelief on Table 7 \u2014 Arul, Kate and Angus in." },
  ];;

  // Season stats — fill these in as results come in.
  // FargoRate LMS public reports — where the live data comes from. Swap the ID to
  // re-pull; no login needed. Refreshed weekly (see FARGO_ASOF).
  const FARGO_ASOF = "25 Aug 2026";
  const FARGO_SOURCES = {
    divisionId: "aa6347f2-a437-4bd5-b84d-b48a0186a411",
    teamId:     "f74f1874-1ccf-41bb-85b1-b48a0186a4e9",
  };

  // Every player in DLS28 Monday, ranked by live FargoRate. Synced from the
  // FargoRate LMS public reports (see FARGO_SOURCES). wp/gw/gp = win %, games won,
  // games played this season; absent means they haven't played yet.
  const divisionPlayers = [

    { name: "John Bowkett", r: 717, team: "Dragonball Z", wp: 76, gw: 16, gp: 21 },
    { name: "Joe Chao", r: 704, team: "Cue The Good Times", wp: 81, gw: 17, gp: 21 },
    { name: "Greg Jenkins", r: 697, team: "Break & Enter", wp: 57, gw: 12, gp: 21 },
    { name: "Chris Dam", r: 681, team: "Extorting Dogs", wp: 71, gw: 10, gp: 14 },
    { name: "John Tan", r: 668, team: "Gilas", wp: 57, gw: 12, gp: 21 },
    { name: "Shaun Oglesby", r: 667, team: "Marvin's Crew", wp: 76, gw: 32, gp: 42 },
    { name: "Adis Coralic", r: 632, team: "Shooters", wp: 83, gw: 35, gp: 42 },
    { name: "Sam Stacy", r: 631, team: "Extorting Dogs", wp: 71, gw: 20, gp: 28 },
    { name: "Adam Taylor", r: 629, team: "Extorting Dogs", wp: 67, gw: 14, gp: 21 },
    { name: "Raymart Pangan", r: 621, team: "Gilas" },
    { name: "John McDermott", r: 617, team: "Marvin's Crew", wp: 63, gw: 22, gp: 35 },
    { name: "Arul Baskaran", r: 596, team: "Double Kiss", wp: 64, gw: 18, gp: 28 },
    { name: "Andrew Samarjia", r: 591, team: "Iron 4" },
    { name: "Alex Koussas", r: 590, team: "Cue The Good Times", wp: 29, gw: 2, gp: 7 },
    { name: "Tony Habib", r: 585, team: "Unbelief", wp: 48, gw: 20, gp: 42 },
    { name: "Saif Mirza", r: 581, team: "Nice Rack", wp: 57, gw: 12, gp: 21 },
    { name: "Dinesh Sookgreep", r: 576, team: "Iron 4", wp: 55, gw: 23, gp: 42 },
    { name: "Kah Weng Tan", r: 575, team: "Unbelief", wp: 50, gw: 7, gp: 14 },
    { name: "Mark Harper", r: 575, team: "Freeballers", wp: 75, gw: 21, gp: 28 },
    { name: "Kamal Melhem", r: 573, team: "Unbelief", wp: 64, gw: 27, gp: 42 },
    { name: "Dai Leota", r: 566, team: "Iron 4", wp: 62, gw: 26, gp: 42 },
    { name: "Phil Deschanel", r: 565, team: "Unbelief", wp: 54, gw: 15, gp: 28 },
    { name: "Graz Ferreri", r: 551, team: "Iron 4", wp: 52, gw: 22, gp: 42 },
    { name: "Stuart Rogers", r: 542, team: "Marvin's Crew", wp: 43, gw: 3, gp: 7 },
    { name: "Kate Harrison", r: 537, team: "Nice Rack", wp: 79, gw: 11, gp: 14 },
    { name: "Nasa Munkhnasan", r: 537, team: "Shooters", wp: 57, gw: 24, gp: 42 },
    { name: "Rob Carnell", r: 537, team: "Break & Enter", wp: 63, gw: 22, gp: 35 },
    { name: "Mark Rillera", r: 536, team: "Gilas", wp: 67, gw: 14, gp: 21 },
    { name: "Aldrin Aguilan", r: 535, team: "Gilas", wp: 54, gw: 15, gp: 28 },
    { name: "Alfie Compuesto", r: 532, team: "Gilas", wp: 61, gw: 17, gp: 28 },
    { name: "Jan Amiel Baste", r: 532, team: "Gilas", wp: 46, gw: 13, gp: 28 },
    { name: "Kevin Wang", r: 526, team: "Nice Rack", wp: 39, gw: 11, gp: 28 },
    { name: "Stephen Giddings", r: 522, team: "Shooters", wp: 54, gw: 19, gp: 35 },
    { name: "Angus Crump", r: 518, team: "Double Kiss", wp: 38, gw: 8, gp: 21 },
    { name: "Philip Campbell", r: 501, team: "Cue The Good Times", wp: 29, gw: 8, gp: 28 },
    { name: "Maghmud Sadien", r: 496, team: "Dragonball Z", wp: 46, gw: 16, gp: 35 },
    { name: "Wesley Valele", r: 490, team: "Cue The Good Times", wp: 38, gw: 8, gp: 21 },
    { name: "Oscar Kovacs", r: 485, team: "Double Kiss", wp: 32, gw: 9, gp: 28 },
    { name: "Sev Gharedaghi", r: 482, team: "Balls Deep", wp: 60, gw: 21, gp: 35 },
    { name: "Will Yuan", r: 476, team: "Extorting Dogs", wp: 46, gw: 13, gp: 28 },
    { name: "Gerard Crowe", r: 475, team: "Freeballers", wp: 38, gw: 8, gp: 21 },
    { name: "Shaun Matthews", r: 473, team: "Dragonball Z", wp: 52, gw: 11, gp: 21 },
    { name: "David Gardner", r: 468, team: "Marvin's Crew", wp: 40, gw: 17, gp: 42 },
    { name: "Michael Eskander", r: 468, team: "Nice Rack", wp: 21, gw: 3, gp: 14 },
    { name: "Josh Leary", r: 462, team: "Freeballers", wp: 31, gw: 13, gp: 42 },
    { name: "Liam Pratt", r: 454, team: "Extorting Dogs", wp: 43, gw: 3, gp: 7 },
    { name: "Steven Tien", r: 436, team: "Dragonball Z", wp: 29, gw: 8, gp: 28 },
    { name: "Joshua Mackintosh", r: 435, team: "Freeballers", wp: 29, gw: 10, gp: 35 },
    { name: "Mike Dogan", r: 434, team: "Cue The Good Times", wp: 48, gw: 10, gp: 21 },
    { name: "Tony Brooks", r: 433, team: "Double Kiss", wp: 36, gw: 5, gp: 14 },
    { name: "Hadi Cherri", r: 424, team: "Nice Rack", wp: 34, gw: 12, gp: 35 },
    { name: "Adam Wowk", r: 420, team: "Dragonball Z", wp: 19, gw: 4, gp: 21 },
    { name: "Liam Anderson", r: 413, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Rachel Lewis", r: 413, team: "Break & Enter", wp: 36, gw: 5, gp: 14 },
    { name: "Ned Pulido", r: 401, team: "Extorting Dogs", wp: 14, gw: 2, gp: 14 },
    { name: "Elliot Osborne", r: 399, team: "Balls Deep", wp: 38, gw: 8, gp: 21 },
    { name: "Nathan Wood", r: 386, team: "Break & Enter", wp: 39, gw: 11, gp: 28 },
    { name: "Kate Ridgeway", r: 359, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Gian Romeo", r: 329, team: "Balls Deep", wp: 18, gw: 5, gp: 28 },
    { name: "Kubilay Akin", r: 288, team: "Cue The Good Times", wp: 0, gw: 0, gp: 7 },
    { name: "Fenn Warth", r: 260, team: "Balls Deep", wp: 10, gw: 2, gp: 21 },

  ];

  const stats = {
    // Team record. matchFor/matchAgainst = match points (7 per night); the Wk 3
    // bye is credited 3-0 by the league, so it counts in both the record and the
    // match points, exactly as the official ladder has it.
    played: 6, won: 3, drawn: 0, lost: 3,
    matchFor: 19, matchAgainst: 19,
    gamesWon: 44, gamesPlayed: 105,  // sum across our players (incl. Liam Anderson's Wk 4 sub)
    br: 3, tr: 2,
    ladder: "11th of 13",
    ladderNote: "Take the ladder position with a pinch of salt. The league's public report ranks on match wins alone \u2014 it ignores losses and doesn't use league points. We're level at 19\u201319 and still sit below Freeballers on 19\u201325.",
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
