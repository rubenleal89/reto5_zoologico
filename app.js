let enums = {
    inicioForm: ""
}

let arrayMenssage = [];
let arrayAreas = [];
let arraySpecie = [];
let arrayAnimal = [];

function identificador(){
    let lastId = localStorage.getItem("lastId") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("lastId", JSON.stringify(newId));
    return newId;
}
function eventsItems(){
    // arrayAreas = JSON.parse(localStorage.getItem("Areas Zoologico"));
    // arrayMenssage = JSON.parse(localStorage.getItem("Comentarios"));

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

    // let formulario = document.getElementById("formulario");
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
function formArea(){
    enums.inicioForm = "formArea";

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
    if (arrayAreas === null) {
        arrayAreas = [];
    }else{
        let listaAreas = document.getElementById("listaAreas");
        listaAreas.innerHTML = "";
        arrayAreas.forEach(element => {
            let divSpecie = document.createElement("li");
            divSpecie.className="btn-group dropend";
            let btnArea = document.createElement("button");
            btnArea.className="btn btn-secondary";
            btnArea.textContent=element.nameArea;
            btnArea.addEventListener("click",formSpecieArea);
            let btnSpecies = document.createElement("button");
            btnSpecies.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
            btnSpecies.addEventListener("click",listaSpecie);
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
function formSpecieArea() {
    enums.inicioForm = "formSpecie";

    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent="Create Species";

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
function listaSpecie() {
    // arraySpecie = JSON.parse(localStorage.getItem("Especies Zoologico"));
    let sectForm = document.getElementById("sectForm");
    sectForm.className="d-none";
    if (arraySpecie === null) {
        arraySpecie = [];
    }
    else{
        let section = document.getElementById("sectVerEspecies");
        section.innerHTML="";

        arraySpecie.forEach(element => {
            let divSpecie = document.createElement("div");
            divSpecie.className="btn-group dropend";
            let btnSpecies = document.createElement("button");
            btnSpecies.className="btn btn-secondary";
            btnSpecies.textContent=element.nameSpecie;
            btnSpecies.addEventListener("click",formSpecieArea);
            let btnVerAnimal = document.createElement("button");
            btnVerAnimal.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
            // btnVerAnimal.addEventListener("click",listaAnimales);
            let spanToggle = document.createElement("span");
            spanToggle.className="visually-hidden";
            spanToggle.textContent="Toggle Dropend";
            let btnAnimal = document.createElement("button");
            btnAnimal.className="btn btn-secondary dropdown-toggle-split";
            btnAnimal.addEventListener("click",formAnimal);
            let spanVer = document.createElement("span");
            spanVer.textContent="+";

            section.insertAdjacentElement("beforeend",divSpecie);
            divSpecie.insertAdjacentElement("beforeend",btnSpecies);
            divSpecie.insertAdjacentElement("beforeend",btnAnimal);
            btnAnimal.insertAdjacentElement("beforeend",spanVer);
            divSpecie.insertAdjacentElement("beforeend",btnVerAnimal);
            btnVerAnimal.insertAdjacentElement("beforeend",spanToggle);
        });
    }
}
function formAnimal() {
    enums.inicioForm = "formAnimal";

    let sectForm = document.getElementById("sectForm");
    sectForm.className="sect-form";
    let titleForm = document.getElementById("titleForm");
    titleForm.textContent="Create Animal"

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
function signOut(){
    window.location.reload();
    console.log("salir");
}
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",envio);

function envio(e){
    e.preventDefault();
    if (enums.inicioForm === "formComment") {
        let inputName = document.getElementById("floatingInput").value;
        let inputTextarea = document.getElementById("floatingTextarea").value;
        let submit = {
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
            nameSpecie : inputNameSpecie
        }
        arraySpecie.push(submit)
        // localStorage.setItem("Areas Zoologico",JSON.stringify(arrayAreas));
        formulario.reset();
    }
    if (enums.inicioForm === "formAnimal") {
        let inputNameAnimal = document.getElementById("floatingInput").value; 
        let submit = {
            nameAnimal : inputNameAnimal
        }
        arrayAnimal.push(submit);
        // localStorage.setItem("Areas Zoologico",JSON.stringify(arrayAreas));
        formulario.reset();
    }
}

document.addEventListener("DOMContentLoaded",eventsItems);