// netlify/functions/analisar-abnt.js
// Função serverless para refinar análise de referências ABNT via Anthropic Claude.
// Exige a variável de ambiente ANTHROPIC_API_KEY configurada no painel do Netlify.
// Nunca exponha a chave no frontend.

const ALLOWED_ORIGIN = "*"; // ajuste para seu domínio em produção: "https://seu-site.netlify.app"
const MODEL = "claude-opus-4-7"; // troque para outro modelo Anthropic se preferir
const MAX_TOKENS = 4096; // JSON estruturado pode ser longo — não reduza abaixo disso
const LIMITE_CARACTERES = 3000;

const headersBase = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

function resposta(statusCode, payload) {
  return {
    statusCode,
    headers: headersBase,
    body: JSON.stringify(payload),
  };
}

// Sanitiza/normaliza o que voltou do modelo para um shape estável.
function sanitizar(parsed) {
  const arrStr = (a) =>
    Array.isArray(a) ? a.filter((x) => typeof x === "string" && x.trim()).slice(0, 30) : [];
  const arrComp = (a) =>
    Array.isArray(a)
      ? a
          .filter((c) => c && typeof c === "object")
          .slice(0, 30)
          .map((c) => ({
            nome: typeof c.nome === "string" ? c.nome.slice(0, 80) : "",
            status: typeof c.status === "string" ? c.status.slice(0, 30) : "",
            explicacao: typeof c.explicacao === "string" ? c.explicacao.slice(0, 600) : "",
            sugestao: typeof c.sugestao === "string" ? c.sugestao.slice(0, 600) : "",
          }))
      : [];

  return {
    status: typeof parsed.status === "string" ? parsed.status.slice(0, 80) : "",
    pontuacao: Math.max(0, Math.min(100, Number(parsed.pontuacao) || 0)),
    tipoDetectado: typeof parsed.tipoDetectado === "string" ? parsed.tipoDetectado.slice(0, 60) : "",
    confianca: Math.max(0, Math.min(100, Number(parsed.confianca) || 0)),
    resumo: typeof parsed.resumo === "string" ? parsed.resumo.slice(0, 1000) : "",
    validacaoFormal: arrStr(parsed.validacaoFormal),
    validacaoBibliografica: arrStr(parsed.validacaoBibliografica),
    problemas: arrStr(parsed.problemas),
    acertos: arrStr(parsed.acertos),
    alertas: arrStr(parsed.alertas),
    componentes: arrComp(parsed.componentes),
    sugestaoCorrigida: typeof parsed.sugestaoCorrigida === "string" ? parsed.sugestaoCorrigida.slice(0, 1500) : "",
    explicacaoDidatica: typeof parsed.explicacaoDidatica === "string" ? parsed.explicacaoDidatica.slice(0, 3000) : "",
    limitesDaAnalise: typeof parsed.limitesDaAnalise === "string" ? parsed.limitesDaAnalise.slice(0, 1000) : "",
    // Sempre fixado pelo servidor — não confiamos no modelo para reescrever isso
    baseDaAnalise: "regras locais + análise local + prompt normativo + modelo de linguagem; PDFs não consultados em tempo real",
  };
}

// Extrai o primeiro JSON válido de uma string. Aceita JSON cru, JSON com pequenas
// imperfeições (vírgula sobrando) e JSON envolto em markdown.
function extrairJson(texto) {
  if (typeof texto !== "string") return null;
  // Remove cercas de markdown se houver
  let s = texto.replace(/```json/gi, "```").replace(/```/g, "").trim();
  const ini = s.indexOf("{");
  const fim = s.lastIndexOf("}");
  if (ini === -1 || fim === -1 || fim <= ini) return null;
  const candidato = s.slice(ini, fim + 1);
  try {
    return JSON.parse(candidato);
  } catch {
    // tenta limpar vírgula final antes de } ou ]
    const limpo = candidato.replace(/,(\s*[}\]])/g, "$1");
    try {
      return JSON.parse(limpo);
    } catch {
      return null;
    }
  }
}

