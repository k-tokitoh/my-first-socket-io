import { Schema, model, Model, Document } from "mongoose";

interface IMessage extends Document {
  roomId: string;
  body: string;
}

const MessageSchema = new Schema(
  {
    roomId: String,
    body: String,
  },
  { timestamps: true }
);

const Message: Model<IMessage> = model("Message", MessageSchema);

export { Message };
