// Pour l'id de l'utilisateur connecter
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import AuthService from "./jwt";

export const authenticateUser = (headerAuth: string | undefined): number => {
  if (!headerAuth) {
    throw new Error("Utilisateur non authentifié");
  }

  const userId = AuthService.getUserId(headerAuth);
  if (userId < 0) {
    throw new Error("Utilisateur non authentifié");
  }

  return userId;
};

export const fetchUser = async (userId: number): Promise<User | null> => {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.findOne({ where: { id: userId } });
};
