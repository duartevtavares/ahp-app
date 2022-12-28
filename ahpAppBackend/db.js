import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "thesis",
  })
  .promise();

export async function getParticipants() {
  const [rows] = await pool.query("SELECT * FROM participants");
  return rows;
}

export async function getParticipant(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM participants
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function addParticipant(name) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      participants (name)
      VALUES (?)
      `,
    [name]
  );
  const id = result.insertId;
  // return getParticipant(id);
}

//Users

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
}

//Participants of a specific decision

export async function getDecisionParticipants(id) {
  const [rows] = await pool.query(
    `
     SELECT * 
    FROM decision_participant
    WHERE participants_id = ?
    `,
    [id]
  );
  return rows;
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

// const participant = await getParticipant(1);
// console.log("o participante pedido: ", participant);

// const result = await addParticipant("João Francisco Pereira");
// console.log(result);

// const participants = await getParticipants();
// console.log("todos os participantes: ", participants);

// const result = await addUser("Paula Fernandes Gonçalves", "pfg", "password");
// console.log(result);

const users = await getUsers();
const criteria = await getCriteria();

const decision = await getDecisions();
const decision1 = await getDecision(1);
const participantsDecision1 = await getDecisionParticipants(1);

console.log("todos os participantes: ", participantsDecision1);
console.log("todos os criterios: ", criteria);
console.log("todos os decisions: ", decision);
console.log("decision 1: ", decision1);
