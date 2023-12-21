let valoresInputs = [];
let idInputs = 0;
let inSelection = false;
let isClear = false;
let addToSelect = false;
let inputsSelecionados = [];
let objectOfSetOfInput = {}


//localStorage.clear()

function checkSave() {
  idInputs = Number(localStorage.getItem("totalDeIdInputs"));
  objectOfSetOfInput = localStorage.getItem("objectOfInputs") ?? {}; 
  if (typeof objectOfSetOfInput === 'string' && objectOfSetOfInput !== '[object Object]') {
    try {
      objectOfSetOfInput = JSON.parse(objectOfSetOfInput);
    } catch (error) {
      console.error('Erro ao fazer o parse do JSON:', error);
      objectOfSetOfInput = null;
    }
  } else {
    objectOfSetOfInput = null;
  }

  if (!objectOfSetOfInput || Object.keys(objectOfSetOfInput).length === 0) {
    idInputs = 0;
    objectOfSetOfInput = {};
  } else {
    let copiaDeIdInputs = idInputs;
    idInputs = 0;
    for (let condiçãoFor = 0; condiçãoFor <= (copiaDeIdInputs -1); condiçãoFor++) {
      let ticker = objectOfSetOfInput[`id${idInputs}`]["ticker"];
      let dataPG = objectOfSetOfInput[`id${idInputs}`]["dataPG"];
      let dataC = objectOfSetOfInput[`id${idInputs}`]["dataC"];
      let quantidade = objectOfSetOfInput[`id${idInputs}`]["quantidade"];
      let valor = objectOfSetOfInput[`id${idInputs}`]["valor"];
      let total = objectOfSetOfInput[`id${idInputs}`]["total"];

      if (ticker == null) {
      } else {
        incrementarInputs();
        document.getElementById(`Ticker${idInputs - 1}`).value = ticker;
        document.getElementById(`dataPG${idInputs - 1}`).value = dataPG;
        document.getElementById(`dataC${idInputs - 1}`).value = dataC;
        document.getElementById(`Valor${idInputs - 1}`).value = valor;
      }
    }
  }
  if (idInputs === 0) {
    buttonStartSelectionRemove.style.display = "none";
  } else {
    buttonStartSelectionRemove.style.display = "block";
    buttonStartSelectionRemove.addEventListener(
      "click",
      openSeletionOfRemoveInputs
    );
  }
}

function selectToRemove(lineId, Clear = false) {
  if (Clear) {
    let allLines = document.querySelectorAll(".divInputs");
    allLines.forEach((line) => line.classList.toggle("selected"));
    return;
  }
  if (!inSelection) {
    return;
  }
  let lineSelected = document.getElementById(`divInputs${lineId}`);
  lineSelected.classList.toggle("selected");
}

function removeInputsSelected() {
  let divDeDivsComInputs = document.getElementById("divDeDivsComInputs");
  let divInputs = divDeDivsComInputs.querySelectorAll(".selected");
  if (!divInputs) {
    return;
  }
  if (divInputs.length === idInputs) {
    let confirmação;
    confirmação = confirm(
      "Você tem certeza que quer limpar todos os seus dados?"
    );
    if (!confirmação) {
      return;
    }
    divDeDivsComInputs.innerHTML = "";
    buttonStartSelectionRemove.style.display = "none";
    buttonConfirm.style.display = "none";
    buttonCancel.style.display = "none";
    buttonSelectAllInputs.style.display = "none";
    ButtonPlus.style.display = "block";
    buttonCalcular.style.display = "block";
    buttonConfirm.removeEventListener("click", removeInputsSelected);
    buttonSelectAllInputs.removeEventListener("click", letSelectToRemove);
    buttonCancel.removeEventListener("click", functionButtonCancel);
    inSelection = false;
    return;
  } else {
    buttonStartSelectionRemove.style.display = "block";
    buttonConfirm.style.display = "none";
    buttonCancel.style.display = "none";
    buttonSelectAllInputs.style.display = "none";
    ButtonPlus.style.display = "block";
    buttonCalcular.style.display = "block";
    buttonConfirm.removeEventListener("click", removeInputsSelected);
    buttonSelectAllInputs.removeEventListener("click", letSelectToRemove);
    buttonCancel.removeEventListener("click", functionButtonCancel);

    inSelection = false;
  }
}

//

//

//

//

//

let inputsRemovidos = 0;

