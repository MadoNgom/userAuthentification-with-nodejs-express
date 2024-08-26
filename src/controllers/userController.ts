import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import AuthService from "../utils/jwt";

export class UserController {
  private userService!: UserService;

  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        this.userService = new UserService(AppDataSource.getRepository(User));
      })
      .catch((error) => console.log(error));
  }
  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(req.body);

      const cryptPassword = bcrypt.hashSync(data.password, 10);
      // on instancie le user
      const user = new User();
      user.name = data.name;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = cryptPassword;

      const newUser = await this.userService.create(user);
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Error serveur" });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "L'adresse email et le mot de passe sont requis." });
    }

    try {
      const user = await this.userService.filterUser({ email });

      if (!user) {
        return res.status(401).json({ message: "Adresse email incorrecte." });
      }

      const passwordVerif = await bcrypt.compare(password, user.password);

      if (!passwordVerif) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      const token = AuthService.generateTokenForUser(user);
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur." });
    }
  }

  // async login(req: Request, res: Response) {
  //   try {
  //     const { email, password } = req.body;
  //     if (!email || !password) {
  //       return res.status(400).json({ message: "no valid input" });
  //     }
  //     const user = await this.userService.filterUser({ email });
  //     if (!user) {
  //       return res.status(401).json({ message: "user does not exists" });
  //     }
  //     const passwordVerif = await bcrypt.compare(password, user.password);
  //     if(passwordVerif){

  //     }
  //     //  const verifyPassword = await bcrypt.compare(password, user.password);
  //   } catch (error) {}
  // }
}
