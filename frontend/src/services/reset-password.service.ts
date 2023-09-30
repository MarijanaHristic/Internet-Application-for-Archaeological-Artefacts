import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  resetPassword(email, password) {
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/resetPasswordPage/resetPassword`, data)
  }
}
