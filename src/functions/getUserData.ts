import { Request, Response } from 'express';
import { firestore } from '../../../shared/firestore';

export const getUserData = async (req: Request, res: Response) => {
  const uid = req.query.uid || '';

  try {
    if (!uid) {
      throw new Error('wrong request');
    }

    try {
      const docRef = await firestore.collection('users').doc(uid).get();
      if (docRef.exists) {
        const userData = { id: docRef.id, data: docRef.data() };
        res.status(200).json(userData);
        console.log('userData', userData);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
  }
};
