import db from "../config/db";
import { UserInterface } from "../interfaces/UserInterface";

//user
type CreateUserInput = Omit<UserInterface, "id">;
export const createUser = (user: CreateUserInput): UserInterface => {
    const stmt = db.prepare(
        `INSERT INTO users (username, email, password, address, phone, role) VALUES (?, ?, ?, ?, ?, ?)`,
    );
    const info = stmt.run(
        user.username,
        user.email,
        user.password,
        user.address ,
        user.phone ,
        user.role ?? "customer"
    );
    return { id: Number(info.lastInsertRowid), ...user };
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
type UpdateUserInput = Omit<UserInterface, "id">;

export const updateUserById = (id: number, user: Partial<UpdateUserInput>): UserInterface | null => {
    const existingUser=getUserById(id);
    const stmt = db.prepare( 
    `UPDATE users SET username = ?, email = ?, password = ?, address = ?, phone = ? WHERE id = ?`,
    );
    stmt.run(
        user.username ?? existingUser?.username,
        user.email ?? existingUser?.email,
        user.password ?? existingUser?.password,
        user.address ?? existingUser?.address,
        user.phone ?? existingUser?.phone,
        id
    );
    return getUserById(id);
};

//delete user by id
export const deleteUserById = (id: number): boolean => {
    const stmt = db.prepare<[number],{changes:number}>(`DELETE FROM users WHERE id = ?`);
    const result = stmt.run(id);

    if (result.changes === 0) {
    throw new Error("User not found");
  }
  return true


};


export default {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById
};