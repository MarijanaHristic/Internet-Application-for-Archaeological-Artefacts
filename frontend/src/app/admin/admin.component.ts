import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { Request } from 'src/models/request';
import { User } from 'src/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminService, private router: Router, private titleService: Title, private renderer: Renderer2) {
    this.titleService.setTitle("Članovi - The Flow Serbia");
  }

  ngOnInit(): void {
    const storedJsonString = localStorage.getItem('member');
    if (storedJsonString) {
      this.member =  JSON.parse(storedJsonString);
    }
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
    this.service.requestsOnHold().subscribe((requests: Request[]) => {
      this.requestsOnHold = requests
    })
    this.service.requestsAccepted().subscribe((requests: Request[]) => {
      this.requestsAccepted = requests
    })
    this.service.getAllMembers().subscribe((users: User[]) => {
      this.allMembers = users
      this.allMembers.sort((elem1, elem2) => {
        if (elem1.tip > elem2.tip) return 1
        else if (elem1.tip < elem2.tip) return -1
        else return 0
      })
    })
    this.idForDelete = null
    this.forDeleteFirstname = null
    this.forDeleteLastname = null
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


  requestsOnHold: Request[] = []
  requestsAccepted: Request[] = []
  allMembers: User[] = []
  idForDelete: number
  forDeleteFirstname: string
  forDeleteLastname: string

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
  changePasswordSuccessfull: boolean

  changeRoleFirstname: string
  changeRoleLastname: string
  changeRoleId: number
  changeRoleTo: string

  denyRequest(id) {
    this.service.denyRequest(id).subscribe(resp => {
      this.ngOnInit()
    })
  }

  acceptRequest(id) {
    this.service.acceptRequest(id).subscribe(resp => {
      this.ngOnInit()
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  becomeAdmin() {
    this.service.becomeAdmin(this.changeRoleId).subscribe(resp => {
      this.ngOnInit();
    })
  }

  becomeUser() {
    this.service.becomeUser(this.changeRoleId).subscribe(resp => {
      this.ngOnInit();
    })
  }

  deleteMember(m) {
    console.log(m)
    this.idForDelete = m.id
    this.forDeleteFirstname = m.ime
    this.forDeleteLastname = m.prezime
  }

  delete() {
    this.service.deleteMember(this.idForDelete).subscribe(resp => {
      this.ngOnInit();
    })
  }

  closeModal(){
    if(this.changePasswordSuccessfull == true){
      localStorage.clear()
      this.changePasswordSuccessfull = false
      this.router.navigate([''])
    } else {
      console.log("nista")
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
    if(this.member.lozinka != this.inputOldPassword){
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
    this.service.changePassword(this.member.id, this.inputNewPassword).subscribe(resp=>{
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

  deleteArtefact(id){
    this.service.deleteArtefact(id).subscribe(resp=>{
      this.ngOnInit()
    })
  }

  changeRole(m: User){
    this.changeRoleFirstname = m.ime
    this.changeRoleLastname = m.prezime
    this.changeRoleId = m.id
    if(m.tip == "korisnik") this.changeRoleTo = "admin"
    else this.changeRoleTo = "korisnik"
  }

}