function removerInputsSelecionados() {
  let container = document.getElementById("divDeDivsComInputs");
  let divInputsSelecionadas = Array.from(
    container.querySelectorAll(".selected")
  );

  if (divInputsSelecionadas.length === idInputs) {
    let confirmação;
    confirmação = confirm(
      "Você tem certeza que quer limpar todos os seus dados?"
    );
    if (!confirmação) {
      return;
    }
  }

  let inputsRemovidos = 0;
  const filhosDoConteiner = Array.from(container.children);

  divInputsSelecionadas.forEach((input, index) => {
    container.removeChild(input);

    const id = filhosDoConteiner.indexOf(input);

    //

    let keysSelected = [];
    for (let key in objectOfSetOfInput) {
      if (objectOfSetOfInput[key].id === id) {
        keysSelected.push(key);
      }
    }

    keysSelected.forEach((key) => delete objectOfSetOfInput[key]);
    keysSelected = [];
    // Reorganizando as chaves
    let newObject = {};
    let newId = 0;
    for (let key in objectOfSetOfInput) {
      let ob = objectOfSetOfInput[key];
      ob.id = newId;
      newObject[`id${newId}`] = ob;
      newId++;
    }

    objectOfSetOfInput = newObject;

    //
    objectOfSetOfInput = JSON.stringify(objectOfSetOfInput)
    localStorage.setItem("objectOfInputs", objectOfSetOfInput);

    inputsRemovidos++;

    for (let i = index; i < divInputsSelecionadas.length; i++) {
      let novoId = `linha${i + 1}`;
      divInputsSelecionadas[i].id = novoId;

      divInputsSelecionadas[i]
        .querySelectorAll(".text")
        .forEach((inputElement) => {
          let inputName = inputElement.getAttribute("name");
          inputElement.id = `${inputName}${i + 1}`;
        });

      divInputsSelecionadas[i].classList.remove("selecionado");
    }
  });

  idInputs = idInputs - inputsRemovidos;
  localStorage.setItem("totalDeIdInputs", idInputs);

  if (idInputs === 0) {
    buttonStartSelectionRemove.style.display = "none";
  } else {
    buttonStartSelectionRemove.style.display = "block";
  }
  buttonConfirm.style.display = "none";
  buttonCancel.style.display = "none";
  buttonSelectAllInputs.style.display = "none";
  ButtonPlus.style.display = "block";
  buttonCalcular.style.display = "block";
  buttonConfirm.removeEventListener("click", removeInputsSelected);
  buttonSelectAllInputs.removeEventListener("click", letSelectToRemove);
  buttonCancel.removeEventListener("click", functionButtonCancel);
  inSelection = false;
  if (inputsRemovidos > 0) {
    aplicarEstiloCinza();
  }
}

//

//

//

//

//

function calcularTotalDeCadaId() {
  let idDeCadaInput = 0;
  for (let condiçãoFor = 1; condiçãoFor <= idInputs; condiçãoFor++) {
    calcularTotal(idDeCadaInput, condiçãoFor, "password");
    idDeCadaInput++;
  }
}

