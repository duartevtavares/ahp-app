import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "newnew",
  })
  .promise();

// export async function getParticipants() {
//   const [rows] = await pool.query("SELECT * FROM participants");
//   return rows;
// }

// export async function getParticipant(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM participants
//     WHERE id = ?
//     `,
//     [id]
//   );
//   return rows[0];
// }

// export async function addParticipant(name) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       participants (name)
//       VALUES (?)
//       `,
//     [name]
//   );
//   const id = result.insertId;
//   // return getParticipant(id);
// }

// //Users

// export async function getUsers() {
//   const [rows] = await pool.query("SELECT * FROM users");
//   return rows;
// }

// export async function getUser(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM users
//     WHERE id = ?
//     `,
//     [id]
//   );
//   return rows[0];
// }

// export async function addUser(name, username, password) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       users (name, username, password)
//       VALUES (?, ?, ?)
//       `,
//     [name, username, password]
//   );
//   const id = result.insertId;
// }

// //Criteria

// export async function getCriteria() {
//   const [rows] = await pool.query("SELECT * FROM criteria");
//   return rows;
// }

// //Decision

// export async function getDecision(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM decision
//     WHERE id = ?
//     `,
//     [id]
//   );
//   return rows[0];
// }

// export async function getDecisions() {
//   const [rows] = await pool.query("SELECT * FROM decision");
//   return rows;
// }

// export async function addDecision(name, goal) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       decision (name, goal)
//       VALUES (?, ?)
//       `,
//     [name, goal]
//   );
//   const id = result.insertId;
//   console.log(id);
//   return getDecision(id);
// }

// //Participants of a specific decision

// export async function getDecisionParticipants(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM decision_participant
//     WHERE participants_id = ?
//     `,
//     [id]
//   );
//   return rows;
// }

// //post
// export async function addDecisionParticipants(
//   decisionId,
//   participantsId,
//   participantWeight
// ) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       decision_participant (decision_id, participants_id, participant_weight)
//       VALUES (?, ?, ?)
//       `,
//     [decisionId, participantsId, participantWeight]
//   );
//   return result;
// }

// //Criteria of a specific decision

// export async function getDecisionCriteria(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM decision_criteria
//     WHERE decision_id = ?
//     `,
//     [id]
//   );
//   return rows;
// }

// //post
// export async function addDecisionCriteria(
//   decisionId,
//   criteriaId,
//   criterionvalue
// ) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       decision_participant (decision_id, criteria_id, criterion_value)
//       VALUES (?, ?, ?)
//       `,
//     [decisionId, criteriaId, criterionvalue]
//   );
//   return result;
// }

// //Alternatives of a specific decision

// export async function getDecisionAlternatives(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM decision_alternatives
//     WHERE decision_id = ?
//     `,
//     [id]
//   );
//   return rows;
// }

// //post
// export async function addDecisionAlternative(
//   decisionId,
//   alternativesId,
//   alternativeValue
// ) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       decision_participant (decision_id, alternatives_id, alternative_value)
//       VALUES (?, ?, ?)
//       `,
//     [decisionId, alternativesId, alternativeValue]
//   );
//   return result;
// }

// const participant = await getParticipant(1);
// console.log("o participante pedido: ", participant);

// const result = await addParticipant("João Francisco Pereira");
// console.log(result);

// const participants = await getParticipants();
// console.log("todos os participantes: ", participants);

// const result = await addUser("Paula Fernandes Gonçalves", "pfg", "password");
// console.log(result);

// const users = await getUsers();
// const criteria = await getCriteria();

// const decision = await getDecisions();
// // const decision1 = await addDecision("name", "goal");
// const participantsDecision1 = await getDecisionParticipants(1);

// //const participantsDecision2 = await addDecisionParticipants(1, 4, 20);

// console.log("todos os criterios: ", criteria);
// console.log("todos os decisions: ", decision);

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

// //Participants

// export async function getParticipants() {
//   const [rows] = await pool.query("SELECT * FROM participants");
//   return rows;
// }

// export async function getParticipant(id) {
//   const [rows] = await pool.query(
//     `
//      SELECT *
//     FROM participants
//     WHERE id = ?
//     `,
//     [id]
//   );
//   return rows[0];
// }

// export async function addParticipant(name) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO
//       participants (name)
//       VALUES (?)
//       `,
//     [name]
//   );
//   const id = result.insertId;
//   // return getParticipant(id);
// }

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

// const result = await addUser("Joana Paiva Lima", "jpl", "password");
// console.log(result);

// const result = await updateDecisionParticipantsDone(1, 1);
// console.log(result);
// console.log(await getCriteria());
