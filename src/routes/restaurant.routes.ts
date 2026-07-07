import { Router } from "express";
import {
  getRestaurants,
  getRestaurantById,
} from "../controller/restaurant.controller";

const router = Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

export default router;