import { Router } from "express";
import { Room } from "../models";

const router = Router();

router.post("/", (_req, res) => {
  const room = new Room();
  room.save();
  res.json(room);
});

router.route("/:id/messages").get(async (req, res) => {
  const room = await Room.findById(req.params.id).populate("messages").exec();
  res.json(room?.messages);
});

export default router;