function montarPrompt({ referenciaOriginal, tipoSelecionado, resultadoLocal, modoProfessor, modoEstrito }) {
  const tipoTxt = !tipoSelecionado || tipoSelecionado === "auto" ? "(detectar automaticamente)" : tipoSelecionado;
  const resumoLocal = resultadoLocal && typeof resultadoLocal === "object"
    ? JSON.stringify(resultadoLocal).slice(0, 2000)
    : "{}";

  return `Você é um avaliador didático de referências ABNT.

CONTEXTO IMPORTANTE — LIMITES DA SUA ANÁLISE:
- Você NÃO está consultando os PDFs da ABNT em tempo real.
- Sua análise se baseia em quatro fontes: (a) as regras codificadas listadas abaixo, (b) o resultado da análise local que já foi feita, (c) este prompt normativo, e (d) seu conhecimento de modelo de linguagem.
- Você NÃO pode confirmar a veracidade bibliográfica (se autor, título, ano, editora ou DOI correspondem a uma obra real).
- Quando houver conflito entre seu conhecimento geral e as REGRAS DISPONÍVEIS NO SISTEMA abaixo, USE AS REGRAS DO SISTEMA. Elas têm prioridade.
- Use NBR 6023:2018 para referências; NBR 10520:2023 só se for análise de citação.

REGRAS DISPONÍVEIS NO SISTEMA (use estas como prioridade máxima):

[LIVRO — NBR 6023:2018, 7.1]
Estrutura: SOBRENOME, Prenome. Título (com destaque tipográfico): subtítulo sem destaque. Edição. Local: Editora, ano.
Edição indica-se a partir da 2ª como "2. ed." (NUNCA "2ª edição" ou "2a ed").
Sobrenome do autor em CAIXA ALTA, seguido de vírgula e prenome.
Sem local identificável: [S. l.]. Sem editora: [s. n.]. Ambos ausentes: [S. l.: s. n.].

[CAPÍTULO DE LIVRO — NBR 6023:2018, 7.3]
Estrutura: AUTOR DO CAPÍTULO. Título do capítulo. In: AUTOR DO LIVRO (org./ed./coord.). Título do livro. Edição. Local: Editora, ano. p. X-Y.
Conector "In:" obrigatório (com dois-pontos e In em maiúscula).
Páginas inicial-final do capítulo obrigatórias.
Destaque vai no TÍTULO DO LIVRO, não no título do capítulo.

[ARTIGO DE PERIÓDICO — NBR 6023:2018, 7.7]
Estrutura: AUTOR. Título do artigo. Nome do Periódico (com destaque), Local, v. X, n. Y, p. X-Y, mês(es) ano.
O DESTAQUE TIPOGRÁFICO vai no NOME DO PERIÓDICO, não no título do artigo.
Volume (v.), número (n.) e páginas (p. X-Y) obrigatórios quando existirem.

[ARTIGO ONLINE — NBR 6023:2018, 7.7 + 6.6]
Tudo do artigo impresso, mais: DOI (se houver) + Disponível em: URL. Acesso em: DD mês abreviado. AAAA.
Meses abreviados em pt-BR: jan., fev., mar., abr., maio, jun., jul., ago., set., out., nov., dez.

[SITE / PÁGINA WEB — NBR 6023:2018, 6.6 e 7.16]
Estrutura: AUTOR/ENTIDADE. Título da página. Local, ano. Disponível em: URL. Acesso em: data.
"Disponível em:" e "Acesso em:" são OBRIGATÓRIOS.

[LEGISLAÇÃO — NBR 6023:2018, 7.11.1]
Estrutura: JURISDIÇÃO. Lei/Decreto/Portaria/Resolução nº X, de DD de mês de AAAA. Ementa. Dados de publicação (Diário Oficial: seção, Local, p., data) ou URL + acesso.
Entrada SEMPRE pela jurisdição em CAIXA ALTA (BRASIL., SÃO PAULO., RECIFE., etc.).
Para portarias ministeriais: BRASIL. Ministério da Saúde. Portaria nº X, de DD de mês de AAAA.

[NORMA TÉCNICA — NBR 6023:2018, 7.12]
Estrutura: ENTIDADE NORMALIZADORA. Código da norma: título da norma. Local: Editora, ano.
Entidade em CAIXA ALTA completa (ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS, INTERNATIONAL ORGANIZATION FOR STANDARDIZATION).
Código completo (NBR 6023, ISO 9001, não só números).
Ano obrigatório (normas são revisadas).

[TESE / DISSERTAÇÃO / TCC — NBR 6023:2018, 7.1]
Estrutura: AUTOR. Título: subtítulo. Ano de defesa. Número de folhas (f.). Tipo (Grau em Área) – Instituição, Local, ano.
"Tese (Doutorado em ...)", "Dissertação (Mestrado em ...)", "Trabalho de Conclusão de Curso (Bacharelado em ...)".
Instituição (Universidade/Faculdade/Instituto) obrigatória.

[DOCUMENTO INSTITUCIONAL / GOVERNAMENTAL — NBR 6023:2018, 7.1 + 8.1.2]
Entrada pela entidade em CAIXA ALTA. Para órgãos governamentais brasileiros, comece pela jurisdição:
BRASIL. Ministério da Saúde. Secretaria X. Departamento Y. Título: subtítulo. Local: Editora, ano. (Série, n. X).
Hierarquia: do mais geral para o mais específico.

[REGRAS TRANSVERSAIS]
Destaque tipográfico do título: negrito OU itálico OU sublinhado — escolher um e manter consistência em TODAS as referências.
Subtítulo SEMPRE sem destaque, separado do título por dois-pontos.
Múltiplos autores: separados por ponto-e-vírgula. 4+ autores: pode usar "et al." (opcional).
Ordenação da lista: alfabética por sobrenome do primeiro autor.
Mesmo autor, várias obras: ordem cronológica. Mesmo ano: letras (2020a, 2020b).

DADOS DA ANÁLISE EM CURSO:

Referência do usuário:
"""${referenciaOriginal}"""

Tipo informado pelo usuário: ${tipoTxt}

Resultado da análise local (já feita pelo validador codificado — use como insumo, mas faça SUA leitura):
${resumoLocal}

${modoProfessor ? "MODO PROFESSOR ATIVADO — explique cada item de forma didática e detalhada, como um professor revisando." : ""}
${modoEstrito ? "MODO ESTRITO ATIVADO — penalize com rigor: ausência de elementos essenciais, ordem incorreta, pontuação fora do padrão, falta de destaque tipográfico, inconsistência de maiúsculas em autoria." : ""}

INSTRUÇÕES DE SAÍDA:

Separe validação formal (estrutura, ordem, pontuação, elementos visíveis) de validação bibliográfica (veracidade dos dados — sempre diga que NÃO pode confirmar).
Não invente autor, título, cidade, editora, ano, DOI, URL ou edição. Quando faltar, use marcadores ABNT: [S. l.], [s. n.], [ano não identificado], etc., ou diga explicitamente que não pode confirmar.
Não diga que algo está definitivamente correto se você avaliou apenas a estrutura.
Prefira "formalmente compatível" quando a análise for estrutural.

Classifique o status em uma destas categorias:
- formalmente compatível
- provavelmente compatível
- parcialmente compatível
- estruturalmente problemática
- incerta / exige conferência manual

A resposta deve ser obrigatoriamente JSON válido, sem markdown, sem cercas de código, sem texto antes ou depois. Use exatamente este formato:

{
  "status": "uma das 5 categorias acima",
  "pontuacao": 0,
  "tipoDetectado": "livro | capitulo | artigo | artigo-online | site | legislacao | norma | ebook | tese | evento | institucional | verbete | email | desconhecido",
  "confianca": 0,
  "resumo": "1-2 frases em pt-BR descrevendo o diagnóstico",
  "validacaoFormal": ["lista de avaliações sobre padrões formais (ordem, pontuação, elementos visíveis)"],
  "validacaoBibliografica": ["lista de avaliações que dependem da fonte real - sempre diga que não pode confirmar"],
  "problemas": ["erros estruturais detectáveis"],
  "acertos": ["elementos que parecem corretos"],
  "alertas": ["pontos que precisam de conferência humana"],
  "componentes": [
    {
      "nome": "autoria | título | local | editora | ano | etc.",
      "status": "correto | ausente | incorreto | incerto | não se aplica",
      "explicacao": "explicação curta e didática",
      "sugestao": "como deveria aparecer, ou vazio se não aplicável"
    }
  ],
  "sugestaoCorrigida": "versão corrigida da referência conforme ABNT, sem inventar dados ausentes",
  "explicacaoDidatica": "explicação geral em linguagem de professor",
  "limitesDaAnalise": "o que você NÃO pôde verificar (ex: se o autor e a obra existem de fato, se o DOI é real, etc.)",
  "baseDaAnalise": "regras locais + análise local + prompt normativo + modelo de linguagem; PDFs não consultados em tempo real"
}

Responda APENAS com o JSON, sem nenhum texto antes ou depois.`;
}

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: headersBase, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return resposta(405, { mensagem: "Método não permitido. Use POST." });
  }

  // Parse body
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return resposta(400, { mensagem: "Corpo da requisição não é JSON válido." });
  }

  const { referenciaOriginal, tipoSelecionado, resultadoLocal, modoProfessor, modoEstrito } = body;

  if (typeof referenciaOriginal !== "string" || !referenciaOriginal.trim()) {
    return resposta(400, { mensagem: "Campo 'referenciaOriginal' obrigatório." });
  }
  if (referenciaOriginal.length > LIMITE_CARACTERES) {
    return resposta(400, {
      mensagem: `Referência excede ${LIMITE_CARACTERES} caracteres.`,
    });
  }

  // Verifica chave ANTES de qualquer chamada externa
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return resposta(503, {
      codigo: "CHAVE_NAO_CONFIGURADA",
      mensagem:
        "A análise por IA não está configurada neste servidor. " +
        "O administrador precisa definir a variável ANTHROPIC_API_KEY no Netlify.",
    });
  }

  const prompt = montarPrompt({
    referenciaOriginal: referenciaOriginal.trim(),
    tipoSelecionado,
    resultadoLocal,
    modoProfessor: Boolean(modoProfessor),
    modoEstrito: Boolean(modoEstrito),
  });

  // Chamada à API da Anthropic
  let apiResp;
  try {
    apiResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (e) {
    // Não exponha detalhes da exceção ao cliente
    return resposta(502, {
      mensagem: "Falha ao acessar o serviço de IA. Tente novamente em alguns instantes.",
    });
  }

  if (!apiResp.ok) {
    // Loga apenas o status — sem expor body
    if (apiResp.status === 401 || apiResp.status === 403) {
      return resposta(503, {
        codigo: "CHAVE_INVALIDA",
        mensagem: "A chave da IA não foi aceita pelo provedor. Verifique a configuração no servidor.",
      });
    }
    if (apiResp.status === 429) {
      return resposta(503, {
        codigo: "LIMITE",
        mensagem: "Limite de uso da IA atingido. Tente novamente mais tarde.",
      });
    }
    return resposta(502, {
      mensagem: "A IA respondeu com erro. A análise local continua disponível.",
    });
  }

  let data;
  try {
    data = await apiResp.json();
  } catch {
    return resposta(502, { mensagem: "Resposta da IA em formato inesperado." });
  }

  // Extrai bloco de texto da resposta da Anthropic
  let textoBruto = "";
  if (Array.isArray(data?.content)) {
    for (const bloco of data.content) {
      if (bloco?.type === "text" && typeof bloco.text === "string") {
        textoBruto += bloco.text;
      }
    }
  }
  if (!textoBruto) {
    return resposta(502, { mensagem: "A IA não retornou conteúdo de texto." });
  }

  const parsed = extrairJson(textoBruto);
  if (!parsed || typeof parsed !== "object") {
    return resposta(502, {
      mensagem: "A IA respondeu, mas o JSON não pôde ser interpretado. A análise local continua disponível.",
    });
  }

  return resposta(200, sanitizar(parsed));
};
