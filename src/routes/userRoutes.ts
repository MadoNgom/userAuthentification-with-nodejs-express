import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.configRoutes();
  }
  private configRoutes() {
    // controller les acces et les permissions
    this.router.post(
      "/",
      this.userController.register.bind(this.userController)
    );
    this.router.post(
      "/login",
      this.userController.login.bind(this.userController)
    );
  }
}
