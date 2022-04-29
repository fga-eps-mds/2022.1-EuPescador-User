import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn("increment")
    id?: number

    @Column({nullable: true})
    name?: string;

    @Column({nullable: true})
    email?: string;

    @Column({nullable: true})
    phone?: string;

    @Column({nullable: true})
    password?: string;

    @Column({nullable: true})
    admin?: boolean;

    @Column({nullable: true})
    state?: string;

    @Column({nullable: true})
    city?: string;

    @Column({nullable: true})
    superAdmin?: boolean;
}