import { getMongoRepository } from "typeorm";
import { Product } from "../entities/Product.entity";
import { Customer } from "../entities/Customer.entity";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MongoFindOneOptions } from "typeorm/find-options/mongodb/MongoFindOneOptions";

const addProduct = async (req: Request, res: Response) => {
    try {
        const productRepository = getMongoRepository(Product);
        const customerRepository = getMongoRepository(Customer);

        const { customerId, name, price } = req.body;

        if (!customerId || !name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product data provided.',
            });
        }

        const customer = await customerRepository.findOne({ _id: new ObjectId(customerId) } as MongoFindOneOptions<Customer>);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found.',
            });
        }

        const newProduct = new Product();
        newProduct.name = name;
        newProduct.price = price;
        newProduct.customer = customer;

        const result = await productRepository.save(newProduct);

        return res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const getProductsByCustomerId = async (req: Request, res: Response) => {
    try {
        const productRepository = getMongoRepository(Product);
        const { customerId } = req.params;

        if (!customerId) {
            return res.status(400).json({
                success: false,
                message: 'Customer ID not provided.',
            });
        }

        const products = await productRepository.find({
            where: { 'customer._id': new ObjectId(customerId) },
        });

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const getProducts = async (req: Request, res: Response) => {
    try {
        const productRepository = getMongoRepository(Product);

        const products = await productRepository.find({ relations: ["customer"] });

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    addProduct,
    getProductsByCustomerId,
    getProducts
}