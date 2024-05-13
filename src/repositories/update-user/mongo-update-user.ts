import {
  IUpdateRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocol";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";
import { ObjectId } from "mongodb";

export class MongoUpdateUserRepository implements IUpdateRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users-db").updateOne(
      // passando o id do Usuário que deseja atualizar e também os parâmetros
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users-db")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found, is not possible to updated the User");
    }

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
