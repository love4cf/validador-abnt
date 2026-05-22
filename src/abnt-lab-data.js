// ═══════════════════════════════════════════════════════════════════════════
// abnt-lab-data.js
// ─────────────────────────────────────────────────────────────────────────
// Dados (data-only) usados pelas 12 abas novas do "ABNT Lab".
// Sem JSX, sem React — apenas constantes exportadas. Mantenha aqui tudo
// que for tabela/lista/enumeração para que os módulos de UI fiquem enxutos.
//
// Origem normativa indicada em cada bloco. Conteúdo parafraseado dos PDFs
// anexados no projeto:
//   • ABNT NBR 14724:2024 — apresentação de trabalhos acadêmicos
//   • ABNT NBR 6023:2018  — referências
//   • ABNT NBR 10520:2023 — citações
//   • ABNT NBR 6024:2012  — numeração progressiva
//   • ABNT NBR 6027:2012  — sumário
//   • IBGE — Normas de Apresentação Tabular, 3ª ed., 1993
//   • PROEXC/UFPE — Projeto de Extensão: Orientações para Escrita no SIGAA
//   • CARE 2013 • PRISMA 2020 • STROBE v4 • SAMPL 2013
//   • Livro "Descomplicando MBE", 2ª ed. (referência para CONSORT)
// ═══════════════════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────────────
// 🔎 BUSCA CIENTÍFICA
// ────────────────────────────────────────────────────────────────────────

export const BASES_PESQUISA = [
  {
    nome: "PubMed / MEDLINE",
    icone: "🧬",
    serve: "Maior base de literatura biomédica (NLM/NIH). Cobertura desde 1946, com indexação MeSH e termos livres.",
    fortes: "Cobertura ampla, MeSH potente, filtros por tipo de estudo, integração com NCBI/Crossref.",
    limites: "Predomínio do inglês; alguns periódicos brasileiros não indexados.",
    quando: "Toda revisão clínica/biomédica deve começar aqui.",
    cuidado: "Filtros automáticos podem deixar de fora estudos relevantes — combine com termos livres.",
  },
  {
    nome: "BVS / LILACS",
    icone: "🌎",
    serve: "Literatura latino-americana e do Caribe em saúde, com forte presença brasileira.",
    fortes: "Recupera literatura local não indexada no PubMed; suporta DeCS (versão pt/es).",
    limites: "Menor padronização editorial; nem todo periódico tem texto completo.",
    quando: "Tópicos com forte epidemiologia regional (dengue, esquistossomose, SUS, atenção primária).",
    cuidado: "Verificar se o periódico tem revisão por pares.",
  },
  {
    nome: "SciELO",
    icone: "📚",
    serve: "Coleção de periódicos científicos com acesso aberto, com forte representação ibero-americana.",
    fortes: "Acesso aberto, métricas próprias, multilíngue.",
    limites: "Cobertura por área; nem todo periódico de saúde está incluído.",
    quando: "Buscar artigos brasileiros em texto completo aberto.",
    cuidado: "Confira o fator de impacto do periódico para contexto editorial.",
  },
  {
    nome: "Cochrane Library",
    icone: "📖",
    serve: "Revisões sistemáticas e meta-análises de alta qualidade metodológica.",
    fortes: "Síntese de evidência clínica padronizada; CENTRAL traz ensaios clínicos.",
    limites: "Cobre só revisões e ensaios; não substitui PubMed para perguntas amplas.",
    quando: "Quando já existe revisão sistemática sobre o tema.",
    cuidado: "Mesmo revisões Cochrane têm limitações — leia as conclusões dos autores e a seção de qualidade da evidência.",
  },
  {
    nome: "Google Scholar",
    icone: "🌐",
    serve: "Busca acadêmica ampla, abrange artigos, teses, livros e materiais cinzentos.",
    fortes: "Cobertura imensa; recupera trabalhos não indexados em bases tradicionais.",
    limites: "Falta de transparência editorial; muitos resultados sem revisão por pares; algoritmo pouco controlável.",
    quando: "Busca exploratória ou para encontrar trabalhos cinzentos.",
    cuidado: "Não use como única base. Confirme cada achado em fonte primária.",
  },
  {
    nome: "Portal CAPES",
    icone: "🇧🇷",
    serve: "Plataforma de acesso institucional a bases pagas (Embase, Web of Science, etc.).",
    fortes: "Acesso a bases caras pagas via universidade brasileira.",
    limites: "Exige login institucional; interfaces variam por base.",
    quando: "Quando você precisar de bases pagas (Embase para fármacos, Web of Science para citações).",
    cuidado: "Cada base do Portal tem sintaxe própria — não copie a chave de uma para outra sem ajuste.",
  },
  {
    nome: "Sociedades científicas e diretrizes",
    icone: "🏥",
    serve: "Sites de sociedades (SBC, SBP, SBE, AHA, ESC, OMS, MS) publicam diretrizes e consensos.",
    fortes: "Documento oficial da sociedade; orientação clínica direta.",
    limites: "Não substitui leitura crítica da evidência primária.",
    quando: "Buscar conduta clínica recomendada por sociedade especializada.",
    cuidado: "Confira a data da diretriz — algumas estão desatualizadas. Sempre cruze com a literatura mais recente.",
  },
];

export const MODELOS_PERGUNTA = [
  { sigla: "PICO", quando: "Intervenção terapêutica", componentes: ["P — População/Paciente", "I — Intervenção", "C — Comparador", "O — Outcome (desfecho)"], exemplo: "Em adultos com IC e FE reduzida (P), uso de SGLT2 (I), comparado a placebo (C), reduz mortalidade cardiovascular (O)?" },
  { sigla: "PECO", quando: "Etiologia / fator de exposição (não intervenção)", componentes: ["P — População", "E — Exposição", "C — Comparador (não exposto)", "O — Outcome"], exemplo: "Em gestantes (P), exposição ao tabagismo (E), comparado a não-fumantes (C), aumenta risco de baixo peso ao nascer (O)?" },
  { sigla: "Prevalência", quando: "Estudos descritivos de frequência de doença/condição", componentes: ["População", "Período", "Local", "Condição"], exemplo: "Qual a prevalência de hipertensão em adultos de Caruaru-PE no ano de 2024?" },
  { sigla: "Qualitativa", quando: "Compreender experiência, percepção, processo", componentes: ["População", "Fenômeno de interesse", "Contexto"], exemplo: "Como mães de bebês prematuros (P) vivenciam o cuidado pós-alta na UTIN (fenômeno) em maternidades públicas (contexto)?" },
];

export const OPERADORES_BOOL = [
  { op: "AND", uso: "Combinar conceitos diferentes", exemplo: "diabetes AND gestação", efeito: "Restringe — recupera só artigos com os DOIS conceitos." },
  { op: "OR", uso: "Combinar sinônimos do MESMO conceito", exemplo: "(diabetes OR \"diabetes mellitus\")", efeito: "Amplia — recupera artigos com QUALQUER um dos termos." },
  { op: "NOT", uso: "Excluir conceito indesejado", exemplo: "diabetes NOT \"diabetes insipidus\"", efeito: "Restringe perigosamente — pode excluir artigos relevantes que mencionem o termo. Use com cautela." },
  { op: '"…"', uso: "Frase exata", exemplo: '"chronic kidney disease"', efeito: "Recupera só a frase literal." },
  { op: "( )", uso: "Agrupar termos", exemplo: "(SGLT2 OR empagliflozin OR dapagliflozin) AND heart failure", efeito: "Define a precedência das operações." },
  { op: "*", uso: "Truncamento — qualquer terminação", exemplo: "pregnan*  (recupera pregnancy, pregnant, pregnancies)", efeito: "Amplia — útil para variações de raiz." },
];

export const EXERCICIOS_BUSCA = [
  {
    pergunta: "SGLT2 em insuficiência cardíaca",
    pico: "Adultos com IC e FE reduzida; SGLT2; placebo; mortalidade CV.",
    chave_pt: '("insuficiência cardíaca" OR IC) AND ("inibidores SGLT2" OR empagliflozina OR dapagliflozina) AND (mortalidade OR óbito)',
    chave_en: '("heart failure" OR HF) AND ("SGLT2 inhibitors" OR empagliflozin OR dapagliflozin) AND (mortality OR death)',
    nota: "Comece pelo PubMed com chave em inglês. Para SciELO/BVS, traduza para português + espanhol.",
  },
  {
    pergunta: "Fototerapia em icterícia neonatal",
    pico: "Recém-nascidos com hiperbilirrubinemia; fototerapia; sem fototerapia/observação; bilirrubina/exsanguíneo.",
    chave_pt: '("recém-nascido" OR neonato) AND (icterícia OR hiperbilirrubinemia) AND fototerapia',
    chave_en: '(newborn OR neonate) AND (jaundice OR hyperbilirubinemia) AND phototherapy',
    nota: "Filtros etários do PubMed ajudam (Infant, Newborn: birth-1 month).",
  },
  {
    pergunta: "Corticoide e hiperglicemia",
    pico: "Adultos sob corticoterapia; risco de hiperglicemia; sem corticoide; glicemia/DM.",
    chave_pt: '(corticosteroide OR corticoide OR prednisona OR dexametasona) AND (hiperglicemia OR "diabetes induzido")',
    chave_en: '(corticosteroid OR prednisone OR dexamethasone) AND (hyperglycemia OR "steroid-induced diabetes")',
    nota: "Para incluir só ensaios clínicos: adicionar filtro 'Clinical Trial' no PubMed.",
  },
  {
    pergunta: "Tuberculose pericárdica",
    pico: "Pacientes com derrame pericárdico; suspeita de TB; tratamento anti-TB; resolução do derrame/sobrevida.",
    chave_pt: '("tuberculose pericárdica" OR "pericardite tuberculosa") AND (tratamento OR terapia)',
    chave_en: '("tuberculous pericarditis" OR "pericardial tuberculosis") AND (treatment OR therapy)',
    nota: "Tema raro — espere poucos resultados. Considere relatos de caso e séries.",
  },
  {
    pergunta: "Diabetes gestacional e parto",
    pico: "Gestantes com DMG; via de parto; desfecho materno e neonatal.",
    chave_pt: '("diabetes gestacional" OR DMG) AND (parto OR cesárea OR "parto vaginal")',
    chave_en: '("gestational diabetes" OR GDM) AND (delivery OR cesarean OR "vaginal birth")',
    nota: "Combine com filtros 'Cohort Studies' e 'Randomized Controlled Trial' para evidência mais forte.",
  },
  {
    pergunta: "Exantema em crianças",
    pico: "Crianças com exantema agudo; etiologias virais; diagnóstico clínico.",
    chave_pt: '(exantema OR rash) AND (criança OR pediátrico) AND (vírus OR sarampo OR rubéola OR enterovírus)',
    chave_en: '(exanthema OR rash) AND (child OR pediatric) AND (virus OR measles OR rubella OR enterovirus)',
    nota: "Tópico amplo — refine pelo agente etiológico ou pelo grupo etário.",
  },
  {
    pergunta: "Síndrome nefrótica em crianças",
    pico: "Crianças com síndrome nefrótica; corticoide; resposta clínica/recidiva.",
    chave_pt: '("síndrome nefrótica" OR "nefrótica idiopática") AND (criança OR pediátrico) AND (corticoide OR prednisona)',
    chave_en: '("nephrotic syndrome" OR "idiopathic nephrotic") AND (child OR pediatric) AND (corticosteroid OR prednisone)',
    nota: "Cochrane tem revisão sistemática consolidada — comece por lá se procura síntese.",
  },
];

