import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Kaue",
        lastName: "Sabino",
        email: "kaue.sabino@hotmail.com",
        password: "123",
      },
    ];
  }
}
