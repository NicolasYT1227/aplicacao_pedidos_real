// Salgados Functions

// Funções de seleção
const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);

// Variáveis globais
let modalKey = 0;
let quantSalgados = 1;
let cart = [];
let produtoSelecionado = null;

// Funções utilitárias
const formatoReal = (valor) => {
   return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
  if(valor) {
      return valor.toFixed(2)
  }
}

const getKey = (e) => {
  const key = e.target.closest('.produtos-item-pasteis1').getAttribute('data-key');
  console.log("Salgado Clicado " + key);

  produtoSelecionado = foodJson[key];
  quantSalgados = 1;
  modalKey = key;

  return key;
};

const changeQuantity = () => {
  select('.salgadoInfo--qtmais').addEventListener("click", () => {
    quantSalgados++;
    select(".salgadoInfo--qt").innerHTML = quantSalgados;
  });

  select('.salgadoInfo--qtmenos').addEventListener('click', () => {
    if (quantSalgados > 1) {
      quantSalgados--;
      select(".salgadoInfo--qt").innerHTML = quantSalgados;
    }
  });
};

const closeButton = () => {
  selectAll(".salgadoInfo--cancelButton, .salgadoInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal);
  });
};

const openModal = () => {
  const modal = select(".salgadoWindowArea");
  modal.style.opacity = 0;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = 1;

    if (produtoSelecionado) {
      fillModalData(produtoSelecionado);
    }
  }, 150);
};

const closeModal = () => {
  const modal = select(".salgadoWindowArea");
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
};

const handleItemClick = (e) => {
  e.preventDefault();

  const parent = e.target.parentElement;
  select(".salgadoBig").getElementsByTagName('img')[0].src = parent.querySelector('.produto-item-pastel-img').firstChild.src;

  const grandparent = e.target.parentElement.parentElement;    
  select(".salgadoInfo--nome").textContent = grandparent.querySelector('.produto-item-pastel-name').textContent;
  select(".salgadoInfo--price").textContent = grandparent.querySelector('.produto-item-pastel-price').textContent;
  select(".salgadoInfo--desc").textContent = grandparent.querySelector('.produto-item-pastel-desc').textContent; 
  
  openModal(); 
};

const addToCart = () => {
  select(".salgadoInfo--addButton").addEventListener("click", () => {
    const priceSalgado = parseFloat(select(".salgadoInfo--price").textContent.replace("R$", "").replace(",", "."));
    const size = select(".salgado-area").getAttribute('data-key');
    const identifier = size;
    const nomeSalgados = select(".salgadoInfo--nome").textContent;
    
    // Armazenar imagem e nome do produto
    const imgSalgados = select(".salgadoBig img").getAttribute('src');
    const nomeSalgado = nomeSalgados;

    const cartItemIndex = cart.findIndex((item) => item.identifier === identifier);

    if (cartItemIndex > -1) {
      cart[cartItemIndex].qt += quantSalgados;
    } else {
      const salgado = {
        identifier,
        id: size,
        name: nomeSalgados,
        img: imgSalgados,
        qt: quantSalgados,
        price: priceSalgado,
      };
      cart.push(salgado);

      // Adicionar novo item ao carrinho
      const cartItem = select('.models .cart-produtos').cloneNode(true);
      cartItem.querySelector('.cart-produto-name').innerHTML = nomeSalgado;
      cartItem.querySelector('img').src = imgSalgados;
      cartItem.querySelector('.cart-produto-qt').innerHTML = quantSalgados;

      cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
        cart[cartItemIndex].qt++;
        updateCart();
      });

      cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
        if (cart[cartItemIndex].qt > 1) {
          cart[cartItemIndex].qt--;
        } else {
          cart.splice(cartItemIndex, 1);
          cartItem.remove();
        }
        updateCart();
      });

      select('.cart').append(cartItem);
    }

    closeModal();
    openCart();
    updateCart();
  });
};

const updateCart = () => {
  select('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    select('aside').classList.add('show');
    select('.cart').innerHTML = '';

    let subtotal = 0;

    for (let i = 0; i < cart.length; i++) {
      const salgadoItem = salgadoJson.find((item) => item.id == cart[i].id);

      subtotal += cart[i].price * cart[i].qt;

      const cartItem = select('.models .cart-produtos').cloneNode(true);
      select('.cart-produtos').append(cartItem);

      const salgadoSizeName = cart[i].tipoSalgado;
      const salgadoName = `${salgadoItem.nomeSalgado} (${salgadoSizeName})`;

      cartItem.querySelector('img').src = cart[i].img;
      cartItem.querySelector('.cart-produto-name').innerHTML = cart[i].name;
  
      cartItem.querySelector('.cart-produto-qt').innerHTML = cart[i].qt;

      cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
        cart[i].qt++;
        updateCart();
      });

      cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
        if (cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
          cartItem.remove();
          i--;
          const cartSubtotal = select('.cart--totalitem.subtotal span:last-child');
          const cartTotal = select('.cart--totalitem.total span:last-child');
          cartSubtotal.innerHTML = '';
          cartTotal.innerHTML = '';
          updateCart();
        }
        if (cart.length < 1) {
          select('header').style.display = 'flex';
        }
        updateCart();
      });

      select('.cart').append(cartItem);
    }

    const total = subtotal;
    select('.cart--totalitem.subtotal span:last-child').innerHTML = formatoReal(subtotal);
    select('.cart--totalitem.total span:last-child').innerHTML = formatoReal(total);
  } else {
    select('aside').classList.remove('show');
    select('aside').style.left = '100vw';
  }
};

const completePurchase = () => {
  select('.cart--finalizar').addEventListener('click', () => {
    cart = [];
    select(".menu-openner span").innerHTML = 0;
    select('aside').classList.remove('show');
    select('aside').style.left = '100vw';
    select('header').style.display = 'flex';
    updateCart();
  });
};

const openCart = () => {
  if (cart.length > 0) {
    select('aside').classList.add('show');
    select('header').style.display = 'flex';
  }

  select(".menu-openner").addEventListener('click', () => {
    select('aside').classList.add('show');
    select('aside').style.left = '0';
  });
};

const closeCart = () => {
  select(".menu-closer").addEventListener('click', () => {
    select('aside').style.left = '100vw';
    select('header').style.display = 'flex';
  });
};

const initialize = () => {
  const productsItems = selectAll(".salgado-area .salgado-area-produto1");
  productsItems.forEach((productItem) => {
    productItem.addEventListener("click", handleItemClick);
  });

  closeButton();
  changeQuantity();
  addToCart();
  openCart();
  closeCart();
  completePurchase();
};

initialize();
// /Salgado Functions.
