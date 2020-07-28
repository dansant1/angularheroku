import { ElementRef, Component, OnInit, NgZone, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../../data.service';
import { NgbModal, ModalDismissReasons, NgbTabset, NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import { Negocio } from '../../../_models/negocio.model';
import { Tarjeta } from '../../../_models/tarjeta.model';
import { Pedido } from '../../../_models/pedido.model';
import { Ubicacion } from '../../../_models/ubicacion.model';
import { MapsAPILoader } from '@agm/core';
import { MatHorizontalStepper } from '@angular/material/stepper';

declare let google: any;

@Component({
  selector: 'cliente-checkout',
  templateUrl: './checkout.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CheckoutComponent implements OnInit {

  heading = 'Checkout de pedido';
  subheading = "Por favor, confirma tus platillos";
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  mainObject$ = new Pedido();
  tarjetaObject$ = new Tarjeta();
  categorias$ : any;
  index$ : any;
  currentUser$ : any;
  negocioObj$ : any;
  negocioOtrosParametros$ : any;
  modalMaxHeight$:any;
  sucursalesArray$: any;
  tiposPago$: any;
  tarjetas$ = [];
  platilloSeleccionado$: any;
  modalReference: any;
  paso_actual : any;
  zoom : any;
  mapPoints : any;
  sucursalSeleccionada$ : any;
  mensaje$ : any;
  isClicked = false;

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  @ViewChild('mOpciones') mOpciones: TemplateRef<any>;
  @ViewChild('mMensaje') mMensaje: TemplateRef<any>;
  @ViewChild('mTipoPago') mTipoPago: TemplateRef<any>;
  @ViewChild('mTipoServicio') mTipoServicio: TemplateRef<any>;
  @ViewChild('mTarjetas') mTarjetas: TemplateRef<any>;
  @ViewChild('mTiposTarjeta') mTiposTarjeta: TemplateRef<any>;
  @ViewChild('mNuevaTarjeta') mNuevaTarjeta: TemplateRef<any>;

  constructor( private sanitizer: DomSanitizer, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private router: Router, private activatedRoute: ActivatedRoute, private dataService : DataService , private authenticationService: AuthenticationService, private modalService: NgbModal ){
    authenticationService.getUbicacion.subscribe(data => this.recalcularDistancia(data));
  }

  regresar(){
    this.router.navigateByUrl('/cliente/perfil-restaurante', { state : { get_pedido_guardado : true } });
  }

  abrirUbicacion(){
    this.router.navigate(['pages/ubicaciones'], { state : { regresar : '/pedidos/checkout' } });
  }

  recalcularDistancia(data){
    var R = 6371; // km
    var dLat = this.toRad(this.negocioObj$.latitude-this.currentUser$.latitude);
    var dLon = this.toRad(this.negocioObj$.longitude-this.currentUser$.longitude);
    var lat1 = this.toRad(this.currentUser$.latitude);
    var lat2 = this.toRad(this.negocioObj$.latitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(this.currentUser$.latitude) * Math.cos(this.negocioObj$.latitude);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    console.log("distance", d);
    this.negocioObj$.distance = d;
    if( !this.negocioObj$.delivery || (this.negocioObj$.kms_delivery <= (this.negocioObj$.distance)) ){
      this.mainObject$.tipo_servicio = 1;
    }
    return d;
  }

  toRad(Value){
      return Value * Math.PI / 180;
  }

  entregaCambio(event_t){
    if( event_t.value === 2 ){
      if(this.negocioObj$.costo_delivery){
        this.mainObject$.subtotal     = this.mainObject$.total;
        this.mainObject$.costo_envio  = parseFloat(this.negocioObj$.total_delivery);
        this.calcularTotalPedidoConEnvio();
      }
    }else{
      this.calcularTotalPedido();
    }
  }

  nuevaTarjeta(){
    this.modalReference.close();
    this.modalReference = this.modalService.open(this.mNuevaTarjeta, { windowClass: 'modal-holder' } );
  }

  seleccionarFormaDePago(){
    this.modalReference = this.modalService.open(this.mTipoPago, { windowClass: 'modal-holder' } );
  }

  seleccionarTipoServicio(){
    this.modalReference = this.modalService.open(this.mTipoServicio, { windowClass: 'modal-holder' } );
  }

  returnTipoServicio(tipo_t){
    this.mainObject$.tipo_servicio  = tipo_t;
    this.modalReference.close();
  }

  returnFormaDePago( opcion_t ){
    this.mainObject$.forma_pago     = opcion_t;
    this.mainObject$.forma_pago_id  = opcion_t._id;
    this.modalReference.close();
  }

  returnTipoTarjeta( opcion_t ){
    this.mainObject$.tarjeta     = opcion_t;
    this.modalReference.close();
  }

  seleccionarTarjeta(){
    this.modalReference = this.modalService.open(this.mTiposTarjeta, { windowClass: 'modal-holder' } );
    // console.log("seleccionarTarjeta");
    // this.dataService.useService( "get_usuario_tarjetas" , { data : this.currentUser$ } )
    // .subscribe
    //   (
    //     (data : any) =>   {
    //       console.log(data);
    //       if( data.status === "success" ){
    //         if( data.data ){
    //           this.tarjetas$ = data.data;
    //         }else{
    //           this.tarjetas$ = [];
    //         }
    //         console.log("tarjetas");
    //         console.log(this.tarjetas$);
    //         this.modalReference = this.modalService.open(this.mTarjetas, { windowClass: 'modal-holder' } );
    //       }
    //     },
    //     error =>  {
    //       this.dataService.generalAlert(error);
    //     }
    // );
  }

  returnTarjeta( opcion_t ){
    this.mainObject$.tarjeta     = opcion_t;
    this.mainObject$.tarjeta_id  = opcion_t.id;
    this.modalReference.close();
  }

  calcularTotalPedidoConEnvio(){
    this.mainObject$.total = 0;
    for( var i = 0; i<this.mainObject$.platillos.length; i++ ){
      this.mainObject$.total = this.mainObject$.total +
        this.mainObject$.platillos[i].cantidad * this.mainObject$.platillos[i].costo;
    }
    this.mainObject$.total = this.mainObject$.total + this.mainObject$.costo_envio;
    if( this.mainObject$.descuento ){
      if( this.mainObject$.descuento > this.mainObject$.total ){
        this.mainObject$.descuento_aplicado = this.mainObject$.total;
      }else{
        this.mainObject$.descuento_aplicado = this.mainObject$.descuento;
      }
      if( (this.mainObject$.total - this.mainObject$.descuento_aplicado) < this.negocioObj$.costo_minimo ){
        this.mainObject$.descuento_aplicado = this.mainObject$.total - this.negocioObj$.costo_minimo
        this.mainObject$.total = this.negocioObj$.costo_minimo;
      }else{
        this.mainObject$.total = this.mainObject$.total - this.mainObject$.descuento_aplicado;
      }
    }
  }

  calcularTotalPedido(){
    this.mainObject$.total = 0;
    for( var i = 0; i<this.mainObject$.platillos.length; i++ ){
      this.mainObject$.total = this.mainObject$.total +
        this.mainObject$.platillos[i].cantidad * this.mainObject$.platillos[i].costo;
    }
    if( this.mainObject$.descuento ){
      if( this.mainObject$.descuento > this.mainObject$.total ){
        this.mainObject$.descuento_aplicado = this.mainObject$.total;
      }else{
        this.mainObject$.descuento_aplicado = this.mainObject$.descuento;
      }
      if( (this.mainObject$.total - this.mainObject$.descuento_aplicado) < this.negocioObj$.costo_minimo ){
        this.mainObject$.descuento_aplicado = this.mainObject$.total - this.negocioObj$.costo_minimo
        this.mainObject$.total = this.negocioObj$.costo_minimo;
      }else{
        this.mainObject$.total = this.mainObject$.total - this.mainObject$.descuento_aplicado;
      }
    }
  }

  triggerCantidadPlatillo( tipo_t ){
    if( tipo_t === 1 ){ // Aumentar
      this.platilloSeleccionado$ .cantidad = this.platilloSeleccionado$ .cantidad + 1;
      this.platilloSeleccionado$ .total =
        parseFloat(this.platilloSeleccionado$ .costo) * parseInt(this.platilloSeleccionado$ .cantidad);
    }else{ // Disminuir
      this.platilloSeleccionado$ .cantidad = this.platilloSeleccionado$ .cantidad - 1;
      if( this.platilloSeleccionado$ .cantidad === 0 ){
        this.mainObject$.platillos.splice(this.index$,1);
      }else{
        this.platilloSeleccionado$ .total =
          parseFloat(this.platilloSeleccionado$ .costo) * parseInt(this.platilloSeleccionado$ .cantidad);
      }
    }
    this.calcularTotalPedido();
  }

  eliminarPlatillo(){
    console.log("eliminarplat");
    console.log(this.index$);
    this.mainObject$.platillos.splice(this.index$,1);
    this.calcularTotalPedido();
    this.modalReference.close();
    if(this.mainObject$.platillos.length === 0){
      this.dataService.generalAlert( { "message" : "Vaciaste tu carrito por favor selecciona un producto", "status" : "info" } );
      this.router.navigateByUrl('/cliente/perfil-restaurante', {  });
      return;
    }
  }

  irAMenu(){
    this.router.navigateByUrl('/cliente/perfil-restaurante', {  });
  }

  returnOpciones(){
    var restructuracion_platillo = JSON.parse(JSON.stringify(this.platilloSeleccionado$));
    restructuracion_platillo.ingredientes = [];
    delete restructuracion_platillo.grupo_ingrediente;
    if( this.platilloSeleccionado$.grupo_ingrediente.length > 0 ){
      for( var i = 0; i<this.platilloSeleccionado$.grupo_ingrediente.length; i++ ){
        if( this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes.length > 0 ){
          for( var j = 0; j<this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes.length; j++ ){

            // CHECKBOX MULTIPLE OPTIONS
            // SE REVISA SI EXISTE SELECCIONADO
            // EN CASO DE SER SELECCIONADO CHECAMOS SI TIENE COSTO Y SE SUMA EN CASO DE SI TENERLO
            if( this.platilloSeleccionado$.grupo_ingrediente[i].seleccion_multiple ){
              if( this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].seleccionado ){
                if( this.platilloSeleccionado$.grupo_ingrediente[i].genera_costo ){
                  if( this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].extra ){
                    if( parseFloat(this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].extra) > 0 ){
                      restructuracion_platillo.costo =
                        parseFloat(restructuracion_platillo.costo) + parseFloat(this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].extra);
                    }
                  }
                  restructuracion_platillo.ingredientes.push(
                    this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j]
                  );
                }
              }
            }else{
              // SINGLE OPTION RADIOS
              // SE REVISA QUE EXISTA AL MENOS UNO SELECCIONADO
              // EN CASO DE SER SELECCIONADO CHECAMOS SI TIENE COSTO Y SE SUMA EN CASO DE SI TENERLO
              if( !this.platilloSeleccionado$.grupo_ingrediente[i].genera_costo ){
                if( !this.platilloSeleccionado$.grupo_ingrediente[i].ingrediente_seleccionado ){
                  this.dataService.generalAlert({ "status" : "info" , "message" : "Selecciona una opción de " +this.platilloSeleccionado$.grupo_ingrediente[i].nombre });
                  return;
                }
              }
              if( this.platilloSeleccionado$.grupo_ingrediente[i].ingrediente_seleccionado ){
                if( this.platilloSeleccionado$.grupo_ingrediente[i].ingrediente_seleccionado === this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].id ){
                  if( this.platilloSeleccionado$.grupo_ingrediente[i].genera_costo ){
                    if( this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].extra ){
                      restructuracion_platillo.costo =
                        (parseFloat(this.platilloSeleccionado$.costo) + parseFloat(this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j].extra));
                    }
                  }
                  restructuracion_platillo.ingredientes.push(
                    this.platilloSeleccionado$.grupo_ingrediente[i].ingredientes[j]
                  );
                }
              }
            }
          }
        }
      }
    }
    this.mainObject$.platillos[this.index$] = restructuracion_platillo;
    console.log("return");
    console.log( restructuracion_platillo );
    console.log(this.mainObject$);
    console.log(this.index$);
    this.calcularTotalPedido();
    this.modalReference.close();
  }

  opcionesPlatillo( platillo_t , index_t ){
    this.index$ = index_t;
    for( var i = 0; i<this.categorias$.length; i++ ){
      for( var j = 0; j<this.categorias$[i].platillos.length; j++ ){
        console.log(this.categorias$[i].platillos[j]._id + " - " + platillo_t._id);
        if( this.categorias$[i].platillos[j]._id === platillo_t._id ){
          this.platilloSeleccionado$ = this.categorias$[i].platillos[j];
          this.platilloSeleccionado$.cantidad = platillo_t.cantidad;
          this.platilloSeleccionado$.total = platillo_t.total;
        }
      }
    }
    console.log("abrirmodalopciones");
    console.log(this.platilloSeleccionado$);
    this.modalReference = this.modalService.open(this.mOpciones, {windowClass: 'cgk-modal-full', backdrop: false});
  }

  guardarTarjeta(){
    if( !this.tarjetaObject$.number ){
      this.dataService.generalAlert( { "message" : "Completar número de tarjeta", "status" : "info" } );
      return;
    }
    if( !this.tarjetaObject$.exp_month ){
      this.dataService.generalAlert( { "message" : "Completar mes de expiración", "status" : "info" } );
      return;
    }
    if( !this.tarjetaObject$.exp_year ){
      this.dataService.generalAlert( { "message" : "Completar año de expiración", "status" : "info" } );
      return;
    }
    if( !this.tarjetaObject$.cvc ){
      this.dataService.generalAlert( { "message" : "Completar CVC", "status" : "info" } );
      return;
    }
    this.dataService.useService( "guardar_tarjeta" , { data : this.currentUser$, tarjeta : this.tarjetaObject$ } )
    .subscribe
      (
        (data : any) =>   {
          if( data.error ){
            this.dataService.generalAlert({ "status" : "error", "message" : data.error.message });
          }
          if( data.status === "success" ){
          this.modalReference.close();
            this.dataService.generalAlert(data);
            this.seleccionarTarjeta();
          }
        },
        error =>  {
          this.dataService.generalAlert(error);
        }
    );
  }

  irAPedido( pedido_t ){
    this.dataService.useService( "get_pedido_by_id" , { data : pedido_t } )
    .subscribe
      (
        (data : any) =>   {
          if( data.status === "success" ){
            this.router.navigateByUrl('/pedidos/pedido', { state: data.data[0] });
          }
        },
        error =>  {
          this.dataService.generalAlert(error);
        }
    );
  }

  hacerPedido(){

    if( this.isClicked ){
      return;
    }

    if( this.mainObject$.total < this.negocioObj$.costo_minimo ){
      this.dataService.generalAlert( { "message" : "El pedido mínimo del negocio es de " + this.negocioObj$.costo_minimo, "status" : "info" } );
      return;
    }

    if( this.mainObject$.platillos.length === 0 ){
      this.dataService.generalAlert( { "message" : "Tu carrito esta vacío :(", "status" : "info" } );
      this.irAMenu();
      return;
    }
    if( !this.mainObject$.forma_pago_id ){
      this.dataService.generalAlert( { "message" : "Completa una forma de pago", "status" : "info" } );
      return;
    }
    if( this.mainObject$.forma_pago_id === '5e0a904ece07baeb91675dbe' ){
      if( !this.mainObject$.tarjeta ){
        this.dataService.generalAlert( { "message" : "Completa tu método de pago", "status" : "info" } );
        return;
      }
    }
    if( !this.mainObject$.tipo_servicio ){
      this.dataService.generalAlert( { "message" : "Completa el tipo de entrega", "status" : "info" } );
      return;
    }
    if( this.mainObject$.programar ){
      if( !this.mainObject$.fecha_pedido ){
        this.dataService.generalAlert( { "message" : "Completa la fecha del pedido", "status" : "info" } );
        return;
      }
    }

    this.mainObject$.origen_direccion = this.negocioOtrosParametros$.direccion;
    this.mainObject$.origen_latitude  = this.negocioOtrosParametros$.location.coordinates[1];
    this.mainObject$.origen_longitude = this.negocioOtrosParametros$.location.coordinates[0];

    this.mainObject$.destino_direccion = this.currentUser$.direccion;
    this.mainObject$.destino_latitude  = this.currentUser$.latitude;
    this.mainObject$.destino_longitude = this.currentUser$.longitude;

    // var distancia_en_km = this.calcularKMDistancia();
    // this.mainObject$.distancia_diferencia = distancia_en_km;
    // for( var i = 0; i<this.distanciasArray$.length; i++ ){
    //   if( (this.mainObject$.distancia_diferencia > this.distanciasArray$[i].minimo)
    //     && (this.mainObject$.distancia_diferencia < this.distanciasArray$[i].maximo) ){
    //       this.mainObject$.subtotal = this.mainObject$.total;
    //       this.mainObject$.costo_envio = parseFloat(this.distanciasArray$[i].costo);
    //       this.mainObject$.total = this.mainObject$.total + this.mainObject$.costo_envio;
    //   }
    // }
    this.mainObject$.fecha_alta      = new Date();
    this.mainObject$.status          = 10; // Por aprobar listo del restaurante
    this.mainObject$.usuario_id      = this.currentUser$._id;
    this.mainObject$.negocio_id      = this.negocioObj$._id;

    this.isClicked = true;

    if( this.mainObject$.tipo_servicio === 2 ){
      this.mensaje$ = "Confirma que el pedido se enviará a la dirección: " + this.mainObject$.destino_direccion;
      this.modalReference = this.modalService.open(this.mMensaje, { windowClass: 'modal-dialog-centered' } );
      this.modalReference.result.then((result) => {

        this.dataService.useService( "nuev_pedido" , { data : this.mainObject$, negocio : this.negocioObj$ } )
        .subscribe
          (
            (data : any) =>   {
              this.dataService.generalAlert(data);
              if( data.status === "success" ){
                this.irAPedido(data);
              }
            },
            error =>  {
              this.dataService.generalAlert(error);
              this.isClicked = false;
            }
        );

      }, (reason) => {
        // console.log("exit");
      });
    }else{
      this.dataService.useService( "nuev_pedido" , { data : this.mainObject$, negocio : this.negocioObj$ } )
      .subscribe
        (
          (data : any) =>   {
            this.dataService.generalAlert(data);
            if( data.status === "success" ){
              this.irAPedido(data);
            }
          },
          error =>  {
            this.dataService.generalAlert(error);
            this.isClicked = false;
          }
      );
    }

  }

  getTiposPago(){
    this.tiposPago$ = [];
    this.dataService.useService( "get_tipo_pago" , { usuario : this.currentUser$, negocio : this.negocioObj$ } )
    .subscribe
      (
          (data : any) =>   {
            this.tiposPago$ = data.data;
            if(this.tiposPago$.length > 0){
              this.mainObject$.forma_pago     = this.tiposPago$[0];
              this.mainObject$.forma_pago_id  = this.tiposPago$[0]._id;
            }
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  getCategorias(){
    this.dataService.useService( "get_categorias_negocio" , { data : this.negocioObj$ } )
    .subscribe
      (
          (data : any) =>   {
            this.categorias$ = data.data;
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  ngOnInit() {

    this.modalMaxHeight$          = window.innerHeight*.70+"px";
    this.currentUser$             = this.authenticationService.currentUserValue;
    this.mainObject$              = this.authenticationService.currentPedidoValue;
    this.negocioObj$              = history.state;
    this.negocioOtrosParametros$  = history.state;

    this.mainObject$.telefono     = this.currentUser$.telefono;

    console.log(this.mainObject$);
    console.log(this.negocioObj$);

    if( !this.mainObject$ ){
      this.router.navigateByUrl('/cliente/perfil-restaurante', { });
      return;
    }

    if( history.state._id ){
      this.negocioObj$ = history.state;
    }else{
      this.negocioObj$ = JSON.parse(localStorage.getItem('negocio_robertodelivery'));
    }
    if(!this.negocioObj$){
      this.router.navigateByUrl('/cliente/seleccion-categoria', { });
    }else{
      localStorage.setItem('negocio_robertodelivery', JSON.stringify(this.negocioObj$));
    }

    if( !this.negocioObj$.latitude ){
      this.dataService.generalAlert( { "message" : "Completa tu ubicación en la sección de arriba para continuar con tu pedido", "status" : "info" } );
      this.router.navigateByUrl('/cliente/perfil-restaurante', { });
      return;
    }else{
      this.recalcularDistancia(null);
    }
    this.getTiposPago();
    this.getCategorias();

    if(this.mainObject$.descuento){
      this.calcularTotalPedido();
    }

  }

}
