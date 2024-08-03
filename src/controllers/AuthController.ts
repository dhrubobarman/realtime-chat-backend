import { NextFunction, Request, Response } from 'express';
import User from '../models/UserModel';
import { createToken, generatePasswordHash, maxAge, verifyPassword } from '../utils';
import { loginSchema } from '../zodSchemas/AuthSchema';
import { updateProfileSchema } from '../zodSchemas/UpdateProfileSchema';

export const signup = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = loginSchema.safeParse(request.body);
    if (!data.success) return response.status(400).json({ message: data.error.format() });
    const { email, password } = data.data;
    const hashedPassword = await generatePasswordHash(password);
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) return response.status(400).json({ message: 'User already exist' });
    const user = await User.create({ email, password: hashedPassword });
    response.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    });
    return response.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileSetup: user.profileSetup
      }
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = loginSchema.safeParse(request.body);
    if (!data.success) return response.status(400).json({ message: data.error.format() });
    const { email, password } = data.data;
    const hashedPassword = await generatePasswordHash(password);
    const user = await User.findOne({ email });
    if (!user) return response.status(400).json({ message: 'User not found' });
    const match = await verifyPassword(password, user.password);
    if (!match) return response.status(400).json({ message: 'Invalid credentials' });
    response.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    });
    return response.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileSetup: user.profileSetup,
        image: user.image,
        color: user.color
      }
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserInfo = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userData = await User.findById(request.user?.id);
    if (!userData) return response.status(404).json({ message: 'User not found' });

    return response.status(200).json({
      message: 'User info fetched successfully',
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileSetup: userData.profileSetup,
        image: userData.image,
        color: userData.color
      }
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = updateProfileSchema.safeParse(request.body);
    if (!data.success) return response.status(400).json({ message: data.error.format() });
    const { color, firstName, lastName } = data.data;
    const userData = await User.findByIdAndUpdate(
      request.user?.id,
      { color, firstName, lastName, profileSetup: true },
      { new: true, runValidators: true }
    );

    if (!userData) return response.status(404).json({ message: 'User not found' });

    return response.status(200).json({
      message: 'User info updated successfully',
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileSetup: userData.profileSetup,
        image: userData.image,
        color: userData.color
      }
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};
