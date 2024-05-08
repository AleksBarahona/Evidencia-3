export interface Sesiones{
    id_sesion: number;
    fecha_sesion: Date;
    hora_sesion: Date;
    fk_cliente: number;
    fecha_venta: Date;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado_por: number;
    fecha_eliminacion?: Date | null;
    fk_eliminado_por?: number | null;
}