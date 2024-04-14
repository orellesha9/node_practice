import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productImages: {
      type: [{
        type: String
      }],
      default: []
    }
  },
  { versionKey: false, timestamps: true }
);

productSchema.pre(`findOneAndUpdate`, function() {
  this.setOptions({new: true})
})


const Product = model("product", productSchema);
export default Product;
