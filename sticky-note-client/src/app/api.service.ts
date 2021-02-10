import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from './model/note';

const BASE_URL = 'http://localhost:2000';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient ) { }

  addNotes(note:Note){
    return this.http.post(BASE_URL+'/notes', note);
  }

  getNotes():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(BASE_URL+'/notes')
  }

  getNotesByTag(tag:string):Observable<Array<Note>>{
    let notesObservable:Observable<Array<Note>> = this.getNotes();
    return notesObservable.pipe(
      map(notes=>{
        return notes.filter(note=>note.tag === tag)
      })
    )
    
  }

  getNote(id:number):Observable<Note>{
    return this.http.get<Note>(`${BASE_URL}/note/${id}`)
  }

  updateNote(note:Note):void{
    this.http.post(`${BASE_URL}/notes/${note.id}`, note).subscribe();
  }

  deleteNote(id:number):void{
    this.http.delete(`${BASE_URL}/notes/${id}`).subscribe()
  }

}
