import { firestore } from './firestore';
import { DocumentSnapshot } from 'firebase-admin/firestore';

export const fetchUserData = async (uid: string): Promise<User | null> => {
  if (!uid) throw new Error('User ID is required');

  const docSnapshot: DocumentSnapshot = await firestore
    .collection('users')
    .doc(uid)
    .get();

  return docSnapshot.exists
    ? ({ uid: docSnapshot.id, ...docSnapshot.data() } as User)
    : null;
};

interface User {
  uid: string;
  name: string;
}