function calcularTotal(idDeCadaInput, linhaPorId, event) {
  if (event === "password") {
    let TickerT = document.getElementById(`Ticker${idDeCadaInput}`);
    let TickerV = document.getElementById(`Ticker${idDeCadaInput}`).value;
    const dataPGV = document.getElementById(`dataPG${idDeCadaInput}`).value;
    const dataPGT = document.getElementById(`dataPG${idDeCadaInput}`);
    const dataCV = document.getElementById(`dataC${idDeCadaInput}`).value;
    const dataCT = document.getElementById(`dataC${idDeCadaInput}`);
    let quantidadeV = parseFloat(
      document.getElementById(`quantidade${idDeCadaInput}`).value
    );
    let quantidadeT = document.getElementById(`quantidade${idDeCadaInput}`);
    let ValorV = parseFloat(
      document.getElementById(`Valor${idDeCadaInput}`).value
    );
    let ValorT = document.getElementById(`Valor${idDeCadaInput}`);
    let Total = document.getElementById(`Total${idDeCadaInput}`);
    if (TickerV === "" || TickerV.length < 5 || TickerV.length > 6) {
      alert(
        `Preencha os dados da caluna do Ticker da linha: ${linhaPorId} corretamente`
      );
      TickerT.focus();
      return;
    }
    if (dataPGV === "" || dataPGV.length < 5) {
      alert(
        `Preencha os dados da coluna da data de pagamento da linha: ${linhaPorId} corretamente`
      );
      dataPGT.focus();
      return;
    }
    if (dataCV.length < 5 || dataCV === "") {
      alert(
        `Preencha os dados da coluna da data Com da linha: ${linhaPorId} corretamente`
      );
      dataCT.focus();
      return;
    }
    if (isNaN(quantidadeV) || quantidadeV <= 0) {
      alert(
        `Preencha os dados da coluna da quantidade da linha: ${linhaPorId} corretamente`
      );
      quantidadeT.focus();
      return;
    }

    if (isNaN(ValorV) || ValorV <= 0) {
      alert(
        `Preencha os dados da coluna do Valor pago por quantidade da linha: ${linhaPorId} corretamente`
      );
      ValorT.focus();
      return;
    }
    const total = quantidadeV * ValorV;
    if (!(TickerV === TickerV.toUpperCase(TickerV))) {
      TickerT.value = `${TickerV.toUpperCase(TickerV)}`;
      TickerV = TickerV.toUpperCase(TickerV);
    }

    Total.value = `R$${total}`;

    const setOfInputs = {
      id: idDeCadaInput,
      ticker: TickerV,
      dataPG: dataPGV,
      dataC: dataCV,
      valor: ValorV,
      quantidade: quantidadeV,
      total: total,
    };

    console.log(setOfInputs);
    objectOfSetOfInput[`id${idDeCadaInput}`] = setOfInputs;
    objectOfSetOfInput = JSON.stringify(objectOfSetOfInput);
    console.log(objectOfSetOfInput);

    localStorage.setItem("totalDeIdInputs", idDeCadaInput);
    localStorage.setItem("objectOfInputs", objectOfSetOfInput);

    objectOfSetOfInput = JSON.parse(objectOfSetOfInput);
  }
  if (event.key === "Enter") {
    event.preventDefault();
    let TickerT = document.getElementById(`Ticker${idDeCadaInput}`);
    let TickerV = document.getElementById(`Ticker${idDeCadaInput}`).value;
    const dataPGV = document.getElementById(`dataPG${idDeCadaInput}`).value;
    const dataPGT = document.getElementById(`dataPG${idDeCadaInput}`);
    const dataCV = document.getElementById(`dataC${idDeCadaInput}`).value;
    const dataCT = document.getElementById(`dataC${idDeCadaInput}`);
    let quantidadeV = parseFloat(
      document.getElementById(`quantidade${idDeCadaInput}`).value
    );
    let quantidadeT = document.getElementById(`quantidade${idDeCadaInput}`);
    let ValorV = parseFloat(
      document.getElementById(`Valor${idDeCadaInput}`).value
    );
    let ValorT = document.getElementById(`Valor${idDeCadaInput}`);
    let Total = document.getElementById(`Total${idDeCadaInput}`);
    if (TickerV === "" || TickerV.length < 5 || TickerV.length > 6) {
      alert(
        `Preencha os dados da caluna do Ticker da linha: ${linhaPorId} corretamente`
      );
      TickerT.focus();
      return;
    }
    if (dataPGV === "" || dataPGV.length < 5) {
      alert(
        `Preencha os dados da coluna da data de pagamento da linha: ${linhaPorId} corretamente`
      );
      dataPGT.focus();
      return;
    }
    if (dataCV.length < 5 || dataCV === "") {
      alert(
        `Preencha os dados da coluna da data Com da linha: ${linhaPorId} corretamente`
      );
      dataCT.focus();
      return;
    }
    if (isNaN(quantidadeV) || quantidadeV <= 0) {
      alert(
        `Preencha os dados da coluna da quantidade da linha: ${linhaPorId} corretamente`
      );
      quantidadeT.focus();
      return;
    }

    if (isNaN(ValorV) || ValorV <= 0) {
      alert(
        `Preencha os dados da coluna do Valor pago por quantidade da linha: ${linhaPorId} corretamente`
      );
      ValorT.focus();
      return;
    }
    let total = (quantidadeV * ValorV).toFixed(2);
    total = parseFloat(total);
    if (!(TickerV === TickerV.toUpperCase(TickerV))) {
      TickerT.value = `${TickerV.toUpperCase(TickerV)}`;
      TickerV = TickerV.toUpperCase(TickerV);
    }

    Total.value = `R$${total}`;

    const setOfInputs = {
      id: idDeCadaInput,
      ticker: TickerV,
      dataPG: dataPGV,
      dataC: dataCV,
      valor: ValorV,
      quantidade: quantidadeV,
      total: total,
    };
    console.log(setOfInputs);

    objectOfSetOfInput[`id${idDeCadaInput}`] = setOfInputs;
    objectOfSetOfInput = JSON.stringify(objectOfSetOfInput);

    console.log(objectOfSetOfInput);

    localStorage.setItem("totalDeIdInputs", idDeCadaInput);
    localStorage.setItem("objectOfInputs", objectOfSetOfInput);

    objectOfSetOfInput = JSON.parse(objectOfSetOfInput);
  }
}

