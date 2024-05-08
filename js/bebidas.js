const selecioneB = (element) => document.querySelector(element);
const selecioneBAll = (elements) => document.querySelectorAll(elements);

// Variáveis globais
let modalKeyBebida = 0;
let quantBebida = 1;
let cartBebida = [];
let produtoSelecionadoBebida = null;

// Funções monetárias
function formatoRealBebida(valor) {
    return valor.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
}

function formatoMonetarioBebida(valor) {
    return valor ? valor.toFixed(2) : '';
}

// Capturar keys
function capturarKeyBebida(e) {
    const key = e.target.closest('.produto-item-bebidas').getAttribute('data-key');
    console.log('Bebida clicada: ' + key);

    produtoSelecionadoBebida = bebidaJson[key];
    quantBebida = 1;
    modalKeyBebida = key;

    return key;
}

// Função para calcular a quantidade
function alterarQuantidadeBebida(valor) {
    quantBebida += valor;
    selecioneB('.bebidaInfo--qt').textContent = quantBebida;
}

// Função para abrir o modal
function abrirModalBebida() {
    const modal = selecioneB('.bebidaWindowArea');
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1;

        if (produtoSelecionadoBebida) {
            fillModalData(produtoSelecionadoBebida);
        }
    }, 150);
}

// Função para fechar o modal
function fecharModalBebida() {
    const modal = selecioneB('.bebidaWindowArea');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 150);
}

// Função do botão de fechar
function botaoFecharBebida() {
    selecioneBAll('.bebidaInfo--cancelButton, .bebidaInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModalBebida);
    });
}

// Função de clique nos itens
function handleClickBebida(e) {
    e.preventDefault();

    const parent = e.target.parentElement;
    selecioneB('.bebidaBig img').src = parent.querySelector('.produto-item-bebida-img').src;

    const grandParentB = e.target.parentElement.parentElement;
    selecioneB('.bebidaInfo--nome').textContent = grandParentB.querySelector('.produto-item-bebida-name').textContent;
    selecioneB('.bebidaInfo--price').textContent = grandParentB.querySelector('.produto-item-bebida-price').textContent;
    selecioneB('.bebidaInfo--desc').textContent = grandParentB.querySelector('.produto-item-bebida-desc').textContent;

    abrirModalBebida();
}

// Função para adicionar os itens no carrinho
function adicionarAoCarrinhoBebida() {
    selecioneB('.bebidaInfo--addButton').addEventListener('click', () => {
        const priceBebida = parseFloat(selecioneB('.bebidaInfo--price').textContent.replace("R$", "").replace(".", "."));
        const sizeB = selecioneB('.bebida-area').getAttribute('data-key');
        const identifierB = sizeB;
        const nomeBebida = selecioneB('.bebidaInfo--nome').textContent;

        // Armazenar imagem e nome dos produtos
        const imgBebida = selecioneB('.bebidaBig img').getAttribute('src');
        const nomeBebidaCart = nomeBebida;

        const cartItemIndexBebida = cartBebida.findIndex((item) => item.identifierB === identifierB);

        if (cartItemIndexBebida > -1) {
            cartBebida[cartItemIndexBebida].qt += quantBebida; // Ajuste aqui para adicionar à quantidade existente
        } else {
            const bebida = {
                identifierB,
                id: sizeB,
                name: nomeBebidaCart,
                img: imgBebida,
                qt: quantBebida,
                price: priceBebida
            };
            cartBebida.push(bebida);
        }

        fecharModalBebida();
        abrirCarrinhoBebida();
        atualizarCarrinhoBebida();
    });
}

// Funções para atualizar o carrinho
function atualizarCarrinhoBebida() {
    selecioneB('.menu-openner span').innerHTML = cartBebida.length;

    if (cartBebida.length > 0) {
        selecioneB('aside').classList.add('show');
        selecioneB('.cart').innerHTML = '';

        let subtotal = 0;

        for (let i = 0; i < cartBebida.length; i++) {
            subtotal += cartBebida[i].qt;

            const cartItemUpdateIndexB = selecioneB('.models .cart-produtos').cloneNode(true);
            selecioneB('.cart').appendChild(cartItemUpdateIndexB);

            cartItemUpdateIndexB.querySelector('img').src = cartBebida[i].img;
            cartItemUpdateIndexB.querySelector('.cart-produto-name').innerHTML = cartBebida[i].name;
            cartItemUpdateIndexB.querySelector('.cart-produto-qt').innerHTML = cartBebida[i].qt;

            // Ajuste aqui para adicionar evento de clique nos botões de mais e menos
            (function(index) {
                cartItemUpdateIndexB.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                    cartBebida[index].qt++;
                    atualizarCarrinhoBebida();
                });

                cartItemUpdateIndexB.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                    if (cartBebida[index].qt > 1) {
                        cartBebida[index].qt--;
                    } else {
                        cartBebida.splice(index, 1);
                        cartItemUpdateIndexB.remove();
                    }
                    atualizarCarrinhoBebida();
                });
            })(i);
        }

        const total = subtotal;
        selecioneB('.cart--totalitem.subtotal span:last-child').innerHTML = formatoMonetario(subtotal);
        selecioneB('.cart--totalitem.total span:last-child').innerHTML = formatoMonetario(total);
    } else {
        selecioneB('aside').classList.remove('show');
        selecioneB('aside').style.left = '100vw';
    }
}

// Funções para completar as compras
function finalizarCompraBebida() {
    selecioneB('.cart--finalizar').addEventListener('click', () => {
        cartBebida = [];
        selecioneB('.menu-openner span').innerHTML = 0;
        selecioneB('aside').classList.remove('show');
        selecioneB('aside').style.left = '100vw';
        selecioneB('header').style.display = 'flex';
        atualizarCarrinhoBebida();
    });
}

// Função para abrir o carrinho
function abrirCarrinhoBebida() {
    if (cartBebida.length > 0) {
        selecioneB('aside').classList.add('show');
        selecioneB('header').style.display = 'flex';
    }

    selecioneB('.menu-openner').addEventListener('click', () => {
        selecioneB('aside').classList.add('show');
        selecioneB('aside').style.left = '0';
    });
}

// Função para fechar o carrinho
function fecharCarrinhoBebida() {
    selecioneB('.menu-closer').addEventListener('click', () => {
        selecioneB('aside').style.left = '100vw';
        selecioneB('header').style.display = 'flex';
    });
}

// Função para iniciar todos os códigos
function iniciarBebida() {
    const produtoItemBebida = selecioneBAll('.bebida-area .produtos-item-bebidas');
    produtoItemBebida.forEach((produtoItemBebida) => {
        produtoItemBebida.addEventListener('click', handleClickBebida);
    });

    botaoFecharBebida();
    adicionarAoCarrinhoBebida();
    abrirCarrinhoBebida();
    fecharCarrinhoBebida();
    finalizarCompraBebida();
}

iniciarBebida();
