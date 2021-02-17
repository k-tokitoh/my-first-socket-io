import { Router } from "express";
import { Room } from "../models";

const router = Router();

router.post("/", (_req, res) => {
  const room = new Room();
  res.json(room);
});

export default router;
