import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="confirm-overlay" *ngIf="confirm.state().open">
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-label="Confirmation">
        <div class="confirm-body">
          <p class="confirm-message">{{ confirm.state().message }}</p>
        </div>
        <div class="confirm-actions">
          <button class="btn btn--ghost" (click)="confirm.cancel()">Annuler</button>
          <button class="btn btn--primary" (click)="confirm.ok()">Confirmer</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(public confirm: ConfirmService) {}
}
