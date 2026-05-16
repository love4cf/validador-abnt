# Validador ABNT V2 — Projeto pronto

Esta pasta já está organizada como projeto React/Vite com Netlify Function.

## Estrutura

- `src/App.jsx`: site React com o validador.
- `src/main.jsx`: arquivo que inicia o React.
- `netlify/functions/analisar-abnt.js`: função serverless que chama a API da Anthropic.
- `package.json`: instruções para instalar e construir o site.
- `netlify.toml`: configuração de build do Netlify.

## Teste local sem IA

1. Abra esta pasta no VS Code.
2. Abra o terminal dentro da pasta.
3. Rode:

```bash
npm install
npm run dev
```

4. Abra o link que aparecer, geralmente `http://localhost:5173`.
5. Teste o validador local.

## Publicar no Netlify

Para a IA funcionar, suba o projeto completo no Netlify e configure a variável:

```txt
ANTHROPIC_API_KEY
```

Não coloque a chave no código.
