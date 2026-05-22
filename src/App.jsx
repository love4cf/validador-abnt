import { useState } from "react";
import { LAB_NAV_ITEMS, LAB_CARDS, renderLabModule } from "./abnt-lab-tabs.jsx";

// ═══════════════════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════════════════
const t = {
  bg: "#0a0d14",
  bgAlt: "#0f1320",
  surface: "#161b2c",
  surfaceAlt: "#1e2538",
  border: "#2a3252",
  borderSoft: "#1e2538",
  blue: "#5b9aff",
  blueSoft: "#1a2848",
  green: "#3ed68b",
  greenSoft: "#0e2a1f",
  red: "#ff6b6b",
  redSoft: "#3a1a1a",
  yellow: "#ffc857",
  yellowSoft: "#3a2c0a",
  purple: "#c084fc",
  purpleSoft: "#2a1a45",
  pink: "#f472b6",
  pinkSoft: "#3a1a2a",
  cyan: "#4ddfd6",
  cyanSoft: "#0a2e2c",
  orange: "#ffa05c",
  orangeSoft: "#3a2010",
  text: "#e8ecf6",
  textMuted: "#8a93b0",
  textFaint: "#4a5275",
};

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const Badge = ({ children, color = t.blue }) => (
  <span
    style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      background: color + "22",
      color: color,
      border: `1px solid ${color}55`,
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

const Card = ({ children, color, glow, style: s = {} }) => (
  <div
    style={{
      background: t.surface,
      border: `1px solid ${color ? color + "44" : t.border}`,
      borderRadius: 14,
      padding: "20px 22px",
      boxShadow: glow ? `0 0 24px ${color}22` : "none",
      ...s,
    }}
  >
    {children}
  </div>
);

const SectionHeader = ({ icon, title, sub, color = t.blue }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 40,
          height: 40,
          background: color + "22",
          border: `1px solid ${color}55`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: t.text,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
    </div>
    {sub && (
      <p style={{ color: t.textMuted, margin: 0, fontSize: 13, lineHeight: 1.6 }}>
        {sub}
      </p>
    )}
  </div>
);

const SubTitle = ({ children, color = t.blue }) => (
  <div
    style={{
      fontWeight: 700,
      color: color,
      fontSize: 12,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 10,
      marginTop: 4,
    }}
  >
    {children}
  </div>
);

const ExampleBlock = ({ label, texto, status = "neutral", explicacao }) => {
  const colors = {
    correto: { bg: t.greenSoft, border: t.green, label: t.green },
    errado: { bg: t.redSoft, border: t.red, label: t.red },
    atencao: { bg: t.yellowSoft, border: t.yellow, label: t.yellow },
    neutral: { bg: t.surfaceAlt, border: t.border, label: t.textMuted },
  };
  const c = colors[status];
  return (
    <div
      style={{
        background: t.bg,
        border: `1px solid ${c.border}66`,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      {label && (
        <div
          style={{
            padding: "6px 14px",
            background: c.bg,
            borderBottom: `1px solid ${c.border}44`,
            fontSize: 11,
            fontWeight: 700,
            color: c.label,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          padding: "12px 14px",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: 13,
          color: t.text,
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
        }}
      >
        {texto}
      </div>
      {explicacao && (
        <div
          style={{
            padding: "8px 14px",
            background: t.surfaceAlt,
            borderTop: `1px solid ${t.border}`,
            fontSize: 12,
            color: t.textMuted,
            lineHeight: 1.5,
          }}
        >
          💡 {explicacao}
        </div>
      )}
    </div>
  );
};

const Note = ({ children, type = "info" }) => {
  const styles = {
    info: { bg: t.blueSoft, border: t.blue, icon: "ℹ️" },
    warn: { bg: t.yellowSoft, border: t.yellow, icon: "⚠️" },
    danger: { bg: t.redSoft, border: t.red, icon: "❌" },
    success: { bg: t.greenSoft, border: t.green, icon: "✅" },
    tip: { bg: t.purpleSoft, border: t.purple, icon: "💡" },
  };
  const s = styles[type];
  return (
    <div
      style={{
        background: s.bg,
        border: `1px solid ${s.border}55`,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: 8,
        padding: "12px 14px",
        display: "flex",
        gap: 10,
        fontSize: 13,
        color: t.text,
        lineHeight: 1.6,
        marginBottom: 12,
      }}
    >
      <span style={{ flexShrink: 0 }}>{s.icon}</span>
      <div>{children}</div>
    </div>
  );
};

const RuleList = ({ rules, color = t.blue }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {rules.map((r, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          padding: "10px 14px",
          background: t.surfaceAlt,
          borderRadius: 8,
          fontSize: 13,
          color: t.text,
          lineHeight: 1.6,
        }}
      >
        <span
          style={{
            background: color + "22",
            color: color,
            border: `1px solid ${color}44`,
            width: 24,
            height: 24,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 11,
            flexShrink: 0,
          }}
        >
          {i + 1}
        </span>
        <span>{r}</span>
      </div>
    ))}
  </div>
);

// Copiable example with button
const CopiableExample = ({ label, texto, color = t.blue, idx, copiedIdx, setCopied }) => (
  <div
    style={{
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 10,
    }}
  >
    <div
      style={{
        padding: "8px 14px",
        background: color + "11",
        borderBottom: `1px solid ${t.border}`,
        fontSize: 11,
        fontWeight: 700,
        color: color,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <span>{label}</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(texto).catch(() => {});
          setCopied(idx);
          setTimeout(() => setCopied(null), 1800);
        }}
        style={{
          padding: "3px 10px",
          background: copiedIdx === idx ? color : "transparent",
          color: copiedIdx === idx ? "#000" : color,
          border: `1px solid ${color}55`,
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.05em",
        }}
      >
        {copiedIdx === idx ? "✅ COPIADO" : "📋 COPIAR"}
      </button>
    </div>
    <div
      style={{
        padding: "12px 14px",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13,
        color: t.text,
        lineHeight: 1.7,
      }}
    >
      {texto}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// VALIDADOR ABNT — ENGINE DE ANÁLISE LOCAL (sem API, sem backend)
// Heurísticas baseadas em ABNT NBR 6023:2018 e NBR 10520:2023
// ═══════════════════════════════════════════════════════════════════════════

// ---------- Padrões de detecção ----------
const PAT = {
  url: /https?:\/\/\S+/i,
  doi: /(?:DOI:\s*|doi:\s*|https?:\/\/doi\.org\/)(10\.\S+)/i,
  isbn: /ISBN[:\s]+[\d\-Xx]+/i,
  issn: /ISSN[:\s]+[\d\-Xx]+/i,
  acessoEm: /\bacesso\s+em\b\s*:?\s*(?:\d{1,2}[.\s\/-]+(?:[a-zçãáéíóú]+\.?|\d{1,2})[.\s\/-]+\d{2,4}|\d{4}-\d{2}-\d{2})/i,
  // Captura tudo do "Acesso em" até o ANO final.
  // Aceita pontos no meio (ex: "07. Abr. 2026") porque date brasileira usa pontos
  // entre dia/mês/ano. Termina no ano + ponto final opcional.
  acessoEmCompleto: /\bacesso\s+em\b\s*:?\s*((?:\d{1,2}[.\s\/-]+(?:[A-Za-zçãáéíóúÁÉÍÓÚÂÊÎÔÛÃÕÇÑ]+\.?|\d{1,2})[.\s\/-]+\d{2,4})|\d{4}-\d{2}-\d{2})/i,
  disponivelEm: /Dispon[íi]vel em:\s*<?https?:\/\/\S+>?/i,
  edicaoOk: /\b\d+\.\s*ed\./,
  edicaoErrada: /\b\d+\s*[ºª°]\s*(?:edi[çc][ãa]o|ed\.?)/i,
  volume: /\bv\.\s*\d+/i,
  numero: /\bn\.\s*\d+/i,
  paginas: /\bp\.\s*\d+\s*[-–]\s*\d+/i,
  paginasUnica: /\bp\.\s*\d+\b/i,
  folhas: /\b\d+\s*f\.\s*(?:Tese|Disserta)/i,
  ano4: /\b(1[5-9]\d{2}|20\d{2})\b/,
  anoCopyright: /\bc\s?(\d{4})\b/,
  anoIncerto: /\[(?:\d{4}\??|\d{2,3}-\??|entre \d{4} e \d{4}|ca\.\s*\d{4}|s\.\s*d\.|[\d]+\s*ou\s*[\d]+)\]/i,
  semLocal: /\[S\.\s*l\.\]/,
  semEditora: /\[s\.\s*n\.\]/,
  semLocalEditora: /\[S\.\s*l\.\s*:\s*s\.\s*n\.\]/,
  inPattern: /\bIn:\s/,
  apud: /\bapud\b/i,
  etAl: /\bet\s+al\.?\b/i,
  orgEditor: /\((?:org|ed|coord|comp)\.?\)/i,

  // Sobrenome em CAIXA ALTA seguido de vírgula (autoria pessoa física)
  autorPessoa: /^([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-']{2,}),\s*([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ'.\s\-]+)/,
  autorSemCaixaAlta: /^([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ'.\-]+,?\s*[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ'.\s\-]+)\b/,

  // Jurisdição (legislação)
  jurisdicao: /^(BRASIL|S[ÃA]O PAULO|RIO DE JANEIRO|RIO GRANDE DO SUL|RIO GRANDE DO NORTE|MINAS GERAIS|PERNAMBUCO|CEAR[ÁA]|BAHIA|PARAN[ÁA]|SANTA CATARINA|GOI[ÁA]S|MARANH[ÃA]O|PAR[ÁA]|AMAZONAS|RECIFE|CURITIBA|BRAS[IÍ]LIA|FORTALEZA|SALVADOR|BELO HORIZONTE|PORTO ALEGRE|MANAUS|BEL[ÉE]M|S[ÃA]O LU[IÍ]S)\./,
  lei: /\bLei\s+n?[º°.]?\s*[\d.]+,?\s*de\s+\d+/i,
  decreto: /\bDecreto(?:-lei)?\s+n?[º°.]?\s*[\d.]+/i,
  portaria: /\bPortaria\s+n?[º°.]?\s*[\d.]+/i,
  constituicao: /\[Constitui[çc][ãa]o\s*\(/i,
  diarioOficial: /\bDi[áa]rio Oficial\b/i,

  nbr: /\bNBR\s*\d+/i,
  iso: /\bISO\s*\d+/i,
  abnt: /^ASSOCIA[ÇC][ÃA]O BRASILEIRA DE NORMAS T[ÉE]CNICAS\b/i,

  tese: /\bTese\s+\(/i,
  dissertacao: /\bDisserta[çc][ãa]o\s+\(/i,
  tcc: /\bTrabalho\s+de\s+Conclus[ãa]o\s+de\s+Curso\b/i,
  monografia: /\bMonografia\s+\(/i,

  evento: /\b(?:CONGRESSO|SIMP[ÓO]SIO|CONFER[ÊE]NCIA|ENCONTRO|SEMIN[ÁA]RIO|WORKSHOP|REUNI[ÃA]O)\b/i,
  anaisEvento: /\bAnais\s*\[?\.{0,3}\]?\./i,

  ebook: /\bE-?book\b/i,
  ebookFormat: /\b(?:Kindle|EPUB|MOBI)\b/i,

  email: /\b(?:Destinat[áa]rio:|mensagem eletr[ôo]nica)\b/i,

  redeSocial: /\b(?:Facebook|Twitter|Instagram|TikTok|LinkedIn|X|YouTube):\s/i,
  video: /\b\d+\s*(?:min|seg)\.|fita de v[ií]deo|DVD|VHS|1\s*v[ií]deo/i,

  periodico: /\b(?:Revista|Journal|Cadernos|Bolet[ií]m|Arquivos|Anais|Estudos|An[áa]lise|Ci[êe]ncia|Acta|Folha de)\b/i,
  doisPontosDuplo: /(?<!\s\[S\.\sl)(?<!\s\[s\.\sn):\s*[a-záéíóúâêîôûãõç]/,

  // Palavras que indicam continuação de hierarquia institucional após jurisdição.
  // Exemplo: "BRASIL. Ministério da Saúde. Secretaria de Atenção Básica."
  palavraHierarquia: /^(?:Minist[ée]rio|Secretaria|Departamento|Coordena[çc][ãa]o|Divis[ãa]o|Diretoria|Conselho|Comiss[ãa]o|Instituto|Centro|Funda[çc][ãa]o|Ag[êe]ncia|Superintend[êe]ncia|N[úu]cleo|Subsecretaria|C[âa]mara|Tribunal|Procuradoria|Defensoria|Universidade|Faculdade|Programa|Reitoria|Comit[êe]|Subdepartamento|Subcoordena[çc][ãa]o|Grupo|Casa|Gabinete|Assembleia|Pol[ií]cia|Empresa P[úu]blica|Autarquia)\b/i,

  // Início claramente institucional em CAIXA ALTA (entidade não-governamental)
  inicioCaixaAlta: /^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-'&()]{3,}\.\s/,

  ponto: /\.\s+/,
};

// Detecta autoria hierárquica institucional (BRASIL. Ministério X. Secretaria Y. ...).
// Retorna { texto, proximoIndice, segmentos } ou null.
// proximoIndice indica em qual segmento começa o que vem APÓS a autoria (provavelmente o título).
function detectarAutoriaHierarquica(s) {
  const segmentos = s.split(/\.\s+/);
  if (segmentos.length < 2) return null;

  const primeiro = (segmentos[0] || "").trim();
  if (!primeiro) return null;

  // O primeiro segmento precisa ser jurisdição reconhecida OU entidade em CAIXA ALTA
  const ehJurisdicao = PAT.jurisdicao.test(primeiro + ".");
  const ehEntidadeCaixaAlta = /^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-'&()]{3,}$/.test(primeiro);
  if (!ehJurisdicao && !ehEntidadeCaixaAlta) return null;

  const acc = [primeiro];
  let i = 1;
  while (i < segmentos.length && PAT.palavraHierarquia.test(segmentos[i] || "")) {
    acc.push(segmentos[i]);
    i++;
  }

  // Só considera "hierárquica" se houver pelo menos UM nível abaixo da entidade
  // (ex: "BRASIL." sozinho não conta; "BRASIL. Ministério da Saúde." conta).
  // Se for só entidade em CAIXA ALTA sem hierarquia abaixo, ainda assim tratamos como autoria,
  // mas o flag fica como "juridica" simples.
  return {
    texto: acc.join(". ") + ".",
    proximoIndice: i,
    segmentos,
    hierarquica: acc.length > 1,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// DICIONÁRIO DE PERIÓDICOS ABREVIADOS (NLM/PubMed → nome completo)
// ═══════════════════════════════════════════════════════════════════════════
// Expandido localmente, sem consulta externa. Quando o periódico abreviado
// não estiver aqui, mantemos a forma abreviada e geramos alerta para o usuário
// conferir no PubMed/NLM Catalog/Crossref/site da revista.
const JOURNAL_ABBREVIATIONS = {
  "J Int Med Res": "Journal of International Medical Research",
  "N Engl J Med": "New England Journal of Medicine",
  "JAMA": "JAMA",
  "BMJ": "BMJ",
  "Lancet": "The Lancet",
  "Circulation": "Circulation",
  "Eur Heart J": "European Heart Journal",
  "J Am Coll Cardiol": "Journal of the American College of Cardiology",
  "JAMA Cardiol": "JAMA Cardiology",
  "Nat Med": "Nature Medicine",
  "N Engl J Med Evid": "NEJM Evidence",
};

// Stub para uso futuro — quando metadados externos forem permitidos (DOI/PMID
// → Crossref/NLM API), esta função poderá ser implementada. Hoje sempre retorna
// null para deixar claro que NÃO inventamos metadados a partir de iniciais.
async function buscarMetadadosPorDOIouPMID(/* doi, pmid */) {
  // Implementação futura. Não chame em produção sem revisão de segurança.
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// DETECTOR DE REFERÊNCIA PUBMED/NLM (VANCOUVER-LIKE)
// ═══════════════════════════════════════════════════════════════════════════
// Exemplo do padrão alvo:
//   Jiang H, Fang T, Cheng Z. Mechanism of heart failure ... J Int Med Res.
//   2023 Oct;51(10):3000605231202573. doi: 10.1177/03000605231202573.
//   PMID: 37818767; PMCID: PMC10566288.
//
// Sinais fortes (combinação obrigatória):
//   - autores "Sobrenome Iniciais," no início (ex: "Jiang H, Fang T, Cheng Z.")
//   - periódico abreviado seguido de ano e mês ("J Int Med Res. 2023 Oct;")
//   - volume(número) no formato "51(10)"
//   - PMID ou DOI presente

const PAT_PUBMED = {
  // Autores PubMed: "Sobrenome Iniciais" repetido, terminado por ".".
  // Ex: "Jiang H, Fang T, Cheng Z." / "Smith JA, Brown AB."
  autoresBloco: /^([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ\-]+\s+[A-Z]{1,3}(?:,\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ\-]+\s+[A-Z]{1,3})*)\.\s+/,
  autorIndividual: /([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõçñ\-]+)\s+([A-Z]{1,3})/g,
  // Ano + mês ou ano + dia + mês: "2023 Oct" / "2023 Oct 15" / "2023"
  anoMes: /\b(19|20)\d{2}\s+(?:[A-Z][a-z]{2,8}(?:\s+\d{1,2})?)?/,
  // Volume(número): "51(10)" — número opcional
  volNum: /\b(\d+)\s*\((\d+(?:-\d+)?)\)/,
  // Páginas/article number após dois-pontos: ":e722-e759" ou ":3000605231202573" ou ":45-50"
  paginasOuArticle: /:\s*((?:e?\d+(?:[-–]e?\d+)?)|(?:\d{6,}))/,
  doi: /doi:\s*(10\.\S+?)(?:\s|\.|$)/i,
  pmid: /PMID:\s*(\d+)/i,
  pmcid: /PMCID:\s*(PMC\d+)/i,
};

function detectarPubMed(s) {
  // Não rodar se já parece ABNT (autor em CAIXA ALTA seguido de vírgula)
  if (/^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ]{2,}[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]*,/.test(s)) return null;

  const matchAutores = s.match(PAT_PUBMED.autoresBloco);
  if (!matchAutores) return null;

  // Precisa ter PMID OU DOI OU volume(número) para confirmar
  const temPmid = PAT_PUBMED.pmid.test(s);
  const temDoi = PAT_PUBMED.doi.test(s);
  const temVolNum = PAT_PUBMED.volNum.test(s);
  const temAnoMes = PAT_PUBMED.anoMes.test(s);

  if (!temPmid && !temDoi && !temVolNum) return null;
  if (!temAnoMes && !temPmid) return null;

  // Extrair autores: "Sobrenome Inicial, Sobrenome Inicial, ..."
  const autores = [];
  let m;
  PAT_PUBMED.autorIndividual.lastIndex = 0;
  const blocoAutores = matchAutores[1];
  while ((m = PAT_PUBMED.autorIndividual.exec(blocoAutores)) !== null) {
    const sobrenome = m[1];
    const iniciais = m[2].toUpperCase();
    // Formato ABNT: SOBRENOME, I. (iniciais separadas por ponto)
    const iniFormat = iniciais.split("").join(". ") + ".";
    autores.push(`${sobrenome.toUpperCase()}, ${iniFormat}`);
  }
  if (autores.length === 0) return null;

  // Remover bloco de autores do restante
  const semAutores = s.slice(matchAutores[0].length).trim();

  // Próximo segmento até o próximo ponto = TÍTULO
  // Procurar até "." seguido de espaço e maiúscula que pareça periódico
  const idxFim = semAutores.indexOf(". ");
  if (idxFim === -1) return null;
  const titulo = semAutores.slice(0, idxFim).trim();

  // Resto: deve conter periódico abreviado + ano + (vol)(num) + páginas
  const resto = semAutores.slice(idxFim + 2);

  // Periódico = trecho do início do resto até "."  (ex: "J Int Med Res")
  const matchPeri = resto.match(/^([A-Z][A-Za-z\s&]+?)\.\s/);
  const periodicoAbrev = matchPeri ? matchPeri[1].trim() : "";

  // Ano (4 dígitos, primeiro encontrado)
  const matchAno = resto.match(/\b(19|20)\d{2}\b/);
  const ano = matchAno ? matchAno[0] : "";

  // Volume e número
  const matchVN = resto.match(PAT_PUBMED.volNum);
  const volume = matchVN ? matchVN[1] : "";
  const numero = matchVN ? matchVN[2] : "";

  // Páginas ou article number
  const matchPag = resto.match(PAT_PUBMED.paginasOuArticle);
  const paginas = matchPag ? matchPag[1] : "";

  // DOI / PMID / PMCID
  const matchDoi = s.match(PAT_PUBMED.doi);
  const doi = matchDoi ? matchDoi[1].replace(/[.;,]+$/, "") : "";
  const matchPmid = s.match(PAT_PUBMED.pmid);
  const pmid = matchPmid ? matchPmid[1] : "";
  const matchPmcid = s.match(PAT_PUBMED.pmcid);
  const pmcid = matchPmcid ? matchPmcid[1] : "";

  // Tentar expandir periódico pelo dicionário
  const periodicoExpandido = JOURNAL_ABBREVIATIONS[periodicoAbrev] || null;

  return {
    autores,
    titulo,
    periodicoAbrev,
    periodicoExpandido,
    ano, volume, numero, paginas,
    doi, pmid, pmcid,
  };
}

// Construir versão ABNT a partir do parse PubMed
function pubmedParaABNT(pm) {
  if (!pm) return "";
  const partes = [];
  partes.push(pm.autores.join("; ") + ".");
  if (pm.titulo) partes.push(pm.titulo + ".");
  const periodico = pm.periodicoExpandido || pm.periodicoAbrev;
  if (periodico) {
    let bloco = periodico + ",";
    if (pm.volume) bloco += ` v. ${pm.volume},`;
    if (pm.numero) bloco += ` n. ${pm.numero},`;
    if (pm.paginas) bloco += ` p. ${pm.paginas},`;
    if (pm.ano) bloco += ` ${pm.ano}`;
    bloco = bloco.replace(/,\s*$/, "");
    bloco += ".";
    partes.push(bloco);
  }
  if (pm.doi) partes.push(`DOI: ${pm.doi}.`);
  return partes.join(" ").replace(/\s+/g, " ").trim();
}

// ═══════════════════════════════════════════════════════════════════════════
// DETECTOR DE DIRETRIZ / CONSENSO / POSICIONAMENTO DE SOCIEDADE CIENTÍFICA
// ═══════════════════════════════════════════════════════════════════════════
// Documentos como "Diretriz brasileira sobre dislipidemias" publicados por
// sociedades científicas (SBC, SBP, SBE, AHA, ESC, OMS, etc.) — frequentemente
// disponibilizados em periódicos da própria sociedade. Não cabem bem em
// "site", "artigo comum" ou "livro".

const PAT_DIRETRIZ = {
  // Palavras-chave no título que sinalizam diretriz/consenso
  palavraTitulo: /\b(?:Diretriz|Diretrizes|Guideline|Guidelines|Consenso|Consensus|Posicionamento|Position(?:ing)?\s+statement|Scientific\s+statement|Recomenda[çc][ãa]o|Recomenda[çc][õo]es|Recommendation|Atualiza[çc][ãa]o|Update|Protocolo\s+cl[íi]nico)\b/i,

  // Autores institucionais frequentes (não exaustivo — funciona em combinação
  // com palavraTitulo). Match no início (antes de '.' ou '(').
  sociedade: /^(?:SOCIEDADE\s+(?:BRASILEIRA|EUROPE[IÍ]A|AMERICANA|PORTUGUESA)\s+DE\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]+|AMERICAN\s+(?:HEART|COLLEGE|DIABETES|MEDICAL|ACADEMY|SOCIETY|PSYCHIATRIC)\s+[A-Z\s]+|EUROPEAN\s+SOCIETY\s+OF\s+[A-Z\s]+|WORLD\s+HEALTH\s+ORGANIZATION|INTERNATIONAL\s+SOCIETY\s+OF\s+[A-Z\s]+|FEDERA[ÇC][ÃA]O\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]+|COLLEGIO\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]+|COL[ÉE]GIO\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]+|ASSOCIA[ÇC][ÃA]O\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s]+|MINIST[ÉE]RIO\s+DA\s+SA[ÚU]DE)\b/,
};

// Detecta diretriz. Retorna objeto com partes ou null.
function detectarDiretriz(s) {
  const temPalavraTitulo = PAT_DIRETRIZ.palavraTitulo.test(s);
  const temSociedade = PAT_DIRETRIZ.sociedade.test(s);

  // Precisa de pelo menos: palavra-chave no título OU sociedade reconhecida.
  // Não basta só "Recomendação" isolado — também precisa de autoria institucional
  // (não cair em falsos positivos como recomendação de leitura).
  if (!temPalavraTitulo && !temSociedade) return null;

  // Se só tem palavra-chave mas não autoria institucional reconhecida,
  // confirmar que há autoria em CAIXA ALTA no início.
  if (!temSociedade) {
    const inicio = s.split(".")[0] || "";
    const ehInstit = /^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-'&()]{6,}/.test(inicio);
    if (!ehInstit) return null;
  }

  return {
    temPalavraTitulo,
    temSociedade,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// DETECTOR DE CAPÍTULO DE LIVRO (sinais fortes)
// ═══════════════════════════════════════════════════════════════════════════
// "In:" é o sinal mais forte. Outros sinais (organizador, dois títulos +
// páginas) ajudam mas não confirmam sozinhos.
function detectarSinaisCapitulo(s) {
  const temIn = PAT.inPattern.test(s);
  const temOrg = PAT.orgEditor.test(s);
  const temPag = PAT.paginas.test(s);
  return { temIn, temOrg, temPag };
}

// ═══════════════════════════════════════════════════════════════════════════
// NORMALIZAÇÃO DE DATA DE ACESSO
// ═══════════════════════════════════════════════════════════════════════════
const MESES_PT = {
  jan: "jan", janeiro: "jan",
  fev: "fev", fevereiro: "fev",
  mar: "mar", março: "mar", marco: "mar",
  abr: "abr", abril: "abr",
  mai: "maio", maio: "maio",
  jun: "jun", junho: "jun",
  jul: "jul", julho: "jul",
  ago: "ago", agosto: "ago",
  set: "set", setembro: "set",
  out: "out", outubro: "out",
  nov: "nov", novembro: "nov",
  dez: "dez", dezembro: "dez",
};
const MESES_NUM = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Normaliza "07. Abr. 2026" → "7 abr. 2026"; aceita "07/04/2026", "2026-04-07" etc.
// Retorna { dataNormalizada, anoAcesso } ou null se não conseguir.
function normalizarDataAcesso(texto) {
  if (!texto) return null;
  const t = texto.trim().replace(/[.;,]+$/, "");

  // Formato YYYY-MM-DD
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const dia = parseInt(m[3], 10);
    const mes = MESES_NUM[parseInt(m[2], 10) - 1];
    const ano = m[1];
    if (mes) return { dataNormalizada: `${dia} ${mes}. ${ano}`, anoAcesso: ano };
  }

  // Formato DD/MM/YYYY ou DD-MM-YYYY
  m = t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) {
    const dia = parseInt(m[1], 10);
    const mes = MESES_NUM[parseInt(m[2], 10) - 1];
    let ano = m[3];
    if (ano.length === 2) ano = "20" + ano;
    if (mes) return { dataNormalizada: `${dia} ${mes}. ${ano}`, anoAcesso: ano };
  }

  // Formato "07 abr. 2026" / "07. Abr. 2026" / "7 abril 2026"
  m = t.match(/^(\d{1,2})\.?\s+([A-Za-zçãÃ]+)\.?\s+(\d{4})$/);
  if (m) {
    const dia = parseInt(m[1], 10);
    const mesRaw = m[2].toLowerCase().replace(/\.$/, "");
    const mes = MESES_PT[mesRaw];
    const ano = m[3];
    if (mes) return { dataNormalizada: `${dia} ${mes}. ${ano}`, anoAcesso: ano };
  }

  // Não conseguiu normalizar — preservar texto original mas extrair ano
  const matchAno = t.match(/\b(19|20)\d{2}\b/);
  return matchAno
    ? { dataNormalizada: t, anoAcesso: matchAno[0] }
    : { dataNormalizada: t, anoAcesso: null };
}

// ---------- Detectar tipo documental ----------
function detectarTipo(s) {
  // Ordem importa: padrões mais específicos primeiro

  // PubMed/NLM tem precedência alta — formato muito distinto
  if (detectarPubMed(s)) return { tipo: "pubmed", confianca: 92 };

  if (PAT.email.test(s)) return { tipo: "email", confianca: 95 };
  if (PAT.abnt.test(s) || (PAT.nbr.test(s) && !PAT.lei.test(s)) || PAT.iso.test(s)) {
    return { tipo: "norma", confianca: 90 };
  }
  if (PAT.constituicao.test(s)) return { tipo: "legislacao", confianca: 95 };
  if (PAT.jurisdicao.test(s) && (PAT.lei.test(s) || PAT.decreto.test(s) || PAT.portaria.test(s))) {
    return { tipo: "legislacao", confianca: 92 };
  }
  if (PAT.tese.test(s) || PAT.dissertacao.test(s) || PAT.tcc.test(s) || PAT.monografia.test(s)) {
    return { tipo: "tese", confianca: 92 };
  }
  if (PAT.anaisEvento.test(s) || (PAT.evento.test(s) && PAT.inPattern.test(s))) {
    return { tipo: "evento", confianca: 88 };
  }

  // Diretriz / consenso / posicionamento de sociedade científica
  // Tem prioridade sobre artigo/site quando há periódico + URL.
  const dir = detectarDiretriz(s);
  if (dir) {
    return { tipo: "diretriz", confianca: dir.temSociedade && dir.temPalavraTitulo ? 90 : 75 };
  }

  if (PAT.inPattern.test(s)) {
    // Capítulo de livro — "In:" é sinal forte
    return { tipo: "capitulo", confianca: 80 };
  }
  if (PAT.video.test(s) && (PAT.url.test(s) || PAT.disponivelEm.test(s))) {
    return { tipo: "video", confianca: 80 };
  }
  // Artigo periódico (impresso ou online) — sinais fortes: v.+n.+p.X-Y
  const sinalArtigo = (PAT.volume.test(s) && PAT.paginas.test(s)) ||
                      (PAT.numero.test(s) && PAT.paginas.test(s)) ||
                      PAT.periodico.test(s);
  if (sinalArtigo) {
    if (PAT.url.test(s) || PAT.doi.test(s)) {
      return { tipo: "artigo-online", confianca: 88 };
    }
    return { tipo: "artigo", confianca: 85 };
  }
  if (PAT.ebook.test(s) || PAT.ebookFormat.test(s)) {
    return { tipo: "ebook", confianca: 82 };
  }
  // Sinal forte de material online: "Disponível em:" ou URL.
  // Antes de classificar como livro impresso, verificar online primeiro.
  const sinalOnline = PAT.disponivelEm.test(s) || PAT.url.test(s);
  if (sinalOnline) {
    // Se tiver autoria institucional (hierárquica OU entidade em CAIXA ALTA) → doc institucional online
    const hier = detectarAutoriaHierarquica(s);
    if (hier) {
      // Confiança maior quando ano + acesso presentes
      const temAno = PAT.ano4.test(s) || PAT.anoIncerto.test(s);
      const temAcesso = PAT.acessoEm.test(s);
      const conf = temAno && temAcesso ? 82 : 65;
      return { tipo: "institucional", confianca: conf };
    }
    // Caso contrário: site/página web
    const temAcesso = PAT.acessoEm.test(s);
    return { tipo: "site", confianca: temAcesso ? 80 : 65 };
  }
  // Default: livro
  return { tipo: "livro", confianca: 55 };
}

// ---------- Extrair componentes da referência ----------
function extrairComponentes(s) {
  const c = {};

  // Atalho PubMed: se detectado, extrair tudo do parse PubMed
  const pm = detectarPubMed(s);
  if (pm) {
    c._pubmed = pm;
    c.autoria = {
      valor: pm.autores.join("; "),
      tipo: pm.autores.length > 1 ? "pessoa-multiplos" : "pessoa",
      status: "ok",
      formato: "pubmed",
    };
    if (pm.titulo) c.titulo = { valor: pm.titulo, status: "ok" };
    if (pm.periodicoExpandido || pm.periodicoAbrev) {
      c.periodico = {
        valor: pm.periodicoExpandido || pm.periodicoAbrev,
        status: pm.periodicoExpandido ? "ok" : "warn",
        problema: pm.periodicoExpandido ? null : `Abreviação "${pm.periodicoAbrev}" não expandida — confira o nome completo.`,
      };
    }
    if (pm.volume) c.volume = { valor: `v. ${pm.volume}`, status: "ok" };
    if (pm.numero) c.numero = { valor: `n. ${pm.numero}`, status: "ok" };
    if (pm.paginas) c.paginas = { valor: `p. ${pm.paginas}`, status: "ok" };
    if (pm.ano) c.ano = { valor: pm.ano, status: "ok" };
    if (pm.doi) c.doi = { valor: pm.doi, status: "ok" };
    if (pm.pmid) c.pmid = { valor: pm.pmid, status: "ok" };
    if (pm.pmcid) c.pmcid = { valor: pm.pmcid, status: "ok" };
    return c;
  }

  // Autoria
  const autorMatch = s.match(PAT.autorPessoa);
  if (autorMatch) {
    c.autoria = { valor: autorMatch[0].replace(/,\s*$/, ''), tipo: "pessoa", status: "ok" };
  } else {
    // Tentar autoria hierárquica institucional (BRASIL. Ministério da Saúde. ...)
    const hier = detectarAutoriaHierarquica(s);
    if (hier) {
      c.autoria = {
        valor: hier.texto,
        tipo: hier.hierarquica ? "juridica-hierarquica" : "juridica",
        status: "ok",
        proximoSegIndex: hier.proximoIndice,
        segmentos: hier.segmentos,
      };
    } else if (PAT.autorSemCaixaAlta.test(s)) {
      const m = s.match(PAT.autorSemCaixaAlta);
      c.autoria = { valor: m[1], tipo: "pessoa", status: "warn", problema: "Sobrenome não está em CAIXA ALTA" };
    } else {
      c.autoria = { valor: "", status: "missing" };
    }
  }

  // Edição
  if (PAT.edicaoOk.test(s)) {
    c.edicao = { valor: s.match(PAT.edicaoOk)[0], status: "ok" };
  } else if (PAT.edicaoErrada.test(s)) {
    const m = s.match(PAT.edicaoErrada);
    c.edicao = {
      valor: m[0],
      status: "error",
      problema: `Formato incorreto: use "${m[1] || ''}. ed." em vez de "${m[0]}".`,
      sugestao: m[0].replace(/(\d+)\s*[ºª°]\s*(?:edi[çc][ãa]o|ed\.?)/i, '$1. ed.')
    };
  } else {
    c.edicao = { valor: "", status: "na", explicacao: "1ª edição não precisa ser indicada." };
  }

  // Local
  if (PAT.semLocal.test(s) || PAT.semLocalEditora.test(s)) {
    c.local = { valor: "[S. l.]", status: "ok", explicacao: "Local não identificado (sine loco)." };
  } else {
    // Tentar extrair cidade antes de ":". Permite nomes compostos: "São Paulo", "Rio de Janeiro", "Belo Horizonte"
    const locMatch = s.match(/(?:^|\.\s+)([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-Za-zÁ-úçãõ.\-]+(?:\s+(?:de\s+|do\s+|da\s+|dos\s+|das\s+)?[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][a-záéíóúâêîôûãõç.\-]+){0,3}(?:,\s*[A-Z]{2})?):\s/);
    if (locMatch) {
      c.local = { valor: locMatch[1].trim(), status: "ok" };
    } else {
      c.local = { valor: "", status: "missing" };
    }
  }

  // Editora
  if (PAT.semEditora.test(s) || PAT.semLocalEditora.test(s)) {
    c.editora = { valor: "[s. n.]", status: "ok", explicacao: "Editora não identificada (sine nomine)." };
  } else {
    // Caso A: editora vem após ":" (formato canônico "Local: Editora")
    const edMatchA = s.match(/:\s+([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-Za-zÁ-úçãõ&.\s\-]+?)(?:,\s*c?\d{4}|;|\.\s)/);
    if (edMatchA) {
      c.editora = { valor: edMatchA[1].trim(), status: "ok" };
    } else {
      // Caso B: sem ":" — tentativa "Título. Editora, ano." (sem local)
      // Pegar a última palavra-titulo+maiúscula antes do ano
      const edMatchB = s.match(/\.\s+([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-Za-zÁ-úçãõ&\-]+(?:\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-Za-zÁ-úçãõ&\-]+)?)\s*,\s*c?\d{4}\.?\s*$/);
      if (edMatchB) {
        c.editora = { valor: edMatchB[1].trim(), status: "warn", problema: "Local ausente antes da editora (NBR 6023:2018, 8.4)." };
      } else {
        c.editora = { valor: "", status: "missing" };
      }
    }
  }

  // Ano de publicação
  // Importante: se houver "Acesso em: ... <ano>", esse ano é de ACESSO, não de publicação.
  // Removemos o trecho de "Acesso em" antes de buscar o ano de publicação.
  if (PAT.anoIncerto.test(s)) {
    c.ano = { valor: s.match(PAT.anoIncerto)[0], status: "ok", explicacao: "Ano provável/aproximado." };
  } else {
    // Remover o trecho "Acesso em: ..." para não confundir o ano.
    // Usar o regex completo (mesmo padrão de PAT.acessoEmCompleto) que aceita
    // pontos internos na data (ex: "Acesso em: 07. Abr. 2026").
    const semAcesso = s.replace(
      /\bacesso\s+em\b\s*:?\s*(?:(?:\d{1,2}[.\s\/-]+(?:[A-Za-zçãáéíóúÁÉÍÓÚÂÊÎÔÛÃÕÇÑ]+\.?|\d{1,2})[.\s\/-]+\d{2,4})|\d{4}-\d{2}-\d{2})\.?/gi,
      " "
    );
    const anos = semAcesso.match(/\b(1[5-9]\d{2}|20\d{2})\b/g);
    if (anos) {
      // Preferir o último ano do trecho sem acesso (geralmente é o de publicação)
      c.ano = { valor: anos[anos.length - 1], status: "ok" };
    } else {
      c.ano = { valor: "", status: "missing" };
    }
  }

  // Volume
  if (PAT.volume.test(s)) {
    c.volume = { valor: s.match(/\bv\.\s*\d+/i)[0], status: "ok" };
  }

  // Número
  if (PAT.numero.test(s)) {
    c.numero = { valor: s.match(/\bn\.\s*\d+/i)[0], status: "ok" };
  }

  // Páginas
  if (PAT.paginas.test(s)) {
    c.paginas = { valor: s.match(PAT.paginas)[0], status: "ok" };
  } else if (PAT.paginasUnica.test(s)) {
    c.paginas = { valor: s.match(PAT.paginasUnica)[0], status: "warn", problema: "Página única — confirme se há intervalo." };
  }

  // DOI
  if (PAT.doi.test(s)) {
    c.doi = { valor: s.match(PAT.doi)[1], status: "ok" };
  }

  // URL
  if (PAT.url.test(s)) {
    c.url = { valor: s.match(PAT.url)[0].replace(/[.)]\s*$/, ''), status: "ok" };
  }

  // Disponível em
  if (PAT.disponivelEm.test(s)) {
    c.disponivelEm = { valor: s.match(PAT.disponivelEm)[0], status: "ok" };
  }

  // Acesso em (robusto: case-insensitive, dois-pontos opcional, vários formatos de data)
  const matchAcessoCompleto = s.match(PAT.acessoEmCompleto);
  if (matchAcessoCompleto) {
    const dataRaw = matchAcessoCompleto[1].trim();
    const normalizado = normalizarDataAcesso(dataRaw);
    if (normalizado) {
      c.acesso = {
        valor: `Acesso em: ${normalizado.dataNormalizada}`,
        dataNormalizada: normalizado.dataNormalizada,
        anoAcesso: normalizado.anoAcesso,
        textoOriginal: matchAcessoCompleto[0],
        status: "ok",
      };
    } else {
      c.acesso = { valor: matchAcessoCompleto[0], status: "ok" };
    }
  }

  // ISBN
  if (PAT.isbn.test(s)) {
    c.isbn = { valor: s.match(PAT.isbn)[0], status: "ok" };
  }

  // ISSN
  if (PAT.issn.test(s)) {
    c.issn = { valor: s.match(PAT.issn)[0], status: "ok" };
  }

  // Título (heurística)
  // Quando a autoria é hierárquica institucional, o título é o próximo segmento após a hierarquia.
  // Caso contrário, usa o split por ponto.
  let tituloRaw = null;
  if (c.autoria && c.autoria.segmentos && typeof c.autoria.proximoSegIndex === "number") {
    tituloRaw = c.autoria.segmentos[c.autoria.proximoSegIndex];
  } else {
    const partesAutor = s.split('.');
    if (partesAutor.length >= 2 && c.autoria && c.autoria.valor) {
      let idxAutor = 0;
      for (let i = 0; i < partesAutor.length; i++) {
        if (partesAutor[i].includes(c.autoria.valor.split(',')[0])) {
          idxAutor = i;
          break;
        }
      }
      tituloRaw = partesAutor[idxAutor + 1];
    }
  }

  if (tituloRaw) {
    tituloRaw = tituloRaw.trim();
    // Remover "Disponível em" se aparecer (não é título)
    if (/^Dispon[íi]vel em/i.test(tituloRaw)) {
      c.titulo = { valor: "", status: "missing" };
    } else {
      // Separar título de subtítulo se houver ":"
      const colonIdx = tituloRaw.indexOf(':');
      if (colonIdx > 0 && colonIdx < tituloRaw.length - 1 && !/Dispon[íi]vel/i.test(tituloRaw.slice(0, colonIdx))) {
        c.titulo = { valor: tituloRaw.slice(0, colonIdx).trim(), status: "ok" };
        c.subtitulo = { valor: tituloRaw.slice(colonIdx + 1).trim(), status: "ok" };
      } else {
        c.titulo = { valor: tituloRaw, status: "ok" };
      }
    }
  } else if (!c.titulo) {
    c.titulo = { valor: "", status: "missing" };
  }

  // Periódico (artigo / diretriz) — heurística em 3 passes
  if (PAT.volume.test(s) || PAT.paginas.test(s) || PAT.periodico.test(s)) {
    // Pass 1: formato canônico "Periódico, Local, v./n./p./mês"
    const periMatch = s.match(/\.\s+([A-Z][^.,]*?)\s*,\s*[A-Z][a-záéíóú\s]+,\s*(?:v\.|n\.|p\.|jan|fev|mar|abr|maio|jun|jul|ago|set|out|nov|dez)/);
    if (periMatch) {
      c.periodico = { valor: periMatch[1].trim(), status: "ok" };
    } else {
      // Pass 2: palavras-chave conhecidas seguidas de vírgula+ano
      // Aceita "Arquivos Brasileiros de Cardiologia, 2025."
      const fallback = s.match(/(?:^|\.\s+)((?:Revista|Journal|Cadernos|Bolet[ií]m|Arquivos|Anais|Estudos|An[áa]lise|Ci[êe]ncia|Acta|Folha)[^,.]*?)\s*,\s*(?:\d{4}|[A-Z][a-záéíóú]+,\s*\d{4}|v\.|n\.)/i);
      if (fallback) {
        c.periodico = { valor: fallback[1].trim(), status: "ok" };
      }
    }
  }

  return c;
}

// ---------- Validadores por tipo ----------
function validarLivro(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (c.autoria?.status === "ok") acertos.push("Autoria presente e formatada.");
  else if (c.autoria?.status === "warn") problemas.push("Autoria sem CAIXA ALTA no sobrenome (NBR 6023:2018, 8.1.1).");
  else problemas.push("Autoria ausente ou irreconhecível.");

  if (c.titulo?.valor) acertos.push("Título identificado.");
  else problemas.push("Título não identificado.");

  if (c.local?.status === "ok") acertos.push("Local de publicação presente.");
  else if (c.local?.status === "missing") {
    problemas.push("Local ausente. Use [S. l.] se não houver local identificável (NBR 6023:2018, 8.4).");
  }

  if (c.editora?.status === "ok") acertos.push("Editora presente.");
  else if (c.editora?.status === "missing") {
    problemas.push("Editora ausente. Use [s. n.] se não houver editora identificável (NBR 6023:2018, 8.5).");
  }

  if (c.ano?.status === "ok") acertos.push("Ano presente.");
  else problemas.push("Ano de publicação ausente (NBR 6023:2018, 8.6).");

  if (c.edicao?.status === "error") problemas.push(c.edicao.problema);

  if (estrito && c.autoria?.tipo === "pessoa" && c.autoria.status === "warn") {
    problemas.push("Modo estrito: o sobrenome do autor deve estar em CAIXA ALTA.");
  }

  // Nota didática: livro inteiro vs capítulo.
  // NÃO marcamos como problema — apenas alertamos o usuário para confirmar
  // qual escopo é o correto para o trabalho dele.
  // (Só se NÃO há "In:" — se houver, o tipo já seria detectado como capítulo.)
  if (!PAT.inPattern.test(s)) {
    alertas.push("Esta estrutura parece referência de livro inteiro. Se a consulta foi restrita a um capítulo específico, use o modelo de capítulo de livro com 'In:'.");
  }

  return { problemas, acertos, alertas };
}

function validarCapitulo(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (!PAT.inPattern.test(s)) {
    problemas.push("Para capítulo de livro, é necessário indicar a obra maior com 'In:' (NBR 6023:2018, 7.3).");
    alertas.push("Estrutura sugerida: AUTOR DO CAPÍTULO. Título do capítulo. In: AUTOR/ORGANIZADOR. Título do livro. Local: Editora, ano. p. X-Y.");
  } else {
    acertos.push("Conector 'In:' presente.");
  }
  if (!PAT.paginas.test(s)) {
    problemas.push("Falta a paginação inicial-final do capítulo (p. X-Y).");
  } else {
    acertos.push("Páginas do capítulo presentes.");
  }
  if (c.autoria?.status !== "ok") problemas.push("Autoria do capítulo não identificada.");
  else acertos.push("Autoria do capítulo presente.");
  if (!c.local?.valor) problemas.push("Local do livro ausente.");
  if (!c.editora?.valor) problemas.push("Editora do livro ausente.");
  if (!c.ano?.valor) problemas.push("Ano de publicação ausente.");
  return { problemas, acertos, alertas };
}

function validarArtigo(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (c.autoria?.status === "ok") acertos.push("Autoria presente.");
  else problemas.push("Autoria ausente ou mal formatada.");
  if (!c.periodico?.valor) {
    alertas.push("Não foi possível identificar com segurança o nome do periódico — confira se está em destaque (negrito/itálico).");
  } else {
    acertos.push("Periódico identificado: " + c.periodico.valor + ".");
  }
  if (!c.volume?.valor && !c.numero?.valor) {
    problemas.push("Faltam volume (v.) e/ou número (n.) do periódico.");
  } else {
    if (c.volume?.valor) acertos.push("Volume presente.");
    if (c.numero?.valor) acertos.push("Número presente.");
  }
  if (!c.paginas?.valor) {
    problemas.push("Faltam as páginas do artigo (p. X-Y).");
  } else if (c.paginas?.status === "warn") {
    alertas.push("Página única identificada — confirme se há intervalo completo (p. X-Y).");
  } else {
    acertos.push("Páginas presentes.");
  }
  if (!c.ano?.valor) problemas.push("Ano ausente.");
  return { problemas, acertos, alertas };
}

function validarArtigoOnline(s, c, estrito) {
  const r = validarArtigo(s, c, estrito);
  if (!c.disponivelEm?.valor) r.problemas.push("Falta 'Disponível em:' + URL (NBR 6023:2018, 6.6).");
  else r.acertos.push("'Disponível em:' presente.");
  if (!c.acesso?.valor) r.problemas.push("Falta 'Acesso em:' + data (NBR 6023:2018, 6.6).");
  else r.acertos.push("'Acesso em:' presente.");
  if (c.doi?.valor) r.acertos.push("DOI presente — excelente prática.");
  else r.alertas.push("Considere incluir o DOI se disponível.");
  return r;
}

// Validador PubMed/NLM — referência detectada em formato biomédico/Vancouver-like
function validarPubMed(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  const pm = c._pubmed;
  if (!pm) {
    // fallback
    return { problemas: ["Falha na detecção PubMed."], acertos, alertas };
  }
  acertos.push("Referência PubMed/NLM detectada — convertida para estrutura ABNT aproximada.");
  if (pm.autores && pm.autores.length > 0) acertos.push(`${pm.autores.length} autor(es) reconhecidos.`);
  if (pm.titulo) acertos.push("Título do artigo identificado.");
  if (pm.periodicoExpandido) {
    acertos.push(`Periódico expandido por dicionário local: "${pm.periodicoAbrev}" → "${pm.periodicoExpandido}".`);
    alertas.push("Periódico expandido por dicionário local; confira o nome oficial no PubMed, NLM Catalog, Crossref ou site da revista.");
  } else if (pm.periodicoAbrev) {
    alertas.push(`Periódico abreviado "${pm.periodicoAbrev}" não encontrado no dicionário local. Confira o nome completo em PubMed, NLM Catalog, Crossref ou site da revista.`);
  }
  if (pm.volume) acertos.push(`Volume ${pm.volume} identificado.`);
  if (pm.numero) acertos.push(`Número ${pm.numero} identificado.`);
  if (pm.paginas) {
    acertos.push(`Páginas/article number identificado: ${pm.paginas}.`);
    alertas.push("Este periódico pode usar número de artigo/eLocator em vez de paginação tradicional; confira se a instituição prefere 'p.', 'e' ou outro marcador.");
  }
  if (pm.ano) acertos.push(`Ano: ${pm.ano}.`);
  if (pm.doi) acertos.push("DOI preservado.");
  if (pm.pmid) alertas.push(`PMID detectado (${pm.pmid}) — útil para rastreio, mas não substitui elementos essenciais da referência ABNT; foi removido da sugestão por padrão.`);
  if (pm.pmcid) alertas.push(`PMCID detectado (${pm.pmcid}) — mantido como nota, removido da sugestão ABNT.`);
  alertas.push("Os nomes completos dos autores não podem ser inferidos com segurança a partir das iniciais sem consulta externa.");
  return { problemas, acertos, alertas };
}

// Validador para DIRETRIZ / consenso / posicionamento de sociedade científica
function validarDiretriz(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  const temUrl = c.disponivelEm?.valor || c.url?.valor;
  const temPeriodico = c.periodico?.valor;

  // Autoria institucional
  if (c.autoria?.tipo === "juridica" || c.autoria?.tipo === "juridica-hierarquica" ||
      (c.autoria?.valor && /^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇÑ\s\-'&()]{6,}/.test(c.autoria.valor))) {
    acertos.push("Autoria institucional (sociedade científica) reconhecida.");
  } else {
    alertas.push("Autoria institucional não claramente identificada. Diretrizes geralmente são publicadas por sociedades científicas.");
  }

  // Título com palavra-chave de diretriz
  if (c.titulo?.valor) {
    acertos.push("Título da diretriz identificado.");
  } else {
    problemas.push("Título da diretriz ausente.");
  }

  // Periódico (quando publicada em revista da sociedade)
  if (temPeriodico) {
    acertos.push(`Periódico/fonte identificado: ${c.periodico.valor}.`);
  }

  // Ano
  if (c.ano?.valor) acertos.push("Ano presente.");
  else problemas.push("Ano de publicação ausente.");

  // Online: precisa de Acesso em
  if (temUrl) {
    acertos.push("URL/'Disponível em:' presente.");
    if (!c.acesso?.valor) {
      problemas.push("Falta 'Acesso em:' + data (NBR 6023:2018, 6.6) — quando há URL, este é o item obrigatório mais importante.");
    } else {
      acertos.push("'Acesso em:' presente.");
    }
  }

  // Volume/número/páginas/DOI — alertas, NÃO problemas
  if (temPeriodico) {
    const semVolume = !c.volume?.valor;
    const semNumero = !c.numero?.valor;
    const semPaginas = !c.paginas?.valor;
    const semDOI = !c.doi?.valor;
    if (semVolume || semNumero || semPaginas || semDOI) {
      alertas.push("Diretrizes publicadas em periódico podem exigir volume, número, paginação/eLocator e DOI quando esses metadados estiverem disponíveis. O validador não os inventa; confira a página do periódico ou o PDF oficial.");
    }
  }

  return { problemas, acertos, alertas };
}

function validarSite(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  const temUrl = c.disponivelEm?.valor || c.url?.valor;

  // Prioridade 1: Acesso em — quando há URL, é o item OBRIGATÓRIO mais saliente
  if (temUrl && !c.acesso?.valor) {
    problemas.push("Falta 'Acesso em:' + data (NBR 6023:2018, 6.6) — quando há URL, este é o item obrigatório mais importante.");
  } else if (c.acesso?.valor) {
    acertos.push("'Acesso em:' presente.");
  }

  // Prioridade 2: Disponível em / URL
  if (!temUrl) {
    problemas.push("Falta 'Disponível em:' + URL (NBR 6023:2018, 6.6) — obrigatório para sites.");
  } else {
    acertos.push("URL/Disponível em presente.");
  }

  // Título
  if (!c.titulo?.valor) problemas.push("Título da página ausente.");
  else acertos.push("Título presente.");

  // Autoria — alerta (sites frequentemente são anônimos ou de difícil atribuição)
  if (c.autoria?.status === "ok") acertos.push("Autor/entidade presente.");
  else alertas.push("Autoria não identificada — antes de marcar como anônimo, tente buscar o responsável pela página.");

  // Ano — alerta (sites frequentemente não datam)
  if (!c.ano?.valor) alertas.push("Ano/data de publicação não identificado — use [ano não identificado] se necessário.");
  else acertos.push("Ano presente.");

  // Para site simples: local e editora NÃO são verificados como erro.
  // Página web comum não tem "Local: Editora" como livro impresso.

  return { problemas, acertos, alertas };
}

function validarLegislacao(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (!PAT.jurisdicao.test(s) && !PAT.constituicao.test(s)) {
    problemas.push("Falta a JURISDIÇÃO no início (ex: BRASIL., SÃO PAULO., RECIFE.) — NBR 6023:2018, 7.11.1.");
  } else {
    acertos.push("Jurisdição presente.");
  }
  if (PAT.lei.test(s) || PAT.decreto.test(s) || PAT.portaria.test(s) || PAT.constituicao.test(s)) {
    acertos.push("Identificação da lei/decreto/portaria presente.");
  } else {
    alertas.push("Não foi possível identificar com segurança o tipo de ato (lei, decreto, portaria).");
  }
  if (!PAT.diarioOficial.test(s) && !PAT.disponivelEm.test(s)) {
    alertas.push("Faltam dados de publicação (Diário Oficial ou URL).");
  }
  if (PAT.disponivelEm.test(s) && !PAT.acessoEm.test(s)) {
    problemas.push("Quando há URL, 'Acesso em:' é obrigatório.");
  }
  return { problemas, acertos, alertas };
}

function validarNormaTecnica(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (PAT.abnt.test(s) || /^INTERNATIONAL ORGANIZATION FOR STANDARDIZATION/i.test(s)) {
    acertos.push("Entidade normalizadora presente.");
  } else {
    problemas.push("Falta a entidade normalizadora completa (ex: ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS).");
  }
  if (!PAT.nbr.test(s) && !PAT.iso.test(s)) {
    problemas.push("Falta o código completo da norma (ex: NBR 6023 ou ISO 9001).");
  } else {
    acertos.push("Código da norma presente.");
  }
  if (!c.ano?.valor) problemas.push("Ano da norma ausente — importante pois normas são revisadas.");
  else acertos.push("Ano da norma presente.");
  if (!c.local?.valor) alertas.push("Local de publicação não identificado.");
  return { problemas, acertos, alertas };
}

function validarTeseDissertacao(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (c.autoria?.status === "ok") acertos.push("Autor presente.");
  else problemas.push("Autor ausente.");
  if (!c.titulo?.valor) problemas.push("Título ausente.");
  else acertos.push("Título presente.");
  if (!c.ano?.valor) problemas.push("Ano de defesa/publicação ausente.");
  else acertos.push("Ano presente.");
  if (!/\([^)]+\)\s*[–-]/.test(s)) {
    alertas.push("Faltam dados de grau e área entre parênteses, ex: '(Mestrado em Saúde Coletiva) – Universidade...'");
  } else {
    acertos.push("Grau e área presentes.");
  }
  if (!/Universidade|Faculdade|Instituto/i.test(s)) {
    problemas.push("Instituição não identificada (Universidade/Faculdade/Instituto).");
  } else {
    acertos.push("Instituição presente.");
  }
  return { problemas, acertos, alertas };
}

function validarEbook(s, c, estrito) {
  const r = validarLivro(s, c, estrito);
  if (!PAT.ebook.test(s) && !PAT.ebookFormat.test(s)) {
    r.alertas.push("Marca de e-book não identificada — adicione 'E-book' ao final.");
  } else {
    r.acertos.push("Identificação de e-book presente.");
  }
  return r;
}

function validarEvento(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (!PAT.inPattern.test(s)) problemas.push("Falta o conector 'In:' antes do nome do evento.");
  else acertos.push("Conector 'In:' presente.");
  if (!PAT.anaisEvento.test(s) && !/\bAnais\b/i.test(s)) {
    alertas.push("Indique 'Anais [...]' ou 'Atas' após o evento.");
  } else {
    acertos.push("Identificação dos Anais presente.");
  }
  if (!/\b\d+\.,\s*\d{4}\b/.test(s)) {
    alertas.push("Indique o número da edição do evento e o ano (ex: '32., 2021, Online').");
  }
  if (!c.paginas?.valor) alertas.push("Páginas do trabalho ausentes.");
  return { problemas, acertos, alertas };
}

function validarInstitucional(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  const ehOnline = PAT.disponivelEm.test(s) || PAT.url.test(s);

  if (ehOnline) {
    // ── Documento institucional ONLINE ──
    // Prioridade 1: Acesso em (quando há URL, é o item mais saliente)
    const temUrl = c.disponivelEm?.valor || c.url?.valor;
    if (temUrl && !c.acesso?.valor) {
      problemas.push("Falta 'Acesso em:' + data (NBR 6023:2018, 6.6) — quando há URL, este é o item obrigatório mais importante.");
    } else if (c.acesso?.valor) {
      acertos.push("'Acesso em:' presente.");
    }

    // Prioridade 2: Disponível em / URL
    if (!temUrl) {
      problemas.push("Falta 'Disponível em:' + URL (NBR 6023:2018, 6.6).");
    } else {
      acertos.push("URL/Disponível em presente.");
    }

    // Autoria + título
    if (c.autoria?.tipo === "juridica" || c.autoria?.tipo === "juridica-hierarquica") {
      acertos.push("Entidade autora presente.");
      if (c.autoria.tipo === "juridica-hierarquica") {
        acertos.push("Hierarquia institucional reconhecida (jurisdição → órgão → unidade).");
      }
    } else {
      problemas.push("Entidade institucional não identificada como autora.");
    }
    if (!c.titulo?.valor) problemas.push("Título do documento ausente.");
    else acertos.push("Título presente.");

    // Ano — para institucional online é importante, mas trate como alerta quando
    // também faltam local/editora (sinal de página simples mais que monografia).
    const semLocal = !c.local?.valor;
    const semEditora = !c.editora?.valor;
    if (!c.ano?.valor) {
      if (semLocal && semEditora) {
        alertas.push("Ano de publicação não identificado — incerto sem consultar a fonte original.");
      } else {
        problemas.push("Ano de publicação ausente.");
      }
    } else {
      acertos.push("Ano presente.");
    }

    // Local/editora viram alertas (não problemas graves) — material online frequentemente
    // não traz esses dados de forma explícita; exigem conferência manual.
    if (semLocal) alertas.push("Local de publicação não identificado — incerto sem consultar o documento.");
    if (semEditora) alertas.push("Editora/instituição publicadora não identificada — incerto sem consultar o documento.");
  } else {
    // ── Documento institucional IMPRESSO ──
    if (c.autoria?.tipo === "juridica" || c.autoria?.tipo === "juridica-hierarquica") {
      acertos.push("Entidade autora presente.");
    } else {
      problemas.push("Entidade institucional não identificada como autora.");
    }
    if (!c.titulo?.valor) problemas.push("Título do documento ausente.");
    else acertos.push("Título presente.");
    if (!c.local?.valor) alertas.push("Local ausente.");
    if (!c.editora?.valor) alertas.push("Editora ausente.");
    if (!c.ano?.valor) problemas.push("Ano ausente.");
    else acertos.push("Ano presente.");
  }
  return { problemas, acertos, alertas };
}

function validarVerbete(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (!PAT.inPattern.test(s)) problemas.push("Falta 'In:' antes do dicionário/enciclopédia.");
  else acertos.push("Conector 'In:' presente.");
  if (!c.paginas?.valor && !/\b\d+\s*p\.\s*$/.test(s)) {
    alertas.push("Indique a página específica do verbete.");
  }
  return { problemas, acertos, alertas };
}

function validarEmail(s, c, estrito) {
  const problemas = [], acertos = [], alertas = [];
  if (!/\bDestinat[áa]rio:/i.test(s)) problemas.push("Falta 'Destinatário:' antes do nome do destinatário.");
  else acertos.push("Destinatário presente.");
  if (!/1\s*mensagem eletr[ôo]nica/i.test(s)) alertas.push("Indique '1 mensagem eletrônica' ao final.");
  return { problemas, acertos, alertas };
}

const VALIDADORES = {
  livro: validarLivro,
  capitulo: validarCapitulo,
  artigo: validarArtigo,
  "artigo-online": validarArtigoOnline,
  site: validarSite,
  legislacao: validarLegislacao,
  norma: validarNormaTecnica,
  tese: validarTeseDissertacao,
  ebook: validarEbook,
  evento: validarEvento,
  institucional: validarInstitucional,
  verbete: validarVerbete,
  email: validarEmail,
  video: validarLivro, // fallback parecido
  pubmed: validarPubMed,
  diretriz: validarDiretriz,
};

// ---------- Construir versão corrigida ----------
function construirCorrecao(s, c, tipo) {
  // Não inventa dados — apenas corrige formatações detectáveis e
  // insere marcadores ABNT padrão para o que está ausente.
  let corrigida = s;

  // 1. Corrigir edição com º/ª/°
  corrigida = corrigida.replace(/(\d+)\s*[ºª°]\s*(?:edi[çc][ãa]o|ed\.?)/gi, '$1. ed.');

  // 2. Tratamento para material ONLINE (site / institucional online / artigo online / diretriz online)
  const ehOnline = tipo === "site" || tipo === "institucional" || tipo === "artigo-online" ||
                   (tipo === "diretriz" && (PAT.disponivelEm.test(s) || PAT.url.test(s)));
  const temDisponivel = PAT.disponivelEm.test(corrigida);
  const temUrl = PAT.url.test(corrigida);
  const temAcesso = PAT.acessoEm.test(corrigida);

  if (ehOnline) {
    // 2.0. Garantir que existe PONTO antes de "Disponível em:". Sem isso,
    // qualquer marcador inserido depois ficaria emendado no título.
    corrigida = corrigida.replace(/([^.\s])(\s+Dispon[íi]vel em:)/i, "$1.$2");

    // 2a. Se tem URL mas falta "Acesso em:", adicionar no final.
    if ((temDisponivel || temUrl) && !temAcesso) {
      if (!corrigida.endsWith(".")) corrigida += ".";
      corrigida = corrigida.replace(/\.\s*$/, ". Acesso em: [dia mês ano].");
    }

    // 2a'. Se a "Acesso em:" JÁ existe, tentar normalizar a data para padrão ABNT pt-BR.
    //     Substitui apenas o trecho da data; NÃO troca por marcador genérico.
    if (temAcesso && c.acesso?.dataNormalizada && c.acesso?.textoOriginal) {
      const novoTexto = `Acesso em: ${c.acesso.dataNormalizada}`;
      // Escapar para regex
      const orig = c.acesso.textoOriginal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      corrigida = corrigida.replace(new RegExp(orig), novoTexto);
    }

    // 2b. Marcadores de dados ausentes — comportamento varia por tipo:
    //
    //   - "site" (página web simples): NÃO inserimos [S. l.: s. n.].
    //     Sites raramente têm "local de publicação" como livro impresso.
    //     Para ano, só adicionamos marcador se realmente faltar e houver "Disponível em:".
    //
    //   - "institucional": documentos institucionais online seguem a estrutura
    //     completa de uma monografia (ABNT NBR 6023:2018, 7.1 + 6.6), então
    //     fazem sentido [S. l.], [s. n.] e [ano não identificado] como marcadores.
    if (tipo === "institucional") {
      const semLocal = !c.local?.valor;
      const semEditora = !c.editora?.valor;
      const semAno = !c.ano?.valor;

      if ((semLocal || semEditora || semAno) && temDisponivel) {
        const partesBloco = [];
        if (semLocal && semEditora) {
          partesBloco.push("[S. l.: s. n.]");
        } else {
          if (semLocal) partesBloco.push("[S. l.]");
          if (semEditora) partesBloco.push("[s. n.]");
        }
        let bloco = partesBloco.join(": ");
        if (semAno) bloco += (bloco ? ", " : "") + "[ano não identificado]";
        bloco += ". ";

        if (bloco.trim() && !corrigida.includes("[S. l.") && !corrigida.includes("[ano não identificado]")) {
          corrigida = corrigida.replace(/(\.\s+)(Dispon[íi]vel em:)/i, `$1${bloco}$2`);
        }
      }
    } else if (tipo === "site") {
      // Para sites: só inserir [ano não identificado] se faltar ano.
      // Não inserir [S. l.] / [s. n.] — local/editora não são esperados para página web.
      if (!c.ano?.valor && temDisponivel &&
          !corrigida.includes("[ano não identificado]") &&
          !corrigida.includes("[data desconhecida]")) {
        corrigida = corrigida.replace(
          /(\.\s+)(Dispon[íi]vel em:)/i,
          "$1[ano não identificado]. $2"
        );
      }
    }
  } else {
    // 3. Material IMPRESSO (livro, ebook, capítulo)
    // 3a. Garantir local quando ausente em livros (e editora foi detectada)
    if ((tipo === "livro" || tipo === "ebook" || tipo === "capitulo") &&
        !c.local?.valor &&
        c.editora?.valor &&
        !corrigida.includes('[S. l.]')) {
      const editoraStr = c.editora.valor;
      const editoraEsc = editoraStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      corrigida = corrigida.replace(
        new RegExp(`(\\.\\s+)(${editoraEsc})(\\s*,\\s*c?\\d{4})`),
        '$1[S. l.]: $2$3'
      );
    }

    // 3b. Garantir editora quando ausente
    if ((tipo === "livro" || tipo === "ebook") && !c.editora?.valor && c.local?.valor && !corrigida.includes('[s. n.]')) {
      const localStr = c.local.valor;
      corrigida = corrigida.replace(
        new RegExp(`(${localStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}):\\s*,`, ''),
        '$1: [s. n.],'
      );
    }
  }

  // 4. Normalizar espaços
  corrigida = corrigida.replace(/\s+/g, ' ').trim();

  // 5. Garantir ponto final
  if (!corrigida.endsWith('.')) corrigida += '.';

  return corrigida;
}

// ---------- Regras aplicadas (citações de seções da norma) ----------
const REGRAS_NORMA = {
  autoria: { titulo: "Autoria — pessoa física", norma: "NBR 6023:2018, 8.1.1", regra: "Sobrenome em CAIXA ALTA, seguido de vírgula e prenome." },
  autoriaJuridica: { titulo: "Autoria — pessoa jurídica", norma: "NBR 6023:2018, 8.1.2", regra: "Nome em CAIXA ALTA. Para órgãos governamentais, iniciar pela jurisdição." },
  titulo: { titulo: "Título e subtítulo", norma: "NBR 6023:2018, 8.2", regra: "Título em destaque (negrito/itálico). Subtítulo separado por dois-pontos, SEM destaque." },
  edicao: { titulo: "Edição", norma: "NBR 6023:2018, 8.3", regra: "Indicada a partir da 2ª edição. Formato: '2. ed.' (não 'Xª edição')." },
  local: { titulo: "Local", norma: "NBR 6023:2018, 8.4", regra: "Cidade da publicação. Quando ausente: [S. l.]." },
  editora: { titulo: "Editora", norma: "NBR 6023:2018, 8.5", regra: "Nome da editora. Quando ausente: [s. n.]." },
  ano: { titulo: "Data", norma: "NBR 6023:2018, 8.6", regra: "Ano em algarismos arábicos. Para data incerta: [1969?], [ca. 1960], [197-], etc." },
  online: { titulo: "Documento online", norma: "NBR 6023:2018, 6.6", regra: "Sempre incluir 'Disponível em: URL. Acesso em: data.'" },
  capitulo: { titulo: "Parte de obra (capítulo)", norma: "NBR 6023:2018, 7.3", regra: "AUTOR DO CAPÍTULO. Título. In: AUTOR DO LIVRO. Título. Local: Editora, ano. p. X-Y." },
  artigo: { titulo: "Artigo de periódico", norma: "NBR 6023:2018, 7.7", regra: "Destaque no NOME DO PERIÓDICO, não no título do artigo. Volume, número, páginas e data obrigatórios." },
  legislacao: { titulo: "Legislação", norma: "NBR 6023:2018, 7.11.1", regra: "JURISDIÇÃO. Lei nº X, de DD de mês de AAAA. Ementa. Publicação." },
  norma: { titulo: "Norma técnica", norma: "NBR 6023:2018, 7.12", regra: "ENTIDADE NORMALIZADORA. Código: título. Local: Editora, ano." },
  tese: { titulo: "Trabalho acadêmico", norma: "NBR 6023:2018, 7.1", regra: "AUTOR. Título. Ano. Tipo (grau e área) – Instituição, Local, ano." },
};

// ---------- Função principal ----------
function analisarReferencia(texto, tipoHint = "auto", estrito = false) {
  if (!texto || !texto.trim()) return null;
  const s = texto.trim().replace(/\s+/g, ' ');

  // 1. Detectar tipo
  const det = tipoHint === "auto" ? detectarTipo(s) : { tipo: tipoHint, confianca: 100 };
  const tipoDetectado = det.tipo;
  let confianca = det.confianca;

  // 2. Extrair componentes
  const componentes = extrairComponentes(s);

  // 3. Validar com validador específico
  const validador = VALIDADORES[tipoDetectado] || validarLivro;
  const v = validador(s, componentes, estrito);

  // 3.1. Detectar se é material FÍSICO/IMPRESSO (sem sinais online)
  // — não cobrar "Disponível em:" / "Acesso em:" para esses casos.
  const sinaisOnline = PAT.url.test(s) || PAT.disponivelEm.test(s) || PAT.acessoEm.test(s) ||
                       /\.(com|org|gov|edu|net)\b/i.test(s) || /\bhttps?:\/\//i.test(s);
  const tiposSempreFisicos = ["livro", "capitulo", "tese", "evento", "norma", "verbete"];
  const tiposSemprOnline = ["site", "artigo-online", "ebook"];
  const ehFisico = !sinaisOnline && (
    tiposSempreFisicos.includes(tipoDetectado) ||
    (tipoDetectado === "institucional" && !sinaisOnline) ||
    (tipoDetectado === "artigo" && !sinaisOnline)
  );

  // Se é físico, garantir que NÃO há problema espúrio sobre Disponível/Acesso
  if (ehFisico) {
    v.problemas = v.problemas.filter(p => !/Dispon[íi]vel em|Acesso em|URL/i.test(p));
  }

  // 4. Pontuação
  const totalChecks = v.problemas.length + v.acertos.length + v.alertas.length;
  let pontuacao;
  if (totalChecks === 0) {
    pontuacao = 50;
  } else {
    const peso = estrito ? 18 : 12;
    pontuacao = Math.max(0, Math.min(100, 100 - v.problemas.length * peso - v.alertas.length * 4));
  }

  // Ajustar confiança se referência muito curta
  if (s.length < 40) confianca = Math.min(confianca, 40);
  if (s.length < 25) confianca = Math.min(confianca, 25);

  // 5. Status geral (5 categorias)
  let statusGeral;
  if (confianca < 35) statusGeral = "incerta";
  else if (pontuacao >= 95 && v.problemas.length === 0) statusGeral = "correta";
  else if (pontuacao >= 80) statusGeral = "provavel";
  else if (pontuacao >= 55) statusGeral = "parcial";
  else statusGeral = "incorreta";

  // 6. Sugestão corrigida
  let sugestaoCorrigida;
  if (tipoDetectado === "pubmed" && componentes._pubmed) {
    sugestaoCorrigida = pubmedParaABNT(componentes._pubmed);
  } else {
    sugestaoCorrigida = construirCorrecao(s, componentes, tipoDetectado);
  }

  // 7. Regras aplicadas (com base em problemas)
  const regrasAplicadas = [];
  if (v.problemas.some(p => /autoria/i.test(p))) regrasAplicadas.push(REGRAS_NORMA.autoria);
  if (v.problemas.some(p => /local/i.test(p))) regrasAplicadas.push(REGRAS_NORMA.local);
  if (v.problemas.some(p => /editora/i.test(p))) regrasAplicadas.push(REGRAS_NORMA.editora);
  if (v.problemas.some(p => /ano|data/i.test(p))) regrasAplicadas.push(REGRAS_NORMA.ano);
  if (v.problemas.some(p => /edição|edicao|ed\./i.test(p))) regrasAplicadas.push(REGRAS_NORMA.edicao);
  if (v.problemas.some(p => /Dispon|Acesso|URL/i.test(p))) regrasAplicadas.push(REGRAS_NORMA.online);
  if (tipoDetectado === "capitulo") regrasAplicadas.push(REGRAS_NORMA.capitulo);
  if (tipoDetectado === "artigo" || tipoDetectado === "artigo-online" || tipoDetectado === "pubmed") regrasAplicadas.push(REGRAS_NORMA.artigo);
  if (tipoDetectado === "legislacao") regrasAplicadas.push(REGRAS_NORMA.legislacao);
  if (tipoDetectado === "norma") regrasAplicadas.push(REGRAS_NORMA.norma);
  if (tipoDetectado === "tese") regrasAplicadas.push(REGRAS_NORMA.tese);

  // 8. Explicação geral
  let explicacaoGeral;
  if (tipoDetectado === "pubmed") {
    explicacaoGeral = "Referência PubMed/NLM detectada: o PubMed fornece uma citação em estilo biomédico/NLM, não em ABNT. O validador converte os elementos disponíveis para uma estrutura ABNT aproximada. Nomes completos de autores e periódico exigem metadados externos ou dicionário local confiável.";
  } else if (statusGeral === "correta") {
    explicacaoGeral = `A referência é formalmente compatível com a NBR 6023:2018 para ${tipoDetectado}. Confira destaque tipográfico (negrito/itálico) e veracidade dos dados manualmente.`;
  } else if (statusGeral === "provavel") {
    explicacaoGeral = `A referência é provavelmente compatível como ${tipoDetectado}, com pequenos ajustes ou alertas a revisar.`;
  } else if (statusGeral === "parcial") {
    explicacaoGeral = `A estrutura é parcialmente compatível com ${tipoDetectado}, mas há ${v.problemas.length} item(ns) a corrigir.`;
  } else if (statusGeral === "incerta") {
    explicacaoGeral = `Diagnóstico incerto. A referência parece incompleta ou ambígua — exige conferência manual com a fonte original e a norma.`;
  } else {
    explicacaoGeral = `Referência estruturalmente problemática. Recomenda-se reescrever conforme NBR 6023:2018.`;
  }

  return {
    tipoDetectado, confianca, statusGeral, pontuacao,
    problemas: v.problemas, acertos: v.acertos, alertas: v.alertas,
    componentes, sugestaoCorrigida, explicacaoGeral, regrasAplicadas,
    referenciaOriginal: s,
    ehFisico,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// VALIDADOR — UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const TIPOS_DOC_VALIDADOR = [
  { id: "auto", label: "Detectar automaticamente", icone: "🪄" },
  { id: "livro", label: "Livro", icone: "📚" },
  { id: "capitulo", label: "Capítulo de livro", icone: "📖" },
  { id: "artigo", label: "Artigo de periódico", icone: "📰" },
  { id: "artigo-online", label: "Artigo online", icone: "🌐" },
  { id: "site", label: "Site / página", icone: "🔗" },
  { id: "legislacao", label: "Legislação", icone: "⚖️" },
  { id: "norma", label: "Norma técnica", icone: "📐" },
  { id: "ebook", label: "E-book", icone: "📱" },
  { id: "tese", label: "Tese / dissertação", icone: "🎓" },
  { id: "evento", label: "Trabalho em evento", icone: "🎤" },
  { id: "institucional", label: "Doc. institucional", icone: "🏛️" },
  { id: "verbete", label: "Verbete", icone: "📔" },
  { id: "email", label: "E-mail / mensagem", icone: "✉️" },
  // pubmed não aparece no seletor manual — é uma classificação automática.
  // Mantida no array apenas para o label aparecer no banner do resultado.
  { id: "pubmed", label: "Artigo PubMed/NLM (convertido para ABNT)", icone: "🧬" },
  { id: "diretriz", label: "Diretriz / consenso de sociedade científica", icone: "🩺" },
];

const STATUS_VALIDADOR = {
  correta: { label: "Formalmente compatível", color: t.green, dot: t.green, icone: "✅" },
  provavel: { label: "Provavelmente compatível", color: t.green, dot: t.green, icone: "👍" },
  parcial: { label: "Parcialmente compatível", color: t.yellow, dot: t.yellow, icone: "⚠️" },
  incorreta: { label: "Estruturalmente problemática", color: t.red, dot: t.red, icone: "❌" },
  incerta: { label: "Incerta — exige conferência manual", color: t.purple, dot: t.purple, icone: "❓" },
};

const COMPONENTES_LABELS = {
  autoria: { label: "Autoria", icone: "👤" },
  titulo: { label: "Título", icone: "📖" },
  subtitulo: { label: "Subtítulo", icone: "📝" },
  edicao: { label: "Edição", icone: "🔢" },
  local: { label: "Local", icone: "📍" },
  editora: { label: "Editora", icone: "🏢" },
  ano: { label: "Ano", icone: "📅" },
  volume: { label: "Volume", icone: "📚" },
  numero: { label: "Número", icone: "#️⃣" },
  paginas: { label: "Páginas", icone: "📄" },
  periodico: { label: "Periódico", icone: "📰" },
  doi: { label: "DOI", icone: "🔗" },
  url: { label: "URL", icone: "🌐" },
  disponivelEm: { label: "Disponível em", icone: "🔗" },
  acesso: { label: "Acesso em", icone: "📅" },
  isbn: { label: "ISBN", icone: "🔖" },
  issn: { label: "ISSN", icone: "🔖" },
};

const COMP_STATUS_LABELS = {
  ok: { label: "Correto", color: t.green, icone: "✓" },
  warn: { label: "Atenção", color: t.yellow, icone: "⚠" },
  error: { label: "Erro", color: t.red, icone: "✗" },
  missing: { label: "Ausente", color: t.textFaint, icone: "—" },
  na: { label: "N/A", color: t.textFaint, icone: "·" },
};

// Score ring SVG
function ScoreRing({ value, color = t.blue, size = 130 }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={t.border} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: "stroke-dasharray 600ms ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {Math.round(value)}
          <span style={{ fontSize: 14, color: t.textFaint, fontWeight: 400 }}>/100</span>
        </div>
        <div style={{ fontSize: 9, color: color, marginTop: 4, letterSpacing: "0.1em", fontWeight: 700 }}>
          CONFORMIDADE
        </div>
      </div>
    </div>
  );
}

// Exemplos testáveis
const EXEMPLOS_VALIDADOR = [
  { tipo: "livro", label: "✅ Livro correto", texto: "GIL, Antonio Carlos. Como elaborar projetos de pesquisa. 6. ed. São Paulo: Atlas, 2017." },
  { tipo: "livro", label: "❌ Livro com erro", texto: "Antonio Carlos Gil. Como elaborar projetos de pesquisa. Atlas, 2017, 6ª edição, São Paulo." },
  { tipo: "livro", label: "⚠️ Livro sem local", texto: "SILVA, João. Fundamentos de epidemiologia. Atlas, 2020." },
  { tipo: "capitulo", label: "✅ Capítulo correto", texto: "SANTOS, Maria. A pesquisa qualitativa em educação. In: ALVES, João (org.). Métodos de pesquisa em ciências humanas. 2. ed. Rio de Janeiro: Vozes, 2020. p. 45-72." },
  { tipo: "artigo", label: "✅ Artigo correto", texto: "FREITAS, Carla; LIMA, Pedro. Letramento digital na universidade. Educação & Sociedade, Campinas, v. 41, n. 3, p. 112-130, jul./set. 2020." },
  { tipo: "artigo", label: "⚠️ Artigo sem páginas", texto: "FREITAS, Carla; LIMA, Pedro. Letramento digital na universidade. Educação & Sociedade, Campinas, v. 41, n. 3, 2020." },
  { tipo: "artigo-online", label: "✅ Artigo online completo", texto: "MENDES, Rafael. Inteligência artificial na educação básica. Revista Brasileira de Informática na Educação, v. 30, p. 1-18, 2022. DOI: 10.5753/rbie.2022.30.01. Disponível em: https://www.br-ie.org/pub/index.php/rbie/article/view/123. Acesso em: 10 mar. 2024." },
  { tipo: "site", label: "⚠️ Site sem acesso", texto: "INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA. Censo demográfico 2022. Brasília: IBGE, 2023. Disponível em: https://www.ibge.gov.br/censo2022." },
  { tipo: "legislacao", label: "✅ Lei correta", texto: "BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Dispõe sobre a proteção de dados pessoais. Diário Oficial da União: seção 1, Brasília, DF, ano 155, n. 157, p. 59, 15 ago. 2018." },
  { tipo: "norma", label: "✅ Norma técnica correta", texto: "ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 6023: informação e documentação: referências: elaboração. Rio de Janeiro: ABNT, 2018." },
  { tipo: "tese", label: "✅ Tese correta", texto: "OLIVEIRA, Beatriz Souza. A formação docente em tempos de pandemia. 2022. 187 f. Tese (Doutorado em Educação) – Faculdade de Educação, Universidade de São Paulo, São Paulo, 2022." },
  { tipo: "ebook", label: "✅ E-book correto", texto: "PEREIRA, Luís. Filosofia da mente: uma introdução. São Paulo: Editora UNESP, 2019. E-book. ISBN 978-85-393-0789-2." },
];

// localStorage helpers
const VALIDADOR_STORAGE = "abnt-validador-historico-v1";
const carregarHistorico = () => {
  try {
    return JSON.parse(localStorage.getItem(VALIDADOR_STORAGE) || "[]");
  } catch {
    return [];
  }
};
const salvarHistorico = (arr) => {
  try {
    localStorage.setItem(VALIDADOR_STORAGE, JSON.stringify(arr.slice(0, 10)));
  } catch {}
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: VALIDADOR
// ═══════════════════════════════════════════════════════════════════════════

function ModuleValidadorABNT() {
  const [input, setInput] = useState("");
  const [tipo, setTipo] = useState("auto");
  const [resultado, setResultado] = useState(null);
  const [aba, setAba] = useState("diagnostico");
  const [historico, setHistorico] = useState(carregarHistorico);
  const [painelLateral, setPainelLateral] = useState("exemplos");
  const [modoProfessor, setModoProfessor] = useState(false);
  const [modoEstrito, setModoEstrito] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [avisoEntrada, setAvisoEntrada] = useState("");

  // IA híbrida (V2) — desabilitada na versão atual (mantida para reativação futura)
  const [iaCarregando, setIaCarregando] = useState(false);
  const [iaResultado, setIaResultado] = useState(null);
  const [iaErro, setIaErro] = useState(null);
  const [iaCopiado, setIaCopiado] = useState(false);
  /* eslint-disable no-unused-vars */
  // Os estados acima ficam declarados para que as funções refinarComIA() e
  // copiarSugestaoIA() não quebrem por referência a setters inexistentes.
  // Quando o recurso for reativado, basta restaurar a UI do bloco "REFINAMENTO COM IA".
  void iaCarregando; void iaResultado; void iaErro; void iaCopiado;
  /* eslint-enable no-unused-vars */

  const LIMITE_CARACTERES = 3000;
  const LIMITE_HISTORICO = 10;

  const analisar = () => {
    setAvisoEntrada("");
    const texto = (input || "").trim();
    if (!texto) {
      setAvisoEntrada("⚠️ Cole uma referência antes de analisar.");
      setResultado(null);
      return;
    }
    if (texto.length > LIMITE_CARACTERES) {
      setAvisoEntrada(`⚠️ A referência tem ${texto.length} caracteres. O limite é ${LIMITE_CARACTERES}. Verifique se você não colou um trecho longo demais.`);
      setResultado(null);
      return;
    }
    const r = analisarReferencia(texto, tipo, modoEstrito);
    if (!r) {
      setAvisoEntrada("⚠️ Não foi possível analisar essa entrada.");
      setResultado(null);
      return;
    }
    setResultado(r);
    setAba("diagnostico");
    // Resetar painel da IA — análise nova significa começar do zero
    setIaResultado(null);
    setIaErro(null);
    setIaCarregando(false);
    // Histórico
    const entry = {
      id: Date.now(),
      ts: new Date().toISOString(),
      referencia: r.referenciaOriginal,
      tipoDetectado: r.tipoDetectado,
      pontuacao: r.pontuacao,
      statusGeral: r.statusGeral,
      sugestaoCorrigida: r.sugestaoCorrigida,
    };
    const novo = [entry, ...historico.filter((h) => h.referencia !== r.referenciaOriginal)].slice(0, LIMITE_HISTORICO);
    setHistorico(novo);
    salvarHistorico(novo);
  };

  const limpar = () => {
    setInput("");
    setResultado(null);
    setTipo("auto");
    setAvisoEntrada("");
    setIaResultado(null);
    setIaErro(null);
    setIaCarregando(false);
  };

  const copiarCorrigida = () => {
    if (!resultado) return;
    navigator.clipboard.writeText(resultado.sugestaoCorrigida).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  const usarExemplo = (ex) => {
    setInput(ex.texto);
    setTipo("auto");
    setResultado(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removerHistorico = (id) => {
    const novo = historico.filter((h) => h.id !== id);
    setHistorico(novo);
    salvarHistorico(novo);
  };

  const limparHistorico = () => {
    setHistorico([]);
    salvarHistorico([]);
  };

  const reanalisar = (h) => {
    setInput(h.referencia);
    setTipo("auto");
    setResultado(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const r = analisarReferencia(h.referencia, "auto", modoEstrito);
      setResultado(r);
    }, 100);
  };

  // ───── V2: Refinar com IA via Netlify Function ─────
  const refinarComIA = async () => {
    if (!resultado) return;
    setIaCarregando(true);
    setIaErro(null);
    setIaResultado(null);
    try {
      const resp = await fetch("/.netlify/functions/analisar-abnt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenciaOriginal: resultado.referenciaOriginal,
          tipoSelecionado: tipo,
          resultadoLocal: {
            tipoDetectado: resultado.tipoDetectado,
            statusGeral: resultado.statusGeral,
            pontuacao: resultado.pontuacao,
            confianca: resultado.confianca,
            problemas: resultado.problemas,
            acertos: resultado.acertos,
            alertas: resultado.alertas,
            sugestaoCorrigida: resultado.sugestaoCorrigida,
          },
          modoProfessor,
          modoEstrito,
        }),
      });

      if (!resp.ok) {
        let errData = {};
        try { errData = await resp.json(); } catch {}
        if (resp.status === 404) {
          setIaErro({
            tipo: "nao_implantado",
            msg: "A função serverless não foi encontrada (404). Verifique se o backend está implantado no Netlify.",
          });
        } else if (resp.status === 503 || errData.codigo === "CHAVE_NAO_CONFIGURADA") {
          setIaErro({
            tipo: "sem_chave",
            msg: errData.mensagem || "A análise por IA não está configurada neste servidor (chave ANTHROPIC_API_KEY ausente).",
          });
        } else if (resp.status === 400) {
          setIaErro({
            tipo: "requisicao",
            msg: errData.mensagem || "Requisição inválida.",
          });
        } else if (resp.status === 502) {
          setIaErro({
            tipo: "indisponivel",
            msg: errData.mensagem || "A IA respondeu, mas a resposta não pôde ser interpretada. A análise local continua disponível.",
          });
        } else {
          setIaErro({
            tipo: "erro",
            msg: errData.mensagem || "Não foi possível acessar a IA. A análise local continua disponível.",
          });
        }
        return;
      }

      const data = await resp.json();
      if (!data || typeof data !== "object") {
        setIaErro({ tipo: "resposta_invalida", msg: "Resposta da IA em formato inválido." });
        return;
      }
      setIaResultado(data);

      // Adicionar marcador no histórico de que essa referência teve análise por IA
      const refOriginal = resultado.referenciaOriginal;
      setHistorico((prev) => {
        const novo = prev.map((h) =>
          h.referencia === refOriginal ? { ...h, refinadoComIA: true } : h
        );
        salvarHistorico(novo);
        return novo;
      });
    } catch (e) {
      setIaErro({
        tipo: "rede",
        msg: "Falha de rede. Não foi possível acessar a IA. A análise local continua disponível.",
      });
    } finally {
      setIaCarregando(false);
    }
  };

  const copiarSugestaoIA = () => {
    if (!iaResultado?.sugestaoCorrigida) return;
    navigator.clipboard.writeText(iaResultado.sugestaoCorrigida).catch(() => {});
    setIaCopiado(true);
    setTimeout(() => setIaCopiado(false), 1500);
  };

  const statusMeta = resultado ? STATUS_VALIDADOR[resultado.statusGeral] : null;
  const tipoLabel = resultado
    ? TIPOS_DOC_VALIDADOR.find((x) => x.id === resultado.tipoDetectado)?.label || resultado.tipoDetectado
    : "";

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${t.blueSoft}, ${t.purpleSoft})`,
          border: `1px solid ${t.blue}33`,
          borderRadius: 16,
          padding: "22px 22px",
          marginBottom: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            background: t.purple + "11",
            borderRadius: "50%",
            border: `1px solid ${t.purple}22`,
          }}
        />
        <Badge color={t.blue}>🔬 Análise local · 100% offline</Badge>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: t.text,
            margin: "10px 0 8px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Validador ABNT Inteligente
        </h1>
        <p style={{ color: t.textMuted, fontSize: 13, margin: 0, lineHeight: 1.6, maxWidth: 540 }}>
          Cole sua referência. Receba diagnóstico componente a componente, regras aplicadas e versão
          corrigida. Tudo processado no seu navegador — sem servidor, sem API.
        </p>
      </div>

      {/* NOTA FIXA — conformidade formal vs veracidade bibliográfica */}
      <Note type="warn">
        Este validador faz uma análise automatizada de padrões formais da ABNT. Ele <b>não confirma se os dados bibliográficos são verdadeiros</b> — não verifica se o autor, título, ano, editora ou DOI correspondem à obra real. Em referências ambíguas, consulte a fonte original e a norma.
      </Note>

      {/* INPUT CARD */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 10 }}>
          <SubTitle>📥 Referência a analisar</SubTitle>
          <button
            onClick={limpar}
            style={{
              fontSize: 11,
              color: t.textMuted,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            🗑️ Limpar
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); if (avisoEntrada) setAvisoEntrada(""); }}
          placeholder="Ex.: SILVA, João. Fundamentos de epidemiologia. São Paulo: Atlas, 2020."
          rows={4}
          style={{
            width: "100%",
            background: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            padding: "12px 14px",
            color: t.text,
            fontSize: 13.5,
            lineHeight: 1.6,
            fontFamily: "'Source Serif 4', Georgia, serif",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") analisar();
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: t.textFaint }}>
          <span style={{ color: input.length > LIMITE_CARACTERES ? t.red : t.textFaint }}>
            {input.length} / {LIMITE_CARACTERES} caracteres
          </span>
          <span>⌘/Ctrl + Enter para analisar</span>
        </div>

        {avisoEntrada && (
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: t.yellowSoft,
              border: `1px solid ${t.yellow}55`,
              borderLeft: `3px solid ${t.yellow}`,
              borderRadius: 7,
              fontSize: 12,
              color: t.text,
              lineHeight: 1.5,
            }}
          >
            {avisoEntrada}
          </div>
        )}

        {/* TYPE SELECTOR */}
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
            Tipo do documento
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {TIPOS_DOC_VALIDADOR.filter(td => td.id !== "pubmed" && td.id !== "diretriz").map((td) => {
              const ativo = tipo === td.id;
              return (
                <button
                  key={td.id}
                  onClick={() => setTipo(td.id)}
                  style={{
                    padding: "5px 11px",
                    background: ativo ? t.blueSoft : t.surfaceAlt,
                    color: ativo ? t.blue : t.textMuted,
                    border: `1px solid ${ativo ? t.blue + "66" : t.border}`,
                    borderRadius: 7,
                    fontSize: 11,
                    fontWeight: ativo ? 700 : 400,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span>{td.icone}</span>
                  {td.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MODOS */}
        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { v: modoProfessor, set: setModoProfessor, label: "👨‍🏫 Modo professor", desc: "Explicações com miniaulas" },
            { v: modoEstrito, set: setModoEstrito, label: "🎯 Modo estrito", desc: "Penalização mais severa" },
          ].map((m, i) => (
            <button
              key={i}
              onClick={() => m.set(!m.v)}
              style={{
                padding: "8px 12px",
                background: m.v ? t.purpleSoft : t.surfaceAlt,
                border: `1px solid ${m.v ? t.purple : t.border}`,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: m.v ? t.purple : t.text }}>
                {m.v ? "✓ " : ""}{m.label}
              </span>
              <span style={{ fontSize: 10, color: t.textMuted }}>{m.desc}</span>
            </button>
          ))}
        </div>

        {/* ANALYZE BUTTON */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12 }}>
          <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.5, flex: 1 }}>
            ℹ️ Análise didática. Para casos ambíguos, consulte a norma original.
          </div>
          <button
            onClick={analisar}
            disabled={!input.trim()}
            style={{
              padding: "10px 20px",
              background: input.trim() ? t.blue : t.surfaceAlt,
              color: input.trim() ? "#fff" : t.textFaint,
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              boxShadow: input.trim() ? `0 8px 24px -8px ${t.blue}88` : "none",
            }}
          >
            🔍 Analisar referência
          </button>
        </div>
      </Card>

      {/* RESULT */}
      {resultado && statusMeta && (
        <>
          {/* STATUS BANNER */}
          <Card
            color={statusMeta.color}
            glow
            style={{ marginBottom: 14 }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <ScoreRing value={resultado.pontuacao} color={statusMeta.color} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                  <span
                    style={{
                      padding: "3px 8px",
                      background: t.cyan + "22",
                      color: t.cyan,
                      border: `1px solid ${t.cyan}55`,
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                    }}
                  >
                    🖥️ LOCAL
                  </span>
                  <span
                    style={{
                      padding: "3px 8px",
                      background: statusMeta.color + "22",
                      color: statusMeta.color,
                      border: `1px solid ${statusMeta.color}55`,
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {statusMeta.icone} {statusMeta.label}
                  </span>
                  <span
                    style={{
                      padding: "3px 8px",
                      background: t.surfaceAlt,
                      color: t.textMuted,
                      border: `1px solid ${t.border}`,
                      borderRadius: 6,
                      fontSize: 11,
                      fontFamily: "monospace",
                    }}
                  >
                    📦 {tipoLabel}
                  </span>
                  <span
                    style={{
                      padding: "3px 8px",
                      background: t.surfaceAlt,
                      color: t.textMuted,
                      border: `1px solid ${t.border}`,
                      borderRadius: 6,
                      fontSize: 11,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    📊 Confiança: <b>{resultado.confianca}%</b>
                  </span>
                </div>
                <div style={{ fontWeight: 700, color: t.text, fontSize: 15, marginBottom: 4, lineHeight: 1.4 }}>
                  {resultado.explicacaoGeral}
                </div>
                {resultado.confianca < 50 && (
                  <div style={{ fontSize: 12, color: t.yellow, marginTop: 4 }}>
                    ⚠️ Confiança baixa — recomenda-se conferência manual com a norma.
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* CORRECTED VERSION */}
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 10 }}>
              <SubTitle color={t.green}>✨ Versão corrigida (provável)</SubTitle>
              <button
                onClick={copiarCorrigida}
                style={{
                  padding: "4px 10px",
                  background: copiado ? t.green : "transparent",
                  color: copiado ? "#000" : t.green,
                  border: `1px solid ${t.green}55`,
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {copiado ? "✅ Copiado" : "📋 Copiar"}
              </button>
            </div>
            <div
              style={{
                background: t.greenSoft,
                border: `1px solid ${t.green}33`,
                borderRadius: 10,
                padding: "12px 14px",
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 14,
                color: t.text,
                lineHeight: 1.7,
              }}
            >
              {resultado.sugestaoCorrigida}
            </div>
            <Note type="info">
              Esta correção aplica apenas ajustes <b>detectáveis</b> (edição, formatos, marcadores [S. l.] / [s. n.]). Dados ausentes <b>não são inventados</b> — confirme com a fonte original.
            </Note>
            {/\[(?:S\.\s*l\.|s\.\s*n\.|ano não identificado|dia mês ano|data desconhecida)\]/.test(resultado.sugestaoCorrigida || "") && (
              <Note type="tip">
                <b>Sobre os marcadores:</b> elementos como <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>[ano não identificado]</code>, <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>[S. l.]</code>, <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>[s. n.]</code> e <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>[dia mês ano]</code> são <b>marcadores didáticos</b> que sinalizam dados ausentes. Eles indicam o que precisa ser conferido na fonte original e substituídos antes de colar a referência no trabalho final.
              </Note>
            )}
            {resultado.ehFisico && (
              <Note type="info">
                Como a referência não apresenta URL ou indicação de acesso online, presume-se material <b>físico/impresso</b>; nesse caso, <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>Disponível em:</code> e <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>Acesso em:</code> não são obrigatórios.
              </Note>
            )}
            {resultado.tipoDetectado === "pubmed" && (
              <Note type="warn">
                <b>Referência PubMed/NLM detectada.</b> O PubMed fornece citação em estilo biomédico/NLM, não ABNT. Os elementos disponíveis foram convertidos para uma estrutura ABNT aproximada. <b>Nomes completos de autores</b> e <b>nome oficial do periódico</b> exigem consulta externa (PubMed, NLM Catalog, Crossref) — não são inferidos a partir das iniciais.
              </Note>
            )}
            {resultado.tipoDetectado === "diretriz" && (
              <Note type="info">
                <b>🩺 Diretriz / consenso de sociedade científica detectada.</b> Esses documentos costumam ser publicados em periódicos da própria sociedade (ex: SBC → Arquivos Brasileiros de Cardiologia). Volume, número, paginação/eLocator e DOI, quando disponíveis no PDF oficial, devem ser incluídos para uma referência completa — o validador não os inventa.
              </Note>
            )}
            {(resultado.tipoDetectado === "livro" || resultado.tipoDetectado === "capitulo") && (
              <Note type="tip">
                <b>📚 Livro inteiro ou capítulo?</b>
                <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.65, color: t.textMuted }}>
                  Use referência de <b>livro inteiro</b> quando a obra inteira foi usada como fonte. Use referência de <b>capítulo</b> quando a informação veio de um capítulo específico, especialmente quando o capítulo tem autoria própria ou a obra é organizada por editores/organizadores. Nesse caso, a estrutura deve incluir <code style={{ background: t.bg, padding: "1px 4px", borderRadius: 3, fontFamily: "monospace", fontSize: 11 }}>In:</code> e a página inicial e final do capítulo.
                </div>
                <div style={{ marginTop: 10, padding: "8px 10px", background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontSize: 11.5, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}>
                  <div style={{ color: t.green, fontWeight: 700, fontSize: 10, marginBottom: 3, fontFamily: "system-ui" }}>LIVRO INTEIRO</div>
                  SILVA, João. Fundamentos de epidemiologia. São Paulo: Atlas, 2020.
                </div>
                <div style={{ marginTop: 6, padding: "8px 10px", background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontSize: 11.5, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}>
                  <div style={{ color: t.purple, fontWeight: 700, fontSize: 10, marginBottom: 3, fontFamily: "system-ui" }}>CAPÍTULO DE LIVRO</div>
                  SILVA, João. Rastreamento em saúde coletiva. <b>In:</b> PEREIRA, Ana (org.). Fundamentos de epidemiologia. São Paulo: Atlas, 2020. p. 45-62.
                </div>
                <div style={{ marginTop: 6, padding: "8px 10px", background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontSize: 11.5, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}>
                  <div style={{ color: t.cyan, fontWeight: 700, fontSize: 10, marginBottom: 3, fontFamily: "system-ui" }}>CAPÍTULO COM EDITORES</div>
                  AUTOR DO CAPÍTULO. Título do capítulo. <b>In:</b> EDITOR, Nome; EDITOR, Nome (ed.). Título do livro. Local: Editora, ano. p. xx-yy.
                </div>
              </Note>
            )}
          </Card>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "diagnostico", label: "🔬 Diagnóstico", count: Object.keys(resultado.componentes).length },
              { id: "problemas", label: "⚠️ O que corrigir", count: resultado.problemas.length },
              { id: "regras", label: "📜 Regras", count: resultado.regrasAplicadas.length },
              { id: "comparacao", label: "🔄 Comparação" },
            ].map((t2) => {
              const ativo = aba === t2.id;
              return (
                <button
                  key={t2.id}
                  onClick={() => setAba(t2.id)}
                  style={{
                    padding: "7px 12px",
                    background: ativo ? t.surfaceAlt : "transparent",
                    color: ativo ? t.text : t.textMuted,
                    border: "none",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: ativo ? 700 : 400,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {t2.label}
                  {typeof t2.count === "number" && (
                    <span
                      style={{
                        fontSize: 10,
                        padding: "1px 6px",
                        background: ativo ? t.blue + "33" : t.border,
                        color: ativo ? t.blue : t.textMuted,
                        borderRadius: 4,
                      }}
                    >
                      {t2.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB: DIAGNÓSTICO */}
          {aba === "diagnostico" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              {Object.entries(resultado.componentes).map(([compId, comp]) => {
                const meta = COMPONENTES_LABELS[compId] || { label: compId, icone: "📦" };
                const stMeta = COMP_STATUS_LABELS[comp.status] || COMP_STATUS_LABELS.na;
                return (
                  <div
                    key={compId}
                    style={{
                      background: t.surface,
                      border: `1px solid ${stMeta.color}33`,
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{meta.icone}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{meta.label}</span>
                      </div>
                      <span
                        style={{
                          padding: "2px 7px",
                          background: stMeta.color + "22",
                          color: stMeta.color,
                          border: `1px solid ${stMeta.color}44`,
                          borderRadius: 5,
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {stMeta.icone} {stMeta.label}
                      </span>
                    </div>
                    {comp.valor && (
                      <div
                        style={{
                          fontSize: 11,
                          color: t.textMuted,
                          fontFamily: "monospace",
                          background: t.bg,
                          padding: "5px 8px",
                          borderRadius: 5,
                          border: `1px solid ${t.border}`,
                          marginBottom: 6,
                          wordBreak: "break-word",
                        }}
                      >
                        {comp.valor}
                      </div>
                    )}
                    {comp.problema && (
                      <div style={{ fontSize: 11, color: t.red, lineHeight: 1.5 }}>
                        ❌ {comp.problema}
                      </div>
                    )}
                    {comp.explicacao && (
                      <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.5 }}>
                        💡 {comp.explicacao}
                      </div>
                    )}
                    {comp.sugestao && (
                      <div
                        style={{
                          marginTop: 6,
                          padding: "5px 8px",
                          background: t.greenSoft,
                          border: `1px solid ${t.green}33`,
                          borderRadius: 5,
                          fontSize: 11,
                          color: t.green,
                          fontFamily: "monospace",
                        }}
                      >
                        → {comp.sugestao}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: PROBLEMAS / ACERTOS */}
          {aba === "problemas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {resultado.problemas.length > 0 && (
                <Card color={t.red}>
                  <SubTitle color={t.red}>❌ O que precisa corrigir ({resultado.problemas.length})</SubTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {resultado.problemas.map((p, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "10px 12px",
                          background: t.redSoft,
                          border: `1px solid ${t.red}33`,
                          borderRadius: 8,
                          fontSize: 13,
                          color: t.text,
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: t.red, fontWeight: 700 }}>{i + 1}.</span> {p}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {resultado.alertas.length > 0 && (
                <Card color={t.yellow}>
                  <SubTitle color={t.yellow}>⚠️ Alertas ({resultado.alertas.length})</SubTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {resultado.alertas.map((a, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "10px 12px",
                          background: t.yellowSoft,
                          border: `1px solid ${t.yellow}33`,
                          borderRadius: 8,
                          fontSize: 13,
                          color: t.text,
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: t.yellow, fontWeight: 700 }}>{i + 1}.</span> {a}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {resultado.acertos.length > 0 && (
                <Card color={t.green}>
                  <SubTitle color={t.green}>✅ O que está correto ({resultado.acertos.length})</SubTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {resultado.acertos.map((a, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "8px 12px",
                          background: t.greenSoft,
                          border: `1px solid ${t.green}33`,
                          borderRadius: 7,
                          fontSize: 12,
                          color: t.text,
                          lineHeight: 1.5,
                        }}
                      >
                        ✓ {a}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {resultado.problemas.length === 0 && resultado.alertas.length === 0 && (
                <Note type="success">
                  🎉 Nenhum problema estrutural detectado! Apenas confira destaque tipográfico (negrito/itálico) e pontuação manual.
                </Note>
              )}
            </div>
          )}

          {/* TAB: REGRAS */}
          {aba === "regras" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {resultado.regrasAplicadas.length === 0 ? (
                <Note type="info">Não foram acionadas regras específicas nesta análise. A referência parece atender aos elementos essenciais.</Note>
              ) : (
                resultado.regrasAplicadas.map((r, i) => (
                  <Card key={i} color={t.blue}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>⚖️</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, color: t.text, fontSize: 13 }}>{r.titulo}</span>
                          <span
                            style={{
                              padding: "2px 7px",
                              background: t.blueSoft,
                              color: t.blue,
                              border: `1px solid ${t.blue}44`,
                              borderRadius: 5,
                              fontSize: 10,
                              fontFamily: "monospace",
                              fontWeight: 700,
                            }}
                          >
                            {r.norma}
                          </span>
                        </div>
                        <div style={{ fontSize: 12.5, color: t.textMuted, lineHeight: 1.6 }}>{r.regra}</div>
                        {modoProfessor && (
                          <div
                            style={{
                              marginTop: 8,
                              padding: "8px 10px",
                              background: t.purpleSoft,
                              border: `1px solid ${t.purple}33`,
                              borderRadius: 6,
                              fontSize: 11.5,
                              color: t.text,
                              lineHeight: 1.5,
                            }}
                          >
                            <b style={{ color: t.purple }}>👨‍🏫 Miniaula:</b> esta regra existe porque a ABNT define elementos mínimos para rastreabilidade da obra. Sem esses elementos, o leitor não consegue localizar a fonte original.
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* TAB: COMPARAÇÃO */}
          {aba === "comparacao" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
              <Card color={t.red}>
                <SubTitle color={t.red}>📥 Original (colado por você)</SubTitle>
                <div
                  style={{
                    padding: "12px 14px",
                    background: t.redSoft,
                    border: `1px solid ${t.red}33`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: t.text,
                    lineHeight: 1.7,
                  }}
                >
                  {resultado.referenciaOriginal}
                </div>
              </Card>
              <Card color={t.green}>
                <SubTitle color={t.green}>📤 Versão sugerida (após correções automáticas)</SubTitle>
                <div
                  style={{
                    padding: "12px 14px",
                    background: t.greenSoft,
                    border: `1px solid ${t.green}33`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: t.text,
                    lineHeight: 1.7,
                  }}
                >
                  {resultado.sugestaoCorrigida}
                </div>
              </Card>
            </div>
          )}
        </>
      )}

      {/* ───── REFINAMENTO COM IA: oculto na versão atual ─────
          O recurso de IA foi temporariamente desabilitado para manter o site
          100% local e gratuito. A função serverless e a lógica permanecem
          no projeto, prontas para reativação futura. */}
      {resultado && (
        <Card style={{ marginTop: 18, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                fontSize: 18,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
                borderRadius: 8,
              }}
            >
              🔮
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: "0.04em" }}>
                REFINAMENTO COM IA
              </div>
              <div style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.5, marginTop: 2 }}>
                Recurso opcional futuro. A versão atual usa análise local gratuita por regras.
              </div>
            </div>
          </div>
        </Card>
      )}


      {/* SIDE PANEL: EXEMPLOS E HISTÓRICO */}
      <Card style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: t.surfaceAlt,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {[
            { id: "exemplos", label: "📚 Exemplos", count: EXEMPLOS_VALIDADOR.length },
            { id: "historico", label: "🕒 Histórico", count: historico.length },
          ].map((p) => {
            const ativo = painelLateral === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPainelLateral(p.id)}
                style={{
                  flex: 1,
                  padding: "7px 12px",
                  background: ativo ? t.bg : "transparent",
                  color: ativo ? t.text : t.textMuted,
                  border: "none",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: ativo ? 700 : 400,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                {p.label}
                <span
                  style={{
                    fontSize: 10,
                    padding: "1px 5px",
                    background: ativo ? t.blueSoft : t.border,
                    color: ativo ? t.blue : t.textMuted,
                    borderRadius: 4,
                  }}
                >
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>

        {painelLateral === "exemplos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 380, overflowY: "auto" }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4, padding: "0 4px" }}>
              Clique em um exemplo para enviá-lo à análise:
            </div>
            {EXEMPLOS_VALIDADOR.map((ex, i) => (
              <button
                key={i}
                onClick={() => usarExemplo(ex)}
                style={{
                  background: t.surfaceAlt,
                  border: `1px solid ${t.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.blue + "66"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}
              >
                <div style={{ fontSize: 11, color: t.blue, fontWeight: 700, marginBottom: 4, letterSpacing: "0.04em" }}>
                  {ex.label}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: t.textMuted,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    lineHeight: 1.5,
                  }}
                >
                  {ex.texto}
                </div>
              </button>
            ))}
          </div>
        )}

        {painelLateral === "historico" && (
          <div>
            {historico.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: t.textMuted, fontSize: 13 }}>
                📝 Nenhuma análise ainda. Suas referências aparecerão aqui.
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700 }}>
                    Últimas {historico.length} análises
                  </span>
                  <button
                    onClick={limparHistorico}
                    style={{ fontSize: 11, color: t.red, background: "transparent", border: "none", cursor: "pointer", padding: "2px 6px" }}
                  >
                    🗑️ Limpar tudo
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 380, overflowY: "auto" }}>
                  {historico.map((h) => {
                    const sm = STATUS_VALIDADOR[h.statusGeral] || STATUS_VALIDADOR.incerta;
                    return (
                      <div
                        key={h.id}
                        style={{
                          background: t.surfaceAlt,
                          border: `1px solid ${t.border}`,
                          borderRadius: 8,
                          padding: "10px 12px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, gap: 6, flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              background: sm.color + "22",
                              color: sm.color,
                              border: `1px solid ${sm.color}44`,
                              borderRadius: 4,
                              fontWeight: 700,
                            }}
                          >
                            {sm.icone} {sm.label}
                          </span>
                          <span style={{ fontSize: 10, color: t.textFaint, fontFamily: "monospace" }}>
                            {new Date(h.ts).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: t.text, fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.5, marginBottom: 6, maxHeight: 60, overflow: "hidden" }}>
                          {h.referencia.substring(0, 140)}{h.referencia.length > 140 ? "..." : ""}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10, color: t.textMuted, fontFamily: "monospace", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            {h.tipoDetectado} · {h.pontuacao}/100
                            {h.refinadoComIA && (
                              <span
                                style={{
                                  padding: "0px 5px",
                                  background: t.purple + "22",
                                  color: t.purple,
                                  border: `1px solid ${t.purple}44`,
                                  borderRadius: 3,
                                  fontSize: 9,
                                  fontWeight: 700,
                                  letterSpacing: "0.05em",
                                }}
                              >
                                🤖 IA
                              </span>
                            )}
                          </span>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button
                              onClick={() => reanalisar(h)}
                              style={{ fontSize: 10, padding: "3px 7px", background: t.blueSoft, color: t.blue, border: `1px solid ${t.blue}44`, borderRadius: 5, cursor: "pointer" }}
                            >
                              ↻ Reanalisar
                            </button>
                            <button
                              onClick={() => removerHistorico(h.id)}
                              style={{ fontSize: 10, padding: "3px 7px", background: "transparent", color: t.red, border: `1px solid ${t.red}44`, borderRadius: 5, cursor: "pointer" }}
                            >
                              ✗
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* DISCLAIMER */}
      <Note type="warn">
        <b>Limitações desta ferramenta:</b> este validador faz análise automatizada baseada em padrões da ABNT. Referências ambíguas, incompletas ou com dados bibliográficos ausentes exigem conferência manual com a NBR 6023:2018 e NBR 10520:2023. A ferramenta <b>não inventa</b> dados ausentes — quando não há informação suficiente, sugere marcadores como [S. l.] ou [s. n.] e indica que a correção completa exige consulta à fonte original.
      </Note>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: FUNDAMENTOS
// ═══════════════════════════════════════════════════════════════════════════

function ModuleFundamentos() {
  return (
    <div>
      <SectionHeader
        icon="🧭"
        title="Fundamentos das Normas ABNT"
        sub="Antes de qualquer coisa: o que são citações, o que são referências, e como elas se conectam."
        color={t.blue}
      />

      {/* Diferenciação */}
      <Card color={t.blue} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.blue}>Os dois pilares</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              border: `1px solid ${t.blue}33`,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>💬</div>
            <div style={{ fontWeight: 800, color: t.text, marginBottom: 6 }}>
              Citação <span style={{ color: t.blue }}>(NBR 10520:2023)</span>
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6 }}>
              Aparece no <b>corpo do texto</b>. É a menção a uma ideia ou trecho. Pode ser direta, indireta ou apud.
            </div>
          </div>
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              border: `1px solid ${t.green}33`,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>📚</div>
            <div style={{ fontWeight: 800, color: t.text, marginBottom: 6 }}>
              Referência <span style={{ color: t.green }}>(NBR 6023:2018)</span>
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6 }}>
              Vai na <b>lista final</b>. Identifica completamente a obra: autor, título, editora, ano, etc.
            </div>
          </div>
        </div>
        <Note type="tip">
          Toda citação no texto <b>obrigatoriamente</b> tem uma referência correspondente na lista final. Toda referência da lista <b>obrigatoriamente</b> aparece pelo menos uma vez como citação no texto.
        </Note>
      </Card>

      {/* Sistemas de chamada */}
      <Card style={{ marginBottom: 18 }}>
        <SubTitle>Sistemas de chamada (escolha um e mantenha)</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ padding: 14, background: t.surfaceAlt, borderRadius: 10 }}>
            <Badge color={t.blue}>Autor-data</Badge>
            <div style={{ marginTop: 8, color: t.text, fontSize: 13, lineHeight: 1.6 }}>
              <b>Mais usado em ciências da saúde, biológicas, humanas.</b>
            </div>
            <ExampleBlock
              label="No texto"
              texto={`Conforme Silva (2020), a vacinação reduz a mortalidade infantil.\n\nA vacinação reduz a mortalidade infantil (Silva, 2020).`}
              status="correto"
            />
          </div>
          <div style={{ padding: 14, background: t.surfaceAlt, borderRadius: 10 }}>
            <Badge color={t.purple}>Numérico</Badge>
            <div style={{ marginTop: 8, color: t.text, fontSize: 13, lineHeight: 1.6 }}>
              <b>Mais usado em engenharias e algumas áreas médicas (Vancouver-like).</b>
            </div>
            <ExampleBlock
              label="No texto"
              texto={`A vacinação reduz a mortalidade infantil¹.\n\nA vacinação reduz a mortalidade infantil (1).`}
              status="correto"
            />
          </div>
        </div>
        <Note type="warn">
          Não misture os sistemas no mesmo trabalho. E o sistema numérico <b>não pode</b> ser usado quando você também tem notas de rodapé numeradas — gera conflito.
        </Note>
      </Card>

      {/* Localização */}
      <Card style={{ marginBottom: 18 }}>
        <SubTitle>Onde as citações podem aparecer</SubTitle>
        <RuleList
          rules={[
            "No corpo do texto (forma mais comum)",
            "Em notas de rodapé",
            "No fim de capítulos, partes ou seções",
            "Antecedendo resumos, resenhas e recensões",
          ]}
        />
      </Card>

      {/* Princípios éticos */}
      <Card color={t.red}>
        <SubTitle color={t.red}>Os 3 princípios éticos inegociáveis</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { num: "01", titulo: "Toda ideia que não é sua precisa de fonte", desc: "Mesmo que você tenha reescrito completamente, mesmo que pareça óbvio, mesmo que seja conhecimento 'comum' na sua área. Sem fonte = plágio." },
            { num: "02", titulo: "Cite com fidelidade", desc: "Se for direta, transcreva com aspas e a página exata. Se for indireta, mantenha o sentido original do autor — não distorça." },
            { num: "03", titulo: "Ofereça rastreabilidade", desc: "O leitor precisa conseguir, a partir da sua citação, encontrar a obra original na lista de referências e, dali, achar a fonte. Sem isso, sua pesquisa não tem credibilidade." },
          ].map((p) => (
            <div
              key={p.num}
              style={{
                display: "flex",
                gap: 14,
                padding: "12px 14px",
                background: t.bg,
                borderRadius: 10,
                border: `1px solid ${t.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: t.red,
                  fontFamily: "monospace",
                  letterSpacing: "-0.02em",
                  minWidth: 36,
                }}
              >
                {p.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: t.text, marginBottom: 4 }}>{p.titulo}</div>
                <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: CITAÇÃO DIRETA CURTA
// ═══════════════════════════════════════════════════════════════════════════

function ModuleDiretaCurta() {
  return (
    <div>
      <SectionHeader
        icon="💬"
        title="Citação Direta Curta"
        sub="Até 3 linhas. Reproduz EXATAMENTE as palavras do autor, entre aspas duplas."
        color={t.blue}
      />

      <Card color={t.blue} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.blue}>Regras (NBR 10520:2023, seção 7.1)</SubTitle>
        <RuleList
          rules={[
            "Transcreva o texto entre aspas duplas — sem alterar nada.",
            "Sempre indique autor, ano e PÁGINA (a página é obrigatória).",
            "Se houver aspas dentro do trecho original, transforme-as em aspas simples.",
            "O ponto final encerra a frase, não a citação — vem DEPOIS da chamada.",
            "Para enfatizar trechos, use 'grifo nosso' como último elemento da chamada.",
            "Se for tradução sua, indique 'tradução nossa' como último elemento.",
          ]}
        />
      </Card>

      <SubTitle>Exemplos comentados</SubTitle>
      <ExampleBlock
        label="✅ Autor entre parênteses (final de frase)"
        texto={`"A representação autobiográfica da infância oscila entre a idade do ouro e o inferno" (Larreta; Giucci, 2007, p. 17).`}
        status="correto"
        explicacao="Aspas duplas + autor + ano + página entre parênteses, ponto final FORA da citação."
      />
      <ExampleBlock
        label="✅ Autor integrado à frase"
        texto={`Canuto (1999, p. 15) afirma que seu trabalho "[...] surgiu de uma paixão incontrolável".`}
        status="correto"
        explicacao="Autor faz parte do texto; ano e página entre parênteses logo após o nome. As reticências entre colchetes [...] indicam supressão de parte do trecho."
      />
      <ExampleBlock
        label="✅ Aspas dentro de aspas"
        texto={`Segundo Sá (2018, p. 27), "[...] por meio da mesma 'arte de conversação' que abrange tão extensa parte da nossa existência [...]".`}
        status="correto"
        explicacao="Quando o trecho original já tinha aspas, elas viram aspas simples (' ') para não conflitar com as duplas."
      />
      <ExampleBlock
        label="✅ Sem paginação (documento online sem páginas)"
        texto={`"O Poder Executivo envidará esforços no sentido de antecipar a entrega do plano" (Brasil, 1999).`}
        status="correto"
        explicacao="Para documentos sem paginação (HTML, leis online), pode-se omitir a página. Mas se for vídeo ou similar, indique a localização (ex: '9 min 41 s')."
      />
      <ExampleBlock
        label="❌ Sem aspas (vira indireta sem sentido)"
        texto={`A representação autobiográfica da infância oscila entre a idade do ouro e o inferno (Larreta; Giucci, 2007, p. 17).`}
        status="errado"
        explicacao="Se o texto é COPIADO do original, precisa estar entre aspas. Sem aspas, parece paráfrase, mas não é — é plágio disfarçado."
      />
      <ExampleBlock
        label="❌ Sem página"
        texto={`"A representação autobiográfica da infância oscila entre a idade do ouro e o inferno" (Larreta; Giucci, 2007).`}
        status="errado"
        explicacao="Citação direta SEMPRE exige página (exceto documentos sem paginação). Sem página, o leitor não consegue verificar."
      />

      <SubTitle color={t.purple}>Casos avançados</SubTitle>
      <ExampleBlock
        label="✨ Com volume e/ou seção"
        texto={`"As roupas clássicas são mais apropriadas. Os decotes em V, os tons escuros [...] alongam a silhueta" (Senac, 1979, v. 1, p. 16).`}
        status="atencao"
        explicacao="Volume vem antes da página, abreviado como 'v.'. Para tomo, use 't.'. Para seção, 'sec.'."
      />
      <ExampleBlock
        label="✨ Com grifo nosso (você adicionou ênfase)"
        texto={`"[...] para que não tenha lugar a producção de degenerados, quer physicos quer moraes [...]" (Souto, 1916, p. 46, grifo nosso).`}
        status="atencao"
        explicacao="Quando VOCÊ adiciona o negrito/itálico ao trecho original, sempre indique 'grifo nosso' no final da chamada. Se já tinha grifo no original, não precisa avisar."
      />
      <ExampleBlock
        label="✨ Com tradução nossa"
        texto={`"Paradoxos são desconcertantes. Confrontados com um argumento aparentemente impecável que conduz a uma conclusão aparentemente ultrajante [...]" (Olin, 2003, p. 21, tradução nossa).`}
        status="atencao"
        explicacao="Se você traduziu um trecho em outro idioma, declare 'tradução nossa' como último elemento da chamada."
      />

      <Note type="tip">
        <b>Truque útil:</b> antes de copiar e colar uma citação direta, pergunte-se: "essa frase é tão precisa/poderosa que NÃO posso parafrasear?" Se a resposta for não, prefira citação indireta. Citações diretas demais empobrecem o texto.
      </Note>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: CITAÇÃO DIRETA LONGA
// ═══════════════════════════════════════════════════════════════════════════

function ModuleDiretaLonga() {
  return (
    <div>
      <SectionHeader
        icon="📜"
        title="Citação Direta Longa"
        sub="Mais de 3 linhas. Recuo de 4 cm, fonte menor, espaço simples, SEM aspas."
        color={t.purple}
      />

      <Card color={t.purple} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.purple}>Formatação obrigatória (NBR 10520:2023, seção 7.1.1)</SubTitle>
        <RuleList
          rules={[
            "Recuo de 4 cm da margem esquerda (parágrafo todo, não só a primeira linha).",
            "Fonte menor que a do texto corrido (geralmente tamanho 10 ou 11, se o texto está em 12).",
            "Espaçamento simples entre linhas (mesmo que o resto do texto seja 1,5).",
            "SEM aspas — o recuo já indica que é citação.",
            "Antes e depois da citação, deixe uma linha em branco para destacar.",
            "Autor, ano e página vêm ao final, entre parênteses.",
          ]}
          color={t.purple}
        />
      </Card>

      <SubTitle color={t.purple}>Exemplo visual (do PDF da norma)</SubTitle>
      <Card style={{ marginBottom: 18 }}>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
          ...as autoras desenvolvem o conceito de teleconferência. Veja como aparece no texto:
        </div>
        <div
          style={{
            background: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            padding: "16px 20px",
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 12,
            lineHeight: 1.7,
            color: t.text,
          }}
        >
          Sobre a teleconferência, Nichols (1993) destaca que:
          <div
            style={{
              marginLeft: 28,
              marginTop: 10,
              fontSize: 11,
              lineHeight: 1.5,
              color: t.textMuted,
              borderLeft: `2px solid ${t.purple}55`,
              paddingLeft: 12,
            }}
          >
            A teleconferência permite ao indivíduo participar de um encontro nacional
            ou regional sem a necessidade de deixar seu local de origem. Tipos comuns
            de teleconferência incluem o uso da televisão, telefone, e computador.
            Através de áudio-conferência, utilizando a companhia local de telefone, um
            sinal de áudio pode ser emitido em um salão de qualquer dimensão (Nichols,
            1993, p. 181).
          </div>
        </div>
        <Note type="info">
          Note: parágrafo recuado, fonte menor, sem aspas, autor/ano/página no final entre parênteses. O ponto final fecha a frase fora da citação.
        </Note>
      </Card>

      <SubTitle>Erros comuns em citação longa</SubTitle>
      <Card color={t.red} style={{ marginBottom: 12 }}>
        <RuleList
          rules={[
            "Manter aspas duplas (ERRADO — recuo já substitui as aspas).",
            "Não recuar e tratar como direta curta (forma híbrida não existe).",
            "Manter o mesmo tamanho de fonte do texto corrido.",
            "Esquecer a página ao final.",
            "Usar citação longa demais (mais de meia página) — sinal de que faltou paráfrase.",
          ]}
          color={t.red}
        />
      </Card>

      <Note type="warn">
        <b>Regra de ouro:</b> evite citações longas. Use somente quando o texto original é tão preciso, técnico ou literário que reformulá-lo prejudicaria o sentido. Caso contrário, parafraseie e cite indiretamente — fica mais elegante e mais autoral.
      </Note>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: CITAÇÃO INDIRETA
// ═══════════════════════════════════════════════════════════════════════════

function ModuleIndireta() {
  const [respostas, setRespostas] = useState({});

  const itensPratica = [
    {
      texto: "De acordo com Silva (2019), a amamentação exclusiva por seis meses reduz a mortalidade infantil.",
      resposta: "indireta_correta",
      feedback: "✅ Indireta CORRETA. Paráfrase, autor/ano no texto, sem aspas, sem página obrigatória.",
    },
    {
      texto: '"A amamentação exclusiva por seis meses reduz a mortalidade infantil" (Silva, 2019, p. 45).',
      resposta: "direta_correta",
      feedback: "✅ Citação DIRETA correta. Aspas + autor/ano/página.",
    },
    {
      texto: "A amamentação exclusiva por seis meses reduz a mortalidade infantil.",
      resposta: "sem_referencia",
      feedback: "❌ Sem referência — plágio. Sempre cite a fonte, mesmo parafraseando.",
    },
    {
      texto: "Vários autores (Costa; Mendes; Andrade, 2017; Fiorotti et al., 2010; Rocha; Sassi, 2013) discutem o sofrimento psíquico no estudante de medicina.",
      resposta: "indireta_correta",
      feedback: "✅ Citação indireta com vários documentos. Use ponto-e-vírgula entre obras, ordem alfabética por autor.",
    },
    {
      texto: '"A amamentação exclusiva por seis meses reduz a mortalidade infantil" (Silva, 2019).',
      resposta: "direta_sem_pagina",
      feedback: "⚠️ Direta sem página. Citação direta exige página (exceto fontes sem paginação).",
    },
  ];

  const opcoes = [
    { v: "indireta_correta", l: "✅ Indireta correta" },
    { v: "direta_correta", l: "✅ Direta correta" },
    { v: "sem_referencia", l: "❌ Sem referência" },
    { v: "direta_sem_pagina", l: "⚠️ Direta sem página" },
  ];

  return (
    <div>
      <SectionHeader
        icon="📝"
        title="Citação Indireta (Paráfrase)"
        sub="Você reescreve a ideia do autor com SUAS palavras, mantendo o sentido original. Esta é a forma mais elegante e mais usada."
        color={t.green}
      />

      <Card color={t.green} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.green}>Definição e regras (NBR 10520:2023, seção 3.7 e 7.2)</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          A citação indireta é "texto baseado na obra do autor consultado". Você lê a obra, entende a ideia, e reescreve com suas próprias palavras — mas <b>obrigatoriamente</b> credita o autor.
        </div>
        <RuleList
          rules={[
            "Reescreva COM SUAS PALAVRAS — não troque só uma ou duas palavras do original (isso é plágio sutil).",
            "Indique autor e ano (página é OPCIONAL).",
            "NÃO use aspas — aspas indicam citação direta.",
            "Mantenha o sentido original — não distorça para encaixar no seu argumento.",
            "Pode integrar o autor ao texto OU colocar tudo entre parênteses.",
          ]}
          color={t.green}
        />
      </Card>

      <SubTitle color={t.green}>Modelos de citação indireta</SubTitle>
      <ExampleBlock
        label="✅ Autor integrado à frase"
        texto={`Conforme a classificação proposta por Authier-Reiriz (1982), a ironia seria assim uma forma implícita de heterogeneidade mostrada.`}
        status="correto"
        explicacao="Autor no texto + ano entre parênteses. Forma mais fluida quando você quer dar destaque ao autor."
      />
      <ExampleBlock
        label="✅ Autor entre parênteses (final)"
        texto={`Identificaram-se diversos estudos que tratavam do comportamento informacional dos usuários de bibliotecas universitárias (Gonçalves, 2019).`}
        status="correto"
        explicacao="Tudo entre parênteses no final. Forma mais comum quando a ideia é mais importante que quem disse."
      />
      <ExampleBlock
        label="✅ Vários autores na mesma citação"
        texto={`Os autores Antunes (2016), Bezerra (2019) e Silva (2017) abordam a temática da Psicologia da Administração.`}
        status="correto"
        explicacao="Quando vários autores são mencionados na frase, cada um leva seu ano entre parênteses."
      />
      <ExampleBlock
        label="✅ Vários documentos do mesmo autor"
        texto={`Diversos estudos confirmam essa tendência (Dreyfuss, 1989, 1991, 1995).`}
        status="correto"
        explicacao="Mesmo autor, vários trabalhos: separe os anos por VÍRGULA, em ordem cronológica (mais antigo primeiro)."
      />
      <ExampleBlock
        label="✅ Vários autores no mesmo parênteses"
        texto={`Diversos autores salientam a importância do acontecimento desencadeador no início do processo de aprendizagem (Cross, 1984; Knox, 1986; Mezirow, 1991).`}
        status="correto"
        explicacao="Autores diferentes: separe por PONTO-E-VÍRGULA, em ordem alfabética."
      />

      <SubTitle color={t.red}>Erros frequentes</SubTitle>
      <ExampleBlock
        label="❌ Paráfrase falsa (plágio)"
        texto={`Original: "A vacinação reduz drasticamente a mortalidade infantil."\nFalsa paráfrase: "A imunização reduz fortemente a mortalidade de crianças" (Silva, 2020).`}
        status="errado"
        explicacao="Trocar 'vacinação' por 'imunização' e 'drasticamente' por 'fortemente' NÃO é paráfrase. É plágio. Reescreva COMPLETAMENTE com sua estrutura."
      />
      <ExampleBlock
        label="✅ Paráfrase real"
        texto={`Original: "A vacinação reduz drasticamente a mortalidade infantil."\nParáfrase boa: Estudos mostram que crianças vacinadas têm probabilidades muito menores de morrer por doenças preveníveis (Silva, 2020).`}
        status="correto"
        explicacao="A estrutura mudou completamente, o sentido foi preservado, e a fonte está creditada. Isso é paráfrase real."
      />

      {/* Prática */}
      <Card style={{ marginTop: 22 }}>
        <SubTitle>🏋️ Pratique: classifique cada trecho</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {itensPratica.map((item, i) => {
            const resp = respostas[i];
            const acertou = resp === item.resposta;
            return (
              <div
                key={i}
                style={{
                  background: t.surfaceAlt,
                  border: `1px solid ${
                    resp ? (acertou ? t.green : t.red) : t.border
                  }55`,
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    fontSize: 12,
                    color: t.text,
                    background: t.bg,
                    padding: "10px 12px",
                    borderRadius: 7,
                    border: `1px solid ${t.border}`,
                    lineHeight: 1.6,
                    marginBottom: 12,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.texto}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: resp ? 10 : 0 }}>
                  {opcoes.map((op) => (
                    <button
                      key={op.v}
                      onClick={() => setRespostas((p) => ({ ...p, [i]: op.v }))}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 7,
                        border: `1px solid ${
                          resp === op.v ? (acertou ? t.green : t.red) : t.border
                        }`,
                        background:
                          resp === op.v
                            ? acertou
                              ? t.greenSoft
                              : t.redSoft
                            : t.bg,
                        color:
                          resp === op.v
                            ? acertou
                              ? t.green
                              : t.red
                            : t.textMuted,
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: resp === op.v ? 700 : 400,
                        textAlign: "left",
                      }}
                    >
                      {op.l}
                    </button>
                  ))}
                </div>
                {resp && (
                  <div
                    style={{
                      fontSize: 13,
                      padding: "8px 12px",
                      background: acertou ? t.greenSoft : t.redSoft,
                      color: acertou ? t.green : t.red,
                      borderRadius: 7,
                      border: `1px solid ${acertou ? t.green : t.red}33`,
                    }}
                  >
                    {item.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: APUD
// ═══════════════════════════════════════════════════════════════════════════

function ModuleApud() {
  return (
    <div>
      <SectionHeader
        icon="🔄"
        title="Citação de Citação (apud)"
        sub="Quando você cita um autor que você não leu, mas viu citado em outra obra. Use com MUITO cuidado."
        color={t.orange}
      />

      <Card color={t.orange} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.orange}>Quando usar (NBR 10520:2023, seção 7.3)</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          O termo <b>apud</b> (do latim, "citado por") é usado quando você quer mencionar uma ideia de um autor original (Autor A), mas não teve acesso à obra dele — você leu sobre essa ideia em outra obra (Autor B). Você cita o A apud B.
        </div>
        <Note type="warn">
          <b>Use apenas em último caso!</b> O ideal é sempre buscar a fonte original. Use apud quando:
          <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
            <li>A obra original está esgotada / em outro idioma inacessível</li>
            <li>É um livro raro ou histórico não digitalizado</li>
            <li>Você precisa de uma citação muito específica e a obra de B já a traduziu/contextualizou</li>
          </ul>
        </Note>
      </Card>

      <SubTitle>Estrutura do apud</SubTitle>
      <Card style={{ marginBottom: 18 }}>
        <div
          style={{
            background: t.bg,
            border: `1px solid ${t.orange}55`,
            borderRadius: 10,
            padding: "14px 16px",
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 14,
            color: t.text,
            lineHeight: 1.8,
            marginBottom: 12,
          }}
        >
          (Autor original, ano, p. X <span style={{ color: t.orange }}>apud</span> Autor que você leu, ano, p. Y)
        </div>
        <Note type="tip">
          Na <b>lista de referências</b>, você só cita o autor que você EFETIVAMENTE leu (o B), nunca o A. Isso é uma regra crítica.
        </Note>
      </Card>

      <SubTitle>Exemplos práticos</SubTitle>
      <ExampleBlock
        label="✅ Citação direta com apud"
        texto={`"Pensamentos valem e vivem pela observação exata ou nova [...]" (Assis, 1997 apud Canuto, 1999, p. 6).`}
        status="correto"
        explicacao="Você está citando Assis literalmente, mas leu essa frase no livro do Canuto. Na lista de referências, você cita só o Canuto."
      />
      <ExampleBlock
        label="✅ Citação indireta com apud (autor no texto)"
        texto={`Segundo Freire (1994 apud Streck; Redin; Zitkoski, 2017, p. 25), a pedagogia do oprimido continua atual.`}
        status="correto"
        explicacao="Freire é o autor original, mas você não leu a obra dele de 1994 — você leu sobre essa ideia no livro de Streck, Redin e Zitkoski (2017). Apenas Streck et al. vão para a lista de referências."
      />
      <ExampleBlock
        label="✅ Apud em parênteses no final"
        texto={`A ortografia surge exatamente de um congelamento da grafia das palavras, fazendo com que ela perca sua característica básica de ser uma escrita pelos segmentos fonéticos (Cagliari, 1986, p. 104 apud Suassuna, 1995, p. 55).`}
        status="correto"
        explicacao="Tudo no parênteses final. Cagliari é o autor original (não lido), Suassuna é a fonte que você leu."
      />

      <SubTitle color={t.red}>Erros comuns com apud</SubTitle>
      <ExampleBlock
        label="❌ Colocar AMBOS na lista de referências"
        texto={`No texto: (Freire, 1994 apud Streck, 2017)\n\nLista (errada):\nFREIRE, P. Pedagogia do oprimido. Rio de Janeiro: Paz e Terra, 1994.\nSTRECK, D. Dicionário Paulo Freire. Belo Horizonte: Autêntica, 2017.`}
        status="errado"
        explicacao="Não! Se você não leu Freire, NÃO pode listá-lo. Só vai para a lista a obra que você efetivamente leu (Streck)."
      />
      <ExampleBlock
        label="❌ Usar apud quando você TEM acesso à obra original"
        texto={`Você tem o livro de Freire (1994) na sua estante, mas escreve:\n(Freire, 1994 apud Streck, 2017, p. 25)`}
        status="errado"
        explicacao="Não use apud se você pode ir direto à fonte. Apud é para quando o original é INACESSÍVEL."
      />

      <Note type="danger">
        <b>Sinal de alerta:</b> trabalhos com mais de 2-3 apuds já parecem 'pesquisa preguiçosa'. Banca acadêmica costuma cobrar. Se você está pesquisando sobre um autor importante, leia a obra dele.
      </Note>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: SUPRESSÕES E ÊNFASES
// ═══════════════════════════════════════════════════════════════════════════

function ModuleSupressoes() {
  return (
    <div>
      <SectionHeader
        icon="✂️"
        title="Supressões, Interpolações e Ênfases"
        sub="Modificações permitidas em citações diretas — quando você quer encurtar, esclarecer ou destacar."
        color={t.cyan}
      />

      <Card color={t.cyan} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.cyan}>Os três sinais (NBR 10520:2023, seção 5.2)</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          {[
            { sinal: "[...]", nome: "Supressão", desc: "Você omitiu trechos da citação original." },
            { sinal: "[ comentário ]", nome: "Interpolação / Acréscimo / Comentário", desc: "Você inseriu um esclarecimento seu no meio do texto original." },
            { sinal: "negrito ou itálico ou sublinhado", nome: "Ênfase ou Destaque", desc: "Você quer chamar atenção para uma parte do trecho. Indique se é seu ('grifo nosso') ou do autor." },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "12px 14px",
                background: t.surfaceAlt,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  background: t.cyanSoft,
                  color: t.cyan,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontWeight: 700,
                  border: `1px solid ${t.cyan}33`,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                }}
              >
                {s.sinal}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{s.nome}</div>
                <div style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SubTitle color={t.cyan}>Supressão [...]</SubTitle>
      <ExampleBlock
        label="✅ No meio da citação"
        texto={`Original: "Pensamentos valem e vivem pela observação exata ou nova das realidades morais e culturais."\n\nCom supressão: "Pensamentos valem e vivem pela observação exata ou nova [...] das realidades morais e culturais" (Assis, 1997, p. 18).`}
        status="correto"
        explicacao="Você omitiu uma parte que não era necessária. Indique com [...] sem alterar o sentido."
      />
      <ExampleBlock
        label="✅ No início ou fim"
        texto={`"[...] a juventude não é só um signo nem se reduz aos atributos juvenis [...]" (Barbiani, 2007, p. 145).`}
        status="correto"
        explicacao="Pode usar [...] no começo ou no fim quando o trecho é o meio de uma frase maior."
      />

      <SubTitle color={t.cyan}>Interpolação [ ]</SubTitle>
      <ExampleBlock
        label="✅ Esclarecendo um termo"
        texto={`"Agora eu quero contar as [verdadeiras] histórias da beira do cais da Bahia" (Amado, 1936, p. 5).`}
        status="correto"
        explicacao="Você inseriu 'verdadeiras' para esclarecer ou contextualizar. Tudo entre colchetes é um acréscimo seu, não do autor original."
      />
      <ExampleBlock
        label="✅ Adicionando contexto"
        texto={`"Ele [Pedro] chegou tarde naquele dia" (Silva, 2020, p. 33).`}
        status="correto"
        explicacao="Quando o pronome do original não fica claro fora de contexto, use colchetes para inserir o nome."
      />

      <SubTitle color={t.cyan}>Ênfase / Destaque</SubTitle>
      <ExampleBlock
        label="✅ Grifo seu"
        texto={`"[...] para que não tenha lugar a producção de degenerados, quer physicos quer moraes [...]" (Souto, 1916, p. 46, grifo nosso).`}
        status="correto"
        explicacao="O negrito foi VOCÊ que adicionou. Sempre indique 'grifo nosso' ou 'grifo próprio' no final da chamada."
      />
      <ExampleBlock
        label="✅ Grifo do autor original"
        texto={`Segundo Brody e Harnad (2004, slide 2, tradução nossa, grifo nosso), "o acesso aberto maximiza e acelera o impacto das pesquisas".`}
        status="correto"
        explicacao="Mostra que tanto a tradução quanto o destaque são seus, não do autor original."
      />

      <Note type="info">
        <b>Ordem dos elementos da chamada:</b> autor, ano, página, [tradução nossa], [grifo nosso/do autor]. Sempre nessa sequência.
      </Note>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: MÚLTIPLOS AUTORES
// ═══════════════════════════════════════════════════════════════════════════

function ModuleMultiplosAutores() {
  return (
    <div>
      <SectionHeader
        icon="👥"
        title="Múltiplos Autores e Casos de Autoria"
        sub="Como citar 1, 2, 3, 4+ autores, sobrenomes iguais, mesmo autor mesmo ano, e documentos sem autor."
        color={t.pink}
      />

      <SubTitle color={t.pink}>Quantos autores tem a obra?</SubTitle>
      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.pink}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.pink, marginBottom: 6, fontSize: 14 }}>
              📌 1 autor
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8 }}>
              Sobrenome em maiúsculas + prenome.
            </div>
            <ExampleBlock
              label="No texto"
              texto={`Silva (2020) afirma que [...]\nou\n(Silva, 2020)`}
              status="correto"
            />
            <ExampleBlock
              label="Na referência"
              texto={`SILVA, José Carlos. Saúde pública. São Paulo: Atlas, 2020.`}
              status="correto"
            />
          </div>

          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.pink}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.pink, marginBottom: 6, fontSize: 14 }}>
              📌 2 ou 3 autores
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8 }}>
              Todos os autores devem aparecer, separados por <b>ponto-e-vírgula</b> na referência. No texto, use <b>e</b> entre o último e os anteriores (se autor estiver no corpo) ou <b>ponto-e-vírgula</b> entre todos (se entre parênteses).
            </div>
            <ExampleBlock
              label="No texto (parênteses)"
              texto={`(Souza; Pereira, 2011)\n(Passos; Fonseca; Chaves, 1995)`}
              status="correto"
            />
            <ExampleBlock
              label="No texto (autor integrado)"
              texto={`Souza e Pereira (2011) descrevem [...]\nSegundo Passos, Fonseca e Chaves (1995) [...]`}
              status="correto"
            />
            <ExampleBlock
              label="Na referência"
              texto={`SOUZA, J. C.; PEREIRA, A. M. Metodologia de trabalho. 3. ed. São Paulo: Estrela, 2011.\n\nPASSOS, L. M. M.; FONSECA, A.; CHAVES, M. Alegria de saber: matemática. São Paulo: Scipione, 1995.`}
              status="correto"
            />
          </div>

          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.pink}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.pink, marginBottom: 6, fontSize: 14 }}>
              📌 4 ou mais autores
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8 }}>
              <b>NA CITAÇÃO:</b> use o primeiro autor seguido de <i>et al.</i><br/>
              <b>NA REFERÊNCIA:</b> a NBR 6023:2018 permite duas opções (mas mantenha consistência):<br />
              (a) listar TODOS os autores, ou<br />
              (b) só o primeiro + et al.
            </div>
            <ExampleBlock
              label="No texto"
              texto={`Maciel et al. (2019, p. 163) mostraram que [...]\nou\n(Maciel et al., 2019)`}
              status="correto"
              explicacao="O 'et al.' fica em itálico (vem do latim 'et alii' = 'e outros')."
            />
            <ExampleBlock
              label="Na referência (todos os autores)"
              texto={`TAYLOR, Robert; LEVINE, Denis; MARCELLIN-LITTLE, Denis; MILLIS, Darryl. Reabilitação e fisioterapia na prática de pequenos animais. São Paulo: Roca, 2008.`}
              status="correto"
            />
            <ExampleBlock
              label="Na referência (et al.)"
              texto={`URANI, A. et al. Constituição de uma matriz de contabilidade social para o Brasil. Brasília, DF: IPEA, 1994.`}
              status="atencao"
              explicacao="Use et al. apenas quando o número de autores é muito grande. Para artigos científicos com 4-6 autores, prefira listar todos."
            />
          </div>
        </div>
      </Card>

      <SubTitle color={t.pink}>Casos especiais</SubTitle>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: t.text, marginBottom: 8 }}>
          🔁 Mesmo autor, mesmo ano (várias obras)
        </div>
        <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
          Acrescente letras minúsculas (a, b, c) após o ano, em ordem alfabética dos títulos.
        </div>
        <ExampleBlock
          label="No texto"
          texto={`(Reeside, 1927a)\n(Reeside, 1927b)\n\nA Secretaria Nacional engloba atenção hospitalar (Brasil, 2005b).\nA Secretaria de Atenção Básica também é citada (Brasil, 2005a).`}
          status="correto"
        />
        <ExampleBlock
          label="Na lista de referências"
          texto={`BRASIL. Ministério da Saúde. Atenção básica. Brasília: MS, 2005a.\nBRASIL. Ministério da Saúde. Atenção hospitalar. Brasília: MS, 2005b.`}
          status="correto"
          explicacao="As letras seguem a ordem alfabética dos TÍTULOS na lista."
        />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: t.text, marginBottom: 8 }}>
          👯 Sobrenomes iguais, autores diferentes
        </div>
        <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
          Acrescente as iniciais dos prenomes. Se persistir a coincidência, use prenomes por extenso.
        </div>
        <ExampleBlock
          label="Com inicial"
          texto={`(Barbosa, C., 1958)\n(Barbosa, O., 1958)`}
          status="correto"
        />
        <ExampleBlock
          label="Por extenso (se inicial não resolver)"
          texto={`(Barbosa, Cássio, 1965)\n(Barbosa, Celso, 1965)\n\nDe acordo com Cássio Barbosa (1965) [...]\nSegundo Celso Barbosa (1965) [...]`}
          status="correto"
        />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: t.text, marginBottom: 8 }}>
          🏛️ Autor pessoa jurídica (instituição)
        </div>
        <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
          Use o nome completo ou sigla. Para órgãos governamentais brasileiros, sempre comece com a JURISDIÇÃO em maiúsculas.
        </div>
        <ExampleBlock
          label="Instituição internacional"
          texto={`No texto:\n"A promoção e proteção da saúde são essenciais [...]" (Organização Mundial da Saúde, 2010, p. xi).\n\nSegundo a World Health Organization (WHO), o tratamento da tuberculose é mais eficaz [...].\n\nNa referência:\nWORLD HEALTH ORGANIZATION. New WHO recommendations. Geneva: WHO, 2019. Disponível em: http://www.who.int. Acesso em: 21 mar. 2019.`}
          status="correto"
        />
        <ExampleBlock
          label="Órgão governamental"
          texto={`No texto:\n(Brasil, 1995)\n\nNa referência:\nBRASIL. Ministério da Administração Federal. Plano diretor da reforma do Estado. Brasília, DF: MARE, 1995.`}
          status="correto"
          explicacao="Sempre BRASIL. (jurisdição) + nome do ministério. Não comece pela sigla 'MS' ou pelo ministério sozinho."
        />
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: t.text, marginBottom: 8 }}>
          ❓ Documento sem autor
        </div>
        <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
          Entrada pelo TÍTULO, com a primeira palavra em maiúsculas. Em citação, use a primeira palavra do título seguida de [...].
        </div>
        <ExampleBlock
          label="Título com várias palavras"
          texto={`No texto:\n(Anteprojeto [...], 1987, p. 55)\n\nNa referência:\nANTEPROJETO de lei. Estudos e Debates, Brasília, DF, n. 13, p. 51-60, jan. 1987.`}
          status="correto"
        />
        <ExampleBlock
          label="Título começando com artigo"
          texto={`No texto:\n(A flor [...], 1995, p. 4)\n\nNa referência:\nA FLOR prometida. Folha de S. Paulo, São Paulo, ano 75, n. 24.105, p. 4, 2 abr. 1995.`}
          status="correto"
          explicacao="Quando o título começa com artigo (A, O, As, Os, Um, Uma), inclua-o em maiúsculas."
        />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: ELEMENTOS DA REFERÊNCIA
// ═══════════════════════════════════════════════════════════════════════════

function ModuleElementos() {
  return (
    <div>
      <SectionHeader
        icon="🧱"
        title="Elementos da Referência"
        sub="Toda referência é montada com peças. Aqui estão TODAS as peças possíveis e como usá-las (NBR 6023:2018, seção 8)."
        color={t.cyan}
      />

      <Card color={t.cyan} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.cyan}>Essenciais vs Complementares</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ padding: 12, background: t.surfaceAlt, borderRadius: 8 }}>
            <Badge color={t.green}>Essenciais</Badge>
            <div style={{ marginTop: 8, color: t.text, fontSize: 13, lineHeight: 1.5 }}>
              Indispensáveis para identificar a obra. Variam conforme o tipo de documento (livro, artigo, lei, etc).
            </div>
          </div>
          <div style={{ padding: 12, background: t.surfaceAlt, borderRadius: 8 }}>
            <Badge color={t.yellow}>Complementares</Badge>
            <div style={{ marginTop: 8, color: t.text, fontSize: 13, lineHeight: 1.5 }}>
              Acrescentam informação útil, mas não são obrigatórios. Se usar, use de forma uniforme em todas as referências do mesmo tipo.
            </div>
          </div>
        </div>
      </Card>

      <SubTitle>👤 Autoria — Pessoa Física</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <RuleList
          rules={[
            "Último sobrenome em LETRAS MAIÚSCULAS, seguido do prenome.",
            "Pode abreviar prenomes (J. C.) ou escrever por extenso (José Carlos). Mantenha o padrão em todas as referências.",
            "Múltiplos autores: separe por ponto-e-vírgula seguido de espaço.",
          ]}
          color={t.cyan}
        />
        <ExampleBlock
          label="Variações"
          texto={`SILVA, José Carlos.\nSILVA, J. C.\n\nSOUZA, J. C.; PEREIRA, A. M.; CHAVES, M.\n\nURANI, A. et al.`}
          status="correto"
        />
      </Card>

      <SubTitle>🏛️ Autoria — Pessoa Jurídica</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <RuleList
          rules={[
            "Nome completo ou sigla, em LETRAS MAIÚSCULAS.",
            "Órgãos governamentais: SEMPRE entrada pela jurisdição (BRASIL, SÃO PAULO, RECIFE).",
            "Hierarquia: vai do mais geral para o mais específico (BRASIL. Ministério da Saúde. Secretaria de Atenção Básica.)",
          ]}
          color={t.cyan}
        />
        <ExampleBlock
          label="Hierarquia ministerial"
          texto={`BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Atenção Básica. Estratégias para o cuidado da pessoa com doença crônica: diabetes mellitus. Brasília: Ministério da Saúde, 2013.`}
          status="correto"
        />
      </Card>

      <SubTitle>📛 Sobrenomes especiais</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            {
              tipo: "Sobrenomes hispânicos (penúltimo sobrenome)",
              ex: "SAHELICES GONZÁLEZ, Paulino. Ama y haz lo que quieras. Madrid: Rev. Agustiniana, 2000.\n\nGARCÍA MÁRQUEZ, Gabriel. O amor nos tempos do cólera.",
            },
            {
              tipo: "Grau de parentesco (Filho, Júnior, Neto, Sobrinho)",
              ex: "ASSAF NETO, Alexandre. Estrutura e análise de balanços.\n\nGRISARD FILHO, Waldyr. Guarda compartilhada.",
            },
            {
              tipo: "Sobrenomes compostos (com hífen)",
              ex: "SAINT-ARNAUD, Yves. A pessoa humana. São Paulo: Loyola, 1984.",
            },
            {
              tipo: "Prefixos (van, von, du, de la, etc.)",
              ex: "Para sobrenomes com prefixos, mantenha o prefixo: HOUTE, Jef Van den.\nSegue regras do código de catalogação do país de origem.",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                background: t.surfaceAlt,
                borderRadius: 8,
                borderLeft: `3px solid ${t.cyan}`,
              }}
            >
              <div style={{ fontWeight: 700, color: t.text, marginBottom: 6, fontSize: 13 }}>
                {s.tipo}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: 12,
                  color: t.textMuted,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {s.ex}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SubTitle>📖 Título e subtítulo</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <RuleList
          rules={[
            "Título em DESTAQUE TIPOGRÁFICO (negrito, itálico ou sublinhado) — escolha um e mantenha.",
            "Subtítulo SEM destaque, separado do título por dois pontos.",
            "Quando entrada é por título (sem autor), a primeira palavra fica em MAIÚSCULAS.",
            "Em títulos longos, pode-se suprimir partes com [...].",
          ]}
          color={t.cyan}
        />
        <ExampleBlock
          label="Com subtítulo"
          texto={`PASTRO, Cláudio. Arte sacra: espaço sagrado hoje. São Paulo: Loyola, 1993.`}
          status="correto"
        />
        <ExampleBlock
          label="Entrada por título"
          texto={`OS GRANDES clássicos das poesias líricas. [S. l.]: Ex Libris, 1981.`}
          status="correto"
        />
      </Card>

      <SubTitle>🔢 Edição</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <RuleList
          rules={[
            "Indica-se a partir da 2ª edição. A 1ª não precisa ser informada.",
            "Use o número da edição em algarismos arábicos seguido de 'ed.': 2. ed., 3. ed.",
            "Acréscimos como 'rev.' (revista), 'aum.' (aumentada) vêm em seguida: 5. ed. rev. atual.",
          ]}
          color={t.cyan}
        />
        <ExampleBlock
          label="Exemplos"
          texto={`SILVA, J. Saúde. 2. ed. Rio de Janeiro: Atlas, 2020.\n\nGRISARD FILHO, W. Guarda compartilhada. 5. ed. rev. atual. São Paulo: Revista dos Tribunais, c2011.`}
          status="correto"
        />
      </Card>

      <SubTitle>🌍 Local, editora e data</SubTitle>
      <Card style={{ marginBottom: 14 }}>
        <RuleList
          rules={[
            "LOCAL: cidade da publicação. Se não consta, use [S. l.] (sine loco).",
            "EDITORA: nome da editora. Se não consta, use [s. n.] (sine nomine).",
            "Quando local e editora estão ausentes: [S. l.: s. n.].",
            "DATA: ano em algarismos arábicos. Para datas indefinidas, use as marcações entre colchetes (ver módulo 'Casos Faltantes').",
            "Se duas cidades têm o mesmo nome, acrescente o estado: Viçosa, MG / Viçosa, RN.",
          ]}
          color={t.cyan}
        />
        <ExampleBlock
          label="Padrão"
          texto={`AUTOR. Título. Local: Editora, ano.\n\nSILVA, J. Saúde pública. São Paulo: Atlas, 2020.`}
          status="correto"
        />
        <ExampleBlock
          label="Sem local e editora"
          texto={`GONÇALVES, F. B. A história de Mirador. [S. l.: s. n.], 1993.`}
          status="atencao"
        />
        <ExampleBlock
          label="Duas editoras com locais diferentes"
          texto={`ALFONSO-GOLDFARB, A. M. História da ciência. Rio de Janeiro: Expressão e Cultura; São Paulo: EDUSP, 1995.`}
          status="atencao"
        />
        <ExampleBlock
          label="Editora também é o autor (use sigla se houver)"
          texto={`INSTITUTO NACIONAL DO CÂNCER (Brasil). A situação do tabagismo no Brasil. Rio de Janeiro: INCA, c2011.`}
          status="atencao"
        />
      </Card>

      <SubTitle>📅 Quando o ano não está claro</SubTitle>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { sigla: "[1971 ou 1972]", desc: "Um ano ou outro" },
            { sigla: "[1969?]", desc: "Ano provável" },
            { sigla: "[1973]", desc: "Ano certo, não indicado no item" },
            { sigla: "[entre 1906 e 1912]", desc: "Intervalo (menos de 20 anos)" },
            { sigla: "[ca. 1960]", desc: "Ano aproximado" },
            { sigla: "[197-]", desc: "Década certa" },
            { sigla: "[197-?]", desc: "Década provável" },
            { sigla: "[18--]", desc: "Século certo" },
            { sigla: "[18--?]", desc: "Século provável" },
            { sigla: "c2011", desc: "Ano de copyright (sem espaço)" },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                padding: "8px 10px",
                background: t.surfaceAlt,
                borderRadius: 7,
                fontSize: 12,
                color: t.text,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <code
                style={{
                  background: t.bg,
                  padding: "2px 8px",
                  borderRadius: 4,
                  color: t.cyan,
                  fontFamily: "monospace",
                  fontSize: 11,
                  border: `1px solid ${t.border}`,
                  whiteSpace: "nowrap",
                }}
              >
                {d.sigla}
              </code>
              <span style={{ color: t.textMuted, fontSize: 11 }}>{d.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: FORMATAÇÃO TIPOGRÁFICA E CASOS ESPECIAIS
// ═══════════════════════════════════════════════════════════════════════════

function ModuleFormatacao() {
  return (
    <div>
      <SectionHeader
        icon="🎨"
        title="Formatação Tipográfica e Casos Especiais"
        sub="Onde vai o negrito? E o subtítulo? E nomes complicados? Esta é a seção que resolve as dúvidas que ninguém costuma perguntar — mas todo monitor precisa saber."
        color={t.pink}
      />

      {/* === DESTAQUE TIPOGRÁFICO === */}
      <Card color={t.pink} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.pink}>1. Qual destaque escolher?</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          A NBR 6023:2018 permite <b>três</b> formas de destaque tipográfico para o título da obra. Você escolhe <b>uma</b> e usa em <b>todas</b> as referências do trabalho.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { tipo: "Negrito", peso: "700", style: "normal", deco: "none", recomendado: "✅ Mais usado", desc: "Boa legibilidade, padrão em trabalhos acadêmicos." },
            { tipo: "Itálico", peso: "400", style: "italic", deco: "none", recomendado: "👍 Aceitável", desc: "Visualmente sutil, comum em humanidades." },
            { tipo: "Sublinhado", peso: "400", style: "normal", deco: "underline", recomendado: "⚠️ Evite", desc: "Pouco usado, pode confundir com hyperlinks." },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: t.surfaceAlt,
                borderRadius: 10,
                border: `1px solid ${t.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: t.text,
                  fontWeight: d.peso,
                  fontStyle: d.style,
                  textDecoration: d.deco,
                  marginBottom: 8,
                  padding: "8px 10px",
                  background: t.bg,
                  borderRadius: 6,
                  border: `1px solid ${t.border}`,
                }}
              >
                Saúde pública
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.pink, marginBottom: 4 }}>
                {d.tipo}
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.5, marginBottom: 6 }}>
                {d.desc}
              </div>
              <div style={{ fontSize: 11, color: t.text, fontWeight: 600 }}>
                {d.recomendado}
              </div>
            </div>
          ))}
        </div>

        <Note type="warn">
          <b>Regra inegociável:</b> escolha UM e mantenha em TODO o trabalho. Misturar negrito em algumas referências e itálico em outras é erro grave de formatação.
        </Note>
      </Card>

      {/* === TÍTULO COM SUBTÍTULO === */}
      <Card color={t.purple} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.purple}>2. Título com ":" — onde vai o destaque? 🎯</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          <b>Esta é a dúvida mais comum.</b> Quando uma obra tem título e subtítulo, o destaque tipográfico (negrito) vai <b>SOMENTE no título principal</b> — o subtítulo fica <b>sem destaque</b>, separado por dois-pontos.
        </div>

        <div
          style={{
            background: t.bg,
            border: `2px solid ${t.purple}`,
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 11, color: t.purple, fontWeight: 800, marginBottom: 10, letterSpacing: "0.05em" }}>
            FÓRMULA VISUAL
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: t.text,
              lineHeight: 1.8,
            }}
          >
            AUTOR.{" "}
            <span style={{ fontWeight: 800, color: t.purple, background: t.purpleSoft, padding: "2px 6px", borderRadius: 4 }}>
              Título
            </span>
            <span style={{ color: t.yellow, fontWeight: 700, fontSize: 18 }}>:</span>{" "}
            <span style={{ color: t.textMuted, fontStyle: "italic" }}>
              subtítulo sem destaque
            </span>
            . Local: Editora, ano.
          </div>
        </div>

        <div style={{ fontWeight: 700, color: t.text, marginBottom: 10, fontSize: 13 }}>
          Aplicando ao seu exemplo (livro de Endocrinologia):
        </div>
        <ExampleBlock
          label="✅ Correto"
          texto={`SILVA, J. C. Endocrinologia: princípios e prática clínica. 3. ed. São Paulo: Atlas, 2022.\n\n(Onde "Endocrinologia" está em NEGRITO; "princípios e prática clínica" SEM negrito.)`}
          status="correto"
          explicacao="Só o título principal recebe negrito. O subtítulo, mesmo longo, fica sem destaque."
        />
        <ExampleBlock
          label="❌ Errado"
          texto={`SILVA, J. C. Endocrinologia: princípios e prática clínica. 3. ed. São Paulo: Atlas, 2022.\n\n(Aqui o NEGRITO foi aplicado em TUDO, incluindo o subtítulo.)`}
          status="errado"
          explicacao="Tudo em negrito vira poluição visual e descumpre a NBR 6023:2018, seção 8.2."
        />

        <SubTitle color={t.purple}>Mais exemplos da própria norma</SubTitle>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            {
              titulo: "Arte sacra",
              subtitulo: "espaço sagrado hoje",
              full: "PASTRO, Cláudio. Arte sacra: espaço sagrado hoje. São Paulo: Loyola, 1993.",
            },
            {
              titulo: "Estrutura e análise de balanços",
              subtitulo: "um enfoque econômico-financeiro",
              full: "ASSAF NETO, A. Estrutura e análise de balanços: um enfoque econômico-financeiro. 8. ed. São Paulo: Atlas, 2007.",
            },
            {
              titulo: "Guarda compartilhada",
              subtitulo: "um novo modelo de responsabilidade parental",
              full: "GRISARD FILHO, W. Guarda compartilhada: um novo modelo de responsabilidade parental. 5. ed. rev. atual. São Paulo: Revista dos Tribunais, c2011.",
            },
            {
              titulo: "A pessoa humana",
              subtitulo: "introdução ao estudo das relações interpessoais",
              full: "SAINT-ARNAUD, Yves. A pessoa humana: introdução ao estudo da pessoa e das relações interpessoais. São Paulo: Loyola, 1984.",
            },
          ].map((ex, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                background: t.surfaceAlt,
                borderRadius: 8,
                fontSize: 12,
                color: t.text,
                lineHeight: 1.7,
                fontFamily: "'JetBrains Mono', monospace",
                borderLeft: `3px solid ${t.purple}`,
              }}
            >
              {ex.full.split(ex.titulo + ": " + ex.subtitulo).map((part, j) => (
                <span key={j}>
                  {part}
                  {j === 0 && (
                    <>
                      <span style={{ fontWeight: 800, color: t.purple }}>
                        {ex.titulo}
                      </span>
                      <span style={{ color: t.yellow, fontWeight: 700 }}>:</span>{" "}
                      <span style={{ color: t.textMuted }}>{ex.subtitulo}</span>
                    </>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Card>

      {/* === CASO ESPECIAL: ARTIGO DE PERIÓDICO === */}
      <Card color={t.cyan} style={{ marginBottom: 18 }}>
        <SubTitle color={t.cyan}>3. Caso especial: artigo de periódico</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          <b>Atenção!</b> Em artigos de periódico (revista científica), o destaque <b>NÃO</b> vai no título do artigo — vai no <b>nome do periódico</b>.
        </div>

        <ExampleBlock
          label="✅ Correto: destaque no PERIÓDICO"
          texto={`LEITÃO, D. M. A informação como insumo estratégico. Ciência da Informação, Brasília, DF, v. 22, n. 2, p. 118-123, maio/ago. 1989.\n\n(Em "Ciência da Informação" vai NEGRITO; o título do artigo "A informação como insumo estratégico" fica SEM destaque.)`}
          status="correto"
          explicacao="O periódico é o 'recipiente' que precisa ser destacado. O título do artigo é apenas uma parte do periódico."
        />
        <ExampleBlock
          label="❌ Errado: destaque no título do artigo"
          texto={`LEITÃO, D. M. A informação como insumo estratégico. Ciência da Informação, Brasília, DF, v. 22, n. 2, p. 118-123, maio/ago. 1989.`}
          status="errado"
          explicacao="O título do artigo nunca recebe destaque. Quem o recebe é o periódico (revista, jornal, etc.)."
        />

        <Note type="tip">
          <b>Regra mnemônica:</b> o destaque vai sempre no "todo", nunca na "parte". <br />
          • Livro completo → destaque no título do livro. <br />
          • Capítulo de livro → destaque no título do livro (não no capítulo). <br />
          • Artigo de periódico → destaque no nome do periódico (não no artigo).
        </Note>
      </Card>

      {/* === TÍTULOS COM ARTIGOS (A, O, OS, AS, UM) === */}
      <Card color={t.blue} style={{ marginBottom: 18 }}>
        <SubTitle color={t.blue}>4. Títulos que começam com artigo (A, O, OS, AS, UM)</SubTitle>
        <RuleList
          rules={[
            "Quando entrada é por título (sem autor), e o título começa com artigo, mantenha o artigo MAIÚSCULO E inclua a primeira palavra também em MAIÚSCULAS.",
            "Quando o título tem autor (entrada normal), o destaque é aplicado no título inteiro INCLUINDO o artigo, em letra normal.",
          ]}
          color={t.blue}
        />
        <ExampleBlock
          label="Sem autor — entrada pelo título"
          texto={`OS GRANDES clássicos das poesias líricas. [S. l.]: Ex Libris, 1981.\n\nA FLOR prometida. Folha de S. Paulo, São Paulo, ano 75, n. 24.105, p. 4, 2 abr. 1995.`}
          status="correto"
          explicacao='"OS" + "GRANDES" em maiúsculas. "A" + "FLOR" também. Depois disso, o resto segue minúsculo normal.'
        />
        <ExampleBlock
          label="Com autor — destaque normal"
          texto={`SAINT-ARNAUD, Y. A pessoa humana: introdução ao estudo das relações interpessoais. São Paulo: Loyola, 1984.`}
          status="correto"
          explicacao='Quando há autor, o "A" inicial só recebe o destaque junto com o resto do título principal — sem maiúsculas adicionais.'
        />
      </Card>

      {/* === NOMES COMPOSTOS APROFUNDADOS === */}
      <Card color={t.orange} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.orange}>5. Nomes compostos — guia detalhado</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          A NBR 6023:2018 (seção 8.1.1.3) trata os nomes complicados em quatro categorias. Cada uma tem sua regra.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Hispânicos */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.orange}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.orange, fontSize: 14, marginBottom: 6 }}>
              🌎 Sobrenomes hispânicos (espanhóis, latinos)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
              Hispanofalantes geralmente têm DOIS sobrenomes (paterno + materno). A entrada é pelo <b>penúltimo</b> sobrenome (o paterno) — junto com o último.
            </div>
            <ExampleBlock
              label="Exemplos"
              texto={`Gabriel García Márquez → GARCÍA MÁRQUEZ, Gabriel.\nPaulino Sahelices González → SAHELICES GONZÁLEZ, Paulino.\nMario Vargas Llosa → VARGAS LLOSA, Mario.`}
              status="correto"
              explicacao="Os DOIS sobrenomes vêm em maiúsculas, juntos. NÃO se inverte só o último."
            />
          </div>

          {/* Grau de parentesco */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.orange}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.orange, fontSize: 14, marginBottom: 6 }}>
              👨‍👦 Grau de parentesco (Filho, Júnior, Neto, Sobrinho)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
              O grau de parentesco é tratado como <b>parte do sobrenome</b> e vem JUNTO em maiúsculas.
            </div>
            <ExampleBlock
              label="Exemplos"
              texto={`Alexandre Assaf Neto → ASSAF NETO, Alexandre.\nWaldyr Grisard Filho → GRISARD FILHO, Waldyr.\nJoão da Silva Júnior → SILVA JÚNIOR, João da.\nPedro de Oliveira Sobrinho → OLIVEIRA SOBRINHO, Pedro de.`}
              status="correto"
              explicacao="Não jogue 'Filho/Neto/Júnior' lá no final do prenome — eles fazem parte do sobrenome."
            />
            <Note type="danger">
              <b>Erro frequente:</b> escrever "ASSAF, Alexandre Neto." — ERRADO. O "Neto" pertence ao sobrenome. Correto: "ASSAF NETO, Alexandre."
            </Note>
          </div>

          {/* Sobrenomes compostos */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.orange}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.orange, fontSize: 14, marginBottom: 6 }}>
              ➖ Sobrenomes compostos (com hífen)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
              Sobrenomes ligados por hífen são tratados como <b>uma unidade só</b>. Mantenha o hífen.
            </div>
            <ExampleBlock
              label="Exemplos"
              texto={`Yves Saint-Arnaud → SAINT-ARNAUD, Yves.\nLuc Lévi-Strauss → LÉVI-STRAUSS, Luc.\nGetúlio Camargo-Branco → CAMARGO-BRANCO, Getúlio.`}
              status="correto"
              explicacao="O hífen é mantido. NÃO separe os componentes."
            />
          </div>

          {/* Prefixos */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.orange}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.orange, fontSize: 14, marginBottom: 6 }}>
              🌍 Sobrenomes com prefixos (van, von, de, da, du, le)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
              Depende da nacionalidade do autor — siga o costume do país de origem. Em geral:
            </div>
            <RuleList
              color={t.orange}
              rules={[
                "Brasileiro / português: o prefixo vai DEPOIS do prenome (na entrada). Ex: João da Silva → SILVA, João da.",
                "Holandês com 'van', 'de': o prefixo geralmente VAI JUNTO. Ex: Jef Van den Houte → VAN DEN HOUTE, Jef.",
                "Alemão com 'von': depende — quando é nobreza, separa-se; quando é nome civil, junta. Caso a caso.",
                "Francês com 'de la', 'le', 'du': costuma ficar junto. Ex: Pierre de la Fontaine → DE LA FONTAINE, Pierre.",
                "Italiano com 'di', 'da': geralmente junto. Ex: Leonardo da Vinci → DA VINCI, Leonardo.",
              ]}
            />
            <ExampleBlock
              label="Casos práticos"
              texto={`João da Silva → SILVA, João da.\nMaria de Fátima Souza → SOUZA, Maria de Fátima.\nJef Van den Houte → VAN DEN HOUTE, Jef.\nLudwig van Beethoven → BEETHOVEN, Ludwig van.\nLeonardo da Vinci → VINCI, Leonardo da. (uso brasileiro)\n   ou DA VINCI, Leonardo. (uso italiano)`}
              status="atencao"
              explicacao="Em caso de dúvida em autor estrangeiro, consulte como ele aparece em catálogos de bibliotecas (LC ou BN)."
            />
          </div>
        </div>
      </Card>

      {/* === DIRETRIZES APROFUNDADAS === */}
      <Card color={t.green} glow>
        <SubTitle color={t.green}>6. Diretrizes — modelos completos por tipo</SubTitle>
        <div style={{ color: t.text, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          Diretrizes (clínicas, terapêuticas, pedagógicas) são documentos institucionais — não artigos. Têm peculiaridades que dependem de quem publicou. Aqui estão os 4 cenários mais comuns na monitoria de saúde.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Cenário 1: Sociedade científica */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.green}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.green, fontSize: 14, marginBottom: 6 }}>
              🏥 A. Diretriz de sociedade científica brasileira (publicação independente)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
              <b>Tratamento:</b> monografia. A sociedade é o autor-entidade.
            </div>
            <div
              style={{
                padding: "10px 12px",
                background: t.bg,
                borderRadius: 7,
                border: `1px solid ${t.border}`,
                fontSize: 11,
                color: t.green,
                fontFamily: "monospace",
                marginBottom: 8,
              }}
            >
              ENTIDADE. <b>Título da diretriz</b>: subtítulo. Edição. Local: Editora, ano.
            </div>
            <ExampleBlock
              label="Exemplo"
              texto={`SOCIEDADE BRASILEIRA DE DIABETES. Diretrizes da Sociedade Brasileira de Diabetes 2023: tratamento e acompanhamento do diabetes mellitus. São Paulo: Clannad, 2023.`}
              status="correto"
              explicacao='Note onde vai o destaque (somente em "Diretrizes da Sociedade Brasileira de Diabetes 2023") e onde vai o subtítulo (sem destaque).'
            />
          </div>

          {/* Cenário 2: Diretriz publicada em revista */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.green}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.green, fontSize: 14, marginBottom: 6 }}>
              📰 B. Diretriz publicada em revista científica
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
              <b>Tratamento:</b> artigo de periódico. O destaque vai no NOME DA REVISTA, não na diretriz.
            </div>
            <div
              style={{
                padding: "10px 12px",
                background: t.bg,
                borderRadius: 7,
                border: `1px solid ${t.border}`,
                fontSize: 11,
                color: t.green,
                fontFamily: "monospace",
                marginBottom: 8,
              }}
            >
              ENTIDADE. Título da diretriz. <b>Nome da Revista</b>, Local, v., n., p. inicial-final, mês ano.
            </div>
            <ExampleBlock
              label="Exemplo"
              texto={`SOCIEDADE BRASILEIRA DE CARDIOLOGIA. Diretriz brasileira de hipertensão arterial – 2020. Arquivos Brasileiros de Cardiologia, São Paulo, v. 116, n. 3, p. 516-658, mar. 2021.`}
              status="correto"
              explicacao='O destaque (negrito) vai em "Arquivos Brasileiros de Cardiologia" (a revista), NÃO em "Diretriz brasileira de hipertensão arterial".'
            />
          </div>

          {/* Cenário 3: Protocolo do Ministério da Saúde */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.green}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.green, fontSize: 14, marginBottom: 6 }}>
              🏛️ C. Protocolo Clínico e Diretrizes Terapêuticas (PCDT) do Ministério da Saúde
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
              <b>Tratamento:</b> documento institucional governamental. Entrada por jurisdição.
            </div>
            <div
              style={{
                padding: "10px 12px",
                background: t.bg,
                borderRadius: 7,
                border: `1px solid ${t.border}`,
                fontSize: 11,
                color: t.green,
                fontFamily: "monospace",
                marginBottom: 8,
              }}
            >
              BRASIL. Ministério da Saúde. [Secretaria]. [Departamento]. <b>Título</b>: subtítulo. Local: MS, ano.
            </div>
            <ExampleBlock
              label="Exemplo (impresso)"
              texto={`BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Departamento de Doenças de Condições Crônicas e Infecções Sexualmente Transmissíveis. Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Adultos. Brasília: Ministério da Saúde, 2018.`}
              status="correto"
            />
            <ExampleBlock
              label="Exemplo (online)"
              texto={`BRASIL. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Protocolo Clínico e Diretrizes Terapêuticas: hipertensão arterial. Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/saude/pt-br/protocolos-clinicos. Acesso em: 5 abr. 2024.`}
              status="correto"
              explicacao="Para versão online, sempre adicione 'Disponível em:' + 'Acesso em:'."
            />
          </div>

          {/* Cenário 4: Diretriz internacional */}
          <div
            style={{
              padding: 14,
              background: t.surfaceAlt,
              borderRadius: 10,
              borderLeft: `3px solid ${t.green}`,
            }}
          >
            <div style={{ fontWeight: 800, color: t.green, fontSize: 14, marginBottom: 6 }}>
              🌐 D. Diretriz internacional (OMS, OPAS, etc.)
            </div>
            <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
              <b>Tratamento:</b> monografia. A entidade internacional é o autor.
            </div>
            <ExampleBlock
              label="Exemplo (OMS)"
              texto={`WORLD HEALTH ORGANIZATION. WHO guidelines on antenatal care for a positive pregnancy experience. Geneva: WHO, 2016. Disponível em: https://www.who.int/publications/i/item/9789241549912. Acesso em: 5 abr. 2024.`}
              status="correto"
              explicacao="Use o nome da entidade no idioma original (ou traduzido, mas seja consistente em todo o trabalho)."
            />
            <ExampleBlock
              label="Exemplo (OPAS, em português)"
              texto={`ORGANIZAÇÃO PAN-AMERICANA DA SAÚDE. Diretrizes para o cuidado de hipertensão na atenção primária à saúde. Washington, D.C.: OPAS, 2020. Disponível em: https://iris.paho.org. Acesso em: 5 abr. 2024.`}
              status="correto"
            />
          </div>
        </div>

        <Note type="tip">
          <b>Como decidir o tratamento de uma diretriz?</b> Pergunte: <b>foi publicada SOZINHA ou DENTRO de uma revista?</b> Sozinha (com ISBN, capa, volume independente) → monografia. Dentro de uma revista (com volume, número, páginas) → artigo de periódico.
        </Note>
      </Card>

      {/* === RESUMO FINAL === */}
      <Card style={{ marginTop: 18 }}>
        <SubTitle>📋 Resumo: onde vai o destaque?</SubTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {[
            { tipo: "Livro", local: "Título do livro" },
            { tipo: "Capítulo de livro", local: "Título do livro (não no capítulo)" },
            { tipo: "Artigo de periódico", local: "Nome do periódico (não no artigo)" },
            { tipo: "Tese / TCC", local: "Título da tese/TCC" },
            { tipo: "Lei / Decreto", local: "Não tem destaque (ementa sem destaque)" },
            { tipo: "Diretriz autônoma", local: "Título da diretriz" },
            { tipo: "Diretriz em revista", local: "Nome da revista" },
            { tipo: "Site / Página", local: "Título da página" },
            { tipo: "Vídeo", local: "Título do vídeo" },
            { tipo: "Norma técnica (NBR)", local: "Título da norma" },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                padding: "10px 12px",
                background: t.surfaceAlt,
                borderRadius: 8,
                fontSize: 12,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <span style={{ color: t.text, fontWeight: 700, minWidth: 110 }}>
                {d.tipo}:
              </span>
              <span style={{ color: t.pink, fontWeight: 600 }}>{d.local}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: TIPOS DE DOCUMENTOS
// ═══════════════════════════════════════════════════════════════════════════

const tiposDocumentos = [
  {
    id: "livro",
    icone: "📚",
    titulo: "Livro / Monografia",
    norma: "NBR 6023:2018, seção 7.1",
    cor: t.blue,
    estrutura: "AUTOR. Título: subtítulo. Edição. Local: Editora, ano.",
    exemplos: [
      {
        label: "Livro impresso",
        texto: "SILVA, José Carlos. Saúde coletiva no Brasil: bases teóricas. 3. ed. São Paulo: Hucitec, 2020.",
      },
      {
        label: "Livro com 3 autores",
        texto: "PASSOS, L. M. M.; FONSECA, A.; CHAVES, M. Alegria de saber: matemática, segunda série, 2, primeiro grau: livro do professor. São Paulo: Scipione, 1995. 136 p.",
      },
      {
        label: "E-book",
        texto: "GODINHO, Thais. Vida organizada: como definir prioridades e transformar seus sonhos em objetivos. São Paulo: Gente, 2014. E-book.",
      },
      {
        label: "Livro online",
        texto: "BAVARESCO, Agemir; BARBOSA, Evandro; ETCHEVERRY, Katia Martin (org.). Projetos de filosofia. Porto Alegre: EDIPUCRS, 2011. E-book (213 p.). (Coleção Filosofia). ISBN 978-85-397-0073-8. Disponível em: http://ebooks.pucrs.br/edipucrs/projetosdefilosofia.pdf. Acesso em: 21 ago. 2011.",
      },
    ],
    erros: [
      "Esquecer o destaque tipográfico (negrito ou itálico) no título",
      "Misturar prenomes abreviados e por extenso na mesma lista",
      "Não indicar a edição quando a obra está numa edição que não é a 1ª",
    ],
  },
  {
    id: "capitulo",
    icone: "📖",
    titulo: "Capítulo de livro",
    norma: "NBR 6023:2018, seção 7.3",
    cor: t.blue,
    estrutura: "AUTOR DO CAPÍTULO. Título do capítulo. In: AUTOR DO LIVRO. Título do livro. Edição. Local: Editora, ano. p. inicial-final.",
    exemplos: [
      {
        label: "Capítulo de livro com autores diferentes",
        texto: "ROMANO, Giovanni. Imagens da juventude na era moderna. In: LEVI, Giovanni; SCHMIDT, Jean-Claude (org.). História dos jovens 2: a época contemporânea. São Paulo: Companhia das Letras, 1996. p. 7-16.",
      },
      {
        label: "Capítulo do mesmo autor do livro",
        texto: "SANTOS, F. R. dos. A colonização da terra do Tucujús. In: SANTOS, F. R. dos. História do Amapá: 1º grau. 2. ed. Macapá: Valcan, 1994. p. 15-24.",
      },
    ],
    erros: [
      "Esquecer o 'In:' antes da referência do livro principal",
      "Não indicar a paginação inicial-final do capítulo",
      "Confundir a posição do destaque (negrito vai no título do LIVRO, não do capítulo)",
    ],
  },
  {
    id: "artigo",
    icone: "📰",
    titulo: "Artigo de periódico",
    norma: "NBR 6023:2018, seção 7.7",
    cor: t.blue,
    estrutura: "AUTOR. Título do artigo. Título do Periódico, Local, volume, número, páginas, mês ano.",
    exemplos: [
      {
        label: "Artigo impresso",
        texto: "BENNETTON, M. J. Terapia ocupacional e reabilitação psicossocial: uma relação possível. Revista de Terapia Ocupacional da Universidade de São Paulo, São Paulo, v. 4, n. 3, p. 11-16, mar. 1993.",
      },
      {
        label: "Artigo online com DOI",
        texto: "DANTAS, José Alves et al. Regulação da auditoria em sistemas bancários: análise do cenário internacional. Revista Contabilidade & Finanças, São Paulo, v. 25, n. 64, p. 7-18, jan./abr. 2014. DOI: http://dx.doi.org/10.1590/S1519-70772014000100002. Disponível em: http://www.scielo.br/scielo.php?script=sci_arttext&pid=S1519-70772014000100002. Acesso em: 20 maio 2014.",
      },
      {
        label: "Artigo com 4+ autores (et al.)",
        texto: "SILVA, A. M. et al. Cobertura vacinal contra COVID-19 no Brasil. Cadernos de Saúde Pública, Rio de Janeiro, v. 38, n. 4, e00012345, 2022. DOI: 10.1590/0102-311X00012345.",
      },
    ],
    erros: [
      "Confundir destaque: o nome do PERIÓDICO recebe negrito, não o título do artigo",
      "Esquecer volume, número, ou páginas",
      "Não incluir DOI quando disponível (recomendado para artigos científicos)",
    ],
  },
  {
    id: "tcc",
    icone: "🎓",
    titulo: "TCC, Dissertação, Tese",
    norma: "NBR 6023:2018, seção 7.1 (monografia)",
    cor: t.purple,
    estrutura: "AUTOR. Título. Ano. Tipo (grau e área) – Instituição, Local, ano.",
    exemplos: [
      {
        label: "TCC (graduação)",
        texto: "ALVES, Daian Péricles. Implementação de conceitos de manufatura colaborativa: um projeto virtual. 2008. Trabalho de Conclusão de Curso (Bacharelado em Engenharia Industrial Mecânica) – Universidade Tecnológica Federal do Paraná, Curitiba, 2008.",
      },
      {
        label: "Dissertação (mestrado) online",
        texto: "COELHO, Ana Cláudia. Fatores determinantes de qualidade de vida física e mental em pacientes com doença pulmonar intersticial: uma análise multifatorial. 2009. Dissertação (Mestrado em Ciências Médicas) – Faculdade de Medicina, Universidade Federal do Rio Grande do Sul, Porto Alegre, 2009. Disponível em: http://www.lume.ufrgs.br/bitstream/handle/10183/16359/000695147.pdf. Acesso em: 4 set. 2009.",
      },
      {
        label: "Tese (doutorado)",
        texto: "RODRIGUES, Ana Lúcia Aquilas. Impacto de um programa de exercícios no local de trabalho sobre o nível de atividade física. 2009. 82 f. Tese (Doutorado em Fisiopatologia Experimental) – Faculdade de Medicina, Universidade de São Paulo, São Paulo, 2009.",
      },
    ],
    erros: [
      "Não diferenciar entre TCC, Dissertação e Tese — cada um tem grau específico",
      "Esquecer a instituição depois do '–'",
      "Esquecer 'Disponível em:' e 'Acesso em:' para versões online",
    ],
  },
  {
    id: "evento",
    icone: "🎤",
    titulo: "Trabalho em evento (Anais de congresso)",
    norma: "NBR 6023:2018, seção 7.5",
    cor: t.purple,
    estrutura: "AUTOR. Título do trabalho. In: NOME DO EVENTO, número., ano, Local. Anais [...]. Local: Editora, ano. p. inicial-final.",
    exemplos: [
      {
        label: "Trabalho impresso",
        texto: "BRAYNER, A. R. A.; MEDEIROS, C. B. Incorporação do tempo em SGBD orientado a objetos. In: SIMPÓSIO BRASILEIRO DE BANCO DE DADOS, 9., 1994, São Paulo. Anais [...]. São Paulo: USP, 1994. p. 16-29.",
      },
      {
        label: "Trabalho em evento online",
        texto: "GONÇALVES, Carmen Diego. Estilo de pensamento na produção de conhecimento científico. In: CONGRESSO PORTUGUÊS DE SOCIOLOGIA, 4., 2000, Coimbra. Actas do [...]. Lisboa: Associação Portuguesa de Sociologia, 2000. Disponível em: http://aps.pt/wp-content/uploads/2017/08/DPR462de12f4bb03_1.pdf. Acesso em: 3 maio 2010.",
      },
    ],
    erros: [
      "Confundir 'In:' com 'in' (deve ter dois pontos e MAIÚSCULAS)",
      "Esquecer o número do evento em algarismos arábicos seguido de ponto",
      "Não usar 'Anais [...]' quando o título completo é longo",
    ],
  },
  {
    id: "lei",
    icone: "⚖️",
    titulo: "Lei, Decreto, Portaria",
    norma: "NBR 6023:2018, seção 7.11.1",
    cor: t.yellow,
    estrutura: "JURISDIÇÃO. Tipo nº X, de DD de mês de AAAA. Ementa. Publicação: dados.",
    exemplos: [
      {
        label: "Lei federal (impressa)",
        texto: "BRASIL. Lei nº 8.080, de 19 de setembro de 1990. Dispõe sobre as condições para a promoção, proteção e recuperação da saúde, a organização e o funcionamento dos serviços correspondentes. Diário Oficial da União: seção 1, Brasília, DF, p. 18055, 20 set. 1990.",
      },
      {
        label: "Lei federal online",
        texto: "BRASIL. Lei nº 8.080, de 19 de setembro de 1990. Dispõe sobre as condições para a promoção, proteção e recuperação da saúde. Diário Oficial da União: seção 1, Brasília, DF, p. 18055, 20 set. 1990. Disponível em: https://www.planalto.gov.br/ccivil_03/leis/l8080.htm. Acesso em: 15 mar. 2024.",
      },
      {
        label: "Constituição",
        texto: "BRASIL. [Constituição (1988)]. Constituição da República Federativa do Brasil de 1988. Brasília, DF: Presidência da República, [2016]. Disponível em: http://www.planalto.gov.br/ccivil_03/Constituicao/Constituicao.htm. Acesso em: 1 jan. 2017.",
      },
      {
        label: "Decreto-lei",
        texto: "BRASIL. Decreto-lei nº 200, de 25 de fevereiro de 1967. Dispõe sobre a organização da Administração Federal, estabelece diretrizes para a Reforma Administrativa, e dá outras providências. In: VADE mecum. Porto Alegre: Verbo Jurídico, 2007. 1 CD-ROM, p. 1-90.",
      },
      {
        label: "Lei municipal",
        texto: "CURITIBA. Lei nº 12.092, de 21 de dezembro de 2006. Estima a receita e fixa a despesa do município de Curitiba para o exercício financeiro de 2007. Curitiba: Câmara Municipal, [2007]. Disponível em: http://domino.cmc.pr.gov.br/contlei.nsf/leis. Acesso em: 22 mar. 2007.",
      },
      {
        label: "Portaria do Ministério da Saúde",
        texto: "BRASIL. Ministério da Saúde. Portaria nº 2.436, de 21 de setembro de 2017. Aprova a Política Nacional de Atenção Básica. Diário Oficial da União: seção 1, Brasília, DF, n. 183, p. 68, 22 set. 2017.",
      },
    ],
    erros: [
      "Esquecer a JURISDIÇÃO (BRASIL./CURITIBA./etc.) no início",
      "Não incluir a ementa (texto resumido da lei)",
      "Esquecer o Diário Oficial ou a URL para versão online",
      "Misturar lei com Portaria (a portaria é do MS, não do BRASIL puro)",
    ],
  },
  {
    id: "jurisprudencia",
    icone: "🏛️",
    titulo: "Jurisprudência (Acórdão, Sentença, Súmula)",
    norma: "NBR 6023:2018, seção 7.11.3",
    cor: t.yellow,
    estrutura: "JURISDIÇÃO. Nome da corte. Tipo de documento. Ementa. Relator. Data. Dados de publicação.",
    exemplos: [
      {
        label: "Acórdão",
        texto: "BRASIL. Supremo Tribunal Federal (2. Turma). Recurso Extraordinário 313060/SP. Leis 10.927/91 e 11.262 do município de São Paulo. Seguro obrigatório contra furto e roubo de automóveis [...]. Recorrente: Banco do Estado de São Paulo S/A – BANESPA. Recorrido: Município de São Paulo. Relatora: Min. Ellen Gracie, 29 de novembro de 2005. Lex: jurisprudência do Supremo Tribunal Federal, São Paulo, v. 28, n. 327, p. 226-230, 2006.",
      },
      {
        label: "Súmula",
        texto: "BRASIL. Superior Tribunal de Justiça. Súmula nº 333. Cabe mandado de segurança contra ato praticado em licitação promovida por sociedade de economia mista ou empresa pública. Diário da Justiça: seção 1, Brasília, DF, ano 82, n. 32, p. 246, 14 fev. 2007.",
      },
    ],
    erros: [
      "Não indicar a turma/seção do tribunal",
      "Esquecer o relator e a data do julgamento",
      "Não incluir os dados completos de publicação (revista, volume, número, página)",
    ],
  },
  {
    id: "ministerio",
    icone: "🏥",
    titulo: "Documento do Ministério da Saúde",
    norma: "NBR 6023:2018, seção 7.1 + 6.6 (online)",
    cor: t.green,
    estrutura: "BRASIL. Ministério da Saúde. [Secretaria/Departamento]. Título: subtítulo. Edição. Local: Editora, ano. (Série, número).",
    exemplos: [
      {
        label: "Caderno de Atenção Básica",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Atenção Básica. Estratégias para o cuidado da pessoa com doença crônica: diabetes mellitus. Brasília: Ministério da Saúde, 2013. (Cadernos de Atenção Básica, n. 36).",
      },
      {
        label: "Guia alimentar (online)",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf. Acesso em: 20 mar. 2024.",
      },
      {
        label: "Nota Técnica",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Nota Técnica nº 5/2021: monitoramento dos casos de arboviroses urbanas. Brasília: Ministério da Saúde, 2021.",
      },
      {
        label: "Boletim epidemiológico",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Boletim Epidemiológico: dengue, chikungunya e zika. Brasília, v. 55, n. 12, mar. 2024. Disponível em: https://www.gov.br/saude/boletim-epidemiologico. Acesso em: 5 abr. 2024.",
      },
      {
        label: "Manual técnico",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Departamento de Vigilância das Doenças Transmissíveis. Manual de recomendações para o controle da tuberculose no Brasil. 2. ed. Brasília: Ministério da Saúde, 2019. 364 p.",
      },
    ],
    erros: [
      "Iniciar por 'MINISTÉRIO DA SAÚDE' sem o 'BRASIL.' antes",
      "Não hierarquizar os órgãos (Ministério > Secretaria > Departamento)",
      "Esquecer a série/coleção entre parênteses (quando há)",
      "Não colocar 'Brasília: Ministério da Saúde' como local/editora",
    ],
  },
  {
    id: "diretriz",
    icone: "📑",
    titulo: "Diretrizes / Protocolos clínicos",
    norma: "NBR 6023:2018, seção 7.1 (tratado como monografia)",
    cor: t.green,
    estrutura: "Varia conforme o emissor: governo (jurisdição) ou sociedade médica (entidade).",
    exemplos: [
      {
        label: "Sociedade brasileira",
        texto: "SOCIEDADE BRASILEIRA DE DIABETES. Diretrizes da Sociedade Brasileira de Diabetes 2023. São Paulo: Clannad, 2023.",
      },
      {
        label: "Sociedade brasileira (online)",
        texto: "SOCIEDADE BRASILEIRA DE CARDIOLOGIA. Diretriz brasileira de hipertensão arterial – 2020. Arquivos Brasileiros de Cardiologia, São Paulo, v. 116, n. 3, p. 516-658, mar. 2021. Disponível em: http://publicacoes.cardiol.br/portal/abc/diretrizes.asp. Acesso em: 10 abr. 2024.",
      },
      {
        label: "Protocolo do MS",
        texto: "BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Departamento de Doenças de Condições Crônicas e Infecções Sexualmente Transmissíveis. Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Adultos. Brasília: Ministério da Saúde, 2018.",
      },
      {
        label: "Diretriz internacional",
        texto: "WORLD HEALTH ORGANIZATION. WHO guidelines on antenatal care for a positive pregnancy experience. Geneva: WHO, 2016. Disponível em: https://www.who.int/publications/i/item/9789241549912. Acesso em: 5 abr. 2024.",
      },
    ],
    erros: [
      "Tratar diretriz como artigo de periódico quando ela é, na verdade, um documento institucional",
      "Não identificar corretamente o órgão emissor",
      "Esquecer URL e data de acesso para versões online",
    ],
  },
  {
    id: "site",
    icone: "🌐",
    titulo: "Site / Página da internet",
    norma: "NBR 6023:2018, seção 6.6 + 7.16",
    cor: t.cyan,
    estrutura: "AUTOR/ENTIDADE. Título da página: subtítulo. Local, ano. Disponível em: URL. Acesso em: data.",
    exemplos: [
      {
        label: "Página institucional",
        texto: "BRASIL. Ministério da Saúde. Dengue. Brasília, 2024. Disponível em: https://www.gov.br/saude/saude-de-a-z/dengue. Acesso em: 5 abr. 2024.",
      },
      {
        label: "Artigo em site jornalístico",
        texto: "SANTOS, Marcos. Vacinação contra gripe começa em abril. Saúde em Foco, São Paulo, 2024. Disponível em: https://www.saudeemfoco.com.br/vacinacao-gripe. Acesso em: 2 abr. 2024.",
      },
      {
        label: "Sem autoria identificada",
        texto: "DENGUE: o que é, sintomas e tratamento. [S. l.], 2023. Disponível em: https://www.site.com.br/dengue. Acesso em: 10 mar. 2024.",
      },
      {
        label: "Verbete de Wikipedia",
        texto: "LAPAROTOMIA. In: WIKIPÉDIA: a enciclopédia livre. [S. l.]: Wikimedia Foundation, 2023. Disponível em: https://pt.wikipedia.org/wiki/Laparotomia. Acesso em: 18 mar. 2023.",
      },
      {
        label: "Post de blog",
        texto: "CID, Rodrigo. Deus: argumentos da impossibilidade e da incompatibilidade. In: CARVALHO, M. A. Q. et al. Blog investigação filosófica. Rio de Janeiro, 23 abr. 2011. Disponível em: http://investigacao-filosofica.blogspot.com/search/label/Postagens. Acesso em: 23 ago. 2011.",
      },
      {
        label: "Post em rede social",
        texto: "FUNDAÇÃO BIBLIOTECA NACIONAL (Brasil). BNDIGITAL I: Coleção Casa dos Contos. Rio de Janeiro, 23 fev. 2015. Facebook: bibliotecanacional.br. Disponível em: https://www.facebook.com/bibliotecanacional.br. Acesso em: 26 fev. 2015.",
      },
    ],
    erros: [
      "Não incluir 'Acesso em:' (OBRIGATÓRIO para qualquer fonte online)",
      "Apenas colar o URL sem os outros elementos",
      "Esquecer 'Disponível em:' antes do URL",
      "Não tentar identificar autor/entidade — sempre tente, antes de marcar como anônimo",
    ],
  },
  {
    id: "video",
    icone: "🎬",
    titulo: "Vídeo / YouTube",
    norma: "NBR 6023:2018, seção 7.13",
    cor: t.pink,
    estrutura: "AUTOR/CANAL. Título do vídeo. Local: Plataforma, ano. duração. Disponível em: URL. Acesso em: data.",
    exemplos: [
      {
        label: "Vídeo no YouTube",
        texto: "USP. Aula 1: introdução à epidemiologia. São Paulo: USP, 2020. 1 vídeo (32 min). Publicado pelo canal USP Online. Disponível em: https://www.youtube.com/watch?v=xxxxxx. Acesso em: 15 abr. 2024.",
      },
      {
        label: "DVD",
        texto: "BLADE Runner. Direção: Ridley Scott. Produção: Michael Deeley. Intérpretes: Harrison Ford; Rutger Hauer; Sean Young; Edward James Olmos e outros. Roteiro: Hampton Fancher e David Peoples. Música: Vangelis. Los Angeles: Warner Brothers, c1991. 1 DVD (117 min), widescreen, color.",
      },
      {
        label: "Documentário",
        texto: "OS PERIGOS do uso de tóxicos. Produção de Jorge Ramos de Andrade. São Paulo: CERAVI, 1983. 1 fita de vídeo (30 min), VHS, son., color.",
      },
    ],
    erros: [
      "Não indicar a duração do vídeo",
      "Esquecer o canal/plataforma de publicação",
      "Não incluir 'Acesso em:' para vídeos online",
    ],
  },
  {
    id: "verbete",
    icone: "📔",
    titulo: "Verbete de dicionário ou enciclopédia",
    norma: "NBR 6023:2018, seção 7.3 (parte de monografia)",
    cor: t.purple,
    estrutura: "VERBETE. In: AUTOR. Título da obra. Edição. Local: Editora, ano. p. X.",
    exemplos: [
      {
        label: "Verbete de dicionário",
        texto: "SAÚDE. In: HOUAISS, Antônio. Dicionário Houaiss da língua portuguesa. Rio de Janeiro: Objetiva, 2009. p. 1689.",
      },
      {
        label: "Verbete sem autor",
        texto: "EPIDEMIOLOGIA. In: BARSA: enciclopédia online. São Paulo: Barsa, 2024. Disponível em: https://barsa.com.br/epidemiologia. Acesso em: 10 abr. 2024.",
      },
    ],
    erros: [
      "Não diferenciar verbete (entrada) de capítulo",
      "Esquecer o 'In:' antes do nome do dicionário/enciclopédia",
      "Não indicar a página específica do verbete",
    ],
  },
  {
    id: "email",
    icone: "✉️",
    titulo: "Mensagem eletrônica (e-mail, mensagem)",
    norma: "NBR 6023:2018, seção 7.18",
    cor: t.orange,
    estrutura: "REMETENTE. Assunto. Destinatário: nome. Local, data. 1 mensagem eletrônica.",
    exemplos: [
      {
        label: "E-mail",
        texto: "ALMEIDA, M. P. S. Fichas para MARC. Destinatário: Maria Teresa Reis Mendes. [S. l.], 12 jan. 2002. 1 mensagem eletrônica.",
      },
    ],
    erros: [
      "Citar e-mails como se fossem fontes acadêmicas (use com parcimônia)",
      "Esquecer 'Destinatário:' antes do nome",
      "Não indicar '1 mensagem eletrônica' ao final",
    ],
  },
  {
    id: "norma",
    icone: "📐",
    titulo: "Norma técnica (NBR, ISO)",
    norma: "NBR 6023:2018, seção 7.12",
    cor: t.purple,
    estrutura: "ENTIDADE NORMALIZADORA. Código da norma: título da norma. Local: Editora, ano.",
    exemplos: [
      {
        label: "Norma da ABNT",
        texto: "ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. ABNT NBR 6023: informação e documentação — referências — elaboração. Rio de Janeiro: ABNT, 2018.",
      },
      {
        label: "Norma ISO",
        texto: "INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. ISO 9001: quality management systems — requirements. 5. ed. Geneva: ISO, 2015.",
      },
    ],
    erros: [
      "Citar a norma sem a entidade normalizadora",
      "Esquecer o código completo (NBR 6023, não só 6023)",
      "Não indicar o ano de publicação da norma (importante porque normas são revisadas)",
    ],
  },
];

function ModuleTipos() {
  const [tipoAtivo, setTipoAtivo] = useState("livro");
  const [copiedIdx, setCopiedIdx] = useState(null);
  const tipo = tiposDocumentos.find((d) => d.id === tipoAtivo);

  return (
    <div>
      <SectionHeader
        icon="📦"
        title="Tipos de Documentos"
        sub={`${tiposDocumentos.length} tipos cobertos. Cada um tem estrutura, exemplos prontos para copiar e os erros mais frequentes.`}
        color={t.purple}
      />

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 18,
          padding: 8,
          background: t.surface,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
        }}
      >
        {tiposDocumentos.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setTipoAtivo(d.id);
              setCopiedIdx(null);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: `1px solid ${tipoAtivo === d.id ? d.cor : "transparent"}`,
              background: tipoAtivo === d.id ? d.cor + "22" : "transparent",
              color: tipoAtivo === d.id ? d.cor : t.textMuted,
              fontWeight: tipoAtivo === d.id ? 700 : 400,
              cursor: "pointer",
              fontSize: 12,
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {d.icone} {d.titulo}
          </button>
        ))}
      </div>

      <Card color={tipo.cor} glow style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 30 }}>{tipo.icone}</span>
          <div>
            <div style={{ fontWeight: 800, color: t.text, fontSize: 17 }}>
              {tipo.titulo}
            </div>
            <Badge color={tipo.cor}>{tipo.norma}</Badge>
          </div>
        </div>

        <div
          style={{
            background: tipo.cor + "11",
            border: `1px solid ${tipo.cor}44`,
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: tipo.cor,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Estrutura
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: 13,
              color: t.text,
              lineHeight: 1.6,
            }}
          >
            {tipo.estrutura}
          </div>
        </div>
      </Card>

      <SubTitle color={tipo.cor}>Exemplos prontos para copiar</SubTitle>
      <div style={{ marginBottom: 18 }}>
        {tipo.exemplos.map((ex, i) => (
          <CopiableExample
            key={i}
            label={ex.label}
            texto={ex.texto}
            color={tipo.cor}
            idx={`${tipoAtivo}-${i}`}
            copiedIdx={copiedIdx}
            setCopied={setCopiedIdx}
          />
        ))}
      </div>

      <Card color={t.red}>
        <SubTitle color={t.red}>⚠️ Erros mais frequentes</SubTitle>
        <RuleList rules={tipo.erros} color={t.red} />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: ORDENAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const ordenacaoExercicios = [
  {
    id: 1,
    instrucao: "Ordene alfabeticamente pelo sobrenome do primeiro autor:",
    referencias: [
      { id: "a", texto: "SILVA, A. B. Saúde pública. São Paulo: Atlas, 2021." },
      { id: "b", texto: "ABREU, C. D. Epidemiologia básica. Rio de Janeiro: Fiocruz, 2019." },
      { id: "c", texto: "MARTINS, J. Política de saúde. Brasília: MS, 2020." },
      { id: "d", texto: "COSTA, R. Vigilância sanitária. São Paulo: Guanabara, 2022." },
    ],
    ordemCorreta: ["b", "d", "c", "a"],
    explicacao: "Ordem alfabética: ABREU → COSTA → MARTINS → SILVA",
  },
  {
    id: 2,
    instrucao: "Mesmo autor, anos diferentes — qual a ordem?",
    referencias: [
      { id: "a", texto: "BRASIL. Ministério da Saúde. Política Nacional de Atenção Básica. Brasília: MS, 2017." },
      { id: "b", texto: "BRASIL. Ministério da Saúde. Caderno de Atenção Primária. Brasília: MS, 2012." },
      { id: "c", texto: "BRASIL. Ministério da Saúde. Guia Alimentar. Brasília: MS, 2014." },
    ],
    ordemCorreta: ["b", "c", "a"],
    explicacao: "Mesmo autor: ordene cronologicamente pelo ano (mais antigo primeiro).",
  },
  {
    id: 3,
    instrucao: "Mesmo sobrenome, autores diferentes:",
    referencias: [
      { id: "a", texto: "SILVA, José. Saúde coletiva. Rio de Janeiro: Atlas, 2020." },
      { id: "b", texto: "SILVA, Ana Maria. Epidemiologia. São Paulo: Hucitec, 2019." },
      { id: "c", texto: "SILVA, Pedro. Vigilância. Brasília: MS, 2022." },
    ],
    ordemCorreta: ["b", "a", "c"],
    explicacao: "Sobrenome igual → ordenar pelo prenome: Ana → José → Pedro.",
  },
  {
    id: 4,
    instrucao: "Documento sem autor entra pela primeira palavra do título:",
    referencias: [
      { id: "a", texto: "SOUZA, M. Saúde pública. São Paulo: Atlas, 2020." },
      { id: "b", texto: "DENGUE: epidemia silenciosa. [S. l.]: [s. n.], 2021." },
      { id: "c", texto: "BRASIL. Ministério da Saúde. Política Nacional. Brasília: MS, 2019." },
    ],
    ordemCorreta: ["c", "b", "a"],
    explicacao: "BRASIL → DENGUE → SOUZA. A entrada por título conta como se a primeira palavra fosse o sobrenome.",
  },
];

