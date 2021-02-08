import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyNotesComponent } from './modify-notes/modify-notes.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path:'', component: NotesComponent},
  {path:'new-note', component:ModifyNotesComponent},
  {path:'note/:id', component:ModifyNotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
