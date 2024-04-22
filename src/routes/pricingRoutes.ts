
import express from 'express';
import * as PricingController from '../controllers/pricingController';

const router = express.Router();

// Route to fetch all pricings
router.get('/', PricingController.getAllPricings);

// Route to fetch pricing by ID
router.get('/:id', PricingController.getPricingById);

// Route to create a new pricing
router.post('/', PricingController.createPricing);

// Route to update an existing pricing
router.put('/:id', PricingController.updatePricing);

// Route to delete a pricing by ID
router.delete('/:id', PricingController.deletePricing);

// Route to calculate delivery price
router.post('/calculate', PricingController.calculatePrice);

export default router;
