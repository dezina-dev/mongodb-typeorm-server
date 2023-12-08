import { ObjectIdColumn, ObjectId, Entity, Column, OneToMany } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Customer {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  email: string | undefined;

  // @OneToMany(() => Product, product => product.customer)
  // products!: Product[];

  @OneToMany(() => Product, product => product.customer)
  products!: Product[];
}
