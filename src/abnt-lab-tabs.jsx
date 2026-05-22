// ═══════════════════════════════════════════════════════════════════════════
// src/abnt-lab-tabs.jsx
// ─────────────────────────────────────────────────────────────────────────
// As 13 abas do "ABNT Lab" — extensão didática do Validador ABNT.
//
// Este arquivo NÃO declara dados nem componentes próprios.
// Tudo vem de dois arquivos irmãos:
//   • ./abnt-lab-data.js          (constantes — sem JSX, sem React)
//   • ./abnt-lab-components.jsx   (componentes Lab* + paleta `t`)
//
// O App.jsx consumirá o trio exportado no rodapé:
//   • LAB_NAV_ITEMS    → 13 entradas para a barra de navegação
//   • LAB_CARDS        → 13 entradas para o grid do ModuleIntro
//   • renderLabModule  → função que mapeia id → componente da aba
//
// Decisões de design:
//   • Cada aba é uma função estável (não muda nome entre versões).
//   • Acesso a arrays de dados sempre via helper `arr()`, que retorna `[]`
//     se a constante estiver indefinida — evita crash em build se algum
//     dado opcional não estiver no abnt-lab-data.js.
//   • storageKey de cada checklist/stepper é estável e prefixado por aba.
//   • Nenhuma dependência externa além de React. Nenhuma chamada de API.
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo, useState, Component } from "react";

// ─── NAMESPACE IMPORTS ──────────────────────────────────────────────────
// Importamos TUDO como namespace para que nomes ausentes virem `undefined`
// (em vez de SyntaxError do Vite). Os fallbacks abaixo fazem o resto.
import * as DATA from "./abnt-lab-data.js";
import * as COMP from "./abnt-lab-components.jsx";

// ─── PALETA / TEMA — fallback se COMP.t estiver ausente ─────────────────
const T_FALLBACK = {
  blue: "#3b82f6", cyan: "#06b6d4", purple: "#a855f7", pink: "#ec4899",
  green: "#10b981", orange: "#f97316", yellow: "#eab308", red: "#ef4444",
  text: "#e2e8f0", textMuted: "#94a3b8",
  border: "#334155", surface: "rgba(30,41,59,0.4)",
  blueSoft: "rgba(59,130,246,0.12)", greenSoft: "rgba(16,185,129,0.12)",
};
const t = (COMP && COMP.t) ? { ...T_FALLBACK, ...COMP.t } : T_FALLBACK;