export const PASSOS_BUSCA = [
  "Defina a pergunta clínica usando PICO/PECO/Prevalência/Qualitativa.",
  "Identifique os conceitos principais (geralmente 2 a 4).",
  "Liste sinônimos e variações para cada conceito.",
  "Consulte DeCS (pt) e MeSH (en) para termos controlados.",
  "Combine sinônimos com OR dentro de cada conceito.",
  "Combine conceitos diferentes com AND.",
  "Aplique aspas em frases e parênteses para agrupar.",
  "Teste a chave; ajuste se trouxer demais (refine) ou de menos (amplie).",
  "Aplique filtros por desenho de estudo quando pertinente.",
  "Documente data, base e chave usada — para reprodutibilidade.",
];

export const DOC_BUSCA_TEMPLATE = [
  "Data da busca",
  "Base consultada",
  "Estratégia de busca completa (string)",
  "Filtros aplicados (idioma, ano, desenho)",
  "Número de resultados obtidos",
  "Critérios de inclusão e exclusão usados na triagem",
  "Número de estudos selecionados após triagem por título/resumo",
  "Número de estudos incluídos após leitura completa",
];

// ────────────────────────────────────────────────────────────────────────
// 📋 DIRETRIZES DE RELATO
// ────────────────────────────────────────────────────────────────────────

export const DIRETRIZ_DECISAO = [
  { tipo: "Relato de caso", diretriz: "CARE", referencia: "Gagnier JJ et al. 2013" },
  { tipo: "Série de casos", diretriz: "CARE (adaptada)", referencia: "Aplicar CARE em cada caso descrito" },
  { tipo: "Revisão sistemática / meta-análise", diretriz: "PRISMA 2020", referencia: "Page MJ et al. 2021" },
  { tipo: "Revisão integrativa", diretriz: "PRISMA (parcial)", referencia: "Itens metodológicos do PRISMA aplicáveis" },
  { tipo: "Revisão narrativa", diretriz: "Sem diretriz padronizada", referencia: "Use clareza metodológica e transparência" },
  { tipo: "Estudo transversal", diretriz: "STROBE (cross-sectional)", referencia: "von Elm E et al. 2007" },
  { tipo: "Estudo de coorte", diretriz: "STROBE (cohort)", referencia: "von Elm E et al. 2007" },
  { tipo: "Caso-controle", diretriz: "STROBE (case-control)", referencia: "von Elm E et al. 2007" },
  { tipo: "Ensaio clínico randomizado (ECR)", diretriz: "CONSORT 2010", referencia: "Schulz KF et al. 2010 — checklist em consort-statement.org" },
  { tipo: "Estudo qualitativo", diretriz: "COREQ ou SRQR", referencia: "Tong A et al. 2007 / O'Brien BC et al. 2014" },
  { tipo: "Estudo diagnóstico", diretriz: "STARD 2015", referencia: "Bossuyt PM et al. 2015" },
  { tipo: "Avaliação econômica em saúde", diretriz: "CHEERS", referencia: "Husereau D et al. 2013/2022" },
  { tipo: "Estatística (qualquer desenho)", diretriz: "SAMPL", referencia: "Lang TA & Altman DG 2013 — aplicável em conjunto com a diretriz do desenho" },
];

export const CARE_ITEMS = [
  { num: 1, item: "Título contém 'relato de caso' e identifica o tópico de interesse." },
  { num: 2, item: "Palavras-chave (3 a 5) que sintetizam o caso." },
  { num: 3, item: "Resumo estruturado: introdução, apresentação do caso, conclusão." },
  { num: 4, item: "Introdução: contexto, justificativa do relato (raridade, particularidade)." },
  { num: 5, item: "Informações do paciente (anônimas): idade, sexo, etnia, ocupação relevante; queixa principal." },
  { num: 6, item: "Achados clínicos: história, exame físico, achados relevantes." },
  { num: 7, item: "Linha do tempo (timeline) das datas, intervenções e desfechos — ponto central da CARE." },
  { num: 8, item: "Avaliação diagnóstica: testes, raciocínio clínico, diagnósticos diferenciais." },
  { num: 9, item: "Intervenção terapêutica: tipos, doses, duração, modificações." },
  { num: 10, item: "Acompanhamento e desfechos: medidas objetivas e percepção do paciente." },
  { num: 11, item: "Discussão: pontos fortes, limitações, conclusões com base na evidência." },
  { num: 12, item: "Perspectiva do paciente (quando aplicável)." },
  { num: 13, item: "Consentimento informado documentado." },
];

export const PRISMA_ITEMS = [
  { num: 1, secao: "Título", item: "Identificar como revisão sistemática." },
  { num: 2, secao: "Resumo", item: "Resumo estruturado conforme PRISMA Abstract." },
  { num: 3, secao: "Introdução — Racional", item: "Justificar a revisão com base no conhecimento atual." },
  { num: 4, secao: "Introdução — Objetivos", item: "Declarar pergunta(s) com PICO/PECO." },
  { num: 5, secao: "Métodos — Critérios de elegibilidade", item: "Definir critérios PICO+desenho+período+idioma." },
  { num: 6, secao: "Métodos — Fontes de informação", item: "Listar todas as bases e datas das buscas." },
  { num: 7, secao: "Métodos — Estratégia de busca", item: "Apresentar a estratégia completa de pelo menos uma base." },
  { num: 8, secao: "Métodos — Seleção de estudos", item: "Descrever processo de triagem e duplo-revisor." },
  { num: 9, secao: "Métodos — Coleta de dados", item: "Métodos de extração e checagem." },
  { num: 10, secao: "Métodos — Lista de dados", item: "Variáveis extraídas e definições." },
  { num: 11, secao: "Métodos — Risco de viés nos estudos", item: "Ferramentas usadas (ex.: RoB 2, ROBINS-I, Newcastle-Ottawa)." },
  { num: 12, secao: "Métodos — Medidas de efeito", item: "OR, RR, HR, diferença de médias, etc." },
  { num: 13, secao: "Métodos — Síntese", item: "Decisão por meta-análise ou síntese narrativa." },
  { num: 14, secao: "Métodos — Avaliação de heterogeneidade", item: "I², Q de Cochran, análise de subgrupos." },
  { num: 15, secao: "Métodos — Avaliação de viés de publicação", item: "Funnel plot, Egger." },
  { num: 16, secao: "Métodos — Avaliação da certeza", item: "GRADE." },
  { num: 17, secao: "Resultados — Seleção", item: "Fluxograma PRISMA (Identificação → Triagem → Elegibilidade → Incluídos)." },
  { num: 18, secao: "Resultados — Características dos estudos", item: "Tabela com PICO, desenho, n, follow-up." },
  { num: 19, secao: "Resultados — Risco de viés", item: "Apresentação por estudo e por domínio." },
  { num: 20, secao: "Resultados — Síntese", item: "Forest plots quando há meta-análise." },
  { num: 21, secao: "Resultados — Heterogeneidade", item: "Resultado dos testes." },
  { num: 22, secao: "Resultados — Viés de publicação", item: "Resultado da avaliação." },
  { num: 23, secao: "Resultados — Certeza da evidência", item: "Sumário GRADE por desfecho." },
  { num: 24, secao: "Discussão", item: "Interpretação, limitações, implicações práticas e de pesquisa." },
  { num: 25, secao: "Registro do protocolo", item: "Indicar registro (PROSPERO, INPLASY)." },
  { num: 26, secao: "Suporte e conflito", item: "Financiamento e conflitos de interesse." },
  { num: 27, secao: "Disponibilidade", item: "Acesso aos dados, código, materiais suplementares." },
];

export const STROBE_ITEMS = [
  { num: 1, secao: "Título e resumo", item: "Indicar desenho no título; resumo informativo e equilibrado." },
  { num: 2, secao: "Introdução — Contexto", item: "Justificativa científica e racional." },
  { num: 3, secao: "Introdução — Objetivos", item: "Declarar objetivos específicos e hipóteses prévias." },
  { num: 4, secao: "Métodos — Desenho", item: "Especificar coorte/caso-controle/transversal." },
  { num: 5, secao: "Métodos — Cenário", item: "Local, datas, período de seguimento." },
  { num: 6, secao: "Métodos — Participantes", item: "Critérios de elegibilidade e métodos de seleção." },
  { num: 7, secao: "Métodos — Variáveis", item: "Definir desfechos, exposições, confundidores." },
  { num: 8, secao: "Métodos — Fontes / mensuração", item: "Como cada variável foi medida; comparabilidade entre grupos." },
  { num: 9, secao: "Métodos — Viés", item: "Esforços para reduzir viés de seleção, informação." },
  { num: 10, secao: "Métodos — Tamanho amostral", item: "Como o tamanho foi calculado." },
  { num: 11, secao: "Métodos — Variáveis quantitativas", item: "Como variáveis contínuas foram analisadas e categorizadas." },
  { num: 12, secao: "Métodos — Análise estatística", item: "Métodos usados, ajuste por confundidores, análises de sensibilidade." },
  { num: 13, secao: "Resultados — Participantes", item: "Número em cada estágio (elegíveis, examinados, incluídos)." },
  { num: 14, secao: "Resultados — Descritivos", item: "Características da amostra; faltantes." },
  { num: 15, secao: "Resultados — Desfecho", item: "Número de eventos ou medidas resumo." },
  { num: 16, secao: "Resultados — Principais", item: "Estimativas brutas e ajustadas, com IC." },
  { num: 17, secao: "Resultados — Outras análises", item: "Subgrupos, sensibilidade, interações." },
  { num: 18, secao: "Discussão — Resultados-chave", item: "Resumo dos achados em relação aos objetivos." },
  { num: 19, secao: "Discussão — Limitações", item: "Discutir viés residual, imprecisão, generalização." },
  { num: 20, secao: "Discussão — Interpretação", item: "Cautela com causalidade em desenhos observacionais." },
  { num: 21, secao: "Discussão — Generalização", item: "Validade externa dos achados." },
  { num: 22, secao: "Outras informações", item: "Financiamento, papel do financiador." },
];

