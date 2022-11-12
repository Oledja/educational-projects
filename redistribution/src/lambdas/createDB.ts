import { dataSource } from "../database/DBConnection";
import { Counter } from "../entity/counter";
import { Store } from "../entity/store";

const allStores = ["ROZETKA", "MOYO", "COMFY", "FOXTROT", "ELDORADO"];

const createDB = async () => {
  await dataSource.initialize();
  await dataSource.synchronize(true);
  const storesToSave: Store[] = [];

  allStores.forEach((storeName) => {
    const counter = new Counter();
    counter.count = 0;
    const store = new Store();
    store.counter = counter;
    store.token = storeName;
    storesToSave.push(store);
  });
  await dataSource.getRepository(Store).save(storesToSave);
  await dataSource.destroy();
  return {
    statusCode: 200,
    body: "Database created successfully",
  };
};

export { createDB };
