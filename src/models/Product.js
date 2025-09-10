import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }], // image URLs
    brand: { type: String },
    isPromotion: { type: Boolean, default: false },
    // inStock: { type: Boolean, default: true },
    statusProduct: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    promotionPrice: { type: Number },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