export const CONSORT_ITEMS = [
  { num: 1, secao: "Título e resumo", item: "Identificar como ECR; resumo estruturado." },
  { num: 2, secao: "Introdução — Contexto", item: "Justificativa científica." },
  { num: 3, secao: "Métodos — Desenho do ensaio", item: "Paralelo, fatorial, cruzado, cluster, etc." },
  { num: 4, secao: "Participantes", item: "Critérios de elegibilidade, cenários." },
  { num: 5, secao: "Intervenções", item: "Detalhes suficientes para replicação." },
  { num: 6, secao: "Desfechos", item: "Primário(s) e secundários, pré-especificados." },
  { num: 7, secao: "Tamanho amostral", item: "Como foi calculado; análise interina." },
  { num: 8, secao: "Randomização — sequência", item: "Método de geração; restrições (blocos, estratificação)." },
  { num: 9, secao: "Randomização — alocação", item: "Mecanismo (centralizado, envelopes opacos)." },
  { num: 10, secao: "Randomização — implementação", item: "Quem gerou, quem inscreveu, quem alocou." },
  { num: 11, secao: "Cegamento", item: "Quem foi cegado e como." },
  { num: 12, secao: "Análise estatística", item: "Métodos para desfechos primários e secundários; análises de subgrupo." },
  { num: 13, secao: "Fluxograma de participantes", item: "Avaliados → randomizados → analisados → seguimento." },
  { num: 14, secao: "Resultados — efeito da intervenção", item: "Estimativa de efeito com IC 95%." },
  { num: 15, secao: "Limitações e generalização", item: "Considerar viés, imprecisão, validade externa." },
];

export const SAMPL_REGRAS = {
  descritiva: [
    "Variável contínua normal: média (DP). Evite ±, que confunde com IC.",
    "Variável contínua não-normal: mediana (IIQ Q1–Q3).",
    "Categórica: n (%). Indique sempre o denominador.",
    "Casas decimais consistentes na mesma variável; não escreva 32,1% e 27,15% juntos.",
  ],
  associacao: [
    "OR / RR / HR com IC 95%, ex.: HR 0,75 (IC 95% 0,62–0,91).",
    "Diferença de médias: estimativa com IC 95%.",
    "Sempre nomeie o referente (Grupo A vs Grupo B).",
  ],
  hipotese: [
    "Reporte p exato quando há igualdade: p = 0,03. Não escreva 'NS' (não significativo).",
    "Use p < 0,001 como limite mínimo de precisão.",
    "Nomeie o teste estatístico usado (t de Student, Mann-Whitney, qui-quadrado, regressão logística...).",
    "Nomeie o software (R 4.3.0, SPSS 28, Stata 17).",
  ],
};

// ────────────────────────────────────────────────────────────────────────
// 🧪 MÉTODO POR DESENHO
// ────────────────────────────────────────────────────────────────────────

export const DESENHOS_METODO = [
  {
    nome: "Relato de caso",
    icone: "📄",
    metodo: "Descrição cronológica de um (ou poucos) paciente, com linha do tempo, intervenções e desfechos.",
    erros: ["Confundir com 'caso clínico interessante' sem justificativa de raridade.", "Falta de timeline.", "Generalização excessiva."],
    diretriz: "CARE",
    limitacoes: "Sem grupo controle; sem inferência causal; não generalizável.",
    linguagem: "Use 'descreve-se', 'apresenta-se', 'ilustra'. Evite 'demonstra', 'comprova'.",
  },
  {
    nome: "Estudo transversal",
    icone: "📊",
    metodo: "Coleta de dados em um único ponto no tempo. Mede prevalência ou associação.",
    erros: ["Tratar associação como causalidade.", "Não declarar período da coleta.", "Amostra de conveniência apresentada como representativa."],
    diretriz: "STROBE (cross-sectional)",
    limitacoes: "Impossibilidade de estabelecer temporalidade (exposição vs desfecho).",
    linguagem: "Use 'associou-se', 'foi observada associação'. Evite 'causa'.",
  },
  {
    nome: "Estudo de coorte",
    icone: "📈",
    metodo: "Acompanhamento prospectivo (ou retrospectivo) de grupo exposto vs não exposto, observando incidência de desfecho.",
    erros: ["Confundir com caso-controle.", "Perdas de seguimento não declaradas.", "Ajuste insuficiente para confundidores."],
    diretriz: "STROBE (cohort)",
    limitacoes: "Confundimento residual; perdas de seguimento; viés do trabalhador sadio.",
    linguagem: "Use 'esteve associado a maior risco', 'prediz'. Cuidado com 'causa'.",
  },
  {
    nome: "Caso-controle",
    icone: "🔍",
    metodo: "Compara casos (com doença) e controles (sem doença), olhando exposições prévias.",
    erros: ["Pareamento inadequado.", "Viés de memória ignorado.", "Confundir OR com RR."],
    diretriz: "STROBE (case-control)",
    limitacoes: "Viés de memória; dependência de prontuário; só calcula OR (não RR).",
    linguagem: "Use 'esteve associado', 'foi mais frequente entre'. OR não é RR.",
  },
  {
    nome: "Ensaio clínico randomizado",
    icone: "🧪",
    metodo: "Randomização entre intervenção e controle, com cegamento quando possível, e seguimento prospectivo.",
    erros: ["Randomização inadequada (envelopes não opacos).", "Cegamento parcial não declarado.", "Análise não-ITT."],
    diretriz: "CONSORT 2010",
    limitacoes: "Validade externa (população restrita); seguimento curto; eventos adversos raros podem escapar.",
    linguagem: "Use 'reduziu', 'aumentou', 'foi superior'. Evite 'revolucionou', 'é definitivo'.",
  },
  {
    nome: "Revisão sistemática",
    icone: "📚",
    metodo: "Busca exaustiva, triagem padronizada, avaliação de qualidade, síntese (narrativa ou meta-análise).",
    erros: ["Busca em apenas uma base.", "Sem registro de protocolo (PROSPERO).", "Sem avaliação de risco de viés."],
    diretriz: "PRISMA 2020",
    limitacoes: "Viés de publicação; heterogeneidade entre estudos; qualidade dos estudos primários limita a conclusão.",
    linguagem: "Use 'a síntese dos estudos indica', 'com certeza moderada/baixa'. Cite GRADE.",
  },
];

// ────────────────────────────────────────────────────────────────────────
// ✍️ ESCRITA SEM EXAGERO
// ────────────────────────────────────────────────────────────────────────

export const VERBOS_POR_DESENHO = [
  { desenho: "Relato de caso", adequados: "ilustra, descreve, sugere, levanta a hipótese", evitar: "comprova, demonstra, prova, estabelece" },
  { desenho: "Estudo transversal", adequados: "associou-se, foi observada associação, esteve relacionado", evitar: "causa, leva a, determina" },
  { desenho: "Caso-controle", adequados: "esteve associado, foi mais frequente entre", evitar: "causou, gerou, induziu" },
  { desenho: "Coorte", adequados: "esteve associado a maior risco, prediz", evitar: "causa, é responsável por" },
  { desenho: "ECR", adequados: "reduziu, aumentou, foi superior a", evitar: "revolucionou, é definitivo, encerra a discussão" },
  { desenho: "Revisão narrativa", adequados: "discutiu-se, abordou-se, apresentaram-se", evitar: "revisão sistemática mostra que…" },
  { desenho: "Revisão sistemática", adequados: "a síntese indica, com certeza moderada/baixa", evitar: "comprova definitivamente" },
];

export const VERBOS_HEDGE = [
  { verbo: "sugere", uso: "Resultado plausível mas com limitação de desenho/poder. Ex.: os achados sugerem que…" },
  { verbo: "observou-se", uso: "Descrição neutra do que apareceu nos dados. Ex.: observou-se redução de 30% na incidência." },
  { verbo: "associou-se", uso: "Relação estatística sem implicar causalidade. Ex.: tabagismo associou-se a maior risco de IAM (OR 1,8; IC 95% 1,2–2,7)." },
  { verbo: "esteve relacionado", uso: "Equivalente didático de 'associou-se'." },
  { verbo: "foi mais frequente em", uso: "Comparação entre grupos sem inferir mecanismo." },
  { verbo: "pode contribuir para", uso: "Hipótese; não comprovado." },
  { verbo: "é compatível com", uso: "O achado não exclui a hipótese; não a confirma." },
];

export const VERBOS_PROIBIDOS = [
  { verbo: "comprova", motivo: "Quase nenhum estudo isolado comprova algo." },
  { verbo: "demonstra definitivamente", motivo: "Definitividade não existe na ciência empírica." },
  { verbo: "revoluciona", motivo: "Termo de marketing, não de ciência." },
  { verbo: "é a melhor conduta", motivo: "Afirmação clínica que exige diretriz, não estudo único." },
  { verbo: "prova que", motivo: "Ciência empírica não prova; refuta ou apoia." },
  { verbo: "esclarece de uma vez", motivo: "Encerramento prematuro." },
  { verbo: "erradica (em conclusão)", motivo: "Palavra que sai de redação política, não científica." },
];

export const PARES_REESCRITA = [
  { errado: "Este estudo prova que X causa Y.", melhor: "Este estudo observou associação entre X e Y; estudos longitudinais são necessários para investigar causalidade." },
  { errado: "Este relato de caso demonstra a melhor conduta.", melhor: "Este caso ilustra uma possibilidade diagnóstica/terapêutica, sem permitir generalização." },
  { errado: "Nossa revisão revoluciona o entendimento da doença.", melhor: "Nossa revisão sintetiza a evidência atual sobre a doença e identifica lacunas para futuras pesquisas." },
  { errado: "O tratamento X é definitivamente superior a Y.", melhor: "No presente ensaio, X foi associado a redução de 25% no desfecho primário em comparação a Y (HR 0,75; IC 95% 0,62–0,91)." },
  { errado: "Estes dados comprovam definitivamente a hipótese.", melhor: "Estes dados são compatíveis com a hipótese, mas confirmação requer estudos com maior poder estatístico." },
  { errado: "Como mostrado em vários estudos…", melhor: "Como mostrado em estudos prévios (Silva, 2020; Souza, 2022; Martins, 2024)…" },
];

// ────────────────────────────────────────────────────────────────────────
// 📄 DOCS / WORD
// ────────────────────────────────────────────────────────────────────────

