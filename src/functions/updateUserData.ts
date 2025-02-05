import { Request, Response } from 'express';
import { firestore } from '../shared/firestore';
import { DocumentReference } from 'firebase-admin/firestore';
import { generateResponse } from '../shared/response';
import { fetchUserData } from '../shared/fetchUserData';

export const updateUserData = async (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json(generateResponse('Invalid request body'));
  }

  const { uid, ...updateData } = req.body;

  if (!uid) {
    return res.status(400).json(generateResponse('User ID is required'));
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json(generateResponse('No update data provided'));
  }

  try {
    const userData = await fetchUserData(uid as string);

    if (userData) {
      const docRef: DocumentReference = firestore.collection('users').doc(uid);
      await docRef.update(updateData);

      return res
        .status(200)
        .json(generateResponse('Update user data successfully', true));
    }

    return res.status(404).json(generateResponse('User not found'));
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json(generateResponse('Internal server error'));
  }
};
