import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    name: {
      type: String,
      required: true,
      unique:true,
    },
    phone_no: {
      type: Number,
      required: false,
    }
})
userSchema.index({ name: 1 });

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("userslists", userSchema);