export const WORD_DOCS_OPS = [
  {
    secao: "Configuração de página",
    fonte: "ABNT NBR 14724:2024, item 5.1",
    pontos: [
      "Papel A4.",
      "Margens (anverso): esquerda e superior 3 cm; direita e inferior 2 cm.",
      "Margens (verso, impressão frente-verso): direita e superior 3 cm; esquerda e inferior 2 cm.",
      "Orientação retrato como padrão; paisagem só para tabelas/figuras/mapas largos.",
    ],
  },
  {
    secao: "Texto",
    fonte: "NBR 14724:2024, itens 5.1 e 5.2",
    pontos: [
      "Fonte tamanho 12 para todo o texto, incluindo capa.",
      "Exceções (corpo menor e uniforme): citações diretas com mais de 3 linhas, notas de rodapé, paginação, ficha catalográfica, fontes e legendas de ilustrações/tabelas.",
      "Espaçamento entre linhas: 1,5.",
      "Exceções (espaço simples): citações diretas longas, notas de rodapé, referências, títulos e legendas, natureza do trabalho, fontes.",
      "Referências separadas entre si por um espaço simples em branco.",
    ],
  },
  {
    secao: "Estilos (Título 1, Título 2, Título 3)",
    fonte: "Prática + base para sumário automático",
    pontos: [
      "Aplique 'Título 1' às seções primárias (1, 2, 3…), 'Título 2' às secundárias, 'Título 3' às terciárias.",
      "Não formate títulos 'à mão' (negrito 14 selecionando): o sumário automático não reconhece.",
      "O estilo 'Título' (capa) é diferente de 'Título 1' — não confundir.",
    ],
  },
  {
    secao: "Numeração progressiva (NBR 6024)",
    fonte: "NBR 6024:2012",
    pontos: [
      "Algarismos arábicos, a partir de 1.",
      "Limite até seção quinária (1.1.1.1.1).",
      "Indicativo + espaço + título, sem ponto, hífen, travessão ou parênteses entre eles.",
      "Todas as seções devem ter texto.",
      "Errata, sumário, referências, glossário, apêndice, anexo, índice: centralizados e sem numeração.",
    ],
  },
  {
    secao: "Sumário automático (NBR 6027)",
    fonte: "NBR 6027:2012",
    pontos: [
      "Liste divisões, seções e partes na mesma ordem e grafia do texto.",
      "Palavra 'Sumário' centralizada, sem indicativo numérico.",
      "Funciona automaticamente se você usou os estilos Título 1/2/3.",
      "Sempre atualize o sumário antes de exportar o PDF.",
    ],
  },
  {
    secao: "Paginação",
    fonte: "NBR 14724:2024, item 5.3",
    pontos: [
      "Folhas pré-textuais: contadas, não numeradas. Verso da folha de rosto não é contado.",
      "Numeração visível: a partir da primeira folha da parte textual (Introdução).",
      "Algarismos arábicos, canto superior direito, 2 cm da borda superior e 2 cm da borda direita.",
      "Frente-verso: anverso canto superior direito; verso canto superior esquerdo.",
      "Apêndice e anexo seguem a numeração contínua do texto principal.",
    ],
  },
  {
    secao: "Quebras",
    fonte: "Prática (software)",
    pontos: [
      "Quebra de página (Ctrl+Enter): nova página, mesma seção.",
      "Quebra de seção: nova página E permite numeração/cabeçalho/orientação diferentes.",
      "Não use Enter repetido para empurrar conteúdo — qualquer alteração anterior desalinha tudo.",
    ],
  },
  {
    secao: "Cabeçalho e rodapé",
    fonte: "Prática + manual institucional",
    pontos: [
      "Cabeçalho geralmente vazio em TCC/dissertação ABNT.",
      "Rodapé: notas de rodapé (separadas por filete) ou número de página quando exigido lá.",
      "Verifique manual institucional.",
    ],
  },
  {
    secao: "Figuras",
    fonte: "Prática (ver aba 🖼️ Figuras para regras)",
    pontos: [
      "Inserir como 'Alinhada com o texto' (Word) ou 'Em linha' (Docs).",
      "Centralizar (Ctrl+E no Word; Ctrl+Shift+E no Docs).",
      "Palavra designativa + número + travessão + título acima.",
      "Fonte imediatamente abaixo.",
    ],
  },
  {
    secao: "Tabelas",
    fonte: "Prática (ver aba 📐 Tabelas para regras)",
    pontos: [
      "Inserir como tabela editável, não como imagem.",
      "No Word: clique na tabela → Layout → Propriedades → Linha → desmarcar 'Permitir quebra de linha entre páginas'.",
      "Título acima; fonte abaixo.",
      "Fonte da tabela pode ser tamanho menor (10 ou 11).",
    ],
  },
  {
    secao: "Marca d'água",
    fonte: "Prática + institucional",
    pontos: [
      "NÃO é exigência geral da ABNT. NBR 14724:2024 não trata de marca d'água.",
      "Algumas bibliotecas digitais inserem 'RASCUNHO' durante avaliação.",
      "Remova antes da entrega final se indevida.",
    ],
  },
  {
    secao: "Revisão (controle de alterações, comentários)",
    fonte: "Prática (software)",
    pontos: [
      "Controle de alterações: Word → Revisão → Controlar Alterações; Docs → Editar → Sugerindo.",
      "Antes da entrega: aceitar/rejeitar todas as alterações, remover todos os comentários, desligar o controle, atualizar sumário.",
    ],
  },
  {
    secao: "Exportação para PDF",
    fonte: "Prática",
    pontos: [
      "Word: Arquivo → Exportar → Criar PDF.",
      "Docs: Arquivo → Fazer download → PDF.",
      "Sempre abra o PDF gerado e role inteiro antes de submeter.",
    ],
  },
];

export const WORD_VS_DOCS = [
  { tarefa: "Tamanho do papel", word: "Layout → Tamanho → A4", docs: "Arquivo → Configurar página → Tamanho do papel → A4" },
  { tarefa: "Margens", word: "Layout → Margens → Personalizadas", docs: "Arquivo → Configurar página → Margens (em cm)" },
  { tarefa: "Fonte e tamanho", word: "Aba Página Inicial", docs: "Barra superior" },
  { tarefa: "Espaçamento", word: "Página Inicial → Espaçamento → 1,5", docs: "Formatar → Espaçamento entre linhas → 1,5" },
  { tarefa: "Recuo de 1ª linha", word: "Página Inicial → Parágrafo → Especial → Primeira linha", docs: "Régua superior, marcador azul" },
  { tarefa: "Justificar", word: "Ctrl + J", docs: "Ctrl + Shift + J" },
  { tarefa: "Quebra de seção", word: "Layout → Quebras → Próxima Página", docs: "Inserir → Quebra → Quebra de seção" },
  { tarefa: "Primeira página diferente", word: "Inserir → Cabeçalho → Editar cabeçalho → Primeira página diferente", docs: "Inserir → Cabeçalhos → Opções → Diferente na 1ª página" },
  { tarefa: "Iniciar numeração em pág. X", word: "Clique direito no número → Formatar → Iniciar em", docs: "Inserir → Números de página → Opções → Começar em" },
  { tarefa: "Inserir sumário automático", word: "Referências → Sumário → Sumário Automático", docs: "Inserir → Sumário → com números de página" },
  { tarefa: "Atualizar sumário", word: "Clique direito no sumário → Atualizar campo", docs: "Clique no sumário → ícone de atualizar" },
];

export const CHECKLIST_PDF_FINAL = [
  "Sumário atualizado e com páginas corretas?",
  "Paginação começa na Introdução?",
  "Capa SEM número de página?",
  "Figuras e tabelas com título e fonte juntos?",
  "Referências em ordem alfabética e separadas por linha em branco?",
  "Margens (3-2-3-2) visualmente corretas?",
  "Comentários removidos? Controle de alterações desligado?",
  "Marca d'água removida (se houver indevida)?",
];

// ────────────────────────────────────────────────────────────────────────
// 📊 EXCEL / SHEETS
// ────────────────────────────────────────────────────────────────────────

export const EXCEL_REGRAS_ORGANIZACAO = [
  "Uma linha = uma observação (1 paciente, 1 amostra, 1 município).",
  "Uma coluna = uma variável (idade, sexo, glicemia).",
  "Nomes de variáveis claros, sem acento/espaço/caracteres especiais (idade_anos, não 'Idade (anos)*').",
  "Não mescle células em dados brutos. Mescle apenas no produto final.",
  "Cada célula contém um único valor. '55/85 mmHg' → 2 colunas (PAS, PAD).",
  "Separe cálculo e apresentação — totais e médias em aba diferente.",
  "Mantenha dados brutos preservados. Transformações em colunas novas.",
  "Faltantes consistentes: célula vazia OU código único (NA). Nunca misture '?', '—', 'N/A', vazio.",
];

export const EXCEL_REGRAS_NUMEROS = [
  "Decimal: padrão brasileiro é vírgula (32,1).",
  "Mil: separador espaço ou ponto (1 234 ou 1.234). Mantenha consistente.",
  "Porcentagens: aplique formato % do software; reporte 32,1%, não 32,10000%.",
  "Datas: dd/mm/aaaa no padrão brasileiro.",
  "Casas decimais — diretriz: idade, batimentos, peso → inteiros; HbA1c, IMC, hemoglobina → 1 casa; OR/RR/HR → 2 casas; p → 2-3 casas, p < 0,001 como limite mínimo.",
  "Unidades sempre claras no cabeçalho da coluna: 'glicemia (mg/dL)'.",
];

export const EXCEL_ESTATISTICA = [
  { tipo: "Contagem com proporção", formato: "n (%) → 45/140 (32,1%)" },
  { tipo: "Variável contínua normal", formato: "média (DP) → 24,5 (3,2). Evite ±" },
  { tipo: "Variável contínua não-normal", formato: "mediana (IIQ) → 18 (12–25)" },
  { tipo: "IC 95%", formato: "1,23–2,45 ou 1,23 a 2,45" },
  { tipo: "Razão de chances/risco", formato: "OR = 1,85; IC 95% 1,20–2,90" },
];


// Aliases compatíveis com abnt-lab-tabs.jsx
// Mantêm a estrutura esperada pela aba Excel/Sheets: cada regra é um card
// com título e lista de pontos.
export const EXCEL_REGRAS = [
  { secao: "Organização dos dados", fonte: "Prática de gestão de dados", pontos: EXCEL_REGRAS_ORGANIZACAO },
  { secao: "Formatação de números", fonte: "Prática / relato estatístico", pontos: EXCEL_REGRAS_NUMEROS },
  { secao: "Relato estatístico", fonte: "SAMPL / boas práticas biomédicas", pontos: EXCEL_ESTATISTICA.map((x) => `${x.tipo}: ${x.formato}`) },
];
export const EXCEL_REGRAS_GERAIS = EXCEL_REGRAS;
export const EXCEL_BOAS_PRATICAS = EXCEL_REGRAS;
export const EXCEL_ORGANIZACAO = EXCEL_REGRAS;
export const REGRAS_EXCEL = EXCEL_REGRAS;

export const MODELOS_TABELAS_CLINICAS = [
  { titulo: "Características da amostra (Tabela 1)", colunas: "idade, sexo, IMC, comorbidades × total / grupo A / grupo B / p" },
  { titulo: "Dados laboratoriais", colunas: "exames × momentos (admissão / 24h / alta)" },
  { titulo: "Desfechos primários e secundários", colunas: "desfecho, n por grupo, OR/RR, IC, p" },
  { titulo: "Comparação entre grupos", colunas: "variável, grupo intervenção, controle, diferença média, IC, p" },
  { titulo: "Medicamentos", colunas: "droga, dose, via, frequência, duração" },
  { titulo: "Eventos adversos", colunas: "evento, grupo A n (%), grupo B n (%), p" },
  { titulo: "Regressão uni/multivariada", colunas: "variável, OR bruta (IC), p, OR ajustada (IC), p" },
  { titulo: "Estudos incluídos em revisão sistemática", colunas: "autor (ano), país, n, desenho, intervenção, desfecho, qualidade" },
];

export const CHECKLIST_TABELA_FINAL = [
  "Tem número sequencial (Tabela 1, Tabela 2…)?",
  "Tem título descritivo acima?",
  "Tem fonte abaixo?",
  "Unidades aparecem nos cabeçalhos?",
  "Denominadores claros para os percentuais (n/N (%))?",
  "Casas decimais consistentes na mesma variável?",
  "Notas explicam abreviações e símbolos?",
  "Citada no texto antes de aparecer?",
  "Inserida o mais próximo possível do trecho que a menciona?",
];

