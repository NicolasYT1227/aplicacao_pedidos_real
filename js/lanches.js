const selecioneL = (element) => document.querySelector(element);
const selecioneLAll = (element) => document.querySelectorAll(element);

// variáveis globais
let modalKeyL = 0;
let quantLanches = 1;
let cartL = [];
let produtoSelecionadoL = null;

// funções monetárias
const formatoRealL = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatoMonetarioL = (valor) => {
    if (valor) {
        return valor.toFixed(2);
    }
};

// função para capturar as keys
const getKeyL = (e) => {
    const keyL = e.target.closest('.produtos-item-lanches').getAttribute('data-key');
    console.log('Lanche clicado' + keyL);

    produtoSelecionadoL = foodJson[keyL];
    quantLanches = 1;
    modalKeyL = keyL;

    return keyL;
};

// função para pegar quantidade dos itens
const changeQuantityL = () => {
    selecioneL('.lancheInfo--qtmais').addEventListener('click', () => {
        quantLanches++;
        selecioneL('.lancheInfo--qt').innerHTML = quantLanches;
    });

    selecioneL('.lancheInfo--qtmenos').addEventListener('click', () => {
        if (quantLanches > 1) {
            quantLanches--;
            selecioneL('.lancheInfo--qt').innerHTML = quantLanches;
        }
    });
};

// função para fechar
const closeButtonL = () => {
    selecioneLAll('.lancheInfo--cancelButton, .lancheInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', closeModalL);
    });
};

// função para clicar no item
const handleItemClickLanche = (e) => {
    e.preventDefault();

    const parent = e.target.parentElement;
    selecioneL('.lancheBig').getElementsByTagName('img')[0].src = parent.querySelector('.produto-item-lanche-img').firstChild.src;

    const parentMother = e.target.parentElement.parentElement;
    selecioneL('.lancheInfo--nome').textContent = parentMother.querySelector('.produto-item-lanche-name').textContent;
    selecioneL('.lancheInfo--price').textContent = parentMother.querySelector('.produto-item-lanche-price').textContent;
    selecioneL('.lancheInfo--desc').textContent = parentMother.querySelector('.produto-item-lanche-desc').textContent;

    abrirModalL();
};

// função para abrir modal
const abrirModalL = () => {
    const modal = selecioneL('.lancheWindowArea');
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1;

        if (produtoSelecionadoL) {
            fillModalData(produtoSelecionadoL);
        }
    }, 150);
};

// função para fechar o modal
const closeModalL = () => {
    const modal = selecioneL('.lancheWindowArea');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
};

// função para adicionar ao carrinho
const addToCartL = () => {
    selecioneL('.lancheInfo--addButton').addEventListener('click', () => {
        const priceLanche = parseFloat(selecioneL('.lancheInfo--price').textContent.replace("R$", "").replace(",", "."));
        const sizeL = selecioneL('.lanche-area').getAttribute('data-key');
        const identifierL = sizeL;
        const nomeLanches = selecioneL('.lancheInfo--nome').textContent;

        // Armazenar imagem e nome do produto
        const imgLanche = selecioneL('.lancheBig img').getAttribute('src');
        const nomeLanche = nomeLanches;

        const cartIndex = cartL.findIndex((item) => item.identifierL === identifierL);

        if (cartIndex > -1) {
            cartL[cartIndex].qt += quantLanches;
        } else {
            const lanche = {
                identifierL,
                id: sizeL,
                name: nomeLanche,
                img: imgLanche,
                qt: quantLanches,
                price: priceLanche
            };
            cartL.push(lanche);

            // Adicionar novo item ao carrinho
            const cartItem = selecioneL('.models .cart-produtos').cloneNode(true);
            cartItem.querySelector('.cart-produto-name').innerHTML = nomeLanche;
            cartItem.querySelector('img').src = imgLanche;
            cartItem.querySelector('.cart-produto-qt').innerHTML = quantLanches;

            cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cartL[cartIndex].qt++;
                updateCartL();
            });

            cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cartL[cartIndex].qt > 1) {
                    cartL[cartIndex].qt--;
                } else {
                    cartL.splice(cartIndex, 1);
                    cartItem.remove();
                }
                updateCartL();
            });

            selecioneL('.cart').append(cartItem);
        }
        closeModalL();
        openCartL();
        updateCartL();
    });
};

// Função para atualizar o carrinho
const updateCartL = () => {
    selecioneL('.menu-openner span').innerHTML = cartL.length;

    if (cartL.length > 0) {
        selecioneL('aside').classList.add('show');
        selecioneL('.cart').innerHTML = '';

        let subtotal = 0;

        for (let i = 0; i < cartL.length; i++) {
            const cartItem = selecioneL('.models .cart-produtos').cloneNode(true);
            selecioneL('.cart-produtos').append(cartItem);

            const precoItem = cartL[i].price * cartL[i].qt; // Calcula o preço total do item

            subtotal += precoItem; // Atualiza o subtotal com o preço total do item

            cartItem.querySelector('img').src = cartL[i].img;
            cartItem.querySelector('.cart-produto-name').innerHTML = cartL[i].name;
            cartItem.querySelector('.cart-produto-desc').innerHTML = cartL[i].desc || ''; // Corrigido: Adicionando ou vazio para evitar erros
            cartItem.querySelector('.cart-produto-price').innerHTML = formatoRealL(precoItem); // Exibe o preço total do item
            cartItem.querySelector('.cart-produto-qt').innerHTML = cartL[i].qt;

            const index = i; // Salvar o índice em uma variável para usar no evento de clique

            cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cartL[index].qt++;
                updateCartL();
            });

            cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cartL[index].qt > 1) {
                    cartL[index].qt--;
                } else {
                    cartL.splice(index, 1);
                    cartItem.remove();
                }
                updateCartL();
            });
        }

        const total = subtotal;
        selecioneL('.cart--totalitem.subtotal span:last-child').innerHTML = formatoRealL(subtotal); // Exibe o subtotal
        selecioneL('.cart--totalitem.total span:last-child').innerHTML = formatoRealL(total); // Exibe o total
    } else {
        selecioneL('aside').classList.remove('show');
        selecioneL('aside').style.left = '100vw';
    }
};


// função para completar a compra
const completePurchaseL = () => {
    selecioneL('.cart--finalizar').addEventListener('click', () => {
        cartL = [];
        selecioneL('.menu-openner span').innerHTML = 0;
        selecioneL('aside').classList.remove('show');
        selecioneL('aside').style.left = '100vw'; // Corrigido: Estava 'styel' em vez de 'style'
        selecioneL('header').style.display = 'flex';
        updateCartL();
    });
};

// função para abrir o carrinho
const openCartL = () => {
    if (cartL.length > 0) {
        selecioneL('aside').classList.add('show');
        selecioneL('header').style.display = 'flex';
    }

    selecioneL('.menu-openner').addEventListener('click', () => {
        selecioneL('aside').classList.add('show');
        selecioneL('aside').style.left = '0';
    });
};

// função para fechar o carrinho
const closeCartL = () => {
    selecioneL('.menu-openner').addEventListener('click', () => {
        selecioneL('aside').style.left = '100vw';
        selecioneL('header').style.display = 'flex';
    });
};

// função para iniciar
const iniciarL = () => {
    const productsItemsL = selecioneLAll('.lanche-area .produtos-item-lanches');
    productsItemsL.forEach((productItemsL) => {
        productItemsL.addEventListener("click", handleItemClickLanche);
    });

    closeButtonL();
    changeQuantityL();
    addToCartL();
    openCartL();
    closeCartL();
    completePurchaseL();
};

iniciarL();
