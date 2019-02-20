import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private socket: Socket) {
  }

  getAllSubject() {
    this.socket.emit('getSubjects');
  }

  allSubject() {
    return this.socket.fromEvent('subjects')
  }

  removeSubject(subjectId) {
    const token = localStorage.getItem('token');
    this.socket.emit('removeSubject', {subjectId, token})
  }

  updateSubject(subjectId, subject) {
    const token = localStorage.getItem('token');
    this.socket.emit('updateSubject', {subjectId, subject, token})
  }

  createSubject(subject) {
    const token = localStorage.getItem('token');
    this.socket.emit('createSubject', {subject, token})
  }
}
