import { Request, Response, NextFunction } from "express";
import * as restaurantService from "../services/restaurant.services";

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const restaurants = await restaurantService.getRestaurants(req.query);

    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id as string);

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};