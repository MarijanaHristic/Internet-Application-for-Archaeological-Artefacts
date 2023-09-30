import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-add-predefinied-val',
  templateUrl: './admin-add-predefinied-val.component.html',
  styleUrls: ['./admin-add-predefinied-val.component.css']
})
export class AdminAddPredefiniedValComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private service: AdminService) {
    this.titleService.setTitle("Dodaj vrednost - The Flow Serbia");
   }

  ngOnInit(): void {
    const storedJsonString = localStorage.getItem('member');
    if (storedJsonString) {
      this.member = JSON.parse(storedJsonString);
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
    this.passwordValidationMessage2 = ""
    this.changePasswordSuccessfull = false
    this.newValue = ""
    this.category = ""

    document.addEventListener("click", this.handleClickOutsideModal.bind(this));
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
  passwordValidationMessage2: string
  changePasswordSuccessfull: boolean

  newValue: string
  category: string

  checkPassword2(password) {
    let pattern1 = /^\S{7,12}$/
    let result1 = pattern1.test(password)
    if (result1 == false) {
      this.passwordValidationMessage2 = "*Dužina lozinke mora biti između 7 i 12 karaktera"
      return false;
    }
    let pattern2 = /^.*[A-Z]{1}.*$/
    let result2 = pattern2.test(password)
    if (result2 == false) {
      this.passwordValidationMessage2 = "*Lozinka mora sadržati najmanje jedno veliko slovo"
      return false;
    }
    let pattern3 = /^.*[\d]{1}.*$/
    let result3 = pattern3.test(password)
    if (result3 == false) {
      this.passwordValidationMessage2 = "*Lozinka mora sadržati najmanje jednu cifru"
      return false;
    }
    let pattern4 = /^.*[\W]{1}.*$/
    let result4 = pattern4.test(password)
    if (result4 == false) {
      this.passwordValidationMessage2 = "*Lozinka mora sadržati najmanje jedan specijalni karakter"
      return false;
    }
    let pattern5 = /^[A-Za-z].*$/
    let result5 = pattern5.test(password)
    if (result5 == false) {
      this.passwordValidationMessage2 = "*Lozinka mora počinjati slovom"
      return false;
    }
    return true;
  }


  changePassword() {
    this.changePasswordSuccessfull = false
    this.messageInputNewPassword = ""
    this.messageInputNewPassword2 = ""
    this.messageInputOldPassword = ""
    this.colorInputNewPassword = false
    this.colorInputNewPassword2 = false
    this.colorInputOldPassword = false
    this.passwordValidationMessage2 = ""
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
    let validationPassword = this.checkPassword2(this.inputNewPassword)
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


  logout() {
    localStorage.clear()
    this.router.navigate([''])
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

  insertNewVal(){
    console.log(this.newValue)
    console.log(this.category)
    if(this.newValue == "" || this.category == "") return
    this.service.insertNewVal(this.category, this.newValue).subscribe(resp=>{
      this.ngOnInit()
    })
  }

}
