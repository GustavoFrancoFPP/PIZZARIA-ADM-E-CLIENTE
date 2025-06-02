function exibirMensagem(texto, tipo) {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.classList.remove("hidden");

  setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 5000);
}

function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarioCorreto = "admin";
  const senhaCorreta = "12345";

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      window.location.href = "pizzaria.html";
    }, 3000);
  } else {
    exibirMensagem("Usuário ou senha incorretos.", "erro");
  }
}

let cardapio = [];
let pizzaSelecionadaParaAlteracao = null;

// Mostra a seção e esconde as outras
function mostrarSecao(secaoId) {
  const todasAsSecoes = ["cadastro", "consulta", "alterar", "pedido", "venda", "relatorio-vendas"];
  todasAsSecoes.forEach(secao => document.getElementById(secao).classList.add("hidden"));
  document.getElementById(secaoId).classList.remove("hidden");
}

// Cadastro de Pizza
function adicionarPizza() {
  const nomePizza = document.getElementById("nome").value;
  const ingredientesPizza = document.getElementById("ingredientes").value;
  const precoPizza = parseFloat(document.getElementById("preco").value);

  if (nomePizza && ingredientesPizza && precoPizza) {
    cardapio.push({ nome: nomePizza, ingredientes: ingredientesPizza, preco: precoPizza });
    document.getElementById("nome").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("preco").value = "";
    atualizarListaDePizzas();
    exibirMensagem("Pizza adicionada com sucesso!");
  } else {
    exibirMensagem("Por favor, preencha todos os campos corretamente.");
  }
}

// Consulta de Pizzas
function buscarPizza() {
  const termoBusca = document.getElementById("busca").value.toLowerCase();
  const pizzasEncontradas = cardapio.filter(pizza => pizza.nome.toLowerCase().includes(termoBusca));
  atualizarListaDePizzas(pizzasEncontradas);
}

// Prepara formulário para alterar pizza
function buscarPizzaParaAlterar() {
  const termoBuscaAlteracao = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaSelecionadaParaAlteracao = cardapio.find(pizza => pizza.nome.toLowerCase().includes(termoBuscaAlteracao));

  if (pizzaSelecionadaParaAlteracao) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaSelecionadaParaAlteracao.nome;
    document.getElementById("novos-ingredientes").value = pizzaSelecionadaParaAlteracao.ingredientes;
    document.getElementById("novo-preco").value = pizzaSelecionadaParaAlteracao.preco;
  } else {
    document.getElementById("form-alterar").classList.add("hidden");
  }
}

// Alteração de Pizza
function alterarPizza() {
  if (pizzaSelecionadaParaAlteracao) {
    const novoNome = document.getElementById("novo-nome").value;
    const novosIngredientes = document.getElementById("novos-ingredientes").value;
    const novoPreco = parseFloat(document.getElementById("novo-preco").value);

    if (novoNome && novosIngredientes && novoPreco) {
      pizzaSelecionadaParaAlteracao.nome = novoNome;
      pizzaSelecionadaParaAlteracao.ingredientes = novosIngredientes;
      pizzaSelecionadaParaAlteracao.preco = novoPreco;

      atualizarListaDePizzas();
      exibirMensagem("Pizza alterada com sucesso!");
      document.getElementById("form-alterar").classList.add("hidden");
      document.getElementById("busca-alterar").value = "";
      pizzaSelecionadaParaAlteracao = null;
    } else {
      exibirMensagem("Por favor, preencha todos os campos corretamente.");
    }
  } else {
    exibirMensagem("Nenhuma pizza selecionada para alteração.");
  }
}

// Atualiza a tabela de consulta
function atualizarListaDePizzas(listaAtualizada = cardapio) {
  const tabela = document.getElementById("lista-pizzas");
  tabela.innerHTML = "";

  listaAtualizada.forEach(pizza => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pizza.nome}</td>
      <td>${pizza.ingredientes}</td>
      <td>R$${pizza.preco.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Relatório de Vendas
let vendas = [];

function registrarVenda() {
  const nomePizzaVendida = document.getElementById("venda-nome").value;
  const precoVenda = parseFloat(document.getElementById("venda-preco").value);
  const nomeCliente = document.getElementById("venda-cliente").value;

  if (nomePizzaVendida && precoVenda && nomeCliente) {
    const listaVendas = document.getElementById("lista-vendas");
    const item = document.createElement("li");
    item.textContent = `Pizza: ${nomePizzaVendida}, Preço: R$${precoVenda.toFixed(2)}, Cliente: ${nomeCliente}`;
    listaVendas.appendChild(item);

    vendas.push({ nome: nomePizzaVendida, preco: precoVenda, cliente: nomeCliente });

    document.getElementById("venda-nome").value = "";
    document.getElementById("venda-preco").value = "";
    document.getElementById("venda-cliente").value = "";
  } else {
    exibirMensagem("Por favor, preencha todos os campos corretamente!");
  }
}

function mostrarMensagem(texto, tipo) {
  const mensagemFlutuante = document.createElement('div');
  mensagemFlutuante.classList.add('mensagem', tipo);
  mensagemFlutuante.textContent = texto;

  document.body.appendChild(mensagemFlutuante);
  window.getComputedStyle(mensagemFlutuante).opacity;
  setTimeout(() => {
    mensagemFlutuante.style.opacity = '0';
  }, 4000);
  setTimeout(() => {
    mensagemFlutuante.remove();
  }, 4500);
}

function gerarRelatorioVendas() {
  if (vendas.length === 0) {
    exibirMensagem("Nenhuma venda registrada.");
    return;
  }

  mostrarSecao("relatorio-vendas");

  const tabelaRelatorio = document.getElementById("tabela-relatorio-vendas");
  tabelaRelatorio.innerHTML = "";

  let totalVendas = 0;
  vendas.forEach(venda => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${venda.nome}</td>
      <td>R$${venda.preco.toFixed(2)}</td>
      <td>${venda.cliente}</td>
    `;
    tabelaRelatorio.appendChild(linha);
    totalVendas += venda.preco;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>R$${totalVendas.toFixed(2)}</strong></td>
    <td></td>
  `;
  tabelaRelatorio.appendChild(linhaTotal);
}

// Inicializa exibindo a tela de cadastro
mostrarSecao("cadastro");
atualizarListaDePizzas();