// ─── COMPONENTES — usa o real se existir, senão usa fallback minimalista ─
const Card_FB = ({ titulo, children }) => (
  <div style={{ border: `1px solid ${t.border}`, padding: 16, marginBottom: 12, borderRadius: 8, background: t.surface }}>
    {titulo ? <h4 style={{ marginTop: 0, color: t.text }}>{titulo}</h4> : null}
    {children}
  </div>
);
const Header_FB = ({ icone, titulo, subtitulo }) => (
  <div style={{ margin: "8px 0 24px" }}>
    <h2 style={{ color: t.text, marginBottom: 4 }}>{icone} {titulo}</h2>
    {subtitulo ? <p style={{ color: t.textMuted, margin: 0 }}>{subtitulo}</p> : null}
  </div>
);
const Note_FB = ({ children }) => (
  <div style={{ padding: 12, marginBottom: 12, background: t.blueSoft, border: `1px solid ${t.border}`, borderRadius: 8, color: t.text }}>{children}</div>
);
const SubTitle_FB = ({ children }) => <h3 style={{ marginTop: 32, marginBottom: 12, color: t.text }}>{children}</h3>;
const Grid_FB = ({ children, cols = 2 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`, gap: 12, marginBottom: 16 }}>{children}</div>
);
const Tabs_FB = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${t.border}`, marginBottom: 16, flexWrap: "wrap" }}>
    {(tabs || []).map((tb) => (
      <button key={tb.id} onClick={() => onChange(tb.id)}
        style={{ padding: "8px 12px", background: active === tb.id ? t.blueSoft : "transparent", color: active === tb.id ? t.blue : t.text, border: "none", cursor: "pointer", borderRadius: "6px 6px 0 0", fontWeight: active === tb.id ? 600 : 400 }}>
        {tb.label}{tb.count ? ` (${tb.count})` : ""}
      </button>
    ))}
  </div>
);
const itemLabel = (it) => {
  if (typeof it === "string") return it;
  if (!it || typeof it !== "object") return String(it);
  return it.label || it.item || it.descricao || it.texto || it.nome || it.titulo || JSON.stringify(it);
};
const Checklist_FB = ({ items }) => (
  <ul style={{ paddingLeft: 20, color: t.text }}>
    {(items || []).map((it, i) => <li key={i} style={{ marginBottom: 6 }}>{itemLabel(it)}</li>)}
  </ul>
);
const ChecklistBlock_FB = ({ blocos }) => (
  <div>{(blocos || []).map((b, i) => (
    <Card_FB key={i} titulo={b.titulo || b.bloco || `Bloco ${i + 1}`}>
      <Checklist_FB items={b.itens || b.items || b.checklist} />
    </Card_FB>
  ))}</div>
);
const DecisionTable_FB = ({ data, columns }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16, color: t.text }}>
    <thead><tr>{(columns || []).map((c) => <th key={c.key} style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${t.border}` }}>{c.label}</th>)}</tr></thead>
    <tbody>{(data || []).map((row, i) => <tr key={i}>{(columns || []).map((c) => <td key={c.key} style={{ padding: 8, borderBottom: `1px solid ${t.border}`, verticalAlign: "top" }}>{row && row[c.key]}</td>)}</tr>)}</tbody>
  </table>
);
const ExampleBlock_FB = ({ label, texto }) => (
  <div style={{ padding: 12, marginBottom: 12, background: "rgba(15,23,42,0.6)", borderRadius: 8, border: `1px solid ${t.border}` }}>
    <strong style={{ display: "block", marginBottom: 6, color: t.text }}>{label}</strong>
    <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontFamily: "ui-monospace,monospace", fontSize: 13, color: t.text }}>{texto}</pre>
  </div>
);
const ExerciseCard_FB = ({ exercise, index }) => (
  <Card_FB titulo={`Exercício ${index}`}>
    <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, color: t.text, margin: 0 }}>{JSON.stringify(exercise, null, 2)}</pre>
  </Card_FB>
);
const ComparisonCard_FB = ({ headers, rows }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16, color: t.text }}>
    <thead><tr>{(headers || []).map((h, i) => <th key={i} style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${t.border}` }}>{h}</th>)}</tr></thead>
    <tbody>{(rows || []).map((row, i) => <tr key={i}>{(row || []).map((cell, j) => <td key={j} style={{ padding: 8, borderBottom: `1px solid ${t.border}`, verticalAlign: "top" }}>{cell}</td>)}</tr>)}</tbody>
  </table>
);
const Stepper_FB = ({ steps }) => (
  <ol style={{ paddingLeft: 24, color: t.text }}>
    {(steps || []).map((s, i) => <li key={i} style={{ marginBottom: 8 }}><strong>{(s && (s.titulo || s.label)) || `Passo ${i + 1}`}</strong>{s && s.descricao ? <span style={{ color: t.textMuted }}> — {s.descricao}</span> : null}</li>)}
  </ol>
);
const MiniSearchBuilder_FB = ({ title, fields, buildOutput }) => {
  const [v, setV] = useState({});
  const [out, setOut] = useState("");
  return (
    <Card_FB titulo={title}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 8 }}>
        {(fields || []).map((f) => (
          <label key={f.id} style={{ display: "flex", flexDirection: "column", gap: 4, color: t.text, fontSize: 13 }}>
            <span>{f.label}</span>
            <input type="text" placeholder={f.placeholder || ""} value={v[f.id] || ""} onChange={(e) => setV({ ...v, [f.id]: e.target.value })}
              style={{ padding: "6px 8px", border: `1px solid ${t.border}`, borderRadius: 6, background: t.surface, color: t.text }} />
          </label>
        ))}
      </div>
      <button onClick={() => setOut(buildOutput ? buildOutput(v) : "")}
        style={{ marginTop: 12, padding: "8px 14px", background: t.blue, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
        Gerar
      </button>
      {out ? (
        <pre style={{ marginTop: 12, padding: 12, background: "rgba(15,23,42,0.6)", borderRadius: 8, border: `1px solid ${t.border}`, whiteSpace: "pre-wrap", fontFamily: "ui-monospace,monospace", fontSize: 13, color: t.text }}>{out}</pre>
      ) : null}
    </Card_FB>
  );
};
const SourceBadge_FB = ({ tipo }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", margin: "8px 4px 0 0", background: t.border, color: t.text, borderRadius: 4, fontSize: 11 }}>{tipo}</span>
);
const RuleList_FB = ({ items }) => (
  <ul style={{ paddingLeft: 20, color: t.text, margin: "4px 0" }}>
    {(items || []).map((it, i) => <li key={i} style={{ marginBottom: 4 }}>{itemLabel(it)}</li>)}
  </ul>
);
const Badge_FB = ({ children }) => <span style={{ display: "inline-block", padding: "2px 8px", marginRight: 4, background: t.blueSoft, color: t.blue, borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{children}</span>;

const LabSectionHeader      = COMP.LabSectionHeader      || Header_FB;
const LabCard               = COMP.LabCard               || Card_FB;
const LabNote               = COMP.LabNote               || Note_FB;
const LabBadge              = COMP.LabBadge              || Badge_FB;
const LabSubTitle           = COMP.LabSubTitle           || SubTitle_FB;
const LabGrid               = COMP.LabGrid               || Grid_FB;
const LabTabs               = COMP.LabTabs               || Tabs_FB;
const LabChecklist          = COMP.LabChecklist          || Checklist_FB;
const LabChecklistBlock     = COMP.LabChecklistBlock     || ChecklistBlock_FB;
const LabDecisionTable      = COMP.LabDecisionTable      || DecisionTable_FB;
const LabExampleBlock       = COMP.LabExampleBlock       || ExampleBlock_FB;
const LabExerciseCard       = COMP.LabExerciseCard       || ExerciseCard_FB;
const LabComparisonCard     = COMP.LabComparisonCard     || ComparisonCard_FB;
const LabStepper            = COMP.LabStepper            || Stepper_FB;
const LabMiniSearchBuilder  = COMP.LabMiniSearchBuilder  || MiniSearchBuilder_FB;
const LabSourceBadge        = COMP.LabSourceBadge        || SourceBadge_FB;
const LabRuleList           = COMP.LabRuleList           || RuleList_FB;

// ─── DADOS — fallback `[]` ou `{}` se a constante não existir no data.js ─
const BASES_PESQUISA             = DATA.BASES_PESQUISA              || [];
const MODELOS_PERGUNTA           = DATA.MODELOS_PERGUNTA            || [];
const OPERADORES_BOOL            = DATA.OPERADORES_BOOL             || [];
const EXERCICIOS_BUSCA           = DATA.EXERCICIOS_BUSCA            || [];
const PASSOS_BUSCA               = DATA.PASSOS_BUSCA                || [];
const DOC_BUSCA_TEMPLATE         = DATA.DOC_BUSCA_TEMPLATE          || [];
const DIRETRIZ_DECISAO           = DATA.DIRETRIZ_DECISAO            || [];
const CARE_ITEMS                 = DATA.CARE_ITEMS                  || [];
const PRISMA_ITEMS               = DATA.PRISMA_ITEMS                || [];
const STROBE_ITEMS               = DATA.STROBE_ITEMS                || [];
const CONSORT_ITEMS              = DATA.CONSORT_ITEMS               || [];
const SAMPL_REGRAS               = DATA.SAMPL_REGRAS                || [];
const DESENHOS_METODO            = DATA.DESENHOS_METODO             || [];
const WORD_DOCS_OPS              = DATA.WORD_DOCS_OPS               || [];
const CHECKLIST_PDF_FINAL        = DATA.CHECKLIST_PDF_FINAL         || [];
// Excel — aceita variações comuns de nome
const EXCEL_REGRAS               = DATA.EXCEL_REGRAS
                                || DATA.EXCEL_REGRAS_GERAIS
                                || DATA.EXCEL_BOAS_PRATICAS
                                || DATA.EXCEL_ORGANIZACAO
                                || DATA.REGRAS_EXCEL
                                || [];
const MODELOS_TABELAS_CLINICAS   = DATA.MODELOS_TABELAS_CLINICAS    || [];
const MODELOS_FONTE_FIGURA       = DATA.MODELOS_FONTE_FIGURA        || [];
const TIPOS_ILUSTRACAO           = DATA.TIPOS_ILUSTRACAO            || [];
const IBGE_SINAIS                = DATA.IBGE_SINAIS                 || [];
const TABELA_VS_QUADRO           = (DATA.TABELA_VS_QUADRO && (DATA.TABELA_VS_QUADRO.rows || DATA.TABELA_VS_QUADRO.headers))
                                ? DATA.TABELA_VS_QUADRO
                                : {
                                    headers: ["Tabela (NBR/IBGE)", "Quadro"],
                                    rows: [
                                      ["Dados numéricos tratados estatisticamente (médias, %, frequências).", "Listas, categorias, comparações textuais."],
                                      ["Moldura IBGE: bordas horizontais (topo, meio, base), sem bordas verticais laterais.", "Bordas em todos os lados (topo, base, laterais, internas)."],
                                      ["Numeração: Tabela 1, Tabela 2, …", "Numeração: Quadro 1, Quadro 2, …"],
                                      ["Fonte obrigatória (mesmo se 'elaborado pelo autor').", "Fonte obrigatória."],
                                      ["Exemplo: tabela com média de idade, IMC, glicemia.", "Exemplo: quadro com critérios diagnósticos do DSM-5."],
                                    ],
                                  };
const CHECKLIST_FIGURA_TABELA    = DATA.CHECKLIST_FIGURA_TABELA     || [];
const CHECKLIST_TABELA_FINAL     = DATA.CHECKLIST_TABELA_FINAL      || [];
const VERBOS_POR_DESENHO         = DATA.VERBOS_POR_DESENHO          || [];
const VERBOS_HEDGE               = DATA.VERBOS_HEDGE                || [];
const VERBOS_PROIBIDOS           = DATA.VERBOS_PROIBIDOS            || [];
const PARES_REESCRITA            = DATA.PARES_REESCRITA             || [];
const CHECKLIST_SUBMISSAO_BLOCOS = DATA.CHECKLIST_SUBMISSAO_BLOCOS  || [];
const ANATOMIA_SUBMISSAO         = DATA.ANATOMIA_SUBMISSAO          || [];
const ATIVIDADES_LIGA            = DATA.ATIVIDADES_LIGA             || [];
const STEPS_SIGAA                = DATA.STEPS_SIGAA                 || [];
const ODS_LIST                   = DATA.ODS_LIST                    || [];
const AREAS_TEMATICAS_UFPE       = DATA.AREAS_TEMATICAS_UFPE        || [];
const AREAS_CNPQ                 = DATA.AREAS_CNPQ                  || [];
const DIRETRIZES_EXTENSAO        = DATA.DIRETRIZES_EXTENSAO         || [];
const ERROS_PROJETO_LIGA         = DATA.ERROS_PROJETO_LIGA          || [];
const ERROS_VISUAIS_20           = DATA.ERROS_VISUAIS_20            || [];
const TIPOS_ENTREGA_17           = DATA.TIPOS_ENTREGA_17             || [];

// ─── HELPERS ────────────────────────────────────────────────────────────
const arr = (x) => (Array.isArray(x) ? x : []);
const obj = (x) => (x && typeof x === "object" ? x : {});

// Converte qualquer valor em string segura para renderizar no JSX.
// Se for objeto, tenta extrair uma propriedade textual conhecida.
const txt = (v) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return v.map(txt).filter(Boolean).join(", ");
  if (typeof v === "object") {
    return v.label || v.titulo || v.text || v.texto || v.nome
        || v.descricao || v.desc || v.uso || v.significado || "";
  }
  return String(v);
};

// Converte chave snake_case ou camelCase em rótulo legível
const keyLabel = (k) =>
  String(k || "")
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Renderiza TODAS as propriedades textuais de um objeto como "Rótulo: valor".
// Usado quando não sabemos exatamente quais nomes de propriedade existem nos dados.
const AutoFields = ({ item, exclude = [] }) => {
  if (!item || typeof item !== "object" || Array.isArray(item)) return null;
  const skip = new Set([...exclude, "id", "key", "icone", "icon"]);
  const entries = Object.entries(item).filter(
    ([k, v]) => !skip.has(k) && v !== null && v !== undefined && v !== ""
  );
  if (entries.length === 0) return null;
  return (
    <>
      {entries.map(([k, v]) => {
        const s = txt(v);
        if (!s) return null;
        return (
          <p key={k} style={{ margin: "6px 0", color: t.text, fontSize: 14, lineHeight: 1.5 }}>
            <strong style={{ color: t.text }}>{keyLabel(k)}:</strong>{" "}
            <span style={{ color: t.textMuted }}>{s}</span>
          </p>
        );
      })}
    </>
  );
};

// Error boundary — isola a falha de uma aba para não derrubar o app inteiro.
class LabErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    if (typeof console !== "undefined" && console.error) {
      console.error("[ABNT Lab] Tab render error:", error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      const msg = String((this.state.error && this.state.error.message) || this.state.error || "");
      return (
        <div style={{ padding: 24 }}>
          <Header_FB
            icone="⚠️"
            titulo="Esta aba teve um erro ao renderizar"
            subtitulo="O resto do site continua funcionando. Use a navegação para abrir outra aba."
          />
          <Card_FB titulo="Detalhe técnico (para o desenvolvedor)">
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, color: t.textMuted, margin: 0 }}>
              {msg}
            </pre>
          </Card_FB>
        </div>
      );
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 1) 🔎 BUSCA CIENTÍFICA
// ═══════════════════════════════════════════════════════════════════════

