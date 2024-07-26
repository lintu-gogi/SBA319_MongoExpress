import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    userid: {
        type: Number,
        required: true,
      },
      commets: {
        type: String,
        required: true,
      }
})
// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("commentlists", userSchema);