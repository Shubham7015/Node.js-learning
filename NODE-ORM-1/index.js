 require('dotenv/config')
const db = require("./db");
const { usersTable } = require("./drizzle/schema");


async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log(`Users in Postgress are:`, users);
  return users;
}
getAllUsers();

async function createUser({ id, name, email }) {
    await db.insert(usersTable).values({
        id,
        name,
        email
    })
}
// createUser({id:1,name: 'Shubham Rohilla',email:'xyz@gmail.com'}) ; 
// createUser({id:2,name: 'Vivek Rohilla',email:'abc@gmail.com'}) ; 
// getAllUsers() ;
