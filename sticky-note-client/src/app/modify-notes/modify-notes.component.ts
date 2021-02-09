import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Note } from '../model/note';

@Component({
  selector: 'app-modify-notes',
  templateUrl: './modify-notes.component.html',
  styleUrls: ['./modify-notes.component.scss']
})
export class ModifyNotesComponent implements OnInit {
  title:string;
  content:string;
  tag:string;
  dummyText:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut urna malesuada, pellentesque felis quis, sodales velit. Curabitur scelerisque faucibus purus, nec sollicitudin magna fringilla vitae. Duis sit amet dui et lectus rhoncus commodo. In vel diam dictum, pretium augue ac, dictum justo. Nulla sit amet erat vitae erat congue rutrum eget et ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque quis quam ultricies, elementum justo sed, rhoncus dui.';
  tags:Array<string> = ['Personal','Work','Miscellaneous']
  currentRoute:string;
  formTitle:string;
  // isModalOpen:boolean;
  // isConfirmed:boolean;
  message:string = 'Discard Current Changes?';
  private currentNote:Note;

  constructor(private apiService:ApiService, private router:Router, 
    private activated:ActivatedRoute) { }

  ngOnInit(): void {
    // this.isModalOpen = false;
    this.activated.params.subscribe(params =>{
      this.apiService.getNote(params.id).subscribe(note =>{
        this.title = note.title;
        this.content = note.content;
        this.tag = note.tag;

        this.currentNote = note;
        
      })
    })

    this.activated.url.subscribe((data)=>{
      this.currentRoute = data[0].path;

      (this.currentRoute === 'new-note')?
        this.formTitle = 'New Note':
        this.formTitle = 'Edit Note';
    })

  }

  onSave():void{
    let note:Note = new Note({
      title: this.title,
      content: this.content,
      tag: this.tag
    });
    
    if(this.currentRoute === 'new-note'){
      this.apiService.addNotes(note);
      this.router.navigate([''])
    }else
      this.updateNote(note)
  }

  onReset($event:any, form:NgForm):void{
    $event.preventDefault();
    $event.stopPropagation();
    // this.isModalOpen=true
    if(this.currentRoute === 'new-note')
      form.resetForm();
    else{
      this.title = this.currentNote.title;
      this.content = this.currentNote.content;
      this.tag = this.currentNote.tag;
    }
    
    
  }

  onBack(){
    // this.isModalOpen = true;
    // if(this.isConfirmed)
      this.router.navigate(['']);
    
  }
  
  onModalClick(bool:boolean, form:NgForm){
    if(this.currentRoute === 'new-note')
      form.resetForm();
    else{
      this.title = this.currentNote.title;
      this.content = this.currentNote.content;
      this.tag = this.currentNote.tag;
    }
    // if(bool){
    //   this.isConfirmed=true
    //   this.isModalOpen = false
    // }else
    //   this.isModalOpen=false
    
  }
  
  private updateNote(note:Note):void{
    note.id = this.currentNote.id
    this.apiService.updateNote(note);
    this.router.navigate([''])
  }

}
