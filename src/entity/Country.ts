import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Continent } from './Continent'

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

	@Field(() => Continent)
	@ManyToOne(() => Continent, (continent) => continent.countries, {
		onDelete: 'CASCADE',
	})
	continent: Continent
}
