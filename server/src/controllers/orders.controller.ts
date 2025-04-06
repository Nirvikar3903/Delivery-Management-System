import { Request, Response } from 'express';
import Order from '../models/orders.model';

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('assignedPartner');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create order' });
  }
};

// Update order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update order' });
  }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete order' });
  }
};
