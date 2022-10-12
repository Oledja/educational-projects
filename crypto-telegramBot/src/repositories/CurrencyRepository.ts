import sqlite3 from "sqlite3";
import ICriproRepoResponse from "../@Types/ICryptoRepoResponse";
import { INSERT, SELECT_ALL, SELECT_ONE, DELETE } from "../utill/Queries";

sqlite3.verbose();

class CurrencyRepository {
  private db = new sqlite3.Database("currencies.sqlite");

  public async save(chatId: number, symbol: string) {
    const symbolFromDB = await this.getOne(chatId, symbol);
    if (symbolFromDB.length === 0) {
      this.db.run(INSERT, chatId, symbol);
    }
  }

  public getOne(chatId: number, symbol: string) {
    return new Promise<ICriproRepoResponse[]>((resolve, reject) => {
      this.db.all(
        SELECT_ONE,
        symbol,
        chatId,
        (err: Error, res: ICriproRepoResponse[]) => {
          if (err) {
            reject(err);
          } else resolve(res);
        }
      );
    });
  }

  public getAll(chatId: number): Promise<ICriproRepoResponse[]> {
    return new Promise<ICriproRepoResponse[]>((resolve, reject) => {
      this.db.all(
        SELECT_ALL,
        chatId,
        (err: Error, res: ICriproRepoResponse[]) => {
          if (err) {
            reject(err);
          } else resolve(res);
        }
      );
    });
  }

  public delete(chatId: number, symbol: string) {
    this.db.run(DELETE, chatId, symbol);
  }
}

export default CurrencyRepository;
