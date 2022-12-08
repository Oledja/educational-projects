import Clinic from "../@types/Clinic";

const prepareResponse = (clinics: Clinic[]) =>
  clinics.map((clinic) => ({
    name: clinic.name,
    address: clinic.address,
    phone: clinic.phone,
    about: clinic.about,
    city: clinic.city,
    suburb: clinic.suburb,
    state: clinic.state,
    postcode: clinic.postcode,
    email: clinic.email,
    webside: clinic.website,
  }));

export { prepareResponse };
