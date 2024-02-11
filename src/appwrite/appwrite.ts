import conf from '@/conf/config';
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.loginUserAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUserAccount({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {
      throw error;
    }
    return false;
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error: any) {
      console.log('getCurrentUser', error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await account.deleteSessions();
    } catch (error: any) {
      console.log('logout Error', error.message);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
