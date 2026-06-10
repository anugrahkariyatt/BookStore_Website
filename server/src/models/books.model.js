import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    sold: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Book", bookSchema);
