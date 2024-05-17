import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    // const username = process.env.MONGODB_USERNAME;
    // const password = process.env.MONGODB_PASSWORD;

    // const client = new Mongo(url, { auth: { username, password } });
    // const db = client.db("users-db");

    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const host = process.env.MONGODB_HOST || "";
    const port = process.env.MONGODB_PORT || "";
    const cluster = process.env.MONGOGB_DB_CLUSTER || "";
    const dbName = process.env.MONGODB_DB_NAME || "";

    // let url = `mongodb+srv://${username}:${password}@${host}:${port}/${dbName}`;
    // let url = `mongodb+srv://${username}:${password}@${cluster}/${dbName}`;

    // Se não há nome de usuário e senha
    // if (!username || !password) {
    //   url = `mongodb+srv://${host}:${port}/${dbName}`;
    // }

    //url com docker
    const url = process.env.MONGODB_URL || "localhost:27017";

    // //Com o MongoDB
    //const client = new Mongo(url);

    //Com Docker
    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db(dbName);

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  },
};
