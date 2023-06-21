import { Request, Response } from 'express';
import { firestore } from '../shared/firestore';

export const updateUserData = async (req: Request, res: Response) => {
  const uid = req.query.uid || '';

  try {
    if (!uid) {
      throw new Error('wrong request');
    }

    try {
      const docRef = await firestore.doc(`users/${uid}`).get();
      if (docRef.exists) {
        const updateData = {
          age: 20,
        };

        await firestore.doc(`users/${uid}`).update(updateData);
        res.status(200).json('Update successfully');
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
