

import { Tipo_Usuario } from './tipo_usuario.model';
import { Negocio } from './negocio.model';

export class Usuario {

  public _id : String;
  public nombre: String;
  public foto: String;
  public telefono: String;
  public referencia: String;
  public tipo_usuario: Tipo_Usuario;
  public tipo_usuario_id: String;
  public negocio: Object;
  public negocio_id: String;
  public fecha_alta: String;
  public correo: String;
  public contrasena: String;
  public contrasena_verifica: String;
  public direccion_id: String;
  public customer_id: String;
  public codigo_seguridad: String;
  public status: number;

  constructor(
      _id : string = '',
      nombre: string = '',
      foto: string = '',
      telefono: string = '',
      referencia: string = '',
      tipo_usuario: Tipo_Usuario = new Tipo_Usuario(),
      tipo_usuario_id: string = '',
      negocio: string = '',
      negocio_id: string = '',
      fecha_alta: string = '',
      correo: string = '',
      contrasena: string = '',
      contrasena_verifica: string = '',
      direccion_id: string = '',
      customer_id: string = '',
      codigo_seguridad: string = '',
      status: number = 1
  ) {

    this._id              = _id;
    this.nombre           = nombre;
    this.foto             = foto;
    this.telefono         = telefono;
    this.referencia       = referencia;
    this.tipo_usuario     = tipo_usuario;
    this.negocio          = negocio;
    this.negocio_id       = negocio_id;
    this.tipo_usuario_id  = tipo_usuario_id;
    this.fecha_alta       = fecha_alta;
    this.correo           = correo;
    this.contrasena       = contrasena;
    this.contrasena_verifica = contrasena_verifica;
    this.direccion_id     = direccion_id;
    this.customer_id      = customer_id;
    this.codigo_seguridad = codigo_seguridad;
    this.status           = status;

  }
}
