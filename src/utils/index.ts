import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const maxAge = 3 * 24 * 60 * 60 * 1000;
export const createToken = (email: string, id: string) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

export const generatePasswordHash = async (password: string) => {
  try {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};
