let enums = {
    inicioForm : "",
    idZonas : "",
    idEspecies : "",
    idAnimals : "",
    idComments : ""
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
    let message = document.getElementById("newMessage");
    let close = document.getElementById("signOut");

    area.addEventListener("click",formArea);
    message.addEventListener("click",formComment);
    close.addEventListener("click",signOut)

    selectArea();
}

function formComment(){
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
                let btnClose = document.createElement("button");
                btnClose.className="btn-close";

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
                divNameUser.insertAdjacentElement("beforeend",btnClose);
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
                        <button class="btn-close"></button>
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
    enums.inicioForm = "formArea";

    let sectionEspe = document.getElementById("sectVerEspecies");
    sectionEspe.className="d-none";

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
            btnArea.textContent=element.nameArea;
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

        // let newSpecies = document.getElementById("floatingSelect");
        // newSpecies.addEventListener("change",(e)=>{
        // if (e.target.value === "addSpecies") {
        //     formSpecieArea();
        //     }
        // });
    }
}
function formSpecieArea(e) {
    enums.inicioForm = "formSpecie";

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
                divNameSpecie.textContent=element.nameSpecie;
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
                divNameAnimal.textContent=element.nameAnimal;
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
    window.location.reload();
    console.log("salir");
}
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",envio);

function envio(e,nameUserResp,resCommnet,idResComment){
    e.preventDefault();
    if (enums.inicioForm === "formComment") {
        let inputName = document.getElementById("floatingInput").value;
        let inputTextarea = document.getElementById("floatingTextarea").value;
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
    if (enums.inicioForm === "formArea") {
        let inputNameArea = document.getElementById("floatingInput").value; 
        let submit = {
            Id : idZonas(),
            nameArea : inputNameArea
        }
        arrayAreas.push(submit);
        localStorage.setItem("Areas Zoologico",JSON.stringify(arrayAreas));
        selectArea();
        formulario.reset();
    }
    if (enums.inicioForm === "formSpecie") {
        let inputNameSpecie = document.getElementById("floatingInput").value; 
        let submit = {
            idZonas : enums.idZonas,
            Id : idEspecies(),
            nameSpecie : inputNameSpecie
        }
        arraySpecie.push(submit)
        localStorage.setItem("Especies",JSON.stringify(arraySpecie));
        formulario.reset();
    }
    if (enums.inicioForm === "formAnimal") {
        let inputNameAnimal = document.getElementById("floatingInput").value; 
        let submit = {
            idEspecies : enums.idEspecies,
            Id : idAnimales(),
            nameAnimal : inputNameAnimal
        }
        arrayAnimal.push(submit);
        localStorage.setItem("Animales",JSON.stringify(arrayAnimal));
        formulario.reset();
    }
    if (enums.inicioForm === "formResponder"){
        arrayRespuestas = JSON.parse(localStorage.getItem("ResponseComment"));
        if(arrayRespuestas === null){
            arrayRespuestas = [{
                IdComment : idResComment,
                nameUser : nameUserResp.value,
                comment : resCommnet.value
            }];
        }
        else{
            let submit = {
                IdComment : idResComment,
                nameUser : nameUserResp.value,
                comment : resCommnet.value
            }
            arrayRespuestas.push(submit);
        }
        localStorage.setItem("ResponseComment",JSON.stringify(arrayRespuestas));
        e.target.reset();
    }
}

document.addEventListener("DOMContentLoaded",eventsItems);