function ModuleOrdenacao() {
  const [exAtual, setExAtual] = useState(0);
  const [ordem, setOrdem] = useState(
    ordenacaoExercicios[0].referencias.map((r) => r.id)
  );
  const [verificado, setVerificado] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  const ex = ordenacaoExercicios[exAtual];

  const reset = (idx) => {
    setExAtual(idx);
    setOrdem(ordenacaoExercicios[idx].referencias.map((r) => r.id));
    setVerificado(false);
    setSelecionado(null);
  };

  const click = (id) => {
    if (verificado) return;
    if (selecionado === null) setSelecionado(id);
    else if (selecionado === id) setSelecionado(null);
    else {
      const novo = [...ordem];
      const fi = novo.indexOf(selecionado);
      const ti = novo.indexOf(id);
      novo.splice(fi, 1);
      novo.splice(ti, 0, selecionado);
      setOrdem(novo);
      setSelecionado(null);
    }
  };

  const acertou =
    verificado && JSON.stringify(ordem) === JSON.stringify(ex.ordemCorreta);
  const refById = (id) => ex.referencias.find((r) => r.id === id);

  return (
    <div>
      <SectionHeader
        icon="🔢"
        title="Apresentação e Ordenação"
        sub="Como organizar a lista final de referências (NBR 6023:2018, seção 6 e 6.7)."
        color={t.green}
      />

      <Card color={t.green} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.green}>Regras gerais de apresentação</SubTitle>
        <RuleList
          rules={[
            "Espaço SIMPLES entre as linhas de cada referência.",
            "Linha em branco (espaço simples) ENTRE referências.",
            "Alinhamento à margem esquerda (sem recuo).",
            "Pontuação UNIFORME em todas as referências do trabalho.",
            "Recurso tipográfico de destaque (negrito, itálico OU sublinhado) — escolha um e use em TODAS as referências.",
            "Para documentos online: 'Disponível em:' + URL + 'Acesso em:' + data são obrigatórios.",
          ]}
          color={t.green}
        />
      </Card>

      <Card style={{ marginBottom: 18 }}>
        <SubTitle>Regras de ordenação</SubTitle>
        <RuleList
          rules={[
            "Ordem alfabética pelo sobrenome do primeiro autor.",
            "Sobrenome igual → ordenar pelo prenome.",
            "Mesmo autor, várias obras → ordem cronológica (mais antigo primeiro).",
            "Mesmo autor, mesmo ano → adicionar letras (2020a, 2020b...) em ordem alfabética dos títulos.",
            "Sem autor → entrada pela primeira palavra do título.",
            "Documento jurídico (LEI, DECRETO) → entrada pela jurisdição (BRASIL.).",
            "Autor pessoa jurídica → ordenar pelo nome da entidade (BRASIL., INSTITUTO, ORGANIZAÇÃO etc.).",
          ]}
        />
      </Card>

      {/* Exercício */}
      <SubTitle color={t.green}>🏋️ Pratique — 4 cenários</SubTitle>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {ordenacaoExercicios.map((e, i) => (
          <button
            key={i}
            onClick={() => reset(i)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${exAtual === i ? t.green : t.border}`,
              background: exAtual === i ? t.greenSoft : t.surface,
              color: exAtual === i ? t.green : t.textMuted,
              fontWeight: exAtual === i ? 700 : 400,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Caso {i + 1}
          </button>
        ))}
      </div>

      <Card>
        <div style={{ fontWeight: 700, color: t.text, marginBottom: 6, fontSize: 14 }}>
          {ex.instrucao}
        </div>
        <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 14 }}>
          Clique em um item para selecionar. Depois clique em outro para trocar de posição.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {ordem.map((id, pos) => {
            const ref = refById(id);
            const isSel = selecionado === id;
            const isOk = verificado && ex.ordemCorreta[pos] === id;
            const isErr = verificado && ex.ordemCorreta[pos] !== id;
            return (
              <div
                key={id}
                onClick={() => click(id)}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  background: isSel
                    ? t.blueSoft
                    : isOk
                    ? t.greenSoft
                    : isErr
                    ? t.redSoft
                    : t.surfaceAlt,
                  border: `2px solid ${
                    isSel
                      ? t.blue
                      : isOk
                      ? t.green
                      : isErr
                      ? t.red
                      : t.border
                  }`,
                  borderRadius: 10,
                  cursor: verificado ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 13,
                    color: isSel ? t.blue : isOk ? t.green : isErr ? t.red : t.textFaint,
                  }}
                >
                  {pos + 1}.
                </span>
                <span style={{ fontSize: 12, color: t.text, lineHeight: 1.5, flex: 1, fontFamily: "monospace" }}>
                  {ref.texto}
                </span>
                {verificado && <span>{isOk ? "✅" : "❌"}</span>}
              </div>
            );
          })}
        </div>

        {!verificado ? (
          <button
            onClick={() => setVerificado(true)}
            style={{
              padding: "10px 20px",
              background: t.green,
              color: "#000",
              border: "none",
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ✓ Verificar
          </button>
        ) : (
          <div>
            <Note type={acertou ? "success" : "danger"}>
              {acertou ? "🎉 Perfeito! Ordem correta." : ex.explicacao}
            </Note>
            <button
              onClick={() => reset(exAtual)}
              style={{
                padding: "8px 16px",
                background: t.surfaceAlt,
                color: t.textMuted,
                border: `1px solid ${t.border}`,
                borderRadius: 8,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ↻ Tentar de novo
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: CASOS FALTANTES
// ═══════════════════════════════════════════════════════════════════════════

function ModuleCasosFaltantes() {
  return (
    <div>
      <SectionHeader
        icon="❓"
        title="Casos Faltantes"
        sub="Como referenciar quando falta autor, data, local ou editora — situações comuníssimas em sites e documentos antigos."
        color={t.orange}
      />

      <Card color={t.orange} glow style={{ marginBottom: 18 }}>
        <SubTitle color={t.orange}>Convenções da ABNT</SubTitle>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { sigla: "[S. l.]", expansao: "sine loco", uso: "Quando não há cidade de publicação identificada", ex: "GONÇALVES, F. B. A história de Mirador. [S. l.: s. n.], 1993." },
            { sigla: "[s. n.]", expansao: "sine nomine", uso: "Quando não há editora identificada", ex: "FRANCO, I. Discursos: de outubro de 1992 a agosto de 1993. Brasília, DF: [s. n.], 1993. 107 p." },
            { sigla: "[S. l.: s. n.]", expansao: "sine loco, sine nomine", uso: "Quando ambos estão ausentes", ex: "DENGUE: epidemia silenciosa. [S. l.: s. n.], 2021." },
            { sigla: "[1969?]", expansao: "—", uso: "Ano provável", ex: "MARINS, J. L. C. Massa calcificada. Radiologia Brasileira, São Paulo, n. 23, [1991?]. No prelo." },
            { sigla: "[ca. 1960]", expansao: "circa", uso: "Ano aproximado", ex: "SILVA, J. Memórias. Rio de Janeiro: Atlas, [ca. 1960]." },
            { sigla: "No prelo", expansao: "—", uso: "Quando o documento ainda está em processo de publicação", ex: "Mimeografado / No prelo / Em preparação" },
            { sigla: "Mimeografado", expansao: "—", uso: "Documento reproduzido por mimeógrafo (raro hoje, mas pode aparecer em arquivos antigos)", ex: "LAURENTI, R. Mortalidade pré-natal. São Paulo: CBCD, 1978. Mimeografado." },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: t.surfaceAlt,
                borderRadius: 10,
                borderLeft: `3px solid ${t.orange}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                <code
                  style={{
                    background: t.orangeSoft,
                    color: t.orange,
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontFamily: "monospace",
                    fontSize: 13,
                    border: `1px solid ${t.orange}55`,
                    fontWeight: 700,
                  }}
                >
                  {d.sigla}
                </code>
                {d.expansao !== "—" && (
                  <span style={{ color: t.textFaint, fontSize: 11, fontStyle: "italic" }}>
                    ({d.expansao})
                  </span>
                )}
                <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>
                  {d.uso}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: 12,
                  color: t.textMuted,
                  background: t.bg,
                  padding: "8px 12px",
                  borderRadius: 7,
                  border: `1px solid ${t.border}`,
                  lineHeight: 1.6,
                }}
              >
                {d.ex}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Note type="tip">
        <b>Nota técnica importante:</b> as siglas devem aparecer entre <b>colchetes</b>. As notações de tempo ([1969?], [ca. 1960], etc.) <b>não levam ponto</b> antes do colchete de fechamento.
      </Note>

      <SubTitle>Hierarquia para encontrar uma data</SubTitle>
      <Card>
        <div style={{ color: t.textMuted, fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
          A NBR 6023 sugere essa ordem de busca quando o ano não está visível:
        </div>
        <RuleList
          rules={[
            "1º: ano de publicação no documento",
            "2º: ano de copyright (use 'c' antes — exemplo: c2011)",
            "3º: ano de distribuição",
            "4º: ano de impressão",
            "Se nada disso for encontrado, use as marcações entre colchetes ([1969?], [ca. 1960], etc.)",
          ]}
          color={t.orange}
        />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: ERROS COMUNS
// ═══════════════════════════════════════════════════════════════════════════

function ModuleErros() {
  const erros = [
    {
      categoria: "Citação Indireta",
      cor: t.green,
      icone: "💬",
      itens: [
        { erro: "Esquecer a fonte porque 'parafraseou'", correto: "Toda paráfrase ainda é da ideia de outra pessoa — sempre cite (Autor, ano)." },
        { erro: "Trocar uma ou duas palavras e achar que é paráfrase", correto: "Paráfrase real reescreve estrutura E vocabulário, mantendo o sentido." },
        { erro: "Usar aspas em paráfrase", correto: "Aspas marcam citação direta. Indireta nunca tem aspas." },
      ],
    },
    {
      categoria: "Citação Direta",
      cor: t.blue,
      icone: "📌",
      itens: [
        { erro: "Esquecer a página", correto: "Citação direta SEMPRE exige página, exceto fontes sem paginação (HTML, lei online)." },
        { erro: "Não diferenciar curta de longa", correto: "Até 3 linhas: aspas no texto. Mais de 3: recuo de 4 cm, fonte menor, sem aspas." },
        { erro: "Misturar formatação de longa com curta", correto: "Longa NUNCA tem aspas; curta SEMPRE tem aspas." },
      ],
    },
    {
      categoria: "Apud",
      cor: t.orange,
      icone: "🔄",
      itens: [
        { erro: "Listar AMBOS (original e fonte lida) na lista de referências", correto: "Apenas a fonte que você efetivamente leu vai para a lista." },
        { erro: "Usar apud quando a obra original é acessível", correto: "Apud é último recurso. Sempre tente ir à fonte original." },
      ],
    },
    {
      categoria: "Ordenação",
      cor: t.purple,
      icone: "🔢",
      itens: [
        { erro: "Ordenar pela ordem que apareceu no texto", correto: "A lista é alfabética pelo sobrenome (sistema autor-data). A ordem do texto só vale para sistema numérico." },
        { erro: "Não usar a hierarquia para mesmo autor", correto: "Mesmo autor → ordem cronológica. Mesmo ano → letras (a, b, c)." },
      ],
    },
    {
      categoria: "Documentos do MS / Leis",
      cor: t.yellow,
      icone: "🏛️",
      itens: [
        { erro: "Esquecer 'BRASIL.' no início", correto: "Documentos governamentais começam com a JURISDIÇÃO." },
        { erro: "Não hierarquizar (Ministério > Secretaria > Departamento)", correto: "Vai do mais geral para o mais específico, separados por ponto." },
        { erro: "Confundir Lei (Brasil) com Portaria (MS)", correto: "Lei → BRASIL. Portaria → BRASIL. Ministério da Saúde." },
      ],
    },
    {
      categoria: "Sites / Online",
      cor: t.cyan,
      icone: "🌐",
      itens: [
        { erro: "Colocar só o link", correto: "Precisa de autor (ou entidade), título, data + 'Disponível em:' + 'Acesso em:'." },
        { erro: "Esquecer 'Acesso em:'", correto: "OBRIGATÓRIO para qualquer fonte online — qualquer URL pode mudar." },
        { erro: "Não tentar identificar o autor antes de marcar como anônimo", correto: "Procure no site (sobre, footer, autor do post). Só marque como sem autor depois de tentar." },
      ],
    },
    {
      categoria: "Formatação",
      cor: t.pink,
      icone: "🎨",
      itens: [
        { erro: "Usar negrito em algumas referências e itálico em outras", correto: "Escolha UM recurso tipográfico (negrito, itálico ou sublinhado) e use em TODAS as referências." },
        { erro: "Pontuação inconsistente", correto: "Se você usa ponto-e-vírgula entre autores, use sempre. Se usa abreviado (ed.), use sempre." },
        { erro: "Misturar prenomes abreviados e por extenso", correto: "Padronize. Recomenda-se abreviar em listas longas." },
      ],
    },
  ];

  return (
    <div>
      <SectionHeader
        icon="⚠️"
        title="Top Erros Compilados"
        sub="Os erros mais frequentes em monitorias de TCC, agrupados por categoria. Use como checklist antes de entregar qualquer trabalho."
        color={t.red}
      />

      {erros.map((cat, i) => (
        <Card key={i} color={cat.cor} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>{cat.icone}</span>
            <div style={{ fontWeight: 800, color: cat.cor, fontSize: 15 }}>
              {cat.categoria}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cat.itens.map((item, j) => (
              <div
                key={j}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  padding: 10,
                  background: t.surfaceAlt,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    padding: 10,
                    background: t.redSoft,
                    border: `1px solid ${t.red}33`,
                    borderRadius: 7,
                    fontSize: 12,
                    color: t.red,
                    lineHeight: 1.5,
                  }}
                >
                  ❌ <b>{item.erro}</b>
                </div>
                <div
                  style={{
                    padding: 10,
                    background: t.greenSoft,
                    border: `1px solid ${t.green}33`,
                    borderRadius: 7,
                    fontSize: 12,
                    color: t.green,
                    lineHeight: 1.5,
                  }}
                >
                  ✅ {item.correto}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: QUIZ FINAL
// ═══════════════════════════════════════════════════════════════════════════

const quizQuestoes = [
  {
    pergunta: "Um aluno escreveu: 'O tabagismo é a principal causa de câncer de pulmão' — sem citar nenhuma fonte. Isso é:",
    opcoes: ["Citação indireta correta", "Citação indireta incorreta (falta referência)", "Citação direta correta", "Informação de domínio público — não precisa citar"],
    correta: 1,
    expl: "Mesmo informações comuns precisam de fonte em trabalho acadêmico. Sem referência = plágio.",
  },
  {
    pergunta: "Qual a ordem alfabética correta?\nA) SOUZA, M. (2021) | B) ALVES, P. (2019) | C) SANTOS, J. (2018)",
    opcoes: ["A → B → C", "C → B → A", "B → C → A", "C → A → B"],
    correta: 2,
    expl: "Ordem alfabética: ALVES → SANTOS → SOUZA. Logo, B → C → A.",
  },
  {
    pergunta: "Como referenciar a Lei nº 8.080/1990 (Lei Orgânica da Saúde), consultada online?",
    opcoes: [
      "8.080, Lei. 1990. Lei Orgânica da Saúde.",
      "BRASIL. Lei nº 8.080, de 19 de setembro de 1990. [Ementa]. Disponível em: [URL]. Acesso em: [data].",
      "Ministério da Saúde. Lei nº 8.080/1990. Brasília, 1990.",
      "BRASIL (1990). Lei Orgânica da Saúde.",
    ],
    correta: 1,
    expl: "Começa por BRASIL. (jurisdição), número da lei, data por extenso, ementa, e para online: Disponível em + Acesso em.",
  },
  {
    pergunta: "Documento do Ministério da Saúde sem autor pessoal entra na lista por:",
    opcoes: ["Título do documento", "Ano de publicação", "BRASIL. Ministério da Saúde.", "Secretaria responsável"],
    correta: 2,
    expl: "Documentos governamentais entram pela jurisdição: BRASIL. + órgão emissor. Esse é o 'autor-entidade'.",
  },
  {
    pergunta: "Qual elemento é OBRIGATÓRIO em qualquer referência de fonte online?",
    opcoes: ["DOI", "Número de páginas", "'Acesso em:' + data", "Nome do servidor"],
    correta: 2,
    expl: "Para fontes online, ABNT NBR 6023 (seção 6.6) exige 'Disponível em: [URL]. Acesso em: [data].'",
  },
  {
    pergunta: "Dois autores têm o mesmo sobrenome (SILVA, A. e SILVA, B.). Como ordená-los?",
    opcoes: ["Pelo ano de publicação", "Pela ordem que aparecem no texto", "Pelo prenome (A vem antes de B)", "Pelo título da obra"],
    correta: 2,
    expl: "Sobrenome igual → ordene pelo prenome.",
  },
  {
    pergunta: "Diretriz da Sociedade Brasileira de Cardiologia se referencia como:",
    opcoes: ["Artigo de periódico", "Monografia, com a sociedade como autor-entidade", "Documento jurídico", "Nota técnica governamental"],
    correta: 1,
    expl: "Diretrizes de sociedades médicas são monografias. A sociedade é o autor-entidade.",
  },
  {
    pergunta: "\"Conforme Silva (2022), a cobertura vacinal caiu nos últimos anos.\" Esta é uma citação:",
    opcoes: ["Direta correta", "Direta incorreta — falta página", "Indireta correta", "Indireta incorreta — falta página"],
    correta: 2,
    expl: "Indireta (paráfrase, sem aspas) e correta. Indireta não exige página.",
  },
  {
    pergunta: "Como ficaria uma citação direta de mais de 3 linhas?",
    opcoes: [
      "Entre aspas, no corpo do texto, com fonte normal",
      "Recuo de 4cm da margem esquerda, fonte menor, espaço simples, SEM aspas",
      "Itálico no corpo do texto",
      "Negrito com aspas",
    ],
    correta: 1,
    expl: "Citação direta longa: recuo de 4 cm, fonte menor, espaço simples, sem aspas. NBR 10520:2023, seção 7.1.1.",
  },
  {
    pergunta: "Quando devo usar 'apud' em uma citação?",
    opcoes: [
      "Sempre que possível, é mais fácil",
      "Quando estou citando um autor original que não pude acessar diretamente",
      "Em todas as citações de obras estrangeiras",
      "Quando há mais de 3 autores",
    ],
    correta: 1,
    expl: "Apud é último recurso, quando a obra original é inacessível. Você cita o autor A apud autor B, que é o que você leu.",
  },
  {
    pergunta: "Em uma citação direta, você adiciona negrito a uma parte do trecho. Como deve indicar isso?",
    opcoes: [
      "Não precisa indicar nada",
      "Escrever '(grifo nosso)' ao final da chamada",
      "Avisar em nota de rodapé",
      "Escrever '(modificado por mim)'",
    ],
    correta: 1,
    expl: "Sempre que VOCÊ adiciona destaque (negrito/itálico/sublinhado), indique 'grifo nosso' ou 'grifo próprio'.",
  },
  {
    pergunta: "Mesmo autor publicou 2 obras em 2020. Como diferenciar nas citações?",
    opcoes: [
      "Numerar (Silva 2020/1, Silva 2020/2)",
      "Adicionar letras minúsculas (Silva, 2020a; Silva, 2020b) seguindo a ordem alfabética dos títulos",
      "Usar o mês na referência",
      "Não é possível diferenciar",
    ],
    correta: 1,
    expl: "Letras minúsculas (a, b, c) após o ano, em ordem alfabética dos títulos. NBR 10520:2023, seção 6.1.6.",
  },
  {
    pergunta: "Um livro tem 5 autores. Como fica a citação no texto?",
    opcoes: [
      "Listar todos os 5 autores",
      "Primeiro autor seguido de 'et al.'",
      "Apenas o título",
      "Os dois primeiros autores",
    ],
    correta: 1,
    expl: "Para 4+ autores, na CITAÇÃO use 'et al.'. Na referência (lista final), pode listar todos OU usar et al.",
  },
  {
    pergunta: "Na lista de referências, qual é OBRIGATÓRIO em todas?",
    opcoes: [
      "DOI",
      "ISBN",
      "Espaçamento simples e alinhamento à esquerda",
      "Citação numerada",
    ],
    correta: 2,
    expl: "Espaço simples + alinhamento à esquerda + linha em branco entre referências. NBR 6023:2018, seção 6.3.",
  },
  {
    pergunta: "Como indicar que você omitiu parte de uma citação direta?",
    opcoes: [
      "Com três pontos: ...",
      "Com colchetes e reticências: [...]",
      "Apagando o trecho silenciosamente",
      "Escrevendo 'omitido'",
    ],
    correta: 1,
    expl: "Use [...] para supressão. Os colchetes diferenciam dessa marcação dos próprios três-pontos do autor.",
  },
  {
    pergunta: "O sistema autor-data e o sistema numérico podem ser misturados no mesmo trabalho?",
    opcoes: [
      "Sim, à vontade",
      "Não — escolha um e mantenha consistente",
      "Sim, se o trabalho tiver mais de 100 páginas",
      "Sim, alternando por capítulo",
    ],
    correta: 1,
    expl: "Os sistemas são alternativos. Escolha UM e mantenha durante todo o trabalho.",
  },
  {
    pergunta: "Documento sem autor entra na lista de referências por:",
    opcoes: [
      "'Anônimo'",
      "Primeira palavra do título em MAIÚSCULAS",
      "Ano de publicação",
      "'Sem autor'",
    ],
    correta: 1,
    expl: "Sem autor: entrada pelo título, com a primeira palavra em MAIÚSCULAS. Ex: DENGUE: o que é...",
  },
  {
    pergunta: "Como ficaria um livro publicado sem local nem editora?",
    opcoes: [
      "...sem local, sem editora, 2020.",
      "...[?]: [?], 2020.",
      "...[S. l.: s. n.], 2020.",
      "Não precisa colocar nada",
    ],
    correta: 2,
    expl: "[S. l.: s. n.] = sine loco, sine nomine. Entre colchetes, separados por dois pontos.",
  },
];

function ModuleQuiz() {
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [finalizado, setFinalizado] = useState(false);

  const q = quizQuestoes[atual];
  const resp = respostas[atual];
  const acertou = resp !== undefined && resp === q.correta;
  const acertos = Object.entries(respostas).filter(
    ([i, r]) => quizQuestoes[parseInt(i)].correta === r
  ).length;

  const responder = (idx) => {
    if (resp !== undefined) return;
    setRespostas((p) => ({ ...p, [atual]: idx }));
  };

  if (finalizado) {
    const pct = Math.round((acertos / quizQuestoes.length) * 100);
    const cor = pct >= 75 ? t.green : pct >= 50 ? t.yellow : t.red;
    return (
      <div>
        <SectionHeader icon="🏆" title="Resultado Final" color={cor} />
        <Card color={cor} glow style={{ textAlign: "center", padding: "32px 24px", marginBottom: 18 }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>
            {pct >= 75 ? "🏆" : pct >= 50 ? "📚" : "📖"}
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: cor, marginBottom: 8 }}>
            {acertos}/{quizQuestoes.length}
          </div>
          <div style={{ fontSize: 18, color: t.text, fontWeight: 700 }}>{pct}%</div>
          <div style={{ color: t.textMuted, fontSize: 14, marginTop: 8 }}>
            {pct >= 75
              ? "🎉 Excelente! Você está pronto para a monitoria."
              : pct >= 50
              ? "👍 Bom! Revise os pontos com erros antes de aplicar."
              : "📖 Volte aos módulos antes de aplicar — vale a pena."}
          </div>
        </Card>

        <SubTitle>Revisão das respostas</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {quizQuestoes.map((qq, i) => {
            const r = respostas[i];
            const ok = r === qq.correta;
            return (
              <Card key={i} color={ok ? t.green : t.red}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{ok ? "✅" : "❌"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: t.text, fontSize: 13, fontWeight: 600, marginBottom: 6, whiteSpace: "pre-line" }}>
                      Q{i + 1}: {qq.pergunta}
                    </div>
                    {!ok && r !== undefined && (
                      <div style={{ color: t.red, fontSize: 12, marginBottom: 4 }}>
                        Sua: {qq.opcoes[r]}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: 12,
                        color: ok ? t.green : t.yellow,
                        background: ok ? t.greenSoft : t.yellowSoft,
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `1px solid ${ok ? t.green : t.yellow}33`,
                        marginBottom: 6,
                      }}
                    >
                      ✓ Correta: {qq.opcoes[qq.correta]}
                    </div>
                    <div style={{ color: t.textMuted, fontSize: 12 }}>💡 {qq.expl}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <button
          onClick={() => {
            setAtual(0);
            setRespostas({});
            setFinalizado(false);
          }}
          style={{
            padding: "12px 24px",
            background: t.blue,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          🔄 Refazer Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        icon="🎯"
        title="Quiz Final"
        sub={`Questão ${atual + 1} de ${quizQuestoes.length}`}
        color={t.yellow}
      />

      <div
        style={{
          height: 6,
          background: t.border,
          borderRadius: 999,
          marginBottom: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((atual + (resp !== undefined ? 1 : 0)) / quizQuestoes.length) * 100}%`,
            background: t.yellow,
            transition: "width 0.3s",
          }}
        />
      </div>

      <Card
        color={resp === undefined ? t.yellow : acertou ? t.green : t.red}
        glow
        style={{ marginBottom: 18 }}
      >
        <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>
          QUESTÃO {atual + 1}/{quizQuestoes.length}
        </div>
        <div
          style={{
            fontWeight: 700,
            color: t.text,
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 16,
            whiteSpace: "pre-line",
          }}
        >
          {q.pergunta}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.opcoes.map((op, i) => {
            const isSel = resp === i;
            const isCorr = i === q.correta;
            const showCorr = resp !== undefined && isCorr;
            const showErr = resp !== undefined && isSel && !isCorr;
            return (
              <button
                key={i}
                onClick={() => responder(i)}
                disabled={resp !== undefined}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: `2px solid ${
                    showCorr ? t.green : showErr ? t.red : isSel ? t.blue : t.border
                  }`,
                  background: showCorr
                    ? t.greenSoft
                    : showErr
                    ? t.redSoft
                    : isSel
                    ? t.blueSoft
                    : t.surfaceAlt,
                  color: showCorr ? t.green : showErr ? t.red : t.text,
                  textAlign: "left",
                  cursor: resp === undefined ? "pointer" : "default",
                  fontSize: 13,
                  fontWeight: isSel || showCorr ? 700 : 400,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: showCorr ? t.green : showErr ? t.red : t.border,
                    color: showCorr || showErr ? "#000" : t.textMuted,
                    fontSize: 11,
                    fontWeight: 800,
                    textAlign: "center",
                    lineHeight: "22px",
                    marginRight: 10,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {op}
              </button>
            );
          })}
        </div>

        {resp !== undefined && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              background: acertou ? t.greenSoft : t.redSoft,
              border: `1px solid ${acertou ? t.green : t.red}55`,
              borderRadius: 8,
              fontSize: 13,
              color: acertou ? t.green : t.red,
              lineHeight: 1.6,
            }}
          >
            {acertou ? "✅ " : "❌ "}{q.expl}
          </div>
        )}
      </Card>

      {resp !== undefined && (
        <button
          onClick={() => {
            if (atual < quizQuestoes.length - 1) setAtual(atual + 1);
            else setFinalizado(true);
          }}
          style={{
            padding: "12px 24px",
            background: t.yellow,
            color: "#000",
            border: "none",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {atual < quizQuestoes.length - 1 ? "Próxima →" : "Ver resultado 🏆"}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE: INÍCIO
// ═══════════════════════════════════════════════════════════════════════════

function ModuleIntro({ setModule }) {
  const cards = [
    { id: "validador", icone: "🔍", titulo: "Validador ABNT", desc: "Cole uma referência e receba diagnóstico completo, com versão corrigida e regras aplicadas.", cor: t.blue, destaque: true },
    { id: "fundamentos", icone: "🧭", titulo: "Fundamentos", desc: "Citação vs referência, sistemas de chamada, princípios éticos.", cor: t.blue },
    { id: "direta_curta", icone: "💬", titulo: "Direta Curta", desc: "Aspas, autor, ano, página, supressões.", cor: t.blue },
    { id: "direta_longa", icone: "📜", titulo: "Direta Longa", desc: "Recuo de 4cm, fonte menor, formatação especial.", cor: t.purple },
    { id: "indireta", icone: "📝", titulo: "Citação Indireta", desc: "Paráfrase real vs falsa, vários autores, prática.", cor: t.green },
    { id: "apud", icone: "🔄", titulo: "Apud", desc: "Citação de citação — quando, como, e armadilhas.", cor: t.orange },
    { id: "supressoes", icone: "✂️", titulo: "Supressões e Ênfases", desc: "[...], [interpolação], grifo nosso, tradução nossa.", cor: t.cyan },
    { id: "multiplos", icone: "👥", titulo: "Múltiplos Autores", desc: "1, 2, 3, 4+, et al., sobrenomes iguais, sem autor.", cor: t.pink },
    { id: "elementos", icone: "🧱", titulo: "Elementos da Referência", desc: "Autoria, título, edição, local, editora, data.", cor: t.cyan },
    { id: "formatacao", icone: "🎨", titulo: "Formatação e Casos Especiais", desc: "Onde vai o negrito? Subtítulos com ':', nomes compostos, diretrizes aprofundadas.", cor: t.pink },
    { id: "tipos", icone: "📦", titulo: "Tipos de Documentos", desc: "15 tipos: livros, leis, sites, MS, diretrizes, vídeos...", cor: t.purple },
    { id: "ordenacao", icone: "🔢", titulo: "Apresentação e Ordenação", desc: "Como organizar a lista final + 4 exercícios práticos.", cor: t.green },
    { id: "casos_faltantes", icone: "❓", titulo: "Casos Faltantes", desc: "Sem data, sem local, sem editora, no prelo.", cor: t.orange },
    { id: "erros", icone: "⚠️", titulo: "Erros Compilados", desc: "Tabela completa por categoria. Use como checklist.", cor: t.red },
    { id: "quiz", icone: "🎯", titulo: "Quiz Final", desc: "18 questões cobrindo todos os módulos.", cor: t.yellow },
    ...LAB_CARDS,
  ];

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(135deg, ${t.blueSoft}, ${t.surface})`,
          border: `1px solid ${t.blue}33`,
          borderRadius: 18,
          padding: "32px 28px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            background: t.blue + "11",
            borderRadius: "50%",
            border: `1px solid ${t.blue}22`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -50,
            right: 40,
            width: 100,
            height: 100,
            background: t.purple + "08",
            borderRadius: "50%",
            border: `1px solid ${t.purple}22`,
          }}
        />
        <Badge color={t.blue}>NBR 6023:2018 + NBR 10520:2023</Badge>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: t.text,
            margin: "12px 0 10px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Manual Completo<br />de Normas ABNT
        </h1>
        <p
          style={{
            color: t.textMuted,
            fontSize: 14,
            maxWidth: 580,
            margin: "0 0 18px",
            lineHeight: 1.6,
          }}
        >
          Material aprofundado para monitoria acadêmica. 14 módulos cobrindo desde os fundamentos
          até casos especiais de referenciação. Com exemplos prontos, exercícios e quiz final.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: t.textMuted }}>
          <span>📚 14 módulos</span>
          <span>•</span>
          <span>📦 15 tipos de documentos</span>
          <span>•</span>
          <span>🏋️ 9 exercícios práticos</span>
          <span>•</span>
          <span>🎯 18 questões no quiz</span>
        </div>
      </div>

      <SubTitle>Módulos disponíveis</SubTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => setModule(c.id)}
            style={{
              background: t.surface,
              border: `1px solid ${c.cor}33`,
              borderRadius: 12,
              padding: "16px 14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.cor + "11";
              e.currentTarget.style.borderColor = c.cor + "77";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = t.surface;
              e.currentTarget.style.borderColor = c.cor + "33";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icone}</div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 13,
                color: t.text,
                marginBottom: 4,
              }}
            >
              {c.titulo}
            </div>
            <div style={{ color: t.textMuted, fontSize: 11, lineHeight: 1.5 }}>
              {c.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

const navItems = [
  { id: "intro", icone: "🏠", label: "Início", short: "Início" },
  { id: "validador", icone: "🔍", label: "Validador", short: "Valid." },
  { id: "fundamentos", icone: "🧭", label: "Fundamentos", short: "Fund." },
  { id: "direta_curta", icone: "💬", label: "Direta Curta", short: "Direta C." },
  { id: "direta_longa", icone: "📜", label: "Direta Longa", short: "Direta L." },
  { id: "indireta", icone: "📝", label: "Indireta", short: "Indireta" },
  { id: "apud", icone: "🔄", label: "Apud", short: "Apud" },
  { id: "supressoes", icone: "✂️", label: "Supressões e Ênfases", short: "Suprs." },
  { id: "multiplos", icone: "👥", label: "Múltiplos Autores", short: "Autores" },
  { id: "elementos", icone: "🧱", label: "Elementos da Referência", short: "Elem." },
  { id: "formatacao", icone: "🎨", label: "Formatação e Casos Especiais", short: "Format." },
  { id: "tipos", icone: "📦", label: "Tipos de Documentos", short: "Tipos" },
  { id: "ordenacao", icone: "🔢", label: "Apresentação e Ordenação", short: "Ordem" },
  { id: "casos_faltantes", icone: "❓", label: "Casos Faltantes", short: "Falt." },
  { id: "erros", icone: "⚠️", label: "Erros Comuns", short: "Erros" },
  ...LAB_NAV_ITEMS,
  { id: "quiz", icone: "🎯", label: "Quiz Final", short: "Quiz" },
];

export default function App() {
  const [module, setModule] = useState("validador");

  const render = () => {
    switch (module) {
      case "intro": return <ModuleIntro setModule={setModule} />;
      case "validador": return <ModuleValidadorABNT />;
      case "fundamentos": return <ModuleFundamentos />;
      case "direta_curta": return <ModuleDiretaCurta />;
      case "direta_longa": return <ModuleDiretaLonga />;
      case "indireta": return <ModuleIndireta />;
      case "apud": return <ModuleApud />;
      case "supressoes": return <ModuleSupressoes />;
      case "multiplos": return <ModuleMultiplosAutores />;
      case "elementos": return <ModuleElementos />;
      case "formatacao": return <ModuleFormatacao />;
      case "tipos": return <ModuleTipos />;
      case "ordenacao": return <ModuleOrdenacao />;
      case "casos_faltantes": return <ModuleCasosFaltantes />;
      case "erros": return <ModuleErros />;
      case "quiz": return <ModuleQuiz />;
      default: {
        const labRender = renderLabModule(module);
        if (labRender) return labRender;
        return <ModuleIntro setModule={setModule} />;
      }
    }
  };

  const idx = navItems.findIndex((n) => n.id === module);
  const prev = idx > 0 ? navItems[idx - 1] : null;
  const next = idx < navItems.length - 1 ? navItems[idx + 1] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: t.bg,
        color: t.text,
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Estilos globais — garantem que html/body/#root fiquem com fundo escuro
          e sem margens padrão do navegador (elimina faixas brancas externas). */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background: ${t.bg};
        }
        body { overflow-x: hidden; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* Top Nav */}
      <nav
        style={{
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
          padding: "0 14px",
          display: "flex",
          gap: 2,
          overflowX: "auto",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              setModule(n.id);
              window.scrollTo(0, 0);
            }}
            style={{
              padding: "12px 12px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${
                module === n.id ? t.blue : "transparent"
              }`,
              color: module === n.id ? t.blue : t.textMuted,
              cursor: "pointer",
              fontWeight: module === n.id ? 700 : 500,
              fontSize: 12,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexShrink: 0,
            }}
          >
            <span>{n.icone}</span>
            <span>{n.short}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div
        style={{
          flex: 1,
          maxWidth: 760,
          margin: "0 auto",
          width: "100%",
          padding: "24px 16px 32px",
          boxSizing: "border-box",
        }}
      >
        {render()}

        {/* Pager */}
        {module !== "intro" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              marginTop: 32,
              paddingTop: 18,
              borderTop: `1px solid ${t.border}`,
            }}
          >
            <button
              onClick={() => {
                if (prev) {
                  setModule(prev.id);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={!prev}
              style={{
                flex: 1,
                padding: "12px 14px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 10,
                color: prev ? t.text : t.textFaint,
                fontSize: 12,
                cursor: prev ? "pointer" : "not-allowed",
                opacity: prev ? 1 : 0.4,
                textAlign: "left",
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {prev ? (
                <>
                  <div style={{ color: t.textMuted, fontSize: 10, marginBottom: 2 }}>
                    ← ANTERIOR
                  </div>
                  {prev.icone} {prev.label}
                </>
              ) : (
                "—"
              )}
            </button>
            <button
              onClick={() => {
                if (next) {
                  setModule(next.id);
                  window.scrollTo(0, 0);
                }
              }}
              disabled={!next}
              style={{
                flex: 1,
                padding: "12px 14px",
                background: next ? t.blueSoft : t.surface,
                border: `1px solid ${next ? t.blue : t.border}55`,
                borderRadius: 10,
                color: next ? t.blue : t.textFaint,
                fontSize: 12,
                cursor: next ? "pointer" : "not-allowed",
                opacity: next ? 1 : 0.4,
                textAlign: "right",
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {next ? (
                <>
                  <div style={{ color: t.textMuted, fontSize: 10, marginBottom: 2 }}>
                    PRÓXIMO →
                  </div>
                  {next.label} {next.icone}
                </>
              ) : (
                "—"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
