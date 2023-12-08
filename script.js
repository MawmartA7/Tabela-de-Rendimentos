let valoresInputs = [];
let idInputs = 0;

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
    }

    Total.value = `R$${total}`;
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
    }

    Total.value = `R$${total}`;
  }
}

function salvarValores() {
  if(recuperando){
    const inputs = document.querySelectorAll(".Restaurar");
    valoresInputs = Array.from(inputs).map((input) => input.value || "");
  return
  }else{
    const inputs = document.querySelectorAll(".texts");
    valoresInputs = Array.from(inputs).map((input) => input.value || "");
  }
}

function restaurarValores() {
  if(recuperando){
    let inputsR = document.querySelectorAll(".Restaurar");
    Array.from(inputsR).forEach((input, index) => {
    input.value = valoresInputs[index] || "";
    return
  });
  }else{
    const inputs = document.querySelectorAll(".texts");
    Array.from(inputs).forEach((input, index) => {
     input.value = valoresInputs[index] || "";
    });
  }
}

function incrementarInputs() {
  if(recuperando === false){
    salvarValores();
  }
    
  if (idInputs === 0) {
    const inputs = `
    <input type="text" class="texts Ticker Restaurar" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" onkeydown="moveToNextInput(event, 'dataPG${idInputs}')">
    <input type="text" class="texts datas Restaurar" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
    <input type="text" class="texts datas Restaurar" name="dataC" id="dataC${idInputs}" placeholder="DataC" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
    <input type="text" class="texts quantidade" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" onkeydown="moveToNextInput(event, 'Valor${idInputs}')">
    <input type="text" class="texts Valor Restaurar" name="Valor" id="Valor${idInputs}" placeholder="Valor" onkeydown="calcularTotal('${idInputs}', '${
      idInputs + 1
    }', event)">
    <input type="text" class="texts Total" name="Total" id="Total${idInputs}" placeholder="Total" readonly><br>
    `;

    document.getElementById("divDeSectionsComInputs").innerHTML += inputs;
    restaurarValores();
    idInputs = idInputs + 1;
    return;
  }
  if (idInputs % 2 != 0) {
    const inputs = `
    <input type="text" class="texts Ticker Restaurar" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'Ticker${idInputs}')">
    <input type="text" class="texts datas Restaurar" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
    <input type="text" class="texts datas Restaurar" name="dataC" id="dataC${idInputs}" placeholder="DataC" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
    <input type="text" class="texts quantidade" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" style="background: rgb(206, 206, 206);" onkeydown="calcularTotal('${idInputs}', '${
      idInputs + 1
    }', event)">
    <input type="text" class="texts Valor Restaurar" name="Valor" id="Valor${idInputs}" placeholder="Valor" style="background: rgb(206, 206, 206);">
    <input type="text" class="texts Total" name="Total" id="Total${idInputs}" placeholder="Total" style="background: rgb(206, 206, 206);" readonly><br>
    `;

    document.getElementById("divDeSectionsComInputs").innerHTML += inputs;
    restaurarValores();
    idInputs = idInputs + 1;
    return;
  }
  if (idInputs % 2 === 0) {
    const inputs = `
      <section id="section${idInputs}">
      <input type="text" class="texts Ticker Restaurar" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" onkeydown="moveToNextInput(event, 'Ticker${idInputs}')">
      <input type="text" class="texts datas Restaurar" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
      <input type="text" class="texts datas Restaurar" name="dataC" id="dataC${idInputs}" placeholder="DataC" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
      <input type="text" class="texts quantidade" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" onkeydown="moveToNextInput(event, 'Valor${idInputs}')">
      <input type="text" class="texts Valor Restaurar" name="Valor" id="Valor${idInputs}" placeholder="Valor" onkeydown="calcularTotal('${idInputs}', '${
      idInputs + 1
    }', event)">
      <input type="text" class="texts Total" name="Total" id="Total${idInputs}" placeholder="Total" readonly><br>
      </section>
      `;

    document.getElementById("divDeSectionsComInputs").innerHTML += inputs;
    restaurarValores();
    idInputs = idInputs + 1;
    return;
  } else {
    alert(`Ocorreu um erro ao tentar adicionar a linha: ${idInputs}`);
    console.error(`Ocorreu um erro ao tentar adicionar a linha: ${idInputs}`);
    return;
  }
}

function decrementarInputs() {
  decrementando = true
  const copiaDeIdInputs = idInputs - 1;
  idInputs = 0;
  document.getElementById("divDeSectionsComInputs").innerHTML = "";
  for (let condiçãoFor = 1; condiçãoFor <= copiaDeIdInputs; condiçãoFor++) {
    incrementarInputs(idInputs);
  }
  decrementando = false
  restaurarValores();
}

function moveToNextInput(event, nextInputId) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que a tecla Enter envie um formulário (comportamento padrão)
    document.getElementById(nextInputId).focus();
  }
}

// function recuperarInputsDeOutraPagina() {  a tentar
//     const copiaDeIdInputs = idInputs ;
//     idInputs = 0;
//     recuperando = true
//     for (let condiçãoFor = 1; condiçãoFor <= copiaDeIdInputs; condiçãoFor++) {
//       incrementarInputs(idInputs);
//     }
//     restaurarValores();
//     recuperando = false
// }

function mostrarDropdown() {
  var listaEscolas = document.getElementById("listaEscolas");
  var title = document.getElementById("title");

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

function selecionarEscola(urlDaPagina) {
  recuperarInputsDeOutraPagina()
  // window.location.href = `${urlDaPagina}.html`; a terminar

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

let recuperando = false

let buttonCalcular = document.getElementById(`cal`);
buttonCalcular.addEventListener("click", calcularTotalDeCadaId);

const ButtonPlus = document.getElementById("ButtonPlus");
ButtonPlus.addEventListener("click", incrementarInputs);

const ButtonDecrement = document.getElementById("ButtonDecrement");
let decrementando = false
ButtonDecrement.addEventListener("click", decrementarInputs);

document.addEventListener("wheel", function (event) {
  window.scrollBy(0, event.deltaY);
});
