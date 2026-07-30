import express from "express";
import db from '../db/index.js';
import { usersTable } from "../db/schema";
import { ensureAuthenticated, restrictToRol } from '../middlewares/auth.middleware.js'

const router = express.Router();

const adminOnly = restrictToRol('ADMIN')

router.use(ensureAuthenticated, adminOnly);

router.get('/', async (req, res) => {

    const users = await db.select({
        name: usersTable.name,
        email: usersTable.email

    }).from(usersTable);
    return res.json({ status: 'success', users })
})

export default router;

