import { EmailValidator } from '../presentation/protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (emai: string): boolean {
    return false
  }
}
