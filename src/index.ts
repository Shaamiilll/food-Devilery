import express, { Request, Response, NextFunction } from 'express';
import itemRoutes from './routes/itemRoutes';
import pricingRoutes from './routes/pricingRoutes';
import sequelize from './config/database';

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Database sync failed:', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount item routes
app.use('/api/items', itemRoutes);

// Mount pricing routes
app.use('/api/pricing', pricingRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
