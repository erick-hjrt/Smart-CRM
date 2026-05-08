require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("SmartCRM Backend is running");
});

app.post("/api/lead_score", (req, res) => {
  const calculateScore = (data) => {
    let score = 0;
    if (data.emailOpened) score += 10;
    if (data.emailClicked) score += 20;
    if (data.jobTitle === "CEO" || data.jobTitle === "Directeur") score += 50;
    if (data.lastActivityDays > 30) score -= 30;
    return Math.max(0, score);
  };

  const getTag = (score) => {
    return score > 80 ? "HOT LEAD" : "NORMAL";
  };

  const score = calculateScore(req.body);
  const tag = getTag(score);

  console.log(
    `Score calculé pour ${
      req.body.email || "le prospect"
    }: ${score}, Tag: ${tag}`
  );

  res.json({
    score: score,
    tag: tag,
  });
});

module.exports = app;
