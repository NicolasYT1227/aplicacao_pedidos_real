// Funções de seleção
const selecione = (elemento) => document.querySelector(elemento);
const selecioneTodos = (elemento) => document.querySelectorAll(elemento);

// Variáveis globais
let modalKey = 0;
let quantSalgados = 1;
let cart = [];
let produtoSelecionado = null;

// Funções utilitárias
const valorReal = (valor) => valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

const pegarKey = (e) => {
  let key = e.target.closest('.produtos-item-pasteis1').getAttribute('data-key');
  console.log("Salgado Clicado " + key);

  // Use os dados do salgadoJson com base na chave e armazene-os em produtoSelecionado
  produtoSelecionado = foodJson[key];

  quantSalgados = 1;
  modalKey = key;

  return key;
};

const mudarQuant = () => {
  selecione('.salgadoInfo--qtmais').addEventListener("click", () => {
    quantSalgados++;
    selecione(".salgadoInfo--qt").innerHTML = quantSalgados;
  });

  selecione('.salgadoInfo--qtmenos').addEventListener('click', () => {
    if (quantSalgados > 1) {
      quantSalgados--;
      selecione(".salgadoInfo--qt").innerHTML = quantSalgados;
    }
  });
};

const botaoFechar = () => {
  selecioneTodos(".salgadoInfo--cancelButton, .salgadoInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", fecharModal);
  });
};

// Função para abrir a modal
const abrirModal = () => {
  const modal = selecione(".salgadoWindowArea");
  modal.style.opacity = 0;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = 1;

    // Preencha os dados da modal somente quando ela for aberta
    if (produtoSelecionado) {
      preencheDadosModal(produtoSelecionado);
    }
  }, 150);
};

// Função para fechar a modal
const fecharModal = () => {
  const modal = selecione(".salgadoWindowArea");
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
};

// Função para lidar com o clique em um salgado
const handleSalgadoClick = (e) => {
  e.preventDefault();

  abrirModal();
};

// Função para adicionar um salgado ao carrinho
const adicionarAoCarrinho = () => {
  selecione(".salgadoInfo--addButton").addEventListener("click", () => {
    const priceSalgado = parseFloat(selecione(".salgadoInfo--actualPrice").innerHTML.replace('R$ ', ''));
    const size = selecione(".salgadosInfo--tipo").getAttribute('data-key');
    const identificador = size;
    const keyCart = cart.findIndex((item) => item.identificador === identificador);

    if (keyCart > -1) {
      cart[keyCart].qt += quantSalgados;
    } else {
      const salgado = {
        identificador,
        id: size,
        qt: quantSalgados,
        nomeSalgado: salgadoJson[modalKey].nome, // Nome do salgado
        imgSalgado: salgadoJson[modalKey].img,   // URL da imagem do salgado
        priceSalgado: salgadoJson[modalKey].price, // Preço do salgado
        descriptionSalgado: salgadoJson[modalKey].description, // Descrição do salgado
        tipoSalgado: salgadoJson[modalKey].tipo
      };
      cart.push(salgado);
    }

    fecharModal();
    abrirCarrinho();
    atualizarCarrinho();
    finalizarCompra();
  });
};

// Função para atualizar o carrinho
const atualizarCarrinho = () => {
  // Exibir o número de itens no carrinho
  selecione('.menu-openner span').innerHTML = cart.length;

  // Mostrar ou ocultar o carrinho
  if (cart.length > 0) {
    selecione('aside').classList.add('show');
    selecione('.cart').innerHTML = '';

    let subtotal = 0;

    for (let i in cart) {
      // Alterado para usar cart[i].id para encontrar o salgado
      const salgadoItem = foodJson.find((item) => item.id == cart[i].id); 

      subtotal += cart[i].priceSalgado * cart[i].qt;

      const cartItem = selecione('.models .cart-produtos').cloneNode(true);
      selecione('.cart').append(cartItem);

      const salgadoSizeName = cart[i].tipoSalgado;
      const salgadoName = `${salgadoItem.nomeSalgado} (${salgadoSizeName})`; // Corrigido para usar nomeSalgado

      cartItem.querySelector('img').src = salgadoItem.imgSalgado;
      cartItem.querySelector('.cart-produto-name').innerHTML = salgadoName;
      cartItem.querySelector('.cart-produto-qt').innerHTML = cart[i].qt;

      cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
        cart[i].qt++;
        atualizarCarrinho();
      });

      cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
        if (cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
        }
        if (cart.length < 1) {
          selecione('header').style.display = 'flex';
        }
        atualizarCarrinho();
      });

      selecione('.cart').append(cartItem);
    }

    const total = subtotal;
    selecione('.subtotal span:last-child').innerHTML = valorReal(subtotal);
    selecione('.total span:last-child').innerHTML = valorReal(total);
  } else {
    selecione('aside').classList.remove('show');
    selecione('aside').style.left = '100vw';
  }
};

// Função para finalizar a compra
const finalizarCompra = () => {
  selecione('.cart--finalizar').addEventListener('click', () => {
    cart = [];
    selecione(".menu-openner span").innerHTML = 0;
    selecione('aside').classList.remove('show');
    selecione('aside').style.left = '100vw';
    selecione('header').style.display = 'flex';
    atualizarCarrinho();
  });
};

// Função para abrir o carrinho
const abrirCarrinho = () => {
  if (cart.length > 0) {
    selecione('aside').classList.add('show');
    selecione('header').style.display = 'flex';
  }

  selecione(".menu-openner").addEventListener('click', () => {
    selecione('aside').classList.add('show');
    selecione('aside').style.left = '0';
  });
};

// Função para fechar o carrinho
const fecharCarrinho = () => {
  selecione(".menu-closer").addEventListener('click', () => {
    selecione('aside').style.left = '100vw';
    selecione('header').style.display = 'flex';
  });
};

// Função para preencher dados da modal (você deve implementar isso)
const preencheDadosModal = (salgadoJson) => {
  selecione(".salgadoInfo--nome").textContent = salgadoJson.nome;
  selecione(".salgadoInfo--price").textContent = valorReal(salgadoJson.price);
  selecione(".salgadoInfo--desc").textContent = salgadoJson.description;
  selecione(".salgadoInfo--img").src = salgadoJson.img;
  
  // Abra a modal após preencher os dados
  abrirModal();
};


// Função principal para inicializar tudo
const iniciar = () => {
  // Selecione os elementos e adicione os ouvintes de eventos aqui
  const produtosItems = selecioneTodos(".salgado-area .salgado-area-produto1");
  produtosItems.forEach((produtoItem) => {
    produtoItem.addEventListener("click", handleSalgadoClick);
  });

  botaoFechar();
  mudarQuant();
  adicionarAoCarrinho();
  abrirCarrinho();
  fecharCarrinho();
  finalizarCompra();
};

iniciar();