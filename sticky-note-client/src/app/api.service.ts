import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './model/note';

const BASE_URL = 'http://localhost:2000';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient ) { }

  addNotes(note:Note):void{
    this.http.post(BASE_URL+'/notes', note).subscribe();
  }

  getNotes():Observable<any>{
    return this.http.get(BASE_URL+'/notes');
  }

  getNotesByTag(tag:string):Observable<any>{
    return this.http.get(`${BASE_URL}/notes/${tag}`)
  }

  getNote(id:number):Observable<any>{
    return this.http.get(`${BASE_URL}/note/${id}`)
  }

  updateNote(note:Note):void{
    this.http.put(`${BASE_URL}/notes/${note.id}`, note).subscribe();
  }

  deleteNote(id:number):void{
    this.http.delete(`${BASE_URL}/notes/${id}`).subscribe()
  }

}
