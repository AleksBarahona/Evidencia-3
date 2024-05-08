export interface Direcciones{
    id_direccion: number;
    codigo_postal: number;
    calle: String;
    colonia: String;
    num_ext: number;
    num_int: number;
    ciudad: String;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado_por: number;
    fecha_eliminacion?: Date | null;
    fk_eliminado_por?: number | null;
}