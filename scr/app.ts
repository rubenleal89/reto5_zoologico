let enums = {
  formArea : "formularioArea",
  formEspecie : "formularioEspecies",
  formAnimal : "formularioAnimal",
  formComentario: "formularioComentario",
  formRespuesta : "formularioRespuesta"
}
let validarForm:string;
let idObjPadre:number;
let arrayAreas: (idName)[] = []
let arrayEspecies: (idName&especies)[] = []
let arrayAnimales: (idName&animales)[] = []
let arrayComentarios: (idComRes&comentarios)[] = []
let arrayRespuestas: (idComRes&respuestas)[] = []
type idName ={
  Id:number,
  name:string
}
type especies = {
  idArea:number,
}
type animales = {
  idEspecie:number,
}
type idComRes = {
  Id:number,
  comment:string
  nameUser:string
  fechaHora:string
}
type comentarios = {
  idAnimal:number,
}
type respuestas = {
  idComentario:number,
}
function eventsItems() {
  let close = document.getElementById("signOut") as HTMLElement;
  let newArea = document.getElementById("newArea") as HTMLElement
  newArea.addEventListener("click",formArea)
  close.addEventListener("click",signOut)
  dataLocalStorage()
  selectArea()
}
function dataLocalStorage() {
  if(localStorage.getItem('Areas')){
    arrayAreas = JSON.parse(localStorage.getItem("Areas") || "")
  }
  if(localStorage.getItem('Especies')){
    arrayEspecies = JSON.parse(localStorage.getItem("Especies") || "")
  }
  if(localStorage.getItem('Animales')){
    arrayAnimales = JSON.parse(localStorage.getItem("Animales") || "")
  }
  if(localStorage.getItem('Comentarios')){
    arrayComentarios = JSON.parse(localStorage.getItem("Comentarios") || "")
  }
  if(localStorage.getItem('Respuestas')){
    arrayRespuestas = JSON.parse(localStorage.getItem("Respuestas") || "")
  }
}
function Ids(){
  let lastId = localStorage.getItem("idGeneral") || "-1";
  let newId = JSON.parse(lastId) + 1;
  localStorage.setItem("idGeneral", JSON.stringify(newId));
  return newId;
}
function formArea() {
  validarForm = enums.formArea
  form.innerHTML = ""
  let sectForm = document.getElementById("sectForm") as HTMLElement
  sectForm.className="sect-form"
  let titleForm = document.getElementById("titleForm") as HTMLElement
  titleForm.textContent= "Formulario Area"

  let divInputArea = document.createElement("div");
  divInputArea.className="form-floating mb-3";
  let nameArea = document.createElement("input") as HTMLInputElement
  nameArea.id="floatingInput"
  nameArea.className="form-control rounded-3"
  nameArea.placeholder="Area Name"
  nameArea.type="text"
  let labelArea = document.createElement("label") as HTMLLabelElement
  labelArea.textContent="Area Name";
  labelArea.setAttribute("for","floatingInput");
  let btnSubmit = document.createElement("button") as HTMLButtonElement
  btnSubmit.className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
  btnSubmit.textContent = "Submit"

  form.insertAdjacentElement("beforeend",divInputArea)
  divInputArea.insertAdjacentElement("beforeend",nameArea)
  divInputArea.insertAdjacentElement("beforeend",labelArea)
  form.insertAdjacentElement("beforeend",btnSubmit)
}
function selectArea() {
  let sectComment = document.getElementById("verComentarios") as HTMLElement;
  let listaAreas = document.getElementById("listaAreas") as HTMLElement;
  listaAreas.innerHTML = "";
  arrayAreas.forEach(element => {
      let listSpecie = document.createElement("li") as HTMLElement;
      listSpecie.className="btn-group dropend separadoBtn";
      let btnArea = document.createElement("button") as HTMLButtonElement;
      btnArea.className="btn btn-secondary NameSpecie";
      btnArea.textContent=element.name;
      btnArea.addEventListener("click",(e)=>{
          formSpecieArea(element.name)
          idObjPadre = element.Id;
      });
      let btnSpecies = document.createElement("button") as HTMLButtonElement;
      btnSpecies.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
      btnSpecies.addEventListener("click",(e)=>{
        listaSpecie(element.Id);
        sectComment.className="d-none";
      });
      let spanToggle = document.createElement("span") as HTMLSpanElement;
      spanToggle.className="visually-hidden";
      spanToggle.textContent="Toggle Dropend";

      listaAreas.insertAdjacentElement("beforeend",listSpecie);
      listSpecie.insertAdjacentElement("beforeend",btnArea);
      listSpecie.insertAdjacentElement("beforeend",btnSpecies);
      btnSpecies.insertAdjacentElement("beforeend",spanToggle);

  });
}
function formSpecieArea(nameArea:string) {
  validarForm = enums.formEspecie

  let sectSearch = document.getElementById("verBusqueda") as HTMLElement;
  sectSearch.className="d-none";
  let sectionEspe = document.getElementById("sectVerEspecies") as HTMLElement;
  sectionEspe.className="d-none";

  let sectForm = document.getElementById("sectForm") as HTMLElement;
  sectForm.className="sect-form";
  let titleForm = document.getElementById("titleForm") as HTMLElement;
  titleForm.textContent=`Create species for the ${nameArea} zone`;

  form.innerHTML="";
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
function listaSpecie(id:number) {
  let sectForm = document.getElementById("sectForm") as HTMLElement;
  sectForm.className="d-none";
  let section = document.getElementById("sectVerEspecies") as HTMLElement;
  section.className="sectVerEspecies"
  section.innerHTML="";
  let divContentSpecie = document.createElement("div") as HTMLDivElement;
  divContentSpecie.className="divSpecies containers-scroll borderDivScrool";
  let divContentAnimal = document.createElement("div") as HTMLDivElement;
  divContentAnimal.className="divAnimal containers-scroll borderDivScrool";
  let titleEspecie = document.createElement("h2") as HTMLElement;
  titleEspecie.textContent="Especies";
  titleEspecie.className="whiteColorTitles text-center";
  section.insertAdjacentElement("beforeend",divContentSpecie);
  section.insertAdjacentElement("beforeend",divContentAnimal);
  divContentSpecie.insertAdjacentElement("beforeend",titleEspecie);

  arrayEspecies.forEach(element => {
    if(id === element.idArea){
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
            formAnimal(element.name);
            idObjPadre = element.Id;
        });

        divContentSpecie.insertAdjacentElement("beforeend",divSpecie);
        divSpecie.insertAdjacentElement("beforeend",divNameSpecie);
        divSpecie.insertAdjacentElement("beforeend",btnAnimal);
        divSpecie.insertAdjacentElement("beforeend",btnVerAnimal);
        btnVerAnimal.insertAdjacentElement("beforeend",spanToggle);
    }
  });
}
function formAnimal(nameSpecie:string) {
  validarForm = enums.formAnimal
  let sectSearch = document.getElementById("verBusqueda") as HTMLElement;
  sectSearch.className="d-none";
  let sectRespComment = document.getElementById("verComentarios") as HTMLElement;
  sectRespComment.className="d-none";
  let sectForm = document.getElementById("sectForm") as HTMLElement;
  sectForm.className="sect-form";
  let titleForm = document.getElementById("titleForm") as HTMLElement;
  titleForm.textContent=`Create animals for the ${nameSpecie} species`
  form.innerHTML="";

  let divInputArea = document.createElement("div") as HTMLDivElement;
  divInputArea.className="form-floating mb-3";
  let inputArea = document.createElement("input") as HTMLInputElement
  inputArea.type="text";
  inputArea.className="form-control rounded-3";
  inputArea.id="floatingInput";
  inputArea.placeholder="Animal Name";
  let labelArea = document.createElement("label") as HTMLLabelElement;
  labelArea.textContent="Animal Name";
  labelArea.setAttribute("for","floatingInput");

  let btnSubmit = document.createElement("button") as HTMLButtonElement;
  btnSubmit.type="submit";
  btnSubmit.textContent="Submit";
  btnSubmit.className="w-100 mb-2 btn btn-lg rounded-3 btn-primary";

  form.insertAdjacentElement("beforeend",divInputArea);
  divInputArea.insertAdjacentElement("beforeend",inputArea);
  divInputArea.insertAdjacentElement("beforeend",labelArea);

  form.insertAdjacentElement("beforeend",btnSubmit);
}
function listaAnimales(id:number,divContentAnimal:HTMLDivElement) {
  let sectForm = document.getElementById("sectForm") as HTMLElement;
  sectForm.className="d-none";

  divContentAnimal.innerHTML="";
  let titleAnimales = document.createElement("h2") as HTMLElement;
  titleAnimales.textContent="Animales";
  titleAnimales.className="whiteColorTitles text-center";
  let sectComment = document.getElementById("verComentarios") as HTMLElement;
  divContentAnimal.insertAdjacentElement("beforeend",titleAnimales);

  arrayAnimales.forEach(element => {
      if(id === element.idEspecie){
          let divAnimal = document.createElement("div") as HTMLDivElement;
          divAnimal.className="btn-group dropend btnSpecies separadoBtn";
          let divNameAnimal = document.createElement("div") as HTMLDivElement;
          divNameAnimal.className="divNameSpecie btnSpecies";
          divNameAnimal.textContent=element.name;
          let btnVerComentario = document.createElement("button") as HTMLButtonElement;
          btnVerComentario.className="btn btn-secondary dropdown-toggle dropdown-toggle-split";
          btnVerComentario.addEventListener("click",(e)=>{
              sectForm.className="d-none";
              listaComment(element.Id);
          });
          let spanToggle = document.createElement("span") as HTMLSpanElement;
          spanToggle.className="visually-hidden";
          spanToggle.textContent="Toggle Dropend";
          let btnComentario = document.createElement("button") as HTMLButtonElement;
          btnComentario.className="btn btn-secondary dropdown-toggle-split";
          btnComentario.textContent="+";
          btnComentario.addEventListener("click",(e)=>{
              sectComment.className="d-none";
              formComment();
              idObjPadre = element.Id;
          });

          divContentAnimal.insertAdjacentElement("beforeend",divAnimal);
          divAnimal.insertAdjacentElement("beforeend",divNameAnimal);
          divAnimal.insertAdjacentElement("beforeend",btnComentario);
          divAnimal.insertAdjacentElement("beforeend",btnVerComentario);
          btnVerComentario.insertAdjacentElement("beforeend",spanToggle);
      }
  });
}
function formComment(){
  validarForm = enums.formComentario
  let sectSearch = document.getElementById("verBusqueda") as HTMLElement;
  sectSearch.className="d-none"
  let sectForm = document.getElementById("sectForm") as HTMLElement
  sectForm.className="sect-form";
  let titleForm = document.getElementById("titleForm") as HTMLElement;
  titleForm.textContent="Create Message"
  form.innerHTML="";

  let divInputName = document.createElement("div") as HTMLDivElement;
  divInputName.className="form-floating mb-3";
  let inputName = document.createElement("input") as HTMLInputElement
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

  form.insertAdjacentElement("beforeend",divInputName);
  divInputName.insertAdjacentElement("beforeend",inputName);
  divInputName.insertAdjacentElement("beforeend",labelName);

  form.insertAdjacentElement("beforeend",divInputMessage);
  divInputMessage.insertAdjacentElement("beforeend",inputMessage);
  divInputMessage.insertAdjacentElement("beforeend",labelMessage);

  form.insertAdjacentElement("beforeend",btnSubmit);
}
function listaComment(id:number) {
  let section = document.getElementById("verComentarios") as HTMLElement;
  section.className="verComentarios";
  section.innerHTML="";
  arrayComentarios.forEach(element => {
      if(id === element.idAnimal){
          let divContents = document.createElement("div");
          divContents.className="toast fade show";
          let divNameUser = document.createElement("div");
          divNameUser.className="toast-header";
          let iconMess = document.createElement("i");
          iconMess.className="fa-solid fa-message";
          let nameUser = document.createElement("strong");
          nameUser.className="me-auto";
          nameUser.textContent=element.nameUser;
          let horaFech = document.createElement("p");
          horaFech.textContent=element.fechaHora;

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
              idObjPadre = element.Id;
              formResponder(divForm,divRespComment);
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
          divNameUser.insertAdjacentElement("beforeend",horaFech);
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
function formResponder(divForm:HTMLDivElement,divRespComment:HTMLElement) {
  validarForm = enums.formRespuesta
  let sectSearch = document.getElementById("verBusqueda") as HTMLElement;
  sectSearch.className="d-none";
  divForm.innerHTML = "";
  divForm.className="divFormResp";
  divRespComment.className="d-none";
  let formulario = document.createElement("form");
  formulario.className="formRespuesta";
  formulario.addEventListener("submit",envio);
  let nameUser = document.createElement("input");
  nameUser.type="text";
  nameUser.id = `inputUser${idObjPadre}`
  nameUser.className="form-control form-control-sm nameUser";
  nameUser.placeholder="Nombre Usuario";
  let respuesta = document.createElement("textarea");
  respuesta.id = `inputResp${idObjPadre}`
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
function listaRespuestas(id:number,divRespComment:HTMLDivElement,divForm:HTMLDivElement) {
  divRespComment.innerHTML="";
  divRespComment.className="divVerRespuestas";
  divForm.className="d-none";
  arrayRespuestas.forEach(element => {
      if (id === element.idComentario) {
          divRespComment.innerHTML +=`
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
function signOut(){
  localStorage.removeItem("Areas");
  localStorage.removeItem("Especies");
  localStorage.removeItem("Animales");
  localStorage.removeItem("Comentarios");
  localStorage.removeItem("Respuestas");
  window.location.reload();
}
let form = document.getElementById("formulario") as HTMLFormElement
form.addEventListener("submit",envio)
function envio(e:Event) {
  e.preventDefault();
  if (validarForm === enums.formArea) {
    let inputName = document.getElementById("floatingInput") as HTMLInputElement
    let data:idName = {
      Id:Ids(),
      name: inputName.value
    }
    arrayAreas.push(data);
    localStorage.setItem("Areas", JSON.stringify(arrayAreas));
    selectArea()
    form.reset();
  }
  if (validarForm === enums.formEspecie) {
    let inputName = document.getElementById("floatingInput") as HTMLInputElement
    let data:idName&especies = {
      Id:Ids(),
      idArea : idObjPadre,
      name: inputName.value
    }
    arrayEspecies.push(data);
    localStorage.setItem("Especies", JSON.stringify(arrayEspecies));
    selectArea()
    form.reset();
  }
  if (validarForm === enums.formAnimal) {
    let inputName = document.getElementById("floatingInput") as HTMLInputElement
    let data:idName&animales = {
      Id:Ids(),
      idEspecie : idObjPadre,
      name: inputName.value
    }
    arrayAnimales.push(data);
    localStorage.setItem("Animales", JSON.stringify(arrayAnimales));
    selectArea()
    form.reset();
  }
  if (validarForm === enums.formComentario) {
    let inputComment = document.getElementById("floatingTextarea") as HTMLInputElement
    let inputNameUser = document.getElementById("floatingInput") as HTMLInputElement
    let date = new Date();
    let fecha = `Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} H24: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let data:idComRes&comentarios = {
      Id:Ids(),
      idAnimal : idObjPadre,
      comment: inputComment.value,
      nameUser : inputNameUser.value,
      fechaHora : fecha
    }
    arrayComentarios.push(data);
    localStorage.setItem("Comentarios", JSON.stringify(arrayComentarios));
    selectArea()
    form.reset();
  }
  if (validarForm === enums.formRespuesta) {
    let date = new Date();
    let fecha = `Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} H24: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let inputComment = document.getElementById(`inputResp${idObjPadre}`) as HTMLInputElement
    let inputNameUser = document.getElementById(`inputUser${idObjPadre}`) as HTMLInputElement
    console.log(`Resp: ${inputComment.value} - User:${inputNameUser.value}`);

    let data:idComRes&respuestas = {
      Id:Ids(),
      idComentario : idObjPadre,
      comment: inputComment.value,
      nameUser : inputNameUser.value,
      fechaHora : fecha
    }
    arrayRespuestas.push(data);
    localStorage.setItem("Respuestas", JSON.stringify(arrayRespuestas));
    selectArea()
    form.reset();
  }
}
document.addEventListener("DOMContentLoaded",eventsItems);
