import { Request, Response } from 'express';
import Organization from '../models/organization';

// Function to handle fetching all organizations
export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.findAll();
    return res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle creating a new organization
export const createOrganization = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newOrganization = await Organization.create({ name });
    return res.status(201).json(newOrganization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add other controller functions for updating, deleting, etc.
