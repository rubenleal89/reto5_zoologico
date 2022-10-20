"use strict";
let enums = {
    formArea: "formularioArea",
    formEspecie: "formularioEspecies",
    formAnimal: "formularioAnimal",
    formComentario: "formularioComentario",
    formRespuesta: "formularioRespuesta"
};
let validarForm;
let validarBusqueda;
let idObjPadre;
let arrayAreas = [];
let arrayEspecies = [];
let arrayAnimales = [];
let arrayComentarios = [];
let arrayRespuestas = [];
function eventsItems() {
    let close = document.getElementById("signOut");
    let newArea = document.getElementById("newArea");
    newArea.addEventListener("click", formArea);
    close.addEventListener("click", signOut);
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
    if (localStorage.getItem('Comentarios')) {
        arrayComentarios = JSON.parse(localStorage.getItem("Comentarios") || "");
    }
    if (localStorage.getItem('Respuestas')) {
        arrayRespuestas = JSON.parse(localStorage.getItem("Respuestas") || "");
    }
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
                listaComment(element.Id);
            });
            let spanToggle = document.createElement("span");
            spanToggle.className = "visually-hidden";
            spanToggle.textContent = "Toggle Dropend";
            let btnComentario = document.createElement("button");
            btnComentario.className = "btn btn-secondary dropdown-toggle-split";
            btnComentario.textContent = "+";
            btnComentario.addEventListener("click", (e) => {
                sectComment.className = "d-none";
                formComment();
                idObjPadre = element.Id;
            });
            divContentAnimal.insertAdjacentElement("beforeend", divAnimal);
            divAnimal.insertAdjacentElement("beforeend", divNameAnimal);
            divAnimal.insertAdjacentElement("beforeend", btnComentario);
            divAnimal.insertAdjacentElement("beforeend", btnVerComentario);
            btnVerComentario.insertAdjacentElement("beforeend", spanToggle);
        }
    });
}
function formComment() {
    validarForm = enums.formComentario;
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className = "d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent = "Create Message";
    form.innerHTML = "";
    let divInputName = document.createElement("div");
    divInputName.className = "form-floating mb-3";
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "form-control rounded-3";
    inputName.id = "floatingInput";
    inputName.placeholder = "Your Name";
    let labelName = document.createElement("label");
    labelName.textContent = "Your Name";
    labelName.setAttribute("for", "floatingInput");
    let divInputMessage = document.createElement("div");
    divInputMessage.className = "form-floating mb-3";
    let inputMessage = document.createElement("textarea");
    inputMessage.className = "textArea form-control rounded-3";
    inputMessage.id = "floatingTextarea";
    inputMessage.placeholder = "Message";
    let labelMessage = document.createElement("label");
    labelMessage.textContent = "Message";
    labelMessage.setAttribute("for", "floatingTextarea");
    let btnSubmit = document.createElement("button");
    btnSubmit.type = "submit";
    btnSubmit.textContent = "Submit";
    btnSubmit.className = "w-100 mb-2 btn btn-lg rounded-3 btn-primary";
    form.insertAdjacentElement("beforeend", divInputName);
    divInputName.insertAdjacentElement("beforeend", inputName);
    divInputName.insertAdjacentElement("beforeend", labelName);
    form.insertAdjacentElement("beforeend", divInputMessage);
    divInputMessage.insertAdjacentElement("beforeend", inputMessage);
    divInputMessage.insertAdjacentElement("beforeend", labelMessage);
    form.insertAdjacentElement("beforeend", btnSubmit);
}
function listaComment(id) {
    let section = document.getElementById("verComentarios");
    section.className = "verComentarios";
    section.innerHTML = "";
    arrayComentarios.forEach(element => {
        if (id === element.idAnimal) {
            let divContents = document.createElement("div");
            divContents.className = "toast fade show";
            let divNameUser = document.createElement("div");
            divNameUser.className = "toast-header";
            let iconMess = document.createElement("i");
            iconMess.className = "fa-solid fa-message";
            let nameUser = document.createElement("strong");
            nameUser.className = "me-auto";
            nameUser.textContent = element.nameUser;
            let horaFech = document.createElement("p");
            horaFech.textContent = element.fechaHora;
            let divComment = document.createElement("div");
            divComment.className = "toast-body";
            divComment.id = "divComment";
            let txtComment = document.createElement("p");
            txtComment.textContent = element.comment;
            let divRespuesta = document.createElement("div");
            divRespuesta.className = "btn-group";
            let btnResponder = document.createElement("button");
            btnResponder.className = "btn btn-sm btn-secondary";
            btnResponder.textContent = "Responder";
            btnResponder.addEventListener("click", (e) => {
                idObjPadre = element.Id;
                formResponder(divForm, divRespComment);
            });
            let btnVerRespuestas = document.createElement("button");
            btnVerRespuestas.className = "btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split";
            btnVerRespuestas.addEventListener("click", (e) => {
                listaRespuestas(element.Id, divRespComment, divForm);
            });
            let spanFlecha = document.createElement("span");
            spanFlecha.className = "visually-hidden";
            spanFlecha.textContent = "Toggle Dropdown";
            let divForm = document.createElement("div");
            let divRespComment = document.createElement("div");
            section.insertAdjacentElement("beforeend", divContents);
            divContents.insertAdjacentElement("beforeend", divNameUser);
            divNameUser.insertAdjacentElement("beforeend", iconMess);
            divNameUser.insertAdjacentElement("beforeend", nameUser);
            divNameUser.insertAdjacentElement("beforeend", horaFech);
            divContents.insertAdjacentElement("beforeend", divComment);
            divComment.insertAdjacentElement("beforeend", txtComment);
            divComment.insertAdjacentElement("beforeend", divRespuesta);
            divRespuesta.insertAdjacentElement("beforeend", btnResponder);
            divRespuesta.insertAdjacentElement("beforeend", btnVerRespuestas);
            divRespuesta.insertAdjacentElement("beforeend", spanFlecha);
            divComment.insertAdjacentElement("beforeend", divForm);
            divComment.insertAdjacentElement("beforeend", divRespComment);
        }
    });
}
function formResponder(divForm, divRespComment) {
    validarForm = enums.formRespuesta;
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className = "d-none";
    divForm.innerHTML = "";
    divForm.className = "divFormResp";
    divRespComment.className = "d-none";
    let formulario = document.createElement("form");
    formulario.className = "formRespuesta";
    formulario.addEventListener("submit", envio);
    let nameUser = document.createElement("input");
    nameUser.type = "text";
    nameUser.id = `inputUser${idObjPadre}`;
    nameUser.className = "form-control form-control-sm nameUser";
    nameUser.placeholder = "Nombre Usuario";
    let respuesta = document.createElement("textarea");
    respuesta.id = `inputResp${idObjPadre}`;
    respuesta.className = "form-control form-control-sm inpuntRespuesta";
    respuesta.placeholder = "Responder Commentario";
    let btnSubmit = document.createElement("button");
    btnSubmit.textContent = "Enviar";
    btnSubmit.className = "btn btn-primary btn-sm";
    divForm.insertAdjacentElement("beforeend", formulario);
    formulario.insertAdjacentElement("beforeend", nameUser);
    formulario.insertAdjacentElement("beforeend", respuesta);
    formulario.insertAdjacentElement("beforeend", btnSubmit);
}
function listaRespuestas(id, divRespComment, divForm) {
    divRespComment.innerHTML = "";
    divRespComment.className = "divVerRespuestas";
    divForm.className = "d-none";
    arrayRespuestas.forEach(element => {
        if (id === element.idComentario) {
            divRespComment.innerHTML += `
          <div class="toast fade show divRespuestas">
              <div class="toast-header">
                  <strong class="me-auto">${element.nameUser}</strong>
                  <p>${element.fechaHora}</p>
              </div>
              <div class="toast-body" id="divComment">
                  <p>${element.comment}</p>
              </div>
          </div>
          `;
        }
    });
}
function signOut() {
    localStorage.removeItem("Areas");
    localStorage.removeItem("Especies");
    localStorage.removeItem("Animales");
    localStorage.removeItem("Comentarios");
    localStorage.removeItem("Respuestas");
    window.location.reload();
}
let formSearch = document.getElementById("forSearch");
formSearch.addEventListener("submit", search);
function search(e) {
    e.preventDefault();
    validarBusqueda = false;
    let sectVerEspecies = document.getElementById("sectVerEspecies");
    sectVerEspecies.className = "d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className = "d-none";
    let sectVerComentarios = document.getElementById("verComentarios");
    sectVerComentarios.className = "d-none";
    let buscador = document.getElementById("inputSearch");
    let valueBuscador = buscador.value.toLowerCase();
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className = "verBusqueda";
    sectSearch.innerHTML = "";
    if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(valueBuscador) && valueBuscador.length >= 4) {
        verBusqueda(valueBuscador, sectSearch);
        formSearch.reset();
    }
    else {
        sectSearch.innerHTML += `
        <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Error en la busqueda:
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style="">
          <div class="accordion-body">
            <strong>Verifica que cumpla con las condiciones de busqueda:</strong>
            <p>1- El numero minimo de caracteres por busqueda es de (4)</p>
            <p>2- Solo se aceptan letras</p>
            <p>3- Sin importar si son mayusculas o minusculas, el resultado de la busqueda sera el mismo</p>
          </div>
        </div>
      </div>
        `;
    }
}
function verBusqueda(buscador, sectSearch) {
    arrayAreas.forEach(element => {
        if (element.name.includes(buscador)) {
            let title = document.createElement("h3");
            title.textContent = "Zona";
            let verZona = document.createElement("p");
            verZona.textContent = element.name;
            sectSearch.insertAdjacentElement("beforeend", title);
            sectSearch.insertAdjacentElement("beforeend", verZona);
            validarBusqueda = true;
        }
    });
    arrayEspecies.forEach(element => {
        if (element.name.includes(buscador)) {
            let titleEsp = document.createElement("h3");
            titleEsp.textContent = "Area";
            titleEsp.className = "especie";
            let verEspecie = document.createElement("p");
            verEspecie.textContent = element.name;
            verEspecie.className = "especie";
            sectSearch.insertAdjacentElement("beforeend", titleEsp);
            sectSearch.insertAdjacentElement("beforeend", verEspecie);
            let idZona = element.idArea;
            arrayAreas.forEach(element => {
                if (element.Id === idZona) {
                    let titleArea = document.createElement("h3");
                    titleArea.textContent = "Zona";
                    let verZona = document.createElement("p");
                    verZona.textContent = element.name;
                    sectSearch.insertAdjacentElement("afterbegin", verZona);
                    sectSearch.insertAdjacentElement("afterbegin", titleArea);
                }
            });
            validarBusqueda = true;
        }
    });
    arrayAnimales.forEach(element => {
        if (element.name.includes(buscador)) {
            let divImpri = document.createElement("div");
            divImpri.className = "bordeBottom";
            sectSearch.insertAdjacentElement("beforeend", divImpri);
            let titleAni = document.createElement("h3");
            titleAni.textContent = "Animal";
            titleAni.className = "animales";
            let verAnimal = document.createElement("p");
            verAnimal.textContent = element.name;
            verAnimal.className = "animales";
            divImpri.insertAdjacentElement("beforeend", titleAni);
            divImpri.insertAdjacentElement("beforeend", verAnimal);
            let idEspecie = element.idEspecie;
            arrayEspecies.forEach(element => {
                if (element.Id === idEspecie) {
                    let titleEsp = document.createElement("h3");
                    titleEsp.textContent = "Especie";
                    titleEsp.className = "especie";
                    let verEspecie = document.createElement("p");
                    verEspecie.textContent = element.name;
                    verEspecie.className = "especie";
                    divImpri.insertAdjacentElement("afterbegin", verEspecie);
                    divImpri.insertAdjacentElement("afterbegin", titleEsp);
                    let idZona = element.idArea;
                    arrayAreas.forEach(element => {
                        if (element.Id === idZona) {
                            let titleArea = document.createElement("h3");
                            titleArea.textContent = "Area";
                            let verZona = document.createElement("p");
                            verZona.textContent = element.name;
                            divImpri.insertAdjacentElement("afterbegin", verZona);
                            divImpri.insertAdjacentElement("afterbegin", titleArea);
                        }
                    });
                }
            });
            validarBusqueda = true;
        }
    });
    arrayComentarios.forEach(element => {
        if (element.nameUser.includes(buscador) || element.comment.includes(buscador)) {
            let divImpri = document.createElement("div");
            divImpri.className = "bordeBottom";
            sectSearch.insertAdjacentElement("beforeend", divImpri);
            let titleComment = document.createElement("h3");
            titleComment.textContent = "Comentario";
            titleComment.className = "comentarios";
            let verNameUser = document.createElement("p");
            verNameUser.textContent = `User: ${element.nameUser}`;
            verNameUser.className = "comentarios";
            let verComment = document.createElement("p");
            verComment.textContent = `Comment: ${element.comment}`;
            verComment.className = "comentarios";
            divImpri.insertAdjacentElement("beforeend", titleComment);
            divImpri.insertAdjacentElement("beforeend", verNameUser);
            divImpri.insertAdjacentElement("beforeend", verComment);
            let idAnimal = element.idAnimal;
            arrayAnimales.forEach(element => {
                if (element.Id === idAnimal) {
                    let titleAni = document.createElement("h3");
                    titleAni.textContent = "Animal";
                    titleAni.className = "animales";
                    let verAnimal = document.createElement("p");
                    verAnimal.textContent = element.name;
                    verAnimal.className = "animales";
                    divImpri.insertAdjacentElement("afterbegin", verAnimal);
                    divImpri.insertAdjacentElement("afterbegin", titleAni);
                    let idEspecie = element.idEspecie;
                    arrayEspecies.forEach(element => {
                        if (element.Id === idEspecie) {
                            let titleEsp = document.createElement("h3");
                            titleEsp.textContent = "Especie";
                            titleEsp.className = "especie";
                            let verEspecie = document.createElement("p");
                            verEspecie.textContent = element.name;
                            verEspecie.className = "especie";
                            divImpri.insertAdjacentElement("afterbegin", verEspecie);
                            divImpri.insertAdjacentElement("afterbegin", titleEsp);
                            let idZona = element.idArea;
                            arrayAreas.forEach(element => {
                                if (element.Id === idZona) {
                                    let titleArea = document.createElement("h3");
                                    titleArea.textContent = "Zona";
                                    let verZona = document.createElement("p");
                                    verZona.textContent = element.name;
                                    divImpri.insertAdjacentElement("afterbegin", verZona);
                                    divImpri.insertAdjacentElement("afterbegin", titleArea);
                                }
                            });
                        }
                    });
                }
            });
            validarBusqueda = true;
        }
    });
    arrayRespuestas.forEach(element => {
        if (element.nameUser.includes(buscador) || element.comment.includes(buscador)) {
            let divImpri = document.createElement("div");
            divImpri.className = "bordeBottom";
            sectSearch.insertAdjacentElement("beforeend", divImpri);
            let titleResp = document.createElement("h3");
            titleResp.textContent = "Respuesta";
            titleResp.className = "respuestas";
            let verNameUser = document.createElement("p");
            verNameUser.textContent = `User: ${element.nameUser}`;
            verNameUser.className = "respuestas";
            let verResp = document.createElement("p");
            verResp.textContent = `Respuesta: ${element.comment}`;
            verResp.className = "respuestas";
            divImpri.insertAdjacentElement("beforeend", titleResp);
            divImpri.insertAdjacentElement("beforeend", verNameUser);
            divImpri.insertAdjacentElement("beforeend", verResp);
            let idComment = element.idComentario;
            arrayComentarios.forEach(element => {
                if (element.Id === idComment) {
                    let titleComment = document.createElement("h3");
                    titleComment.textContent = "Comentario";
                    titleComment.className = "comentarios";
                    let verNameUser = document.createElement("p");
                    verNameUser.textContent = `User: ${element.nameUser}`;
                    verNameUser.className = "comentarios";
                    let verComment = document.createElement("p");
                    verComment.textContent = `Comment: ${element.comment}`;
                    verComment.className = "comentarios";
                    divImpri.insertAdjacentElement("afterbegin", verComment);
                    divImpri.insertAdjacentElement("afterbegin", verNameUser);
                    divImpri.insertAdjacentElement("afterbegin", titleComment);
                    let idAnimal = element.idAnimal;
                    arrayAnimales.forEach(element => {
                        if (element.Id === idAnimal) {
                            let titleAni = document.createElement("h3");
                            titleAni.textContent = "Animal";
                            titleAni.className = "animales";
                            let verAnimal = document.createElement("p");
                            verAnimal.textContent = element.name;
                            verAnimal.className = "animales";
                            divImpri.insertAdjacentElement("afterbegin", verAnimal);
                            divImpri.insertAdjacentElement("afterbegin", titleAni);
                            let idEspecie = element.idEspecie;
                            arrayEspecies.forEach(element => {
                                if (element.Id === idEspecie) {
                                    let titleEsp = document.createElement("h3");
                                    titleEsp.textContent = "Especie";
                                    titleEsp.className = "especie";
                                    let verEspecie = document.createElement("p");
                                    verEspecie.textContent = element.name;
                                    verEspecie.className = "especie";
                                    divImpri.insertAdjacentElement("afterbegin", verEspecie);
                                    divImpri.insertAdjacentElement("afterbegin", titleEsp);
                                    let idZona = element.idArea;
                                    arrayAreas.forEach(element => {
                                        if (element.Id === idZona) {
                                            let titleArea = document.createElement("h3");
                                            titleArea.textContent = "Zona";
                                            let verZona = document.createElement("p");
                                            verZona.textContent = element.name;
                                            divImpri.insertAdjacentElement("afterbegin", verZona);
                                            divImpri.insertAdjacentElement("afterbegin", titleArea);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            validarBusqueda = true;
        }
    });
    if (validarBusqueda === false) {
        sectSearch.innerHTML = "";
        let mensaje = document.createElement("h2");
        mensaje.textContent = `No se han encontrado resultados para tu búsqueda (${buscador}).`;
        sectSearch.insertAdjacentElement("beforeend", mensaje);
    }
}
let form = document.getElementById("formulario");
form.addEventListener("submit", envio);
function envio(e) {
    e.preventDefault();
    if (validarForm === enums.formArea) {
        let inputName = document.getElementById("floatingInput");
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputName.value)) {
            if (inputName.value.length >= 4) {
                validarData(inputName, arrayAreas);
                if (validarBusqueda === false) {
                    let data = {
                        Id: Ids(),
                        name: inputName.value.toLowerCase()
                    };
                    arrayAreas.push(data);
                    localStorage.setItem("Areas", JSON.stringify(arrayAreas));
                    selectArea();
                    form.reset();
                }
                else {
                    alert(`El area ${inputName.value.toLowerCase()} ya existe`);
                }
            }
            else {
                alert("El area tiene que tener minimo de 4 caracteres");
            }
        }
        else {
            alert("Error, solo se aceptan letras");
        }
    }
    if (validarForm === enums.formEspecie) {
        let inputName = document.getElementById("floatingInput");
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputName.value)) {
            if (inputName.value.length >= 4) {
                validarData(inputName, arrayEspecies);
                if (validarBusqueda === false) {
                    let data = {
                        Id: Ids(),
                        idArea: idObjPadre,
                        name: inputName.value.toLowerCase()
                    };
                    arrayEspecies.push(data);
                    localStorage.setItem("Especies", JSON.stringify(arrayEspecies));
                    selectArea();
                    form.reset();
                }
                else {
                    alert(`El area ${inputName.value} ya existe`);
                }
            }
            else {
                alert("La especie tiene que tener minimo de 4 caracteres");
            }
        }
        else {
            alert("Error, solo se aceptan letras");
        }
    }
    if (validarForm === enums.formAnimal) {
        let inputName = document.getElementById("floatingInput");
        validarData(inputName, arrayAnimales);
        if (validarBusqueda === false) {
            let data = {
                Id: Ids(),
                idEspecie: idObjPadre,
                name: inputName.value.toLowerCase()
            };
            arrayAnimales.push(data);
            localStorage.setItem("Animales", JSON.stringify(arrayAnimales));
            selectArea();
            form.reset();
        }
        else {
            alert(`El area ${inputName.value} ya existe`);
        }
    }
    if (validarForm === enums.formComentario) {
        let inputComment = document.getElementById("floatingTextarea");
        let inputNameUser = document.getElementById("floatingInput");
        let date = new Date();
        let fecha = `Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} H24: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let data = {
            Id: Ids(),
            idAnimal: idObjPadre,
            comment: inputComment.value.toLowerCase(),
            nameUser: inputNameUser.value.toLowerCase(),
            fechaHora: fecha
        };
        arrayComentarios.push(data);
        localStorage.setItem("Comentarios", JSON.stringify(arrayComentarios));
        selectArea();
        form.reset();
    }
    if (validarForm === enums.formRespuesta) {
        let date = new Date();
        let fecha = `Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} H24: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let inputComment = document.getElementById(`inputResp${idObjPadre}`);
        let inputNameUser = document.getElementById(`inputUser${idObjPadre}`);
        console.log(`Resp: ${inputComment.value} - User:${inputNameUser.value}`);
        let data = {
            Id: Ids(),
            idComentario: idObjPadre,
            comment: inputComment.value.toLowerCase(),
            nameUser: inputNameUser.value.toLowerCase(),
            fechaHora: fecha
        };
        arrayRespuestas.push(data);
        localStorage.setItem("Respuestas", JSON.stringify(arrayRespuestas));
        selectArea();
        // form.reset(); no es el formulario
    }
}
function validarData(inputValue, arrayValidar) {
    let array = [];
    arrayValidar.forEach(element => {
        array.push(element.name);
    });
    validarBusqueda = array.includes(inputValue.value);
}
document.addEventListener("DOMContentLoaded", eventsItems);
