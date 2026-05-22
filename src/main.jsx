import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Estilos globais — eliminam faixas brancas externas e garantem fundo escuro
// em toda a viewport, mesmo quando o conteúdo é menor que a tela.
// Os mesmos estilos também são injetados via <style> dentro do App.jsx
// (defesa em profundidade — funciona mesmo se este arquivo não for usado).
const css = `
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    background: #0a0d14;
  }
  body { overflow-x: hidden; }
  *, *::before, *::after { box-sizing: border-box; }
`;
const styleEl = document.createElement("style");
styleEl.appendChild(document.createTextNode(css));
document.head.appendChild(styleEl);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
