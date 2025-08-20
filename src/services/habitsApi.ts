import { db, habitsCollection } from '@services/firebase';
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export const fetchHabits = async (userId: string) => {
  const q = query(habitsCollection, where('userId', '==', userId));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    userId: doc.data().userId,
    targetCount: doc.data().targetCount,
    currentCount: doc.data().currentCount,
    completedDates: doc.data().completedDates,
    description: doc.data().description,
  }));
};

export const addHabit = async (habitData: {
  title: string;
  userId: string;
  targetCount: number;
  description?: string;
}) => {
  await addDoc(habitsCollection, habitData);
};

export const updateHabit = async (habitId: string, newData: object) => {
  const habitRef = doc(db, 'habits', habitId);
  await updateDoc(habitRef, newData);
};

export const deleteHabit = async (habitId: string) => {
  await deleteDoc(doc(db, 'habits', habitId));
};
