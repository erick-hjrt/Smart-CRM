const SCORE_RULES = {
  emailOpened: 10,
  emailClicked: 20,
  seniorTitles: ["CEO", "Directeur"],
  seniorTitleBonus: 50,
  inactivityThresholdDays: 30,
  inactivityPenalty: -30,
};

const HOT_LEAD_THRESHOLD = 80;

const calculateScore = (data) => {
  let score = 0;

  if (data.emailOpened) score += SCORE_RULES.emailOpened;
  if (data.emailClicked) score += SCORE_RULES.emailClicked;
  if (SCORE_RULES.seniorTitles.includes(data.jobTitle))
    score += SCORE_RULES.seniorTitleBonus;
  if (data.lastActivityDays > SCORE_RULES.inactivityThresholdDays)
    score += SCORE_RULES.inactivityPenalty;

  return Math.max(0, score);
};

const getTag = (score) => (score > HOT_LEAD_THRESHOLD ? "HOT LEAD" : "NORMAL");

module.exports = { calculateScore, getTag };