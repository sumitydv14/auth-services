import { Router } from "express";
import { RefreshTokenController } from "./refresh-token.controller";

const refreshTokenRouter = Router();
const refreshTokenController = new RefreshTokenController();

refreshTokenRouter.post("/refresh", refreshTokenController.refreshToken);

refreshTokenRouter.post("/logout", refreshTokenController.logout);

export default refreshTokenRouter;
