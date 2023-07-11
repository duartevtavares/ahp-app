import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "final_thesis",
  })
  .promise();

//Users;

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM users
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function addUser(name, username, password) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      users (name, username, password)
      VALUES (?, ?, ?)
      `,
    [name, username, password]
  );
  const id = result.insertId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Criteria

export async function getCriteria() {
  const [rows] = await pool.query("SELECT * FROM criteria");
  return rows;
}

export async function getCriterion(id) {
  const [rows] = await pool.query(
    `SELECT * FROM criteria WHERE id = ?
  `,
    [id]
  );
  return rows;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Alternatives

export async function getAlternatives() {
  const [rows] = await pool.query("SELECT * FROM alternatives");
  return rows;
}

export async function getAlternative(id) {
  const [rows] = await pool.query(
    `SELECT * FROM alternatives WHERE id = ?
  `,
    [id]
  );
  return rows;
}

export async function addAlternative(name) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      alternatives (name)
      VALUES (?)
      `,
    [name]
  );
  const id = result.insertId;
  return getAlternative(id);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Category

export async function getCategories() {
  const [rows] = await pool.query("SELECT * FROM category");
  return rows;
}

export async function getSpecificCategory(id) {
  const [rows] = await pool.query(
    `SELECT * FROM category WHERE id = ?
  `,
    [id]
  );
  return rows;
}

export async function addCategory(name) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      category (name)
      VALUES (?)
      `,
    [name]
  );
  const id = result.insertId;
  return getSpecificCategory(id);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Decision

export async function getDecision(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function getDecisions() {
  const [rows] = await pool.query("SELECT * FROM decision");
  return rows;
}

export async function addDecision(goal, category) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision (goal, category)
      VALUES (?, ?)
      `,
    [goal, category]
  );
  const id = result.insertId;
  return getDecision(id);
}

export async function updateDecisionDone(id) {
  const [result] = await pool.query(
    ` 
    UPDATE decision
      SET done = 1
      WHERE id = ?
      `,
    [id]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Participants of a specific decision

export async function getDecisionParticipantsByDecisionId(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_participant
    WHERE decision_id = ?
    `,
    [id]
  );
  return rows;
}

export async function getDecisionParticipantsByUserId(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_participant
    WHERE user_id = ?
    `,
    [id]
  );
  return rows;
}

//post
export async function addDecisionParticipants(
  decisionId,
  participantsId,
  participantWeight
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision_participant (decision_id, user_id, participant_weight)
      VALUES (?, ?, ?)
      `,
    [decisionId, participantsId, participantWeight]
  );
  return result;
}

//update
export async function updateDecisionParticipantsDone(
  decisionId,
  participantsId
) {
  const [result] = await pool.query(
    ` UPDATE decision_participant
      SET done = 1
      WHERE decision_id = ? AND user_id = ?;
      `,
    [decisionId, participantsId]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Category and specific Criteria

export async function getCategoryCriteria(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM category_criteria
    WHERE category_id = ?
    `,
    [id]
  );
  return rows;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Criteria of a specific decision

export async function getDecisionCriteria(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_criteria
    WHERE decision_id = ?
    `,
    [id]
  );
  return rows;
}

//post
export async function addDecisionCriteria(decisionId, criterionId) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision_criteria (decision_id, criterion_id)
      VALUES (?, ?)
      `,
    [decisionId, criterionId]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Alternatives of a specific decision

export async function getDecisionAlternatives(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_alternatives
    WHERE decision_id = ?
    `,
    [id]
  );
  return rows;
}

//post
export async function addDecisionAlternative(decisionId, alternativeId) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision_alternatives(decision_id, alternative_id)
      VALUES ( ?, ?)
      `,
    [decisionId, alternativeId]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Alternatives criterion value of a specific decision

export async function getDecisionAlternativesCriterionValue() {
  const [rows] = await pool.query(
    `
     SELECT *
    FROM decision_alternatives_criterion_values
    `
  );
  return rows;
}

export async function getSpecificDecisionAlternativesCriterionValue(id) {
  const [rows] = await pool.query(
    `
     SELECT *
    FROM decision_alternatives_criterion_values
    WHERE decision_id = ?
    `,
    [id]
  );
  return rows;
}

//post
export async function addDecisionAlternativesCriterionValue(
  decisionId,
  alternativeId,
  criterionId,
  alternativeCriterionValue
) {
  const [result] = await pool.query(
    `
    INSERT INTO
    decision_alternatives_criterion_values(decision_id, alternative_id, criterion_id, alternative_criterion_value)
      VALUES ( ?, ?, ?, ?)
      `,
    [decisionId, alternativeId, criterionId, alternativeCriterionValue]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Criteria parwise comparisons of a specific decision from a specific participant

export async function getSpecificParticipantDecisionCriteriaComparison(
  decisionId,
  userId
) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM criteria_comparisons
    WHERE decision_id = ? 
    AND user_id = ?
    `,
    [decisionId, userId]
  );
  return rows;
}

export async function addSpecificParticipantDecisionCriteriaComparison(
  decisionId,
  userId,
  criterion1Id,
  criterion2Id,
  pairwiseValue
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      criteria_comparisons (decision_id, user_id, criterion_1_id, criterion_2_id, pairwise_value)
      VALUES (?, ?, ?, ?, ?)
      `,
    [decisionId, userId, criterion1Id, criterion2Id, pairwiseValue]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Alternatives parwise comparisons of a specific decision from a specific participant

export async function getSpecificParticipantDecisionAlternativesComparison(
  userId,
  criterionId
) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM alternatives_comparisons
    WHERE user_id = ?
    AND criterion_id = ?
    `,
    [userId, criterionId]
  );
  return rows;
}

export async function addSpecificParticipantDecisionAlternativesComparison(
  decisionId,
  userId,
  criterionId,
  alternative1Id,
  alternative2Id,
  pairwiseValue
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      alternatives_comparisons (decision_id, user_id, criterion_id, alternative_1_id, alternative_2_id, pairwise_value)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    [
      decisionId,
      userId,
      criterionId,
      alternative1Id,
      alternative2Id,
      pairwiseValue,
    ]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Final results of a specific decision from a specific participant

export async function getSpecificParticipantDecisionFinalResults(
  decisionId,
  userId
) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM users_final_results
    WHERE decision_id = ? 
    AND user_id = ?
    `,
    [decisionId, userId]
  );
  return rows;
}

export async function AddSpecificParticipantDecisionFinalResults(
  decisionId,
  userId,
  alternativeId,
  finalResult
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
    users_final_results (decision_id, user_id, alternative_id, final_result)
      VALUES (?, ?, ?, ?)
      `,
    [decisionId, userId, alternativeId, finalResult]
  );
  return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Final results of a specific decision from a specific participant

export async function getSpecificDecisionFinalResults(decisionId) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_final_results
    WHERE decision_id = ?
    `,
    [decisionId]
  );
  return rows;
}

export async function AddSpecificDecisionFinalResults(
  decisionId,
  alternativeId,
  finalResult
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
    decision_final_results (decision_id, alternative_id, final_result)
      VALUES (?, ?, ?)
      `,
    [decisionId, alternativeId, finalResult]
  );
  return result;
}

// const result = await addUser("Joana Paiva Lima", "jpl", "password");
// console.log(result);

// const result = await updateDecisionParticipantsDone(1, 1);
// console.log(result);
// console.log(await getCriteria());
