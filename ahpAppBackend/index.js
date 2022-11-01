import express from "express";

import { getParticipant, getParticipants, addParticipant } from "./db.js";
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/participants", async (req, res) => {
  const participants = await getParticipants();
  res.send(participants);
});

app.get("/participants/:id", async (req, res) => {
  const id = req.params.id;
  const participant = await getParticipant(id);
  res.status(201).send(participant);
});

app.post("/participants", async (req, res) => {
  const { firstName, lastName } = req.body;
  const participant = await addParticipant(firstName, lastName);
  res.send(participant);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http//localhost${PORT}`)
);
