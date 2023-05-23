import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Country } from '../entity/Country'
import { AppDataSource } from '../data-source'

@Resolver(Country)
export class CountryResolver {
	private readonly manager = AppDataSource.manager

	@Query(() => Country)
	async getCountry(@Arg('code') code: string): Promise<Country> {
		try {
			const country = await this.manager.findOneByOrFail(Country, {
				code,
			})
			return country
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}

	@Query(() => [Country])
	async getCountries(): Promise<Country[]> {
		try {
			const countries = await this.manager.find(Country)
			return countries
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}

	@Query(() => [Country])
	async getCountriesByContinent(
		@Arg('continent') continent: string
	): Promise<Country[]> {
		try {
			const countries = await this.manager.find(Country, {
				where: { continent },
			})
			return countries
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}

	@Mutation(() => Country)
	async createCountry(
		@Arg('code') code: string,
		@Arg('nom') nom: string,
		@Arg('emoji') emoji: string,
		@Arg('continent') continent: string
	): Promise<Country> {
		try {
			const existingCountry = await this.manager.find(Country, {
				where: {
					code,
				},
			})
			if (existingCountry.length)
				throw new Error('Country code already exists in DB')
			const newCountry = new Country()
			newCountry.code = code
			newCountry.nom = nom
			newCountry.emoji = emoji
			newCountry.continent = continent
			const savedCountry = await this.manager.save(newCountry)
			return savedCountry
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}

	@Mutation(() => Country)
	async updateCountry(
		@Arg('code') code: string,
		@Arg('nom') nom?: string,
		@Arg('emoji') emoji?: string,
		@Arg('continent') continent?: string
	): Promise<Country> {
		try {
			const existingCountry = await this.manager.findOneByOrFail(
				Country,
				{
					code,
				}
			)
			if (!existingCountry)
				throw new Error('Country code already exists in DB')

			existingCountry.code = code || existingCountry.code
			existingCountry.nom = nom || existingCountry.nom
			existingCountry.emoji = emoji || existingCountry.emoji
			existingCountry.continent = continent || existingCountry.continent
			const savedCountry = await this.manager.save(existingCountry)
			return savedCountry
		} catch (error: any) {
			console.error(error)
			throw new Error(error)
		}
	}
}
