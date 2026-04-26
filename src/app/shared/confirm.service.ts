import { Injectable, signal } from '@angular/core';

export interface ConfirmState {
  open: boolean;
  message?: string;
  resolve?: (v: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  state = signal<ConfirmState>({ open: false });

  confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.state.set({ open: true, message, resolve });
    });
  }

  ok() {
    const s = this.state();
    if (s.resolve) s.resolve(true);
    this.state.set({ open: false });
  }

  cancel() {
    const s = this.state();
    if (s.resolve) s.resolve(false);
    this.state.set({ open: false });
  }
}
