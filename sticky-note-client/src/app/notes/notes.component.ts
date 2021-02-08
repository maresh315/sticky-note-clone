import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Note } from '../model/note';
import { SelectedNoteService } from '../selected-note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes:Observable<any>;
  title:string;
  content:string;
  tag:string;
  addBtn:string;
  selectedNote:Note;
  viewNoteElementId:string;

  constructor(private apiService:ApiService, private router:Router, private selectedService:SelectedNoteService) { }

  ngOnInit(): void {
    this.notes = this.apiService.getNotes();
    
  }

  addNote():void{
    this.selectedService.resetSelected();
    this.router.navigate(['new-note']);
  }
  
  editNote($event:any, note:Note):void{
    $event.stopPropagation();
    $event.preventDefault();
    console.log($event)
    if($event.target.matches('span.btn-edit')){
      this.selectedService.selected = note
      this.router.navigate([`note/${note.id}`]);
    }
  }
  viewNote($event:any, note:Note):void{
    console.log($event)
    if(!($event.target.matches('span.btn-edit')||$event.target.matches('span.btn-close'))){
      this.selectedNote = note;
      this.selectedService.selected = note;
      this.viewNoteElementId = (this.selectedNote) ? '#view-note-modal':'javascript:void(0);';
    }
  }
  
  deleteNote($event:any, id:number):void{
    if($event.target.matches('span.btn-close')){
      this.apiService.deleteNote(id);
    }
  }

  getbgColor(tag:string){
    switch (tag) {
      case 'Personal':
        return tag.toLowerCase();
      case 'Work':
        return tag.toLowerCase();
      case 'Miscellaneous':
        return tag.toLowerCase();
    }
  }
}
