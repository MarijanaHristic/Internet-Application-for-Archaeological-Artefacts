import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-add-new-user',
  templateUrl: './admin-add-new-user.component.html',
  styleUrls: ['./admin-add-new-user.component.css']
})
export class AdminAddNewUserComponent implements OnInit {

  constructor(private router: Router, private service: AdminService, private titleService: Title, private renderer: Renderer2) {
    this.titleService.setTitle("Dodaj člana - The Flow Serbia");
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

    this.username = ""
    this.password = ""
    this.password2 = ""
    this.email = ""
    this.firstname = ""
    this.lastname = ""
    this.type = ""
    this.institution = ""
    this.colorInputEmail = false
    this.colorInputFirstname = false
    this.colorInputLastname = false
    this.colorInputPassword = false
    this.colorInputPassword2 = false
    this.colorInputUsername = false
    this.colorInputType = false
    this.colorInputInstitution = false
    this.registerTrue = false
    this.service.getMaxId().subscribe((resp: number) => {
      this.id = resp
    })
    document.addEventListener("click", this.handleClickOutsideModal.bind(this));
    const input1 = document.getElementById("Password") as HTMLInputElement;
    const input2 = document.getElementById("Password2") as HTMLInputElement;
    input1.addEventListener("input", () => resizeFont1(this.password));
    input2.addEventListener("input", () => resizeFont2(this.password2));

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
    const input3 = document.getElementById("OldPassword") as HTMLInputElement;
    const input4 = document.getElementById("NewPassword") as HTMLInputElement;
    const input5 = document.getElementById("NewPassword2") as HTMLInputElement;
    input3.addEventListener("input", () => resizeFont3(this.inputOldPassword));
    input4.addEventListener("input", () => resizeFont4(this.inputNewPassword));
    input5.addEventListener("input", () => resizeFont5(this.inputNewPassword2));

    input3.style.fontSize = 14 + "px";
    input3.style.letterSpacing = 0 + "px";
    input4.style.fontSize = 14 + "px";
    input4.style.letterSpacing = 0 + "px";
    input5.style.fontSize = 14 + "px";
    input5.style.letterSpacing = 0 + "px";

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

    function resizeFont4(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input4.style.fontSize = newSize + "px";
      input4.style.letterSpacing = newLetterSpacing + "px";
    }

    function resizeFont5(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input5.style.fontSize = newSize + "px";
      input5.style.letterSpacing = newLetterSpacing + "px";
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

  @HostListener('window:keyup.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.register()
  }


  username: string
  password: string
  password2: string
  email: string
  firstname: string
  lastname: string
  id: number
  type: string
  institution: string
  messageFirstname: string
  messageLastname: string
  messageUsername: string
  messagePassword: string
  messageEmail: string
  messagePassword2: string
  messageInstitution: string
  passwordValidationMessage: string;
  matchPasswordsMessage: string
  emailFormatMessage: string
  emailUniqueMessage: string
  usernameUniqueMessage: string
  messageType: string

  colorInputUsername: boolean
  colorInputPassword: boolean
  colorInputPassword2: boolean
  colorInputFirstname: boolean
  colorInputLastname: boolean
  colorInputEmail: boolean
  colorInputType: boolean
  colorInputInstitution: boolean

  registerTrue: boolean

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

  register() {
    this.registerTrue = false
    this.colorInputOldPassword = false
    this.colorInputFirstname = false
    this.colorInputLastname = false
    this.colorInputPassword = false
    this.colorInputPassword2 = false
    this.colorInputUsername = false
    this.colorInputType = false
    this.colorInputEmail = false
    this.colorInputInstitution = false
    this.messageFirstname = ""
    this.messageLastname = ""
    this.messageUsername = ""
    this.messagePassword = ""
    this.messageEmail = ""
    this.messagePassword2 = ""
    this.messageInstitution = ""
    this.passwordValidationMessage = ""
    this.matchPasswordsMessage = ""
    this.emailFormatMessage = ""
    this.emailUniqueMessage = ""
    this.usernameUniqueMessage = ""
    this.messageType = ""
    if (this.firstname == "") {
      this.messageFirstname = "*Unesite ime"
      this.colorInputFirstname = true
    }
    if (this.lastname == "") {
      this.messageLastname = "*Unesite prezime"
      this.colorInputLastname = true
    }
    if (this.username == "") {
      this.messageUsername = "*Unesite korisničko ime"
      this.colorInputUsername = true
    }
    if (this.password == "") {
      this.messagePassword = "*Unesite lozinku"
      this.colorInputPassword = true
    }
    if (this.password2 == "") {
      this.messagePassword2 = "*Unesite potvrdu lozinke"
      this.colorInputPassword2 = true
    }
    if (this.email == "") {
      this.messageEmail = "*Unesite e-mail"
      this.colorInputEmail = true
    }
    if (this.type == "") {
      this.messageType = "*Izaberite tip članstva"
      this.colorInputType = true
    }
    if (this.institution == "") {
      this.messageInstitution = "*Unesite instituciju"
      this.colorInputInstitution = true
    }
    if (this.firstname == "" || this.lastname == "" || this.username == "" || this.password == "" || this.password2 == "" ||
      this.email == "" || this.type == "" || this.institution == "") return
    let validationPassword = this.checkPassword(this.password)
    if (validationPassword == false) {
      this.colorInputPassword = true
      return
    }
    let patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let resultEmail = patternEmail.test(this.email)
    if (resultEmail == false) {
      this.emailFormatMessage = "*Format email-a nije dobar(_@_._)"
      this.colorInputEmail = true
      return;
    }
    if (this.password2 != this.password) {
      this.matchPasswordsMessage = "*Potvrda lozinke i lozinka se ne poklapaju"
      this.colorInputPassword = true
      this.colorInputPassword2 = true
      return;
    }
    this.service.checkUsername(this.username).subscribe(resp => {
      if (resp['message'] == "Not unique") {
        this.usernameUniqueMessage = "*Korisničko ime je zauzeto"
        this.colorInputUsername = true
        return
      }
      this.service.checkEmail(this.email).subscribe(resp => {
        if (resp['message'] == "Not unique") {
          this.emailUniqueMessage = "*E-mail je zauzet"
          this.colorInputEmail = true
          return
        }
        this.service.register(this.id, this.firstname, this.lastname, this.username, this.password, this.email, this.type, this.institution).subscribe(resp => {
          this.colorInputFirstname = false
          this.colorInputLastname = false
          this.colorInputPassword = false
          this.colorInputPassword2 = false
          this.colorInputUsername = false
          this.colorInputEmail = false
          this.colorInputInstitution = false
          this.messageFirstname = ""
          this.messageLastname = ""
          this.messageUsername = ""
          this.messagePassword = ""
          this.messageEmail = ""
          this.messagePassword2 = ""
          this.messageInstitution = ""
          this.passwordValidationMessage = ""
          this.matchPasswordsMessage = ""
          this.emailFormatMessage = ""
          this.emailUniqueMessage = ""
          this.usernameUniqueMessage = ""
          this.registerTrue = true
          this.username = ""
          this.password = ""
          this.password2 = ""
          this.email = ""
          this.firstname = ""
          this.lastname = ""
          this.type = ""
          this.institution = ""
          this.registerTrue
          const input1 = document.getElementById("Password") as HTMLInputElement;
          const input2 = document.getElementById("Password2") as HTMLInputElement;
          input1.style.fontSize = 14 + "px";
          input1.style.letterSpacing = 0 + "px";
          input2.style.fontSize = 14 + "px";
          input2.style.letterSpacing = 0 + "px";
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        })
      })
    })
  }

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
    this.passwordValidationMessage = ""
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
}