// ────────────────────────────────────────────────────────────────────────
// 🖼️ FIGURAS
// ────────────────────────────────────────────────────────────────────────

export const TIPOS_ILUSTRACAO = [
  { termo: "Figura", quando: "Termo genérico — quando nenhum específico se encaixa." },
  { termo: "Fotografia", quando: "Imagem capturada por câmera (paciente, lesão, peça anatômica)." },
  { termo: "Gráfico", quando: "Representação visual de dados numéricos (barras, linha, dispersão, pizza, boxplot)." },
  { termo: "Quadro", quando: "Conteúdo textual estruturado em linhas/colunas." },
  { termo: "Fluxograma", quando: "Diagrama de etapas/decisões com setas (ex.: fluxograma PRISMA)." },
  { termo: "Mapa", quando: "Representação geográfica." },
  { termo: "Esquema", quando: "Diagrama explicativo simplificado." },
  { termo: "Imagem", quando: "Termo genérico, usado também para imagens médicas (RM, TC, ECO)." },
  { termo: "Desenho / Organograma / Planta / Retrato", quando: "Termos específicos previstos pela NBR 14724:2024, item 5.8." },
];

export const MODELOS_FONTE_FIGURA = [
  { tipo: "propria-1", saida: "Fonte: elaborado pelo autor (ANO).", contexto: "Produção própria, um autor." },
  { tipo: "propria-varios", saida: "Fonte: elaborado pelos autores (ANO).", contexto: "Produção própria, vários autores." },
  { tipo: "com-base", saida: "Fonte: elaborado pelo autor com base em SOBRENOME (ANO_BASE).", contexto: "Produção própria inspirada em obra específica." },
  { tipo: "adaptado", saida: "Fonte: adaptado de SOBRENOME (ANO_BASE).", contexto: "Você modificou a figura original de outro autor." },
  { tipo: "reproduzido", saida: "Fonte: SOBRENOME (ANO_BASE).", contexto: "Reprodução fiel — atenção a direitos autorais." },
  { tipo: "com-dados-fonte", saida: "Fonte: elaborado pelo autor com dados de SOBRENOME (ANO_BASE).", contexto: "Você fez o gráfico, dados são de outra fonte." },
  { tipo: "com-dados-pesquisa", saida: "Fonte: elaborado pelo autor com dados da pesquisa (ANO).", contexto: "Você fez o gráfico com dados que coletou." },
];

// ────────────────────────────────────────────────────────────────────────
// 📐 TABELAS E QUADROS (IBGE 1993)
// ────────────────────────────────────────────────────────────────────────

export const IBGE_SINAIS = [
  { sinal: "–", significa: "Dado igual a zero, NÃO resultante de arredondamento." },
  { sinal: "..", significa: "Não se aplica dado numérico." },
  { sinal: "...", significa: "Dado numérico não disponível." },
  { sinal: "x", significa: "Dado numérico omitido para evitar identificação." },
  { sinal: "0; 0,0; 0,00", significa: "Zero resultante de arredondamento de número originalmente positivo." },
  { sinal: "-0; -0,0; -0,00", significa: "Zero resultante de arredondamento de número originalmente negativo." },
];

export const TABELA_VS_QUADRO = [
  { criterio: "Conteúdo", tabela: "Dado numérico/estatístico", quadro: "Texto/categórico/comparativo", grafico: "Dado numérico em forma visual", figura: "Imagem, foto, ilustração" },
  { criterio: "Norma de apresentação", tabela: "IBGE 1993 (NBR 14724:2024 item 5.9 remete ao IBGE)", quadro: "NBR 14724:2024 item 5.8 (ilustração)", grafico: "NBR 14724:2024 item 5.8", figura: "NBR 14724:2024 item 5.8" },
  { criterio: "Bordas laterais", tabela: "SEM bordas verticais à esquerda e à direita (IBGE 4.3.3)", quadro: "Bordas em todos os lados", grafico: "N/A", figura: "N/A" },
  { criterio: "Posição do título", tabela: "Acima", quadro: "Acima", grafico: "Acima", figura: "Acima" },
  { criterio: "Posição da fonte", tabela: "Abaixo (rodapé)", quadro: "Abaixo", grafico: "Abaixo", figura: "Abaixo" },
  { criterio: "Numeração", tabela: "Tabela 1, Tabela 2…", quadro: "Quadro 1, Quadro 2…", grafico: "Gráfico 1, Gráfico 2…", figura: "Figura 1, Figura 2…" },
];

export const CHECKLIST_FIGURA_TABELA = [
  "Tem número sequencial?",
  "Tem palavra designativa correta (Tabela / Quadro / Gráfico / Figura)?",
  "Tem título descritivo acima?",
  "Tem fonte abaixo?",
  "Está citada no texto antes de aparecer?",
  "Está inserida o mais próximo possível da menção?",
  "Para tabela: sem bordas verticais laterais (regra IBGE)?",
  "Dados padronizados (casas decimais, unidades, denominadores)?",
  "Notas explicam abreviações e símbolos não óbvios?",
  "Largura respeitada (não ultrapassa margens)?",
];

// ────────────────────────────────────────────────────────────────────────
// 👁️ ERROS VISUAIS COMUNS
// ────────────────────────────────────────────────────────────────────────

export const ERROS_VISUAIS_20 = [
  { erro: "Enter repetido", problema: "Qualquer adição anterior desalinha tudo o que vem depois.", corrigir: "Use quebra de página (Ctrl+Enter) ou espaçamento antes/depois do parágrafo." },
  { erro: "Sumário manual", problema: "Página adicionada/removida na revisão e o sumário fica errado.", corrigir: "Use estilos Título 1/2/3 e sumário automático." },
  { erro: "Títulos sem estilo", problema: "Negrito 14 'à mão' não vira título; sumário ignora.", corrigir: "Aplique Título 1/2/3 do menu de estilos." },
  { erro: "Fontes misturadas", problema: "Trechos colados vêm em Calibri, Times, Arial misturados.", corrigir: "Selecione tudo (Ctrl+A) e aplique uma fonte única." },
  { erro: "Tamanhos inconsistentes", problema: "Mesmo nível hierárquico com tamanhos diferentes.", corrigir: "Confira os estilos; aplique 'Limpar formatação' em trechos colados." },
  { erro: "Imagem sem fonte", problema: "Viola NBR 14724 — toda ilustração precisa de fonte.", corrigir: "Adicione 'Fonte: elaborado pelo autor (ANO)' abaixo." },
  { erro: "Tabela sem título", problema: "NBR 14724 + IBGE exigem 'Tabela N – título' acima.", corrigir: "Adicione título acima da tabela." },
  { erro: "Tabela como print ilegível", problema: "Print quebra ao redimensionar e perde qualidade no PDF.", corrigir: "Refaça a tabela no Word/Docs como tabela real (editável)." },
  { erro: "Figura longe do texto", problema: "NBR 14724 5.8: ilustração próxima ao trecho que a menciona.", corrigir: "Mova a figura para junto da menção." },
  { erro: "Links azuis sem padrão", problema: "Alguns hiperligados, outros não; mistura visual.", corrigir: "Padronize: ou todos hiperligados, ou todos texto preto." },
  { erro: "Páginas sem numeração", problema: "Avaliador não consegue se referir a trechos.", corrigir: "Insira numeração começando na Introdução (canto superior direito)." },
  { erro: "PDF sem revisão", problema: "Erros que existem só no PDF (acentuação, fontes não embarcadas).", corrigir: "Abra o PDF, role inteiro, confira figuras, tabelas, sumário, paginação." },
  { erro: "Marca d'água esquecida", problema: "'RASCUNHO' no documento final é amador.", corrigir: "Word: Design → Marca d'água → Remover." },
  { erro: "Comentários visíveis", problema: "Comentários de orientador aparecem no PDF se não removidos.", corrigir: "Revisão → Excluir todos os comentários antes de exportar." },
  { erro: "Controle de alterações ativo", problema: "Marcações vermelhas no PDF final.", corrigir: "Revisão → Aceitar todas → Desativar Controle de Alterações." },
  { erro: "Arquivo com nome ruim", problema: "'Documento1 (versão final final 3).docx' parece desorganização.", corrigir: "Renomeie conforme edital ou padrão 'Sobrenome_Titulo_2026.pdf'." },
  { erro: "Tabela quebrada entre páginas", problema: "Cabeçalho fica em uma página, dados em outra.", corrigir: "Word: Layout → Propriedades → Linha → Desmarcar quebra, ou marcar cabeçalho para repetir." },
  { erro: "Imagem distorcida", problema: "Largura/altura mexidas separadamente esticam a imagem.", corrigir: "Sempre redimensione pelos cantos (mantém proporção)." },
  { erro: "Citação sem referência", problema: "Citou autor no texto e não há entrada na bibliografia.", corrigir: "Confira aba ⚠️ Erros Compilados; use o Validador." },
  { erro: "Referência sem citação", problema: "Bibliografia tem fontes que não aparecem no texto.", corrigir: "Remova ou cite no texto." },
];

// ────────────────────────────────────────────────────────────────────────
// 🚀 SUBMISSÃO / PRÉ-ENVIO
// ────────────────────────────────────────────────────────────────────────

export const CHECKLIST_SUBMISSAO_BLOCOS = [
  {
    bloco: "A. Antes de tocar no texto",
    itens: [
      "Edital / instruções aos autores lidos do início ao fim?",
      "Template baixado e usado, se obrigatório?",
      "Limite de palavras conferido (corpo, resumo, abstract)?",
      "Número máximo de autores conferido?",
      "Número máximo de figuras/tabelas conferido?",
    ],
  },
  {
    bloco: "B. Autoria, ética e financiamento",
    itens: [
      "Ordem dos autores revisada com todos os coautores?",
      "Afiliações corretas (instituição, departamento, cidade, país)?",
      "Autor correspondente definido com e-mail institucional?",
      "Conflito de interesse informado (se solicitado)?",
      "Financiamento informado (CAPES, CNPq, FAPESP, número do processo)?",
      "Aprovação ética/CEP informada com número do parecer (se aplicável)?",
    ],
  },
  {
    bloco: "C. Conteúdo e formato",
    itens: [
      "Figuras/tabelas dentro do limite do edital?",
      "Referências no estilo exigido (Vancouver, ABNT, APA, conforme periódico)?",
      "Links no texto testados (DOI, URLs, Acesso em)?",
      "Anonimização feita, se a revisão é cega?",
      "Metadados do arquivo revisados (autor do Word, propriedades do PDF)?",
    ],
  },
  {
    bloco: "D. Arquivo final",
    itens: [
      "Arquivo em formato solicitado (.docx, .pdf, .tex, com fontes embarcadas)?",
      "Nome do arquivo conforme edital (ex.: Sobrenome_Titulo.pdf)?",
      "PDF aberto e lido página por página (sumário, figuras, tabelas, referências, paginação)?",
      "Comprovante de submissão + e-mail de confirmação salvos em pasta com data?",
    ],
  },
];

