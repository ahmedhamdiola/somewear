export interface UserInterface {
    id?: number;
    username: string;
    email: string;
    password: string;
    address?: string | null;
    phone?: string | null;
    role?: "customer" | "admin";
}