function salvarValores() {
  const inputs = document.querySelectorAll(".texts");
  valoresInputs = Array.from(inputs).map((input) => input.value || "");
}

function restaurarValores() {
  const inputs = document.querySelectorAll(".texts");
  Array.from(inputs).forEach((input, index) => {
    input.value = valoresInputs[index] || "";
  });
}

function incrementarInputs() {
  salvarValores();
  const inputs = `
    <div id="divInputs${idInputs}" class="divInputs">
      <input type="text" class="texts Ticker linha${idInputs}" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" onkeydown="moveToNextInput(event, 'dataPG${idInputs}')" onclick="selectToRemove(${idInputs})">
      <input type="text" class="texts datas linha${idInputs}" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" onkeydown="moveToNextInput(event, 'dataC${idInputs}')" onclick="selectToRemove(${idInputs})">
      <input type="text" class="texts datas linha${idInputs}" name="dataC" id="dataC${idInputs}" placeholder="DataC" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')" onclick="selectToRemove(${idInputs})">
      <input type="text" class="texts quantidade linha${idInputs}" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" onkeydown="moveToNextInput(event, 'Valor${idInputs}')" onclick="selectToRemove(${idInputs})">
      <input type="text" class="texts Valor linha${idInputs}" name="Valor" id="Valor${idInputs}" placeholder="Valor" onkeydown="calcularTotal('${idInputs}', '${
    idInputs + 1
  }', event)" onclick="selectToRemove(${idInputs})">
      <input type="text" class="texts Total linha${idInputs}" name="Total" id="Total${idInputs}" placeholder="Total" onclick="selectToRemove(${idInputs})" readonly><br>
     </div
  `;

  document.getElementById("divDeDivsComInputs").innerHTML += inputs;
  restaurarValores();
  idInputs = idInputs + 1;
  aplicarEstiloCinza();
  if (idInputs === 0 || inSelection) {
    buttonStartSelectionRemove.style.display = "none";
    buttonStartSelectionRemove.removeEventListener(
      "click",
      openSeletionOfRemoveInputs
    );
  } else {
    buttonStartSelectionRemove.style.display = "block";
    buttonStartSelectionRemove.addEventListener(
      "click",
      openSeletionOfRemoveInputs
    );
  }
  return;
}

function openSeletionOfRemoveInputs() {
  inSelection = true;
  buttonStartSelectionRemove.style.display = "none";
  buttonConfirm.style.display = "block";
  buttonCancel.style.display = "block";
  buttonSelectAllInputs.style.display = "block";
  ButtonPlus.style.display = "none";
  buttonCalcular.style.display = "none";
  buttonSelectAllInputs.addEventListener("click", letSelectToRemove);
  buttonConfirm.addEventListener("click", removerInputsSelecionados);
  buttonCancel.addEventListener("click", functionButtonCancel);
}

function moveToNextInput(event, nextInputId) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que a tecla Enter envie um formulário (comportamento padrão)
    document.getElementById(nextInputId).focus();
  }
}

function mostrarDropdown() {
  let listaEscolas = document.getElementById("listaEscolas");
  let title = document.getElementById("title");
  const valorH1 = title.textContent;
  let styleAaron = document.getElementById("Aaron");
  let styleMichel = document.getElementById("Michel");
  let styleMatthieu = document.getElementById("Matthieu");
  let styleMonique = document.getElementById("Monique");
  if (valorH1 === "Aaron") {
    styleAaron.style.display = "none";
    styleMichel.style.display = "block";
    styleMatthieu.style.display = "block";
    styleMonique.style.display = "block";
  } else if (valorH1 === "Michel") {
    styleAaron.style.display = "block";
    styleMichel.style.display = "none";
    styleMatthieu.style.display = "block";
    styleMonique.style.display = "block";
  } else if (valorH1 === "Matthieu") {
    styleAaron.style.display = "block";
    styleMichel.style.display = "block";
    styleMatthieu.style.display = "none";
    styleMonique.style.display = "block";
  } else if (valorH1 === "Monique") {
    styleAaron.style.display = "block";
    styleMichel.style.display = "block";
    styleMatthieu.style.display = "block";
    styleMonique.style.display = "none";
  }
  if (
    listaEscolas.style.display === "none" ||
    listaEscolas.style.display === ""
  ) {
    listaEscolas.style.display = "block";
    title.style.borderRadius = "15px 15px 0px 0px";
    // Ajusta a posição da lista abaixo do cabeçalho
    listaEscolas.style.top = title.offsetTop + title.offsetHeight + "px";
    // Adiciona um ouvinte de eventos para fechar a lista quando clicar fora dela
    document.addEventListener("click", fecharDropdown);
  } else {
    title.style.borderRadius = "15px 15px 15px 15px";
    listaEscolas.style.display = "none";
    // Remove o ouvinte de eventos para fechar a lista
    document.removeEventListener("click", fecharDropdown);
  }
}

