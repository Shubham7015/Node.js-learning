import { type Request, type Response } from "express";
import { ApiResponse } from "../utils/api-response.ts";
import { asyncHandler } from "../utils/async-handler.ts";
// const healthCheck = (_req: Request, res: Response): void => {
//   try {
//     // api response take data statusCode message="success"
//     res.status(200).json(new ApiResponse({message:"Server is running"},200));
//   } catch (error) {

//   }
// };

const healthCheck = asyncHandler(async (_req: Request, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse(200,{ message: "Server in running successfully" }));
});

export { healthCheck };