export const ALERTAS_SUBMISSAO = [
  "Nunca confiar só na visualização do editor — Word/Docs renderizam diferente do PDF.",
  "Remover todos os comentários antes de exportar.",
  "Desligar controle de alterações e aceitar/rejeitar todas as marcas.",
  "Remover marca d'água indevida (ex.: 'RASCUNHO', 'BORRADOR').",
  "Template prevalece sobre preferência pessoal e até sobre ABNT genérica.",
  "Salvar versão final com nome reconhecível e não trabalhar mais nela após submeter.",
];

export const ANATOMIA_SUBMISSAO = [
  { etapa: "Tipo de manuscrito", desc: "Original, revisão, relato de caso, carta." },
  { etapa: "Título e resumo", desc: "Idênticos ao manuscrito." },
  { etapa: "Palavras-chave", desc: "DeCS/MeSH preferencialmente." },
  { etapa: "Autores", desc: "Nome, afiliação, ORCID, conflito." },
  { etapa: "Arquivos", desc: "Manuscrito (anônimo), página de título, figuras separadas, tabelas separadas, suplementares." },
  { etapa: "Carta de apresentação", desc: "Resumo do estudo + originalidade + relevância para a revista." },
  { etapa: "Declarações", desc: "Conflito, ética, financiamento, originalidade." },
  { etapa: "Sugestão de revisores", desc: "Quando solicitada — não indicar coautores ou orientadores." },
  { etapa: "Confirmação", desc: "Salvar comprovante (PDF da tela 'obrigado pela submissão')." },
];

// ────────────────────────────────────────────────────────────────────────
// 🧬 LIGA ACADÊMICA / PROJETOS DE EXTENSÃO
// ────────────────────────────────────────────────────────────────────────

export const ATIVIDADES_LIGA = [
  { tipo: "Projeto de extensão", eixo: "Extensão", produto: "Documento no SIGAA + relatório anual" },
  { tipo: "Ação de educação em saúde", eixo: "Extensão", produto: "Material educativo + relatório" },
  { tipo: "Evento científico", eixo: "Ensino/Extensão", produto: "Programação + anais" },
  { tipo: "Jornada ou simpósio", eixo: "Ensino/Extensão", produto: "Programação + caderno de resumos" },
  { tipo: "Curso introdutório", eixo: "Ensino", produto: "Material didático + lista de presença + certificados" },
  { tipo: "Oficina", eixo: "Ensino/Extensão", produto: "Roteiro + material + relatório" },
  { tipo: "Campanha de saúde", eixo: "Extensão", produto: "Material gráfico + relatório de alcance" },
  { tipo: "E-book ou livreto", eixo: "Pesquisa/Extensão", produto: "PDF com ISBN (quando aplicável)" },
  { tipo: "Manual/protocolo interno", eixo: "Ensino interno", produto: "PDF de uso da liga" },
  { tipo: "Relatório de extensão", eixo: "Extensão", produto: "Relatório anual no SIGAA" },
  { tipo: "Submissão de resumo", eixo: "Pesquisa", produto: "Resumo enviado a evento" },
  { tipo: "Pôster", eixo: "Pesquisa", produto: "PDF/impressão para evento" },
  { tipo: "Apresentação oral", eixo: "Pesquisa/Ensino", produto: "Slides + roteiro" },
  { tipo: "Projeto de pesquisa associado", eixo: "Pesquisa", produto: "Documento + parecer CEP" },
  { tipo: "Material educativo para comunidade", eixo: "Extensão", produto: "Cartilha, vídeo, podcast, jogo" },
];

export const ODS_LIST = [
  "01 — Erradicação da pobreza",
  "02 — Fome zero e agricultura sustentável",
  "03 — Saúde e bem-estar",
  "04 — Educação de qualidade",
  "05 — Igualdade de gênero",
  "06 — Água limpa e saneamento",
  "07 — Energia limpa e acessível",
  "08 — Trabalho decente e crescimento econômico",
  "09 — Indústria, inovação e infraestrutura",
  "10 — Redução das desigualdades",
  "11 — Cidades e comunidades sustentáveis",
  "12 — Consumo e produção responsáveis",
  "13 — Ação contra a mudança global do clima",
  "14 — Vida na água",
  "15 — Vida terrestre",
  "16 — Paz, justiça e instituições eficazes",
  "17 — Parcerias e meios de implementação",
];

export const AREAS_TEMATICAS_UFPE = [
  "Comunicação", "Cultura", "Direitos Humanos e Justiça", "Educação", "Esporte",
  "Meio Ambiente", "Saúde", "Tecnologia e Produção", "Trabalho",
];

export const AREAS_CNPQ = [
  "Ciências Agrárias", "Ciências Biológicas", "Ciências Exatas e da Terra",
  "Ciências Humanas", "Ciências Sociais Aplicadas", "Ciências da Saúde",
  "Engenharias", "Linguística, Letras e Artes", "Outra",
];

export const DIRETRIZES_EXTENSAO = [
  { nome: "Interação dialógica", pergunta: "Como será o diálogo e a troca de saberes entre a comunidade UFPE e a comunidade externa? Como a equipe acolhe pessoas inseridas nas comunidades e seus saberes?" },
  { nome: "Impacto e transformação social", pergunta: "Quais problemas da sociedade demandam a realização da ação? Como a ação contribuirá para solucioná-los? Como será a inter-relação universidade-sociedade?" },
  { nome: "Impacto na formação do estudante", pergunta: "Quais impactos técnico-científicos, pessoais e sociais a ação terá na formação dos discentes? Quais estratégias para o protagonismo estudantil?" },
  { nome: "Indissociabilidade ensino-pesquisa-extensão", pergunta: "Como a ação se vincula ao ensino e à pesquisa? Como vira 'sala de aula' em todos os espaços?" },
  { nome: "Interdisciplinaridade e interprofissionalidade", pergunta: "Como a ação articula diferentes temáticas/áreas/profissões? Como constrói alianças interprofissionais?" },
];

export const STEPS_SIGAA = [
  {
    num: 1,
    titulo: "Identificação — Dados gerais",
    pontos: [
      "Título objetivo e conciso. Em projetos renováveis: 'Projeto XXX — Ano 2026/2027'.",
      "Ano de início e período de realização. Não pode ser retroativo.",
      "Prazo mínimo de 30 dias entre registro e início.",
      "Projetos anuais devem ser finalizados em dezembro/janeiro.",
      "Vínculo: Liga Acadêmica, Componente Curricular de Perfil Extensionista, Empresa Júnior, Coletivo Estudantil, Grupos de pesquisa/extensão, DCE/DA, PIBIC, PIBID, PET, Programa Institucional.",
    ],
  },
  {
    num: 2,
    titulo: "Identificação — Área e abrangência",
    pontos: [
      "Área CNPq (Ciências da Saúde costuma ser a principal em ligas médicas).",
      "Abrangência: Local / Regional / Nacional / Internacional.",
      "Área Temática de Extensão (registrar apenas a principal): Comunicação, Cultura, Direitos Humanos e Justiça, Educação, Esporte, Meio Ambiente, Saúde, Tecnologia e Produção, Trabalho.",
    ],
  },
  {
    num: 3,
    titulo: "ODS",
    pontos: [
      "Marque apenas ODS que a metodologia e os resultados esperados realmente sustentam.",
      "Em ligas de saúde costumam fazer sentido: ODS 3 (Saúde), ODS 4 (Educação), ODS 10 (Redução das desigualdades).",
    ],
  },
  {
    num: 4,
    titulo: "Público-alvo (1.3)",
    pontos: [
      "Público interno (UFPE): docentes, técnicos, discentes de cursos específicos. Quantificar.",
      "Público externo (fora da UFPE): grupos da comunidade. Quantificar.",
      "Público-alvo NÃO é a equipe executora.",
      "Exemplo ruim: 'Acadêmicos da liga.' Melhor: 'Estudantes de graduação da UFPE (público interno, ~30) e moradores adultos da comunidade X em Caruaru-PE (público externo, ~150).'",
    ],
  },
  {
    num: 5,
    titulo: "Local de realização (1.4)",
    pontos: [
      "Estado, município, bairro (opcional), espaço de realização, responsável (nome), e-mail.",
      "Mais de um local: usar 'adicionar local de realização'.",
      "Ação remota: escrever a plataforma (YouTube, podcast, rádio, Plataforma Digital, Google Meet).",
      "Hospital das Clínicas (HC) como campo de prática: anexar anuência da Gerência de Ensino e Pesquisa.",
    ],
  },
  {
    num: 6,
    titulo: "Financiamento (1.5)",
    pontos: [
      "Sem financiamento: marcar 'Registro de Fluxo Contínuo Sem Financiamento'.",
      "Financiado pela UFPE: edital com recursos UFPE. Indicar fonte (unidade proponente ou PROEXC).",
      "Externo: 'Registro de Fluxo Contínuo com Financiamento Externo'. Indicar fonte, edital, bolsas.",
    ],
  },
  {
    num: 7,
    titulo: "Parcerias (1.6)",
    pontos: [
      "Unidade proponente: preenchimento automático.",
      "Parceria externa: opcional. Se houver mais de uma, registrar a principal.",
      "Parceria interna: outro setor da UFPE.",
      "Documento de anuência costuma ser exigido — anexar no item 7.",
    ],
  },
  {
    num: 8,
    titulo: "Resumo (2.1)",
    pontos: [
      "Entre 15 e 25 linhas, em texto corrido.",
      "Inclua: apresentação, vínculo, contextualização, justificativa, objetivo geral, metodologia resumida, período, equipe, parcerias, público-alvo, resultados esperados.",
      "Palavras-chave: 3 a 5.",
    ],
  },
  {
    num: 9,
    titulo: "Justificativa (2.2)",
    pontos: [
      "Entre 1 e 3 páginas, ou máximo 15.000 caracteres.",
      "Articule as 5 diretrizes da extensão: interação dialógica, impacto e transformação social, impacto na formação, indissociabilidade ensino-pesquisa-extensão, interdisciplinaridade.",
      "Não é só 'o tema é importante'. É 'por que esta ação, com este público, neste contexto, deve existir'.",
    ],
  },
  {
    num: 10,
    titulo: "Objetivos (2.3)",
    pontos: [
      "Geral: uma ideia, verbo no infinitivo, totalidade do que se pretende.",
      "Específicos: entre 2 e 5. Detalham o geral. Não são metas, não são atividades.",
      "Verbos: promover, desenvolver, implementar, avaliar, capacitar, sensibilizar, orientar, investigar, descrever, fortalecer, estimular.",
      "❌ 'Realizar palestras e criar posts.' (atividade)",
      "✅ 'Promover educação em saúde cardiovascular para adultos em UBS.'",
    ],
  },
  {
    num: 11,
    titulo: "Metodologia (2.4)",
    pontos: [
      "Entre 1 e 3 páginas.",
      "3 etapas obrigatórias: Planejamento → Execução → Avaliação.",
      "Inclua: local, público, parcerias e função, etapas, recursos humanos e materiais, atividades, instrumentos, viabilidade.",
      "Avaliação com instrumentos ACEx: relatórios + formulários para equipe, participantes e público-alvo.",
    ],
  },
  {
    num: 12,
    titulo: "Resultados esperados (2.5)",
    pontos: [
      "Resultados ≠ atividades.",
      "Atividades = o que será feito. Resultados = o que se espera produzir/transformar.",
      "Produtos possíveis: publicação acadêmica, material midiático, jogo educativo, oficina, produto audiovisual, podcast, software, cartilha, curso, evento, artigo, e-book, protocolo, manual.",
    ],
  },
  {
    num: 13,
    titulo: "Referências (2.6)",
    pontos: [
      "Não obrigatório no SIGAA, mas fortemente recomendado.",
      "Use NBR 6023:2018.",
      "Proposta fundamentada com artigos, diretrizes, políticas e documentos institucionais tende a ser melhor avaliada.",
    ],
  },
  {
    num: 14,
    titulo: "Equipe (3)",
    pontos: [
      "Docente UFPE — função (sugerida: 'membro da equipe executora'). Permitir gerenciar participantes: sugerido 'não'.",
      "Técnico-administrativo UFPE.",
      "Discente UFPE: AÇÕES DE EXTENSÃO EXIGEM DISCENTES DE GRADUAÇÃO.",
      "Membro externo: CPF obrigatório (sistema extrai o nome), função, formação, instituição.",
      "Coordenador adjunto: opcional.",
    ],
  },
  {
    num: 15,
    titulo: "Atividades e carga horária (4)",
    pontos: [
      "Descrição da ação: repetir o nome da proposta.",
      "CH Total: horas semanais × número de semanas (ex.: 2 h × 24 semanas = 48 h).",
      "Período: repetir data de início e fim.",
      "Membros: selecionar todos de uma vez.",
      "Carga horária inflada sem relação real fragiliza a proposta.",
    ],
  },
  {
    num: 16,
    titulo: "Orçamento detalhado (5)",
    pontos: [
      "Apenas para ações com recursos financeiros.",
      "Elementos de despesa: Material de consumo, Pessoa Física, Pessoa Jurídica, Equipamento.",
      "Para cada item: discriminação, quantidade, valor unitário em R$.",
      "Clicar em 'adicionar despesa' para cada item.",
    ],
  },
  {
    num: 17,
    titulo: "Orçamento consolidado / Fontes (6)",
    pontos: [
      "Fontes: Interno UFPE; Arrecadação (GRU); Externo (Outros — via contratos/convênios/TED).",
      "Total das fontes DEVE ser compatível com o orçamento detalhado.",
      "Se item 5 prevê R$ 10.000 em material de consumo, fontes devem somar exatos R$ 10.000 para esse elemento.",
    ],
  },
  {
    num: 18,
    titulo: "Anexos (7)",
    pontos: [
      "Documento de parceria (anuência), autorização de uso de espaço, cronograma, material complementar, termo de autorização, documento do campo de prática (especialmente HC), parecer ético.",
      "Faltar anexo é um dos motivos mais comuns de devolução.",
    ],
  },
];

