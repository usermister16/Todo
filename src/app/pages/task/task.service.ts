import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { Task } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly firestore = inject(Firestore);
  private readonly collectionName = 'tasks';
  private readonly auth = inject(Auth);

  async getTasks() {
    const userId = this.auth.currentUser?.uid;
    if (!userId) {
      throw new Error('Utilisateur non connecté');
    }
    const taskRef = collection(this.firestore, this.collectionName);
    const querySnapshot = query(taskRef, where('owner', '==', userId));
    return getDocs(querySnapshot).then((snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...(doc.data() as Task) });
      });
      return tasks;
    });
  }

  subscribeToTasks(callback: (tasks: Task[]) => void): () => void {
    const userId = this.auth.currentUser?.uid;
    if (!userId) {
      throw new Error('Utilisateur non connecté');
    }
    const taskRef = collection(this.firestore, this.collectionName);
    const q = query(taskRef, where('owner', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...(doc.data() as Task) });
      });
      callback(tasks);
    });
    return unsubscribe;
  }

  async getTaskById(taskId: string) {
    const taskDocRef = doc(this.firestore, this.collectionName, taskId);
    const snap = await getDoc(taskDocRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Task) };
  }

  async createTask(task: Partial<Task>) {
    try {
      const userId = this.auth.currentUser?.uid;
      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }
      const taskRef = collection(this.firestore, this.collectionName);
      const newTask = {
        ...task,
        owner: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = doc(taskRef);
      await setDoc(docRef, newTask);
      return { ...newTask, id: docRef.id };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(taskId: string, task: Partial<Task>) {
    const taskRef = collection(this.firestore, this.collectionName);
    const docRef = doc(taskRef, taskId);
    // ensure document exists to avoid accidental creates
    const existing = await getDoc(docRef);
    if (!existing.exists()) {
      throw new Error('Task not found');
    }
    const payload = { ...task, updatedAt: new Date() } as Partial<Task>;
    await updateDoc(docRef, payload);
    return { id: taskId, ...(payload as Task) } as Task;
  }

  async deleteTask(taskId: string) {
    const taskRef = collection(this.firestore, this.collectionName);
    await deleteDoc(doc(taskRef, taskId));
    return taskId;
  }
}
