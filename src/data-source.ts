import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as path from 'path'

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: 'database.sqlite',
	synchronize: true,
	logging: false,
	entities: [path.join(__dirname, './entity/*.*')],
	migrations: [],
	subscribers: [],
})
