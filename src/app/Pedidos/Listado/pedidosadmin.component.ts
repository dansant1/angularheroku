import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from '../../_models/pedido.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'administracion-empresas',
  templateUrl: './pedidosadmin.component.html',
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
export class PedidosAdminComponent implements OnInit {

  heading = 'Pedidos';
  subheading = "Consulta tu historial y seguimiento de pedidosadmin";
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

  @ViewChild('content') templateEditarRegistro: TemplateRef<any>;
  @ViewChild('mBorrar') templateBorrarRegistro: TemplateRef<any>;

  modalReference: any;
  sinPedidos$ = false;
  mainObject$ = new Pedido();
  mainArray$ = [];
  pedidosEnCurso$ = [];
  pedidosConfirmados$ = [];
  pedidosCompletados$ = [];
  pedidosCancelados$ = [];
  pedidoSeleccionado$: any;
  currentUser$ : any;
  ioConnection: any;

  constructor( private router: Router, private sanitizer: DomSanitizer, private dataService : DataService, private modalService: NgbModal, private authenticationService: AuthenticationService ){ }

  gestionarPedido( pedido_t ){
    console.log("gestionarPedido");
    this.router.navigateByUrl('/pedidos/pedidoadmin', { state: pedido_t });
  }

  regresar(){
    this.authenticationService.redireccionarUsuario(this.currentUser$);
  }

  initIoConnection(){
    console.log("initIoConnection");
    this.ioConnection = this.dataService.getPedidosPendientes()
    .subscribe((data: any) => {
      console.log("evento de socket recibido");
      this.getRegistros();
    });
  }

  getRegistros(){

    let servicio = "";
    switch( this.currentUser$.tipo_usuario_id ){
      //Admin App
      case "5c4050f358209844a83c8622":
        servicio = "get_pedidos_administracion";
      break;
      //Admin Neg - Place - Station - Restaurante
      case "5c4050fa58209844a83c8623":
      case "5e30cadaec6ea3c622235f99":
      case "5e30cadfec6ea3c622235f9a":
      case "5e30cae5ec6ea3c622235f9b":
        servicio = "get_pedidos_negocio";
      break;
      //Repartidor
      case "5c40513658209844a83c862a":
        servicio = "get_pedidos_motofast";
      break;
      //Cliente
      case "5c40513258209844a83c8629":
        servicio = "get_pedidos_usuario";
      break;
    }

    this.dataService.useService( servicio , { data : this.currentUser$ } )
    .subscribe
      (
          (data : any) =>   {
            if( data.data.length === 0 ){
              this.sinPedidos$ = true;
              console.log("Sin pedidos");
            }
            this.mainArray$ = data.data;
            for( var i = 0; i<data.data.length; i++ ){
              if(
                data.data[i].status === 10
              ){
                this.pedidosEnCurso$.push( data.data[i] );
              }
              if(
                data.data[i].status === 1 ||
                data.data[i].status === 2
              ){
                this.pedidosConfirmados$.push( data.data[i] );
              }
              if(
                data.data[i].status === 3
              ){
                this.pedidosCompletados$.push( data.data[i] );
              }
              if(
                data.data[i].status === 15
              ){
                this.pedidosCancelados$.push( data.data[i] );
              }
            }
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  ngOnInit() {
    this.currentUser$ = this.authenticationService.currentUserValue;
    this.getRegistros();
    this.initIoConnection();
  }

}
