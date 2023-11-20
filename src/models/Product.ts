import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp } from "typeorm"

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    name: string | undefined;

    @Column('real')
    price: number | undefined;

    @Column('integer')
    id_supermarket: number | undefined;

    @Column('integer')
    deleted: boolean | undefined;

    @Column('text')
    created_at: Date | undefined;

    @Column('text')
    updated_at: Date | undefined;
}