export const ERROS_PROJETO_LIGA = [
  { erro: "Título vago", problema: "'Projeto Saúde' não diz nada.", corrigir: "Descreva ação + público + foco: 'Educação cardiovascular para adultos em UBS rural — Liga de Cardiologia 2026'." },
  { erro: "Público-alvo confundido com equipe", problema: "'Acadêmicos da liga' não é público-alvo, é a equipe.", corrigir: "Identifique quem recebe a ação." },
  { erro: "Objetivo escrito como atividade", problema: "'Fazer 10 oficinas' é tarefa, não objetivo.", corrigir: "'Promover educação em saúde…'" },
  { erro: "Justificativa genérica", problema: "'O tema é importante' não justifica.", corrigir: "Por que esta ação, com este público, neste contexto." },
  { erro: "Metodologia sem etapas", problema: "Lista de atividades soltas sem sequência.", corrigir: "Use planejamento → execução → avaliação." },
  { erro: "Resultados esperados = atividades", problema: "'Realizar 5 oficinas' não é resultado.", corrigir: "'Aumentar conhecimento sobre X em 80% do público-alvo.'" },
  { erro: "ODS marcados sem relação real", problema: "Marcar 12 ODS quando só 2 fazem sentido.", corrigir: "Marque só os que a metodologia realmente sustenta." },
  { erro: "Ausência de avaliação", problema: "Sem indicador, ninguém sabe se a ação funcionou.", corrigir: "Defina instrumentos e indicadores (questionário pré/pós, formulário ACEx)." },
  { erro: "Parceria citada sem função", problema: "'Em parceria com a UBS X' sem dizer o que a UBS faz.", corrigir: "Defina a função: cede espaço? Recruta público? Coordena junto?" },
  { erro: "Carga horária incoerente", problema: "200 h declaradas para uma oficina única.", corrigir: "Calcule realisticamente: h/semana × semanas." },
  { erro: "Orçamento incompatível", problema: "Itens 5 e 6 não batem.", corrigir: "Total das fontes = total das despesas, por categoria." },
  { erro: "Referências ausentes ou fracas", problema: "Site de senso comum como única fonte.", corrigir: "Use artigos, diretrizes, políticas, documentos institucionais." },
  { erro: "Falta de protagonismo discente", problema: "Discentes apenas como ouvintes.", corrigir: "Discentes planejam, executam, avaliam." },
  { erro: "Extensão confundida com palestra isolada", problema: "Uma palestra de 1 h não é extensão.", corrigir: "Extensão é processual e contínua, exige interação dialógica e impacto." },
  { erro: "Comunidade como receptora passiva", problema: "'Levaremos conhecimento à comunidade'.", corrigir: "'Trocaremos saberes com a comunidade'. A diretriz é diálogo, não doação." },
];

// ────────────────────────────────────────────────────────────────────────
// ✅ CHECKLIST FINAL POR TIPO DE ENTREGA (17 tipos)
// ────────────────────────────────────────────────────────────────────────

// Blocos genéricos que aparecem em quase todos os tipos.
// Cada checklist específico mantém a estrutura de 9 blocos (documento,
// conteúdo, método, formatação, figuras/tabelas, citações, referências,
// arquivo final, submissão) com itens adaptados ao tipo.

const _BLOCO_FORMATACAO_PADRAO = [
  "Margens 3-2-3-2 cm?",
  "Fonte 12, espaço 1,5?",
  "Paginação iniciando na Introdução, canto superior direito?",
  "Numeração progressiva (NBR 6024) sem ponto após o número?",
];

const _BLOCO_FIGURAS_PADRAO = [
  "Título acima (Tabela/Figura/Quadro/Gráfico N – título)?",
  "Fonte abaixo?",
  "Tabelas seguem IBGE (sem bordas verticais laterais)?",
  "Citadas no texto antes de aparecer?",
];

const _BLOCO_CITACOES_PADRAO = [
  "Todas com referência correspondente?",
  "Sistema autor-data OU numérico (não misturar)?",
];

const _BLOCO_REFERENCIAS_PADRAO = [
  "Em ordem alfabética?",
  "Conforme NBR 6023:2018?",
  "Validador rodado para confirmar?",
];

const _BLOCO_ARQUIVO_PADRAO = [
  "PDF aberto e revisado página por página?",
  "Sumário atualizado?",
  "Comentários removidos?",
  "Controle de alterações desligado?",
  "Marca d'água indevida removida?",
];

const _BLOCO_SUBMISSAO_PADRAO = [
  "Versão final enviada conforme exigência do edital?",
  "Comprovante de submissão salvo?",
];

