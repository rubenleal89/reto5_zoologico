let enums = {
    inicioForm : "",
    idZonas : "",
    idEspecies : "",
    idAnimals : "",
    idComments : "",
    validarElement : "",
    busqueda: false
}
let arrayMenssage = [];
let arrayAreas = [];
let arraySpecie = [];
let arrayAnimal = [];
let arrayRespuestas = [];

function idZonas(){
    let lastId = localStorage.getItem("idZonas") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("idZonas", JSON.stringify(newId));
    return newId;
}
function idEspecies(){
    let lastId = localStorage.getItem("idEspecies") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("idEspecies", JSON.stringify(newId));
    return newId;
}
function idAnimales(){
    let lastId = localStorage.getItem("idAnimales") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("idAnimales", JSON.stringify(newId));
    return newId;
}
function idComments() {
    let lastId = localStorage.getItem("idComments") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("idComments", JSON.stringify(newId));
    return newId;
}
function eventsItems(){
    let area = document.getElementById("newArea");
    let close = document.getElementById("signOut");
    area.addEventListener("click",formArea);
    close.addEventListener("click",signOut)
    dataLocalStorage();
    selectArea();
}
function dataLocalStorage() {
    arraySpecie = JSON.parse(localStorage.getItem("Especies"));
    arrayAnimal = JSON.parse(localStorage.getItem("Animales"));
    arrayMenssage = JSON.parse(localStorage.getItem("Comentarios"));
    arrayRespuestas = JSON.parse(localStorage.getItem("ResponseComment"));
    if (arraySpecie === null) {
        arraySpecie=[];
    }
    if (arrayAnimal === null) {
        arrayAnimal=[];
    }
    if (arrayMenssage === null) {
        arrayMenssage=[];
    }
    if (arrayRespuestas === null) {
        arrayRespuestas=[];
    }
}
/////////////////////////////////////////////////////////////////////////////////////////
function formComment(){
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="d-none";
    enums.inicioForm = "formComment";

    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent="Create Message"

    formulario.innerHTML="";

    let divInputName = document.createElement("div");
    divInputName.className="form-floating mb-3";
    let inputName = document.createElement("input")
    inputName.type="text";
    inputName.className="form-control rounded-3";
    inputName.id="floatingInput";
    inputName.placeholder="Your Name";
    let labelName = document.createElement("label");
    labelName.textContent="Your Name";
    labelName.setAttribute("for","floatingInput");

    let divInputMessage = document.createElement("div");
    divInputMessage.className="form-floating mb-3";
    let inputMessage = document.createElement("textarea")
    inputMessage.className="textArea form-control rounded-3";
    inputMessage.id="floatingTextarea";
    inputMessage.placeholder="Message";
    let labelMessage = document.createElement("label");
    labelMessage.textContent="Message";
    labelMessage.setAttribute("for","floatingTextarea");

    let btnSubmit = document.createElement("button");
    btnSubmit.type="submit";
    btnSubmit.textContent="Submit";
    btnSubmit.className="w-100 mb-2 btn btn-lg rounded-3 btn-primary";

    formulario.insertAdjacentElement("beforeend",divInputName);
    divInputName.insertAdjacentElement("beforeend",inputName);
    divInputName.insertAdjacentElement("beforeend",labelName);

    formulario.insertAdjacentElement("beforeend",divInputMessage);
    divInputMessage.insertAdjacentElement("beforeend",inputMessage);
    divInputMessage.insertAdjacentElement("beforeend",labelMessage);

    formulario.insertAdjacentElement("beforeend",btnSubmit);
}
function listaComment(id) {
    let section = document.getElementById("verComentarios");
    section.className="verComentarios";
    section.innerHTML="";
    arrayMenssage = JSON.parse(localStorage.getItem("Comentarios"));

    if (arrayMenssage === null) {
        arrayMenssage=[];
    }
    else{
        arrayMenssage.forEach(element => {
            if(id === element.IdAnimals){
                let divContents = document.createElement("div");
                divContents.className="toast fade show";
                let divNameUser = document.createElement("div");
                divNameUser.className="toast-header";
                let iconMess = document.createElement("i");
                iconMess.className="fa-solid fa-message";
                let nameUser = document.createElement("strong");
                nameUser.className="me-auto";
                nameUser.textContent=element.nameUser;


                let divComment = document.createElement("div");
                divComment.className="toast-body";
                divComment.id="divComment";
                let txtComment = document.createElement("p");
                txtComment.textContent=element.comment;
                let divRespuesta = document.createElement("div");
                divRespuesta.className="btn-group";
                let btnResponder = document.createElement("button");
                btnResponder.className="btn btn-sm btn-secondary";
                btnResponder.textContent="Responder";
                btnResponder.addEventListener("click",(e)=>{
                    formResponder(divForm,element.Id,divRespComment);
                    enums.idComments = element.id;
                })
                let btnVerRespuestas = document.createElement("button");
                btnVerRespuestas.className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split";
                btnVerRespuestas.addEventListener("click",(e)=>{
                    listaRespuestas(element.Id,divRespComment,divForm);
                })
                let spanFlecha = document.createElement("span");
                spanFlecha.className="visually-hidden";
                spanFlecha.textContent="Toggle Dropdown";
                let divForm = document.createElement("div");
                let divRespComment = document.createElement("div");
                
                section.insertAdjacentElement("beforeend",divContents);
                divContents.insertAdjacentElement("beforeend",divNameUser);
                divNameUser.insertAdjacentElement("beforeend",iconMess);
                divNameUser.insertAdjacentElement("beforeend",nameUser);
                divContents.insertAdjacentElement("beforeend",divComment);
                divComment.insertAdjacentElement("beforeend",txtComment);
                divComment.insertAdjacentElement("beforeend",divRespuesta);
                divRespuesta.insertAdjacentElement("beforeend",btnResponder);
                divRespuesta.insertAdjacentElement("beforeend",btnVerRespuestas);
                divRespuesta.insertAdjacentElement("beforeend",spanFlecha);
                divComment.insertAdjacentElement("beforeend",divForm);
                divComment.insertAdjacentElement("beforeend",divRespComment);
            }
        });
    }
}
function formResponder(divForm,idComments,divRespComment) {
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="d-none";
    divForm.innerHTML = "";
    divForm.className="divFormResp";
    divRespComment.className="d-none";
    enums.inicioForm = "formResponder";
    let formulario = document.createElement("form");
    formulario.className="formRespuesta";
    formulario.addEventListener("submit",(e)=>{
        envio(e,nameUser,respuesta,idComments);
    });
    let nameUser = document.createElement("input");
    nameUser.type="text";
    nameUser.className="form-control form-control-sm nameUser";
    nameUser.placeholder="Nombre Usuario";
    let respuesta = document.createElement("textarea");
    respuesta.className="form-control form-control-sm inpuntRespuesta";
    respuesta.placeholder="Responder Commentario";
    let btnSubmit = document.createElement("button");
    btnSubmit.textContent="Enviar";
    btnSubmit.className="btn btn-primary btn-sm";

    divForm.insertAdjacentElement("beforeend",formulario);
    formulario.insertAdjacentElement("beforeend",nameUser);
    formulario.insertAdjacentElement("beforeend",respuesta);
    formulario.insertAdjacentElement("beforeend",btnSubmit);
}
function listaRespuestas(id,divRespComment,divForm) {
    arrayRespuestas = JSON.parse(localStorage.getItem("ResponseComment"));
    divRespComment.innerHTML="";
    divRespComment.className="divVerRespuestas";
    divForm.className="d-none";
    if(arrayRespuestas === null){
        arrayRespuestas = [];
    }
    else{
        arrayRespuestas.forEach(element => {
            if (id === element.IdComment) {
                divRespComment.innerHTML +=`
                <div class="toast fade show divRespuestas">
                    <div class="toast-header">
                        <strong class="me-auto">${element.nameUser}</strong>
                    </div>
                    <div class="toast-body" id="divComment">
                        <p>${element.comment}</p>
                    </div>
                </div>
                `;
            }
        });
    }
}
function formArea(){
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="d-none";
    enums.inicioForm = "formArea";

    let sectionEspe = document.getElementById("sectVerEspecies");
    sectionEspe.className="d-none";
    sectionComment = document.getElementById("verComentarios");
    sectionComment.className="d-none";

    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent="Create Area"

    formulario.innerHTML="";

    let divInputArea = document.createElement("div");
    divInputArea.className="form-floating mb-3";
    let inputArea = document.createElement("input")
    inputArea.type="text";
    inputArea.className="form-control rounded-3";
    inputArea.id="floatingInput";
    inputArea.placeholder="Area Name";
    let labelArea = document.createElement("label");
    labelArea.textContent="Area Name";
    labelArea.setAttribute("for","floatingInput");

    let btnSubmit = document.createElement("button");
    btnSubmit.type="submit";
    btnSubmit.textContent="Submit";
    btnSubmit.className="w-100 mb-2 btn btn-lg rounded-3 btn-primary";

    formulario.insertAdjacentElement("beforeend",divInputArea);
    divInputArea.insertAdjacentElement("beforeend",inputArea);
    divInputArea.insertAdjacentElement("beforeend",labelArea);

    formulario.insertAdjacentElement("beforeend",btnSubmit);
}
function selectArea() {
    arrayAreas = JSON.parse(localStorage.getItem("Areas Zoologico"));
    let sectComment = document.getElementById("verComentarios");
    if (arrayAreas === null) {
        arrayAreas = [];
    }else{
        let listaAreas = document.getElementById("listaAreas");
        listaAreas.innerHTML = "";
        arrayAreas.forEach(element => {
            let divSpecie = document.createElement("li");
            divSpecie.className="btn-group dropend separadoBtn";
            let btnArea = document.createElement("button");
            btnArea.className="btn btn-secondary NameSpecie";
            btnArea.textContent=element.name;
            btnArea.addEventListener("click",(e)=>{
                formSpecieArea(e)
                enums.idZonas = element.Id;
            });
            let btnSpecies = document.createElement("button");
            btnSpecies.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
            btnSpecies.addEventListener("click",(e)=>{
                listaSpecie(element.Id);
                sectComment.className="d-none";
            });
            let spanToggle = document.createElement("span");
            spanToggle.className="visually-hidden";
            spanToggle.textContent="Toggle Dropend";

            listaAreas.insertAdjacentElement("beforeend",divSpecie);
            divSpecie.insertAdjacentElement("beforeend",btnArea);
            divSpecie.insertAdjacentElement("beforeend",btnSpecies);
            btnSpecies.insertAdjacentElement("beforeend",spanToggle);

        });
    }
}
function formSpecieArea(e) {
    enums.inicioForm = "formSpecie";

    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="d-none";
    let sectionEspe = document.getElementById("sectVerEspecies");
    sectionEspe.className="d-none";

    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent=`Create species for the ${e.target.textContent} zone`;

    formulario.innerHTML="";
    formulario.innerHTML += `
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
    arraySpecie = JSON.parse(localStorage.getItem("Especies"));
    let sectForm = document.getElementById("sectForm");
    sectForm.className="d-none";
    if (arraySpecie === null) {
        arraySpecie = [];
    }
    else{
        let section = document.getElementById("sectVerEspecies");
        section.className="sectVerEspecies"
        section.innerHTML="";
        let divContentSpecie = document.createElement("div");
        divContentSpecie.className="divSpecies containers-scroll borderDivScrool";
        let divContentAnimal = document.createElement("div");
        divContentAnimal.className="divAnimal containers-scroll borderDivScrool";
        let titleEspecie = document.createElement("h2");
        titleEspecie.textContent="Especies";
        titleEspecie.className="whiteColorTitles text-center";
        section.insertAdjacentElement("beforeend",divContentSpecie);
        section.insertAdjacentElement("beforeend",divContentAnimal);
        divContentSpecie.insertAdjacentElement("beforeend",titleEspecie);

        arraySpecie.forEach(element => {
            if(id === element.idZonas){                
                let divSpecie = document.createElement("div");
                divSpecie.className="btn-group dropend btnSpecies separadoBtn";
                let divNameSpecie = document.createElement("div");
                divNameSpecie.className="divNameSpecie btnSpecies";
                divNameSpecie.textContent=element.name;
                let btnVerAnimal = document.createElement("button");
                btnVerAnimal.className="btn btn-secondary dropdown-toggle dropdown-toggle-split addSee";
                btnVerAnimal.addEventListener("click",(e)=>{
                    listaAnimales(element.Id,divContentAnimal);
                });
                let spanToggle = document.createElement("span");
                spanToggle.className="visually-hidden";
                spanToggle.textContent="Toggle Dropend";
                let btnAnimal = document.createElement("button");
                btnAnimal.className="btn btn-secondary dropdown-toggle-split addSee";
                btnAnimal.textContent="+";
                btnAnimal.addEventListener("click",(e)=>{
                    formAnimal(e);
                    enums.idEspecies = element.Id;
                });

                divContentSpecie.insertAdjacentElement("beforeend",divSpecie);
                divSpecie.insertAdjacentElement("beforeend",divNameSpecie);
                divSpecie.insertAdjacentElement("beforeend",btnAnimal);
                divSpecie.insertAdjacentElement("beforeend",btnVerAnimal);
                btnVerAnimal.insertAdjacentElement("beforeend",spanToggle);
            }
        });
    }
}
function formAnimal(e) {
    enums.inicioForm = "formAnimal";

    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="d-none";
    let sectRespComment = document.getElementById("verComentarios");
    sectRespComment.className="d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent=`Create animals for the ${e.target.parentNode.childNodes[0].textContent} species`

    formulario.innerHTML="";

    let divInputArea = document.createElement("div");
    divInputArea.className="form-floating mb-3";
    let inputArea = document.createElement("input")
    inputArea.type="text";
    inputArea.className="form-control rounded-3";
    inputArea.id="floatingInput";
    inputArea.placeholder="Animal Name";
    let labelArea = document.createElement("label");
    labelArea.textContent="Animal Name";
    labelArea.setAttribute("for","floatingInput");

    let btnSubmit = document.createElement("button");
    btnSubmit.type="submit";
    btnSubmit.textContent="Submit";
    btnSubmit.className="w-100 mb-2 btn btn-lg rounded-3 btn-primary";

    formulario.insertAdjacentElement("beforeend",divInputArea);
    divInputArea.insertAdjacentElement("beforeend",inputArea);
    divInputArea.insertAdjacentElement("beforeend",labelArea);

    formulario.insertAdjacentElement("beforeend",btnSubmit);
}
function listaAnimales(id,divContentAnimal) {
    arrayAnimal = JSON.parse(localStorage.getItem("Animales"));
    let sectForm = document.getElementById("sectForm");
    sectForm.className="d-none";
    if (arrayAnimal === null) {
        arrayAnimal = [];
    }
    else{
        divContentAnimal.innerHTML="";
        let titleAnimales = document.createElement("h2");
        titleAnimales.textContent="Animales";
        titleAnimales.className="whiteColorTitles text-center";
        let sectForm = document.getElementById("sectForm");
        let sectComment = document.getElementById("verComentarios");
        divContentAnimal.insertAdjacentElement("beforeend",titleAnimales);

        arrayAnimal.forEach(element => {
            if(id === element.idEspecies){                
                let divAnimal = document.createElement("div");
                divAnimal.className="btn-group dropend btnSpecies separadoBtn";
                let divNameAnimal = document.createElement("div");
                divNameAnimal.className="divNameSpecie btnSpecies";
                divNameAnimal.textContent=element.name;
                let btnVerComentario = document.createElement("button");
                btnVerComentario.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
                btnVerComentario.addEventListener("click",(e)=>{
                    sectForm.className="d-none";
                    listaComment(element.Id);
                });
                let spanToggle = document.createElement("span");
                spanToggle.className="visually-hidden";
                spanToggle.textContent="Toggle Dropend";
                let btnComentario = document.createElement("button");
                btnComentario.className="btn btn-secondary dropdown-toggle-split";
                btnComentario.textContent="+";
                btnComentario.addEventListener("click",(e)=>{
                    sectComment.className="d-none";
                    formComment();
                    enums.idAnimals = element.Id;
                });

                divContentAnimal.insertAdjacentElement("beforeend",divAnimal);
                divAnimal.insertAdjacentElement("beforeend",divNameAnimal);
                divAnimal.insertAdjacentElement("beforeend",btnComentario);
                divAnimal.insertAdjacentElement("beforeend",btnVerComentario);
                btnVerComentario.insertAdjacentElement("beforeend",spanToggle);
            }
        });
    }
}
function signOut(){
    localStorage.removeItem("Areas Zoologico");
    localStorage.removeItem("Especies");
    localStorage.removeItem("Animales");
    localStorage.removeItem("Comentarios");
    localStorage.removeItem("ResponseComment");
    window.location.reload();
}
let formSearch = document.getElementById("forSearch");
formSearch.addEventListener("submit",search);
function search(e) {
    e.preventDefault();
    enums.busqueda = false;
    let sectVerEspecies = document.getElementById("sectVerEspecies");
    sectVerEspecies.className="d-none";
    let sectForm = document.getElementById("sectForm");
    sectForm.className="d-none";
    let sectVerComentarios = document.getElementById("verComentarios");
    sectVerComentarios.className="d-none";
    let buscador = document.getElementById("inputSearch").value.toLowerCase();
    let sectSearch = document.getElementById("verBusqueda");
    sectSearch.className="verBusqueda";
    sectSearch.innerHTML="";
    if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(buscador) && buscador.length >= 4) {
        verBusqueda(buscador,sectSearch);
        formSearch.reset();
    }
    else{
        sectSearch.innerHTML +=`
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
function verBusqueda(buscador,sectSearch) {
    arrayAreas.forEach(element => {
        if (element.name.includes(buscador)) {
            let title = document.createElement("h3");
            title.textContent="Zona";
            let verZona = document.createElement("p");
            verZona.textContent = element.name;
            sectSearch.insertAdjacentElement("beforeend",title);
            sectSearch.insertAdjacentElement("beforeend",verZona);
            enums.busqueda = true;
        }
    });
    arraySpecie.forEach(element => {
        if (element.name.includes(buscador)) {
            let titleEsp = document.createElement("h3");
            titleEsp.textContent="Area";
            titleEsp.className="especie";
            let verEspecie = document.createElement("p");
            verEspecie.textContent = element.name;
            verEspecie.className="especie";
            sectSearch.insertAdjacentElement("beforeend",titleEsp);
            sectSearch.insertAdjacentElement("beforeend",verEspecie);
            let idZona = element.idZonas;
            arrayAreas.forEach(element => {
                if (element.Id === idZona) {
                    let titleArea = document.createElement("h3");
                    titleArea.textContent="Zona";
                    let verZona = document.createElement("p");
                    verZona.textContent = element.name;
                    sectSearch.insertAdjacentElement("afterbegin",verZona);
                    sectSearch.insertAdjacentElement("afterbegin",titleArea);
                }
            })
            enums.busqueda = true;
        }
    });
    arrayAnimal.forEach(element => {
        if (element.name.includes(buscador)) {
        let divImpri = document.createElement("div");
        divImpri.className="bordeBottom";
        sectSearch.insertAdjacentElement("beforeend",divImpri);
            let titleAni = document.createElement("h3");
            titleAni.textContent="Animal";
            titleAni.className="animales";
            let verAnimal = document.createElement("p");
            verAnimal.textContent = element.name;
            verAnimal.className="animales";
            divImpri.insertAdjacentElement("beforeend",titleAni);
            divImpri.insertAdjacentElement("beforeend",verAnimal);
            let idEspecie = element.idEspecies;
            arraySpecie.forEach(element => {
                if (element.Id === idEspecie) {
                    let titleEsp = document.createElement("h3");
                    titleEsp.textContent="Especie";
                    titleEsp.className="especie";
                    let verEspecie = document.createElement("p");
                    verEspecie.textContent = element.name;
                    verEspecie.className="especie";
                    divImpri.insertAdjacentElement("afterbegin",verEspecie);
                    divImpri.insertAdjacentElement("afterbegin",titleEsp);
                    let idZona = element.idZonas;
                    arrayAreas.forEach(element => {
                        if (element.Id === idZona) {
                            let titleArea = document.createElement("h3");
                            titleArea.textContent="Area";
                            let verZona = document.createElement("p");
                            verZona.textContent = element.name;
                            divImpri.insertAdjacentElement("afterbegin",verZona);
                            divImpri.insertAdjacentElement("afterbegin",titleArea);
                        }
                })
                }
            });
            enums.busqueda = true;
        }
    });
    arrayMenssage.forEach(element => {
        if (element.nameUser.includes(buscador) || element.comment.includes(buscador)) {
            let divImpri = document.createElement("div");
            divImpri.className="bordeBottom";
            sectSearch.insertAdjacentElement("beforeend",divImpri);
            let titleComment = document.createElement("h3");
            titleComment.textContent="Comentario";
            titleComment.className="comentarios";
            let verNameUser = document.createElement("p");
            verNameUser.textContent = `User: ${element.nameUser}`;
            verNameUser.className="comentarios";
            let verComment = document.createElement("p");
            verComment.textContent = `Comment: ${element.comment}`;
            verComment.className="comentarios";
            divImpri.insertAdjacentElement("beforeend",titleComment);
            divImpri.insertAdjacentElement("beforeend",verNameUser);
            divImpri.insertAdjacentElement("beforeend",verComment);
            let idAnimal = element.IdAnimals
            arrayAnimal.forEach(element => {
                if (element.Id === idAnimal) {
                    let titleAni = document.createElement("h3");
                    titleAni.textContent="Animal";
                    titleAni.className="animales";
                    let verAnimal = document.createElement("p");
                    verAnimal.textContent = element.name;
                    verAnimal.className="animales";
                    divImpri.insertAdjacentElement("afterbegin",verAnimal);
                    divImpri.insertAdjacentElement("afterbegin",titleAni);
                    let idEspecie = element.idEspecies;
                    arraySpecie.forEach(element => {
                        if (element.Id === idEspecie) {
                            let titleEsp = document.createElement("h3");
                            titleEsp.textContent="Especie";
                            titleEsp.className="especie";
                            let verEspecie = document.createElement("p");
                            verEspecie.textContent = element.name;
                            verEspecie.className="especie";
                            divImpri.insertAdjacentElement("afterbegin",verEspecie);
                            divImpri.insertAdjacentElement("afterbegin",titleEsp);
                            let idZona = element.idZonas;
                            arrayAreas.forEach(element => {
                                if (element.Id === idZona) {
                                    let titleArea = document.createElement("h3");
                                    titleArea.textContent="Zona";
                                    let verZona = document.createElement("p");
                                    verZona.textContent = element.name;
                                    divImpri.insertAdjacentElement("afterbegin",verZona);
                                    divImpri.insertAdjacentElement("afterbegin",titleArea);
                                }
                        })
                        }
                    });
                }
            });
            enums.busqueda = true;
        }
    });
    arrayRespuestas.forEach(element => {
        if (element.nameUser.includes(buscador) || element.comment.includes(buscador)) {
            let divImpri = document.createElement("div");
            divImpri.className="bordeBottom";
            sectSearch.insertAdjacentElement("beforeend",divImpri);
            let titleResp = document.createElement("h3");
            titleResp.textContent="Respuesta";
            titleResp.className="respuestas";
            let verNameUser = document.createElement("p");
            verNameUser.textContent = `User: ${element.nameUser}`;
            verNameUser.className="respuestas";
            let verResp = document.createElement("p");
            verResp.textContent = `Respuesta: ${element.comment}`;
            verResp.className="respuestas";
            divImpri.insertAdjacentElement("beforeend",titleResp);
            divImpri.insertAdjacentElement("beforeend",verNameUser);
            divImpri.insertAdjacentElement("beforeend",verResp);
            let idComment = element.IdComment;
            arrayMenssage.forEach(element => {
                if (element.Id === idComment) {
                    let titleComment = document.createElement("h3");
                    titleComment.textContent="Comentario";
                    titleComment.className="comentarios";
                    let verNameUser = document.createElement("p");
                    verNameUser.textContent = `User: ${element.nameUser}`;
                    verNameUser.className="comentarios";
                    let verComment = document.createElement("p");
                    verComment.textContent = `Comment: ${element.comment}`;
                    verComment.className="comentarios";
                    divImpri.insertAdjacentElement("afterbegin",verComment);
                    divImpri.insertAdjacentElement("afterbegin",verNameUser);
                    divImpri.insertAdjacentElement("afterbegin",titleComment);
                    let idAnimal = element.IdAnimals
                    arrayAnimal.forEach(element => {
                        if (element.Id === idAnimal) {
                            let titleAni = document.createElement("h3");
                            titleAni.textContent="Animal";
                            titleAni.className="animales";
                            let verAnimal = document.createElement("p");
                            verAnimal.textContent = element.name;
                            verAnimal.className="animales";
                            divImpri.insertAdjacentElement("afterbegin",verAnimal);
                            divImpri.insertAdjacentElement("afterbegin",titleAni);
                            let idEspecie = element.idEspecies;
                            arraySpecie.forEach(element => {
                                if (element.Id === idEspecie) {
                                    let titleEsp = document.createElement("h3");
                                    titleEsp.textContent="Especie";
                                    titleEsp.className="especie";
                                    let verEspecie = document.createElement("p");
                                    verEspecie.textContent = element.name;
                                    verEspecie.className="especie";
                                    divImpri.insertAdjacentElement("afterbegin",verEspecie);
                                    divImpri.insertAdjacentElement("afterbegin",titleEsp);
                                    let idZona = element.idZonas;
                                    arrayAreas.forEach(element => {
                                        if (element.Id === idZona) {
                                            let titleArea = document.createElement("h3");
                                            titleArea.textContent="Zona";
                                            let verZona = document.createElement("p");
                                            verZona.textContent = element.name;
                                            divImpri.insertAdjacentElement("afterbegin",verZona);
                                            divImpri.insertAdjacentElement("afterbegin",titleArea);
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });
            enums.busqueda = true;
        }
    });
    if (enums.busqueda === false) {
        sectSearch.innerHTML="";
        let mensaje = document.createElement("h2");
        mensaje.textContent=`No se han encontrado resultados para tu búsqueda (${buscador}).`;
        sectSearch.insertAdjacentElement("beforeend",mensaje);
    }
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",envio);
function envio(e,nameUserResp,resCommnet,idResComment){
    e.preventDefault();
    if (enums.inicioForm === "formArea") {
        let inputNameArea = document.getElementById("floatingInput").value.toLowerCase();
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputNameArea) && inputNameArea.length >= 4){
            validarData(inputNameArea,arrayAreas);
            if(enums.validarElement === false){
                let submit = {
                    Id : idZonas(),
                    name : inputNameArea
                }
                arrayAreas.push(submit);
                localStorage.setItem("Areas Zoologico",JSON.stringify(arrayAreas));
                selectArea();
                formulario.reset();
            }else{alert(`El area ${inputNameArea} ya existe`)}
        }
        else{
            alert("¡ERROR! el nombre del area debe contener solo letras y minimo 4 caracteres")
        }
    }
    if (enums.inicioForm === "formSpecie") {
        let inputNameSpecie = document.getElementById("floatingInput").value.toLowerCase();
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputNameSpecie) && inputNameSpecie.length >= 4){
            validarData(inputNameSpecie,arraySpecie);
            if(enums.validarElement === false){
                let submit = {
                    idZonas : enums.idZonas,
                    Id : idEspecies(),
                    name : inputNameSpecie
                }
                arraySpecie.push(submit)
                localStorage.setItem("Especies",JSON.stringify(arraySpecie));
                formulario.reset();
            }else{alert(`La especie ${inputNameSpecie} ya existe`)}
        }
        else{
            alert("¡ERROR! el nombre de la especie debe contener solo letras y minimo 4 caracteres");
        }
    }
    if (enums.inicioForm === "formAnimal") {
        let inputNameAnimal = document.getElementById("floatingInput").value.toLowerCase();
        if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputNameAnimal) && inputNameAnimal.length >= 4){
            validarData(inputNameAnimal,arrayAnimal);
            if(enums.validarElement === false){
                let submit = {
                    idEspecies : enums.idEspecies,
                    Id : idAnimales(),
                    name : inputNameAnimal
                }
                arrayAnimal.push(submit);
                localStorage.setItem("Animales",JSON.stringify(arrayAnimal));
                formulario.reset();
            }else{alert(`El animal ${inputNameAnimal} ya existe`)}
        }
        else{
            alert("¡ERROR! el nombre del animal debe contener solo letras y minimo 4 caracteres")
        }
    }
    if (enums.inicioForm === "formComment") {
        let inputName = document.getElementById("floatingInput").value.toLowerCase();
        let inputTextarea = document.getElementById("floatingTextarea").value.toLowerCase();
        if(inputName.length >= 4 && inputTextarea.length >= 4){
            if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputName) && /\S/.test(inputTextarea)){
                let submit = {
                    IdAnimals: enums.idAnimals,
                    Id : idComments(),
                    nameUser : inputName,
                    comment : inputTextarea
                }
                arrayMenssage.push(submit);
                localStorage.setItem("Comentarios",JSON.stringify(arrayMenssage));
                formulario.reset();
            }
            else{
                alert("¡ERROR! El nombre del usuario solo debe contener letras y el comentario no se puede enviar en blanco")
            }
        }else{alert("Los campos admiten minimo 4 caracteres")}
    }
    if (enums.inicioForm === "formResponder"){
        if(nameUserResp.value.length >= 4 && resCommnet.value.length >= 4){
            if (/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(nameUserResp.value) && /\S/.test(resCommnet.value)){
                let submit = { // Valores del Objetos son pasados por parametros
                    IdComment : idResComment,
                    nameUser : nameUserResp.value.toLowerCase(),
                    comment : resCommnet.value.toLowerCase()
                }
                arrayRespuestas.push(submit);
                localStorage.setItem("ResponseComment",JSON.stringify(arrayRespuestas));
                e.target.reset();
            }
            else{
                alert("Solo se aceptan letras")
            }
        }else{alert("Los campos admiten minimo 4 caracteres")}
    }
}
function validarData(inputValue,arrayValidar) {
    let array = [];
    arrayValidar.forEach(element => {
        array.push(element.name);
    });
    enums.validarElement = array.includes(inputValue);
}
document.addEventListener("DOMContentLoaded",eventsItems);