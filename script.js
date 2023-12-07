let valoresInputs = [];
let idInputs = 0;
function entrarNoCal() {
  if (idInputs === 0) {
    return;
  }
  buttonCalcular.style.background = "#e5e5e5";
}
function sairDoCal() {
  if (idInputs === 0) {
    return;
  }
  buttonCalcular.style.background = "white";
}
function entrarNoPlus() {
  ButtonPlus.style.background = "#e5e5e5";
  // document.getElementById('+').style.background = "#e5e5e5";
}
function sairDoPlus() {
  ButtonPlus.style.background = "white";
  // document.getElementById('+').style.background = "white";
}
function entrarNoDecrement() {
  if (idInputs === 0) {
    return;
  }
  ButtonDecrement.style.background = "#e5e5e5";
}
function sairDoDecrement() {
  ButtonDecrement.style.background = "white";
}

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
    const total = quantidadeV * ValorV;
    if (!(TickerV === TickerV.toUpperCase(TickerV))) {
      TickerT.value = `${TickerV.toUpperCase(TickerV)}`;
    }

    Total.value = `R$${total}`;
  }
}

function salvarValores() {
  const inputs = document.querySelectorAll('.texts');
  valoresInputs = Array.from(inputs).map(input => input.value || '');
}

function restaurarValores() {
  const inputs = document.querySelectorAll('.texts');
  Array.from(inputs).forEach((input, index) => {
    input.value = valoresInputs[index] || '';
  });
}

function incrementarInputs() {
  if (idInputs + 1 === 26) {
    alert("limite atingido");
    alert("Não é recomendado ultrapassar este limite");
    confirmaçãoDeUltrapassarLimiteDeInputs = confirm(
      `Se você quiser ultrapassar o limite então confirme`
    );
    if (!confirmaçãoDeUltrapassarLimiteDeInputs) {
      return;
    }
  }
  salvarValores();
  if (idInputs === 0) {
    const inputs = `
    <input type="text" class="texts Ticker" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" onkeydown="moveToNextInput(event, 'dataPG${idInputs}')">
    <input type="text" class="texts numbers" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
    <input type="text" class="texts numbers" name="dataC" id="dataC${idInputs}" placeholder="DataC" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
    <input type="text" class="texts numbers" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" onkeydown="moveToNextInput(event, 'Valor${idInputs}')">
    <input type="text" class="texts numbers" name="Valor" id="Valor${idInputs}" placeholder="Valor" onkeydown="calcularTotal('${idInputs}', '${
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
    <input type="text" class="texts Ticker" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'Ticker${idInputs}')">
    <input type="text" class="texts numbers" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
    <input type="text" class="texts numbers" name="dataC" id="dataC${idInputs}" placeholder="DataC" style="background: rgb(206, 206, 206);" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
    <input type="text" class="texts numbers" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" style="background: rgb(206, 206, 206);" onkeydown="calcularTotal('${idInputs}', '${
      idInputs + 1
    }', event)">
    <input type="text" class="texts numbers" name="Valor" id="Valor${idInputs}" placeholder="Valor" style="background: rgb(206, 206, 206);">
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
      <input type="text" class="texts Ticker" name="Ticker" id="Ticker${idInputs}" placeholder="Ticker" onkeydown="moveToNextInput(event, 'Ticker${idInputs}')">
      <input type="text" class="texts numbers" name="dataPG" id="dataPG${idInputs}" placeholder="DataPG" onkeydown="moveToNextInput(event, 'dataC${idInputs}')">
      <input type="text" class="texts numbers" name="dataC" id="dataC${idInputs}" placeholder="DataC" onkeydown="moveToNextInput(event, 'quantidade${idInputs}')">
      <input type="text" class="texts numbers" name="quantidade" id="quantidade${idInputs}" placeholder="Quant" onkeydown="moveToNextInput(event, 'Valor${idInputs}')">
      <input type="text" class="texts numbers" name="Valor" id="Valor${idInputs}" placeholder="Valor" onkeydown="calcularTotal('${idInputs}', '${
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
  const copiaDeIdInputs = idInputs - 1;
  idInputs = 0;
  document.getElementById("divDeSectionsComInputs").innerHTML = "";
  for (let condiçãoFor = 1; condiçãoFor <= copiaDeIdInputs; condiçãoFor++) {
    incrementarInputs(idInputs);
  }
  restaurarValores();
  if (idInputs === 0) {
  }
}

function moveToNextInput(event, nextInputId) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que a tecla Enter envie um formulário (comportamento padrão)
    document.getElementById(nextInputId).focus();
  }
}


let buttonCalcular = document.getElementById(`cal`);
buttonCalcular.addEventListener("mouseenter", entrarNoCal);
buttonCalcular.addEventListener("mouseout", sairDoCal);
buttonCalcular.addEventListener("click", calcularTotalDeCadaId);

let confirmaçãoDeUltrapassarLimiteDeInputs = false;
const ButtonPlus = document.getElementById("ButtonPlus");
ButtonPlus.addEventListener("mouseenter", entrarNoPlus);
ButtonPlus.addEventListener("mouseout", sairDoPlus);
ButtonPlus.addEventListener("click", incrementarInputs);

const ButtonDecrement = document.getElementById("ButtonDecrement");
ButtonDecrement.addEventListener("mouseenter", entrarNoDecrement);
ButtonDecrement.addEventListener("mouseout", sairDoDecrement);
ButtonDecrement.addEventListener("click", decrementarInputs);

document.addEventListener("wheel", function (event) {
  window.scrollBy(0, event.deltaY);
});
