import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { AppDataSource } from '../data-source'
import { Continent } from '../entity/Continent'

@Resolver(Continent)
export class ContinentResolver {
	private readonly manager = AppDataSource.manager

	@Query(() => [Continent])
	async getContinents(): Promise<Continent[]> {
		try {
			const continents = await this.manager.find(Continent, {
				relations: { countries: true },
			})
			return continents
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}

	@Mutation(() => Continent)
	async createContinent(
		@Arg('code') code: string,
		@Arg('nom') nom: string
	): Promise<Continent> {
		try {
			const existingContinent = await this.manager.find(Continent, {
				where: {
					code,
				},
			})
			if (existingContinent.length)
				throw new Error('Continent code already exists in DB')

			const newContinent = new Continent()
			newContinent.code = code
			newContinent.nom = nom

			const savedContinent = await this.manager.save(newContinent)
			return savedContinent
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}
}
