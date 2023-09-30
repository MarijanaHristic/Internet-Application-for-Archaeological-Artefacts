import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  requestsOnHold() {
    return this.http.get(`${this.uri}/admin/requestsOnHold`)
  }

  getAllMembers() {
    return this.http.get(`${this.uri}/admin/getAllMembers`)
  }

  denyRequest(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/denyRequest`, data)
  }

  acceptRequest(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/acceptRequest`, data)
  }

  requestsAccepted() {
    return this.http.get(`${this.uri}/admin/requestsAccepted`)
  }

  register(id, firstname, lastname, username, password, email, type, institution) {
    const data = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      type: type,
      institution: institution
    }

    return this.http.post(`${this.uri}/admin/registerUser`, data)
  }

  getMaxId() {
    return this.http.get(`${this.uri}/admin/getMaxId`)
  }

  checkUsername(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/admin/checkUsername`, data)
  }

  checkEmail(email) {
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/admin/checkEmail`, data)
  }

  becomeAdmin(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/becomeAdmin`, data)
  }

  becomeUser(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/becomeUser`, data)
  }

  deleteMember(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/deleteMember`, data)
  }

  changePassword(id, password) {
    const data = {
      id: id,
      password: password
    }

    return this.http.post(`${this.uri}/admin/changePassword`, data)
  }

  addArtefact(id, picture, pictureText, length, width, height, diameter, thickness, weight, descArtefact, analogies,
    material, descSample, rawMaterial, archaeologicalExcSite, museum, invNumber, relativeDating, absoluteDating, context,
    x, y, z, pdfs, links) {
    const data = new FormData();
    data.append('picture', picture)
    data.set('pdfs', pdfs)
    data.set('links', links)
    data.set('id', id)
    data.set('pictureText', pictureText)
    data.set('length', length)
    data.set('width', width)
    data.set('height', height)
    data.set('diameter', diameter)
    data.set('thickness', thickness)
    data.set('weight', weight)
    data.set('descArtefact', descArtefact)
    data.set('analogies', analogies)
    data.set('material', material)
    data.set('descSample', descSample)
    data.set('rawMaterial', rawMaterial)
    data.set('archaeologicalExcSite', archaeologicalExcSite)
    data.set('museum', museum)
    data.set('invNumber', invNumber)
    data.set('relativeDating', relativeDating)
    data.set('absoluteDating', absoluteDating)
    data.set('context', context)
    data.set('x', x)
    data.set('y', y)
    data.set('z', z)

    return this.http.post(`${this.uri}/admin/addArtefact`, data)
  }

  deleteArtefact(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/deleteArtefact`, data)
  }

  getPic(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/admin/getPic`, data)
  }

  getMaxIdOfArtefact() {
    return this.http.get(`${this.uri}/admin/getMaxIdOfArtefact`)
  }

  putPdfs(pdfs, id){
    const data = new FormData();
    for (let i = 0; i < pdfs.length; i++) {
      data.append('pdfs', pdfs[i]);
    }
    data.set('id', id)

    return this.http.post(`${this.uri}/admin/putPdfs`, data)
  }

  putPdfsEdit(pdfs, id, pdfFilesOld){
    const data = new FormData();
    for (let i = 0; i < pdfs.length; i++) {
      data.append('pdfs', pdfs[i]);
    }
    data.set('id', id)
    data.set('pdfFilesOld', pdfFilesOld)

    return this.http.post(`${this.uri}/admin/putPdfsEdit`, data)
  }

  putXrfs(xrfs, xrfDescs, id){
    const data = new FormData();
    for (let i = 0; i < xrfs.length; i++) {
      data.append('xrfPictures', xrfs[i]);
    }
    data.set('xrfDescs', xrfDescs)
    data.set('id', id)
    data.append('mixedArray', JSON.stringify(xrfs))

    return this.http.post(`${this.uri}/admin/putXrfs`, data)
  }

  putXrds(xrds, xrdDescs, id){
    const data = new FormData();
    for (let i = 0; i < xrds.length; i++) {
      data.append('xrdPictures', xrds[i]);
    }
    data.set('xrdDescs', xrdDescs)
    data.set('id', id)
    data.append('mixedArray', JSON.stringify(xrds))

    return this.http.post(`${this.uri}/admin/putXrds`, data)
  }

  putXss(xss, xsDescs, id){
    const data = new FormData();
    for (let i = 0; i < xss.length; i++) {
      data.append('xsPictures', xss[i]);
    }
    data.set('xsDescs', xsDescs)
    data.set('id', id)
    data.append('mixedArray', JSON.stringify(xss))

    return this.http.post(`${this.uri}/admin/putXss`, data)
  }

  putOsls(osls, oslDescs, id){
    const data = new FormData();
    for (let i = 0; i < osls.length; i++) {
      data.append('oslPictures', osls[i]);
    }
    data.set('oslDescs', oslDescs)
    data.set('id', id)
    data.append('mixedArray', JSON.stringify(osls))

    return this.http.post(`${this.uri}/admin/putOsls`, data)
  }

  getAllArtefacts(){
    return this.http.get(`${this.uri}/admin/getAllArtefacts`)
  }

  update(id, picture, pictureText, length, width, height, diameter, thickness, weight, descArtefact, analogies,
    material, descSample, rawMaterial, archaeologicalExcSite, museum, invNumber, relativeDating, absoluteDating, context,
    x, y, z, links) {
    const data = new FormData();
    console.log(links)
    data.append('picture', picture)
    data.set('links', links)
    data.set('id', id)
    data.set('pictureText', pictureText)
    data.set('length', length)
    data.set('width', width)
    data.set('height', height)
    data.set('diameter', diameter)
    data.set('thickness', thickness)
    data.set('weight', weight)
    data.set('descArtefact', descArtefact)
    data.set('analogies', analogies)
    data.set('material', material)
    data.set('descSample', descSample)
    data.set('rawMaterial', rawMaterial)
    data.set('archaeologicalExcSite', archaeologicalExcSite)
    data.set('museum', museum)
    data.set('invNumber', invNumber)
    data.set('relativeDating', relativeDating)
    data.set('absoluteDating', absoluteDating)
    data.set('context', context)
    data.set('x', x)
    data.set('y', y)
    data.set('z', z)

    return this.http.post(`${this.uri}/admin/update`, data)
  }

  insertNewVal(category, value) {
    const data = {
      category: category,
      value: value
    }

    return this.http.post(`${this.uri}/admin/insertNewVal`, data)
  }

  getPredefiniedValuesObject() {
    return this.http.get(`${this.uri}/admin/getPredefiniedValuesObject`)
  }

}
