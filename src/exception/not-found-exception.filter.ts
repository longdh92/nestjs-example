import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): any {
        const response = host.switchToHttp().getResponse();
        response.status(404).json({
            statusCode: 404,
            message: exception.message,
        });
    }
}
