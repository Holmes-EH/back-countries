import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { AppDataSource } from './data-source'
import * as path from 'path'

const main = async () => {
	await AppDataSource.initialize()
	await AppDataSource.runMigrations()

	const schema = await buildSchema({
		resolvers: [path.join(__dirname, './resolvers/*.*')],
	})

	const apolloServer = new ApolloServer({ schema })
	try {
		const { url }: { url: string } = await apolloServer.listen({
			port: 5000,
		})
		console.log(`🚀  Server ready at ${url}`)
	} catch (error) {
		console.error('Error starting the server')
	}
}

main()
