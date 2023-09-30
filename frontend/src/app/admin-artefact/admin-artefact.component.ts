import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Artefact } from 'src/models/artefact';
import { PredefiniedValObj } from 'src/models/predefiniedValObj';
import { User } from 'src/models/user';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-artefact',
  templateUrl: './admin-artefact.component.html',
  styleUrls: ['./admin-artefact.component.css']
})
export class AdminArtefactComponent implements OnInit {

  constructor(private router: Router, private service: AdminService, private titleService: Title, private renderer: Renderer2) {
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

  predefiniedValuesObj: PredefiniedValObj

  ngOnInit(): void {
    const storedJsonString = localStorage.getItem('member');
    if (storedJsonString) {
      this.member = JSON.parse(storedJsonString);
    }

    this.service.getPredefiniedValuesObject().subscribe((resp: PredefiniedValObj)=>{
      this.predefiniedValuesObj = resp
    })

    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.allArtefacts = []
      const totalPages = Math.ceil(artefacts.length / this.pageSize);
      for (let i = this.currentPage * this.pageSize; i < this.currentPage * this.pageSize + this.pageSize && i - this.pageSize < artefacts.length; i++) {
        this.allArtefacts.push(artefacts[i - this.pageSize])
      }
      this.totalPages = totalPages;
    })

    console.log(this.deleteFlag)
    this.artefact = null
    this.material = ""
    this.arhSiteExc = ""
    this.museum = ""
    this.relDating = ""
    this.context = ""
    this.xrfNavBar = false
    this.xrdNavBar = false
    this.oslNavBar = false
    this.editFlag = false
    this.picture = null

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

    const imagesWithClickFunction = document.querySelectorAll('[data-click-function]');

    // Dodajte event listener za svaku sliku
    imagesWithClickFunction.forEach(image => {
      image.addEventListener('click', function () {
        // Dobijte vrednost data-click-function atributa (ime funkcije)
        const functionName = image.getAttribute('data-click-function');

        // Pozovite funkciju
        if (window[functionName] && typeof window[functionName] === 'function') {
          window[functionName]();
        }
      });
    });

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

