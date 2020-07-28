import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from '../../../_models/servicio.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import { Categoria } from '../../../_models/categoria.model';

@Component({
  selector: 'cliente-seleccion-restaurante',
  templateUrl: './seleccion-restaurante.component.html',
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
export class SeleccionRestauranteComponent implements OnInit {

  categoriaObj$ = new Categoria();
  mainObject$ = new Servicio();
  mainArray$ = [];
  pedidosArray$: [];
  currentUser$ : any;
  searchText = "";
  isActive = true;

  heading = 'Los mejores restaurantes';
  subheading = 'Encuentra lo que buscas cerca de tí';
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  constructor(
    private router                : Router,
    private sanitizer             : DomSanitizer,
    private dataService           : DataService,
    private modalService          : NgbModal,
    private authenticationService : AuthenticationService
    ){
      authenticationService.getUbicacion.subscribe(data => this.getRegistros(data));
  }

  seleccionarRestaurante(registro_t){
    this.router.navigateByUrl('/cliente/perfil-restaurante', { state: { negocio : registro_t } });
  }

  regresar(){
    this.router.navigateByUrl('/cliente/seleccion-categoria', {  });
  }

  abrirUbicacion(){
    this.router.navigate(['pages/ubicaciones'], { state : { regresar : '/cliente/seleccion-restaurante' } });
  }

  getRegistros(sinvalor){
    if(this.categoriaObj$._id === "cercademi"){
      this.dataService.useService( "get_negocios_cerca_de_mi" , { data : this.categoriaObj$, usuario : this.currentUser$ } )
      .subscribe
        (
            (data : any) =>   {
              this.mainArray$ = data.data;
            },
            error =>  {
              this.dataService.generalAlert(error);
            }
      );
    }else{
      this.dataService.useService( "get_negocios_by_categoria" , { data : this.categoriaObj$, usuario : this.currentUser$ } )
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
  }

  ngOnInit() {

    console.log("LocalStorage");
    console.log(localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('categoriaRestaurantes'));

    this.currentUser$ = this.authenticationService.currentUserValue;

    console.log(history.state);
    if( history.state._id ){
      this.categoriaObj$ = history.state;
    }

    console.log("categoria");
    console.log(this.categoriaObj$);

    if( this.categoriaObj$._id === "" ){
      if(localStorage.getItem('categoriaRestaurantes')){
        console.log(1);
        this.categoriaObj$ = JSON.parse(localStorage.getItem('categoriaRestaurantes'));
      }else{
        console.log(2);
        this.router.navigateByUrl('/cliente/seleccion-categoria', { });
      }
    }else{
      console.log(3);
      localStorage.setItem('categoriaRestaurantes', JSON.stringify(this.categoriaObj$));
    }
    this.heading = this.categoriaObj$.nombre.toString();
    this.getRegistros(null);
  }

}
