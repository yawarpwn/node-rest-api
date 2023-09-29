/** Códigos de estado HTTP estándar en SNAKE_CASE. */
export const STATUS = {
  /** 200 - OK: La solicitud se ha completado satisfactoriamente. */
  OK: 200,

  /** 201 - Creado: La solicitud ha resultado en la creación de un nuevo recurso. */
  CREATED: 201,

  /** 204 - Sin contenido: La solicitud se ha completado, pero no hay contenido para enviar en la respuesta. */
  NO_CONTENT: 204,

  /** 300 - Elección múltiple: Indica múltiples opciones para el recurso que el cliente puede elegir. */
  MULTIPLE_CHOICES: 300,

  /** 301 - Movido permanentemente: La ubicación del recurso solicitado ha sido cambiada permanentemente. */
  MOVED_PERMANENTLY: 301,

  /** 400 - Solicitud incorrecta: La solicitud del cliente es incorrecta o no puede ser procesada por el servidor. */
  BAD_REQUEST: 400,

  /** 401 - No autorizado: El cliente no tiene permiso para acceder al recurso solicitado. */
  UNAUTHORIZED: 401,

  /** 403 - Prohibido: El servidor entiende la solicitud, pero se niega a cumplirla. */
  FORBIDDEN: 403,

  /** 404 - No encontrado: El recurso solicitado no se encuentra en el servidor. */
  NOT_FOUND: 404,

  /** 405 - No Permitido: recurso no permitido. */
  NOT_ALLOWED: 405,

  /** 500 - Error interno del servidor: El servidor encontró una situación inesperada que le impidió cumplir la solicitud. */
  INTERNAL_SERVER_ERROR: 500,
};

