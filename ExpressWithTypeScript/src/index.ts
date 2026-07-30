import express from "express";
import type { Express, Request, Response } from "express";
import { pets, type pet } from "./db/pets.js";
import cors from "cors";

const app: Express = express();
app.use(cors());

const PORT: number = 8000;

type PetQueryParams = {
    species?:string,
    adopted?:boolean,
}

app.get(
  "/",
  (
    req: Request<{}, unknown, {},PetQueryParams>,
    res: Response<pet[] | { message: "Pet with current species not found" }>,
  ): Response | void => {
    const species = String(req.query.species).toLowerCase();
    if (species) {
      const new_pet = pets.filter(
        (obj: pet): boolean => obj.species.toLowerCase() === species,
      );
      if (new_pet.length == 0)
        return res
          .status(404)
          .json({ message: "Pet with current species not found" });
      return res.json(new_pet);
    }
    return res.status(200).json(pets);
  },
);
app.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<pet | { message: "No pet with current id " }>,
  ) => {
    // const id = req.params.id ;
    // const rawID = req.params.id ;
    // const parseId = Number(rawID) ;

    const id = req.params.id;

    const Pet: pet | undefined = pets.find(
      (ob: pet): boolean => ob.id.toString() === id,
    );

    if (!Pet)
      return res.status(404).json({ message: "No pet with current id " });
    return res.status(200).json(Pet);
  },
);
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Route not found!" });
});
app.listen(PORT, (): void => {
  console.log(`App is running on PORT ${PORT} successfully`);
});
