import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../types';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
  standalone: true
})
export class TaskItem {
  @Input() task: Task | undefined;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  onEdit() {
    if (this.task) this.edit.emit(this.task);
  }

  onDelete() {
    if (this.task) this.delete.emit(this.task);
  }
}
