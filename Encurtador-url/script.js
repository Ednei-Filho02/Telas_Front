const STORAGE_KEY = "url_shortener_history";


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const urlInput = document.getElementById("urlInput");
const shortenButton = document.getElementById("shortenButton");

const error = document.getElementById("error");

const result = document.getElementById("result");
const shortUrlInput = document.getElementById("shortUrl");
const copyButton = document.getElementById("copyButton");

const historyList = document.getElementById("historyList");


// ========================================
// GERAR CÓDIGO ALEATÓRIO
// ========================================

function generateCode(length = 6) {

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let code = "";

  for (let i = 0; i < length; i++) {

    const randomIndex =
      Math.floor(Math.random() * characters.length);

    code += characters[randomIndex];
  }

  return code;
}


// ========================================
// PEGAR HISTÓRICO
// ========================================

function getHistory() {

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

}


// ========================================
// SALVAR HISTÓRICO
// ========================================

function saveHistory(history) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );

}


// ========================================
// ENCURTAR URL
// ========================================

function shortenURL() {

  let url = urlInput.value.trim();

  error.style.display = "none";

  // Verifica se foi digitado alguma coisa
  if (!url) {

    showError("Digite uma URL.");

    return;
  }


  // Adiciona https:// automaticamente
  if (!/^https?:\/\//i.test(url)) {

    url = "https://" + url;

  }


  // Verifica se a URL é válida
  try {

    new URL(url);

  } catch {

    showError("Digite uma URL válida.");

    return;
  }


  const history = getHistory();


  // Gera código
  let code = generateCode();


  // Evita códigos repetidos
  while (
    history.some(item => item.code === code)
  ) {

    code = generateCode();

  }


  // Cria o link curto
  const shortUrl =
    `${window.location.origin}${window.location.pathname}?id=${code}`;


  // Cria objeto
  const item = {

    code: code,

    original: url,

    shortUrl: shortUrl,

    createdAt: new Date().toISOString()

  };


  // Adiciona no início do histórico
  history.unshift(item);


  // Mantém apenas os últimos 20
  const limitedHistory =
    history.slice(0, 20);


  saveHistory(limitedHistory);


  // Mostra resultado
  shortUrlInput.value = shortUrl;

  result.classList.add("active");


  // Atualiza histórico
  renderHistory();

}


// ========================================
// MOSTRAR ERRO
// ========================================

function showError(message) {

  error.textContent = message;

  error.style.display = "block";

}


// ========================================
// COPIAR URL PRINCIPAL
// ========================================

async function copyURL() {

  const url = shortUrlInput.value;

  try {

    await navigator.clipboard.writeText(url);

    const originalText =
      copyButton.textContent;

    copyButton.textContent = "Copiado!";

    setTimeout(() => {

      copyButton.textContent = originalText;

    }, 1500);

  } catch {

    shortUrlInput.select();

    document.execCommand("copy");

    copyButton.textContent = "Copiado!";

  }

}


// ========================================
// COPIAR URL DO HISTÓRICO
// ========================================

async function copyHistoryURL(url, button) {

  try {

    await navigator.clipboard.writeText(url);

    const originalText =
      button.textContent;

    button.textContent = "Copiado!";

    setTimeout(() => {

      button.textContent = originalText;

    }, 1500);

  } catch {

    alert("Não foi possível copiar o link.");

  }

}


// ========================================
// ESCAPAR HTML
// ========================================

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


// ========================================
// MOSTRAR HISTÓRICO
// ========================================

function renderHistory() {

  const history = getHistory();


  if (history.length === 0) {

    historyList.innerHTML = `
      <p class="empty">
        Nenhum link criado ainda.
      </p>
    `;

    return;
  }


  historyList.innerHTML = history.map(item => {

    return `

      <div class="history-item">

        <div class="history-info">

          <div class="history-short">
            ${escapeHTML(item.shortUrl)}
          </div>

          <div class="history-original">
            ${escapeHTML(item.original)}
          </div>

        </div>

        <button
          class="copy-small"
          data-url="${escapeHTML(item.shortUrl)}"
        >
          Copiar
        </button>

      </div>

    `;

  }).join("");


  // Adiciona eventos aos botões
  document
    .querySelectorAll(".copy-small")
    .forEach(button => {

      button.addEventListener("click", () => {

        copyHistoryURL(
          button.dataset.url,
          button
        );

      });

    });

}


// ========================================
// EVENTOS
// ========================================

shortenButton.addEventListener(
  "click",
  shortenURL
);


copyButton.addEventListener(
  "click",
  copyURL
);


urlInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      shortenURL();

    }

  }
);


// ========================================
// CARREGAR HISTÓRICO
// ========================================

renderHistory();
