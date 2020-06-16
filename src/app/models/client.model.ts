export interface Client {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt: string;
  foto?: any;
  facturas: Factura[];
}

export interface Factura {
  id: number;
  descripcion: string;
  observacion?: any;
  createAt: string;
  items: Item[];
}

export interface Item {
  id: number;
  cantidad: number;
  producto: Producto;
  importe: number;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  createAt: string;
}