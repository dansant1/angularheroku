

import { Platillo } from './platillo.model';
import { SubCategoria } from './subcategoria.model';

export class Categoria {

  public _id : String;
  public nombre: String;
  public negocio_id: String;
  public categoria: SubCategoria;
  public categoria_id: String;
  public foto: String;
  public status: number;
  public expand : boolean;
  public tipo_listado : number;
  public platillos : Platillo[];

  constructor(
    _id : string = '',
    nombre: string = '',
    negocio_id: string = '',
    categoria: SubCategoria = new SubCategoria(),
    categoria_id: string = '',
    foto: string = '',
    status: number = 1,
    expand : boolean = false,
    tipo_listado: number = 1,
    platillos: Platillo[] = [],
  ){

    this._id          = _id;
    this.nombre       = nombre;
    this.negocio_id   = negocio_id;
    this.categoria    = categoria;
    this.categoria_id = categoria_id;
    this.foto         = foto;
    this.status       = status;
    this.expand       = expand;
    this.tipo_listado = tipo_listado;
    this.platillos    = platillos;

  }
}
