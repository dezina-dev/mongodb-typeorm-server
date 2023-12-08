import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, JoinColumn } from "typeorm";
import { Customer } from "./Customer.entity";

@Entity()
export class Product {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column(type => ObjectId)
  customerId!: ObjectId;

  @ManyToOne(() => Customer, (customer) => customer._id, { eager: true })
  @JoinColumn()
  customer!: Customer;
}


