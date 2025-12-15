import { Schema, model } from "mongoose";
import IBotModel, {
  IBotAccessedData,
  IRpaBaseElement,
} from "../interfaces/BotModelInterface";

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
  type: { type: rpaBaseElementSchema },
});

const accessedDataSchema = new Schema<{ type: string; data: IBotAccessedData }>(
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
  { _id: false }
);

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
  accessedData: [accessedDataSchema],
  injectionPoints: [
    {
      id: { type: String, required: true },
      label: { type: String, required: true },
      accessedData: [accessedDataSchema],
    },
  ],
});

const BotModel = model<IBotModel>("BotModel", schema);

export default BotModel;
