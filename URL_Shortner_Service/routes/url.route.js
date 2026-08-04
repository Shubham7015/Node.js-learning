import express from "express";
import { nanoid } from "nanoid";
import { shortenPostRequestBodySchema , updateUrlRequestBodySchema } from "../validations/request.validation.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import {
  insertUrlIntoDatabase,
  getUrlFromDatabase,
} from "../services/url.service.js";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq, and } from "drizzle-orm";

export const UrlsRouter = express.Router();

UrlsRouter.post("/shorten", authValidator, async (req, res) => {
  const userId = req.user.id;

  const validation_result = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validation_result.error)
    return res.status(400).json({ error: validation_result.error });

  const { url, code } = validation_result.data;

  const shortCode = code ?? nanoid(6);

  try {
    const data = await insertUrlIntoDatabase(userId, shortCode, url);

    if (!data) return res.status(500).json({ error: "Failed to shorten URL" });

    return res.status(201).json({
      id: data.id,
      shortCode: data.shortCode,
      targetUrl: data.targetUrl,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong while shortening the URL" });
  }
});

UrlsRouter.get("/codes", authValidator, async (req, res) => {
  try {
    const codes = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.userId, req.user.id));

    return res.status(200).json({ codes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong while fetching codes" });
  }
});

UrlsRouter.delete("/:id", authValidator, async (req, res) => {
  const id = req.params.id;

  try {
    await db
      .delete(urlsTable)
      .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong while deleting" });
  }
});

UrlsRouter.patch("/:id", authValidator, async (req, res) => {
  const id = req.params.id;

  const validation_result = await updateUrlRequestBodySchema.safeParseAsync(req.body);
  if (validation_result.error)
    return res.status(400).json({ error: validation_result.error });

  const { url, code } = validation_result.data;

  // Only update fields that were provided
  const updateData = {};
  if (url) updateData.targetUrl = url;
  if (code) updateData.shortCode = code;

  try {
    const result = await db
      .update(urlsTable)
      .set(updateData)
      .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)))
      .returning();

    if (result.length === 0)
      return res.status(404).json({ error: "URL not found" });

    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong while updating" });
  }
});


UrlsRouter.get("/:shortcode", async (req, res) => {
  const shortCode = req.params.shortcode;

  try {
    const url = await getUrlFromDatabase(shortCode);

    if (!url) return res.status(400).json({ error: "Invalid Url" });

    return res.redirect(url.targetUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error while redirecting to site" });
  }
});
