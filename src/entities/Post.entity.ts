// Post.entity.ts

import { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ObjectIdColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user!: User;

    constructor() {
        super();
        this.id = new ObjectId().toHexString();
        this.title = '';
        this.content = '';
    }
}
