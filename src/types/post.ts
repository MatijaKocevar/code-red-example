import { User } from "./user";

export interface Post {
    uuid: string;
    user: User;
    title: string;
    content: string;
}
