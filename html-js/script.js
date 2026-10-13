function somar(a, b) {
  return a + b;
}

const inputA = document.querySelector("#numeroA");
const inputB = document.querySelector("#numeroB");
const botao = document.querySelector("#btnSomar");
const resultado = document.querySelector("#resultado");

botao.addEventListener("click", function () {
  const a = Number(inputA.value);
  const b = Number(inputB.value);

  resultado.textContent = somar(a, b);
});