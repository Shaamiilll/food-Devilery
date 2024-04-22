import express from 'express';
import * as ItemController from '../controllers/itemController';

const router = express.Router();

// Route to fetch all items
router.get('/', ItemController.getAllItems);

// Route to fetch item by ID
router.get('/:id', ItemController.getById);

// Route to create a new item
router.post('/', ItemController.createItem);

// Route to update an existing item
router.put('/:id', ItemController.updateItem);

// Route to delete an item by ID
router.delete('/:id', ItemController.deleteItem);

export default router;
