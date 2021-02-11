import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Note } from '../model/note';

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
  filterString:string;
  onClick:boolean;
  isSearch:boolean;

  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.onClick = false;
    this.notes = this.apiService.getNotes();
    
  }

  addNote():void{
    this.router.navigate(['new-note']);
  }
  onBack():void{
    this.isSearch = false;
    this.notes = this.apiService.getNotes();
  }
  filterNotes($event:any){
    this.preventDefaultEvents($event);
    let tag = this.filterString.charAt(0).toUpperCase()+this.filterString.slice(1);
    if(tag){
      this.notes = this.apiService.getNotesByTag(tag)
      this.isSearch = true;
    }else{
      this.onBack();
      
    }
  }

  editNote($event:any, note:Note):void{
    this.preventDefaultEvents($event);
    if($event.target.matches('span.btn-edit'))
      this.router.navigate([`note/${note.id}`]);

  }
  viewNote($event:any, note:Note):void{
    if(!($event.target.matches('span.btn-edit')||$event.target.matches('span.btn-close'))){
      this.selectedNote = note;
      this.viewNoteElementId = (this.selectedNote) ? '#view-note-modal':'javascript:void(0);';
    }
  }
  
  deleteNote($event:any, id:number):void{
    // this.preventDefaultEvents($event);
    if($event.target.matches('span.btn-close')){
      this.apiService.deleteNote(id).subscribe(()=>this.router.navigate(['']));
    }
  }

  getbgColor(tag:string):string{
    switch (tag) {
      case 'Personal':
        return tag.toLowerCase();
      case 'Work':
        return tag.toLowerCase();
      case 'Miscellaneous':
        return tag.toLowerCase();
      default:
        break;
    }
  }

  private preventDefaultEvents($event:any):void{
    $event.stopPropagation();
    $event.preventDefault();
  }
}
