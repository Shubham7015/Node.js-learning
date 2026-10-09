import {Router} from "express" 
import { healthCheck } from "../controllers/healthCheck.controller.ts";


const healthCheckRouter = Router() ; 

healthCheckRouter.route("/").get(healthCheck) ;


export  {healthCheckRouter }; 