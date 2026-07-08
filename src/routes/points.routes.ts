import { earnPoints, getBalance } from "@src/services/points.services";
import { Router } from "express";

const router = Router();

router.post("/earn", earnPoints);
router.get("/balance/:userId", getBalance);

export default router;