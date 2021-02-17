import { Schema, model, Model, Document } from "mongoose";

interface IRoom extends Document {
  messages: Schema.Types.ObjectId[];
}

const RoomSchema = new Schema({
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Room: Model<IRoom> = model("Room", RoomSchema);

export { Room };
