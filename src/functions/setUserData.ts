import { Request, Response } from 'express';
import { firestore } from '../shared/firestore';
import { DocumentReference } from 'firebase-admin/firestore';
import { generateResponse } from '../shared/response';

export const setUserData = async (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json(generateResponse('Invalid request body'));
  }

  const { name, ...userData } = req.body;

  if (!name) {
    return res.status(400).json(generateResponse('User name is required'));
  }

  try {
    const docRef: DocumentReference = firestore.collection('users').doc();

    await docRef.set({
      uid: docRef.id,
      name: name,
      ...userData,
    });

    return res
      .status(201)
      .json(generateResponse('Add user data successfully', true));
  } catch (error) {
    console.error('Error writing user data:', error);
    return res.status(500).json(generateResponse('Internal server error'));
  }
};
