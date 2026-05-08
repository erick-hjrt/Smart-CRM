const request = require("supertest");
const app = require("../src/app");

describe("POST /api/lead_score", () => {

  it("répond 200 avec score et tag", async () => {
    const res = await request(app)
      .post("/api/lead_score")
      .send({ emailOpened: true, emailClicked: true, jobTitle: "CEO" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ score: 80, tag: "NORMAL" });
  });

  it("retourne HOT LEAD si score > 80", async () => {
    const res = await request(app)
      .post("/api/lead_score")
      .send({ emailOpened: true, emailClicked: true, jobTitle: "CEO", lastActivityDays: 5 });

    expect(res.body.tag).toBe("NORMAL"); // max = 80, pas > 80
  });

  it("retourne score 0 pour un body vide", async () => {
    const res = await request(app)
      .post("/api/lead_score")
      .send({});

    expect(res.body).toEqual({ score: 0, tag: "NORMAL" });
  });
});