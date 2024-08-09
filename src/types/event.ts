export interface Event {
    uuid: string;
    user: {
        uuid: string;
        firstName: string;
        lastName: string;
    };
    title: string;
    probability: number;
}
