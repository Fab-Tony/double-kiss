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
    { name: "Tony",  role: "Captain", r: 439, out: [4, 5],       leave: "Was away 10 & 17 Aug \u2014 back now", target: 6, finals: true,  played: 5, gp: 35, gw: 12 },
    { name: "Oscar", role: "Player",  r: 489, out: [12, 13, 14], leave: "Away all October",                target: 6, finals: true,  played: 7, gp: 49, gw: 20 },
    { name: "Kate",  role: "Player",  r: 371, out: [4, 5, 6, "F1", "F2"], leave: "Away for Finals (21\u201322 Nov)", target: 6, finals: false, finalsNote: "Away for Finals weekend (21\u201322 Nov)", played: 6, gp: 42, gw: 10 },
    { name: "Arul",  role: "Player",  r: 588, out: [4],          leave: "Was away first fortnight of Aug", target: 8, finals: true,  played: 9, gp: 63, gw: 38 },
    { name: "Angus", role: "Player",  r: 511, out: [],           leave: "Available all season",            target: 8, finals: true,  played: 8, gp: 56, gw: 18 },
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
      { name: "Sev Gharedaghi", r: 483, wp: 51, gw: 39, gp: 77 },
      { name: "Elliot Osborne", r: 410, wp: 40, gw: 25, gp: 63 },
      { name: "Gian Romeo", r: 339, wp: 24, gw: 12, gp: 49 },
      { name: "Fenn Warth", r: 279, wp: 19, gw: 12, gp: 63, c: true },
    ] },

    { name: "Break & Enter", captain: "Nathan Wood", players: [
      { name: "Greg Jenkins", r: 699, wp: 61, gw: 30, gp: 49 },
      { name: "Rob Carnell", r: 539, wp: 49, gw: 38, gp: 77 },
      { name: "Rachel Lewis", r: 427, wp: 45, gw: 19, gp: 42 },
      { name: "Nathan Wood", r: 390, wp: 34, gw: 24, gp: 70, c: true },
    ] },

    { name: "Cue The Good Times", captain: "Mike Dogan", players: [
      { name: "Joe Chao", r: 707, wp: 78, gw: 49, gp: 63 },
      { name: "Alex Koussas", r: 589, wp: 63, gw: 31, gp: 49 },
      { name: "Philip Campbell", r: 502, wp: 43, gw: 18, gp: 42 },
      { name: "Wesley Valele", r: 492, wp: 34, gw: 12, gp: 35 },
      { name: "Mike Dogan", r: 434, wp: 43, gw: 27, gp: 63, c: true },
      { name: "Kubilay Akin", r: 289, wp: 0, gw: 0, gp: 7 },
    ] },

    { name: "Double Kiss", captain: "Tony Brooks", us: true, players: [
      { name: "Arul Baskaran", r: 588, wp: 60, gw: 38, gp: 63 },
      { name: "Angus Crump", r: 511, wp: 32, gw: 18, gp: 56 },
      { name: "Oscar Kovacs", r: 489, wp: 41, gw: 20, gp: 49 },
      { name: "Liam Anderson", r: 445, wp: 29, gw: 2, gp: 7 },
      { name: "Tony Brooks", r: 439, wp: 34, gw: 12, gp: 35, c: true },
      { name: "Kate Ridgeway", r: 369, wp: 24, gw: 10, gp: 42 },
    ] },

    { name: "Dragonball Z", captain: "Adam Wowk", players: [
      { name: "John Bowkett", r: 719, wp: 76, gw: 32, gp: 42 },
      { name: "Maghmud Sadien", r: 501, wp: 55, gw: 31, gp: 56 },
      { name: "Shaun Matthews", r: 474, wp: 45, gw: 19, gp: 42 },
      { name: "Steven Tien", r: 430, wp: 45, gw: 25, gp: 56 },
      { name: "Adam Wowk", r: 420, wp: 25, gw: 14, gp: 56, c: true },
    ] },

    { name: "Extorting Dogs", captain: "Will Yuan", players: [
      { name: "Chris Dam", r: 682, wp: 62, gw: 26, gp: 42 },
      { name: "Adam Taylor", r: 628, wp: 67, gw: 33, gp: 49 },
      { name: "Sam Stacy", r: 627, wp: 57, gw: 32, gp: 56 },
      { name: "Will Yuan", r: 480, wp: 51, gw: 28, gp: 55, c: true },
      { name: "Liam Pratt", r: 453, wp: 40, gw: 17, gp: 42 },
      { name: "Ned Pulido", r: 401, wp: 18, gw: 5, gp: 28 },
    ] },

    { name: "Freeballers", captain: "Josh Leary", players: [
      { name: "Mark Harper", r: 555, wp: 54, gw: 38, gp: 70 },
      { name: "Josh Leary", r: 467, wp: 40, gw: 34, gp: 84, c: true },
      { name: "Gerard Crowe", r: 447, wp: 38, gw: 8, gp: 21 },
      { name: "Joshua Mackintosh", r: 420, wp: 29, gw: 22, gp: 77 },
    ] },

    { name: "Gilas", captain: "John Tan", players: [
      { name: "John Tan", r: 668, wp: 53, gw: 26, gp: 49, c: true },
      { name: "Raymart Pangan", r: 628 },
      { name: "Alfie Compuesto", r: 558, wp: 64, gw: 36, gp: 56 },
      { name: "Aldrin Aguilan", r: 546, wp: 57, gw: 28, gp: 49 },
      { name: "Jan Amiel Baste", r: 539, wp: 46, gw: 16, gp: 35 },
      { name: "Mark Rillera", r: 535, wp: 50, gw: 28, gp: 56 },
    ] },

    { name: "Iron 4", captain: "Graz Ferreri", players: [
      { name: "Andrew Samarjia", r: 600 },
      { name: "Dai Leota", r: 568, wp: 64, gw: 54, gp: 84 },
      { name: "Dinesh Sookgreep", r: 568, wp: 52, gw: 40, gp: 77 },
      { name: "Graz Ferreri", r: 556, wp: 57, gw: 44, gp: 77, c: true },
    ] },

    { name: "Marvin's Crew", captain: "Shaun Oglesby", players: [
      { name: "Shaun Oglesby", r: 668, wp: 67, gw: 56, gp: 84, c: true },
      { name: "Mitchell Tucker", r: 620, wp: 52, gw: 11, gp: 21 },
      { name: "John McDermott", r: 618, wp: 61, gw: 43, gp: 70 },
      { name: "Stuart Rogers", r: 545, wp: 57, gw: 8, gp: 14 },
      { name: "Sean McAllister", r: 469, wp: 29, gw: 2, gp: 7 },
      { name: "David Gardner", r: 469, wp: 35, gw: 22, gp: 63 },
    ] },

    { name: "Nice Rack", captain: "Hadi Cherri", players: [
      { name: "Saif Mirza", r: 586, wp: 67, gw: 28, gp: 42 },
      { name: "Kate Harrison", r: 545, wp: 66, gw: 23, gp: 35 },
      { name: "Kevin Wang", r: 512, wp: 50, gw: 35, gp: 70 },
      { name: "Michael Eskander", r: 470, wp: 36, gw: 15, gp: 42 },
      { name: "Hadi Cherri", r: 425, wp: 38, gw: 32, gp: 84, c: true },
    ] },

    { name: "Shooters", captain: "Adis Coralic", players: [
      { name: "Adis Coralic", r: 642, wp: 90, gw: 63, gp: 70, c: true },
      { name: "Omid Neshadi", r: 579, wp: 57, gw: 4, gp: 7 },
      { name: "Nasa Munkhnasan", r: 532, wp: 58, gw: 49, gp: 84 },
      { name: "Stephen Giddings", r: 498, wp: 46, gw: 32, gp: 70 },
    ] },

    { name: "Unbelief", captain: "Tony Habib / Kamal Melhem", players: [
      { name: "Tony Habib", r: 586, wp: 53, gw: 41, gp: 77, c: true },
      { name: "Kamal Melhem", r: 580, wp: 64, gw: 49, gp: 77, c: true },
      { name: "Kah Weng Tan", r: 577, wp: 51, gw: 21, gp: 41 },
      { name: "Phil Deschanel", r: 568, wp: 55, gw: 31, gp: 56 },
    ] },

  ];

  // Home-page news feed — newest first. Add items as things happen.
  const news = [
    { date: "21 Oct 2026", title: "Wk 13 result, and the race for the top 16", body: "Monday was a 2\u20136 loss at home to Marvin\u2019s Crew. Arul took 4 from 7, Angus 3 and Tony 1, so 8 games from 21. That puts us at 6\u20137 for the season. On the Grand Ladder (both nights, 29 teams) we\u2019re 23rd on 42 points. The top 16 go straight to the Vegas Showdown. Extorting Dogs are 16th on 47, five points ahead of us, with six other teams in between. A win is worth 5 points (6 with the marquee bonus) and a loss 1 or 2. With three rounds left, 16th place looks likely to finish somewhere around 57\u201360. To get there we need 15\u201318 points from the last three nights. That means winning all three (Nice Rack, Balls Deep and Dragonball Z), ideally with bonus points, and getting some help from the teams around us. On current form it\u2019s about a 1\u2011in\u201125 shot, but three straight wins would make it close to a coin flip. One win drops us out of the running for a direct spot. The rules also allow extra teams in through the Diamond League Playoffs, based on ladder position. Details are still to be confirmed. Next up: Wk 14, Mon 26 Oct, home vs Nice Rack on Table 8." },
    { date: "13 Oct 2026", title: "Roster rejig coming for the next few weeks", body: "Heads up \u2014 the lineups for the next few Mondays are being reshuffled. Keep an eye on the Roster page and Tony will confirm who\u2019s in each week." },
    { date: "13 Oct 2026", title: "Kate away for Finals", body: "Kate won\u2019t be with us for Finals weekend (Vegas Showdown, Sat 21 \u2013 Sun 22 Nov), so she\u2019s off the Finals list." },
    { date: "13 Oct 2026", title: "The t\u2011shirts have arrived!", body: "The team t\u2011shirts are here. Tony will sort getting them to everyone \u2014 grab yours from him." },
    { date: "13 Oct 2026", title: "Wk 12: 5\u20132 away at Gilas", body: "Back on the winners\u2019 list after the fortnight off. Tony and Arul both took 4 from 7 and Kate added 1 \u2014 9 games from 21 \u2014 for a 5\u20132 win at Gilas. That squares the season at 6\u20136 and 40\u201340 on match points. Tony\u2019s night lifts him to 39% for the season. Next up: Wk 13, Mon 19 Oct, home vs Marvin\u2019s Crew on Table 5." },
    { date: "29 Sep 2026", title: "Wk 11: 1\u20136 at home to Nice Rack", body: "A tough one at Club9. Oscar took 3 from 7 and Angus and Kate 2 each \u2014 7 games from 21 \u2014 against a Nice Rack side that had Kevin Wang (6) and Saif Mirza (5) in form. That ends the winning run and leaves us 5\u20136, 35\u201338 on match points. Oscar\u2019s up to 41% for the season. No match Mon 5 Oct. Next up: Wk 12, Mon 12 Oct, away vs Gilas on Table 7 \u2014 Tony, Kate and Arul in." },
    { date: "24 Sep 2026", title: "Wk 10: 6\u20131 away at Balls Deep \u2014 Arul goes 7 from 7", body: "Back\u2011to\u2011back wins. Arul had the night of the season \u2014 a perfect 7 from 7 \u2014 with Oscar adding 4 and Tony 2, for 13 games from 21 and a 6\u20131 finish. That squares us at 5\u20135 and puts us ahead on match points for the first time, 34\u201332. Arul is up to 61% and his Fargo jumped to 589; Oscar\u2019s climbed to 40%. Next up: Wk 11, Mon 28 Sep, home vs Nice Rack on Table 2 \u2014 Oscar, Angus and Kate in." },
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
  const FARGO_ASOF = "21 Oct 2026";
  const FARGO_SOURCES = {
    divisionId: "aa6347f2-a437-4bd5-b84d-b48a0186a411",
    teamId:     "f74f1874-1ccf-41bb-85b1-b48a0186a4e9",
  };

  // Every player in DLS28 Monday, ranked by live FargoRate. Synced from the
  // FargoRate LMS public reports (see FARGO_SOURCES). wp/gw/gp = win %, games won,
  // games played this season; absent means they haven't played yet.
  const divisionPlayers = [

    { name: "John Bowkett", r: 719, team: "Dragonball Z", wp: 76, gw: 32, gp: 42 },
    { name: "Joe Chao", r: 707, team: "Cue The Good Times", wp: 78, gw: 49, gp: 63 },
    { name: "Greg Jenkins", r: 699, team: "Break & Enter", wp: 61, gw: 30, gp: 49 },
    { name: "Chris Dam", r: 682, team: "Extorting Dogs", wp: 62, gw: 26, gp: 42 },
    { name: "John Tan", r: 668, team: "Gilas", wp: 53, gw: 26, gp: 49 },
    { name: "Shaun Oglesby", r: 668, team: "Marvin's Crew", wp: 67, gw: 56, gp: 84 },
    { name: "Adis Coralic", r: 642, team: "Shooters", wp: 90, gw: 63, gp: 70 },
    { name: "Adam Taylor", r: 628, team: "Extorting Dogs", wp: 67, gw: 33, gp: 49 },
    { name: "Raymart Pangan", r: 628, team: "Gilas" },
    { name: "Sam Stacy", r: 627, team: "Extorting Dogs", wp: 57, gw: 32, gp: 56 },
    { name: "Mitchell Tucker", r: 620, team: "Marvin's Crew", wp: 52, gw: 11, gp: 21 },
    { name: "John McDermott", r: 618, team: "Marvin's Crew", wp: 61, gw: 43, gp: 70 },
    { name: "Andrew Samarjia", r: 600, team: "Iron 4" },
    { name: "Alex Koussas", r: 589, team: "Cue The Good Times", wp: 63, gw: 31, gp: 49 },
    { name: "Arul Baskaran", r: 588, team: "Double Kiss", wp: 60, gw: 38, gp: 63 },
    { name: "Saif Mirza", r: 586, team: "Nice Rack", wp: 67, gw: 28, gp: 42 },
    { name: "Tony Habib", r: 586, team: "Unbelief", wp: 53, gw: 41, gp: 77 },
    { name: "Kamal Melhem", r: 580, team: "Unbelief", wp: 64, gw: 49, gp: 77 },
    { name: "Omid Neshadi", r: 579, team: "Shooters", wp: 57, gw: 4, gp: 7 },
    { name: "Kah Weng Tan", r: 577, team: "Unbelief", wp: 51, gw: 21, gp: 41 },
    { name: "Dai Leota", r: 568, team: "Iron 4", wp: 64, gw: 54, gp: 84 },
    { name: "Dinesh Sookgreep", r: 568, team: "Iron 4", wp: 52, gw: 40, gp: 77 },
    { name: "Phil Deschanel", r: 568, team: "Unbelief", wp: 55, gw: 31, gp: 56 },
    { name: "Alfie Compuesto", r: 558, team: "Gilas", wp: 64, gw: 36, gp: 56 },
    { name: "Graz Ferreri", r: 556, team: "Iron 4", wp: 57, gw: 44, gp: 77 },
    { name: "Mark Harper", r: 555, team: "Freeballers", wp: 54, gw: 38, gp: 70 },
    { name: "Aldrin Aguilan", r: 546, team: "Gilas", wp: 57, gw: 28, gp: 49 },
    { name: "Stuart Rogers", r: 545, team: "Marvin's Crew", wp: 57, gw: 8, gp: 14 },
    { name: "Kate Harrison", r: 545, team: "Nice Rack", wp: 66, gw: 23, gp: 35 },
    { name: "Jan Amiel Baste", r: 539, team: "Gilas", wp: 46, gw: 16, gp: 35 },
    { name: "Rob Carnell", r: 539, team: "Break & Enter", wp: 49, gw: 38, gp: 77 },
    { name: "Mark Rillera", r: 535, team: "Gilas", wp: 50, gw: 28, gp: 56 },
    { name: "Nasa Munkhnasan", r: 532, team: "Shooters", wp: 58, gw: 49, gp: 84 },
    { name: "Kevin Wang", r: 512, team: "Nice Rack", wp: 50, gw: 35, gp: 70 },
    { name: "Angus Crump", r: 511, team: "Double Kiss", wp: 32, gw: 18, gp: 56 },
    { name: "Philip Campbell", r: 502, team: "Cue The Good Times", wp: 43, gw: 18, gp: 42 },
    { name: "Maghmud Sadien", r: 501, team: "Dragonball Z", wp: 55, gw: 31, gp: 56 },
    { name: "Stephen Giddings", r: 498, team: "Shooters", wp: 46, gw: 32, gp: 70 },
    { name: "Wesley Valele", r: 492, team: "Cue The Good Times", wp: 34, gw: 12, gp: 35 },
    { name: "Oscar Kovacs", r: 489, team: "Double Kiss", wp: 41, gw: 20, gp: 49 },
    { name: "Sev Gharedaghi", r: 483, team: "Balls Deep", wp: 51, gw: 39, gp: 77 },
    { name: "Will Yuan", r: 480, team: "Extorting Dogs", wp: 51, gw: 28, gp: 55 },
    { name: "Shaun Matthews", r: 474, team: "Dragonball Z", wp: 45, gw: 19, gp: 42 },
    { name: "Michael Eskander", r: 470, team: "Nice Rack", wp: 36, gw: 15, gp: 42 },
    { name: "Sean McAllister", r: 469, team: "Marvin's Crew", wp: 29, gw: 2, gp: 7 },
    { name: "David Gardner", r: 469, team: "Marvin's Crew", wp: 35, gw: 22, gp: 63 },
    { name: "Josh Leary", r: 467, team: "Freeballers", wp: 40, gw: 34, gp: 84 },
    { name: "Liam Pratt", r: 453, team: "Extorting Dogs", wp: 40, gw: 17, gp: 42 },
    { name: "Gerard Crowe", r: 447, team: "Freeballers", wp: 38, gw: 8, gp: 21 },
    { name: "Liam Anderson", r: 445, team: "Double Kiss", wp: 29, gw: 2, gp: 7 },
    { name: "Tony Brooks", r: 439, team: "Double Kiss", wp: 34, gw: 12, gp: 35 },
    { name: "Mike Dogan", r: 434, team: "Cue The Good Times", wp: 43, gw: 27, gp: 63 },
    { name: "Steven Tien", r: 430, team: "Dragonball Z", wp: 45, gw: 25, gp: 56 },
    { name: "Rachel Lewis", r: 427, team: "Break & Enter", wp: 45, gw: 19, gp: 42 },
    { name: "Hadi Cherri", r: 425, team: "Nice Rack", wp: 38, gw: 32, gp: 84 },
    { name: "Joshua Mackintosh", r: 420, team: "Freeballers", wp: 29, gw: 22, gp: 77 },
    { name: "Adam Wowk", r: 420, team: "Dragonball Z", wp: 25, gw: 14, gp: 56 },
    { name: "Elliot Osborne", r: 410, team: "Balls Deep", wp: 40, gw: 25, gp: 63 },
    { name: "Ned Pulido", r: 401, team: "Extorting Dogs", wp: 18, gw: 5, gp: 28 },
    { name: "Nathan Wood", r: 390, team: "Break & Enter", wp: 34, gw: 24, gp: 70 },
    { name: "Kate Ridgeway", r: 369, team: "Double Kiss", wp: 24, gw: 10, gp: 42 },
    { name: "Gian Romeo", r: 339, team: "Balls Deep", wp: 24, gw: 12, gp: 49 },
    { name: "Kubilay Akin", r: 289, team: "Cue The Good Times", wp: 0, gw: 0, gp: 7 },
    { name: "Fenn Warth", r: 279, team: "Balls Deep", wp: 19, gw: 12, gp: 63 },

  ];

  // Player cards — week-by-week games for OUR squad and NEXT WEEK'S OPPONENT only.
  // From the FargoRate LMS team report (DivisionTeamReportBCAPL?teamId=...). Each
  // player plays 7 games a night, so w = games won and losses = 7 - w. A week
  // missing from a player's map = didn't play. Team rows: op/ha/mf/ma = opponent,
  // Home/Away/Bye, match points for/against. Swap the opponent block each weekly sync.
  const GAMES_PER_NIGHT = 7;
  const playerCards = {
    "Double Kiss": {
      teamId: "f74f1874-1ccf-41bb-85b1-b48a0186a4e9",
      weeks: [
        { wk: 1,  op: "Extorting Dogs",     ha: "Away", mf: 2, ma: 5 },
        { wk: 2,  op: "Shooters",           ha: "Away", mf: 5, ma: 2 },
        { wk: 3,  op: "BYE",                ha: "Bye",  mf: 3, ma: 0 },
        { wk: 4,  op: "Dragonball Z",       ha: "Home", mf: 1, ma: 6 },
        { wk: 5,  op: "Break & Enter",      ha: "Away", mf: 2, ma: 5 },
        { wk: 6,  op: "Freeballers",        ha: "Home", mf: 6, ma: 1 },
        { wk: 7,  op: "Unbelief",           ha: "Home", mf: 2, ma: 5 },
        { wk: 8,  op: "Iron 4",             ha: "Home", mf: 2, ma: 5 },
        { wk: 9,  op: "Cue The Good Times", ha: "Away", mf: 5, ma: 2 },
        { wk: 10, op: "Balls Deep",         ha: "Away", mf: 6, ma: 1 },
        { wk: 11, op: "Nice Rack",          ha: "Home", mf: 1, ma: 6 },
        { wk: 12, op: "Gilas",              ha: "Away", mf: 5, ma: 2 },
        { wk: 13, op: "Marvin's Crew",      ha: "Home", mf: 2, ma: 6 },
      ],
      players: {
        "Arul Baskaran": { br: 3, tr: 3, w: { 1: 3, 2: 5, 5: 5, 6: 5, 7: 2, 8: 3, 10: 7, 12: 4, 13: 4 } },
        "Angus Crump":   { br: 1, tr: 1, w: { 1: 3, 4: 1, 5: 4, 7: 2, 8: 1, 9: 2, 11: 2, 13: 3 } },
        "Oscar Kovacs":  { br: 3, tr: 0, w: { 1: 2, 4: 0, 5: 3, 6: 4, 9: 4, 10: 4, 11: 3 } },
        "Tony Brooks":   { br: 0, tr: 0, w: { 2: 1, 6: 4, 10: 2, 12: 4, 13: 1 } },
        "Kate Ridgeway": { br: 0, tr: 0, w: { 2: 2, 7: 2, 8: 1, 9: 2, 11: 2, 12: 1 } },
        "Liam Anderson": { br: 0, tr: 0, w: { 4: 2 } },
      },
    },
    // Next opponent: Wk 14, Mon 26 Oct \u2014 Nice Rack (home, Table 8).
    // Stuart Rogers subbed in at Wk 12 (registered Marvin's Crew). Kate Harrison is
    // registered here but has subbed for Break & Enter, Marvin's Crew and Iron 4.
    "Nice Rack": {
      teamId: "cd89bc95-d169-4061-8f45-b48a0186a50f",
      next: 14,
      weeks: [
        { wk: 1,  op: "Unbelief",           ha: "Away", mf: 6, ma: 2 },
        { wk: 2,  op: "Gilas",              ha: "Away", mf: 3, ma: 5 },
        { wk: 3,  op: "Marvin's Crew",      ha: "Home", mf: 1, ma: 6 },
        { wk: 4,  op: "BYE",                ha: "Bye",  mf: 3, ma: 0 },
        { wk: 5,  op: "Shooters",           ha: "Home", mf: 5, ma: 2 },
        { wk: 6,  op: "Cue The Good Times", ha: "Away", mf: 6, ma: 1 },
        { wk: 7,  op: "Balls Deep",         ha: "Home", mf: 3, ma: 5 },
        { wk: 8,  op: "Break & Enter",      ha: "Away", mf: 2, ma: 5 },
        { wk: 9,  op: "Extorting Dogs",     ha: "Home", mf: 5, ma: 2 },
        { wk: 10, op: "Dragonball Z",       ha: "Away", mf: 1, ma: 6 },
        { wk: 11, op: "Double Kiss",        ha: "Away", mf: 6, ma: 1 },
        { wk: 12, op: "Freeballers",        ha: "Home", mf: 6, ma: 1 },
        { wk: 13, op: "Iron 4",             ha: "Home", mf: 6, ma: 1 },
      ],
      players: {
        "Saif Mirza":       { br: 4, tr: 1, w: { 1: 3, 2: 3, 6: 6, 8: 6, 11: 5, 13: 5 } },
        "Kevin Wang":       { br: 1, tr: 1, w: { 2: 2, 3: 3, 5: 3, 6: 3, 7: 5, 8: 4, 9: 2, 10: 4, 11: 6, 12: 3 } },
        "Hadi Cherri":      { br: 0, tr: 1, w: { 1: 2, 2: 2, 3: 1, 5: 4, 6: 3, 7: 4, 8: 2, 9: 3, 10: 2, 11: 3, 12: 4, 13: 2 } },
        "Michael Eskander": { br: 0, tr: 0, w: { 3: 1, 5: 2, 7: 5, 9: 3, 10: 0, 13: 4 } },
        "Kate Harrison":    { br: 0, tr: 0, w: { 1: 5 } },
        "Stuart Rogers":    { br: 0, tr: 0, w: { 12: 5 } },
      },
    },
  };

  // Resolve a name (full, or a roster first name like "Tony") to its card, or null.
  function card(name) {
    let team = null, full = null;
    for (const t in playerCards) {
      const ps = playerCards[t].players;
      if (ps[name]) { team = t; full = name; break; }
      const hit = Object.keys(ps).find(n => n.split(" ")[0] === name);
      if (hit && !full && t === TEAM) { team = t; full = hit; }
    }
    if (!full) return null;
    const pc = playerCards[team], p = pc.players[full];
    const dp = divisionPlayers.find(x => x.name === full) || {};
    const weeks = pc.weeks.filter(w => p.w[w.wk] != null).map(w => ({
      wk: w.wk, op: w.op, ha: w.ha, date: (fixtures.find(f => f.wk === w.wk) || {}).date || "",
      w: p.w[w.wk], l: GAMES_PER_NIGHT - p.w[w.wk],
      team: w.mf > w.ma ? "W" : w.mf < w.ma ? "L" : "D", score: w.mf + "\u2013" + w.ma,
    }));
    const gw = weeks.reduce((a, x) => a + x.w, 0), gp = weeks.length * GAMES_PER_NIGHT;
    return { name: full, team, us: team === TEAM, next: pc.next || null, r: dp.r || null,
             br: p.br, tr: p.tr, weeks, gw, gp,
             allGw: dp.gw, allGp: dp.gp };   // allGw/allGp include games subbed for other teams
  }

  const stats = {
    // Team record. matchFor/matchAgainst = match points (7 per night); the Wk 3
    // bye is credited 3-0 by the league, so it counts in both the record and the
    // match points, exactly as the official ladder has it.
    played: 13, won: 6, drawn: 0, lost: 7,
    matchFor: 42, matchAgainst: 46,
    gamesWon: 100, gamesPlayed: 252,  // sum across our players (incl. Liam Anderson's Wk 4 sub)
    br: 7, tr: 4,
    ladder: "23rd of 29 (Grand Ladder, Wk 13)",
    ladderNote: "This is the Grand Ladder \u2014 both nights combined, ranked on ladder points (win 5, +1 marquee bonus; loss 1, or 2 if leading at the post). The top 16 qualify directly for the Vegas Showdown. It comes from the league, not the FargoRate report, so it updates when the league publishes it.",
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
      { wk: 10, op: "Balls Deep",   ha: "Away", result: "W", score: "6\u20131" },
      { wk: 11, op: "Nice Rack",    ha: "Home", result: "L", score: "1\u20136" },
      { wk: 12, op: "Gilas",        ha: "Away", result: "W", score: "5\u20132" },
      { wk: 13, op: "Marvin's Crew", ha: "Home", result: "L", score: "2\u20136" },
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

  return { TEAM, SEASON, LEAGUE, VENUE, PLAYERS_PER_NIGHT, roster, fixtures, teams, divisionPlayers, FARGO_ASOF, FARGO_SOURCES, tableAlloc, news, stats, playerCards, GAMES_PER_NIGHT, card,
           fixture, isMatch, matchesAvailable, scheduledGames, availability, nextIndex, nextMatchIndex, tablesFor };
})();
