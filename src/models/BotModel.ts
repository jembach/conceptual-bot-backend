import { Schema, model } from "mongoose";
import IBotModel from "../interfaces/BotModelInterface";

const schema = new Schema<IBotModel>({
  name: { type: String, required: true },
  description: String,
  model: { type: String, required: true },
});

const BotModel = model<IBotModel>("BotModel", schema);

export default BotModel;
