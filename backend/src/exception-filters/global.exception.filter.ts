import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BSONError } from 'bson';
import { Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch() // este decorador captura una excepcion,
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR; // si el status es internal server error no entra en el switch y devuelve directamente
    let message = 'Internal Server Error';
    const { url } = request;
    const timestamp = new Date().toISOString();
    let details = undefined;

    // Utilizamos un switch para manejar diferentes tipos de excepciones
    switch (true) {
      // Manejo de excepciones de tipo HttpException
      case exception instanceof HttpException:
        status = exception.getStatus();
        const response = exception.getResponse();
        message = exception.message;
        details =
          typeof response === 'object' ? response['message'] : undefined;
        break;
      // Manejo de excepciones de tipo QueryFailedError (TypeORM)
      case exception instanceof QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        break;
      // Manejo de excepciones de tipo EntityNotFoundError y CannotCreateEntityIdMapError (TypeORM)
      case exception instanceof EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        break;
      case exception instanceof CannotCreateEntityIdMapError: //guardar una entidad que ya tiene un ID asignado
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        break;
      case exception instanceof BSONError: //Mongo - Error de ObjectId
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = `"ObjectID error: "${exception.message}`;
        break;
      default:
        break;
    }
    console.error(exception);

    // Respondemos con el código de estado, mensaje y, opcionalmente, el código de error
    response.status(status).json({
      message,
      timestamp,
      url,
      statusCode: status,
      details,
      path: request.url,
    });
  }
}
