import bcrypt from "bcrypt";

const getPepper = () => process.env.PASSWORD_PEPPER || "";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password + getPepper(), saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password + getPepper(), hash);

};

export default {
  hashPassword,
  comparePassword,
};
