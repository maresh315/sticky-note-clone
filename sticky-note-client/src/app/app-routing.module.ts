import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyNotesComponent } from './modify-notes/modify-notes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path:'', component: NotesComponent},
  {path:'note/:id', component:ModifyNotesComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