export const TIPOS_ENTREGA_17 = [
  {
    id: "trabalho_disciplina",
    nome: "Trabalho de disciplina",
    blocos: {
      documento: ["Capa conforme manual da disciplina (se exigida)?", "Folha de rosto?"],
      conteudo: ["Introdução com objetivo claro?", "Desenvolvimento?", "Conclusão?", "Referências?"],
      metodo: ["Aderência ao enunciado da disciplina?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: _BLOCO_FIGURAS_PADRAO,
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Entregue pelo canal da disciplina (Classroom, Moodle, e-mail)?"],
    },
  },
  {
    id: "tcc_dissertacao",
    nome: "TCC / Dissertação / Tese",
    blocos: {
      documento: [
        "Capa (NBR 14724 item 4.1.1)?",
        "Folha de rosto (item 4.2.1.1)?",
        "Folha de aprovação (após defesa)?",
        "Resumo na língua vernácula + em língua estrangeira (obrigatórios)?",
        "Sumário (obrigatório, NBR 6027)?",
      ],
      conteudo: [
        "Introdução com objetivo claro?",
        "Referencial teórico?",
        "Método (com aprovação CEP se aplicável)?",
        "Resultados?",
        "Discussão?",
        "Conclusão?",
        "Referências (obrigatórias)?",
      ],
      metodo: ["Diretriz de relato correspondente seguida (CARE/PRISMA/STROBE/CONSORT)?"],
      formatacao: [
        ..._BLOCO_FORMATACAO_PADRAO,
        "Notas, citações longas, fonte de ilustrações em corpo menor e espaço simples?",
        "Pré-textuais contadas mas não numeradas?",
      ],
      figuras: _BLOCO_FIGURAS_PADRAO,
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: [
        "Versão do orientador aprovada?",
        "Versão da banca aprovada?",
        "Versão final pós-correções submetida ao repositório institucional?",
        "Comprovante salvo?",
      ],
    },
  },
  {
    id: "projeto_pesquisa",
    nome: "Projeto de pesquisa",
    blocos: {
      documento: ["Capa institucional?", "Folha de rosto?"],
      conteudo: ["Introdução/justificativa?", "Objetivos (geral + específicos)?", "Hipóteses?", "Métodos detalhados?", "Cronograma?", "Orçamento?", "Referências?"],
      metodo: ["Desenho declarado coerente com a pergunta?", "Cálculo amostral (se aplicável)?", "Análise estatística pré-especificada?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: _BLOCO_FIGURAS_PADRAO,
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Submetido a CEP/CONEP (se envolver humanos)?", "Comprovante salvo?"],
    },
  },
  {
    id: "resumo_simples",
    nome: "Resumo simples",
    blocos: {
      documento: ["Limite de palavras (geralmente 250-500) conferido?", "Formato exigido pelo edital?"],
      conteudo: ["Introdução curta?", "Método (desenho, local, período, n)?", "Resultados com números?", "Conclusão?", "Palavras-chave (3-5, DeCS)?"],
      metodo: ["Desenho coerente com o que foi feito?", "Aprovação ética citada (se aplicável)?"],
      formatacao: ["Texto corrido em parágrafo único ou estruturado conforme edital?"],
      figuras: ["Geralmente N/A em resumo simples."],
      citacoes: ["Geralmente sem citações; conferir edital."],
      referencias: ["Geralmente ausentes; conferir edital."],
      arquivo: ["PDF revisado, sem comentários?"],
      submissao: ["Submetido na plataforma do evento?", "Comprovante salvo?"],
    },
  },
  {
    id: "resumo_expandido",
    nome: "Resumo expandido",
    blocos: {
      documento: ["Limite de palavras conferido (geralmente 1.500-3.000)?", "Template do evento usado?"],
      conteudo: ["Introdução?", "Método?", "Resultados?", "Discussão?", "Conclusão?", "Referências (geralmente 5-10)?"],
      metodo: ["Diretriz de relato aplicável seguida?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: ["Limite de figuras/tabelas conferido?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Submetido no formato exigido?", "Comprovante salvo?"],
    },
  },
  {
    id: "artigo",
    nome: "Artigo científico",
    blocos: {
      documento: ["Página de título separada do manuscrito (revisão cega)?", "Manuscrito anonimizado?"],
      conteudo: ["Resumo (estruturado conforme periódico)?", "Introdução?", "Método?", "Resultados?", "Discussão?", "Conclusão?", "Agradecimentos/financiamento?", "Referências (estilo do periódico)?"],
      metodo: ["Diretriz de relato seguida (CARE/PRISMA/STROBE/CONSORT/STARD/COREQ)?"],
      formatacao: ["Template do periódico aplicado?", "Limite de palavras conferido?"],
      figuras: ["Limite de figuras/tabelas conferido?", "Figuras em alta resolução (≥300 dpi)?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: ["Estilo conforme periódico (Vancouver, ABNT, APA)?", ..._BLOCO_REFERENCIAS_PADRAO],
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Carta de apresentação (cover letter) escrita?", "Sugestões de revisores?", "Declarações (conflito, ética, financiamento)?", "Comprovante salvo?"],
    },
  },
  {
    id: "relato_caso",
    nome: "Relato de caso",
    blocos: {
      documento: ["Consentimento informado do paciente documentado?", "Imagens clínicas anonimizadas?"],
      conteudo: ["Introdução (raridade/relevância)?", "Apresentação do caso?", "Linha do tempo (CARE item 7)?", "Discussão?", "Conclusão?"],
      metodo: ["Diretriz CARE seguida (13 itens)?", "Perspectiva do paciente (quando aplicável)?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: _BLOCO_FIGURAS_PADRAO,
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Comprovante do CEP (se exigido pelo periódico)?", "Carta de apresentação?"],
    },
  },
  {
    id: "revisao_narrativa",
    nome: "Revisão narrativa",
    blocos: {
      documento: ["Página de título?", "Resumo?"],
      conteudo: ["Introdução com escopo claro?", "Desenvolvimento por tópicos?", "Conclusão?", "Referências?"],
      metodo: ["Linguagem cautelosa — não finja busca sistemática que não foi feita?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: _BLOCO_FIGURAS_PADRAO,
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: _BLOCO_SUBMISSAO_PADRAO,
    },
  },
  {
    id: "revisao_integrativa",
    nome: "Revisão integrativa",
    blocos: {
      documento: ["Página de título?", "Resumo estruturado?"],
      conteudo: ["Pergunta de pesquisa?", "Critérios de elegibilidade?", "Estratégia de busca (mínimo 2 bases)?", "Triagem por título/resumo?", "Análise crítica dos estudos?", "Síntese qualitativa?", "Discussão?", "Conclusão?"],
      metodo: ["Itens metodológicos do PRISMA aplicáveis foram seguidos?", "Fluxograma de seleção?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: ["Fluxograma de seleção (estilo PRISMA)?", "Quadro com estudos incluídos?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: _BLOCO_SUBMISSAO_PADRAO,
    },
  },
  {
    id: "revisao_sistematica",
    nome: "Revisão sistemática",
    blocos: {
      documento: ["Protocolo registrado (PROSPERO/INPLASY)?"],
      conteudo: ["27 itens do PRISMA 2020 contemplados?", "Fluxograma PRISMA?", "Avaliação de risco de viés (RoB 2, ROBINS-I, etc.)?", "Avaliação da certeza (GRADE)?"],
      metodo: ["PRISMA 2020 completo?", "Pelo menos 2 revisores independentes em triagem e extração?"],
      formatacao: _BLOCO_FORMATACAO_PADRAO,
      figuras: ["Fluxograma PRISMA?", "Tabela de estudos incluídos?", "Forest plots (se meta-análise)?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Material suplementar (estratégia de busca completa) submetido?", ..._BLOCO_SUBMISSAO_PADRAO],
    },
  },
  {
    id: "capitulo_livro",
    nome: "Capítulo de livro",
    blocos: {
      documento: ["Template do editor seguido?"],
      conteudo: ["Conforme proposta aprovada pelo organizador?", "Limite de páginas/caracteres conferido?"],
      metodo: ["Aderência ao escopo do livro?"],
      formatacao: ["Conforme manual de estilo do editor?"],
      figuras: ["Permissões de uso de figuras de terceiros obtidas?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: ["Conforme estilo do editor (ABNT/Vancouver/APA)?"],
      referencias: ["Conforme estilo do editor?"],
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Termo de cessão de direitos autorais assinado?", "Enviado ao organizador no prazo?"],
    },
  },
  {
    id: "poster",
    nome: "Pôster",
    blocos: {
      documento: ["Dimensões corretas (geralmente 90×120 cm ou conforme edital)?", "PDF em alta resolução (≥300 dpi)?"],
      conteudo: ["Título grande, legível a 3 m?", "Autores e afiliações?", "Introdução / Método / Resultados / Conclusão?", "Logos da instituição/financiadora?", "Contato/QR code?"],
      metodo: ["Coerência com o desenho declarado?"],
      formatacao: ["Hierarquia tipográfica clara (título > subtítulo > corpo)?", "Cores com contraste suficiente?", "Margens internas (não cortado na impressão)?"],
      figuras: ["Cada uma com 'Figura N – título' e fonte?", "Tamanho legível à distância?"],
      citacoes: ["Numéricas ou autor-data, padronizadas?"],
      referencias: ["Em corpo menor, no rodapé do pôster?"],
      arquivo: ["PDF testado em tamanho real (impressão de prova)?", "Fontes embarcadas?"],
      submissao: ["Enviado no formato exigido?", "Chegada à gráfica com antecedência?"],
    },
  },
  {
    id: "oral",
    nome: "Apresentação oral",
    blocos: {
      documento: ["Template institucional ou do evento?", "Slides em proporção correta (16:9 geralmente)?"],
      conteudo: ["Título, autores, filiação?", "Introdução curta?", "Método?", "Resultados?", "Discussão?", "Conclusão?", "Agradecimentos?"],
      metodo: ["Tempo cronometrado (geralmente 10-15 min + perguntas)?"],
      formatacao: ["Slides com pouco texto, fonte ≥24?", "Cores com contraste?"],
      figuras: ["Figuras em alta resolução?", "Fonte em cada figura?"],
      citacoes: ["Visíveis nos slides quando relevante?"],
      referencias: ["Slide de referências ao final?"],
      arquivo: ["PDF de backup do PPT?", "Vídeos embarcados ou em pasta separada?"],
      submissao: ["Roteiro ensaiado?", "Comprovante de inscrição salvo?"],
    },
  },
  {
    id: "ebook_livreto",
    nome: "E-book / Livreto de liga",
    blocos: {
      documento: ["Capa profissional?", "Folha de rosto?", "Ficha catalográfica (se ISBN)?", "ISBN obtido (quando aplicável)?"],
      conteudo: ["Sumário?", "Apresentação?", "Capítulos com autoria clara?", "Referências consolidadas?"],
      metodo: ["Revisão por pares interna da liga?"],
      formatacao: ["Layout consistente em todo o material?", "Paginação correta?"],
      figuras: ["Direitos autorais de imagens verificados?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: ["PDF/EPUB testado em diferentes leitores?", "Versão acessível (alt text em imagens)?"],
      submissao: ["Repositório institucional para depósito?", "Divulgação planejada?"],
    },
  },
  {
    id: "projeto_extensao_sigaa",
    nome: "Projeto de extensão no SIGAA",
    blocos: {
      documento: [
        "Identificação completa (título, ano, período, área CNPq, área temática, abrangência)?",
        "Vínculo declarado (Liga Acadêmica, etc.)?",
        "ODS marcados de forma realista?",
        "Público-alvo discriminado (interno + externo, quantificado)?",
        "Local de realização cadastrado?",
        "Modalidade de financiamento marcada?",
        "Parcerias cadastradas com função clara?",
      ],
      conteudo: [
        "Resumo (15-25 linhas, com palavras-chave 3-5)?",
        "Justificativa (1-3 páginas, articulando as 5 diretrizes da extensão)?",
        "Objetivos (geral + 2 a 5 específicos)?",
        "Metodologia (planejamento + execução + avaliação)?",
        "Resultados esperados (≠ atividades)?",
        "Referências (NBR 6023)?",
      ],
      metodo: ["Instrumentos de avaliação ACEx declarados?"],
      formatacao: ["Texto corrido conforme campos do SIGAA?"],
      figuras: ["N/A (preenchimento direto no sistema)."],
      citacoes: ["No texto da justificativa quando aplicável?"],
      referencias: ["Em formato ABNT, mesmo que não obrigatório?"],
      arquivo: ["Pré-visualização do SIGAA conferida?"],
      submissao: [
        "Equipe cadastrada (coordenador, docentes, técnicos, DISCENTES DE GRADUAÇÃO, externos)?",
        "Atividades com CH coerente (h/semana × semanas)?",
        "Orçamento detalhado e consolidado batendo (quando aplicável)?",
        "Anexos (anuências, HC, parcerias)?",
        "Prazo mínimo de 30 dias entre registro e início respeitado?",
        "Submetido à setorial de extensão do centro?",
      ],
    },
  },
  {
    id: "relatorio_extensao",
    nome: "Relatório de extensão / liga",
    blocos: {
      documento: ["Identificação da ação (vinculada ao projeto cadastrado)?"],
      conteudo: ["Descrição das atividades realizadas?", "Público alcançado (números reais)?", "Resultados obtidos?", "Avaliação processual?", "Produtos gerados (material educativo, eventos, publicações)?", "Dificuldades enfrentadas?"],
      metodo: ["Instrumentos ACEx aplicados?", "Dados de avaliação consolidados?"],
      formatacao: ["Conforme formulário SIGAA ou manual da PROEXC?"],
      figuras: ["Fotos das atividades (com consentimento)?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Postado no SIGAA até dezembro/janeiro?", "Comprovante salvo?"],
    },
  },
  {
    id: "manual_protocolo",
    nome: "Manual / Protocolo",
    blocos: {
      documento: ["Capa institucional?", "Versão (1.0, 2.0…) e data de validade?", "Autores e revisor declarados?"],
      conteudo: ["Objetivo?", "Escopo?", "Definições?", "Procedimento detalhado?", "Fluxograma quando aplicável?", "Referências?"],
      metodo: ["Validação interna por especialistas?"],
      formatacao: ["Numeração progressiva consistente?", "Layout claro para uso operacional?"],
      figuras: ["Fluxogramas/imagens com 'Fonte: elaborado pelo autor'?", ..._BLOCO_FIGURAS_PADRAO],
      citacoes: _BLOCO_CITACOES_PADRAO,
      referencias: _BLOCO_REFERENCIAS_PADRAO,
      arquivo: _BLOCO_ARQUIVO_PADRAO,
      submissao: ["Revisor aprovou?", "Distribuído à equipe?", "Próxima revisão agendada?"],
    },
  },
];
