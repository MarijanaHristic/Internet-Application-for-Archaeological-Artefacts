import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000'

  changePassword(id, password){
    const data = {
      id: id,
      password: password
    }

    return this.http.post(`${this.uri}/user/changePassword`, data)
  }

  getAllArtefacts(){
    return this.http.get(`${this.uri}/user/getAllArtefacts`)
  }

  archaeologicalExcSiteSearch(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/archaeologicalExcSiteSearch`, data)
  }

  materialSearch(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/materialSearch`, data)
  }

  museumSearch(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/museumSearch`, data)
  }

  relativeDatingSearch(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/relativeDatingSearch`, data)
  }

  contextSearch(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/contextSearch`, data)
  }

  search(searchParam){
    const data = {
      searchParam: searchParam
    }

    return this.http.post(`${this.uri}/user/search`, data)
  }
}
