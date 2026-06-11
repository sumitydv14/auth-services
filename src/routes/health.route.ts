import { Router } from 'express';
import prisma from '../config/prisma';

const router = Router();
router.get("/", async (req, res) => {
    const result = await prisma.user.count();
    res.json({
        database: "connected",
        users: result
    })
})

export default router;