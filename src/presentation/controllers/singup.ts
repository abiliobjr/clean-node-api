import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissinParamError } from '../erros/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissinParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissinParamError('email')
      }
    }
  }
}
