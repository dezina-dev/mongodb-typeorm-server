import { getMongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Customer } from "../entities/Customer.entity";
import { Request, Response } from "express";

const createCustomer = async (req: Request, res: Response) => {
  try {
    const userRepository = getMongoRepository(Customer);
    const newCustomer = userRepository.create(req.body);

    const result = await userRepository.save(newCustomer);

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
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

const getCustomers = async (_req: Request, res: Response) => {
  try {
    const userRepository = getMongoRepository(Customer);
    const customers = await userRepository.find();

    if (!customers || customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No customers found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const userRepository = getMongoRepository(Customer);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID not provided.',
      });
    }

    const customer = await userRepository.findOneById(new ObjectId(id));

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    userRepository.merge(customer, req.body);
    const result = await userRepository.save(customer);

    return res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
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

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const userRepository = getMongoRepository(Customer);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID not provided.',
      });
    }

    const result = await userRepository.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Customer deleted successfully'
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
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
}
