import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toasts toasts--top-center" *ngIf="service.toasts().length > 0">
      <div class="toast" *ngFor="let t of service.toasts()" [class.toast--success]="t.type==='success'" [class.toast--error]="t.type==='error'">
        <div class="toast__message">{{ t.message }}</div>
        <button class="toast__close" aria-label="Fermer" (click)="service.dismiss(t.id)">×</button>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(public service: ToastService) {}
}
