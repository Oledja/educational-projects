import { clinics } from "../data/schema";
import { connector } from "../db/PostgresPoolConnections";
import { ilike, like, or } from "drizzle-orm/expressions";

class ClinicRepository {
  private db = connector.connect();

  public getAll = async () => {
    const db = await this.db;
    return db.select(clinics);
  };

  public getByName = async (name: string) => {
    const db = await this.db;
    return db
      .select(clinics)
      .where(
        or(
          ilike(clinics.name, `%${name}%`),
          ilike(clinics.shortName, `%${name}%`)
        )
      );
  };

  public getByCity = async (city: string) => {
    const db = await this.db;
    return db.select(clinics).where(ilike(clinics.city, `%${city}%`));
  };

  public getByState = async (state: string) => {
    const db = await this.db;
    return db.select(clinics).where(ilike(clinics.state, state));
  };

  public getByPostcode = async (postcode: string) => {
    const db = await this.db;
    return db.select(clinics).where(like(clinics.postcode, postcode));
  };

  public getBySuburb = async (suburb: string) => {
    const db = await this.db;
    return db.select(clinics).where(ilike(clinics.suburb, `%${suburb}%`));
  };

  public getNearBySuburb = async (suburb: string) => {
    const db = await this.db;
    return db
      .select(clinics)
      .where(
        or(
          ilike(clinics.suburb, suburb),
          ilike(clinics.nearby1, suburb),
          ilike(clinics.nearby2, suburb),
          ilike(clinics.nearby3, suburb),
          ilike(clinics.nearby4, suburb)
        )
      );
  };
}

export default ClinicRepository;
