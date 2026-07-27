import express from "express";
import db from '../db/index.js';
import { usersTable } from "../db/schema.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'You are not authorized' });

    const users = await db.select({
        name: usersTable.name,
        email: usersTable.email
    }).from(usersTable);

    return res.json({ status: 'success', users });
});

export default router;
