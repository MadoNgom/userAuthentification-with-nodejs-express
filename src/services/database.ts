import { AppDataSource } from "../data-source";

export class Database {
  constructor() {
    this.initializeDatabase();
  }
  private async initializeDatabase() {
    try {
      await AppDataSource.initialize();
      console.log("TypeORM works and init well in the db");
    } catch (error) {
      console.log(error);
    }
  }
}
