let cardapio = [];
let pizzaParaAlterar = null;

// Mostra a seção e esconde as outras
function mostrarSecao(secao) {
  const secoes = ["cadastro", "consulta", "alterar", "pedido", "venda", "relatorio-vendas"];
  secoes.forEach(s => document.getElementById(s).classList.add("hidden"));
  document.getElementById(secao).classList.remove("hidden");
}

// Cadastro de Pizza
function adicionarPizza() {
  const nome = document.getElementById("nome").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const preco = parseFloat(document.getElementById("preco").value);

  if (nome && ingredientes && preco) {
    cardapio.push({ nome, ingredientes, preco });
    document.getElementById("nome").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("preco").value = "";
    atualizarLista();
    alert("Pizza adicionada com sucesso!");
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
}

// Consulta de Pizzas
function buscarPizza() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const resultados = cardapio.filter(p => p.nome.toLowerCase().includes(termo));
  atualizarLista(resultados);
}

// Prepara formulário para alterar pizza
function buscarPizzaParaAlterar() {
  const termo = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = cardapio.find(p => p.nome.toLowerCase().includes(termo));

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
    document.getElementById("novos-ingredientes").value = pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
  } else {
    document.getElementById("form-alterar").classList.add("hidden");
  }
}

// Alteração de Pizza
function alterarPizza() {
  if (pizzaParaAlterar) {
    const novoNome = document.getElementById("novo-nome").value;
    const novosIngredientes = document.getElementById("novos-ingredientes").value;
    const novoPreco = parseFloat(document.getElementById("novo-preco").value);

    if (novoNome && novosIngredientes && novoPreco) {
      pizzaParaAlterar.nome = novoNome;
      pizzaParaAlterar.ingredientes = novosIngredientes;
      pizzaParaAlterar.preco = novoPreco;

      atualizarLista();
      alert("Pizza alterada com sucesso!");
      document.getElementById("form-alterar").classList.add("hidden");
      document.getElementById("busca-alterar").value = "";
      pizzaParaAlterar = null;
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  } else {
    alert("Nenhuma pizza selecionada para alteração.");
  }
}

// Atualiza a tabela de consulta
function atualizarLista(lista = cardapio) {
  const tabela = document.getElementById("lista-pizzas");
  tabela.innerHTML = "";

  lista.forEach(p => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.ingredientes}</td>
      <td>R$${p.preco.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Registro de Vendas
let vendas = [];

function registrarVenda() {
  const nome = document.getElementById("venda-nome").value;
  const preco = parseFloat(document.getElementById("venda-preco").value);
  const cliente = document.getElementById("venda-cliente").value;

  if (nome && preco && cliente) {
    const listaVendas = document.getElementById("lista-vendas");
    const item = document.createElement("li");
    item.textContent = `Pizza: ${nome}, Preço: R$${preco.toFixed(2)}, Cliente: ${cliente}`;
    listaVendas.appendChild(item);

    vendas.push({ nome, preco, cliente });

    document.getElementById("venda-nome").value = "";
    document.getElementById("venda-preco").value = "";
    document.getElementById("venda-cliente").value = "";
  } else {
    alert("Por favor, preencha todos os campos corretamente!");
  }
}

// Gera Relatório de Vendas
function gerarRelatorioVendas() {
  if (vendas.length === 0) {
    alert("Nenhuma venda registrada.");
    return;
  }

  mostrarSecao("relatorio-vendas");

  const tabelaRel = document.getElementById("tabela-relatorio-vendas");
  tabelaRel.innerHTML = "";

  let total = 0;
  vendas.forEach(v => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${v.nome}</td>
      <td>R$${v.preco.toFixed(2)}</td>
      <td>${v.cliente}</td>
    `;
    tabelaRel.appendChild(linha);
    total += v.preco;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>R$${total.toFixed(2)}</strong></td>
    <td></td>
  `;
  tabelaRel.appendChild(linhaTotal);
}

// Inicializa exibindo a tela de cadastro
mostrarSecao("cadastro");
atualizarLista();
