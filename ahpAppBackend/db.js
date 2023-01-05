import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "finalthesis",
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

export async function addDecision(name, goal) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision (name, goal)
      VALUES (?, ?)
      `,
    [name, goal]
  );
  const id = result.insertId;
  console.log(id);
  return getDecision(id);
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
export async function addDecisionCriteria(decisionId, criteriaId) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision_criteria (decision_id, criteria_id)
      VALUES (?, ?)
      `,
    [decisionId, criteriaId]
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
export async function addDecisionAlternative(
  decisionId,
  alternativesId,
  alternativeValue
) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      decision_participant (decision_id, alternatives_id, alternative_value)
      VALUES (?, ?, ?)
      `,
    [decisionId, alternativesId, alternativeValue]
  );
  return result;
}

// const result = await addUser("Ricardo Paiva Gorjão", "rpg", "password");
// console.log(result);

console.log(await getCriteria());
