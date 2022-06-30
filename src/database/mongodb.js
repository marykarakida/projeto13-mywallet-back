import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient
	.connect()
	.then(() => {
		db = mongoClient.db('bate_papo_uol');
	})
	.catch((err) => {
		console.log('Failed to connect to MongoDb', err);
	});

export default function getDb() {
	return db;
}
