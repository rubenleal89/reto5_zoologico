"use strict";
let enums = {
    formArea: "formularioArea",
    formEspecie: "formularioEspecies",
    formAnimal: "formularioAnimal",
    formComentario: "formularioComentario",
    formRespuesta: "formularioRespuesta"
};
let validarForm;
let idObjPadre;
let arrayAreas = [];
let arrayEspecies = [];
let arrayAnimales = [];
let arrayComentarios = [];
let arrayRespuestas = [];
function eventsItems() {
    let newArea = document.getElementById("newArea");
    newArea.addEventListener("click", formArea);
    dataLocalStorage();
    selectArea();
}
function dataLocalStorage() {
    if (localStorage.getItem('Areas')) {
        arrayAreas = JSON.parse(localStorage.getItem("Areas") || "");
    }
    if (localStorage.getItem('Especies')) {
        arrayEspecies = JSON.parse(localStorage.getItem("Especies") || "");
    }
    if (localStorage.getItem('Animales')) {
        arrayAnimales = JSON.parse(localStorage.getItem("Animales") || "");
    }
    // if(localStorage.getItem('Comentarios')){
    //   arrayComentarios = JSON.parse(localStorage.getItem("Comentarios") || "")
    // }
    // if(localStorage.getItem('Respuestas')){
    //   arrayRespuestas = JSON.parse(localStorage.getItem("Respuestas") || "")
    // }
}
function Ids() {
    let lastId = localStorage.getItem("idGeneral") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("idGeneral", JSON.stringify(newId));
    return newId;
}
function formArea() {
    validarForm = enums.formArea;
    form.innerHTML = "";
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent = "Formulario Area";
    let divInputArea = document.createElement("div");
    divInputArea.className = "form-floating mb-3";
    let nameArea = document.createElement("input");
    nameArea.id = "floatingInput";
    nameArea.className = "form-control rounded-3";
    nameArea.placeholder = "Area Name";
    nameArea.type = "text";
    let labelArea = document.createElement("label");
    labelArea.textContent = "Area Name";
    labelArea.setAttribute("for", "floatingInput");
    let btnSubmit = document.createElement("button");
    btnSubmit.className = "w-100 mb-2 btn btn-lg rounded-3 btn-primary";
    btnSubmit.textContent = "Submit";
    form.insertAdjacentElement("beforeend", divInputArea);
    divInputArea.insertAdjacentElement("beforeend", nameArea);
    divInputArea.insertAdjacentElement("beforeend", labelArea);
    form.insertAdjacentElement("beforeend", btnSubmit);
}
function selectArea() {
    let sectComment = document.getElementById("verComentarios");
    let listaAreas = document.getElementById("listaAreas");
    listaAreas.innerHTML = "";
    arrayAreas.forEach(element => {
        let listSpecie = document.createElement("li");
        listSpecie.className = "btn-group dropend separadoBtn";
        let btnArea = document.createElement("button");
        btnArea.className = "btn btn-secondary NameSpecie";
        btnArea.textContent = element.name;
        btnArea.addEventListener("click", (e) => {
            formSpecieArea(element.name);
            idObjPadre = element.Id;
        });
        let btnSpecies = document.createElement("button");
        btnSpecies.className = "btn btn-secondary dropdown-toggle dropdown-toggle-split";
        btnSpecies.addEventListener("click", (e) => {
            listaSpecie(element.Id);
            sectComment.className = "d-none";
        });
        let spanToggle = document.createElement("span");
        spanToggle.className = "visually-hidden";
        spanToggle.textContent = "Toggle Dropend";
        listaAreas.insertAdjacentElement("beforeend", listSpecie);
        listSpecie.insertAdjacentElement("beforeend", btnArea);
        listSpecie.insertAdjacentElement("beforeend", btnSpecies);
        btnSpecies.insertAdjacentElement("beforeend", spanToggle);
    });
}
function formSpecieArea(nameArea) {
    validarForm = enums.formEspecie;
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className = "d-none";
    let sectionEspe = document.getElementById("sectVerEspecies");
    sectionEspe.className = "d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent = `Create species for the ${nameArea} zone`;
    form.innerHTML = "";
    form.innerHTML += `
      <form class="" id="formulario">
          <div class="form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="floatingInput" placeholder="Species Name">
              <label for="floatingInput">Species Name</label>
          </div>
          <button type="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-primary">Submit</button>
      </form>>
  `;
}
function listaSpecie(id) {
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "d-none";
    let section = document.getElementById("sectVerEspecies");
    section.className = "sectVerEspecies";
    section.innerHTML = "";
    let divContentSpecie = document.createElement("div");
    divContentSpecie.className = "divSpecies containers-scroll borderDivScrool";
    let divContentAnimal = document.createElement("div");
    divContentAnimal.className = "divAnimal containers-scroll borderDivScrool";
    let titleEspecie = document.createElement("h2");
    titleEspecie.textContent = "Especies";
    titleEspecie.className = "whiteColorTitles text-center";
    section.insertAdjacentElement("beforeend", divContentSpecie);
    section.insertAdjacentElement("beforeend", divContentAnimal);
    divContentSpecie.insertAdjacentElement("beforeend", titleEspecie);
    arrayEspecies.forEach(element => {
        if (id === element.idArea) {
            let divSpecie = document.createElement("div");
            divSpecie.className = "btn-group dropend btnSpecies separadoBtn";
            let divNameSpecie = document.createElement("div");
            divNameSpecie.className = "divNameSpecie btnSpecies";
            divNameSpecie.textContent = element.name;
            let btnVerAnimal = document.createElement("button");
            btnVerAnimal.className = "btn btn-secondary dropdown-toggle dropdown-toggle-split addSee";
            btnVerAnimal.addEventListener("click", (e) => {
                listaAnimales(element.Id, divContentAnimal);
            });
            let spanToggle = document.createElement("span");
            spanToggle.className = "visually-hidden";
            spanToggle.textContent = "Toggle Dropend";
            let btnAnimal = document.createElement("button");
            btnAnimal.className = "btn btn-secondary dropdown-toggle-split addSee";
            btnAnimal.textContent = "+";
            btnAnimal.addEventListener("click", (e) => {
                formAnimal(element.name);
                idObjPadre = element.Id;
            });
            divContentSpecie.insertAdjacentElement("beforeend", divSpecie);
            divSpecie.insertAdjacentElement("beforeend", divNameSpecie);
            divSpecie.insertAdjacentElement("beforeend", btnAnimal);
            divSpecie.insertAdjacentElement("beforeend", btnVerAnimal);
            btnVerAnimal.insertAdjacentElement("beforeend", spanToggle);
        }
    });
}
function formAnimal(nameSpecie) {
    validarForm = enums.formAnimal;
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className = "d-none";
    let sectRespComment = document.getElementById("verComentarios");
    sectRespComment.className = "d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent = `Create animals for the ${nameSpecie} species`;
    form.innerHTML = "";
    let divInputArea = document.createElement("div");
    divInputArea.className = "form-floating mb-3";
    let inputArea = document.createElement("input");
    inputArea.type = "text";
    inputArea.className = "form-control rounded-3";
    inputArea.id = "floatingInput";
    inputArea.placeholder = "Animal Name";
    let labelArea = document.createElement("label");
    labelArea.textContent = "Animal Name";
    labelArea.setAttribute("for", "floatingInput");
    let btnSubmit = document.createElement("button");
    btnSubmit.type = "submit";
    btnSubmit.textContent = "Submit";
    btnSubmit.className = "w-100 mb-2 btn btn-lg rounded-3 btn-primary";
    form.insertAdjacentElement("beforeend", divInputArea);
    divInputArea.insertAdjacentElement("beforeend", inputArea);
    divInputArea.insertAdjacentElement("beforeend", labelArea);
    form.insertAdjacentElement("beforeend", btnSubmit);
}
function listaAnimales(id, divContentAnimal) {
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "d-none";
    divContentAnimal.innerHTML = "";
    let titleAnimales = document.createElement("h2");
    titleAnimales.textContent = "Animales";
    titleAnimales.className = "whiteColorTitles text-center";
    let sectComment = document.getElementById("verComentarios");
    divContentAnimal.insertAdjacentElement("beforeend", titleAnimales);
    arrayAnimales.forEach(element => {
        if (id === element.idEspecie) {
            let divAnimal = document.createElement("div");
            divAnimal.className = "btn-group dropend btnSpecies separadoBtn";
            let divNameAnimal = document.createElement("div");
            divNameAnimal.className = "divNameSpecie btnSpecies";
            divNameAnimal.textContent = element.name;
            let btnVerComentario = document.createElement("button");
            btnVerComentario.className = "btn btn-secondary dropdown-toggle dropdown-toggle-split";
            btnVerComentario.addEventListener("click", (e) => {
                sectForm.className = "d-none";
                // listaComment(element.Id);
            });
            let spanToggle = document.createElement("span");
            spanToggle.className = "visually-hidden";
            spanToggle.textContent = "Toggle Dropend";
            let btnComentario = document.createElement("button");
            btnComentario.className = "btn btn-secondary dropdown-toggle-split";
            btnComentario.textContent = "+";
            btnComentario.addEventListener("click", (e) => {
                sectComment.className = "d-none";
                // formComment();
                // enums.idAnimals = element.Id;
            });
            divContentAnimal.insertAdjacentElement("beforeend", divAnimal);
            divAnimal.insertAdjacentElement("beforeend", divNameAnimal);
            divAnimal.insertAdjacentElement("beforeend", btnComentario);
            divAnimal.insertAdjacentElement("beforeend", btnVerComentario);
            btnVerComentario.insertAdjacentElement("beforeend", spanToggle);
        }
    });
}
let form = document.getElementById("formulario");
form.addEventListener("submit", envio);
function envio(e) {
    e.preventDefault();
    if (validarForm === enums.formArea) {
        let inputName = document.getElementById("floatingInput");
        let data = {
            Id: Ids(),
            name: inputName.value
        };
        arrayAreas.push(data);
        localStorage.setItem("Areas", JSON.stringify(arrayAreas));
        selectArea();
        form.reset();
    }
    if (validarForm === enums.formEspecie) {
        let inputName = document.getElementById("floatingInput");
        let data = {
            Id: Ids(),
            idArea: idObjPadre,
            name: inputName.value
        };
        arrayEspecies.push(data);
        localStorage.setItem("Especies", JSON.stringify(arrayEspecies));
        selectArea();
        form.reset();
    }
    if (validarForm === enums.formAnimal) {
        let inputName = document.getElementById("floatingInput");
        let data = {
            Id: Ids(),
            idEspecie: idObjPadre,
            name: inputName.value
        };
        arrayAnimales.push(data);
        localStorage.setItem("Animales", JSON.stringify(arrayAnimales));
        selectArea();
        form.reset();
    }
    if (validarForm === enums.formComentario) {
        let inputName = document.getElementById("floatingInput");
        let inputNameUser = document.getElementById("floatingInput");
        let data = {
            Id: Ids(),
            idAnimal: idObjPadre,
            name: inputName.value,
            nameUser: inputNameUser.value
        };
        arrayComentarios.push(data);
        localStorage.setItem("Comentarios", JSON.stringify(arrayComentarios));
        selectArea();
        form.reset();
    }
    if (validarForm === enums.formRespuesta) {
        let inputName = document.getElementById("floatingInput");
        let inputNameUser = document.getElementById("floatingInput");
        let data = {
            Id: Ids(),
            idComentario: idObjPadre,
            name: inputName.value,
            nameUser: inputNameUser.value
        };
        arrayRespuestas.push(data);
        localStorage.setItem("Respuestas", JSON.stringify(arrayRespuestas));
        selectArea();
        form.reset();
    }
}
document.addEventListener("DOMContentLoaded", eventsItems);
