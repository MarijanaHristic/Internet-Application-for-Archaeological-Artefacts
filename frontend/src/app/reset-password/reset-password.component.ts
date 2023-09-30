import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from 'src/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetToken: string;

  constructor(private route: ActivatedRoute, private titleService: Title, private service: ResetPasswordService) {
    this.titleService.setTitle("Promena lozinke - The Flow Serbia");
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.resetToken = params['token'];
    });
    this.emailForReset = localStorage.getItem("emailForReset")
    this.newPassword = ''
    this.newPasswordConfirmation = ''
    this.newPasswordMessage = ''
    this.newPasswordConfirmationMessage = ''
    this.passwordValidationMessage = ''
    this.colorNewPassword = false
    this.colorNewPasswordConfirmation = false
    this.matchPasswordsMessage = ""
    this.passwordSuccessfullReset = false
    document.addEventListener('DOMContentLoaded', () => {
      const input1 = document.getElementById("newPassword") as HTMLInputElement;
      const input2 = document.getElementById("newPasswordConfirmation") as HTMLInputElement;
      input1.addEventListener("input", () => resizeFont1(this.newPassword));
      input2.addEventListener("input", () => resizeFont2(this.newPasswordConfirmation));
  
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

  newPasswordConfirmation: string
  newPassword: string
  newPasswordMessage: string
  newPasswordConfirmationMessage: string
  passwordValidationMessage: string
  colorNewPassword: boolean
  colorNewPasswordConfirmation: boolean
  matchPasswordsMessage: string
  emailForReset: string = ""
  passwordSuccessfullReset: boolean = false

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

  newPasswordSubmit() {
    this.matchPasswordsMessage = ""
    this.newPasswordMessage = ''
    this.newPasswordConfirmationMessage = ''
    this.passwordValidationMessage = ''
    this.colorNewPassword = false
    this.colorNewPasswordConfirmation = false
    if (this.newPassword == "") {
      this.newPasswordMessage = "*Unesite novu lozinku"
      this.colorNewPassword = true
    }
    if (this.newPasswordConfirmation == "") {
      this.newPasswordConfirmationMessage = "*Unesite potvrdu nove lozinke"
      this.colorNewPasswordConfirmation = true
    }
    if (this.newPassword == "" || this.newPasswordConfirmation == "") {
      return
    }
    let validationPassword = this.checkPassword(this.newPassword)
    if (validationPassword == false) {
      this.colorNewPassword = true
      this.colorNewPasswordConfirmation = true
      return
    }
    if (this.newPassword != this.newPasswordConfirmation) {
      this.matchPasswordsMessage = "*Potvrda lozinke i lozinka se ne poklapaju"
      this.colorNewPassword = true
      this.colorNewPasswordConfirmation = true
      return;
    }
    this.service.resetPassword(this.emailForReset, this.newPassword).subscribe(resp=>{
      localStorage.clear()
      this.passwordSuccessfullReset = true
      this.emailForReset = ""
      this.newPassword = ""
      this.newPasswordConfirmation = ""
      const input1 = document.getElementById("newPassword") as HTMLInputElement;
      const input2 = document.getElementById("newPasswordConfirmation") as HTMLInputElement;
      input1.style.fontSize = 14 + "px";
      input1.style.letterSpacing = 0 + "px";
      input2.style.fontSize = 14 + "px";
      input2.style.letterSpacing = 0 + "px";
    })
    
  }

}
