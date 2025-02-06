import { Request, Response } from 'express';
import { firestore } from '../shared/firestore';
import { generateResponse } from '../shared/response';
import { fetchUserData } from '../shared/fetchUserData';

export const deleteUserData = async (req: Request, res: Response) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json(generateResponse('User ID is required'));
  }

  try {
    const userData = await fetchUserData(uid as string);

    if (userData) {
      await firestore.collection('users').doc(uid).delete();

      return res
        .status(200)
        .json(generateResponse('Delete user data successfully', true));
    }

    return res.status(404).json(generateResponse('User not found'));
  } catch (error) {
    console.error('Error deleting user data:', error);
    return res.status(500).json(generateResponse('Internal server error'));
  }
};
