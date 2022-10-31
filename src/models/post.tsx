import { IUser } from "./user";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    usersName?: string;
};
