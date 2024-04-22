import { Request, Response } from 'express';
import Item from '../models/item';

// Function to handle fetching all items
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle fetching an item by ID
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle creating a new item
export const createItem = async (req: Request, res: Response) => {
  const { type, description } = req.body;
  try {
    const newItem = await Item.create({ type, description });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle updating an existing item
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, description } = req.body;
  try {
    let item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    item.type = type;
    item.description = description;
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle deleting an item by ID
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    await item.destroy();
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
