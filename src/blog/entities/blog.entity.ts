import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column()
    title: string

    @Column({
        nullable: true
    })
    subHeader: string

    @Column()
    body: string

    @Column("simple-array")
    category: string[]

    @Column()
    createdAt: Date
}
