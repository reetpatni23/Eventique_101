'use client';

import {
  Client,
  Account,
  Models,
  ID,
  Databases,
  Storage,
} from 'appwrite';
import { User } from './interface';

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
  bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;
  regDbId: string = `${process.env.NEXT_PUBLIC_REGDB}`;

  client: Client = new Client();
  account: Account = new Account(this.client);
  databases: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  // Google OAuth login
  googlelog(): void {
    try {
      this.account.createOAuth2Session(
        'google',
        `${process.env.NEXT_PUBLIC_APPURL}/login/sucess`,
        `${process.env.NEXT_PUBLIC_APPURL}/login/failure`,
      );
      this.getCurUser();
    } catch (error) {
      console.log(error);
    }
  }

  // GitHub OAuth login
  githublog(): void {
    try {
      this.account.createOAuth2Session(
        'github',
        `${process.env.NEXT_PUBLIC_APPURL}/login/sucess`,
        `${process.env.NEXT_PUBLIC_APPURL}/login/failure`,
      );
      this.getCurUser();
    } catch (error) {
      console.log(error);
    }
  }

  // Get current logged in user
  getCurUser(): void {
    this.account
      .get()
      .then((res) => {
        this.user = res;
        localStorage.setItem('userInfo', JSON.stringify(this.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Email signup
  emailSignUp(name: string, email: string, password: string): void {
    try {
      this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.log(error);
    }
  }

  // Email login
  emailLogin(email: string, password: string): Promise<Models.Session> {
    return this.account.createEmailSession(email, password);
  }

  // Sign out
  signOut(id: string): boolean {
    try {
      this.account.deleteSession(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Create Event (no sponsors)
  createEvent(
    eventname: string,
    description: string,
    banner: File,
    hostname: string,
    eventdate: string,
    email: string,
    country: string,
    address: string,
    city: string,
    state: string,
    postal: string,
    audience: string,
    type: string,
    attendees: number,
    price: number,
    tech: string,
    agenda: string,
    approval: string,
    twitter: string,
    website: string,
    linkedin: string,
    instagram: string,
  ): Promise<string> {
    try {
      return this.storage
        .createFile(this.bannerBucketId, ID.unique(), banner)
        .then((res) => {
          return this.databases.createDocument(
            this.databaseId,
            this.activeCollId,
            ID.unique(),
            {
              eventname,
              description,
              url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
              hostname,
              eventdate,
              email,
              country,
              address,
              city,
              state,
              postal,
              audience,
              type,
              attendees,
              price,
              tech,
              agenda,
              approval,
              created: JSON.parse(localStorage.getItem('userInfo') || '{}').$id,
              twitter,
              website,
              linkedin,
              instagram,
              registrations: [],
            },
          );
        })
        .then(() => Promise.resolve('sucess'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { AppwriteConfig };
