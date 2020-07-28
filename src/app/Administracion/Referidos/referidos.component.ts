import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Referido } from '../../_models/referido.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'administracion-empresas',
  templateUrl: './referidos.component.html',
  animations: [

    trigger('restaurantes', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class ReferidosComponent implements OnInit {

  heading = 'Referidos';
  subheading = "Consulta tu historial y seguimiento de referidos";
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

  @ViewChild('content') templateEditarRegistro: TemplateRef<any>;
  @ViewChild('mBorrar') templateBorrarRegistro: TemplateRef<any>;

  modalReference: any;
  mainObject$ = new Referido();
  mainArray$ = [];
  referidosEnCurso$ = [];
  referidosCompletados$ = [];
  referidoSeleccionado$: any;
  currentUser$ : any;
  ioConnection: any;

  constructor( private router: Router, private sanitizer: DomSanitizer, private dataService : DataService, private modalService: NgbModal, private authenticationService: AuthenticationService ){ }

  gestionarReferido( referido_t ){
    this.router.navigateByUrl('/referidos/referido', { state: referido_t });
  }

  regresar(){
    this.authenticationService.redireccionarUsuario(this.currentUser$);
  }

  getRegistros(){
    this.dataService.useService( "get_referidos" , { data : this.currentUser$ } )
    .subscribe
      (
          (data : any) =>   {
            this.mainArray$ = data.data;
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.currentUserValue;
    this.getRegistros();
  }

}
