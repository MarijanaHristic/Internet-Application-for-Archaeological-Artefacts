import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Artefact } from 'src/models/artefact';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private service: UserService, private titleService: Title, private renderer:Renderer2) {
    this.titleService.setTitle("Artefakti - The Flow Serbia");
  }

  enlargeDiv(event: MouseEvent) {
    const divElement = event.target as HTMLElement;
    this.renderer.setStyle(divElement, 'transform', 'scale(1.2)');
  }

  resetDiv(event: MouseEvent) {
    const divElement = event.target as HTMLElement;
    this.renderer.setStyle(divElement, 'transform', 'scale(1)');
  }

  artefact: Artefact = null

  ngOnInit(): void {
    const storedJsonString = localStorage.getItem('member');
    if (storedJsonString) {
      this.member = JSON.parse(storedJsonString);
    }

    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.allArtefacts = []
        const totalPages = Math.ceil(artefacts.length / this.pageSize);
        for (let i = this.currentPage * this.pageSize; i < this.currentPage * this.pageSize + this.pageSize && i - this.pageSize < artefacts.length; i++) {
          this.allArtefacts.push(artefacts[i - this.pageSize])
        }
        this.totalPages = totalPages;
    })

    this.artefact = null
    this.material = ""
    this.arhSiteExc = ""
    this.museum = ""
    this.relDating = ""
    this.context = ""
    this.xrfNavBar = false
    this.xrdNavBar = false
    this.oslNavBar = false

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
    this.searchInput = ""
    this.showLiteratureFlag = false
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }

  
    document.addEventListener("click", this.handleClickOutsideModalArtefact.bind(this));
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

  handleClickOutsideModalArtefact(event: MouseEvent) {
    const modal = document.getElementById(this.artefact.id + '_modal');
    if (modal && !modal.contains(event.target as Node) && this.isModalOpen) {
      this.closeArtefactModal()
    }
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
  passwordValidationMessage: string
  changePasswordSuccessfull: boolean

  allArtefacts: Artefact[] = []

  showLiteratureFlag: boolean = false

  xrfClicked: boolean = false
  xrdClicked: boolean = false
  xsClicked: boolean = false
  oslClicked: boolean = false

  currentPage = 1;
  pageSize = 50;
  totalPages = 0;
  pageToGo = 1;

  searchInput: string
  artefacts: Artefact[] = []

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

  showStringField(stringField: string) {
    if (stringField == 'null' || stringField == "") return "/"
    else return stringField
  }

  showNumberField(numberField: number) {
    if (numberField == 0) return "/"
    else return numberField
  }


  loadPage() {
    this.allArtefacts = []
    let artefacts = this.artefacts
      const totalPages = Math.ceil(artefacts.length / this.pageSize);
      for (let i = this.currentPage * this.pageSize; i < this.currentPage * this.pageSize + this.pageSize && i - this.pageSize < artefacts.length; i++) {
        this.allArtefacts.push(artefacts[i - this.pageSize])
        console.log(this.allArtefacts)
      }
      this.totalPages = totalPages;
      window.scrollTo({
        top: 600,
        behavior: 'smooth' 
      });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageToGo = this.currentPage
      this.loadPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageToGo = this.currentPage
      this.loadPage();
    }
  }

  firstPage(): void {
      this.currentPage = 1;
      this.pageToGo = this.currentPage
      this.loadPage();
  }

  lastPage(): void {
      this.currentPage = this.totalPages
      this.pageToGo = this.currentPage
      this.loadPage();
  }

  goToPage(){
    if(this.pageToGo > this.totalPages || this.pageToGo < 1){
      this.pageToGo = this.currentPage
    } else {
      this.currentPage = this.pageToGo
    }
    this.loadPage();
  }

  archaeologicalExcSiteSearch(searchParam: string){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.arhSiteExc = searchParam
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  materialSearch(searchParam: string){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.material = searchParam
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  museumSearch(searchParam: string){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.museum = searchParam
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  relDatingSearch(searchParam: string){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.relDating = searchParam
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  xrfSearch(booleanVar: boolean){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.xrfNavBar = booleanVar
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  xrdSearch(booleanVar: boolean){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.xrdNavBar = booleanVar
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  oslSearch(booleanVar: boolean){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.oslNavBar = booleanVar
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL != null && item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  contextSearch(searchParam: string){
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.context = searchParam
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  search(){
    /*let stringArray = this.searchInput.trim().split(/\s+/);
    this.service.search(stringArray).subscribe((artefacts: Artefact[])=>{
      this.allArtefacts = artefacts
    })*/

    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
    if(this.material != ""){
      this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
    }
    if(this.arhSiteExc != ""){
      this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
    }
    if(this.museum != ""){
      this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
    }
    if(this.relDating != ""){
      this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
    }
    if(this.context != ""){
      this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
    }
    if(this.xrfNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRF.length > 0)
    }
    if(this.xrdNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.XRD.length > 0)
    }
    if(this.oslNavBar == true){
      this.artefacts = this.artefacts.filter(item => item.OSL.length > 0)
    }
    this.currentPage = 1;
    this.pageToGo = 1;
    const searchWords = this.searchInput.split(' ').filter(word => word.trim() !== '');
    const regexExpressions = searchWords.map(word => new RegExp(word, 'i'));

    this.artefacts = this.artefacts.filter(artefact => {
      return regexExpressions.every(regex => regex.test(artefact.opisIspodSlike));
    });
    this.loadPage()
    })
  }

  onKeyDownSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  onKeyDownPage(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.goToPage();
    }
  }

  showLiterature(){9
    this.showLiteratureFlag = !this.showLiteratureFlag
  }

  closeArtefactModal(){
    this.showLiteratureFlag = false
    this.oslClicked = false
    this.xrfClicked = false
    this.xrdClicked = false
    this.xsClicked = false
    this.isModalOpen = false
  }

  closeLiterature(){
    this.showLiteratureFlag = false
  }

  xrfIsClicked(){
    this.xrfClicked = !this.xrfClicked
  }

  xrdIsClicked(){
    this.xrdClicked = !this.xrdClicked
  }

  xsIsClicked(){
    this.xsClicked = !this.xsClicked
  }

  oslIsClicked(){
    this.oslClicked = !this.oslClicked
  }

  closeOsl(){
    this.oslClicked = false
  }

  closeXrf(){
    this.xrfClicked = false
  }

  closeXrd(){
    this.xrdClicked = false
  }

  closeXs(){
    this.xsClicked = false
  }

  material: string = ""
  arhSiteExc: string = ""
  museum: string = ""
  relDating: string = ""
  context: string = ""
  xrfNavBar: boolean = false
  xrdNavBar: boolean = false
  oslNavBar: boolean = false

  openModal(a) {
    this.artefact = a
    this.isModalOpen = true
  }

  isModalOpen: boolean = false

}
