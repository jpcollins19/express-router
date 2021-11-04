const { Client } = require(`pg`);
const client = new Client(
  process.env.DATABASE_URL || `postgress://localhost/acme_user_places_db`
);

const getUsers = async () => {
  return (await client.query(`select * from "User"`)).rows;
};

const getPlaces = async () => {
  return (await client.query(`select * from "Place"`)).rows;
};

const createUser = async ({ name }) => {
  return (
    await client.query(`insert into "User"(name) values ($1) returning *`, [
      name,
    ])
  ).rows[0];
};

const deleteUser = async (id) => {
  await client.query(`delete from "User" where id=$1`, [id]);
};

module.exports = {
  client,
  getUsers,
  getPlaces,
  createUser,
  deleteUser,
};
