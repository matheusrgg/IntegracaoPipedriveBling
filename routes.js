import express from "express";
const router = express.Router();

import { integrate } from "./controllers/IntegrationController.js"

router.get("/orders", integrate)

export default router;