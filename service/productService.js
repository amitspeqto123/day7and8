import { Category } from "../model/category.js";
import { Product } from "../model/product.js";

// create a product
export const createProductService = async (data) => {
  const { name, brand, price, quantity, categoryId } = data;

  const exsistProduct = await Product.findOne({ name });

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  if (exsistProduct) {
    throw new Error("Product already exists");
  }
  const product = await Product.create({
    name,
    brand,
    price,
    quantity,
    categoryId
  });
  return product;
};
// get all product
export const getAllProductService = async (filter, sortOption) => {
  return await Product.find(filter).sort(sortOption).populate("categoryId");;
};
// get product by id
export const getProductByIdService = async (id) => {
  const product = await Product.findById(id).populate("categoryId");
  if (!product) {
    throw new Error("Product not found");
  }
  return await Product.findById(product._id);
};
// delete product
export const deleteProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return await Product.findByIdAndDelete(product._id);
};
// update product
export const updateProductService = async (id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

// Performd Queries on product
export const getProductByBrandService = async (brand)=>{
  return await Product.find({brand});
}