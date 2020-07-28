import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediosPagoRoutingModule } from './mediosdepago-routing.module';
import { MediosPagoComponent } from './mediosdepago.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ MediosPagoComponent ],
  imports: [
    CommonModule, 
    MediosPagoRoutingModule,
    SharedModule
  ]
})
export class MediosPagoModule { }