function selecionarEscola(nome) {
  title.innerHTML = nome;
  if (idInputs !== 0) {
    for (let condiçãoFor = 0; condiçãoFor <= idInputs - 1; condiçãoFor++) {
      let quantidadeT = document.getElementById(`quantidade${condiçãoFor}`);
      let TotalT = document.getElementById(`Total${condiçãoFor}`);
      quantidadeT.value = "";
      TotalT.value = "";
    }
  }
  title.style.borderRadius = "15px 15px 15px 15px";
  listaEscolas.style.display = "none";
  document.removeEventListener("click", fecharDropdown);
}

function fecharDropdown(event) {
  var listaEscolas = document.getElementById("listaEscolas");
  var title = document.getElementById("title");

  // Verifica se o clique ocorreu fora do cabeçalho e da lista
  if (!event.target.matches("#title") && !event.target.matches(".itemEscola")) {
    title.style.borderRadius = "15px 15px 15px 15px";
    listaEscolas.style.display = "none";
    // Remove o ouvinte de eventos para fechar a lista
    document.removeEventListener("click", fecharDropdown);
  }
}

let startY;
document.addEventListener("touchstart", function (event) {
  startY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function (event) {
  if (startY === undefined) {
    return;
  }

  let deltaY = event.touches[0].clientY - startY;

  // Adapte esse valor conforme necessário para a sensibilidade da rolagem
  let sensitivity = 2.5;

  window.scrollBy(0, deltaY * sensitivity);

  // Reseta a posição inicial
  startY = undefined;
});

let buttonCalcular = document.getElementById(`cal`);
buttonCalcular.addEventListener("click", calcularTotalDeCadaId);

const ButtonPlus = document.getElementById("ButtonPlus");
ButtonPlus.addEventListener("click", incrementarInputs);

document.addEventListener("wheel", function (event) {
  window.scrollBy(0, event.deltaY);
});

let buttonStartSelectionRemove = document.getElementById(
  "buttonStartSelectionRemove"
);
let buttonConfirm = document.getElementById("buttonConfirmation");
let buttonCancel = document.getElementById("buttonCancel");
let buttonSelectAllInputs = document.getElementById("buttonSelectAllInputs");

let letSelectToRemove = () => selectToRemove(0, true);

let functionButtonCancel = function () {
  buttonStartSelectionRemove.style.display = "block";
  buttonConfirm.style.display = "none";
  buttonCancel.style.display = "none";
  buttonSelectAllInputs.style.display = "none";
  ButtonPlus.style.display = "block";
  buttonCalcular.style.display = "block";
  const divDeDivsComInputs = document.getElementById("divDeDivsComInputs");
  let divInputs = divDeDivsComInputs.querySelectorAll(".selected");
  if (!(divInputs.length === 0))
    divInputs.forEach((line) => {
      line.classList.remove("selected");
    });
  inSelection = false;
  buttonConfirm.removeEventListener("click", removeInputsSelected);
  buttonSelectAllInputs.removeEventListener("click", letSelectToRemove);
  buttonCancel.removeEventListener("click", functionButtonCancel);

  return;
};

checkSave();

function aplicarEstiloCinza() {
  let container = document.getElementById("divDeDivsComInputs");

  if (!container) {
    console.error("Contêiner não encontrado.");
    return;
  }

  let divInputs = container.querySelectorAll(".divInputs");

  divInputs.forEach((input, index) => {
    if ((index + 1) % 2 === 0) {
      input.classList.add("linhaCinza");
    } else {
      input.classList.remove("linhaCinza");
    }
  });
}

aplicarEstiloCinza();
