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

    const  usuarioCorreto = "cliente";
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

let carrinho = [];

function mostrarSecao(secao) {
  const secoes = ["cardapio", "promocao", "acompanhar", "carrinho",
     "pagamento", "consulta-pedido"];
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

}

function consultarPedido() {
  mostrarSecao("consulta-pedido");

  const listaResumo = document.getElementById("resumo-pedido");
  const pagamentoResumo = document.getElementById("resumo-pagamento");

  listaResumo.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    listaResumo.innerHTML = "<li>Nenhum item no carrinho.</li>";
  } else {
    carrinho.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listaResumo.appendChild(li);

      // Extrair o valor do item (ex: "Pizza - R$59,90")
      const match = item.match(/R\$ ?(\d+,\d{2})/);
      if (match && match[1]) {
        const preco = parseFloat(match[1].replace(",", "."));
        total += preco;
      }
    });
  }

  // Forma de pagamento selecionada
  const formas = document.getElementsByName("pagamento");
  let metodoSelecionado = "";

  formas.forEach((opcao) => {
    if (opcao.checked) {
      metodoSelecionado = opcao.value;
    }
  });

  // Atualiza a exibição da forma de pagamento + total
  pagamentoResumo.innerHTML = `
    ${metodoSelecionado ? `Forma de pagamento: ${metodoSelecionado}<br>` : ""}
    <strong>Total do pedido: R$ ${total.toFixed(2).replace(".", ",")}</strong>
  `;
}
