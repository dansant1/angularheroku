/// <reference types="@types/googlemaps
import { ElementRef, Component, OnInit, NgZone, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../../data.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Pedido } from '../../../_models/pedido.model';
import { Ubicacion } from '../../../_models/ubicacion.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MapsAPILoader } from '@agm/core';



declare let google: any;

@Component({
  selector: 'cliente-pideloquequieras',
  templateUrl: './pideloquequieras.component.html',
})

export class PideLoQueQuierasComponent implements OnInit {

  public searchControl: FormControl;
  public zoom: number;

  heading = '¡Pide lo que quieras!';
  subheading = '¿Qué podemos llevarte?';
  icon = 'pe-7s-folder icon-gradient bg-tempting-azure';

  ubicacionObj$ = new Ubicacion();
  mainObj$ = new Pedido();
  mainObjParam$ = new Pedido();
  mainArray$: [];
  currentUser$ : any;
  geocoder : any;
  tipoImagen$: 1; // 1 -- Banner , 2 -- Logo
  tipoUbicacion$: 1; // 1 -- Origen , 2 -- Destino
  modalReference: any;
  inputAddress: any;
  mensaje$ : any;
  mostrarFoto$ : any;

  public imagePath;
  imgURL: any;
  public isActive: any;

  // Cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  @ViewChild('mImagen') templateSubirImagen: TemplateRef<any>;
  @ViewChild('mMensaje') mMensaje: TemplateRef<any>;
  @ViewChild('mCambiarUbicacion') mCambiarUbicacion: TemplateRef<any>;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private router: Router, private activatedRoute: ActivatedRoute, private dataService : DataService , private authenticationService: AuthenticationService, private modalService: NgbModal ){
  }

  seleccionarImagen(imagenT){
    this.mainObj$.foto = imagenT.foto;
    this.modalReference.close();
  }

  seleccionarDireccion(nuevasCoordenadasT){
    console.log("regreso output");
    console.log(nuevasCoordenadasT);
    if( this.tipoUbicacion$ === 1 ){
      this.mainObj$.origen_direccion    = nuevasCoordenadasT.direccion;
      this.mainObj$.origen_latitude     = nuevasCoordenadasT.latitude;
      this.mainObj$.origen_longitude    = nuevasCoordenadasT.longitude;
    }else{
      this.mainObj$.destino_direccion    = nuevasCoordenadasT.direccion;
      this.mainObj$.destino_latitude     = nuevasCoordenadasT.latitude;
      this.mainObj$.destino_longitude    = nuevasCoordenadasT.longitude;
    }
    this.modalReference.close();
  }

  cambiarUbicacion( $event, tipoT ){

    $event.srcElement.blur();
    $event.preventDefault();

    this.tipoUbicacion$ = tipoT;

    if( tipoT === 1 ){

      if( this.mainObj$.origen_direccion ){
        this.ubicacionObj$.direccion    = this.mainObj$.origen_direccion;
      }
      if( this.mainObj$.origen_latitude ){
        this.ubicacionObj$.latitude     = this.mainObj$.origen_latitude;
      }
      if( this.mainObj$.origen_longitude ){
        this.ubicacionObj$.longitude    = this.mainObj$.origen_longitude;
      }

    }else{

      if( this.mainObj$.destino_direccion ){
        this.ubicacionObj$.direccion    = this.mainObj$.destino_direccion;
      }
      if( this.mainObj$.destino_latitude ){
        this.ubicacionObj$.latitude     = this.mainObj$.destino_latitude;
      }
      if( this.mainObj$.destino_longitude ){
        this.ubicacionObj$.longitude    = this.mainObj$.destino_longitude;
      }

    }

    this.modalReference = this.modalService.open(this.mCambiarUbicacion);
    this.modalReference.result.then((result) => {

      console.log("cambiarUbicacion");
      console.log(result);

      if( tipoT === 1 ){

      }else{

      }

    }, (reason) => {
      // console.log("exit");
    });

  }

  seleccionarFormaDePago(){
    this.mensaje$ = "Por el momento solo está habilitado el pago con efectivo. ¡Estamos trabajando en integrar pagos con tarjetas muy pronto!";
    this.modalReference = this.modalService.open(this.mMensaje);
  }

  hacerPedido(){
    console.log("hacerpedido");
    this.mainObj$.fecha_alta      = new Date();
    this.mainObj$.tipo_servicio   = 1;
    this.mainObj$.usuario_id      = this.currentUser$._id;
    console.log(this.mainObj$);
    if( !this.mainObj$.origen_latitude ){
      this.dataService.generalAlert( { "message" : "Completa la ubicación donde encontraremos tus productos.", "status" : "error" } );
      return;
    }
    if( !this.mainObj$.destino_latitude ){
      this.dataService.generalAlert( { "message" : "Completa la ubicación de entrega de tus productos.", "status" : "error" } );
      return;
    }
    if( !this.mainObj$.descripcion ){
      this.dataService.generalAlert( { "message" : "Completa la descripción de tus productos.", "status" : "error" } );
      return;
    }
    if( !this.mainObj$.referencia ){
      this.dataService.generalAlert( { "message" : "Completa la referencia de tu ubicación.", "status" : "error" } );
      return;
    }
    if( !this.mainObj$.telefono ){
      this.dataService.generalAlert( { "message" : "Completa tu teléfono.", "status" : "error" } );
      return;
    }
    this.mainObj$.status = 10;
    this.dataService.useService( "nuev_pedido" , { data : this.mainObj$ } )
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

  setCurrentPosition() {
    console.log("current_position");
    console.log(navigator);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.mainObj$.destino_latitude  = position.coords.latitude;
        this.mainObj$.destino_longitude = position.coords.longitude;
        this.getDireccionDestino();
      }, function(error) {
        console.log("error location");
        console.log(error);
      });
    }else{
      this.dataService.generalAlert({ "status" : "info" , "message" : "No pudimos encontrar tu ubicación para preCompletar el destino del pedido" });
    }
  }

  getDireccionDestino(){
    let latlng = { lat: this.mainObj$.destino_latitude, lng: this.mainObj$.destino_longitude };
    this.geocoder.geocode({ 'location' : latlng }, (results, status) => this.ngZone.run(() => {
      console.log(results);
      console.log(status);
      if (results[0]) {
        this.mainObj$.destino_direccion = results[0].formatted_address;
      } else {
        this.dataService.generalAlert({ "status" : "info" , "message" : "No pudimos encontrar tu ubicación para preCompletar el destino del pedido" });
      }
    }));
  }

  subirImagen(){
    this.modalReference = this.modalService.open(this.templateSubirImagen);
  }

  getRegistros(){
    this.dataService.useService( "get_indicador_apple_foto" , {  } )
    .subscribe
      (
          (data : any) =>   {
            this.mostrarFoto$ = data.data;
          },
          error =>  {
            this.dataService.generalAlert(error);
          }
    );
  }

  ngOnInit() {

    console.log("on init");
    console.log( this.mainObj$ );
    this.currentUser$ = this.authenticationService.currentUserValue;

    this.getRegistros();

    //load google and geocoder
    this.mapsAPILoader.load().then(() => {

      this.mainObj$                = new Pedido();
      this.mainObj$.telefono       = this.currentUser$.telefono;
      this.mainObj$.forma_pago     =
      { "_id" : "5d9fa677f7101c5be6f63ccd", "descripcion" : "Efectivo" };
      this.mainObj$.forma_pago_id  = "5d9fa677f7101c5be6f63ccd";

      this.geocoder = new google.maps.Geocoder;
      this.setCurrentPosition();

    });

  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
