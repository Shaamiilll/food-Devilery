// src/controllers/pricingController.ts
import { Request, Response } from 'express';
import Pricing from '../models/pricing';

// Function to handle fetching all pricings
export const getAllPricings = async (req: Request, res: Response) => {
  try {
    const pricings = await Pricing.findAll();
    return res.status(200).json(pricings);
  } catch (error) {
    console.error('Error fetching pricings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle fetching a pricing by ID
export const getPricingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pricing = await Pricing.findByPk(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }
    return res.status(200).json(pricing);
  } catch (error) {
    console.error('Error fetching pricing by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle creating a new pricing
export const createPricing = async (req: Request, res: Response) => {
  const { organizationId, itemId, zone, base_distance_in_km, km_price, fix_price } = req.body;
  try {
    const newPricing = await Pricing.create({ organizationId, itemId, zone, base_distance_in_km, km_price, fix_price });
    return res.status(201).json(newPricing);
  } catch (error) {
    console.error('Error creating pricing:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle updating an existing pricing
export const updatePricing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { organizationId, itemId, zone, base_distance_in_km, km_price, fix_price } = req.body;
  try {
    let pricing = await Pricing.findByPk(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }
    pricing.organizationId = organizationId;
    pricing.itemId = itemId;
    pricing.zone = zone;
    pricing.base_distance_in_km = base_distance_in_km;
    pricing.km_price = km_price;
    pricing.fix_price = fix_price;
    await pricing.save();
    return res.status(200).json(pricing);
  } catch (error) {
    console.error('Error updating pricing:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle deleting a pricing by ID
export const deletePricing = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pricing = await Pricing.findByPk(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }
    await pricing.destroy();
    return res.status(200).json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const calculatePrice = async (req: Request, res: Response) => {
    try {
      // Extract parameters from request body
      const { zone, organization_id, total_distance, item_type } = req.body;
  
      // Fetch pricing details based on the given parameters
      const pricing = await Pricing.findOne({
        where: {
          organization_id,
          zone,
          item_id: item_type === 'perishable' ? 1 : 2, // Assuming perishable item_id is 1 and non-perishable item_id is 2
        }
      });
  
      if (!pricing) {
        return res.status(404).json({ error: 'Pricing details not found' });
      }
  
      const { base_distance_in_km, km_price, fix_price } = pricing;
  
      // Calculate total price
      let totalPrice = fix_price;
      if (total_distance > base_distance_in_km) {
        const additionalDistance = total_distance - base_distance_in_km;
        const perKmPrice = item_type === 'perishable' ? km_price : 1; // Per km price for non-perishable items is always 1 EUR
        totalPrice += additionalDistance * perKmPrice;
      }
  
      // Send the total price in the response
      return res.status(200).json({ total_price: totalPrice });
    } catch (error) {
      console.error('Error calculating price:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };