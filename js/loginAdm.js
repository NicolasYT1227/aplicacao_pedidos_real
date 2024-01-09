const selecione = (object) => document.querySelector(object);

const formInformations = selecione(".formInformationUser");
const textShow = selecione(".textError_php");

formInformations.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário
    textShow.style.display = 'flex';
    textShow.style.opacity = '1';
});