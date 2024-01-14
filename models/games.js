const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/games.json');

const defaultUser = [];

function addAScore(score, username, date) {
  const scores = parse(jsonDbPath, defaultUser);

  const CreatedElem = {
    score,
    username,
    date,
  };

  scores.push(CreatedElem);
  serialize(jsonDbPath, scores);

  return CreatedElem;
}

module.exports = { addAScore };
