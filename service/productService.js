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
    categoryId,
  });
  return product;
};
// get all product
export const getAllProductService = async (filter, sortOption) => {
  return await Product.find(filter).sort(sortOption).populate("categoryId");
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

// here performs aggregation, lookup
export const getProductsWithCategoryService = async () => {
  return await Product.aggregate([
    {
      $lookup: {
        from: "categories", // MongoDB collection name
        localField: "categoryId", // Product ka field
        foreignField: "_id", // Category ka field
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" }, // array ko object me convert karne ke liye
  ]);
};

export const getProductsWithCategoryByBrandService = async (brand) => {
  const matchStage = {};
  if (brand) matchStage.brand = brand;

  return await Product.aggregate([
    { $match: matchStage }, // filter by brand
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $project: {
        name: 1,
        brand: 1,
        price: 1,
        quantity: 1,
        "categoryDetails.name": 1,
      },
    },
  ]);
};

export const getProductsSortedByPriceService = async (sortOrder = 1) => {
  return await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    { $sort: { price: sortOrder } }, // 1 = ascending, -1 = descending
  ]);
};

export const getProductsByPriceRangeService = async (minPrice, maxPrice) => {
  const matchStage = {};
  if (minPrice || maxPrice) matchStage.price = {};
  if (minPrice) matchStage.price.$gte = Number(minPrice);
  if (maxPrice) matchStage.price.$lte = Number(maxPrice);

  return await Product.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
  ]);
};
export const getProductStatsService = async () => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$brand", // Brand-wise stats
        totalProducts: { $sum: 1 }, // Count of products
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    { $sort: { totalProducts: -1 } }, // Sort by most products
  ]);

  return stats;
};
