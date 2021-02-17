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
  title:string = '';
  content:string = '';
  tag:string = '';
  dummyText:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut urna malesuada, pellentesque felis quis, sodales velit. Curabitur scelerisque faucibus purus, nec sollicitudin magna fringilla vitae. Duis sit amet dui et lectus rhoncus commodo. In vel diam dictum, pretium augue ac, dictum justo. Nulla sit amet erat vitae erat congue rutrum eget et ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque quis quam ultricies, elementum justo sed, rhoncus dui.';
  tags:Array<string> = ['Personal','Work','Miscellaneous']
  currentRoute:string;
  formTitle:string;
  isModalOpen:boolean;
  isBack:boolean;
  message:string = 'Discard Current Changes?';
  isTextDirty:boolean;
  isTitleDirty:boolean;
  // isFormDirty:boolean;
  private currentNote:Note;
  isTagDirty: boolean;

  constructor(private apiService:ApiService, private router:Router, 
    private activated:ActivatedRoute) { }

  ngOnInit(): void {
    // this.isModalOpen = false;
    // this.activated.url.subscribe((data)=>{
    //   this.currentRoute = data[0].path;

    //   if(this.currentRoute === 'new-note'){
    //     this.formTitle = 'New Note'
    //   }else{
    //     this.formTitle = 'Edit Note';
    // })
    this.activated.params.subscribe(params =>{
      
      this.apiService.getNote(params.id).subscribe(note =>{
        this.title = note.title;
        this.content = note.content;
        this.tag = note.tag;

        this.currentNote = note;
        
      })
    })

    

  }

  onSave():void{
    let note:Note = new Note({
      title: this.title,
      content: this.content,
      tag: this.tag
    });
    
    if(this.currentRoute === 'new-note'){
      this.apiService.addNotes(note).subscribe({next:()=>this.router.navigate([''])});
    }else
      this.updateNote(note)
  }

  onReset($event:any, form:NgForm):void{
    $event.preventDefault();
    $event.stopPropagation();
    
    if(this.isFormDirty(this.isTitleDirty,this.isTextDirty,this.isTagDirty))
      this.isModalOpen=true
  }

  onBack(){
    if(this.isFormDirty(this.isTitleDirty,this.isTextDirty,this.isTagDirty)){
      this.isBack = true;
      this.isModalOpen = true;
    }else
      this.router.navigate(['']);
    
      
    
  }
  
  onAlertClick(bool:boolean, form?:NgForm){
    if(this.currentRoute === 'new-note')
      this.alertAction(bool, this.currentRoute, this.isBack);
    else
      this.alertAction(bool,this.currentRoute);
  }
  
  private updateNote(note:Note):void{
    note.id = this.currentNote.id
    this.apiService.updateNote(note).subscribe({next: ()=>this.router.navigate([''])});
  }

  private isFormDirty(isTitleDirty: boolean,isTextDirty: boolean,isTagDirty: boolean):boolean{
    let isFormDirty:boolean = ((isTitleDirty && isTextDirty && isTagDirty)||(isTitleDirty || isTextDirty || isTagDirty));

    return isFormDirty;
  }

  private alertAction(action:boolean, route:string, isBack:boolean = this.isBack){
    
    if(action){//confirm
      if(isBack){//back pressed
        this.router.navigate(['']);
      }else if(route === 'new-note'){//reset pressed on new note
        this.isModalOpen = false;
        this.title = null;
        this.content = null;
        this.tag = null;
        this.isTitleDirty = false;
        this.isTextDirty = false;
        this.isTagDirty = false;
      }else{//reset pressed on edit note
        this.isModalOpen=false;
        this.title = this.currentNote.title;
        this.content = this.currentNote.content;
        this.tag = this.currentNote.tag;
        this.isTitleDirty = false;
        this.isTextDirty = false;
        this.isTagDirty = false;
      }
    }else{//cancel
      this.isModalOpen=false;
      this.isBack = false;
    }
  }
}
