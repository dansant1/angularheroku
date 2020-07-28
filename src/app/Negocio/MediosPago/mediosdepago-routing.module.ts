import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediosPagoComponent } from './mediosdepago.component';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: MediosPagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediosPagoRoutingModule { }
