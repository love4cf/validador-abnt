# Validador ABNT — V2 Híbrida

A análise local **continua funcionando exatamente como antes**, sem internet, sem servidor. Esta camada adiciona um botão opcional **"Refinar com IA"** que envia a referência para uma função serverless do Netlify, que por sua vez consulta a API da Anthropic (Claude). A chave da API nunca aparece no frontend.

---

## 1. Estrutura de arquivos

```
seu-projeto/
├── src/
│   └── abnt_monitoria_completo.jsx   ← componente React (já tem a camada de IA)
└── netlify/
    └── functions/
        └── analisar-abnt.js          ← função serverless (nova)
```

A pasta `netlify/functions/` precisa ficar na **raiz do projeto**, no mesmo nível do `package.json`.

---

## 2. Configurar a chave `ANTHROPIC_API_KEY` no Netlify

A chave **nunca** vai no código. Configure-a apenas no painel do Netlify.

### Pelo painel web

1. Acesse o Netlify, abra o site do projeto.
2. Vá em **Site settings** → **Environment variables**.
3. Clique em **Add a variable** → **Add a single variable**.
4. Em **Key**, digite exatamente: `ANTHROPIC_API_KEY`
5. Em **Value**, cole sua chave (algo como `sk-ant-api03-...`).
6. Em **Scopes**, deixe marcado **Functions** (suficiente).
7. Em **Deploy contexts**, marque **All deploy contexts** (ou só Production, se preferir).
8. Salve e dispare um redeploy (**Deploys → Trigger deploy → Deploy site**).

> A variável só é carregada em deploys feitos **após** sua criação. Por isso o redeploy é necessário.

### Pelo CLI (alternativa)

```bash
netlify env:set ANTHROPIC_API_KEY "sk-ant-api03-..." --scope functions
netlify deploy --prod
```

---

## 3. Testar localmente

### 3.1. Instalar a CLI do Netlify

```bash
npm install -g netlify-cli
```

### 3.2. Definir a chave para testes locais

Crie um arquivo `.env` na **raiz do projeto** (e adicione `.env` ao `.gitignore`):

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 3.3. Rodar com `netlify dev`

```bash
netlify dev
```

Isso sobe o frontend **e** as funções serverless juntos em `http://localhost:8888`. A rota da função fica disponível em `http://localhost:8888/.netlify/functions/analisar-abnt`.

### 3.4. Testar a função isoladamente com curl

```bash
curl -X POST http://localhost:8888/.netlify/functions/analisar-abnt \
  -H "Content-Type: application/json" \
  -d '{
    "referenciaOriginal": "SILVA, João. Fundamentos de epidemiologia. São Paulo: Atlas, 2020.",
    "tipoSelecionado": "auto",
    "resultadoLocal": {},
    "modoProfessor": false,
    "modoEstrito": false
  }'
```

Resposta esperada: JSON com `status`, `pontuacao`, `componentes`, `sugestaoCorrigida` etc.

---

## 4. Publicar

Se o projeto já está conectado ao Netlify:

```bash
git add netlify/functions/analisar-abnt.js
git commit -m "feat: validador ABNT com refino opcional por IA"
git push
```

O Netlify detecta as funções automaticamente em `netlify/functions/`. Não precisa configurar `netlify.toml` se você usa o caminho padrão.

Se preferir explicitar, crie um `netlify.toml` na raiz:

```toml
[build]
  functions = "netlify/functions"
```

---

## 5. Diagnóstico de erros

A função e o frontend tratam vários cenários. Veja como reconhecer cada um:

### **404 — A função não foi encontrada**

Frontend mostra: *"A função serverless não foi encontrada (404)."*

Causas:
- Você está rodando `npm run dev` (Vite/CRA) em vez de `netlify dev`. Em `npm run dev` puro, `/.netlify/functions/*` não existe.
- A pasta está em outro lugar. Confirme: `netlify/functions/analisar-abnt.js` na raiz.
- O deploy ainda não foi feito.

Verificação rápida:
```bash
ls netlify/functions/
# deve listar: analisar-abnt.js
```

No deploy do Netlify, abra o site → **Functions** no menu lateral. Deve aparecer `analisar-abnt` listada.

### **503 — Chave não configurada**

Frontend mostra: *"A análise por IA não está configurada neste servidor."*

Causa: a variável `ANTHROPIC_API_KEY` não está no ambiente da função.

Correção:
- Verifique em **Site settings → Environment variables** que `ANTHROPIC_API_KEY` está listada e o **Scope** inclui **Functions**.
- Dispare um novo deploy. Variáveis criadas depois do último deploy não aparecem na função.

### **503 — Chave inválida**

Frontend mostra: *"A chave da IA não foi aceita pelo provedor."*

Causa: a chave foi colada errada (espaço extra, caractere faltando) ou foi revogada.

Correção: gere uma nova chave em https://console.anthropic.com/, atualize a variável e redeploy.

### **503 — Limite de uso**

Causa: cota da Anthropic foi atingida (rate limit ou créditos esgotados).

Correção: aguarde alguns minutos ou aumente o plano no console da Anthropic.

### **502 — A IA respondeu com erro / JSON inválido**

Causa: o modelo retornou texto fora do formato esperado, ou a chamada falhou na borda.

A análise local **continua funcionando**. Tente clicar em "Refinar com IA" de novo.

### **500 — Erro genérico**

Algo inesperado. Veja os logs da função:

- Painel Netlify: **Functions → analisar-abnt → Function log**
- CLI local: olhe o terminal onde está rodando `netlify dev`

---

## 6. Critérios de sucesso (checklist)

- [x] O site continua funcionando sem IA (análise local intacta)
- [x] A análise local aparece com badge **🖥️ LOCAL**
- [x] O botão **"✨ Refinar com IA"** só aparece depois da análise local
- [x] Se a função falhar, aparece aviso amarelo, mas o app não quebra
- [x] Nenhuma chave aparece no frontend (apenas em `process.env` da função)
- [x] O painel da IA mostra badge **🤖 IA** para diferenciar das análises locais
- [x] No histórico, entradas refinadas ficam marcadas com **🤖 IA**

---

## 7. Próximos passos (futuro)

Quando a Anthropic estiver funcionando estável, adicione:

- OpenAI: criar `netlify/functions/analisar-abnt-openai.js`, usar `OPENAI_API_KEY`.
- Gemini: criar `netlify/functions/analisar-abnt-gemini.js`, usar `GEMINI_API_KEY`.
- Adicionar seletor no frontend: *"Refinar com Claude / GPT / Gemini"*.

Mantenha cada provedor em sua própria função para que falha de um não derrube os outros.
