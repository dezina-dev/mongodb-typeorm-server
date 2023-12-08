import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/User.entity';
import { Post } from './entities/Post.entity';
import { Customer } from './entities/Customer.entity';
import { Product } from './entities/Product.entity';
import userRoutes from './routes/user.route';
import postRoutes from './routes/post.route';
import customerRoutes from './routes/customer.route';
import productRoutes from './routes/product.route';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URL;

createConnection({
  type: 'mongodb',
  url: MONGODB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true, // set to false in production
  logging: true,
  entities: [
    //TypeORM entities
    User,
    Post,
    Customer,
    Product
  ],
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.use('/user', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/customer', customerRoutes);
    app.use('/product', productRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