function BuscaCientificaTab() {
  // Estado local do mini-gerador de chave de busca.
  // Render fora do componente filho para que o LabMiniSearchBuilder receba
  // apenas os campos e a função de construção da saída.
  const camposChave = [
    { id: "conceito1", label: "Conceito 1 (termo principal)", placeholder: "Ex.: insuficiência cardíaca" },
    { id: "sin1a", label: "Sinônimo 1.a", placeholder: 'Ex.: IC' },
    { id: "sin1b", label: "Sinônimo 1.b", placeholder: 'Ex.: "heart failure"' },
    { id: "conceito2", label: "Conceito 2", placeholder: "Ex.: SGLT2" },
    { id: "sin2a", label: "Sinônimo 2.a", placeholder: "Ex.: empagliflozina" },
    { id: "sin2b", label: "Sinônimo 2.b", placeholder: "Ex.: dapagliflozina" },
    { id: "conceito3", label: "Conceito 3 (desfecho)", placeholder: "Ex.: mortalidade" },
    { id: "sin3a", label: "Sinônimo 3.a", placeholder: "Ex.: óbito" },
    { id: "filtro", label: "Filtro (opcional)", placeholder: "Ex.: ensaio clínico" },
  ];

  const construirChave = (v) => {
    const v_ = obj(v);
    const blocos = [];
    const aspas = (s) => (s && s.includes(" ") ? `"${s}"` : s);
    const grupo = (termos) => {
      const limpos = termos.map((x) => (x || "").trim()).filter(Boolean).map(aspas);
      if (!limpos.length) return null;
      return limpos.length === 1 ? limpos[0] : `(${limpos.join(" OR ")})`;
    };
    const g1 = grupo([v_.conceito1, v_.sin1a, v_.sin1b]);
    const g2 = grupo([v_.conceito2, v_.sin2a, v_.sin2b]);
    const g3 = grupo([v_.conceito3, v_.sin3a]);
    const g4 = grupo([v_.filtro]);
    [g1, g2, g3, g4].forEach((g) => { if (g) blocos.push(g); });
    if (!blocos.length) return "// Preencha ao menos um conceito.";
    return blocos.join("\nAND\n");
  };

  return (
    <div>
      <LabSectionHeader
        icone="🔎"
        titulo="Busca Científica"
        subtitulo="Como transformar uma pergunta clínica em uma chave de busca reprodutível"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "pratica", label: "Prática" }]}
      />

      {/* Seção 1 — onde pesquisar */}
      <LabSubTitle>1. Onde pesquisar</LabSubTitle>
      <LabNote tipo="info">
        Nem toda pergunta começa no Google. Em saúde, prefira bases científicas indexadas e
        diretrizes oficiais. Cada base tem um perfil — escolher bem economiza tempo.
      </LabNote>
      <LabGrid cols={2}>
        {arr(BASES_PESQUISA).map((b, i) => {
          const o = obj(b);
          const titulo = `${txt(o.icone) || ""} ${txt(o.nome || o.label || o.titulo) || `Base ${i + 1}`}`.trim();
          return (
            <LabCard key={`base-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["icone", "nome", "label", "titulo"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      {/* Seção 2 — PICO/PECO */}
      <LabSubTitle>2. Transformando tema em pergunta — PICO, PECO e variações</LabSubTitle>
      <LabNote tipo="info">
        Nem toda busca precisa caber rigidamente em PICO. O modelo organiza o raciocínio, mas
        não substitui o bom senso da pergunta. Em temas qualitativos ou exploratórios, uma boa
        pergunta mal estruturada é melhor que um PICO forçado.
      </LabNote>
      <LabGrid cols={2}>
        {arr(MODELOS_PERGUNTA).map((m, i) => {
          const o = obj(m);
          const titulo = txt(o.sigla || o.nome || o.label) || `Modelo ${i + 1}`;
          const quando = txt(o.quando);
          const exemplo = txt(o.exemplo);
          return (
            <LabCard key={`mp-${i}`} titulo={titulo}>
              {quando ? <p style={{ color: t.textMuted, marginTop: 0 }}><em>{quando}</em></p> : null}
              <LabRuleList items={arr(o.componentes)} />
              {exemplo ? <LabExampleBlock label="Exemplo" texto={exemplo} /> : null}
              <AutoFields item={o} exclude={["sigla", "nome", "label", "quando", "componentes", "exemplo"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      {/* Seção 3 — DeCS/MeSH */}
      <LabSubTitle>3. DeCS e MeSH — quando e por quê</LabSubTitle>
      <LabComparisonCard
        headers={["MeSH (NLM)", "DeCS (BIREME)"]}
        rows={[
          ["Vocabulário controlado dos EUA, em inglês.", "Vocabulário em pt/es/en, com termos da realidade latino-americana."],
          ["Use no PubMed/MEDLINE.", "Use na BVS/LILACS."],
          ["Combine com palavra livre (artigos recentes podem não ter MeSH).", "Combine com palavra livre — especialmente para temas regionais."],
        ]}
      />
      <LabNote tipo="warn">
        ⚠️ Não obrigue o uso de descritores em todos os casos. Em busca exploratória ou tema
        emergente, palavra livre em título/resumo costuma render mais.
      </LabNote>

      {/* Seção 4 — Operadores booleanos */}
      <LabSubTitle>4. Operadores booleanos</LabSubTitle>
      <LabGrid cols={3}>
        {arr(OPERADORES_BOOL).map((op, i) => {
          const o = obj(op);
          const titulo = txt(o.op || o.operador || o.nome) || `Operador ${i + 1}`;
          const exemplo = txt(o.exemplo);
          return (
            <LabCard key={`op-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["op", "operador", "nome", "exemplo"]} />
              {exemplo ? (
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, marginTop: 6, color: t.text }}>{exemplo}</p>
              ) : null}
            </LabCard>
          );
        })}
      </LabGrid>
      <LabExampleBlock
        label="Regra didática"
        texto={'Dentro do mesmo conceito → use OR.\nEntre conceitos diferentes → use AND.\n\n("gestational diabetes" OR "gestational diabetes mellitus" OR GDM)\nAND\n("insulin therapy" OR insulin)'}
      />

      {/* Seção 5 — Criação de chaves em 10 passos */}
      <LabSubTitle>5. Como criar uma chave — método em 10 passos</LabSubTitle>
      <LabChecklist items={arr(PASSOS_BUSCA)} storageKey="lab:busca:passos" />

      {/* Seção 6 — Mini-gerador local de chave */}
      <LabSubTitle>6. Mini-gerador local de chave de busca</LabSubTitle>
      <LabNote tipo="warn">
        ⚠️ Este gerador <strong>organiza</strong> os termos digitados. Ele não consulta DeCS/MeSH,
        não traduz, não testa a busca em base nenhuma. Para uma revisão sistemática, confira os
        descritores em DeCS/MeSH e teste a estratégia na base.
      </LabNote>
      <LabMiniSearchBuilder
        title="Construtor de chave de busca"
        fields={camposChave}
        buildOutput={construirChave}
        storageKey="lab:busca:builder"
      />

      {/* Seção 7 — Exercícios */}
      <LabSubTitle>7. Exercícios de chave de busca</LabSubTitle>
      <LabNote tipo="info">
        Cada exercício traz a pergunta, a estruturação em PICO, a chave em português (para
        BVS/SciELO) e em inglês (para PubMed/Cochrane), e uma nota de raciocínio.
      </LabNote>
      <div>
        {arr(EXERCICIOS_BUSCA).map((ex, i) => (
          <LabExerciseCard key={`ex-${i}`} exercise={ex} index={i + 1} />
        ))}
      </div>

      {/* Seção 8 — Documentação da busca */}
      <LabSubTitle>8. Documentação da busca (reprodutibilidade)</LabSubTitle>
      <LabNote tipo="info">
        Em revisão sistemática, a busca precisa ser reprodutível. A diretriz PRISMA 2020 (item 7)
        exige que a estratégia completa seja apresentada nos materiais suplementares.
      </LabNote>
      <LabChecklist items={arr(DOC_BUSCA_TEMPLATE)} storageKey="lab:busca:doc" />
      <LabSourceBadge tipo="Diretriz" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 2) 📋 DIRETRIZES DE RELATO
// ═══════════════════════════════════════════════════════════════════════

