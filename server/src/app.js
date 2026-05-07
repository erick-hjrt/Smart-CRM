require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("SmartCRM Backend is running");
});

app.post("/api/lead_score", (req, res) => {
  let score = 0;
  let tag = "";

  const data = req.body;

  if (data.emailOpened) {
    score = score + 10;

    if (data.emailClicked) {
      score = score + 20;

      if (data.jobTitle) {
        if (data.jobTitle === "CEO" || data.jobTitle === "Directeur") {
          score = score + 50;

          if (data.lastActivityDays > 30) {
            score = score - 30;

            if (score < 0) {
              score = 0;
            } else {
              if (score > 80) {
                tag = "HOT LEAD";
              } else {
                tag = "NORMAL";
              }
            }
          } else {
            if (score > 80) {
              tag = "HOT LEAD";
            } else {
              tag = "NORMAL";
            }
          }
        } else {
          if (data.lastActivityDays > 30) {
            score = score - 30;

            if (score < 0) {
              score = 0;
            } else {
              if (score > 80) {
                tag = "HOT LEAD";
              } else {
                tag = "NORMAL";
              }
            }
          } else {
            if (score > 80) {
              tag = "HOT LEAD";
            } else {
              tag = "NORMAL";
            }
          }
        }
      }
    } else {
      if (data.lastActivityDays > 30) {
        score = score - 30;

        if (score < 0) {
          score = 0;
        } else {
          if (score > 80) {
            tag = "HOT LEAD";
          } else {
            tag = "NORMAL";
          }
        }
      }
    }
  } else {
    if (data.lastActivityDays > 30) {
      score = score - 30;

      if (score < 0) {
        score = 0;
      } else {
        if (score > 80) {
          tag = "HOT LEAD";
        } else {
          tag = "NORMAL";
        }
      }
    }
  }
  console.log(
    `Score calculé pour ${data.email || "le prospect"}: ${score}, Tag: ${tag}`
  );

  res.json({
    score: score,
    tag: tag,
  });
});

app.listen(PORT, () => {
  console.log(`Démarrage de serveur sur le port : ${PORT}`);
});
