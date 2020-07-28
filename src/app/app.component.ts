import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { User } from './_models/user.model';
import { Module } from './module.model';
import { DataService } from './data.service';
import { AuthenticationService } from './_services/authentication.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare let PushNotification: any;

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  users$: User[];
  modules$: Module[];
  currentUser$: any;
  title = 'Delivery';
  registrationId = '';

  classNotificacion$      = "notification-new-order";
  tipoNotificacion$       = 1;
  cantidadNotificacion$   = 1;
  mensajeNotificacion$    = "";
  modalOpened$            = false;
  mostrarIcono$           = false;
  mostrarImagen$          = false;
  urlImagen$              = false
  modalReference          : any;
  showOverlay$            = true;

  tituloModal$  : any;
  mensajeModal$ : any;
  tipoModal$    : any;

  @ViewChild('mMensajeGeneral') mMensajeGeneral: TemplateRef<any>;

  constructor(
    private socket: Socket,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService : DataService,
    private modalService: NgbModal,
  ){
    this.dataService.getModalData().subscribe(data => { this.triggerMensajeGeneral(data); });
  }

  triggerMensajeGeneral(data){

    console.log("triggerMensajeGeneral");

    this.tituloModal$     = data.titulo;
    this.mensajeModal$    = data.mensaje;
    this.tipoModal$       = data.tipo;
    this.mostrarIcono$    = data.mostrar_icono;
    this.mostrarImagen$   = data.mostrar_imagen;
    this.urlImagen$       = data.url_imagen;

    this.modalReference = this.modalService.open(
      this.mMensajeGeneral,
      {windowClass: 'cgk-modal-full', backdrop: false}
    );
    this.modalReference.result.then((result) => {
    }, (reason) => {
      console.log("exit");
    });
  }

  closeModal(){
    this.modalReference.close();
  }

  ngOnInit(){
    this.currentUser$ = this.authenticationService.currentUserValue;
    this.authenticationService.setRegistrationID(this.registrationId);
    this.authenticationService.setUser(this.currentUser$);
    if(this.currentUser$){
      this.authenticationService.watchUserPosition(this.currentUser$);
    }
    setTimeout(() => {
      console.log('hide');
      this.showOverlay$ = false;
    }, 3000);

    let push = PushNotification.init({
        android: {
            senderID: "100470118971",
            icon: 'logo.png',
            iconColor: '#f9d001',
            "forceShow": "true"
        },
        ios: {
            alert: "true",
            badge: false,
            sound: "true"
        },
        windows: {}
    });
    push.on('registration', data => {

      console.log("registrationID----PUSHNOTIFICATION");
      console.log(data.registrationId);
      console.log(this.currentUser$);

      this.authenticationService.setRegistrationID(data.registrationId);

      if (this.currentUser$) {
          if (this.currentUser$._id) {
              this.currentUser$.registrationId = data.registrationId;
              this.dataService.useService("actualizar_registration_id", { data: this.currentUser$ })
                  .subscribe(function (data) {
              }, function (error) {
              });
          }
      }
    });

    push.on('notification', data => {
      console.log("not recibida");
      console.log(data.additionalData.pedido);
      this.irAPedido(data.additionalData.pedido);
      var propValue;
      for(var propName in data) {
          propValue = data[propName]

          console.log(propName,propValue);
      }
    });
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

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['pages/login']);
  }

}
