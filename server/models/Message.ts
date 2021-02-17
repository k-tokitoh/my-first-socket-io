import { Schema, model, Model, Document } from "mongoose";

interface IMessage extends Document {
  room: Schema.Types.ObjectId;
  body: string;
}

const MessageSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    body: String,
  },
  { timestamps: true }
);

const Message: Model<IMessage> = model("Message", MessageSchema);

export { Message };
