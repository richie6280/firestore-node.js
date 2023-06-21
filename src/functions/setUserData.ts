import { Request, Response } from 'express';
import { firestore } from '../shared/firestore';

export const setUserData = async (req: Request, res: Response) => {
  try {
    const data = {
      id: 3,
      name: 'test',
    };

    const docRef = firestore.collection('users').doc();
    await docRef.set(data);
    console.log('Document successfully written with ID:', docRef.id);
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
