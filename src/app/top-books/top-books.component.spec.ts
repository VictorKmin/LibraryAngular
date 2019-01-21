import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBooksComponent } from './top-books.component';

describe('TopBooksComponent', () => {
  let component: TopBooksComponent;
  let fixture: ComponentFixture<TopBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
