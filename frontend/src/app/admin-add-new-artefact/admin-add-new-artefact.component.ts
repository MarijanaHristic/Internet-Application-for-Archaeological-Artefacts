import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PredefiniedValObj } from 'src/models/predefiniedValObj';
import { User } from 'src/models/user';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-add-new-artefact',
  templateUrl: './admin-add-new-artefact.component.html',
  styleUrls: ['./admin-add-new-artefact.component.css']
})
export class AdminAddNewArtefactComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private service: AdminService) {
    this.titleService.setTitle("Novi unos - The Flow Serbia");
  }

  ngOnInit(): void {
    const storedJsonString = localStorage.getItem('member');
    if (storedJsonString) {
      this.member = JSON.parse(storedJsonString);
    }
    this.service.getPredefiniedValuesObject().subscribe((resp: PredefiniedValObj)=>{
      console.log(resp)
      this.predefiniedValuesObj = resp
    })
    this.messageInputNewPassword = ""
    this.messageInputNewPassword2 = ""
    this.messageInputOldPassword = ""
    this.colorInputNewPassword = false
    this.colorInputNewPassword2 = false
    this.colorInputOldPassword = false
    this.inputNewPassword = ""
    this.inputNewPassword2 = ""
    this.inputOldPassword = ""
    this.passwordValidationMessage = ""
    this.changePasswordSuccessfull = false
    this.service.getMaxIdOfArtefact().subscribe((resp: number) => {
      this.id = resp
      console.log(this.id)
    })
    this.picture = null
    this.pictureText = ""
    this.length = 0
    this.width = 0
    this.height = 0
    this.diameter = 0
    this.thickness = 0
    this.weight = 0
    this.descArtefact = ""
    this.analogies = ""
    this.material = ""
    this.descSample = ""
    this.rawMaterial = ""
    this.archaeologicalExcSite = ""
    this.museum = ""
    this.invNumber = ""
    this.relativeDating = ""
    this.absoluteDating = ""
    this.context = ""
    this.x = 0
    this.y = 0
    this.z = 0
    this.xrdClicked = false
    this.xrfClicked = false
    this.xsClicked = false
    this.oslClicked = false
    this.xrfPicture = null
    this.xrfDesc = null
    this.xrdPicture = null
    this.xrdDesc = null
    this.xsPicture = null
    this.xsDesc = null
    this.oslPicture = null
    this.oslDesc = null
    this.addLinkClicked = false
    this.addPdfClicked = false
    this.pdf = null
    this.link = null
    this.linkArray = []
    this.pdfArray = []
    this.xrfPictureArray = []
    this.xrfDescArray = []
    this.xrdPictureArray = []
    this.xrdDescArray = []
    this.xsPictureArray = []
    this.xsDescArray = []
    this.oslPictureArray = []
    this.oslDescArray = []
    document.addEventListener("click", this.handleClickOutsideModal.bind(this));
    const input1 = document.getElementById("OldPassword") as HTMLInputElement;
    const input2 = document.getElementById("NewPassword") as HTMLInputElement;
    const input3 = document.getElementById("NewPassword2") as HTMLInputElement;
    input1.addEventListener("input", () => resizeFont1(this.inputOldPassword));
    input2.addEventListener("input", () => resizeFont2(this.inputNewPassword));
    input3.addEventListener("input", () => resizeFont3(this.inputNewPassword2));

    input1.style.fontSize = 14 + "px";
    input1.style.letterSpacing = 0 + "px";
    input2.style.fontSize = 14 + "px";
    input2.style.letterSpacing = 0 + "px";
    input3.style.fontSize = 14 + "px";
    input3.style.letterSpacing = 0 + "px";

    function resizeFont1(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input1.style.fontSize = newSize + "px";
      input1.style.letterSpacing = newLetterSpacing + "px";
    }

    function resizeFont2(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input2.style.fontSize = newSize + "px";
      input2.style.letterSpacing = newLetterSpacing + "px";
    }

    function resizeFont3(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input3.style.fontSize = newSize + "px";
      input3.style.letterSpacing = newLetterSpacing + "px";
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener("click", this.handleClickOutsideModal.bind(this));
  }

  handleClickOutsideModal(event: MouseEvent) {
    const modal = document.getElementById("modalContent");
    if (modal && !modal.contains(event.target as Node) && this.changePasswordSuccessfull == true) {
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
      this.changePasswordSuccessfull = false
      this.router.navigate(['']);
    }
  }

  id: number
  picture: string = null
  pictureText: string
  length: number
  width: number
  height: number
  diameter: number
  thickness: number
  weight: number
  descArtefact: string
  analogies: string
  material: string
  descSample: string
  rawMaterial: string
  archaeologicalExcSite: string
  museum: string
  invNumber: string
  relativeDating: string
  absoluteDating: string
  context: string
  x: number
  y: number
  z: number

  xrfClicked: boolean
  xrdClicked: boolean
  xsClicked: boolean
  oslClicked: boolean

  xrfPicture: string
  xrfDesc: string
  xrdPicture: string
  xrdDesc: string
  xsPicture: string
  xsDesc: string
  oslPicture: string
  oslDesc: string

  xrfPictureArray: String[] = []
  xrdPictureArray: String[] = []
  xsPictureArray: String[] = []
  oslPictureArray: String[] = []
  xrfDescArray: Object[] = []
  xrdDescArray: String[] = []
  xsDescArray: String[] = []
  oslDescArray: String[] = []


  addLinkClicked: boolean
  addPdfClicked: boolean

  pdfArray: String[] = []
  linkArray: String[] = []

  pdf: string
  link: string

  changePasswordSuccessfull: boolean

  messageInputOldPassword: string
  messageInputNewPassword: string
  messageInputNewPassword2: string
  colorInputOldPassword: boolean
  colorInputNewPassword: boolean
  colorInputNewPassword2: boolean
  inputOldPassword: string
  inputNewPassword: string
  inputNewPassword2: string
  member: User
  passwordValidationMessage: string

  predefiniedValuesObj: PredefiniedValObj


  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }


  selectPicture(event) {
    if (event.target.files.length > 0) {
      this.picture = event.target.files[0]
    }
  }

  closeModal() {
    if (this.changePasswordSuccessfull == true) {
      localStorage.clear()
      this.changePasswordSuccessfull = false
      this.router.navigate([''])
    } else {
      this.ngOnInit()
    }
  }

  checkPassword(password) {
    let pattern1 = /^\S{7,12}$/
    let result1 = pattern1.test(password)
    if (result1 == false) {
      this.passwordValidationMessage = "*Dužina lozinke mora biti između 7 i 12 karaktera"
      return false;
    }
    let pattern2 = /^.*[A-Z]{1}.*$/
    let result2 = pattern2.test(password)
    if (result2 == false) {
      this.passwordValidationMessage = "*Lozinka mora sadržati najmanje jedno veliko slovo"
      return false;
    }
    let pattern3 = /^.*[\d]{1}.*$/
    let result3 = pattern3.test(password)
    if (result3 == false) {
      this.passwordValidationMessage = "*Lozinka mora sadržati najmanje jednu cifru"
      return false;
    }
    let pattern4 = /^.*[\W]{1}.*$/
    let result4 = pattern4.test(password)
    if (result4 == false) {
      this.passwordValidationMessage = "*Lozinka mora sadržati najmanje jedan specijalni karakter"
      return false;
    }
    let pattern5 = /^[A-Za-z].*$/
    let result5 = pattern5.test(password)
    if (result5 == false) {
      this.passwordValidationMessage = "*Lozinka mora počinjati slovom"
      return false;
    }
    return true;
  }

  changePassword() {
    this.changePasswordSuccessfull = false
    this.messageInputNewPassword = ""
    this.messageInputNewPassword2 = ""
    this.messageInputOldPassword = ""
    this.passwordValidationMessage = ""
    this.colorInputNewPassword = false
    this.colorInputNewPassword2 = false
    this.colorInputOldPassword = false
    if (this.inputOldPassword == "") {
      this.messageInputOldPassword = "*Unesite staru lozinku"
      this.colorInputOldPassword = true
    }
    if (this.inputNewPassword == "") {
      this.messageInputNewPassword = "*Unesite novu lozinku"
      this.colorInputNewPassword = true
    }
    if (this.inputNewPassword2 == "") {
      this.messageInputNewPassword2 = "*Unesite potvrdu nove lozinke"
      this.colorInputNewPassword2 = true
    }
    if (this.inputOldPassword == "" || this.inputNewPassword == "" || this.inputNewPassword2 == "") return
    if (this.member.lozinka != this.inputOldPassword) {
      this.messageInputOldPassword = "*Lozinka nije ispravna"
      this.colorInputOldPassword = true
      return
    }
    let validationPassword = this.checkPassword(this.inputNewPassword)
    if (validationPassword == false) {
      this.colorInputNewPassword = true
      return
    }
    if (this.inputNewPassword != this.inputNewPassword2) {
      this.messageInputNewPassword2 = "*Potvrda nove lozinke se ne podudara";
      this.colorInputNewPassword2 = true;
      this.colorInputNewPassword = true
      return
    }
    this.service.changePassword(this.member.id, this.inputNewPassword).subscribe(resp => {
      this.changePasswordSuccessfull = true
      this.inputNewPassword = ""
      this.inputNewPassword2 = ""
      this.inputOldPassword = ""
      const input1 = document.getElementById("OldPassword") as HTMLInputElement;
      const input2 = document.getElementById("NewPassword") as HTMLInputElement;
      const input3 = document.getElementById("NewPassword2") as HTMLInputElement;

      input1.style.fontSize = 14 + "px";
      input1.style.letterSpacing = 0 + "px";
      input2.style.fontSize = 14 + "px";
      input2.style.letterSpacing = 0 + "px";
      input3.style.fontSize = 14 + "px";
      input3.style.letterSpacing = 0 + "px";
    })
  }

  addArtefact() {
    if(this.picture == null && this.pictureText == "" && this.length == 0 && this.width == 0 && this.height == 0 && this.diameter == 0
    && this.thickness == 0 && this.weight == 0 && this.descArtefact == "" && this.analogies == "" && this.material == ""
    && this.descSample == "" && this.rawMaterial == "" && this.archaeologicalExcSite == "" && this.museum == "" && this.invNumber == ""
    && this.relativeDating == "" && this.absoluteDating == "" && this.context == "" && this.x == 0 && this.y == 0 && this.z == 0
    && this.pdfArray.length == 0 && this.linkArray.length == 0 && this.xrfPictureArray.length == 0 &&
    this.xrfDescArray.length == 0 && this.xrdPictureArray.length == 0 && this.xrdDescArray.length == 0
    && this.xsPictureArray.length == 0 && this.xsDescArray.length == 0 && this.oslPictureArray.length == 0 && this.oslDescArray.length == 0){
      return
    }
    this.service.addArtefact(this.id, this.picture, this.pictureText, this.length, this.width, this.height, this.diameter,
      this.thickness, this.weight, this.descArtefact, this.analogies, this.material, this.descSample,
      this.rawMaterial, this.archaeologicalExcSite, this.museum, this.invNumber, this.relativeDating, this.absoluteDating,
      this.context, this.x, this.y, this.z, this.pdfArray, JSON.stringify(this.linkArray)).subscribe(resp => {
        this.service.putPdfs(this.pdfArray, this.id).subscribe(resp => {

          this.service.putXrfs(this.xrfPictureArray, JSON.stringify(this.xrfDescArray), this.id).subscribe(resp => {

            this.service.putXrds(this.xrdPictureArray,  JSON.stringify(this.xrdDescArray), this.id).subscribe(resp => {

              this.service.putXss(this.xsPictureArray, JSON.stringify(this.xsDescArray), this.id).subscribe(resp => {

                this.service.putOsls(this.oslPictureArray,  JSON.stringify(this.oslDescArray), this.id).subscribe(resp => {
                  this.ngOnInit()
                })
              })
            })
          })
        })
      })
  }

  xrfClickedButton() {
    this.xrdClicked = false
    this.xrfClicked = true
    this.xsClicked = false
    this.oslClicked = false
    this.xrfPicture = ""
    this.xrfDesc = ""
    this.xrdPicture = ""
    this.xrdDesc = ""
    this.xsPicture = ""
    this.xsDesc = ""
    this.oslPicture = ""
    this.oslDesc = ""
  }

  xrdClickedButton() {
    this.xrdClicked = true
    this.xrfClicked = false
    this.xsClicked = false
    this.oslClicked = false
    this.xrfPicture = ""
    this.xrfDesc = ""
    this.xrdPicture = ""
    this.xrdDesc = ""
    this.xsPicture = ""
    this.xsDesc = ""
    this.oslPicture = ""
    this.oslDesc = ""
  }

  xsClickedButton() {
    this.xrdClicked = false
    this.xrfClicked = false
    this.xsClicked = true
    this.oslClicked = false
    this.xrfPicture = ""
    this.xrfDesc = ""
    this.xrdPicture = ""
    this.xrdDesc = ""
    this.xsPicture = ""
    this.xsDesc = ""
    this.oslPicture = ""
    this.oslDesc = ""
  }

  oslClickedButton() {
    this.xrdClicked = false
    this.xrfClicked = false
    this.xsClicked = false
    this.oslClicked = true
    this.xrfPicture = ""
    this.xrfDesc = ""
    this.xrdPicture = ""
    this.xrdDesc = ""
    this.xsPicture = ""
    this.xsDesc = ""
    this.oslPicture = ""
    this.oslDesc = ""
  }

  linkClicked() {
    this.addLinkClicked = true
    this.addPdfClicked = false
  }

  pdfClicked() {
    this.addLinkClicked = false
    this.addPdfClicked = true
  }

  addLink() {
    if (this.link == "" || this.link == null) return
    this.linkArray.push(this.link)
    this.link = null
  }

  selectPdf(event) {
    if (event.target.files.length > 0) {
      this.pdf = event.target.files[0]
    }
  }

  addPdf() {
    if (this.pdf == "" || this.pdf == null) return
    this.pdfArray.push(this.pdf)
    this.pdf = null
  }

  deleteLink(index) {
    this.linkArray.splice(index, 1)
  }

  deletePdf(index) {
    this.pdfArray.splice(index, 1)
  }

  writeFilename(p) {
    if (p)
      return p.name
    else return ""
  }

  selectXrf(event) {
    if (event.target.files.length > 0) {
      this.xrfPicture = event.target.files[0]
    }
  }

  selectXrd(event) {
    if (event.target.files.length > 0) {
      this.xrdPicture = event.target.files[0]
    }
  }

  selectXs(event) {
    if (event.target.files.length > 0) {
      this.xsPicture = event.target.files[0]
    }
  }

  selectOsl(event) {
    if (event.target.files.length > 0) {
      this.oslPicture = event.target.files[0]
    }
  }

  addXrf() {
    if ((this.xrfPicture == "" || this.xrfPicture == null) && (this.xrfDesc == "" || this.xrfDesc == null)) return
    if (this.xrfPicture == null || this.xrfPicture == "") { this.xrfPictureArray.push("") }
    else this.xrfPictureArray.push(this.xrfPicture)
    if (this.xrfDesc == null || this.xrfDesc == "") { this.xrfDescArray.push("") }
    else this.xrfDescArray.push(this.xrfDesc)
    this.xrfPicture = null
    this.xrfDesc = ""
  }

  addXrd() {
    if ((this.xrdPicture == "" || this.xrdPicture == null) && (this.xrdDesc == "" || this.xrdDesc == null)) return
    if (this.xrdPicture == null || this.xrdPicture == "") { this.xrdPictureArray.push("") }
    else this.xrdPictureArray.push(this.xrdPicture)
    if (this.xrdDesc == null || this.xrdDesc == "") { this.xrdDescArray.push("") }
    else this.xrdDescArray.push(this.xrdDesc)
    this.xrdPicture = null
    this.xrdDesc = ""
  }

  addXs() {
    if ((this.xsPicture == "" || this.xsPicture == null) && (this.xsDesc == "" || this.xsDesc == null)) return
    if (this.xsPicture == null || this.xsPicture == "") { this.xsPictureArray.push("") }
    else this.xsPictureArray.push(this.xsPicture)
    if (this.xsDesc == null || this.xsDesc == "") { this.xsDescArray.push("") }
    else this.xsDescArray.push(this.xsDesc)
    this.xsPicture = null
    this.xsDesc = ""
  }

  addOsl() {
    if ((this.oslPicture == "" || this.oslPicture == null) && (this.oslDesc == "" || this.oslDesc == null)) return
    if (this.oslPicture == null || this.oslPicture == "") { this.oslPictureArray.push("") }
    else this.oslPictureArray.push(this.oslPicture)
    if (this.oslDesc == null || this.oslDesc == "") { this.oslDescArray.push("") }
    else this.oslDescArray.push(this.oslDesc)
    this.oslPicture = null
    this.oslDesc = ""
  }

  deleteXrf(index) {
    this.xrfDescArray.splice(index, 1)
    this.xrfPictureArray.splice(index, 1)
  }

  deleteXrd(index) {
    this.xrdDescArray.splice(index, 1)
    this.xrdPictureArray.splice(index, 1)
  }

  deleteXs(index) {
    this.xsDescArray.splice(index, 1)
    this.xsPictureArray.splice(index, 1)
  }

  deleteOsl(index) {
    this.oslDescArray.splice(index, 1)
    this.oslPictureArray.splice(index, 1)
  }

  lessText(text) {
    if (text.length > 50) {
      return text.slice(0, 50) + '...';
    }
    return text;
  }






}
