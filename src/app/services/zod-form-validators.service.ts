import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodType } from 'zod';

export class ZodFormValidators {

  static fromZod<T>(schema: ZodType<T>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = schema.safeParse(control.value);
      return result.success
        ? null
        : { zod: result.error.issues[0].message };
    };
  }
}
