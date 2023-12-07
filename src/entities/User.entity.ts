import { ObjectId } from 'mongodb';
import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './Post.entity';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[] | undefined;

  constructor() {
    super();
    this.id = new ObjectId();
    this.name = '';
   // this.posts = [];
  }
}
