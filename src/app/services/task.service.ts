import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task, Tasks } from '../core/models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';
  private http = inject(HttpClient);

  createTask(task: any): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getAllTasks(page: number, limit: number): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getCompletedTasks(page: number, limit: number): Observable<Tasks> {
    return this.http.get<Tasks>(
      `${this.apiUrl}/completed?page=${page}&limit=${limit}`
    );
  }

  getPendingTasks(page: number, limit: number): Observable<Tasks> {
    return this.http.get<Tasks>(
      `${this.apiUrl}/ongoing?page=${page}&limit=${limit}`
    );
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, task: any): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
