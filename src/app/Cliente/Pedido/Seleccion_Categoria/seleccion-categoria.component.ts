import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from '../../../_models/servicio.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'cliente-seleccion-categoria',
  templateUrl: './seleccion-categoria.component.html',
  animations: [

    trigger('categorias', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class SeleccionCategoriaComponent implements OnInit {

  mainObject$ = new Servicio();
  mainArray$ = [];
  negociosCercanos$ = [];
  pedidosArray$: [];
  currentUser$ : any;
  isActive = true;
  searchText = "";

  heading = '¿Qué se te antoja hoy?';
  subheading = 'Encuentra restaurantes cerca de tí';
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  constructor( private router: Router, private sanitizer: DomSanitizer, private dataService : DataService, private modalService: NgbModal, private authenticationService: AuthenticationService ){ }

  irATerminos(){
    this.router.navigateByUrl('/pages/terminos', { });
  }

  irAReferidos(){
    this.router.navigateByUrl('/pages/referido', { });
  }

  getNegociosCercanos(){
    this.dataService.useService( "get_negocios_cerca_de_mi" , { usuario : this.currentUser$ } )
    .subscribe
      (
          (data : any) =>   {
            this.negociosCercanos$ = data.data;
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  seleccionarCategoria(registro_t){

    if( !registro_t ){
      registro_t = {
        foto: "https://codigeek.app/robertodelivery/robertodelivery_fotos/5dc4a9db2a116014de99b226_categoria_foto.png?83ExW",
        negocio_id: "",
        nombre: "Cerca de mí",
        status: 1,
        _id: "cercademi"
      }
    }

    if( !this.currentUser$.direccion ){
      this.dataService.generalAlert({ "status" : "info" , "message" : "Completa tu dirección para encontrar restaurantes cerca de tí." });
      return;
    }
    if( !this.currentUser$.longitude ){
      this.dataService.generalAlert({ "status" : "info" , "message" : "Completa tu dirección para encontrar restaurantes cerca de tí." });
      return;
    }

    this.router.navigateByUrl('/cliente/seleccion-restaurante', { state: registro_t });
  }

  getRegistros(){
    this.dataService.useService( "get_categorias" , {  } )
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
    if(!this.currentUser$.direccion_id){
      this.router.navigate(['pages/ubicaciones'], {  });
      return;
    }
    this.getRegistros();
    this.getNegociosCercanos();
  }

}
