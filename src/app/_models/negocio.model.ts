
import { Categoria } from './categoria.model';
import { Usuario } from './usuario.model';
import { Banco } from './bancos.model';

export class Negocio {

  public _id : String;
  public rfc: String;
  public nombre: String;
  public descripcion: String;
  public nombre_negocio: String;
  public telefono: String;
  public direccion: String;
  public correo: String;
  public contrasena: String;
  public comision: number;
  public latitude: number;
  public longitude: number;
  public usuario: Usuario;
  public location: Object;
  public usuario_id: String;
  public platillos: Object;
  public categorias : Categoria[];
  public categoria: Categoria;
  public categoria_id: String;
  public banner_image: String;
  public foto: String;
  public status: number;
  public lat: number;
  public lng: number;
  public draggable: boolean;
  public delivery: boolean;
  public entrega_en_tienda: boolean;
  public kms_delivery: number;
  public distance: number;

  public fecha_nacimiento: String;
  public id_personal: String;
  public id_foto_anverso: String;
  public id_foto_inverso: String;
  public id_foto_anverso_url: String;
  public id_foto_inverso_url: String;
  public estado: String;
  public sitio_web: String;
  public clabe_bancaria: String;

  public pago_efectivo : boolean;
  public pago_tarjeta  : boolean;
  public pago_lukita  : boolean;
  public pago_plin  : boolean;
  public pago_yape  : boolean;
  public pago_transferencia  : boolean;

  public pago_telefono_lukita: String;
  public pago_beneficiario_lukita: String;
  public pago_telefono_plin: String;
  public pago_beneficiario_plin: String;
  public pago_telefono_yape: String;
  public pago_beneficiario_yape: String;

  public pago_cuenta_banco: String;
  public banco: String;
  public pago_beneficiario: String;

  public costo_delivery  : boolean;
  public total_delivery  : number;
  public costo_minimo  : number;

  public tiempo_estimado: String;

  public sistema_de_puntos  : boolean;
  public secuencia : number;
  public creditos_por_secuencia : number;
  public minimo_puntos : number;

  public transferencias : Banco[];
  public perfil_completo  : boolean;

  public trabaja_lunes      : boolean;
  public trabaja_martes     : boolean;
  public trabaja_miercoles  : boolean;
  public trabaja_jueves     : boolean;
  public trabaja_viernes    : boolean;
  public trabaja_sabado     : boolean;
  public trabaja_domingo    : boolean;

  public horario_de_trabajo_inicio : String;
  public horario_de_trabajo_fin : String;

