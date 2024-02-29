const selecione = (element) => document.querySelector(element);
const selecioneTodos = (element) => document.querySelectorAll(element);

//Variáveis globais
let modalKeyPastel = 0;
let quantPastel = 1;
let cartPasteis = [];
let produtoSelecionadoPastel = null;

//Funções monetárias
const formatoRealPastel = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const formatoMonetarioPastel = (valor) => {
    if (valor) {
        return valor.toFixed(2);
    }
};

//Capturar chaves
const getKeyPastel = (e) => {
    const key = e.target.closest('.produto-item-pasteis').getAttribute('data-key');
    console.log('Pastel clicado: ' + key);
    
    produtoSelecionado = pastelJson[key];
    quantPastel = 1;
    modalKeyPastel = key;

    return key;
};

//Funções para calcular a quantidade
const pegarQuantidade = () => {
    selecione('.pastelInfo--qtmais').addEventListener('click', () => {
        quantPastel++;
        selecione('.pastelInfo--qt').textContent = quantPastel;
    });

    selecione('.pastelInfo--qtmenos').addEventListener('click', () => {
        if (quantPastel > 1) {
            quantPastel--;
            selecione('.pastelInfo--qt').textContent = quantPastel;
        }
    });
};

//Função do botão de fechar
const botaoFechar = () => {
    selecioneTodos('.pastelInfo--cancelButton, .pastelinfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal);
    });
};

//Funções para abrir o modal
const abrirModal = () => {
    const modal = selecione('.pastelWindowArea');
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1;

        if (produtoSelecionado) {
            fillModalData(produtoSelecionadoPastel);
        }
    }, 150);
};

//Funções para fechar o modal
const fecharModal = () => {
    const modal = selecione('.pastelWindowArea');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 150);
};

//Função de clique nos itens
const handlePastelClick = (e) => {
    e.preventDefault();

    const parent = e.target.parentElement;
    selecione('.pastelBig img').src = parent.querySelector('.produto-item-pastel-img').firstChild.src;

    const grandFather = e.target.parentElement.parentElement;
    selecione('.pastelInfo--nome').textContent = grandFather.querySelector('.produto-item-pastel-name').textContent;
    selecione('.pastelInfo--price').textContent = grandFather.querySelector('.produto-item-pastel-price').textContent;
    selecione('.pastelInfo--desc').textContent = grandFather.querySelector('.produto-item-pastel-desc').textContent;

    abrirModal();
};

//Função para adicionar os itens no carrinho
const adicionarAoCarrinho = () => {
    selecione('.pastelInfo--addButton').addEventListener('click', () => {
        const pricePastel = parseFloat(selecione('.pastelInfo--price').textContent.replace("R$", "").replace(",", "."));
        const size = selecione('.pastel-area').getAttribute('data-key');
        const identificador = size;
        const nomePastel = selecione('.pastelInfo--nome').textContent;

        // Armazenar imagem e nome do produto
        const imgPastel = selecione('.pastelBig img').getAttribute('src');
        const nomePastelCart = nomePastel;

        const cartItemIndex = cartPasteis.findIndex((item) => item.identificador === identificador);

        if (cartItemIndex > -1) {
            cartPasteis[cartItemIndex].qt = quantPastel;
        } else {
            const pastel = {
                identificador,
                id: size,
                name: nomePastelCart,
                img: imgPastel,
                qt: quantPastel,
                price: pricePastel
            };
            cart.push(pastel);

            // Adicionar novo item ao carrinho
            const cartItem = selecione('.models .cart-produtos').cloneNode(true);
            cartItem.querySelector('.cart-produto-name').innerHTML = nomePastelCart;
            cartItem.querySelector('img').src = imgPastel;
            cartItem.querySelector('.cart-produto-qt').innerHTML = quantPastel;

            cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cart[cartItemIndex].qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cart[cartItemIndex].qt > 1) {
                    cart[cartItemIndex].qt--;
                } else {
                    cart.splice(cartItemIndex, 1);
                    cartItem.remove();
                }
                atualizarCarrinho();
            });
            selecione('.cart').append(cartItem);
        }
        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    });
};

//Função para atualizar o carrinho
const atualizarCarrinho = () => {
    selecione('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        selecione('aside').classList.add('show');
        selecione('.cart').innerHTML = '';

        let subtotal = 0;

        for (let i = 0; i < cart.length; i++) {
            subtotal += cart[i].price * cart[i].qt;

            const cartItem = selecione('.models .cart-produtos').cloneNode(true);
            selecione('.cart').appendChild(cartItem);

            cartItem.querySelector('img').src = cart[i].img;
            cartItem.querySelector('.cart-produto-name').innerHTML = cart[i].name;
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
                    cartItem.remove();
                    i--;
                    atualizarCarrinho();
                }
                atualizarCarrinho();
            });
        }
        const total = subtotal;
        selecione('.cart--totalitem.subtotal span:last-child').innerHTML = formatoRealPastel(subtotal);
        selecione('.cart--totalitem.total span:last-child').innerHTML = formatoRealPastel(total);
    } else {
        selecione('aside').classList.remove('show');
        selecione('aside').style.left = '100vw';
    }
};

//Função para completar a compra
const completarCompra = () => {
    selecione('.cart--finalizar').addEventListener('click', () => {
        cart = [];
        selecione('.menu-openner span').innerHTML = 0;
        selecione('aside').classList.remove('show');
        selecione('aside').style.left = '100vw';
        selecione('header').style.display = 'flex';
        atualizarCarrinho();
    });
};

//Função para abrir o carrinho
const abrirCarrinho = () => {
    if (cart.length > 0) {
        selecione('aside').classList.add('show');
        selecione('header').style.display = 'flex';
    }

    selecione('.menu-openner').addEventListener('click', () => {
        selecione('aside').classList.add('show');
        selecione('aside').style.left = '0';
    });
};

//Função para fechar o carrinho
const fecharCarrinho = () => {
    selecione('.menu-closer').addEventListener('click', () => {
        selecione('aside').style.left = '100vw';
        selecione('header').style.display = 'flex';
    });
};

//Iniciar todos os códigos
const iniciar = () => {
    const produtoItemPastel = selecioneTodos(".pastel-area .produtos-item-pasteis");
    produtoItemPastel.forEach((produtoItemPastel) => {
        produtoItemPastel.addEventListener('click', handlePastelClick);
    });

    botaoFechar();
    pegarQuantidade();
    adicionarAoCarrinho();
    abrirCarrinho();
    fecharCarrinho();
    completarCompra();
};

iniciar();