  handleClickOutsideModalArtefact(event: MouseEvent) {
    const modal = document.getElementById(this.artefact.id + '_modal');
    if (modal && !modal.contains(event.target as Node) && this.isModalOpen) {
      this.closeArtefactModal()
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

  goToPage() {
    if (this.pageToGo > this.totalPages || this.pageToGo < 1) {
      this.pageToGo = this.currentPage
    } else {
      this.currentPage = this.pageToGo
    }
    this.loadPage();
  }

  archaeologicalExcSiteSearch(searchParam: string) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.arhSiteExc = searchParam
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  materialSearch(searchParam: string) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.material = searchParam
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  museumSearch(searchParam: string) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.museum = searchParam
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  relDatingSearch(searchParam: string) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.relDating = searchParam
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  xrfSearch(booleanVar: boolean) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.xrfNavBar = booleanVar
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  xrdSearch(booleanVar: boolean) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.xrdNavBar = booleanVar
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  oslSearch(booleanVar: boolean) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.oslNavBar = booleanVar
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF != null && item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD != null && item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  contextSearch(searchParam: string) {
    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      this.context = searchParam
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  search() {
    /*let stringArray = this.searchInput.trim().split(/\s+/);
    this.service.search(stringArray).subscribe((artefacts: Artefact[])=>{
      this.allArtefacts = artefacts
    })*/

    this.service.getAllArtefacts().subscribe((artefacts: Artefact[]) => {
      this.artefacts = artefacts
      if (this.material != "") {
        this.artefacts = this.artefacts.filter(item => item.materijal == this.material)
      }
      if (this.arhSiteExc != "") {
        this.artefacts = this.artefacts.filter(item => item.arheoloskiLokalitetIskopavanja == this.arhSiteExc)
      }
      if (this.museum != "") {
        this.artefacts = this.artefacts.filter(item => item.muzej == this.museum)
      }
      if (this.relDating != "") {
        this.artefacts = this.artefacts.filter(item => item.relativnoDatovanje == this.relDating)
      }
      if (this.context != "") {
        this.artefacts = this.artefacts.filter(item => item.kontekst == this.context)
      }
      if (this.xrfNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRF.length > 0)
      }
      if (this.xrdNavBar == true) {
        this.artefacts = this.artefacts.filter(item => item.XRD.length > 0)
      }
      if (this.oslNavBar == true) {
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

  showLiterature() {
    this.showLiteratureFlag = !this.showLiteratureFlag
  }

  closeArtefactModal() {
    this.showLiteratureFlag = false
    this.oslClicked = false
    this.xrfClicked = false
    this.xrdClicked = false
    this.xsClicked = false
    this.isModalOpen = false
    this.deleteFlag = 0
    this.editFlag = false
    this.loadPage()
    window.scrollTo({
      top: 1200,
      behavior: 'smooth'
    });
  }

  closeLiterature() {
    this.showLiteratureFlag = false
  }

  xrfIsClicked() {
    this.xrfClicked = !this.xrfClicked
  }

  xrdIsClicked() {
    this.xrdClicked = !this.xrdClicked
  }

  xsIsClicked() {
    this.xsClicked = !this.xsClicked
  }

  oslIsClicked() {
    this.oslClicked = !this.oslClicked
  }

  closeOsl() {
    this.oslClicked = false
  }

  closeXrf() {
    this.xrfClicked = false
  }

  closeXrd() {
    this.xrdClicked = false
  }

  closeXs() {
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

  artefactToDelete: number
  deleteFlag: number = 0

  deleteArtefact() {
    this.service.deleteArtefact(this.artefactToDelete).subscribe(resp => {
      this.closeArtefactModal()
      this.deleteFlag = 0
      this.artefacts = this.artefacts.filter(item => item.id !== this.artefactToDelete);
      this.loadPage()
      this.isModalOpen = false
    });
  }

  delete(id) {
    this.artefactToDelete = id
    this.deleteFlag = 1
  }

  openModal(a) {
    this.artefact = a
    this.isModalOpen = true
    this.inputPictureDesc = a.opisIspodSlike
    this.inputLength = a.duzina
    this.inputWidth = a.sirina
    this.inputHeight = a.visina
    this.inputDiameter = a.precnik
    this.inputThickness = a.debljina
    this.inputWeight = a.tezina
    this.inputArtefactDesc = a.opisArtefakta
    this.inputAnalogies = a.analogije
    this.inputMaterial = a.materijal
    this.inputSampleDesc = a.opisUzorka
    this.inputRawMaterial = a.sirovina
    this.inputArchExcSite = a.arheoloskiLokalitetIskopavanja
    this.inputMuseum = a.muzej
    this.inputInvNum = a.inventarskiBroj
    this.inputRelDating = a.relativnoDatovanje
    this.inputAbsDating = a.apsolutnoDatovanje
    this.inputContext = a.kontekst
    this.inputX = a.x
    this.inputY = a.y
    this.inputZ = a.z
    this.linkArray = a.links
    this.pdfArrayOld = a.pdfs
  }

  deleteArtefactNo() {
    this.deleteFlag = 0
  }

  isModalOpen: boolean = false

  editFlag: boolean = false

  clickEdit() {
    this.editFlag = !this.editFlag
  }

  inputPictureDesc: string = ''
  inputLength: number = 0
  inputWidth: number = 0
  inputHeight: number = 0
  inputDiameter: number = 0
  inputThickness: number = 0
  inputWeight: number = 0
  inputArtefactDesc: string = ''
  inputAnalogies: string = ''
  inputMaterial: string = ''
  inputSampleDesc: string = ''
  inputRawMaterial: string = ''
  inputArchExcSite: string = ''
  inputMuseum: string = ''
  inputInvNum: string = ''
  inputRelDating: string = ''
  inputAbsDating: string = ''
  inputContext: string = ''
  inputX: number = 0
  inputY: number = 0
  inputZ: number = 0

  picture: string = null

  lessText(text) {
    if (text.length > 50) {
      return text.slice(0, 50) + '...';
    }
    return text;
  }

  selectPdf(event) {
    if (event.target.files.length > 0) {
      this.pdf = event.target.files[0]
    }
  }

  addPdf() {
    if (this.pdf == "" || this.pdf == null) return
    this.pdfArrayNew.push(this.pdf)
    this.pdf = null
  }

  deleteLink(index) {
    this.linkArray.splice(index, 1)
  }

  deletePdfArrayOld(index) {
    this.pdfArrayOld.splice(index, 1)
  }

  deletePdfArrayNew(index) {
    this.pdfArrayNew.splice(index, 1)
  }

  writeFilename(p) {
    if (p)
      return p.name
    else return ""
  }

  writeFilenameOld(p){
    console.log(p.replace(/^\d+/, ""))
    return p.replace(/^\d+/, "");
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

  pdfArrayOld: String[] = []
  linkArray: String[] = []
  pdfArrayNew: String [] = []

  pdf: string
  link: string

  addLinkClicked: boolean
  addPdfClicked: boolean

  update() {
    this.service.update(this.artefact.id, this.picture, this.inputPictureDesc, this.inputLength, this.inputWidth, this.inputHeight,
      this.inputDiameter, this.inputThickness, this.inputWeight, this.inputArtefactDesc, this.inputAnalogies,
      this.inputMaterial, this.inputSampleDesc, this.inputRawMaterial, this.inputArchExcSite, this.inputMuseum, this.inputInvNum,
      this.inputRelDating, this.inputAbsDating, this.inputContext,
      this.inputX, this.inputY, this.inputZ, JSON.stringify(this.linkArray)).subscribe(resp => {
        this.service.getPic(this.artefact.id).subscribe((pic: Artefact) => {
        this.service.putPdfsEdit(this.pdfArrayNew, this.artefact.id, JSON.stringify(this.pdfArrayOld)).subscribe(resp => {
            this.editFlag = false
            const artefactObj = this.artefacts.find(obj => obj.id === this.artefact.id);
            let index = this.artefacts.indexOf(artefactObj)
            this.artefacts[index].slika = pic[0].slika
            this.artefacts[index].opisIspodSlike = this.inputPictureDesc
            this.artefacts[index].duzina = this.inputLength
            this.artefacts[index].sirina = this.inputWidth
            this.artefacts[index].visina = this.inputHeight
            this.artefacts[index].precnik = this.inputDiameter
            this.artefacts[index].debljina = this.inputThickness
            this.artefacts[index].tezina = this.inputWeight
            this.artefacts[index].opisArtefakta = this.inputArtefactDesc
            this.artefacts[index].analogije = this.inputAnalogies
            this.artefacts[index].materijal = this.inputMaterial
            this.artefacts[index].opisUzorka = this.inputSampleDesc
            this.artefacts[index].sirovina = this.inputRawMaterial
            this.artefacts[index].arheoloskiLokalitetIskopavanja = this.inputArchExcSite
            this.artefacts[index].inventarskiBroj = this.inputInvNum
            this.artefacts[index].relativnoDatovanje = this.inputRelDating
            this.artefacts[index].apsolutnoDatovanje = this.inputAbsDating
            this.artefacts[index].kontekst = this.inputContext
            this.artefacts[index].x = this.inputX
            this.artefacts[index].y = this.inputY
            this.artefacts[index].z = this.inputZ
            this.artefacts[index].links = this.linkArray
            this.artefacts[index].pdfs = pic[0].pdfs
            window.scrollTo({
              top: 1200,
              behavior: 'smooth'
            });
          })
        })
      })
  }

  selectPicture(event) {
    if (event.target.files.length > 0) {
      this.picture = event.target.files[0]
    }
  }
}



