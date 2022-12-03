import express from "express";
import { getParticipant, getParticipants, addParticipant } from "./db.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.get("/participants", async (req, res) => {
  const participants = await getParticipants();
  console.log("participantes: ", participants.name);
  res.send(participants);
});

app.get("/participants/:id", async (req, res) => {
  const id = req.params.id;
  const participant = await getParticipant(id);
  res.status(201).send(participant);
});

app.post("/participants", async (req, res) => {
  const name = req.body;
  console.log("name: ", name);
  const participant = await addParticipant(name);
  res.status(201).send(participant);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http//localhost${PORT}`)
);
