export interface UserInterface {
    id?: number;
    username: string;
    email: string;
    password: string;
    address: string ;
    phone: string ;
    role?: "customer" | "admin";
}