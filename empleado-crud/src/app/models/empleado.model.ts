export interface Empleado {
  id?: number; 
  nombre: string;
  correo: string;
  cargo?: string;
  departamento?: string;
  telefono?: string;
  fecha?: string; //el formato es |YYYY-MM-DD|
  activo?: boolean;
}
