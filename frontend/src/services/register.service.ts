import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000'

  register(id, firstname, lastname, username, password, email, institution){
    const data = {
      id: id, 
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      institution: institution
    }

    return this.http.post(`${this.uri}/registerPage/register`, data)
  }

  getMaxId(){
    return this.http.get(`${this.uri}/registerPage/getMaxId`)
  }

  checkUsername(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/registerPage/checkUsername`, data)
  }

  checkEmail(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/registerPage/checkEmail`, data)
  }

  sendResetEmail(email){
    const data = 
    { email: email }
    return this.http.post(`${this.uri}/loginPage/resetPassword`, data)
  }

}
