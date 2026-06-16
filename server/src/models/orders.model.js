import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingAddress: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine1: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },

        title: String,

        image: String,

        quantity: Number,

        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Orders", orderSchema);
