import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Country {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	nom: string

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	code: string

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	emoji: string

	@Field(() => String)
	@Column({ type: 'varchar', default: '' })
	continent: string
}
