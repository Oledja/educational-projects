import { getPosition } from "../clients/GeocodeClient";
import { ClinicRepository } from "../repositories/ClinicRepository";

const clinicsRepository = new ClinicRepository();

const delay = () => new Promise((resolve) => setTimeout(resolve, 50));
const start = async () => {
  const clinics = await clinicsRepository.getAll();
  for (let i = 0; i < clinics.length; i++) {
    const clinic = clinics[i];
    const { latitude, longitude } = await getPosition(clinic.address);
    if (latitude && longitude) {
      clinic.latitude = latitude;
      clinic.longitude = longitude;
      await clinicsRepository.update(clinic);
    }
    await delay();
  }
};

start().then(() => {
  console.log("end");
});
