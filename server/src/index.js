const app = require("./app");
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Démarrage de serveur sur le port : ${PORT}`);
});