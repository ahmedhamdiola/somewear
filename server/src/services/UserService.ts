import { UserInterface } from "../interfaces/UserInterface";
import UserRepository from "../repository/UserRepository";
import { generateToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hash";

export const registerUserService = async (user: UserInterface) => {
    //validation
    if (!user.username || user.username.trim() === "") {
        throw new Error("Username is required");
    }
    if (!user.email || user.email.trim() === "") {
        throw new Error("Email is required");
    }
    if (!user.password || user.password.trim() === "") {
        throw new Error("Password is required");
    }


    const existingUser = UserRepository.getUserByEmail(user.email);
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = await hashPassword(user.password);
    const newUser = UserRepository.createUser({
        ...user,
        password: hashedPassword
    });
    const token = generateToken({
        id: newUser.id,
        role: newUser.role,
    });
    const { password, ...safeUser } = newUser;
    return { user: safeUser, token };
};


export const loginUserService = async (email: string, password: string) => {
    if (!email || email.trim() === "") {
        throw new Error("Email is required");
    }
    if (!password || password.trim() === "") {
        throw new Error("Password is required");
    }
    const user = UserRepository.getUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = generateToken({ id: user.id, role: user.role });
    const { password: _, ...safeUser } = user;
    return { safeUser, token };
};

export const getUserByIdService = (id: number) => {
    if (id <= 0 || !id) {
        throw new Error("Invalid user ID");
    }
    const user = UserRepository.getUserById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const { password, ...safeUser } = user
    return safeUser;
}

export const updateUserByIdService = async (id: number, user: Partial<UserInterface>) => {
    if (id <= 0 || !id) {
        throw new Error("Invalid user ID");
    }
    if (user.username && user.username.trim() === "") {
        throw new Error("Username cannot be empty");
    }
    if (user.address && user.address.trim() === "") {
        throw new Error("Address cannot be empty");
    }
    if (user.phone && user.phone.trim() === "") {
        throw new Error("Phone cannot be empty");
    }
    if (user.password) {
        user.password = await hashPassword(user.password); //new pass hashed
    }
    const updatedUser = UserRepository.updateUserById(id, user);
    if (!updatedUser) {
        throw new Error("User not found");
    }
    const { password, ...safeUser } = updatedUser
    return safeUser;
}

export const deleteUserByIdService = (id: number) => {
    if (id <= 0 || !id) {
        throw new Error("Invalid user ID");
    }
    const result = UserRepository.deleteUserById(id);
    return result;
}


export const getAllUsersService = () => {
    return UserRepository.getAllUsers();
}

export const logoutService=()=>{
    return{message:"Logged out successfully"}
}

export default {
    registerUserService,
    loginUserService,
    getUserByIdService,
    updateUserByIdService,
    deleteUserByIdService,
    getAllUsersService,
    logoutService
};