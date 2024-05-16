export interface Clientes{
    id_cliente: number;
    nombre: String;
    apellido: String;
    fecha_nac?: Date;
    fk_genero: number;
    telefono?: number;
    correo: String;
    fk_direccion: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado_por: number;
    fecha_eliminacion?: Date | null;
    fk_eliminado_por?: number | null;
}