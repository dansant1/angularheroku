import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Platillo } from '../../_models/platillo.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'administracion-empresas',
  templateUrl: './platillos.component.html',
})
export class PlatillosComponent implements OnInit {

  heading = 'Artículos';
  subheading = 'Administración de los artículos';
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

  @ViewChild('content') templateEditarRegistro: TemplateRef<any>;
  @ViewChild('mBorrar') templateBorrarRegistro: TemplateRef<any>;

  modalReference: any;
  currentUser$: any;
  negocio$: any;
  index$: any;
  productosParaEliminar$ = [];
  mainObject$ = new Platillo();
  mainArray$: any;
  platilloSeleccionado$: any;
  isActive = false;
  eliminarProductos$ = false;

  constructor( private router: Router, private sanitizer: DomSanitizer, private authenticationService: AuthenticationService, private dataService : DataService, private modalService: NgbModal ){ }

  regresar(){
    this.authenticationService.redireccionarUsuario(this.currentUser$);
  }

  activarEliminar(){
    this.eliminarProductos$ = !this.eliminarProductos$;
  }

  eliminarProductosSeleccionados(){
    this.productosParaEliminar$ = [];
    for( var i = 0; i<this.mainArray$[this.index$].platillos.length; i++ ){
      if( this.mainArray$[this.index$].platillos[i].seleccionar_para_eliminar ){
        this.productosParaEliminar$.push(
          this.mainArray$[this.index$].platillos[i]._id
        );
      }
    }
    console.log(this.productosParaEliminar$);
    this.dataService.useService( "eliminar_productos_multiple_negocio" , { data : this.negocio$, productos : this.productosParaEliminar$ } )
    .subscribe
      (
          (data : any) =>   {
            this.dataService.generalAlert(data);
            this.getRegistros();
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  seleccionarCategoria(index_t){
    this.index$ = index_t;
    for( var i = 0; i<this.mainArray$.length; i++ ){
      this.mainArray$[i].expand = false;
      this.mainArray$[i].platillos = [];
    }
    this.mainArray$[index_t].expand = true;
    this.dataService.useService( "get_platillos_by_categoria_id" , { data : this.mainArray$[index_t] } )
    .subscribe
      (
          (data : any) =>   {
            for( var i = 0; i<data.data.length; i++ ){
              if( data.data[i].promocion ){
                data.data[i].calculado_descuento = (data.data[i].costo*100)/(100-data.data[i].promocion_total);
                console.log(data.data[i]);
              }
            }
            this.mainArray$[index_t].platillos = data.data;
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
    }, (reason) => {
    });
  }

  nuevoRegistro(){

    this.mainObject$ = new Platillo();
    this.router.navigateByUrl('/administracion-negocio/platillo', { state: this.mainObject$ });

  }

  editarRegistro( registroEditar ){

    this.router.navigateByUrl('/administracion-negocio/platillo', { state: registroEditar });

  }

  borrarRegistro( mBorrar, registroBorrar ){

    this.mainObject$ = registroBorrar;
    this.modalReference = this.modalService.open(mBorrar);
    this.modalReference.result.then((result) => {
      this.dataService.useService( "borrar_empresa" , { data : this.mainObject$ } )
      .subscribe
        (
            (data : any) =>   {
              mainObject$ : new Platillo();
              this.dataService.generalAlert(data);
              this.getRegistros();
            },
            error =>  {
              this.dataService.generalAlert(error);
            }
      );
    }, (reason) => {
    });

  }

  getNegocio ( ){
    this.dataService.useService( "get_negocio_by_id" , { data : this.currentUser$.negocio } )
    .subscribe
      (
        (data : any) =>   {
          this.negocio$ = data.data[0];
          this.getRegistros();
        },
        error =>  {
          this.dataService.generalAlert(error);
        }
    );
  }

  getRegistros(){
    this.dataService.useService( "get_categorias_negocio_admin" , { data : this.currentUser$.negocio } )
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
    this.getNegocio();
  }

}
