import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Note } from '../model/note';
import { SelectedNoteService } from '../selected-note.service';

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

  constructor(private apiService:ApiService, private router:Router, 
    private selectedService:SelectedNoteService, private activated:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.selectedService.selected){
      this.title = this.selectedService.selected.title;
      this.content = this.selectedService.selected.content;
      this.tag = this.selectedService.selected.tag;
      this.selectedService.resetSelected()
    }

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
      this.router.navigate(['']);
    }else
      this.updateNote(note)
  }

  private updateNote(note:Note):void{
    this.apiService.updateNote(note);
    this.router.navigate(['']);
  }
}
