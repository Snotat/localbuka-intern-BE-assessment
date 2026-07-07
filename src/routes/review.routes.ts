import { Router } from "express";
import { createReview } from "../controller/reviews.controller";

const router = Router();

// POST /restaurants/:id/reviews
router.post("/:id/reviews", createReview);

export default router;