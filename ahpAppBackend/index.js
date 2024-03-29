import express from "express";
import {
  AddSpecificDecisionFinalResults,
  AddSpecificParticipantDecisionFinalResults,
  addAlternative,
  addCategory,
  addDecision,
  addDecisionAlternative,
  addDecisionAlternativesCriterionValue,
  addDecisionCriteria,
  addDecisionParticipants,
  addSpecificParticipantDecisionAlternativesComparison,
  addSpecificParticipantDecisionCriteriaComparison,
  addUser,
  getAlternative,
  getAlternatives,
  getCategories,
  getCategoryCriteria,
  getCriteria,
  getCriterion,
  getDecision,
  getDecisionAlternatives,
  getDecisionAlternativesCriterionValue,
  getDecisionCriteria,
  getDecisionParticipantsByDecisionId,
  getDecisionParticipantsByUserId,
  getDecisions,
  getSpecificCategory,
  getSpecificDecisionAlternativesCriterionValue,
  getSpecificDecisionFinalResults,
  getSpecificParticipantDecisionAlternativesComparison,
  getSpecificParticipantDecisionCriteriaComparison,
  getSpecificParticipantDecisionFinalResults,
  getUser,
  getUsers,
  updateDecisionDone,
  updateDecisionParticipantsDone,
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

app.get("/criteria/:id", async (req, res) => {
  const id = req.params.id;
  const criteria = await getCriterion(id);
  res.status(201).send(criteria);
});

//Alternatives

app.get("/alternatives", async (req, res) => {
  const alternatives = await getAlternatives();
  res.send(alternatives);
});

app.get("/alternatives/:id", async (req, res) => {
  const id = req.params.id;
  const alternative = await getAlternative(id);
  res.status(201).send(alternative);
});

app.post("/alternatives", async (req, res) => {
  const name = req.body.name;
  const alternative = await addAlternative(name);
  res.status(201).send(alternative);
});

//Category

app.get("/category", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

app.get("/category/:id", async (req, res) => {
  const id = req.params.id;
  const category = await getSpecificCategory(id);
  res.status(201).send(category);
});

app.post("/category", async (req, res) => {
  const name = req.body.name;
  const category = await addCategory(name);
  res.status(201).send(category);
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
  const goal = req.body.goal;
  const category = req.body.category;
  const decision = await addDecision(goal, category);
  res.status(201).send(decision);
});

app.put("/decision", async (req, res) => {
  console.log(req.body.decisionId);
  const decisionId = req.body.decisionId;
  const decisionDone = await updateDecisionDone(decisionId);
  res.status(201).send(decisionDone);
});

//Participants of a specific decision

app.get("/decision_participants/participant/:id", async (req, res) => {
  const id = req.params.id;
  const decisionParticipants = await getDecisionParticipantsByUserId(id);
  res.status(201).send(decisionParticipants);
});
app.get("/decision_participants/decision/:id", async (req, res) => {
  const id = req.params.id;
  const decisionParticipants = await getDecisionParticipantsByDecisionId(id);
  res.status(201).send(decisionParticipants);
});

app.post("/decision_participants", async (req, res) => {
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

app.put("/decision_participants", async (req, res) => {
  const decisionId = req.body.decisionId;
  const participantsId = req.body.participantsId;
  const decisionParticipantsDone = await updateDecisionParticipantsDone(
    decisionId,
    participantsId
  );
  res.status(201).send(decisionParticipantsDone);
});

//Category and specific Criteria

app.get("/category_criteria/:id", async (req, res) => {
  const id = req.params.id;
  const categoryCriteria = await getCategoryCriteria(id);
  res.status(201).send(categoryCriteria);
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
  const decisionCriteria = await addDecisionCriteria(decisionId, criteriaId);
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
  const alternativeId = req.body.alternativeId;
  const decisionAlternative = await addDecisionAlternative(
    decisionId,
    alternativeId
  );
  res.status(201).send(decisionAlternative);
});

//Alternatives of a specific decision   TODO

app.get("/decision_alternatives_criterion_value", async (req, res) => {
  const decisionAlternativesCriterionValue =
    await getDecisionAlternativesCriterionValue();
  res.status(201).send(decisionAlternativesCriterionValue);
});

app.get("/decision_alternatives_criterion_value/:id", async (req, res) => {
  const id = req.params.id;
  const decisionSpecificAlternativesCriterionValue =
    await getSpecificDecisionAlternativesCriterionValue(id);
  res.status(201).send(decisionSpecificAlternativesCriterionValue);
});

app.post("/decision_alternatives_criterion_value", async (req, res) => {
  console.log(req.body);
  const decisionId = req.body.decisionId;
  const alternativeId = req.body.alternativeId;
  const criterionId = req.body.criterionId;
  const alternativeCriterionValue = req.body.alternativeCriterionValue;
  const decisionAlternativesCriterionValue =
    await addDecisionAlternativesCriterionValue(
      decisionId,
      alternativeId,
      criterionId,
      alternativeCriterionValue
    );
  res.status(201).send(decisionAlternativesCriterionValue);
});

//Criteria parwise comparisons of a specific decision from a specific participant

// app.get("/decision_criteria_pairwise", async (req, res) => {
//   const participantDecisionCriterionComparisons = await getDecisions();
//   res.send(participantDecisionCriterionComparisons);
// });

app.get("/decision_criteria_pairwise/:decisionId/:userId", async (req, res) => {
  const decisionId = req.params.decisionId;
  const userId = req.params.userId;
  const participantDecisionCriterionComparison =
    await getSpecificParticipantDecisionCriteriaComparison(decisionId, userId);
  res.status(201).send(participantDecisionCriterionComparison);
});

//post

app.post("/decision_criteria_pairwise", async (req, res) => {
  const decisionId = req.body.decisionId;
  const userId = req.body.userId;
  const criterion1Id = req.body.criterion1Id;
  const criterion2Id = req.body.criterion2Id;
  const pairwiseValue = req.body.pairwiseValue;
  const participantDecisionCriterionComparison =
    await addSpecificParticipantDecisionCriteriaComparison(
      decisionId,
      userId,
      criterion1Id,
      criterion2Id,
      pairwiseValue
    );
  res.status(201).send(participantDecisionCriterionComparison);
});

//Alternatives parwise comparisons of a specific decision from a specific participant

app.get(
  "/decision_alternatives_pairwise/:userId/:criterionId",
  async (req, res) => {
    const userId = req.params.userId;
    const criterionId = req.params.criterionId;
    const participantDecisionAlternativeComparison =
      await getSpecificParticipantDecisionAlternativesComparison(
        userId,
        criterionId
      );
    res.status(201).send(participantDecisionAlternativeComparison);
  }
);

//post

app.post("/decision_alternatives_pairwise", async (req, res) => {
  const decisionId = req.body.decisionId;
  const userId = req.body.userId;
  const criterionId = req.body.criterionId;
  const alternative1Id = req.body.alternative1Id;
  const alternative2Id = req.body.alternative2Id;
  const pairwiseValue = req.body.pairwiseValue;
  const participantDecisionAlternativeComparison =
    await addSpecificParticipantDecisionAlternativesComparison(
      decisionId,
      userId,
      criterionId,
      alternative1Id,
      alternative2Id,
      pairwiseValue
    );
  res.status(201).send(participantDecisionAlternativeComparison);
});

//////////////////////////////////////////////////////////////////////////////////////

//Final results of specific decision from a specific participant

app.get("/users_final_results/:decisionId/:userId", async (req, res) => {
  const decisionId = req.params.decisionId;
  const userId = req.params.userId;
  const participantDecisionFinalResult =
    await getSpecificParticipantDecisionFinalResults(decisionId, userId);
  res.status(201).send(participantDecisionFinalResult);
});

//post

app.post("/users_final_results", async (req, res) => {
  const decisionId = req.body.decisionId;
  const userId = req.body.userId;
  const alternativeId = req.body.alternativeId;
  const finalResult = req.body.finalResult;
  const participantDecisionFinalResult =
    await AddSpecificParticipantDecisionFinalResults(
      decisionId,
      userId,
      alternativeId,
      finalResult
    );
  res.status(201).send(participantDecisionFinalResult);
});

//////////////////////////////////////////////////////////////////////////////////////

//Final results of specific decision

app.get("/decision_final_results/:decisionId", async (req, res) => {
  const decisionId = req.params.decisionId;
  const participantDecisionFinalResult = await getSpecificDecisionFinalResults(
    decisionId
  );
  res.status(201).send(participantDecisionFinalResult);
});

//post

app.post("/decision_final_results", async (req, res) => {
  const decisionId = req.body.decisionId;
  const alternativeId = req.body.alternativeId;
  const finalResult = req.body.finalResult;
  const decisionFinalResult = await AddSpecificDecisionFinalResults(
    decisionId,
    alternativeId,
    finalResult
  );
  res.status(201).send(decisionFinalResult);
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
