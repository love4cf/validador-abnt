// ═══════════════════════════════════════════════════════════════════════════
// abnt-lab-components.jsx
// ─────────────────────────────────────────────────────────────────────────
// Componentes reutilizáveis para as 12 abas novas do "ABNT Lab".
//
// Estratégia de isolamento:
//   • A paleta `t` está DUPLICADA neste arquivo (mesmas chaves do App.jsx).
//     Se você mudar a paleta no App.jsx, repita aqui — ou os tons do lab
//     ficarão diferentes dos do validador. Em compensação, este arquivo é
//     100% independente: nada que se mude no App.jsx quebra o lab.
//   • Os componentes seguem o mesmo padrão visual (CSS-in-JS, dark mode,
//     bordas suaves) do projeto atual. Não introduz nenhuma biblioteca.
//   • Os nomes começam com "Lab" para evitar qualquer colisão com os
//     componentes do App.jsx (Card, Note, Badge, etc.).
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useMemo, useState } from "react";

// ───────────────────────────────────────────────────────────────────────
// PALETA (espelho da paleta do App.jsx)
// ───────────────────────────────────────────────────────────────────────
export const t = {
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


// ───────────────────────────────────────────────────────────────────────
// HELPERS DEFENSIVOS — impedem que dados incompletos quebrem uma aba
// ───────────────────────────────────────────────────────────────────────
const asArray = (value) => Array.isArray(value) ? value : [];
const asObject = (value) => (value && typeof value === "object" && !Array.isArray(value)) ? value : {};
const asText = (value, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map((v) => asText(v)).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return value.title || value.titulo || value.name || value.nome || value.label || value.text || value.texto || value.description || value.descricao || value.desc || value.item || fallback;
  }
  return String(value);
};
const pickBody = (item, fallback = "") => asText(asObject(item).text || asObject(item).texto || asObject(item).description || asObject(item).descricao || asObject(item).desc || asObject(item).uso || asObject(item).significado || asObject(item).conteudo, fallback);

// ───────────────────────────────────────────────────────────────────────
// HOOK: estado persistido em localStorage (com tolerância a falhas)
// ───────────────────────────────────────────────────────────────────────
function usePersistedState(storageKey, initialValue) {
  const [state, setState] = useState(() => {
    if (!storageKey) return initialValue;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* localStorage pode falhar em modo privado / quota — ignorar */
    }
  }, [state, storageKey]);
  return [state, setState];
}

