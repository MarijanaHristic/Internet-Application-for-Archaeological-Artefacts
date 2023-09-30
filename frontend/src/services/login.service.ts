import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  uri = 'http://localhost:4000'

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/loginPage/login`, data)
  }

  sendResetEmail(email){
    const data = 
    { email: email }
    return this.http.post(`${this.uri}/loginPage/resetPassword`, data)
  }
}
