import { Request, Response } from 'express';
import { generateResponse } from '../shared/response';
import { fetchUserData } from '../shared/fetchUserData';

export const getUserData = async (req: Request, res: Response) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json(generateResponse('User ID is required'));
  }

  try {
    const userData = await fetchUserData(uid as string);

    return userData
      ? res
          .status(200)
          .json(generateResponse('Get user data successfully', true, userData))
      : res.status(404).json(generateResponse('User not found'));
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json(generateResponse('Internal server error'));
  }
};
