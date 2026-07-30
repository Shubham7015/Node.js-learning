export type pet = {
  id: number;
  name: string;
  species: string;
  breed: string;
  adopted: boolean;
  age: number;
  intakeDate: Date;
  adoptionDate?: Date;
  medicalRecord: {
    vaccinations: string[];
    weightKg: number;
    microchipId: string | null;
  };
  photo: string;
};

export const pets: pet[] = [
  {
    id: 1,
    name: "Tom",
    species: "cat",
    breed: "Pussy cat",
    adopted: false,
    age: 10,
    intakeDate: new Date("2024-06-15"),
    medicalRecord: {
      vaccinations: ["Rabbies", "Distemper"],
      weightKg: 18.4,
      microchipId: null,
    },
    photo: "abdbf",
  },
  {
    id: 2,
    name: "Jerry",
    species: "rat",
    breed: "Rat",
    adopted: false,
    age: 8,
    intakeDate: new Date("2024-01-01"),
    adoptionDate: new Date("2024-02-15"),
    medicalRecord: {
      vaccinations: ["Rabbies", "Distemper"],
      weightKg: 5,
      microchipId: null,
    },
    photo: "abdbf",
  },
  {
    id: 3,
    name: "Bob",
    species: "dog",
    breed: "PitBull",
    adopted: false,
    age: 25,
    intakeDate: new Date("2024-06-15"),
    medicalRecord: {
      vaccinations: ["Rabbies", "Distemper"],
      weightKg: 45,
      microchipId: null,
    },
    photo: "abdbf",
  },{
    id: 4,
    name: "Jerr",
    species: "rat",
    breed: "sypher",
    adopted: false,
    age: 8,
    intakeDate: new Date("2024-01-01"),
    adoptionDate: new Date("2024-02-15"),
    medicalRecord: {
      vaccinations: ["Rabbies", "Distemper"],
      weightKg: 5,
      microchipId: null,
    },
    photo: "abdbf",
  },
];
