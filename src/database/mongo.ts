import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    // const url = process.env.MONGODB_URL || "localhost:27017";
    // const username = process.env.MONGODB_USERNAME;
    // const password = process.env.MONGODB_PASSWORD;

    // const client = new Mongo(url, { auth: { username, password } });
    // const db = client.db("users-db");

    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const host = process.env.MONGODB_HOST || "";
    const port = process.env.MONGODB_PORT || "";
    const dbName = process.env.MONGODB_DB_NAME || "users-db";

    let url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

    // Se não há nome de usuário e senha
    if (!username || !password) {
      url = `mongodb://${host}:${port}/${dbName}`;
    }

    const client = new Mongo(url);
    const db = client.db(dbName);

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  },
};