  constructor(

    _id : string = '',
    rfc: string = '',
    nombre: string = '',
    descripcion: string = '',
    nombre_negocio: string = '',
    telefono: string = '',
    direccion: string = '',
    correo: string = '',
    contrasena: string = '',
    comision: number = 5,
    latitude: number = 0,
    longitude: number = 0,
    usuario: Usuario = new Usuario(),
    location: string = '',
    usuario_id: string = '',
    platillos: string = '',
    categorias: Categoria[] = [],
    categoria: Categoria = new Categoria(),
    categoria_id: string = '',
    banner_image: string = '',
    foto: string = '',
    status: number = 1,
    lat: number = 0,
    lng: number = 0,
    draggable: boolean = false,
    delivery: boolean = false,
    entrega_en_tienda: boolean = false,
    kms_delivery: number = 0,
    distance: number = 0,

    fecha_nacimiento: string = '',
    id_personal: string = '',
    id_foto_anverso: string = '',
    id_foto_inverso: string = '',
    id_foto_anverso_url: string = '',
    id_foto_inverso_url: string = '',
    estado: string = '',
    sitio_web: string = '',
    clabe_bancaria: string = '',

    pago_efectivo : boolean = false,
    pago_tarjeta  : boolean = false,

    pago_telefono_lukita: string = '',
    pago_beneficiario_lukita: string = '',
    pago_telefono_plin: string = '',
    pago_beneficiario_plin: string = '',
    pago_telefono_yape: string = '',
    pago_beneficiario_yape: string = '',

    pago_cuenta_banco: string = '',
    banco: string = '',
    pago_beneficiario: string = '',

    costo_delivery : boolean = false,
    total_delivery : number = 0,
    costo_minimo : number = 0,

    tiempo_estimado: string = '',

    sistema_de_puntos  : boolean = false,
    secuencia : number = 0,
    creditos_por_secuencia : number = 0,
    minimo_puntos : number = 0,

    transferencias: Banco[] = [],
    perfil_completo : boolean = false,

    trabaja_lunes : boolean = false,
    trabaja_martes : boolean = false,
    trabaja_miercoles : boolean = false,
    trabaja_jueves : boolean = false,
    trabaja_viernes : boolean = false,
    trabaja_sabado : boolean = false,
    trabaja_domingo : boolean = false,

    horario_de_trabajo_inicio : string = '',
    horario_de_trabajo_fin : string = '',

  ){

    this._id          = _id;
    this.rfc          = rfc;
    this.nombre       = nombre;
    this.descripcion  = descripcion;
    this.nombre_negocio  = nombre_negocio;
    this.telefono     = telefono;
    this.direccion    = direccion;
    this.correo       = correo;
    this.contrasena   = contrasena;
    this.comision     = comision;
    this.latitude     = latitude;
    this.longitude    = longitude;
    this.usuario      = usuario;
    this.location     = location;
    this.usuario_id   = usuario_id;
    this.platillos    = platillos;
    this.categorias   = categorias;
    this.categoria    = categoria;
    this.categoria_id = categoria_id;
    this.banner_image = banner_image;
    this.foto         = foto;
    this.status       = status;
    this.lat          = lat;
    this.lng          = lng;
    this.draggable    = draggable;
    this.delivery     = delivery;
    this.entrega_en_tienda = entrega_en_tienda;
    this.kms_delivery = kms_delivery;
    this.distance     = distance;

    this.fecha_nacimiento        = fecha_nacimiento;
    this.id_personal             = id_personal;
    this.id_foto_anverso         = id_foto_anverso;
    this.id_foto_inverso         = id_foto_inverso;
    this.id_foto_anverso_url     = id_foto_anverso_url;
    this.id_foto_inverso_url     = id_foto_inverso_url;
    this.estado                  = estado;
    this.sitio_web               = sitio_web;
    this.clabe_bancaria          = clabe_bancaria;

    this.pago_efectivo           = pago_efectivo;
    this.pago_tarjeta            = pago_tarjeta;

    this.pago_telefono_lukita    = pago_telefono_lukita;
    this.pago_beneficiario_lukita = pago_beneficiario_lukita;
    this.pago_telefono_plin = pago_telefono_plin;
    this.pago_beneficiario_plin = pago_beneficiario_plin;
    this.pago_telefono_yape = pago_telefono_yape;
    this.pago_beneficiario_yape = pago_beneficiario_yape;

    this.pago_cuenta_banco = pago_cuenta_banco;
    this.banco = banco;
    this.pago_beneficiario = pago_beneficiario;

    this.costo_delivery          = costo_delivery;
    this.total_delivery          = total_delivery;
    this.costo_minimo          = costo_minimo;

    this.tiempo_estimado = tiempo_estimado;

    this.sistema_de_puntos = sistema_de_puntos;
    this.secuencia = secuencia;
    this.creditos_por_secuencia = creditos_por_secuencia;
    this.minimo_puntos = minimo_puntos;

    this.transferencias = transferencias;
    this.perfil_completo = perfil_completo;

    this.trabaja_lunes = trabaja_lunes;
    this.trabaja_martes = trabaja_martes;
    this.trabaja_miercoles = trabaja_miercoles;
    this.trabaja_jueves = trabaja_jueves;
    this.trabaja_viernes = trabaja_viernes;
    this.trabaja_sabado = trabaja_sabado;
    this.trabaja_domingo = trabaja_domingo;

    this.horario_de_trabajo_inicio = horario_de_trabajo_inicio;
    this.horario_de_trabajo_fin = horario_de_trabajo_fin;

  }
}
