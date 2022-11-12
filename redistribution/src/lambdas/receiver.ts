import { SQSEvent } from "aws-lambda/trigger/sqs";
import { MyRequestBody } from "../@types/APIGatewayEvent";
import { dataSource } from "../database/DBConnection";
import { Store } from "../entity/store";
import { User } from "../entity/user";

const receiver = async (event: SQSEvent) => {
  const body: MyRequestBody = JSON.parse(event.Records[0].body);
  const { storeToken, username, password } = body;
  await dataSource.initialize();
  try {
    const store: Store = await dataSource.getRepository(Store).findOne({
      where: {
        token: storeToken,
      },
    });
    const user = new User();
    user.username = username;
    user.password = password;
    user.store = store;
    await dataSource.getRepository(User).save(user);
  } finally {
    await dataSource.destroy();
  }
};

export { receiver };
