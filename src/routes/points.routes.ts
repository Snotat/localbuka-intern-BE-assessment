import { Router } from "express";
import {
  earnPoints,
  getBalance,
} from "../controller/points.controller";

const router = Router();

router.post("/earn", earnPoints);
router.get("/balance/:userId", getBalance);

export default router;