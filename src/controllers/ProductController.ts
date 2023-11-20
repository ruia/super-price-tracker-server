import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { connection } from  '../server';

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();

    res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;
        const product = await Product.findOneByOrFail({ id: id });
        res.json(product);
    } catch (error: any) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();
        const data = req.body;

        const product = new Product();
        product.name = data.name;
        product.price = data.price;
        product.id_supermarket = 1;
        product.deleted = false;
        product.created_at = currentDate;
        product.updated_at = currentDate;

        const newProduct = await product.save();

        console.log('Product created successfully');
        res.json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;

        await Product.findOneByOrFail({ id: id });
        await Product.delete(id);

        console.log('Product deleted successfully');
        res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}