function DiretrizesRelatoTab() {
  const [aba, setAba] = useState("decisao");

  const subAbas = [
    { id: "decisao", label: "Qual diretriz usar?" },
    { id: "care", label: "CARE", count: arr(CARE_ITEMS).length || undefined },
    { id: "prisma", label: "PRISMA 2020", count: arr(PRISMA_ITEMS).length || undefined },
    { id: "strobe", label: "STROBE", count: arr(STROBE_ITEMS).length || undefined },
    { id: "consort", label: "CONSORT 2010", count: arr(CONSORT_ITEMS).length || undefined },
    { id: "sampl", label: "SAMPL (estatística)" },
  ];

  return (
    <div>
      <LabSectionHeader
        icone="📋"
        titulo="Diretrizes de Relato"
        subtitulo="Que diretriz usar para reportar seu estudo, conforme o desenho"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "diretriz", label: "Diretriz" }]}
      />

      <LabNote tipo="info">
        Diretriz de relato é um <em>checklist</em> que padroniza o que deve aparecer no manuscrito —
        não substitui o método do estudo. Use-a desde o início da escrita, não como conferência final.
      </LabNote>

      <LabTabs tabs={subAbas} active={aba} onChange={setAba} />

      {aba === "decisao" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>Mini-seletor de diretriz por desenho de estudo</LabSubTitle>
          <LabDecisionTable
            data={arr(DIRETRIZ_DECISAO)}
            columns={[
              { key: "tipo", label: "Tipo de estudo" },
              { key: "diretriz", label: "Diretriz" },
              { key: "referencia", label: "Referência" },
            ]}
          />
          <LabNote tipo="warn">
            ⚠️ Para a checklist completa de cada diretriz, consulte sempre a fonte original
            (consort-statement.org, prisma-statement.org, strobe-statement.org, care-statement.org,
            sampl-statement.org). Os itens abaixo são paráfrases para uso didático.
          </LabNote>
        </div>
      )}

      {aba === "care" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>CARE — Relato de Caso</LabSubTitle>
          <LabNote tipo="info">
            CARE 2013 (Gagnier et al.) padroniza o relato de casos clínicos. Use também em série de
            casos, aplicando os itens a cada caso descrito.
          </LabNote>
          <LabChecklist items={arr(CARE_ITEMS).map((x) => (typeof x === "string" ? x : `${x.num || ""}. ${x.item || x.descricao || ""}`.trim()))} storageKey="lab:relato:care" />
          <LabSourceBadge tipo="Diretriz" />
        </div>
      )}

      {aba === "prisma" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>PRISMA 2020 — Revisão Sistemática e Meta-análise</LabSubTitle>
          <LabNote tipo="info">
            PRISMA 2020 (Page et al., BMJ 2021) tem 27 itens organizados em título, resumo,
            introdução, métodos, resultados, discussão e outras informações. Há também o fluxograma
            PRISMA, obrigatório para representar a triagem.
          </LabNote>
          <LabChecklist items={arr(PRISMA_ITEMS).map((x) => (typeof x === "string" ? x : `${x.num || ""}. ${x.item || x.descricao || ""}`.trim()))} storageKey="lab:relato:prisma" />
          <LabSourceBadge tipo="Diretriz" />
        </div>
      )}

      {aba === "strobe" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>STROBE — Estudos Observacionais</LabSubTitle>
          <LabNote tipo="info">
            STROBE (von Elm et al., 2007) cobre coorte, caso-controle e transversal. A checklist
            tem 22 itens e há versões adaptadas por subdesenho.
          </LabNote>
          <LabChecklist items={arr(STROBE_ITEMS).map((x) => (typeof x === "string" ? x : `${x.num || ""}. ${x.item || x.descricao || ""}`.trim()))} storageKey="lab:relato:strobe" />
          <LabSourceBadge tipo="Diretriz" />
        </div>
      )}

      {aba === "consort" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>CONSORT 2010 — Ensaios Clínicos Randomizados</LabSubTitle>
          <LabNote tipo="warn">
            ⚠️ Os itens abaixo são <strong>itens-âncora</strong> derivados do livro Descomplicando
            MBE (2ª ed.). Para a checklist completa e atualizada, consulte
            <strong> consort-statement.org</strong>.
          </LabNote>
          <LabChecklist items={arr(CONSORT_ITEMS).map((x) => (typeof x === "string" ? x : `${x.num || ""}. ${x.item || x.descricao || ""}`.trim()))} storageKey="lab:relato:consort" />
          <LabSourceBadge tipo="Diretriz" />
        </div>
      )}

      {aba === "sampl" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>SAMPL — Relato Estatístico</LabSubTitle>
          <LabNote tipo="info">
            SAMPL (Lang & Altman, 2013) orienta como apresentar números, testes e medidas de
            associação em manuscritos. Use junto com a diretriz do desenho do estudo.
          </LabNote>
          {arr(SAMPL_REGRAS).map((bloco, i) => {
            const o = obj(bloco);
            const titulo = txt(o.titulo || o.nome || o.label) || `Bloco ${i + 1}`;
            const regras = arr(o.regras || o.itens || o.pontos || o.items);
            return (
              <LabCard key={`sampl-${i}`} titulo={titulo}>
                {regras.length > 0 ? <LabRuleList items={regras} /> : null}
                <AutoFields item={o} exclude={["titulo", "nome", "label", "regras", "itens", "pontos", "items"]} />
              </LabCard>
            );
          })}
          <LabSourceBadge tipo="Diretriz" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 3) 🧪 MÉTODO POR DESENHO
// ═══════════════════════════════════════════════════════════════════════

