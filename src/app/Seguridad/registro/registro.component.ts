import { Component, OnInit, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { DataService } from '../../data.service';
import { Usuario } from '../../_models/usuario.model';
import { Negocio } from '../../_models/negocio.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  @Output() sendMessage: EventEmitter<String> = new EventEmitter<String>();

  mainObj$ = new Usuario();
  negocioObj$ = new Negocio();
  tipoVista$ = 1;

  categoriasArray$ = [];
  modalReference : any;

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  @ViewChild('listadoCategorias') listadoCategorias: TemplateRef<any>;

  constructor(
    private dataService : DataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    if(history.state.tipo){
      this.tipoVista$ = history.state.tipo;
    }else{
      this.tipoVista$ = 1;
    }
  }

  seleccionarCategoria(){
    this.dataService.useService( "get_categorias" , {  } )
    .subscribe
      (
          (data : any) =>   {
            this.categoriasArray$ = data.data;
            this.modalReference = this.modalService.open(this.listadoCategorias);
            this.modalReference.result.then((result) => {
              this.negocioObj$.categoria = result;
              this.negocioObj$.categoria_id = result._id;
            }, (reason) => {
              console.log("exit");
            });
          },
          error =>  {
            alert("Error");
          }
    );
  }

  regresar(){
    this.router.navigateByUrl('/pages/login', { });
  }

  registro_prueba(tel_t): void {
    this.dataService.useService( "autenticacion_prueba" , { data :  { "celular_prueba" : tel_t } } )
    .subscribe
      (
          data =>   {
            this.dataService.generalAlert({ "message" : "Bienvenido", "status" : "success" });
            this.authenticationService.setUser((data as any).data);
          },
          error =>  {
            this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
          }
    );
  }

  registroCallback( response ) {
		if (response.status === "PARTIALLY_AUTHENTICATED") {

        this.dataService.autenticacion( response )
        .subscribe
          (
              data =>   {
                this.dataService.generalAlert({ "message" : "Bienvenido", "status" : "success" });
                this.authenticationService.setUser((data as any).data);
              },
              error =>  {
                this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
              }
        );

		  	// Data.nodePost('autenticacion', { data : response })
    		// .then(function (results) {
  			//   if (results.status === "success") {
  			// 	  // console.log(results);
  			// 	  	$scope.userContext = results.data;
  			// 	  	UserContext.authenticationUser(results.data, true);
  			// 	  	$localStorage.usuario_conectado = $scope.userContext;
  			// 	  	$rootScope.show_loader = false;
  			// 		if($localStorage.usuario_conectado.nombre === "Agregar mi nombre" || (!$localStorage.usuario_conectado.customer_id) || (!$localStorage.usuario_conectado.direccion_id ) ){
  			// 				$state.go("pass.completar_perfil");
  			// 		}else{
  			// 			$state.go("app.usuario_inicio");
  			// 		}
  			//   }else{
  			// 	  Data.toast( { "status"  : "success",  "message" : "Error al iniciar sesión."  } );
  			//   }
			 // });
		}
		else if (response.status === "NOT_AUTHENTICATED") {
      this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
		}
		else if (response.status === "BAD_PARAMS") {
      this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
		}
  }

  registrarmeNegocio(): void {
    console.log( this.negocioObj$ );
    if( !this.negocioObj$.correo ){
      this.dataService.generalAlert({ "message" : "Completa tu correo electrónico", "status" : "info" });
      return;
    }
    if( !this.negocioObj$.contrasena ){
      this.dataService.generalAlert({ "message" : "Completa tu contraseña", "status" : "info" });
      return;
    }
    if( !this.negocioObj$.nombre ){
      this.dataService.generalAlert({ "message" : "Completa tu nombre", "status" : "info" });
      return;
    }
    if( !this.negocioObj$.telefono ){
      this.dataService.generalAlert({ "message" : "Completa tu teléfono", "status" : "info" });
      return;
    }
    if( !this.negocioObj$.categoria_id ){
      this.dataService.generalAlert( { "message" : "Completa la categoría de tu negocio.", "status" : "error" } );
      return;
    }
    this.dataService.useService( "registro_negocio" , { data :  this.negocioObj$ } )
    .subscribe
      (
        (data : any) =>   {
          this.dataService.generalAlert(data);
          if( data.status === "success" ){
            this.dataService.generalAlert({ "message" : "Bienvenido", "status" : "success" });
            this.dataService.ejecutarModal({ "titulo" : "Gracias por usar Enbío" , "mensaje" : "Regístraste tu negocio con éxito" , "mostrar_imagen" : true, "url_imagen" : "https://codigeek.com/projects/robertodelivery/icon_local.png", "tipo" : 1 });
            this.authenticationService.setUser((data as any).data);
          }
        },
        error =>  {
          this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
        }
    );
  }

  registrarme(): void {
    console.log( this.mainObj$ );
    if( !this.mainObj$.correo ){
      this.dataService.generalAlert({ "message" : "Completa tu correo electrónico", "status" : "info" });
      return;
    }
    if( !this.mainObj$.contrasena ){
      this.dataService.generalAlert({ "message" : "Completa tu contraseña", "status" : "info" });
      return;
    }
    if( !this.mainObj$.nombre ){
      this.dataService.generalAlert({ "message" : "Completa tu nombre", "status" : "info" });
      return;
    }
    if( !this.mainObj$.telefono ){
      this.dataService.generalAlert({ "message" : "Completa tu teléfono", "status" : "info" });
      return;
    }
    this.dataService.useService( "registro" , { data :  this.mainObj$ } )
    .subscribe
      (
        (data : any) =>   {
          this.dataService.generalAlert(data);
          if( data.status === "success" ){
            this.dataService.ejecutarModal({ "titulo" : "Gracias por usar Enbío" , "mensaje" : "Y ayudar a los emprendedores peruanos. ¡Todos unidos, saldremos adelante!" , "mostrar_imagen" : true, "url_imagen" : "https://codigeek.com/projects/robertodelivery/icon_local.png", "tipo" : 1 });
            this.dataService.generalAlert({ "message" : "Bienvenido", "status" : "success" });
            this.authenticationService.setUser((data as any).data);
          }
        },
        error =>  {
          this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
        }
    );
  }

  registro(): void {
    console.log( this.mainObj$ );
    if( !this.mainObj$.correo ){
      this.dataService.generalAlert({ "message" : "Completa tu correo electrónico", "status" : "info" });
      return;
    }
    if( !this.mainObj$.contrasena ){
      this.dataService.generalAlert({ "message" : "Completa tu contraseña", "status" : "info" });
      return;
    }
    this.dataService.useService( "autenticacion_correo" , { data :  this.mainObj$ } )
    .subscribe
      (
        (data : any) =>   {
          this.dataService.generalAlert(data);
          if( data.status === "success" ){
            this.dataService.generalAlert({ "message" : "Bienvenido", "status" : "success" });
            this.authenticationService.setUser((data as any).data);
          }
        },
        error =>  {
          this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" });
          this.dataService.generalAlert({ "message" : error, "status" : "error" });
        }
    );
    // AccountKit.registro('PHONE', { countryCode: '+52', phoneNumber: '' }).then(
    //   (response: AuthResponse) => this.registroCallback(response),
    //   (error: any) => this.dataService.generalAlert({ "message" : "Hubo un error en el inicio de sesión, intenta más tarde", "status" : "error" })
    // );
  }

}
