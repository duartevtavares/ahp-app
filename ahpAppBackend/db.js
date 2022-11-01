import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "final_thesis",
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

export async function addParticipant(firstName, lastName) {
  const [result] = await pool.query(
    `
    INSERT INTO 
      participants (firstName, lastName)
      VALUES (?, ?)
      `,
    [firstName, lastName]
  );
  return result.insertId;
}

// const participant = await getParticipant(1);
// console.log("o participante pedido: ", participant);

// const result = await addParticipant("Diogo", "Teixeira");
// console.log(result);

// const participants = await getParticipants();
// console.log("todos os participantes: ", participants);
