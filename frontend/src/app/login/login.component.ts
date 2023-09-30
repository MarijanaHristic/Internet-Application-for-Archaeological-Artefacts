import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: LoginService, private titleService: Title) {
    this.titleService.setTitle("Uloguj se - The Flow Serbia");
  }

  ngOnInit(): void {
    this.colorInputEmailSent = false
    this.username = ""
    this.password = ""
    this.emailForReset = ""
    this.messageForReset = ""
    this.messageLabelReset = ""
    this.colorPasswordInput = false
    this.colorUsernameInput = false
    this.emailSent = false
    const input = document.getElementById("Password") as HTMLInputElement;

    input.addEventListener("input", () => resizeFont(this.password));

    function resizeFont(password) {
      let newLetterSpacing
      let newSize
      if (password.length == 0) {
        newSize = 14
        newLetterSpacing = 0
      } else {
        newSize = 25
        newLetterSpacing = 1.5
      }
      input.style.fontSize = newSize + "px";
      input.style.letterSpacing = newLetterSpacing + "px";
    }
  }

  @HostListener('window:keyup.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.login()
  }

  username: string
  password: string
  message: string
  messageUsername: string
  messagePassword: string
  colorPasswordInput: boolean
  colorUsernameInput: boolean


  login() {
    this.messageUsername = ""
    this.messagePassword = ""
    this.message = ""
    this.colorPasswordInput = false
    this.colorUsernameInput = false
    if (this.password == "") {
      this.messagePassword = "*Unesite lozinku"
      this.colorPasswordInput = true
    }
    if (this.username == "") {
      this.messageUsername = "*Unesite korisničko ime"
      this.colorUsernameInput = true
    }
    if (this.password == "" || this.username == "") {
      return
    }
    this.service.login(this.username, this.password).subscribe((user: User) => {
      if (user != null) {
        if (user.tip == 'admin') {
          localStorage.setItem('member', JSON.stringify(user));
          this.router.navigate(['admin'])
        } else if (user.tip == 'korisnik') {
          localStorage.setItem('member', JSON.stringify(user))
          this.router.navigate(['user'])
        }
        else {
          this.message = "*Korisnik sa datim korisničkim imenom ili lozinkom ne postoji"
        }
      } else {
        this.message = "*Korisnik sa datim korisničkim imenom ili lozinkom ne postoji"
      }
    })
  }

  resizeFont() {
    console.log("da")
    const input = document.getElementById("Password");

    input.style.fontSize = 20 + 'px';
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
      this.messageLabelReset = "*Niste uneli email"
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
