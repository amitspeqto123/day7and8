import { Order } from "../model/order.js";
import { Product } from "../model/product.js";

export const createOrderService = async (userId, data) => {
  const { productId, quantity } = data;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.quantity < quantity) {
    throw new Error("Insufficient product quantity");
  }

  const totalAmount = product.price * quantity;
  // reduce stock
  product.quantity -= quantity;
  await product.save();

  const order = await Order.create({
    user: userId,
    product: productId,
    quantity,
    totalAmount,
  });

  return order;
};

export const allOrderService = async () => {
  return await Order.find()
    .populate("user", "name email role")
    .populate("product", "name price brand");
};

export const getOrderByIdService = async (id) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error("Order not found");
  }
  return await Order.findById(order._id)
    .populate("user", "name email role")
    .populate("product", "name price brand");
};
