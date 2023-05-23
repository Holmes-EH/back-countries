import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Country } from './Country'

@Entity()
@ObjectType()
export class Continent {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	nom: string

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	code: string

	@Field(() => [Country])
	@OneToMany(() => Country, (country) => country.continent)
	countries: Country[]
}
