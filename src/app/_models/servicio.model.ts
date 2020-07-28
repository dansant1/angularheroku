


export class Servicio {

  public _id : String;
  public cover: String;
  public icon: String;
  public nombre: String;
  public descripcion: String;
  public total: number;
  public status: number;

  constructor(
      _id : string = '',
      cover: string = '',
      icon: string = '',
      nombre: string = '',
      descripcion: string = '',
      total: number = 0,
      status: number = 1
  ) {

    this._id              = _id;
    this.cover            = cover;
    this.icon             = icon;
    this.nombre           = nombre;
    this.descripcion      = descripcion;
    this.total            = total;
    this.status           = status;

  }
}
