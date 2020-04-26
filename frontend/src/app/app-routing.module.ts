import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';


const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: '/lists' },
  { path: "new-list", component: NewListComponent },
  { path: "lists", component: TaskViewComponent },
  { path: "lists/:listId", component: TaskViewComponent },
  { path: "new-task/:listId", component: NewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
