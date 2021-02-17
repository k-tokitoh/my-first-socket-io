import { connect, set } from "mongoose";

const client = {
  initialize() {
    set("toJSON", {
      virtuals: true,
      transform: (_doc: never, converted: { _id?: string }) => {
        delete converted._id;
      },
    });

    connect(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};

export default client;
