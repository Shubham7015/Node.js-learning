import type { Request, Response, NextFunction } from "express";

export const validateNumberById = (
  req: Request<{ id: string }>,
  res: Response<number | { message: string }>,
  next: NextFunction,
) => {
  const { id } = req.params;
  // ensure id is a string (req.params types can be string | string[])
  const idStr =
    typeof id === "string" ? id : Array.isArray(id) ? (id[0] ?? "") : "";

  // normalize and trim whitespace
  const normalizedId = idStr.trim();

  if (!/^\d+$/.test(normalizedId)) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  // attach normalized id back to params as string
  req.params.id = normalizedId;
  next();
};

export const validateAuthentication = (
    req: Request,
  res: Response,
  next: NextFunction
) => {
  // query lives on req.query, and values can be string | string[] | undefined
  const { password } = req.query as { password?: string | string[] };
  const pwd = (Array.isArray(password) ? password[0] ?? "" : password ?? "").trim();

  if (pwd !== "please") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
