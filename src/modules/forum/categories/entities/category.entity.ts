import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255, nullable: true, default: ''})
    description: string;

    @Column({type: 'varchar', length: 255, nullable: true, default: ''})
    slug: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

}
