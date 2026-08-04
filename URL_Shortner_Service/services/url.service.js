import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq } from "drizzle-orm";

export const insertUrlIntoDatabase = async (userId, shortCode, targetUrl) => {
  try {
    const [data] = await db
      .insert(urlsTable)
      .values({
        userId,
        shortCode,
        targetUrl,
      })
      .returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
      });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUrlFromDatabase = async (shortcode) => {
  try {
    const [url] = await db
      .select({ targetUrl: urlsTable.targetUrl })
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, shortcode));

    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
