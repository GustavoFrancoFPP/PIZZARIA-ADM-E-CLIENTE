// Exibe mensagens de sucesso ou erro
function exibirMensagem(texto, tipo) {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.classList.remove("hidden");

  setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 3000);
}

// Valida o login com usuário e senha
function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarioCorreto = "admin";
  const senhaCorreta = "admin";
    const codigoCorreto = "1234";


  if (usuario === usuarioCorreto && senha === senhaCorreta && codigoCorreto === "1234") {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      window.location.href = "pizzaria.html";
    }, 1000);
  } else {
    exibirMensagem("Usuário ou senha incorretos.", "erro");
  }
}

// Variáveis principais
let cardapio = [];
let pizzaParaAlterar = null;
let vendas = [];

// Mostra uma seção e esconde as outras
function mostrarSecao(secao) {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("consulta").classList.add("hidden");
  document.getElementById("alterar").classList.add("hidden");
  document.getElementById("pedido").classList.add("hidden");
  document.getElementById("venda").classList.add("hidden");
  document.getElementById("relatorio-vendas").classList.add("hidden");

  document.getElementById(secao).classList.remove("hidden");
}

// Adiciona pizza ao cardápio
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
    exibirMensagem("Pizza adicionada com sucesso!", "sucesso");
  } else {
    exibirMensagem("Preencha todos os campos corretamente.", "erro");
  }
}

// Busca pizza por nome para consulta
function buscarPizza() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const resultados = cardapio.filter((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );

  atualizarLista(resultados);
}

// Busca pizza para alteração
function buscarPizzaParaAlterar() {
  const busca = document.getElementById("busca-alterar").value.toLowerCase();
  pizzaParaAlterar = cardapio.find((pizza) =>
    pizza.nome.toLowerCase().includes(busca)
  );

  if (pizzaParaAlterar) {
    document.getElementById("form-alterar").classList.remove("hidden");
    document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
    document.getElementById("novos-ingredientes").value = pizzaParaAlterar.ingredientes;
    document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
    exibirMensagem("Pizza encontrada. Pronta para alteração!", "sucesso");
  } else {
    document.getElementById("form-alterar").classList.add("hidden");
    exibirMensagem("Pizza não encontrada.", "erro");
  }
}

// Altera dados da pizza
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
      exibirMensagem("Pizza alterada com sucesso!", "sucesso");
      document.getElementById("form-alterar").classList.add("hidden");
      document.getElementById("busca-alterar").value = "";
      pizzaParaAlterar = null;
    } else {
      exibirMensagem("Preencha todos os campos corretamente.", "erro");
    }
  } else {
    exibirMensagem("Nenhuma pizza selecionada para alteração.", "erro");
  }
}

// Atualiza a lista de pizzas (consulta e alteração)
function atualizarLista(lista = cardapio) {
  const tabela = document.getElementById("lista-pizzas");
  tabela.innerHTML = "";

  lista.forEach((pizza) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pizza.nome}</td>
      <td>${pizza.ingredientes}</td>
      <td>R$ ${pizza.preco.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Realiza pedido e registra venda
function realizarPedido() {
  const nome = document.getElementById("venda-nome").value;
  const quantidadeTexto = document.getElementById("venda-quantidade").value;
  const comprador = document.getElementById("venda-comprador").value;

  if (nome === "" || quantidadeTexto === "" || comprador === "") {
    exibirMensagem("Preencha todos os campos.", "erro");
    return;
  }

  const quantidade = parseInt(quantidadeTexto);
  if (quantidade <= 0) {
    exibirMensagem("Quantidade inválida.", "erro");
    return;
  }

  const pizzaEncontrada = cardapio.find(
    (pizza) => pizza.nome.toLowerCase() === nome.toLowerCase()
  );

  if (!pizzaEncontrada) {
    exibirMensagem("Pizza não encontrada.", "erro");
    return;
  }

  const total = pizzaEncontrada.preco * quantidade;
  vendas.push({
    nome: pizzaEncontrada.nome,
    quantidade,
    comprador,
    total,
  });

  exibirMensagem("Venda registrada com sucesso!", "sucesso");

  document.getElementById("venda-nome").value = "";
  document.getElementById("venda-quantidade").value = "";
  document.getElementById("venda-comprador").value = "";

  gerarRelatorioVendas();
}

// Gera relatório de vendas
function gerarRelatorioVendas() {
  const tabela = document.getElementById("tabela-relatorio-vendas");
  tabela.innerHTML = "";

  if (vendas.length === 0) {
    exibirMensagem("Nenhuma venda registrada.", "erro");
    return;
  }

  let totalGeral = 0;

  vendas.forEach((venda) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${venda.nome}</td>
      <td>${venda.quantidade}</td>
      <td>${venda.comprador}</td>
      <td>R$ ${venda.total.toFixed(2)}</td>
    `;
    tabela.appendChild(linha);
    totalGeral += venda.total;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.innerHTML = `
    <td><strong>Total</strong></td>
    <td></td>
    <td></td>
    <td><strong>R$ ${totalGeral.toFixed(2)}</strong></td>
  `;
  tabela.appendChild(linhaTotal);
}

// Inicialização
mostrarSecao("cadastro");
atualizarLista();