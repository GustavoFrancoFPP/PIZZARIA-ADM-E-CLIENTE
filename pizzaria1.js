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

  const usuarioCorreto = "cliente";
  const senhaCorreta = "cliente";

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
    setTimeout(() => {
      window.location.href = "pizzaria1.html";
    }, 3000);
  } else {
    exibirMensagem("Usuário ou senha incorretos.", "erro");
  }
}

function fazerCadastro() {
    const usuario = document.getElementById("usuario").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;

    if (!usuario || !nome || !email || !telefone || !senha) {
        exibirMensagem("Por favor, preencha todos os campos.", "erro");
        return;
    }

    exibirMensagem("Cadastro realizado com sucesso!", "sucesso");
    setTimeout(() => {
        window.location.href = "localizaçao.html";
    }, 3000);
}

function inserirLocalização() {
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const cep = document.getElementById("cep").value;

    if (!rua || !numero || !bairro || !cidade || !cep) {
        exibirMensagem("Por favor, preencha todos os campos.", "erro");
        return;
    }
    if (cep> 99999999) {
      exibirMensagem("CEP inserido está incorreto, insira novamente");
      return;
    }

    exibirMensagem("Dados inseridos com sucesso!", "sucesso");
    setTimeout(() => {
        window.location.href = "pizzaria1.html";
    }, 3000);
}


let carrinho = [];

function mostrarSecao(secao) {
 const secoes = ["cardapio", "promocao", "acompanhamento", "carrinho", "pagamento", "consulta-pedido"];
  secoes.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  const selecionado = document.getElementById(secao);
  if (selecionado) selecionado.classList.remove("hidden");
}

function limparCarrinho() {
  if (carrinho.length === 0) {
    mostrarMensagem("O carrinho já está vazio!", "erro");
    return;
  }
  else {
    carrinho = [];
    atualizarCarrinho();
    mostrarMensagem("Carrinho limpo com sucesso!", "sucesso");
  }
}

function adicionarPizza() {
  const pizzaSelecionada = document.getElementById("pizza").value;
  carrinho.push(pizzaSelecionada);
  atualizarCarrinho();
  mostrarMensagem(`Pizza ${pizzaSelecionada} foi adicionada ao carrinho!`);
}

function adicionarAcompanhamento() {
  const acompanhamentoSelecionado = document.getElementById("select-acompanhamento").value;
  carrinho.push(acompanhamentoSelecionado);
  atualizarCarrinho();
  mostrarMensagem(`Acompanhamento ${acompanhamentoSelecionado} foi adicionado ao carrinho!`, "sucesso");
}

function confirmarPagamento() {
  const formas = document.getElementsByName("pagamento");
  let metodoSelecionado = "";

  formas.forEach((opcao) => {
    if (opcao.checked) {
      metodoSelecionado = opcao.value;
    }
  });

  const mensagem = document.getElementById("metodo-pagamento");

  if (metodoSelecionado) {
    mensagem.textContent = `Pagamento realizado com sucesso via ${metodoSelecionado}. Obrigado pelo seu pedido! Você vai ser notificado no seu e-mail e número de telefone com a localização de seu pedido! :)`;
    mostrarMensagem(`Pagamento confirmado via ${metodoSelecionado}!`);
    mostrarSecao("carrinho");
  } else {
    mostrarMensagem("Por favor, selecione uma forma de pagamento.");
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

function mostrarLogin() {
  setTimeout(() => {
            window.location.href = "login.html";
        }, 0);
}