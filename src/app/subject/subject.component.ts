import {Component, Input, OnInit} from '@angular/core';
import {SubjectService} from "../services/subject.service";
import {Subject} from "../models/Subject";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{

  @Input() subject: Subject;
  id: number;
  subjectText: string;
  isRemoveClicked: boolean;
  isUpdateClicked: boolean;

  constructor(private subjectService: SubjectService) {
  }
  ngOnInit(): void {
    this.id = this.subject.id;
    this.subjectText = this.subject.subject

  }
  removeClicked() {
    this.isRemoveClicked = !this.isRemoveClicked
  }

  removeSubj(id) {
    this.subjectService.removeSubject(id)
  }

  updateClicked() {
    this.isUpdateClicked = !this.isUpdateClicked
  }

  updateSubject(updateForm, id) {
    const {subject: newSubjectText} = updateForm;
    this.subjectService.updateSubject(id, newSubjectText)
  }
}
