import db from "../config/db";
import { UserInterface } from "../interfaces/UserInterface";

//user
export const createUser = (user: UserInterface): UserInterface => {
    const stmt = db.prepare<[string, string, string, string | null, string | null, "customer" | "admin"], UserInterface>(
        `INSERT INTO users (username, email, password, address, phone, role) VALUES (?, ?, ?, ?, ?, ?)`,
    );
    const info = stmt.run(
        user.username,
        user.email,
        user.password,
        user.address ?? null,
        user.phone ?? null,
        user.role ?? "customer"
    );
    return { id: info.lastInsertRowid as number, ...user };
};

// get user by email
export const getUserByEmail = (email: string): UserInterface | null => {
    const stmt = db.prepare<[string], UserInterface | null>(`SELECT * FROM users WHERE email = ?`);
    const user = stmt.get(email);
    return user || null;
};

// get user by id
export const getUserById = (id: number): UserInterface | null => {
    const stmt = db.prepare<[number], UserInterface | null>(`SELECT * FROM users WHERE id = ?`);
    const user = stmt.get(id);
    return user || null;
};

//update user by id
export const updateUserById = (id: number, user: Partial<UserInterface>): UserInterface | null => {
    const existingUser = getUserById(id);
    if (!existingUser) {
        return null;
    }
    const stmt = db.prepare<[string, string, string, string | null, string | null, number], UserInterface>(
        `UPDATE users SET username = ?, email = ?, password = ?, address = ?, phone = ? WHERE id = ?`,
    );
    stmt.run(
        user.username ?? existingUser.username,
        user.email ?? existingUser.email,
        user.password ?? existingUser.password,
        user.address ?? existingUser.address ?? "",
        user.phone ?? existingUser.phone ?? "",
        id
    );
    return getUserById(id);
};

//delete user by id
export const deleteUserById = (id: number): { message: string } => {
    const existingUser = getUserById(id);
    if (!existingUser) {
        return { message: "User not found" };
    }
    const stmt = db.prepare<[number],  void>(`DELETE FROM users WHERE id = ?`);
    const result = stmt.run(id);


    return result.changes > 0 ? { message: "User deleted successfully" } : { message: "Failed to delete user" };
};


export default {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById
};