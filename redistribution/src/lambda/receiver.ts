/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SQSEvent } from "aws-lambda";
import { User } from "../entity/user";
import { Store } from "../entity/store";
import { connectDB } from "../database/DBConnection";

type MyRequestBody = {
  password: string;
  storeToken: string;
  username: string;
};

export const handler = async (event: SQSEvent) => {
  const body: MyRequestBody = JSON.parse(event.Records[0].body);

  if (!connectDB.isInitialized) {
    await connectDB.initialize();
  }

  const storeRepo = connectDB.getRepository<Store>(Store);
  const userRepo = connectDB.getRepository<User>(User);

  const store = await storeRepo.findOneBy({ token: body.storeToken });
  const user = new User();
  user.username = body.username;
  user.password = body.password;
  user.store = store;
  await userRepo.save(user);
};
