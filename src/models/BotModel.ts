import { Schema, model } from "mongoose";
import IBotModel, { IRpaBaseElement } from "../interfaces/BotModelInterface";

const rpaBaseElementSchema = new Schema<IRpaBaseElement>(
  {
    id: { type: String, required: true },
    iri: { type: String, required: true },
    label: { type: String, required: false },
    comment: { type: String, required: false },
  },
  { _id: false }
);

rpaBaseElementSchema.add({
  type: { type: rpaBaseElementSchema, required: true },
});

const schema = new Schema<IBotModel>({
  name: { type: String, required: true },
  description: String,
  type: {
    type: String,
    required: true,
    default: "bot",
    get: (v: string | undefined) => (v === undefined ? "bot" : v),
  },
  model: { type: String, required: true },
  processTree: { type: String, required: true },
  accessedData: [
    {
      type: { type: String, required: true },
      data: {
        id: { type: String, required: true },
        iri: { type: String, required: true },
        label: { type: String, required: false },
        comment: { type: String, required: false },
        concept: rpaBaseElementSchema,
      },
    },
  ],
  templatePlaceholders: [{ type: String, required: true }],
});

const BotModel = model<IBotModel>("BotModel", schema);

export default BotModel;
