const express = require('express');
const path = require('node:path');
const { parse } = require('../utils/json');
const { authorize } = require('../utils/auths');
const { addAScore } = require('../models/games');

const router = express.Router();
const jsonDbPath = path.join(__dirname, '/../data/questions.json');

router.get('/start', authorize, (req, res) => {
  const { level } = req.query;

  const questions = parse(jsonDbPath);

  console.log('questions:', questions);

  let filteredQuestions;
  if (level) {
    filteredQuestions = questions.filter((question) => question.level === level);
  } else {
  /** Si le paramètre de requête n’est pas indiqué,
  * on sélectionne des devinettes parmi tous les niveaux */
    filteredQuestions = questions;
  }
  console.log('filteredQuestions:', filteredQuestions);

  /** Si le level donné ne correspond pas à un level existant,
   * vous devez renvoyer le code d’erreur approprié */
  if (filteredQuestions.length === 0 && level) {
    return res.status(400).json({ error: 'Invalid level specified' });
  }

  const troisQuestions = listeTroisQuestions(filteredQuestions);

  return res.json(troisQuestions);
});

function listeTroisQuestions(array) {
  const troisQuestions = [];
  for (let i = 0; i < 3; i += 1) {
    const randomNumber = Math.floor(Math.random() * array.length);
    troisQuestions.push(array[randomNumber]);
  }
  return troisQuestions;
}

router.post('/', authorize, (req, res) => {
  const score = req?.body?.score;
  const username = req?.body?.username;

  if ((score < 0 || score > 3) || !username) return res.sendStatus(400);
  const date = Date.now();
  console.log(date.toString());

  addAScore(score, username, date);
  return res.sendStatus(200);
});

module.exports = router;