function MetodoDesenhoTab() {
  return (
    <div>
      <LabSectionHeader
        icone="🧪"
        titulo="Método por Desenho"
        subtitulo="O que cada desenho permite afirmar — e o que não permite"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "diretriz", label: "Diretriz" }]}
      />

      <LabNote tipo="info">
        O <strong>desenho do estudo</strong> define o tipo de pergunta respondida e o tipo de
        afirmação aceitável. Coorte responde "que risco?", caso-controle responde "que exposição
        passada?", transversal responde "qual frequência?". Confundir os limites é o erro de
        escrita mais comum em manuscritos rejeitados.
      </LabNote>

      <LabSubTitle>Cards por desenho</LabSubTitle>
      <LabGrid cols={2}>
        {arr(DESENHOS_METODO).map((d, i) => {
          const o = obj(d);
          const titulo = `${txt(o.icone) || ""} ${txt(o.nome || o.label || o.titulo) || `Desenho ${i + 1}`}`.trim();
          const erros = arr(o.erros || o.erros_frequentes);
          return (
            <LabCard key={`des-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["icone", "nome", "label", "titulo", "erros", "erros_frequentes"]} />
              {erros.length > 0 && (
                <>
                  <p style={{ margin: "8px 0 4px", color: t.text }}><strong>Erros frequentes:</strong></p>
                  <LabRuleList items={erros} />
                </>
              )}
            </LabCard>
          );
        })}
      </LabGrid>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 4) ✍️ ESCRITA CIENTÍFICA SEM EXAGERO
// ═══════════════════════════════════════════════════════════════════════

function EscritaCientificaTab() {
  return (
    <div>
      <LabSectionHeader
        icone="✍️"
        titulo="Escrita Científica sem Exagero"
        subtitulo="Como descrever resultados sem ultrapassar o que o desenho permite"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabNote tipo="warn">
        ⚠️ Cada desenho de estudo permite um conjunto específico de afirmações. Ultrapassar esse
        limite com palavras fortes não fortalece o trabalho — fragiliza, porque o revisor
        identifica o exagero antes mesmo de ler o resultado.
      </LabNote>

      <LabSubTitle>1. Verbos por desenho de estudo</LabSubTitle>
      <LabDecisionTable
        data={arr(VERBOS_POR_DESENHO)}
        columns={[
          { key: "desenho", label: "Desenho" },
          { key: "adequados", label: "Verbos adequados" },
          { key: "evitar", label: "Verbos a evitar" },
        ]}
      />

      <LabSubTitle>2. Verbos de cautela (hedge)</LabSubTitle>
      <LabNote tipo="info">
        Hedge é a linguagem que <em>modula</em> a afirmação ao grau de evidência que o estudo
        sustenta. Não é fraqueza de escrita — é honestidade científica.
      </LabNote>
      <LabGrid cols={2}>
        {arr(VERBOS_HEDGE).map((v, i) => {
          const o = obj(v);
          const titulo = txt(o.verbo || o.nome || o.label) || `Verbo ${i + 1}`;
          return (
            <LabCard key={`hedge-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["verbo", "nome", "label"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>3. Verbos que não devem aparecer em manuscrito científico</LabSubTitle>
      <LabGrid cols={2}>
        {arr(VERBOS_PROIBIDOS).map((v, i) => {
          const o = obj(v);
          const titulo = `❌ ${txt(o.verbo || o.nome || o.label) || `Verbo ${i + 1}`}`;
          return (
            <LabCard key={`proib-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["verbo", "nome", "label"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>4. Pares antes/depois — reescrita</LabSubTitle>
      {arr(PARES_REESCRITA).map((p, i) => {
        const o = obj(p);
        const errado = txt(o.errado || o.antes || o.bad);
        const melhor = txt(o.melhor || o.depois || o.good || o.bom);
        return (
          <div key={`par-${i}`} style={{ marginBottom: 16 }}>
            {errado ? <LabExampleBlock label="❌ Antes" texto={errado} status="bad" /> : null}
            {melhor ? <LabExampleBlock label="✅ Depois" texto={melhor} status="good" /> : null}
            {!errado && !melhor ? (
              <LabCard><AutoFields item={o} /></LabCard>
            ) : null}
          </div>
        );
      })}

      <LabSubTitle>5. Resultado × Discussão × Conclusão</LabSubTitle>
      <LabComparisonCard
        headers={["Resultado", "Discussão", "Conclusão"]}
        rows={[
          ["Descreve o que foi observado nos dados.", "Interpreta o achado à luz da literatura.", "Sintetiza o que o estudo respondeu e suas limitações."],
          ["Verbos: observou-se, foi encontrado, associou-se.", "Verbos: sugere, é compatível com, pode contribuir para.", "Verbos: este estudo indica, estes achados apoiam a hipótese de que…"],
          ["Sem inferência causal nem comparação com outros estudos.", "Aqui entra comparação com a literatura.", "Sem dado novo; sem hedge fraco; sem promessa de futuro."],
        ]}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 5) 📄 DOCS / WORD
// ═══════════════════════════════════════════════════════════════════════

function DocsWordTab() {
  return (
    <div>
      <LabSectionHeader
        icone="📄"
        titulo="Docs / Word — Configuração ABNT"
        subtitulo="Como configurar Word, Google Docs ou LibreOffice para entregar um trabalho conforme NBR 14724:2024"
        badges={[{ tipo: "abnt", label: "ABNT" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabNote tipo="info">
        O texto científico não nasce formatado: ele é <em>configurado</em>. Antes de escrever
        uma linha, defina papel, margens, fonte, espaçamento e estilos de título. Reaproveitar
        o mesmo arquivo-modelo em todas as entregas economiza horas.
      </LabNote>

      <LabSubTitle>1. Seções de configuração</LabSubTitle>
      {arr(WORD_DOCS_OPS).map((s, i) => {
        const o = obj(s);
        const titulo = txt(o.secao || o.nome || o.titulo || o.label) || `Seção ${i + 1}`;
        const fonte = txt(o.fonte);
        const pontos = arr(o.pontos || o.regras || o.itens || o.items);
        return (
          <LabCard key={`wops-${i}`} titulo={titulo}>
            {fonte ? <p style={{ color: t.textMuted, marginTop: 0 }}><em>Fonte: {fonte}</em></p> : null}
            {pontos.length > 0 ? <LabRuleList items={pontos} /> : null}
            <AutoFields item={o} exclude={["secao", "nome", "titulo", "label", "fonte", "pontos", "regras", "itens", "items"]} />
          </LabCard>
        );
      })}

      <LabSubTitle>2. Checklist do PDF final</LabSubTitle>
      <LabNote tipo="warn">
        ⚠️ Antes de submeter qualquer entrega, exporte para PDF e refaça o checklist abaixo
        <strong> no PDF</strong> (não no .docx). Word e Docs podem renderizar diferente do PDF.
      </LabNote>
      <LabChecklist items={arr(CHECKLIST_PDF_FINAL)} storageKey="lab:docs:pdf" />
      <LabSourceBadge tipo="ABNT" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 6) 📊 EXCEL / SHEETS
// ═══════════════════════════════════════════════════════════════════════

function ExcelSheetsTab() {
  return (
    <div>
      <LabSectionHeader
        icone="📊"
        titulo="Excel / Sheets — Boas práticas em planilhas científicas"
        subtitulo="Como organizar dados brutos para que a análise estatística seja reprodutível"
        badges={[{ tipo: "pratica", label: "Prática" }, { tipo: "ibge", label: "IBGE" }]}
      />

      <LabNote tipo="info">
        Uma planilha bem organizada vale mais que um software estatístico caro. Os princípios
        valem para Excel, Google Sheets, LibreOffice Calc, Numbers, e mesmo para dataframes em
        R ou Python.
      </LabNote>

      <LabSubTitle>Regras gerais</LabSubTitle>
      {arr(EXCEL_REGRAS).map((s, i) => {
        const o = obj(s);
        const titulo = txt(o.secao || o.titulo || o.nome || o.label) || `Regra ${i + 1}`;
        const fonte = txt(o.fonte);
        const pontos = arr(o.pontos || o.regras || o.itens || o.items);
        return (
          <LabCard key={`xls-${i}`} titulo={titulo}>
            {fonte ? <p style={{ color: t.textMuted, marginTop: 0 }}><em>{fonte}</em></p> : null}
            {pontos.length > 0 ? <LabRuleList items={pontos} /> : null}
            <AutoFields item={o} exclude={["secao", "titulo", "nome", "label", "fonte", "pontos", "regras", "itens", "items"]} />
          </LabCard>
        );
      })}

      <LabSubTitle>Sinais convencionais (IBGE)</LabSubTitle>
      <LabNote tipo="info">
        Em tabelas estatísticas, o IBGE padroniza sinais para diferenciar "zero verdadeiro" de
        "dado não disponível" — informação que muda o sentido da análise.
      </LabNote>
      <LabGrid cols={3}>
        {arr(IBGE_SINAIS).map((s, i) => {
          const o = obj(s);
          const titulo = txt(o.sinal || o.simbolo || o.nome) || "—";
          return (
            <LabCard key={`ibge-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["sinal", "simbolo", "nome"]} />
            </LabCard>
          );
        })}
      </LabGrid>
      <LabSourceBadge tipo="IBGE" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 7) 🖼️ FIGURAS
// ═══════════════════════════════════════════════════════════════════════

function FigurasTab() {
  // Mini-gerador local de legenda + fonte.
  const camposLegenda = [
    {
      id: "tipo",
      label: "Tipo de ilustração",
      placeholder: "Ex.: Figura, Fluxograma, Gráfico, Fotografia",
    },
    {
      id: "numero",
      label: "Número",
      placeholder: "Ex.: 1",
    },
    {
      id: "titulo",
      label: "Título da ilustração",
      placeholder: "Ex.: Fluxo de seleção dos participantes",
      full: true,
    },
    {
      id: "fonte",
      label: "Fonte / autoria",
      placeholder: "Ex.: elaborado pelo autor (2026)",
      full: true,
      help: "Use: elaborado pelo autor (ano), adaptado de Autor (ano), ou elaborado com base em Autor (ano).",
    },
  ];

  const construirLegenda = (v) => {
    const v_ = obj(v);
    const tipo = (v_.tipo || "Figura").trim();
    const num = (v_.numero || "").trim();
    const tit = (v_.titulo || "").trim();
    const fonte = (v_.fonte || "").trim();
    if (!tit) return "";
    const cab = num ? `${tipo} ${num} – ${tit}` : `${tipo} – ${tit}`;
    const rod = fonte ? `Fonte: ${fonte}.` : "Fonte: [informe a fonte/autoria].";
    return `${cab}
${rod}`;
  };

  return (
    <div>
      <LabSectionHeader
        icone="🖼️"
        titulo="Figuras"
        subtitulo="Termos corretos, regra de título (acima), regra de fonte (abaixo) e mini-gerador local"
        badges={[{ tipo: "abnt", label: "ABNT" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabSubTitle>1. Tipos de ilustração (ABNT NBR 14724)</LabSubTitle>
      <LabNote tipo="info">
        A ABNT chama de <strong>figura</strong> tudo que não é tabela nem quadro: fotografia,
        gráfico, fluxograma, mapa, esquema, organograma, desenho, imagem. O termo específico vai
        antes do número.
      </LabNote>
      <LabGrid cols={3}>
        {arr(TIPOS_ILUSTRACAO).map((s, i) => {
          if (typeof s === "string") {
            return <LabCard key={`til-${i}`} titulo={s}> </LabCard>;
          }
          const o = obj(s);
          const titulo = txt(o.nome || o.tipo || o.label || o.titulo) || `Tipo ${i + 1}`;
          return (
            <LabCard key={`til-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["nome", "tipo", "label", "titulo"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>2. Regra de título (acima) e fonte (abaixo)</LabSubTitle>
      <LabExampleBlock
        label="Estrutura padrão"
        texto={'Figura 1 — Fluxo de seleção dos participantes\n[ilustração aqui]\nFonte: elaborado pelo autor (2026).'}
        status="good"
      />
      <LabNote tipo="warn">
        ⚠️ A NBR 14724:2024 não recomenda o termo "Autoral" como fonte. Use
        <strong> "elaborado pelo autor (ano)"</strong> ou cite o autor original quando a figura
        for adaptada/reproduzida.
      </LabNote>

      <LabSubTitle>3. Modelos de fonte</LabSubTitle>
      <LabGrid cols={2}>
        {arr(MODELOS_FONTE_FIGURA).map((s, i) => {
          if (typeof s === "string") {
            return (
              <LabCard key={`mf-${i}`}>
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, margin: 0, color: t.text }}>{s}</p>
              </LabCard>
            );
          }
          const o = obj(s);
          const exemplo = txt(o.texto || o.modelo || o.exemplo || o.fonte);
          return (
            <LabCard key={`mf-${i}`}>
              {exemplo ? (
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, margin: "0 0 8px 0", color: t.text }}>{exemplo}</p>
              ) : null}
              <AutoFields item={o} exclude={["texto", "modelo", "exemplo", "fonte"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>4. Mini-gerador local de legenda + fonte</LabSubTitle>
      <LabMiniSearchBuilder
        title="Construtor de legenda de figura"
        fields={camposLegenda}
        buildOutput={construirLegenda}
        outputTitle="Prévia da legenda"
        copyLabel="Copiar legenda"
        emptyMessage="Preencha o título da ilustração para gerar a legenda."
        outputMonospace={false}
        helper={
          <span>
            A legenda fica acima da ilustração. A fonte fica abaixo. Mesmo quando a imagem for sua,
            informe a autoria.
          </span>
        }
        storageKey="lab:figuras:builder"
      />

      <LabSubTitle>5. Checklist de figura</LabSubTitle>
      <LabChecklist
        items={arr((obj(CHECKLIST_FIGURA_TABELA).figura) || (obj(CHECKLIST_FIGURA_TABELA).figuras) || CHECKLIST_FIGURA_TABELA)}
        storageKey="lab:figuras:checklist"
      />
      <LabSourceBadge tipo="ABNT" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 8) 📐 TABELAS E QUADROS
// ═══════════════════════════════════════════════════════════════════════

function TabelasQuadrosTab() {
  return (
    <div>
      <LabSectionHeader
        icone="📐"
        titulo="Tabelas e Quadros"
        subtitulo="Tabela é estatística (moldura IBGE, sem bordas verticais laterais). Quadro é texto/categórico (bordas em todos os lados)."
        badges={[{ tipo: "abnt", label: "ABNT" }, { tipo: "ibge", label: "IBGE" }]}
      />

      <LabSubTitle>1. Tabela × Quadro × Gráfico × Figura</LabSubTitle>
      <LabComparisonCard
        headers={arr(obj(TABELA_VS_QUADRO).headers || ["Tabela", "Quadro"])}
        rows={arr(obj(TABELA_VS_QUADRO).rows)}
      />
      <LabNote tipo="warn">
        ⚠️ Erro frequente: chamar de "Tabela" o que é "Quadro". Use <strong>Tabela</strong> só
        para dados numéricos tratados estatisticamente (médias, percentuais, frequências).
        <strong> Quadro</strong> para listas, categorias, comparações textuais.
      </LabNote>

      <LabSubTitle>2. Modelos de tabelas em pesquisa clínica</LabSubTitle>
      <LabGrid cols={2}>
        {arr(MODELOS_TABELAS_CLINICAS).map((m, i) => {
          const o = obj(m);
          const titulo = txt(o.nome || o.titulo || o.label) || `Modelo ${i + 1}`;
          const colunas = arr(o.colunas);
          return (
            <LabCard key={`mt-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["nome", "titulo", "label", "colunas"]} />
              {colunas.length > 0 && (
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, marginTop: 8, color: t.textMuted }}>
                  <strong style={{ color: t.text }}>Colunas:</strong> {colunas.map(txt).filter(Boolean).join(" · ")}
                </p>
              )}
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>3. Sinais convencionais (IBGE)</LabSubTitle>
      <LabGrid cols={3}>
        {arr(IBGE_SINAIS).map((s, i) => {
          const o = obj(s);
          const titulo = txt(o.sinal || o.simbolo || o.nome) || "—";
          return (
            <LabCard key={`ibge2-${i}`} titulo={titulo}>
              <AutoFields item={o} exclude={["sinal", "simbolo", "nome"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>4. Checklist final de tabela</LabSubTitle>
      <LabChecklist items={arr(CHECKLIST_TABELA_FINAL)} storageKey="lab:tabelas:checklist" />
      <LabSourceBadge tipo="ABNT" />
      <LabSourceBadge tipo="IBGE" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 9) 📚 TIPO DE ENTREGA
// ═══════════════════════════════════════════════════════════════════════

function TipoEntregaTab() {
  const tipos = arr(TIPOS_ENTREGA_17);
  const [sel, setSel] = useState((tipos[0] && tipos[0].id) || null);
  const ativo = tipos.find((x) => x.id === sel) || tipos[0] || null;

  const blocosDoTipo = ativo && ativo.blocos && typeof ativo.blocos === "object"
    ? Object.entries(ativo.blocos).map(([chave, itens]) => ({
        titulo: chave
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        itens: arr(itens),
      }))
    : [];

  const temDetalhes = Boolean(
    ativo && (
      ativo.objetivo ||
      ativo.estrutura ||
      ativo.elementos_obrigatorios ||
      ativo.obrigatorios ||
      ativo.erros_frequentes ||
      ativo.erros ||
      ativo.observacoes ||
      blocosDoTipo.length
    )
  );

  return (
    <div>
      <LabSectionHeader
        icone="📚"
        titulo="Tipo de Entrega"
        subtitulo="17 tipos de entrega acadêmica — objetivo, estrutura, elementos obrigatórios e onde costumam falhar"
        badges={[{ tipo: "abnt", label: "ABNT" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabNote tipo="info">
        Cada formato (TCC, artigo, pôster, resumo, projeto, relatório, manual…) tem objetivo
        próprio, estrutura típica e modos comuns de errar. Selecione um tipo para ver detalhes.
        Os <strong>checklists interativos</strong> completos ficam também na aba ✅ Checklist Final.
      </LabNote>

      <LabSubTitle>Selecione o tipo</LabSubTitle>
      <LabGrid cols={3}>
        {tipos.map((tp) => (
          <button
            key={tp.id}
            onClick={() => setSel(tp.id)}
            style={{
              background: sel === tp.id ? t.blueSoft : t.surface,
              color: sel === tp.id ? t.blue : t.text,
              border: `1px solid ${sel === tp.id ? t.blue : t.border}`,
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              fontWeight: sel === tp.id ? 600 : 500,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {tp.nome || tp.id}
          </button>
        ))}
      </LabGrid>

      {ativo ? (
        <div style={{ marginTop: 24 }}>
          <LabSubTitle>{ativo.nome}</LabSubTitle>

          {!temDetalhes ? (
            <LabNote tipo="warn">
              Conteúdo específico ainda não cadastrado para este tipo de entrega. Confira o edital,
              template ou manual institucional.
            </LabNote>
          ) : null}

          {ativo.objetivo ? (
            <LabCard titulo="Objetivo">
              <p>{ativo.objetivo}</p>
            </LabCard>
          ) : null}

          {ativo.estrutura ? (
            <LabCard titulo="Estrutura típica">
              {Array.isArray(ativo.estrutura)
                ? <LabRuleList items={ativo.estrutura} />
                : <p>{ativo.estrutura}</p>}
            </LabCard>
          ) : null}

          {ativo.elementos_obrigatorios || ativo.obrigatorios ? (
            <LabCard titulo="Elementos obrigatórios">
              <LabRuleList items={arr(ativo.elementos_obrigatorios || ativo.obrigatorios)} />
            </LabCard>
          ) : null}

          {ativo.erros_frequentes || ativo.erros ? (
            <LabCard titulo="Erros frequentes">
              <LabRuleList items={arr(ativo.erros_frequentes || ativo.erros)} />
            </LabCard>
          ) : null}

          {ativo.observacoes ? (
            <LabNote tipo="warn">{ativo.observacoes}</LabNote>
          ) : null}

          {blocosDoTipo.length ? (
            <LabCard titulo={`Checklist de ${ativo.nome}`}>
              <LabNote tipo="tip">
                Use estes blocos como uma prévia rápida. A versão interativa completa, com marcação
                item a item, continua na aba ✅ Checklist Final.
              </LabNote>
              <LabChecklistBlock
                blocos={blocosDoTipo}
                storageKey={`lab:tipo-entrega:${ativo.id}`}
                defaultOpen={true}
              />
            </LabCard>
          ) : null}
        </div>
      ) : (
        <LabNote tipo="warn">Nenhum tipo de entrega foi cadastrado.</LabNote>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 10) 🚀 SUBMISSÃO / PRÉ-ENVIO
// ═══════════════════════════════════════════════════════════════════════

function SubmissaoTab() {
  return (
    <div>
      <LabSectionHeader
        icone="🚀"
        titulo="Submissão / Pré-envio"
        subtitulo="Checklist mestre antes de enviar manuscrito, resumo, pôster ou projeto"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabNote tipo="warn">
        ⚠️ Submissão é o momento mais frágil do trabalho acadêmico. O texto pode estar bom, mas
        falhas operacionais (arquivo, nome, declaração, comprovante) derrubam a entrega na
        triagem editorial — antes do mérito ser avaliado.
      </LabNote>

      <LabSubTitle>1. Checklist mestre — 20 itens em 4 blocos</LabSubTitle>
      <LabChecklistBlock blocos={arr(CHECKLIST_SUBMISSAO_BLOCOS)} storageKey="lab:submissao:blocos" />

      <LabSubTitle>2. Anatomia de uma submissão típica (OJS / Editorial)</LabSubTitle>
      <LabGrid cols={2}>
        {arr(ANATOMIA_SUBMISSAO).map((e, i) => {
          const o = obj(e);
          const etapa = txt(o.etapa || o.nome || o.titulo || o.label) || `Etapa ${i + 1}`;
          return (
            <LabCard key={`anat-${i}`} titulo={`${i + 1}. ${etapa}`}>
              <AutoFields item={o} exclude={["etapa", "nome", "titulo", "label"]} />
            </LabCard>
          );
        })}
      </LabGrid>

      <LabSubTitle>3. Alertas finais</LabSubTitle>
      <LabNote tipo="danger">
        🛑 Antes de clicar em "submeter": releia a carta de apresentação, confira o número de
        palavras do resumo, confira a contagem de referências, confira anexos e suplementares,
        salve a tela de confirmação como PDF.
      </LabNote>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 11) 🧬 LIGA ACADÊMICA / PROJETOS DE EXTENSÃO
// ═══════════════════════════════════════════════════════════════════════

function LigaProjetosTab() {
  const [aba, setAba] = useState("intro");

  const subAbas = [
    { id: "intro", label: "Visão geral" },
    { id: "atividades", label: "Atividades", count: arr(ATIVIDADES_LIGA).length || undefined },
    { id: "sigaa", label: "SIGAA — 18 passos", count: arr(STEPS_SIGAA).length || undefined },
    { id: "ods", label: "ODS", count: arr(ODS_LIST).length || undefined },
    { id: "areas", label: "Áreas e diretrizes" },
    { id: "erros", label: "Erros comuns", count: arr(ERROS_PROJETO_LIGA).length || undefined },
  ];

  return (
    <div>
      <LabSectionHeader
        icone="🧬"
        titulo="Liga Acadêmica / Projetos de Extensão"
        subtitulo="Como organizar uma liga, registrar projetos no SIGAA e estruturar um projeto de extensão"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "institucional", label: "SIGAA/UFPE" }]}
      />

      <LabTabs tabs={subAbas} active={aba} onChange={setAba} />

      {aba === "intro" && (
        <div style={{ marginTop: 16 }}>
          <LabNote tipo="info">
            A extensão universitária é um dos três pilares da universidade (ensino, pesquisa,
            extensão). Em uma liga acadêmica de medicina, projetos de extensão são o canal
            principal de articulação entre estudantes e comunidade — e o SIGAA é o sistema
            institucional onde tudo precisa ser registrado.
          </LabNote>
          <LabCard titulo="Princípios da extensão (Resolução nº 7/2018 CNE/CES — diretrizes)">
            <p>
              A extensão deve articular <strong>interação dialógica</strong>, <strong>impacto e transformação social</strong>,
              <strong> impacto na formação do estudante</strong>, <strong>indissociabilidade ensino-pesquisa-extensão</strong>
              e <strong>interdisciplinaridade/interprofissionalidade</strong>. Esses cinco eixos são o ponto de
              partida da redação no SIGAA.
            </p>
          </LabCard>
          <LabSourceBadge tipo="Institucional" />
        </div>
      )}

      {aba === "atividades" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>Atividades típicas de uma liga acadêmica</LabSubTitle>
          <LabDecisionTable
            data={arr(ATIVIDADES_LIGA)}
            columns={[
              { key: "tipo", label: "Atividade" },
              { key: "eixo", label: "Eixo" },
              { key: "produto", label: "Produto / Entrega" },
            ]}
          />
        </div>
      )}

      {aba === "sigaa" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>Cadastro de Projeto de Extensão no SIGAA — 18 passos</LabSubTitle>
          <LabNote tipo="info">
            Estes passos seguem o documento <em>"Projeto de Extensão: Orientações para Escrita
            no SIGAA"</em> (PROEXC/UFPE). Use o stepper abaixo para marcar progresso e consultar
            os pontos de atenção de cada passo.
          </LabNote>
          <LabStepper steps={arr(STEPS_SIGAA)} storageKey="lab:liga:sigaa" />
          <LabSourceBadge tipo="Institucional" />
        </div>
      )}

      {aba === "ods" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>17 Objetivos de Desenvolvimento Sustentável (ONU)</LabSubTitle>
          <LabNote tipo="warn">
            ⚠️ Marque apenas ODS que a <strong>metodologia</strong> e os <strong>resultados
            esperados</strong> realmente sustentam. Em ligas de saúde costumam fazer sentido
            ODS 3 (Saúde), ODS 4 (Educação) e ODS 10 (Redução das desigualdades). Marcar ODS
            que não conversam com o projeto é erro de cadastro frequente.
          </LabNote>
          <LabGrid cols={2}>
            {arr(ODS_LIST).map((ods, i) => {
              const s = typeof ods === "string" ? ods : txt(ods);
              return (
                <LabCard key={`ods-${i}`}>
                  <p style={{ margin: 0, color: t.text }}>{s || `ODS ${i + 1}`}</p>
                  {typeof ods === "object" && ods !== null ? (
                    <AutoFields item={obj(ods)} exclude={["nome", "label", "titulo", "texto"]} />
                  ) : null}
                </LabCard>
              );
            })}
          </LabGrid>
        </div>
      )}

      {aba === "areas" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>Áreas temáticas de extensão (UFPE)</LabSubTitle>
          <LabRuleList items={arr(AREAS_TEMATICAS_UFPE)} />

          <LabSubTitle>Áreas de conhecimento (CNPq)</LabSubTitle>
          <LabRuleList items={arr(AREAS_CNPQ)} />

          <LabSubTitle>Diretrizes da extensão — perguntas-guia</LabSubTitle>
          <LabGrid cols={2}>
            {arr(DIRETRIZES_EXTENSAO).map((d, i) => {
              const o = obj(d);
              const titulo = txt(o.nome || o.label || o.titulo) || `Diretriz ${i + 1}`;
              const pergunta = txt(o.pergunta);
              return (
                <LabCard key={`dir-${i}`} titulo={titulo}>
                  {pergunta ? <p style={{ color: t.textMuted, marginTop: 0 }}><em>{pergunta}</em></p> : null}
                  <AutoFields item={o} exclude={["nome", "label", "titulo", "pergunta"]} />
                </LabCard>
              );
            })}
          </LabGrid>
          <LabSourceBadge tipo="Institucional" />
        </div>
      )}

      {aba === "erros" && (
        <div style={{ marginTop: 16 }}>
          <LabSubTitle>Erros frequentes em projetos de liga / extensão</LabSubTitle>
          <LabGrid cols={2}>
            {arr(ERROS_PROJETO_LIGA).map((e, i) => {
              const o = obj(e);
              const titulo = `❌ ${txt(o.erro || o.problema || o.nome || o.titulo) || `Erro ${i + 1}`}`;
              return (
                <LabCard key={`elig-${i}`} titulo={titulo}>
                  <AutoFields item={o} exclude={["erro", "problema", "nome", "titulo"]} />
                </LabCard>
              );
            })}
          </LabGrid>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 12) 👁️ ERROS VISUAIS COMUNS
// ═══════════════════════════════════════════════════════════════════════

function ErrosVisuaisTab() {
  return (
    <div>
      <LabSectionHeader
        icone="👁️"
        titulo="Erros Visuais Comuns"
        subtitulo="20 erros frequentes na apresentação visual do trabalho — antes que o leitor pense no conteúdo, ele percebe a forma"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "pratica", label: "Prática" }]}
      />

      <LabNote tipo="info">
        Erros visuais não são "estética": eles sinalizam ao leitor (orientador, banca, revisor)
        o quanto o autor revisou o próprio trabalho. Um trabalho descuidado visualmente costuma
        levantar suspeita de descuido também no método.
      </LabNote>

      <LabGrid cols={2}>
        {arr(ERROS_VISUAIS_20).map((e, i) => {
          const titulo = txt(e.erro || e.problema || e.nome || e.titulo || e.label) || `Erro ${i + 1}`;
          return (
            <LabCard key={`ev-${i}`} titulo={`${i + 1}. ${titulo}`}>
              <AutoFields item={e} exclude={["erro", "problema", "nome", "titulo", "label"]} />
            </LabCard>
          );
        })}
      </LabGrid>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 13) ✅ CHECKLIST FINAL POR TIPO
// ═══════════════════════════════════════════════════════════════════════

function ChecklistFinalTab() {
  const tipos = arr(TIPOS_ENTREGA_17);
  const [sel, setSel] = useState((tipos[0] && tipos[0].id) || null);
  const ativo = useMemo(
    () => tipos.find((x) => x.id === sel) || tipos[0] || null,
    [sel, tipos]
  );

  const ordemBlocos = [
    { key: "documento", titulo: "Documento" },
    { key: "conteudo", titulo: "Conteúdo" },
    { key: "metodo", titulo: "Método" },
    { key: "formatacao", titulo: "Formatação (NBR 14724)" },
    { key: "figuras", titulo: "Figuras e Tabelas" },
    { key: "citacoes", titulo: "Citações (NBR 10520)" },
    { key: "referencias", titulo: "Referências (NBR 6023)" },
    { key: "arquivo", titulo: "Arquivo final" },
    { key: "submissao", titulo: "Submissão" },
  ];

  return (
    <div>
      <LabSectionHeader
        icone="✅"
        titulo="Checklist Final por Tipo"
        subtitulo="17 tipos de entrega × 9 blocos de conferência — marque conforme avança"
        badges={[{ tipo: "novo", label: "NOVO" }, { tipo: "abnt", label: "ABNT" }]}
      />

      <LabNote tipo="info">
        Cada tipo de entrega tem um checklist de 9 blocos. As respostas ficam salvas
        localmente no seu navegador (LocalStorage). Trocar de tipo não apaga o progresso
        anterior — você pode voltar quando quiser.
      </LabNote>

      <LabSubTitle>1. Selecione o tipo de entrega</LabSubTitle>
      <LabGrid cols={3}>
        {tipos.map((tp) => (
          <button
            key={tp.id}
            onClick={() => setSel(tp.id)}
            style={{
              background: sel === tp.id ? t.greenSoft : t.surface,
              color: sel === tp.id ? t.green : t.text,
              border: `1px solid ${sel === tp.id ? t.green : t.border}`,
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              fontWeight: sel === tp.id ? 600 : 500,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {tp.nome || tp.id}
          </button>
        ))}
      </LabGrid>

      {ativo && (
        <div style={{ marginTop: 24 }}>
          <LabSubTitle>2. Checklist · {ativo.nome}</LabSubTitle>
          {ordemBlocos.map((b) => {
            const itens = arr(obj(ativo.blocos)[b.key]);
            if (!itens.length) return null;
            return (
              <LabCard key={`cf-${ativo.id}-${b.key}`} titulo={b.titulo}>
                <LabChecklist
                  items={itens}
                  storageKey={`lab:checklist_final:${ativo.id}:${b.key}`}
                />
              </LabCard>
            );
          })}
          <LabNote tipo="warn">
            ⚠️ Antes de submeter: exporte o arquivo em PDF e refaça os blocos
            <strong> Formatação</strong>, <strong>Figuras</strong>, <strong>Citações</strong>,
            <strong> Referências</strong> e <strong>Arquivo final</strong> no PDF — não no .docx.
          </LabNote>
        </div>
      )}

      <LabSourceBadge tipo="ABNT" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// EXPORTS DAS ABAS
// ═══════════════════════════════════════════════════════════════════════

export {
  BuscaCientificaTab,
  DiretrizesRelatoTab,
  MetodoDesenhoTab,
  EscritaCientificaTab,
  DocsWordTab,
  ExcelSheetsTab,
  FigurasTab,
  TabelasQuadrosTab,
  TipoEntregaTab,
  SubmissaoTab,
  LigaProjetosTab,
  ErrosVisuaisTab,
  ChecklistFinalTab,
};

// ═══════════════════════════════════════════════════════════════════════
// INTEGRAÇÃO COM App.jsx
// ─────────────────────────────────────────────────────────────────────
// Estes três exports são consumidos pelas 4 inserções do App.jsx que ficaram
// preparadas na conversa anterior:
//
//   1) import { LAB_NAV_ITEMS, LAB_CARDS, renderLabModule } from "./abnt-lab-tabs.jsx";
//   2) ...LAB_NAV_ITEMS no array navItems (entre "erros" e "quiz")
//   3) ...LAB_CARDS no array cards de ModuleIntro
//   4) default do switch chama renderLabModule(module) antes de cair em ModuleIntro
// ═══════════════════════════════════════════════════════════════════════

export const LAB_NAV_ITEMS = [
  { id: "busca_cientifica",   icone: "🔎",  label: "Busca Científica",     short: "Busca"     },
  { id: "metodo_desenho",     icone: "🧪",  label: "Método por Desenho",   short: "Método"    },
  { id: "diretrizes_relato",  icone: "📋",  label: "Diretrizes de Relato", short: "Diretrizes"},
  { id: "escrita_cientifica", icone: "✍️",  label: "Escrita sem Exagero",  short: "Escrita"   },
  { id: "docs_word",          icone: "📄",  label: "Docs / Word",          short: "Docs"      },
  { id: "excel_sheets",       icone: "📊",  label: "Excel / Sheets",       short: "Planilhas" },
  { id: "figuras",            icone: "🖼️",  label: "Figuras",              short: "Figuras"   },
  { id: "tabelas_quadros",    icone: "📐",  label: "Tabelas e Quadros",    short: "Tabelas"   },
  { id: "tipo_entrega",       icone: "📚",  label: "Tipo de Entrega",      short: "Tipos"     },
  { id: "erros_visuais",      icone: "👁️",  label: "Erros Visuais",        short: "Visuais"   },
  { id: "submissao",          icone: "🚀",  label: "Submissão",            short: "Submissão" },
  { id: "liga_projetos",      icone: "🧬",  label: "Liga / Projetos",      short: "Liga"      },
  { id: "checklist_final",    icone: "✅",  label: "Checklist Final",      short: "Checklist" },
];

export const LAB_CARDS = [
  { id: "busca_cientifica",   icone: "🔎",  titulo: "Busca Científica",     desc: "PICO/PECO, DeCS/MeSH, operadores booleanos, exercícios e mini-gerador de chave.", cor: t.blue   },
  { id: "metodo_desenho",     icone: "🧪",  titulo: "Método por Desenho",   desc: "Coorte, caso-controle, transversal, ECR, revisão. O que cada um permite afirmar.", cor: t.cyan   },
  { id: "diretrizes_relato",  icone: "📋",  titulo: "Diretrizes de Relato", desc: "CARE · PRISMA · STROBE · CONSORT · SAMPL — com mini-seletor.",                     cor: t.purple },
  { id: "escrita_cientifica", icone: "✍️",  titulo: "Escrita sem Exagero",  desc: "Verbos por desenho, hedge, palavras proibidas, pares antes/depois.",                cor: t.pink   },
  { id: "docs_word",          icone: "📄",  titulo: "Docs / Word",          desc: "Configuração ABNT em Word, Docs e LibreOffice. Checklist do PDF final.",           cor: t.blue   },
  { id: "excel_sheets",       icone: "📊",  titulo: "Excel / Sheets",       desc: "Organização de dados, sinais IBGE, boas práticas em planilha científica.",         cor: t.green  },
  { id: "figuras",            icone: "🖼️",  titulo: "Figuras",              desc: "Tipos, regra de título acima e fonte abaixo, mini-gerador de legenda.",            cor: t.orange },
  { id: "tabelas_quadros",    icone: "📐",  titulo: "Tabelas e Quadros",    desc: "Tabela (IBGE) × quadro × gráfico × figura. Modelos clínicos e checklist.",         cor: t.cyan   },
  { id: "tipo_entrega",       icone: "📚",  titulo: "Tipo de Entrega",      desc: "17 tipos — TCC, artigo, pôster, projeto, manual… objetivo e estrutura.",           cor: t.yellow },
  { id: "erros_visuais",      icone: "👁️",  titulo: "Erros Visuais",        desc: "20 erros visuais mais frequentes em trabalhos acadêmicos — por que e como.",      cor: t.red    },
  { id: "submissao",          icone: "🚀",  titulo: "Submissão",            desc: "Checklist mestre antes de enviar. Anatomia de OJS / Editorial. Alertas finais.",    cor: t.orange },
  { id: "liga_projetos",      icone: "🧬",  titulo: "Liga / Projetos",      desc: "Extensão na UFPE — atividades, SIGAA em 18 passos, ODS, áreas, erros comuns.",     cor: t.purple },
  { id: "checklist_final",    icone: "✅",  titulo: "Checklist Final",      desc: "17 tipos × 9 blocos de conferência. Marque conforme avança; fica salvo.",          cor: t.green  },
];

export function renderLabModule(id) {
  let inner = null;
  switch (id) {
    case "busca_cientifica":   inner = <BuscaCientificaTab />; break;
    case "diretrizes_relato":  inner = <DiretrizesRelatoTab />; break;
    case "metodo_desenho":     inner = <MetodoDesenhoTab />; break;
    case "escrita_cientifica": inner = <EscritaCientificaTab />; break;
    case "docs_word":          inner = <DocsWordTab />; break;
    case "excel_sheets":       inner = <ExcelSheetsTab />; break;
    case "figuras":            inner = <FigurasTab />; break;
    case "tabelas_quadros":    inner = <TabelasQuadrosTab />; break;
    case "tipo_entrega":       inner = <TipoEntregaTab />; break;
    case "submissao":          inner = <SubmissaoTab />; break;
    case "liga_projetos":      inner = <LigaProjetosTab />; break;
    case "erros_visuais":      inner = <ErrosVisuaisTab />; break;
    case "checklist_final":    inner = <ChecklistFinalTab />; break;
    default:                   return null;
  }
  return <LabErrorBoundary key={id}>{inner}</LabErrorBoundary>;
}
