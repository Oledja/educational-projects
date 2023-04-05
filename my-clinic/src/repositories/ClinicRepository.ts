import { Clinic, clinics } from "../db/schema/schema";
import { pool } from "../db/connection";
import { ilike, or, eq } from "drizzle-orm/expressions";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

export class ClinicRepository {
  private db: NodePgDatabase = drizzle(pool);

  getAll = async (): Promise<Clinic[]> => {
    const allClinics: Clinic[] = await this.db.select().from(clinics);
    return allClinics;
  };

  filterByName = async (name: string): Promise<Clinic[]> => {
    const clinicsByName: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(
        or(
          ilike(clinics.longName, `%${name}%`),
          ilike(clinics.name, `%${name}%`)
        )
      );
    return clinicsByName;
  };

  filterByCity = async (city: string): Promise<Clinic[]> => {
    const clinicsByCity: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(ilike(clinics.city, `%${city}%`));
    return clinicsByCity;
  };

  filterByState = async (state: string): Promise<Clinic[]> => {
    const clinicsByState: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(ilike(clinics.state, `%${state}%`));
    return clinicsByState;
  };

  filterByPostcode = async (postcode: string): Promise<Clinic[]> => {
    const clinicsByPostcode: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(ilike(clinics.postcode, `%${postcode}%`));
    return clinicsByPostcode;
  };

  filterBySuburb = async (suburb: string): Promise<Clinic[]> => {
    const clinicsBySuburb: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(ilike(clinics.suburb, `%${suburb}%`));
    return clinicsBySuburb;
  };

  getNearBySuburb = async (suburb: string): Promise<Clinic[]> => {
    const nearestClinics: Clinic[] = await this.db
      .select()
      .from(clinics)
      .where(
        or(
          ilike(clinics.suburb, `%${suburb}%`),
          ilike(clinics.nearby1, `%${suburb}%`),
          ilike(clinics.nearby2, `%${suburb}%`),
          ilike(clinics.nearby3, `%${suburb}%`),
          ilike(clinics.nearby4, `%${suburb}%`)
        )
      );
    return nearestClinics;
  };

  update = async (clinic: Clinic) => {
    await this.db
      .update(clinics)
      .set(clinic)
      .where(eq(clinics.longName, clinic.longName));
  };
}
