import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email) => {
  const [existing_user] = await db
    .select({
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname:usersTable.lastname,
        email:usersTable.lastname,
        salt:usersTable.salt,
        password:usersTable.password
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return existing_user ;

}


export const insertUserIntoDatabase = async(firstname,lastname,email,salt,password)=>{
  const [user] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password,
        salt,
      })
      .returning({ id: usersTable.id }); 

    return user.id ; 
}