const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function playerName(dom, query) {
  const player = dom.window.document.getElementById(query);
  return player.querySelectorAll(".player-name")[0].textContent;
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

async function scrapLines(name) {
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
    starter: playerName(dom, "G1"),
    backup: playerName(dom, "G2"),
  };

  for (let i = 1; i < 5; i++) {
    lines[i - 1] = {
      leftDefender: i < 4 ? playerName(dom, `LD${i}`) : undefined,
      rightDefender: i < 4 ? playerName(dom, `RD${i}`) : undefined,
      leftWing: playerName(dom, `LW${i}`),
      center: playerName(dom, `C${i}`),
      rightWing: playerName(dom, `RW${i}`),
    };
  }

  for (let j = 1; j < 3; j++) {
    ppLines[j - 1] = {
      leftDefender: playerName(dom, `PPLD${j}`),
      rightDefender: playerName(dom, `PPRD${j}`),
      leftWing: playerName(dom, `PPLW${j}`),
      center: playerName(dom, `PPC${j}`),
      rightWing: playerName(dom, `PPRW${j}`),
    };
  }

  return { goalies, lines, ppLines };
}

module.exports = {
  scrapLines,
  scrapPlayerCapHit,
};
