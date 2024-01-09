const handleLancheClick = (e) => {
    e.preventDefault();
  
    let pai = e.target.parentElement;
    selecione(".lancheBig").getElementsByTagName('img')[0].src = pai.querySelector('.produto-item-lanche-img').firstChild.src;
  
    let avo = e.target.parentElement.parentElement;    
    selecione(".lancheInfo--nome").textContent = avo.querySelector('.produto-item-pastel-name').textContent;
    selecione(".lancheInfo--price").textContent = avo.querySelector('.produto-item-pastel-price').textContent;
    selecione(".lancheInfo--desc").textContent = avo.querySelector('.produto-item-pastel-desc').textContent; 
    
};

const iniciar = () => {
    const lanchesItens = document.querySelectorAll(".lanche-area .produtos-item-lanches");

    lanchesItens.forEach((lancheItem) => {
        lancheItem.addEventListener("click", handleLancheClick);
    })
}

iniciar();