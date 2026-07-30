import { pets, type pet } from "../db/pets.js";
import type { Request, Response } from "express";

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

export const getpets = (
  req: Request<{}, unknown, {}, PetQueryParams>,
  res: Response<pet[] | { message: string }>,
): Response | void => {
  const { adopted, species, minAge, maxAge } = req.query;
  let filteredArray: pet[] = pets;

  if (species) {
    filteredArray = filteredArray.filter(
      (obj: pet): boolean => obj.species.toLowerCase() === species,
    );
  }

  if (adopted) {
    const isAdopted: boolean = adopted === "true";
    filteredArray = filteredArray.filter(
      (obj: pet): boolean => obj.adopted === isAdopted,
    );
  }
  if (minAge) {
    filteredArray = filteredArray.filter(
      (obj: pet): boolean => obj.age >= Number(minAge),
    );
  }
  if (maxAge) {
    filteredArray = filteredArray.filter(
      (obj: pet): boolean => obj.age <= Number(maxAge),
    );
  }
  if (filteredArray.length === 0) {
    return res
      .status(404)
      .json({ message: "No pets found matching the given filters" });
  }

  return res.status(200).json(filteredArray);
};


export const getpetbyid = (
    req: Request<{ id: string }>,
    res: Response<pet | { message: "No pet with current id " }>,
  ) => {
    const id = req.params.id;

    const Pet: pet | undefined = pets.find(
      (ob: pet): boolean => ob.id.toString() === id,
    );

    if (!Pet)
      return res.status(404).json({ message: "No pet with current id " });
    return res.status(200).json(Pet);
  };

