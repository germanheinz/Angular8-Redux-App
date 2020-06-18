export class Client {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt?: string;
  foto?: any;
  facturas?: Factura[];
}

export class Factura {
  id: number;
  descripcion: string;
  observacion?: any;
  createAt: string;
  items: Item[];
}

export class Item {
  id: number;
  cantidad: number;
  producto: Producto;
  importe: number;
}

export class Producto {
  id: number;
  nombre: string;
  precio: number;
  createAt: string;
}