import express from "express";
import {
  addDecision,
  addDecisionAlternative,
  addDecisionCriteria,
  addDecisionParticipants,
  addParticipant,
  addUser,
  getCriteria,
  getDecision,
  getDecisionAlternatives,
  getDecisionCriteria,
  getDecisionParticipants,
  getDecisions,
  getParticipant,
  getParticipants,
  getUser,
  getUsers,
} from "./db.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.text());

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
  res.send(participants);
});

app.get("/participants/:id", async (req, res) => {
  const id = req.params.id;
  const participant = await getParticipant(id);
  res.status(201).send(participant);
});

app.post("/participants", async (req, res) => {
  const name = req.body;
  const participant = await addParticipant(name);
  res.status(201).send(participant);
});

//User

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.status(201).send(user);
});

app.post("/users", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const user = await addUser(name, username, password);
  res.status(201).send(user);
});

//Criteria

app.get("/criteria", async (req, res) => {
  const criteria = await getCriteria();
  res.send(criteria);
});

//Decision

app.get("/decision", async (req, res) => {
  const decision = await getDecisions();
  res.send(decision);
});

app.get("/decision/:id", async (req, res) => {
  const id = req.params.id;
  const decision = await getDecision(id);
  res.status(201).send(decision);
});

app.post("/decision", async (req, res) => {
  const name = req.body.name;
  const goal = req.body.goal;
  const decision = await addDecision(name, goal);
  res.status(201).send(decision);
});

//Participants of a specific decision

app.get("/decision_participants/:id", async (req, res) => {
  const id = req.params.id;
  const decisionParticipants = await getDecisionParticipants(id);
  res.status(201).send(decisionParticipants);
});

app.post("/decision_participants", async (req, res) => {
  console.log(req.body);
  const decisionId = req.body.decisionId;
  const participantsId = req.body.participantsId;
  const participantWeight = req.body.participantWeight;
  const decisionParticipants = await addDecisionParticipants(
    decisionId,
    participantsId,
    participantWeight
  );
  res.status(201).send(decisionParticipants);
});

//Criteria of a specific decision

app.get("/decision_criteria/:id", async (req, res) => {
  const id = req.params.id;
  const decisionCriteria = await getDecisionCriteria(id);
  res.status(201).send(decisionCriteria);
});

app.post("/decision_criteria", async (req, res) => {
  console.log(req.body);
  const decisionId = req.body.decisionId;
  const criteriaId = req.body.criteriaId;
  const criterionValue = req.body.criterionValue;
  const decisionCriteria = await addDecisionCriteria(
    decisionId,
    criteriaId,
    criterionValue
  );
  res.status(201).send(decisionCriteria);
});

//Alternatives of a specific decision

app.get("/decision_alternatives/:id", async (req, res) => {
  const id = req.params.id;
  const decisionAlternatives = await getDecisionAlternatives(id);
  res.status(201).send(decisionAlternatives);
});

app.post("/decision_alternatives", async (req, res) => {
  console.log(req.body);
  const decisionId = req.body.decisionId;
  const alternativesId = req.body.alternativesId;
  const alternativeValue = req.body.alternativeValue;
  const decisionAlternative = await addDecisionAlternative(
    decisionId,
    alternativesId,
    alternativeValue
  );
  res.status(201).send(decisionAlternative);
});

/////////////////
////////////////////////////////////
///////////////////
/////////////////
/////////////////////////
//Needed

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http//localhost${PORT}`)
);