// ───────────────────────────────────────────────────────────────────────
// LabBadge — chip colorido (mesmo padrão de Badge do App.jsx)
// ───────────────────────────────────────────────────────────────────────
export function LabBadge({ children, color = t.blue }) {
  return (
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
}

// ───────────────────────────────────────────────────────────────────────
// LabSourceBadge — etiqueta da origem normativa
// Tipos: ABNT, IBGE, Diretriz, Prática, Software, Institucional, SIGAA-UFPE
// ───────────────────────────────────────────────────────────────────────
const SOURCE_MAP = {
  ABNT: { color: "#5b9aff", label: "ABNT" },
  IBGE: { color: "#4ddfd6", label: "IBGE" },
  Diretriz: { color: "#3ed68b", label: "Diretriz" },
  Pratica: { color: "#ffa05c", label: "Prática" },
  Software: { color: "#8a93b0", label: "Software" },
  Institucional: { color: "#c084fc", label: "Institucional" },
  SIGAA: { color: "#ffc857", label: "SIGAA-UFPE" },
};

export function LabSourceBadge({ tipo, label }) {
  const cfg = SOURCE_MAP[tipo] || SOURCE_MAP.Pratica;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 700,
        background: cfg.color + "22",
        color: cfg.color,
        border: `1px solid ${cfg.color}55`,
        letterSpacing: "0.04em",
        marginRight: 6,
      }}
    >
      {label || cfg.label}
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabCard — wrapper com borda (mesmo padrão de Card)
// ───────────────────────────────────────────────────────────────────────
export function LabCard({ children, color, glow, style: s = {}, titulo, title, sub, subtitle, badges }) {
  const heading = title || titulo;
  const subtitleText = subtitle || sub;
  const hasContent = children !== undefined && children !== null && children !== false && children !== "";
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${color ? color + "44" : t.border}`,
        borderRadius: 14,
        padding: "20px 22px",
        boxShadow: glow ? `0 0 24px ${color}22` : "none",
        marginBottom: 14,
        ...s,
      }}
    >
      {heading && (
        <div style={{ fontWeight: 800, color: t.text, fontSize: 14, marginBottom: hasContent || subtitleText ? 8 : 0 }}>
          {heading}
        </div>
      )}
      {subtitleText && (
        <div style={{ color: t.textMuted, fontSize: 12.5, lineHeight: 1.5, marginBottom: hasContent ? 10 : 0 }}>
          {subtitleText}
        </div>
      )}
      {Array.isArray(badges) && badges.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: hasContent ? 10 : 0 }}>
          {badges.map((b, i) => <LabBadge key={i} color={b.color || color || t.blue}>{b.label || b}</LabBadge>)}
        </div>
      )}
      {hasContent ? children : null}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabSectionHeader — cabeçalho de aba com ícone, título, subtítulo e badges
// ───────────────────────────────────────────────────────────────────────
export function LabSectionHeader({ icon, icone, title, titulo, sub, subtitulo, color = t.blue, badges }) {
  const realIcon = icon ?? icone;
  const realTitle = title || titulo || "";
  const realSub = sub || subtitulo || "";
  return (
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
            flexShrink: 0,
          }}
        >
          {realIcon}
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
          {realTitle}
        </h2>
      </div>
      {realSub && (
        <p style={{ color: t.textMuted, margin: 0, fontSize: 13, lineHeight: 1.6 }}>
          {realSub}
        </p>
      )}
      {Array.isArray(badges) && badges.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {badges.map((b, i) => (
            <LabBadge key={i} color={b.color || color}>{b.label || b.tipo || b}</LabBadge>
          ))}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabNote — caixa de aviso (info / warn / danger / success / tip)
// ───────────────────────────────────────────────────────────────────────
export function LabNote({ children, type = "info", tipo }) {
  const realType = tipo || type;
  const styles = {
    info: { bg: t.blueSoft, border: t.blue, icon: "ℹ️" },
    warn: { bg: t.yellowSoft, border: t.yellow, icon: "⚠️" },
    danger: { bg: t.redSoft, border: t.red, icon: "❌" },
    success: { bg: t.greenSoft, border: t.green, icon: "✅" },
    tip: { bg: t.purpleSoft, border: t.purple, icon: "💡" },
  };
  const s = styles[realType] || styles.info;
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
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabGrid — wrapper grid responsivo (auto-fit / minmax)
// Espera: children, minWidth opcional, gap opcional
// ───────────────────────────────────────────────────────────────────────
export function LabGrid({ children, minWidth = 260, gap = 12, style: s = {} }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
        gap: gap,
        ...s,
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabExampleBlock — bloco de exemplo com label + texto mono + status
// status: "correto" | "errado" | "atencao" | "neutral"
// Aceita: label, texto, status, explicacao, serif (boolean — usa Source Serif)
// ───────────────────────────────────────────────────────────────────────
export function LabExampleBlock({ label, texto, status = "neutral", explicacao, serif = false }) {
  const colors = {
    correto: { bg: t.greenSoft, border: t.green, label: t.green },
    errado: { bg: t.redSoft, border: t.red, label: t.red },
    atencao: { bg: t.yellowSoft, border: t.yellow, label: t.yellow },
    neutral: { bg: t.surfaceAlt, border: t.border, label: t.textMuted },
  };
  const c = colors[status] || colors.neutral;
  const fontFamily = serif
    ? "'Source Serif 4', Georgia, serif"
    : "'JetBrains Mono', 'Courier New', monospace";
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
          fontFamily: fontFamily,
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
}

// ───────────────────────────────────────────────────────────────────────
// LabChecklist — lista de itens checkáveis com persistência em localStorage
// Aceita:
//   items: string[] | { text, hint? }[]
//   storageKey: string (obrigatório para persistir; opcional → estado só em memória)
//   color: cor do destaque
// ───────────────────────────────────────────────────────────────────────
export function LabChecklist({ items = [], itens, storageKey, color = t.green }) {
  const safeItems = asArray(items).length ? asArray(items) : asArray(itens);
  const [checked, setChecked] = usePersistedState(storageKey, {});

  const toggle = (i) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  if (safeItems.length === 0) {
    return <div style={{ color: t.textMuted, fontSize: 13 }}>Conteúdo não encontrado ou estrutura de dados incompleta.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {safeItems.map((it, i) => {
        const o = asObject(it);
        const text = typeof it === "string" ? it : (o.text || o.texto || o.item || o.label || o.titulo || o.descricao || asText(it));
        const hint = typeof it === "string" ? null : (o.hint || o.dica || o.obs || o.observacao);
        const isChecked = !!checked[i];
        return (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "10px 12px",
              background: isChecked ? color + "11" : t.surfaceAlt,
              border: `1px solid ${isChecked ? color + "44" : t.border}`,
              borderRadius: 8,
              cursor: "pointer",
              userSelect: "none",
              transition: "background 0.15s",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 18,
                height: 18,
                borderRadius: 4,
                background: isChecked ? color : "transparent",
                border: `2px solid ${isChecked ? color : t.textFaint}`,
                color: "#000",
                fontSize: 13,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              {isChecked ? "✓" : ""}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  color: isChecked ? t.textMuted : t.text,
                  lineHeight: 1.5,
                  textDecoration: isChecked ? "line-through" : "none",
                }}
              >
                {text}
              </div>
              {hint && (
                <div style={{ fontSize: 11, color: t.textFaint, marginTop: 4 }}>
                  {hint}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabChecklistBlock — bloco colapsável com título e LabChecklist embutida
// Aceita:
//   title, items, storageKey, color, defaultOpen
// ───────────────────────────────────────────────────────────────────────
export function LabChecklistBlock({ title, titulo, bloco, items = [], itens, checklist, blocos, blocks, storageKey, color = t.green, defaultOpen = true }) {
  const blockList = asArray(blocos).length ? asArray(blocos) : asArray(blocks);
  if (blockList.length > 0) {
    return (
      <div>
        {blockList.map((b, i) => {
          const o = asObject(b);
          const blockTitle = o.title || o.titulo || o.bloco || o.nome || `Bloco ${i + 1}`;
          const blockItems = o.items || o.itens || o.checklist || o.regras || [];
          return (
            <LabChecklistBlock
              key={i}
              title={blockTitle}
              items={blockItems}
              storageKey={storageKey ? `${storageKey}:${i}` : undefined}
              color={color}
              defaultOpen={i === 0 ? defaultOpen : false}
            />
          );
        })}
      </div>
    );
  }

  const safeItems = asArray(items).length ? asArray(items) : (asArray(itens).length ? asArray(itens) : asArray(checklist));
  const realTitle = title || titulo || bloco || "Checklist";
  const [open, setOpen] = useState(defaultOpen);
  const [checkedState] = usePersistedState(storageKey, {});
  const totalCount = safeItems.length;
  const checkedCount = useMemo(
    () => Object.values(checkedState || {}).filter(Boolean).length,
    [checkedState]
  );

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${color}33`,
        borderRadius: 12,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "transparent",
          border: "none",
          color: t.text,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          fontWeight: 700,
          textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: color }}>{open ? "▼" : "▶"}</span>
          {realTitle}
        </span>
        <span
          style={{
            fontSize: 11,
            color: color,
            background: color + "22",
            padding: "2px 8px",
            borderRadius: 5,
            fontFamily: "monospace",
          }}
        >
          {checkedCount}/{totalCount}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 14px" }}>
          <LabChecklist items={safeItems} storageKey={storageKey} color={color} />
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabDecisionTable — tabela de decisão genérica
// Aceita:
//   columns: [{ key, label, width? }]
//   rows: [{ [key]: value, ... }]
//   color: cor do cabeçalho
// ───────────────────────────────────────────────────────────────────────
export function LabDecisionTable({ columns = [], rows = [], data, color = t.blue }) {
  const safeColumns = asArray(columns);
  const rawRows = asArray(rows).length ? asArray(rows) : asArray(data);
  const safeRows = rawRows.map((r) => asObject(r));

  if (safeColumns.length === 0 || safeRows.length === 0) {
    return <LabNote type="info">Conteúdo não encontrado ou estrutura de dados incompleta.</LabNote>;
  }

  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        overflow: "auto",
        background: t.surface,
        marginBottom: 12,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: color + "22" }}>
            {safeColumns.map((c, i) => {
              const key = c.key || c.id || String(i);
              return (
                <th
                  key={key}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    color: color,
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${color}44`,
                    width: c.width || "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label || c.titulo || key}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((r, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? t.surface : t.surfaceAlt,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              {safeColumns.map((c, j) => {
                const key = c.key || c.id || String(j);
                return (
                  <td
                    key={key}
                    style={{
                      padding: "10px 12px",
                      color: t.text,
                      lineHeight: 1.5,
                      verticalAlign: "top",
                    }}
                  >
                    {asText(r[key])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabComparisonCard — comparação lado a lado (2-4 colunas)
// Aceita:
//   headers: [string, string, ...]  (cabeçalho de cada coluna)
//   rows: [[célula1, célula2, ...], ...]
//   firstColumnIsLabel: boolean (estiliza 1ª coluna como label)
//   color: cor do cabeçalho
// ───────────────────────────────────────────────────────────────────────
export function LabComparisonCard({ headers = [], rows = [], firstColumnIsLabel = false, color = t.blue }) {
  const safeHeaders = asArray(headers);
  const safeRows = asArray(rows).map((r) => asArray(r));
  if (safeHeaders.length === 0 || safeRows.length === 0) {
    return <LabNote type="info">Conteúdo não encontrado ou estrutura de dados incompleta.</LabNote>;
  }
  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        overflow: "auto",
        background: t.surface,
        marginBottom: 12,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead>
          <tr style={{ background: color + "22" }}>
            {safeHeaders.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  color: color,
                  fontWeight: 800,
                  fontSize: 11.5,
                  borderBottom: `1px solid ${color}44`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((r, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? t.surface : t.surfaceAlt,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              {r.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 12px",
                    color: t.text,
                    lineHeight: 1.55,
                    fontWeight: firstColumnIsLabel && j === 0 ? 700 : 400,
                    verticalAlign: "top",
                  }}
                >
                  {asText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabExerciseCard — card de exercício de busca científica
// Aceita: pergunta, pico, chave_pt, chave_en, nota
// ───────────────────────────────────────────────────────────────────────
export function LabExerciseCard({ exercise, index, pergunta, pico, chave_pt, chave_en, nota }) {
  const ex = asObject(exercise);
  const realPergunta = pergunta || ex.pergunta || ex.titulo || ex.nome || `Exercício ${index || ""}`;
  const realPico = pico || ex.pico || ex.peco || ex.pergunta_estruturada;
  const realChavePt = chave_pt || ex.chave_pt || ex.chavePt || ex.pt;
  const realChaveEn = chave_en || ex.chave_en || ex.chaveEn || ex.en;
  const realNota = nota || ex.nota || ex.dica || ex.explicacao;
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = (text, key) => {
    if (!navigator || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.blue}33`,
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 12,
      }}
    >
      <div style={{ fontWeight: 700, color: t.text, fontSize: 13.5, marginBottom: 8 }}>
        🔎 {realPergunta}
      </div>

      {realPico && (
        <div
          style={{
            padding: "8px 10px",
            background: t.surfaceAlt,
            borderLeft: `3px solid ${t.blue}`,
            borderRadius: 6,
            fontSize: 12,
            color: t.textMuted,
            lineHeight: 1.6,
            marginBottom: 10,
          }}
        >
          <span style={{ color: t.blue, fontWeight: 700, fontSize: 10, letterSpacing: "0.04em" }}>
            PICO/PECO:
          </span>{" "}
          {realPico}
        </div>
      )}

      {[
        { label: "🇧🇷 Chave em português", key: "pt", text: realChavePt, color: t.green },
        { label: "🇬🇧 Chave em inglês", key: "en", text: realChaveEn, color: t.cyan },
      ].map((k) =>
        k.text ? (
          <div key={k.key} style={{ marginBottom: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: k.color,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {k.label}
              </span>
              <button
                onClick={() => copy(k.text, k.key)}
                style={{
                  padding: "2px 8px",
                  background: copiedKey === k.key ? k.color : "transparent",
                  color: copiedKey === k.key ? "#000" : k.color,
                  border: `1px solid ${k.color}55`,
                  borderRadius: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {copiedKey === k.key ? "✅ COPIADO" : "📋 COPIAR"}
              </button>
            </div>
            <div
              style={{
                padding: "8px 10px",
                background: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                color: t.text,
                lineHeight: 1.6,
                wordBreak: "break-word",
              }}
            >
              {k.text}
            </div>
          </div>
        ) : null
      )}

      {realNota && (
        <div
          style={{
            marginTop: 8,
            padding: "6px 10px",
            background: t.yellowSoft,
            border: `1px solid ${t.yellow}33`,
            borderRadius: 6,
            fontSize: 11.5,
            color: t.text,
            lineHeight: 1.5,
          }}
        >
          💡 {realNota}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabStepper — passos numerados verticais
// Aceita:
//   steps: [{ num, titulo, pontos: string[], extra?: ReactNode }]
//   color
// Cada passo é colapsável; estado UI-only (não persiste).
// ───────────────────────────────────────────────────────────────────────
export function LabStepper({ steps, color = t.yellow }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {steps.map((s, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            style={{
              background: t.surface,
              border: `1px solid ${isOpen ? color + "55" : t.border}`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: isOpen ? color : color + "22",
                  color: isOpen ? "#000" : color,
                  border: `1px solid ${color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {s.num}
              </span>
              <span style={{ flex: 1, color: t.text, fontSize: 13, fontWeight: 700 }}>
                {s.titulo}
              </span>
              <span style={{ color: color, fontSize: 11 }}>{isOpen ? "▼" : "▶"}</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 14px 14px 56px" }}>
                {s.pontos && s.pontos.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18, color: t.text, fontSize: 12.5, lineHeight: 1.7 }}>
                    {s.pontos.map((p, j) => (
                      <li key={j} style={{ marginBottom: 4 }}>{p}</li>
                    ))}
                  </ul>
                )}
                {s.extra && <div style={{ marginTop: 10 }}>{s.extra}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabMiniSearchBuilder — mini-gerador local (sem API)
// Aceita:
//   fields: [{ id, label, type?: "text"|"number"|"select", options?, placeholder?, width? }]
//   buildOutput: (values) => string
//   alerts?: (values) => string[]   (opcional — alertas dinâmicos)
//   initialValues?: object
//   helper?: string
//   outputMonospace?: boolean (default true)
// ───────────────────────────────────────────────────────────────────────
export function LabMiniSearchBuilder({
  title,
  fields = [],
  buildOutput,
  alerts,
  initialValues = {},
  helper,
  outputMonospace = true,
  outputTitle = "Resultado",
  copyLabel = "Copiar saída",
  emptyMessage = "Preencha os campos para gerar a saída.",
}) {
  const safeFields = asArray(fields).map((field) => ({ ...field }));
  const [values, setValues] = useState(() => {
    const base = {};
    safeFields.forEach((f) => { base[f.id] = initialValues[f.id] ?? ""; });
    return base;
  });
  const [copiado, setCopiado] = useState(false);

  const output = useMemo(() => {
    try {
      const built = buildOutput ? buildOutput(values) : "";
      return typeof built === "string" ? built.trim() : "";
    } catch {
      return "";
    }
  }, [values, buildOutput]);

  const dynAlerts = useMemo(() => {
    if (!alerts) return [];
    try { return asArray(alerts(values)); } catch { return []; }
  }, [values, alerts]);

  const limpar = () => {
    const base = {};
    safeFields.forEach((f) => { base[f.id] = ""; });
    setValues(base);
  };

  const copiar = () => {
    if (!output || !navigator?.clipboard) return;
    navigator.clipboard.writeText(output).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(240px, 1fr))",
    gap: 12,
    marginBottom: 12,
  };

  return (
    <LabCard titulo={title} style={{ maxWidth: 760 }}>
      {helper && <LabNote type="tip">{helper}</LabNote>}
      <div style={gridStyle}>
        {safeFields.map((f) => {
          const full = f.full || f.span === "full" || f.width === "full";
          const multiline = f.type === "textarea";
          return (
            <label
              key={f.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                fontSize: 12,
                color: t.textMuted,
                gridColumn: full ? "1 / -1" : "auto",
                minWidth: 0,
              }}
            >
              <span>{f.label}</span>
              {multiline ? (
                <textarea
                  value={values[f.id] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                  placeholder={f.placeholder || ""}
                  rows={f.rows || 2}
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                    borderRadius: 7,
                    padding: "9px 10px",
                    fontSize: 13,
                    lineHeight: 1.5,
                    resize: "vertical",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                <input
                  value={values[f.id] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                  placeholder={f.placeholder || ""}
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                    borderRadius: 7,
                    padding: "9px 10px",
                    fontSize: 13,
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              )}
              {f.help && (
                <span style={{ color: t.textFaint, fontSize: 11.5, lineHeight: 1.45 }}>{f.help}</span>
              )}
            </label>
          );
        })}
      </div>
      {dynAlerts.map((a, i) => <LabNote key={i} type="warn">{a}</LabNote>)}

      <div style={{ marginTop: 14, marginBottom: 12 }}>
        <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 800, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {outputTitle}
        </div>
        {output ? (
          <div style={{
            background: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            padding: 12,
            whiteSpace: "pre-wrap",
            color: t.text,
            fontFamily: outputMonospace ? "'JetBrains Mono', monospace" : "inherit",
            fontSize: 13,
            lineHeight: 1.7,
          }}>{output}</div>
        ) : (
          <div style={{
            background: t.bg,
            border: `1px dashed ${t.border}`,
            borderRadius: 8,
            padding: 12,
            color: t.textMuted,
            fontSize: 13,
            lineHeight: 1.6,
          }}>{emptyMessage}</div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={limpar} style={{ padding: "7px 12px", borderRadius: 7, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, cursor: "pointer" }}>Limpar</button>
        <button
          onClick={copiar}
          disabled={!output}
          style={{
            padding: "7px 12px",
            borderRadius: 7,
            border: `1px solid ${t.blue}55`,
            background: output ? t.blueSoft : t.surfaceAlt,
            color: output ? t.blue : t.textFaint,
            cursor: output ? "pointer" : "not-allowed",
            fontWeight: 700,
          }}
        >{copiado ? "Copiado" : copyLabel}</button>
      </div>
    </LabCard>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabSubTitle — separador interno (espelho de SubTitle do App)
// ───────────────────────────────────────────────────────────────────────
export function LabSubTitle({ children, color = t.blue }) {
  return (
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
}

// ───────────────────────────────────────────────────────────────────────
// LabRuleList — lista numerada (espelho de RuleList)
// ───────────────────────────────────────────────────────────────────────
export function LabRuleList({ rules, items, itens, color = t.blue }) {
  const safeRules = asArray(rules).length ? asArray(rules) : (asArray(items).length ? asArray(items) : asArray(itens));
  if (safeRules.length === 0) {
    return <div style={{ color: t.textMuted, fontSize: 13 }}>Conteúdo não encontrado ou estrutura de dados incompleta.</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {safeRules.map((r, i) => (
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
          <span>{asText(r)}</span>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LabTabs — sub-navegação interna (chips horizontais com scroll em mobile)
// Aceita: tabs: [{ id, label, count? }], activeId, onChange
// ───────────────────────────────────────────────────────────────────────
export function LabTabs({ tabs = [], activeId, active, onChange, color = t.blue }) {
  const safeTabs = asArray(tabs);
  const current = activeId ?? active;
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: 6,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        marginBottom: 14,
        overflowX: "auto",
      }}
    >
      {safeTabs.map((tab) => {
        const isActive = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              padding: "7px 12px",
              background: isActive ? color + "22" : "transparent",
              color: isActive ? color : t.textMuted,
              border: `1px solid ${isActive ? color + "55" : "transparent"}`,
              borderRadius: 7,
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              flexShrink: 0,
            }}
          >
            {tab.label || tab.titulo || tab.id}
            {tab.count ? <span style={{ color: t.textFaint }}>({tab.count})</span> : null}
          </button>
        );
      })}
    </div>
  );
}
