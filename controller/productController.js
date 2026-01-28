import {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByBrandService,
  getProductByIdService,
  updateProductService,
} from "../service/productService.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      total: 1,
      product,
    });
  } catch (error) {
    console.log("Error in ceating product", error);
    if (error.message === "Product already exists") {
      res.status(409).json({
        success: false,
        message: "Product already exists",
      });
    }
  }
};
// get all product
export const getAllProuct = async (req, res) => {
  try {
    const { brand, name, minPrice, maxPrice, sort } = req.query;
    let filter = {};
    if (brand) {
      filter.brand = brand;
    }
    if (name) {
      filter.name = name;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    let sortOption = {};
    if (sort) {
      if (sort.startsWith("-")) {
        sortOption[sort.substring(1)] = -1;
      } else {
        sortOption[sort] = 1;
      }
    }

    const products = await getAllProductService(filter, sortOption);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log("Error in fetching product", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await getProductByIdService(id);
    res.status(200).json({
      success: true,
      message: "Fetched single product successfully",
      totle: 1,
      singleProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      totla: 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newUpdatedProduct = await updateProductService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully..",
      total: 1,
      newUpdatedProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Perform queeries
export const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.query;
    const products = await getProductByBrandService(brand);
    res.status(200).json({
      success: true,
      message: "Product fetched by brand",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
