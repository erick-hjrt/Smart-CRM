require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const { calculateScore, getTag } = require("./leadScore");

const app = express();
app.use(helmet()); 
app.use(express.json());

app.get("/test", (_req, res) => res.send("SmartCRM Backend is running"));

app.post("/api/lead_score", (req, res) => {
  const score = calculateScore(req.body);
  const tag = getTag(score);
  
  console.log(`Score calculé : ${score}, Tag: ${tag}`);

  res.json({ score, tag });
});

module.exports = app;