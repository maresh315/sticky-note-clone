import { Injectable } from '@angular/core';
import { Note } from './model/note';

@Injectable({
  providedIn: 'root'
})
export class SelectedNoteService {

  selected:Note;

  constructor() { }

  resetSelected():void{
    this.selected = null;
  }
}
