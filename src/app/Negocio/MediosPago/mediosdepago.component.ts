import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Negocio } from '../../_models/negocio.model';
import { Banco } from '../../_models/bancos.model';
import {DomSanitizer} from '@angular/platform-browser';
import { AuthenticationService } from '../../_services/authentication.service';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'administracion-empresas',
  templateUrl: './mediosdepago.component.html',
})
export class MediosPagoComponent implements OnInit {

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

  @ViewChild('content') templateEditarRegistro: TemplateRef<any>;
  @ViewChild('mBorrar') templateBorrarRegistro: TemplateRef<any>;

  modalReference: any;
  mainObject$ = new Negocio();
  currentUser$ : any;

  lukitaCollapsed = true;
  plinCollapsed = true;
  yapeCollapsed = true;
  transferCollapsed = true;

  constructor( private router: Router, private sanitizer: DomSanitizer, private dataService : DataService, private modalService: NgbModal, private authenticationService: AuthenticationService ){ }

  regresar(){
    this.authenticationService.redireccionarUsuario(this.currentUser$);
  }

  agregarTransferencia(){
    this.mainObject$.transferencias.push(
      new Banco()
    );
  }

  eliminarTransferencia(index){
    this.mainObject$.transferencias.splice(index, 1);
  }

  guardar(){
    if( this.mainObject$.pago_yape ){
      if( !this.mainObject$.pago_telefono_yape ){
        this.dataService.generalAlert( { "message" : "Completa el teléfono para el pago de Yape.", "status" : "error" } );
        return;
      }
      if( !this.mainObject$.pago_beneficiario_yape ){
        this.dataService.generalAlert( { "message" : "Completa el beneficiario para el pago de Yape.", "status" : "error" } );
        return;
      }
    }

    if( this.mainObject$.pago_lukita ){
      if( !this.mainObject$.pago_telefono_lukita ){
        this.dataService.generalAlert( { "message" : "Completa el teléfono para el pago de Lukita.", "status" : "error" } );
        return;
      }
      if( !this.mainObject$.pago_beneficiario_lukita ){
        this.dataService.generalAlert( { "message" : "Completa el beneficiario para el pago de Lukita.", "status" : "error" } );
        return;
      }
    }

    if( this.mainObject$.pago_plin ){
      if( !this.mainObject$.pago_telefono_plin ){
        this.dataService.generalAlert( { "message" : "Completa el teléfono para el pago de Plin.", "status" : "error" } );
        return;
      }
      if( !this.mainObject$.pago_beneficiario_plin ){
        this.dataService.generalAlert( { "message" : "Completa el beneficiario para el pago de Plin.", "status" : "error" } );
        return;
      }
    }

    if( this.mainObject$.pago_transferencia ){
      if( this.mainObject$.transferencias.length === 0 ){
        this.dataService.generalAlert( { "message" : "Completa al menos un banco de transferencia.", "status" : "error" } );
        return;
      }
    }
    this.dataService.useService( "actualizar_negocio_medios_de_pago" , { data : this.mainObject$ } )
    .subscribe
      (
          (data : any) =>   {
            this.dataService.generalAlert(data);
            this.currentUser$.negocio = this.mainObject$;
            this.authenticationService.setUserNoRedirect(this.currentUser$);
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.currentUserValue;
    this.mainObject$  = this.currentUser$.negocio;
  }

}
