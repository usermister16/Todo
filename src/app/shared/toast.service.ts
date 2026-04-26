import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  private idCounter = 0;

  show(message: string, type: ToastType = 'info', duration = 3500) {
    const id = `toast-${++this.idCounter}`;
    const toast: Toast = { id, message, type, duration };
    this.toasts.update(arr => [...arr, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  dismiss(id: string) {
    this.toasts.update(arr => arr.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
