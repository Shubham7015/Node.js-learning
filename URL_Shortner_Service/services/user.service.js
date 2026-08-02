import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email) => {
  const [existing_user] = await db
    .select({
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname:usersTable.lastname,
        email:usersTable.lastname
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return existing_user ;

}