import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
let db;

export function connectToDb(startServer) {
	const mongoClient = new MongoClient(MONGO_URI);

	mongoClient
		.connect()
		.then(() => {
			db = mongoClient.db('bate_papo_uol');
			startServer();
		})
		.catch((err) => {
			console.log('Failed to connect to MongoDb', err);
		});
}

export function getDb() {
	return db;
}
