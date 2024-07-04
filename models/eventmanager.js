import { Model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const eventSchema = new Schema({

},{
    timestamps: true
})

eventSchema.plugin(toJSON)



export const EventsModel = model('eventManager', eventSchema);