import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../services/subject.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects = [];
  isAddClicked: boolean = false;

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.subjectService.getAllSubject();
    this.subjectService.allSubject().subscribe((subjects: any) => {
      this.subjects = subjects
    })
  }

  addClick() {
    this.isAddClicked = !this.isAddClicked
  }

  createSubject(form) {
    const {subject} = form;
    this.subjectService.createSubject(subject)
  }
}
