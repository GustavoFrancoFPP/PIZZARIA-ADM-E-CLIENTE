let carrinho = [];

function mostrarSecao(secao) {
  const secoes = ["cardapio", "promocao", "acompanhar", "carrinho", "pagamento"];
  secoes.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  const selecionado = document.getElementById(secao);
  if (selecionado) selecionado.classList.remove("hidden");
}

function adicionarPizza() {
  const pizzaSelecionada = document.getElementById("pizza").value;
  carrinho.push(pizzaSelecionada);
  atualizarCarrinho();
  mostrarMensagem(`Pizza ${pizzaSelecionada} foi adicionada ao carrinho!`);
}

function marcarAcompanhamento(checkbox) {
  if (checkbox.checked) {
    carrinho.push(checkbox.value);
  } else {
    carrinho = carrinho.filter(item => item !== checkbox.value);
  }
  atualizarCarrinho();
}

function adicionarAcompanhamento() {
    const acompanhamentoSelecionado = document.getElementById("acompanhamento").value;
    carrinho.push(acompanhamentoSelecionado);
    atualizarCarrinho();
    mostrarMensagem(`Acompanhamento ${acompanhamentoSelecionado} foi adicionado ao carrinho!`);
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
    mensagem.textContent = `Pagamento realizado com sucesso via ${metodoSelecionado}. Obrigado pelo seu pedido!`;
    alert(`Pagamento confirmado via ${metodoSelecionado}!`);
    mostrarSecao("carrinho");
  } else {
    alert("Por favor, selecione uma forma de pagamento.");
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

function mostrarMensagem(mensagem) {
  const mensagemBox = document.createElement("div");
  mensagemBox.textContent = mensagem;
  mensagemBox.style.backgroundColor = "#d4a300";
  mensagemBox.style.padding = "10px";
  mensagemBox.style.borderRadius = "5px";
  mensagemBox.style.color = "#fff";
  mensagemBox.style.marginTop = "10px";
  document.body.appendChild(mensagemBox);

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    mensagemBox.remove();
  }, 3000);
}
