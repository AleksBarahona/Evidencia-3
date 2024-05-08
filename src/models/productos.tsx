export interface Productos {
    id_productos: number;
    descripcion: String;
    precio: number;
    fk_categoria: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado_por: number;
    fecha_eliminacion?: Date | null;
    fk_eliminado_por?: number | null;
}