const fetch = require("node-fetch");
const jsdom = require("jsdom");
const stringSimilarity = require("string-similarity");
const { JSDOM } = jsdom;

function playerName(dom, query) {
  const player = dom.window.document.getElementById(query);
  try {
    return player.querySelectorAll(".player-name")[0].textContent;
  } catch (exception) {
    return "Not found";
  }
}

async function scrapPlayerCapHit(fullName) {
  const formattedName = fullName
    .replace(/'+/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const url = `https://www.capfriendly.com/players/${formattedName}`;
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);

  const divs = dom.window.document.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].textContent.startsWith("Cap Hit:")) {
      let result = divs[i].textContent
        .split(": ")[1]
        .replace(/[^A-Z0-9]+/gi, "");
      return parseInt(result);
    }
  }
}

function findPlayerProfile(roster, name) {
  let result = { fullName: name }
  const literalMatch = roster.find(player => player.person.fullName === name);
  if (literalMatch) {
    result = {
      id: literalMatch.person.id,
      number: literalMatch.jerseyNumber,
      name: literalMatch.person.fullName,
    }
  } else {
    const bestMatch = stringSimilarity.findBestMatch(name, roster.map(player => player.person.fullName)); 
    console.log(name, bestMatch.bestMatch.target, bestMatch.bestMatch.rating);
    if (bestMatch.bestMatch.rating > 0.3) {
      const bestMatchPlayer = roster[bestMatch.bestMatchIndex];
      result = {
        id: bestMatchPlayer.person.id,
        number: bestMatchPlayer.jerseyNumber,
        name: bestMatchPlayer.person.fullName
      }
    }
  }
  return result
}

async function scrapLines(name, roster) {
  if (name == "Montréal Canadiens") {
    name = "montreal canadiens";
  }
  const formattedName = name
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const url = `https://www.dailyfaceoff.com/teams/${formattedName}/line-combinations/`;
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);

  const lines = [{} * 4];
  const ppLines = [{} * 2];
  const goalies = {
    starter: findPlayerProfile(roster,playerName(dom, "G1")),
    backup: findPlayerProfile(roster,playerName(dom, "G2")),
  };

  for (let i = 1; i < 5; i++) {
    lines[i - 1] = {
      leftDefender: i < 4 ? findPlayerProfile(roster,playerName(dom, `LD${i}`)) : undefined,
      rightDefender: i < 4 ? findPlayerProfile(roster,playerName(dom, `RD${i}`)) : undefined,
      leftWing: findPlayerProfile(roster,playerName(dom, `LW${i}`)),
      center: findPlayerProfile(roster,playerName(dom, `C${i}`)),
      rightWing: findPlayerProfile(roster,playerName(dom, `RW${i}`)),
    };
  }

  for (let j = 1; j < 3; j++) {
    ppLines[j - 1] = {
      leftDefender: findPlayerProfile(roster,playerName(dom, `PPLD${j}`)),
      rightDefender: findPlayerProfile(roster,playerName(dom, `PPRD${j}`)),
      leftWing: findPlayerProfile(roster,playerName(dom, `PPLW${j}`)),
      center: findPlayerProfile(roster,playerName(dom, `PPC${j}`)),
      rightWing: findPlayerProfile(roster,playerName(dom, `PPRW${j}`)),
    };
  }

  return { goalies, lines, ppLines };
}

module.exports = {
  scrapLines,
  scrapPlayerCapHit,
};
