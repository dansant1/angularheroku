import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferidosRoutingModule } from './referidos-routing.module';
import { ReferidosComponent } from './referidos.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ ReferidosComponent ],
  imports: [
    CommonModule,
    ReferidosRoutingModule,
    SharedModule
  ]
})
export class ReferidosModule { }
