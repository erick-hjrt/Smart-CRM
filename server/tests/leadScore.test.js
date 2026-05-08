const { calculateScore, getTag } = require("../src/leadScore");

describe("calculateScore", () => {

  it("retourne 0 si aucune interaction", () => {
    expect(calculateScore({})).toBe(0);
  });

  it("ajoute 10 si email ouvert", () => {
    expect(calculateScore({ emailOpened: true })).toBe(10);
  });

  it("ajoute 20 si email cliqué", () => {
    expect(calculateScore({ emailClicked: true })).toBe(20);
  });

  it("ajoute 50 pour un titre CEO", () => {
    expect(calculateScore({ jobTitle: "CEO" })).toBe(50);
  });

  it("ajoute 50 pour un titre Directeur", () => {
    expect(calculateScore({ jobTitle: "Directeur" })).toBe(50);
  });

  it("ne bonus pas un titre inconnu", () => {
    expect(calculateScore({ jobTitle: "Stagiaire" })).toBe(0);
  });

  it("retire 30 si inactif depuis + de 30 jours", () => {
    expect(calculateScore({ lastActivityDays: 31 })).toBe(0); // Math.max(0, -30)
  });

  it("ne pénalise pas à exactement 30 jours", () => {
    expect(calculateScore({ lastActivityDays: 30 })).toBe(0);
  });

  it("cumule tous les bonus : score max", () => {
    expect(calculateScore({
      emailOpened: true,
      emailClicked: true,
      jobTitle: "CEO",
      lastActivityDays: 5,
    })).toBe(80); // 10+20+50
  });

  it("ne descend jamais sous 0", () => {
    expect(calculateScore({ lastActivityDays: 99 })).toBe(0);
  });
});

describe("getTag", () => {

  it("retourne HOT LEAD si score > 80", () => {
    expect(getTag(81)).toBe("HOT LEAD");
  });

  it("retourne NORMAL si score = 80", () => {
    expect(getTag(80)).toBe("NORMAL");
  });

  it("retourne NORMAL si score < 80", () => {
    expect(getTag(30)).toBe("NORMAL");
  });
});