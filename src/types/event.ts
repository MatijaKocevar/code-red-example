import { User } from "./user";

export interface Event {
    uuid: string;
    user: User;
    title: string;
    probability: number;
}
