export type Individuals =
  | "Martin"
  | "Steve"
  | "Ilon"
  | "Albert"
  | "Mother"
  | "Jesus"
  | "Leonardo"
  | "Queen"
  | "William"
  | "Nelson"
  | "Elizabeth"
  | "Mohandas"
  | "Abraham"
  | "Ronald";

const individuals: Map<Individuals, string> = new Map([
  ["Martin", "Dr. Martin Luther King, Jr."],
  ["Steve", "Steve Jobs"],
  ["Ilon", "Ilon Musk"],
  ["Albert", "Albert Einstein"],
  ["Mother", "Mother Teresa"],
  ["Jesus", "Jesus Christ"],
  ["Leonardo", "Leonardo di ser Piero da Vinci"],
  ["Queen", "Queen Elizabeth"],
  ["William", "William Shakespeare"],
  ["Nelson", "Nelson Rolihlahla Mandela"],
  ["Elizabeth", "Elizabeth Griscom Ross"],
  ["Mohandas", "Mohandas Karamchand Gandhi"],
  ["Abraham", "Abraham Lincoln"],
  ["Ronald", "Ronald Ulysses Swanson"],
]);

export const getIndividual = (name: Individuals): string => {
  const individual = individuals.get(name);
  if (!individual)
    throw new Error(`Individual with name: <${name}> not supported`);
  return individual;
};
