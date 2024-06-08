import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private zodSchema: ZodSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'custom') return value;

      const parsedValue = this.zodSchema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError)
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        });
      throw new BadRequestException('Validation Failed');
    }
  }
}
