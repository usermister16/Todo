import { Component, EventEmitter, effect, inject, input, Output } from '@angular/core';
import { Task } from '../../../types';
import { ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../pages/task/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  standalone: true
})
export class TaskForm {

  @Output() saved = new EventEmitter<Task | null>();

  currentTask = input<Task|undefined>({
    title: '',
    description: '',
    completed: false,
  });

  is_edit_mode = input<boolean>(false);

  taskForm = new FormGroup({
    title: new FormControl(this.currentTask()?.title || '',[Validators.required,Validators.minLength(2)]),
    description: new FormControl(this.currentTask()?.description || ''),
    completed: new FormControl(this.currentTask()?.completed || false),
  });

  private readonly taskService = inject(TaskService);

  constructor() {
    // Sync form when parent updates `currentTask`
    effect(() => {
      const t = this.currentTask();
      if (!t) {
        this.taskForm.reset({ title: '', description: '', completed: false });
        return;
      }
      this.taskForm.setValue({
        title: t.title || '',
        description: t.description || '',
        completed: !!t.completed,
      });
    });
  }

  async onSubmit() {
    if (this.taskForm.invalid) {
      console.log('Form is invalid:', this.taskForm.errors);
      return;
    }
    const taskData = this.taskForm.value;

    // Prefer update when we have an id (more robust than relying only on the edit flag)
    const existingId = this.currentTask()?.id;
    try {
      if (existingId) {
        const updated = await this.taskService.updateTask(existingId, taskData);
        console.log('Task updated successfully', updated);
        this.saved.emit(updated);
      } else {
        const created = await this.taskService.createTask(taskData);
        console.log('Task created successfully', created);
        this.taskForm.reset({ title: '', description: '', completed: false });
        this.saved.emit(created as Task);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      this.saved.emit(null);
    }
  }

}
