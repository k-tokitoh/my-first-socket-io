import { Schema, model, Model, Document } from "mongoose";

interface IRoom extends Document {}

const RoomSchema = new Schema();

const Room: Model<IRoom> = model("Room", RoomSchema);

export { Room };
