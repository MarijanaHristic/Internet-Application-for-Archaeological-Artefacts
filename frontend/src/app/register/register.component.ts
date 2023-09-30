import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegisterService } from 'src/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: RegisterService, private titleService: Title) {
    this.titleService.setTitle("Registruj se - The Flow Serbia");
  }

  ngOnInit(): void {
    this.emailSent = false
    this.emailForReset = ""
    this.messageForReset = ""
    this.messageLabelReset = ""
    this.colorInputEmailSent = false
    this.username = ""
    this.password = ""
    this.password2 = ""
    this.email = ""
    this.firstname = ""
    this.lastname = ""
    this.institution = ""
    this.colorInputEmail = false
    this.colorInputFirstname = false
    this.colorInputLastname = false
    this.colorInputPassword = false
    this.colorInputPassword2 = false
    this.colorInputUsername = false
    this.colorInputInstitution = false
    this.registerTrue = false
    this.service.getMaxId().subscribe((resp: number) => {
      this.id = resp
    })
    document.addEventListener('DOMContentLoaded', () => {
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
    });
  }

  @HostListener('window:keyup.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
  }

  username: string
  password: string
  password2: string
  email: string
  firstname: string
  lastname: string
  id: number
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

  colorInputUsername: boolean
  colorInputPassword: boolean
  colorInputPassword2: boolean
  colorInputFirstname: boolean
  colorInputLastname: boolean
  colorInputEmail: boolean
  colorInputInstitution: boolean

  registerTrue: boolean

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
    this.registerTrue = false
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
    if (this.institution == "") {
      this.messageInstitution = "*Unesite instituciju"
      this.colorInputInstitution = true
    }
    if (this.firstname == "" || this.lastname == "" || this.username == "" || this.password == "" || this.password2 == "" ||
      this.email == "" || this.institution == "") return
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
        this.service.register(this.id, this.firstname, this.lastname, this.username, this.password, this.email, this.institution).subscribe(resp => {
          this.registerTrue = true
        })
      })
    })
  }


  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  emailForReset: string = "";
  messageForReset: string = ""
  emailSent: boolean = false
  messageLabelReset:string = ""
  colorInputEmailSent: boolean = false

  closeModalForReset() {
    this.messageForReset = ""
    this.emailSent = false
    this.messageLabelReset = ""
    this.colorInputEmailSent = false
    this.emailForReset = ""
  }

  sendResetEmail() {
    this.colorInputEmailSent = false
    this.messageLabelReset = ""
    if (this.emailForReset == "") {
      this.messageLabelReset = "*Niste uneli e-mail"
      this.colorInputEmailSent = true
      return
    }
    this.messageForReset = ""
    this.service.sendResetEmail(this.emailForReset).subscribe(resp => {
      if (resp['message'] == 'E-mail sa linkom za resetovanje lozinke poslat.') {
        this.colorInputEmailSent = false
        this.emailSent = true
        localStorage.setItem("emailForReset", this.emailForReset)
      }
      if (resp['message'] == 'Korisnik sa ovim e-mailom ne postoji.') {
        console.log("da")
        this.colorInputEmailSent = true
        this.emailSent = false
        this.messageLabelReset = '*Korisnik sa ovim e-mailom ne postoji'
      } else if (resp['message'] == 'Greška prilikom slanja e-maila.') {
        this.colorInputEmailSent = false
        this.emailSent = true
        this.messageLabelReset = '*Greška prilikom slanja e-maila'
      }
      this.messageForReset = resp['message']
    });
  }
}
