
import { Platillo } from './platillo.model';
import { Historial } from './historial.model';
import { Negocio } from './negocio.model';
import { Usuario } from './usuario.model';
import { Forma_Pago } from './forma_pago.model';

export class Pedido {

  public _id : String;
  public fecha_alta: Object;
  public origen: Object;
  public origen_direccion: String;
  public origen_latitude: number;
  public origen_longitude: number;
  public destino: Object;
  public destino_direccion: String;
  public destino_latitude: number;
  public destino_longitude: number;
  public descripcion: String;
  public referencia: String;
  public comentarios: String;
  public foto: String;
  public telefono: String;
  public tipo_servicio: number;
  public motofast: Object;
  public negocio: Negocio;
  public usuario: Usuario;
  public usuario_id: String;
  public forma_pago: Forma_Pago;
  public forma_pago_id: String;
  public tarjeta: Object;
  public tarjeta_id: String;
  public negocio_id: String;
  public motofast_id: String;
  public tiempo_texto: String;
  public distancia_diferencia: number;
  public minimo: number;
  public maximo: number;
  public subtotal: number;
  public costo_envio: number;
  public platillos : Array<Platillo>;
  public historial : Array<Historial>;
  public total: number;
  public status: number;

  public fecha_asignar_motofast: Date;
  public fecha_recogi_productos: Date;
  public fecha_entregue_productos: Date;
  public fecha_platillos_listos: Date;
  public fecha_cancelacion: Date;
  public fecha_pedido_listo: Date;

  public repartidor_direccion: String;
  public repartidor_latitude: number;
  public repartidor_longitude: number;

  public programar  : boolean;
  public fecha_pedido: Date;
  public hora_pedido: String;

  public confirmacion_cliente  : boolean;
  public confirmacion_admins  : boolean;

  public estimado_pago_cliente: number;

  public tipo_cancelacion: number;
  public motivo_cancelacion: String;

  public descuento: number;
  public descuento_aplicado: number;

  constructor(
      _id : string = '',
      fecha_alta : string = '',
      origen = {
        "direccion" : '',
        "latitude" :  '',
        "longitude" : ''
      },
      origen_direccion: string = '',
      origen_latitude: number = 0,
      origen_longitude: number = 0,
      destino = {
        "direccion" : '',
        "latitude" :  '',
        "longitude" : ''
      },
      destino_direccion: string = '',
      destino_latitude: number = 0,
      destino_longitude: number = 0,
      descripcion: string = '',
      referencia: string = '',
      comentarios: string = '',
      foto: string = '',
      telefono: string = '',
      tipo_servicio: number = 0,
      motofast: string = '',
      negocio: Negocio = new Negocio(),
      usuario: Usuario = new Usuario(),
      usuario_id: string = '',
      forma_pago: Forma_Pago = new Forma_Pago(),
      forma_pago_id: string = '',
      tarjeta: string = '',
      tarjeta_id: string = '',
      negocio_id: string = '',
      motofast_id: string = '',
      tiempo_texto: string = '',
      distancia_diferencia: number = 0,
      minimo: number = 0,
      maximo: number = 0,
      subtotal: number = 0,
      costo_envio: number = 0,
      total: number = 0,
      status: number = 1,
      platillos : Platillo[] = [],
      historial : Historial[] = [],

      fecha_asignar_motofast: Date = new Date(),
      fecha_recogi_productos: Date = new Date(),
      fecha_entregue_productos: Date = new Date(),
      fecha_platillos_listos: Date = new Date(),
      fecha_cancelacion: Date = new Date(),
      fecha_pedido_listo: Date = new Date(),
      repartidor_direccion: string = '',
      repartidor_latitude: number = 0,
      repartidor_longitude: number = 0,

      programar  : boolean = false,
      fecha_pedido: Date = new Date(),
      hora_pedido: string = '',

      confirmacion_cliente  : boolean = false,
      confirmacion_admins  : boolean = false,

      estimado_pago_cliente: number = 0,

      tipo_cancelacion: number = 0,
      motivo_cancelacion: string = '',

      descuento: number = 0,
      descuento_aplicado: number = 0,
  ) {

    this._id                = _id;
    this.fecha_alta         = fecha_alta;
    this.origen             = origen;
    this.origen_direccion   = origen_direccion;
    this.origen_latitude    = origen_latitude;
    this.origen_longitude   = origen_longitude;
    this.destino            = destino;
    this.destino_direccion  = destino_direccion;
    this.destino_latitude   = destino_latitude;
    this.destino_longitude  = destino_longitude;
    this.descripcion        = descripcion;
    this.referencia         = referencia;
    this.comentarios        = comentarios;
    this.foto               = foto;
    this.telefono           = telefono;
    this.tipo_servicio      = tipo_servicio;
    this.motofast           = motofast;
    this.negocio            = negocio;
    this.usuario            = usuario;
    this.usuario_id         = usuario_id;
    this.forma_pago         = forma_pago;
    this.forma_pago_id      = forma_pago_id;
    this.tarjeta            = tarjeta;
    this.tarjeta_id         = tarjeta_id;
    this.negocio_id         = negocio_id;
    this.motofast_id        = motofast_id;
    this.tiempo_texto       = tiempo_texto;
    this.distancia_diferencia = distancia_diferencia;
    this.minimo             = minimo;
    this.maximo             = maximo;
    this.subtotal           = subtotal;
    this.total              = total;
    this.costo_envio        = costo_envio;
    this.platillos          = platillos;
    this.historial          = historial;
    this.fecha_asignar_motofast = fecha_asignar_motofast;
    this.fecha_recogi_productos = fecha_recogi_productos;
    this.fecha_entregue_productos = fecha_entregue_productos;
    this.fecha_platillos_listos = fecha_platillos_listos;
    this.fecha_cancelacion = fecha_cancelacion;
    this.fecha_pedido_listo = fecha_pedido_listo;
    this.repartidor_direccion     = repartidor_direccion;
    this.repartidor_latitude      = repartidor_latitude;
    this.repartidor_longitude     = repartidor_longitude;

    this.programar     = programar;
    this.fecha_pedido  = fecha_pedido;
    this.hora_pedido   = hora_pedido;

    this.confirmacion_cliente   = confirmacion_cliente;
    this.confirmacion_admins   = confirmacion_admins;

    this.estimado_pago_cliente   = estimado_pago_cliente;

    this.tipo_cancelacion   = tipo_cancelacion;
    this.motivo_cancelacion   = motivo_cancelacion;

    this.descuento   = descuento;
    this.descuento_aplicado   = descuento_aplicado;
  }
}
