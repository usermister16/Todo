import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { ToastComponent } from './shared/toast.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastComponent, ConfirmDialogComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('todo_list');
  isScrolled = signal(false);

  private onScroll = () => this.isScrolled.set(window.scrollY > 6);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
