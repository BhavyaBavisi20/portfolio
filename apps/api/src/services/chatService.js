import { InferenceClient } from "@huggingface/inference";
import { Embeddings } from "@langchain/core/embeddings";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
  ACHIEVEMENTS,
  BLOGS,
  CERTIFICATES,
  PROJECTS,
  SKILLS_DATA
} from "../../../web/src/data/index.js";

const DEFAULT_CHAT_MODEL =
  process.env.HUGGINGFACE_CHAT_MODEL || "katanemo/Arch-Router-1.5B";
const DEFAULT_EMBEDDING_MODEL =
  process.env.HUGGINGFACE_EMBEDDING_MODEL || "sentence-transformers/all-MiniLM-L6-v2";
const DEFAULT_HF_PROVIDER = process.env.HUGGINGFACE_PROVIDER || "hf-inference";
const MAX_HISTORY_MESSAGES = 6;
const MAX_CONTEXT_DOCUMENTS = 5;
const NO_ANSWER_RESPONSE =
  "I can only answer based on Bhavya's portfolio and profile context. I do not have enough grounded information for that yet. Ask me about projects, skills, achievements, blogs, career timeline, resume details, or how to contact him.";
const HF_PERMISSION_RESPONSE =
  "The portfolio assistant is configured, but the current Hugging Face token does not have permission to call the selected inference provider. Update the token permissions or provider settings, then try again.";
const HF_MODEL_UNAVAILABLE_RESPONSE =
  "The configured Hugging Face chat model is not available through the selected inference provider. The assistant can still answer from retrieved portfolio context, but generation needs a provider-supported model.";
const HF_NO_SUPPORTED_MODEL_RESPONSE =
  "No conversational model could be resolved for the configured Hugging Face provider. Check provider availability or set HUGGINGFACE_CHAT_MODEL to a supported model.";

const CONTACT_INFO = {
  email: "bhavyabavisi40@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhavya-bavisi-61a592281",
  github: "https://github.com/BhavyaBavisi20/portfolio",
  instruction:
    "Users can contact Bhavya directly by email, via LinkedIn, or by using the contact form in the portfolio."
};

const CAREER_TIMELINE = [
  {
    date: "2026 - Present",
    title: "AI Intern at DevX AI Labs",
    details:
      "Working on AI-native customer experience, automation systems, and product engineering workflows.",
    url: "https://www.devxlabs.ai/"
  },
  {
    date: "2026 (Expected)",
    title: "B.Tech in AI-DS",
    details: "Specialization in Artificial Intelligence and Data Science."
  },
  {
    date: "2024 - Present",
    title: "AI Research & Projects",
    details: "Built DocTalk AI, AI-Assisted Tetris, and Real-time ISL Recognition."
  },
  {
    date: "2022",
    title: "Started Programming",
    details: "Entered the world of tech and engineering."
  }
];

const LINKEDIN_SNAPSHOT = [
  {
    title: "LinkedIn Profile Snapshot",
    content: [
      "Bhavya is an AI-ML Engineer and frontend developer focused on building applied AI systems and modern web products.",
      "His current public profile highlights work across GenAI, RAG, backend engineering, frontend engineering, and AI-native product building.",
      "It also reflects an active focus on DevX AI Labs, AI Club leadership, full-stack portfolio engineering, and practical AI problem solving."
    ].join(" "),
    url: CONTACT_INFO.linkedin,
    keywords: ["linkedin", "profile", "about", "background", "current work", "engineering"]
  },
  {
    title: "LinkedIn Topic: Entropy in Chatbots",
    content: [
      "Bhavya recently wrote about using entropy to handle ambiguous chatbot queries.",
      "The key idea is: low entropy means answer directly, high entropy means ask a clarifying question.",
      "That work connects chemistry fundamentals, decision trees, and practical conversational AI design."
    ].join(" "),
    url: CONTACT_INFO.linkedin,
    keywords: ["entropy", "chatbot", "ambiguity", "intent", "decision tree", "clarifying question"]
  }
];

const TOKEN_BLACKLIST = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "have",
  "about",
  "into",
  "your",
  "what",
  "when",
  "where",
  "which",
  "while",
  "been",
  "will",
  "they",
  "them",
  "there",
  "here",
  "also",
  "than",
  "then",
  "just",
  "more",
  "does",
  "did",
  "want",
  "know",
  "tell",
  "me",
  "him",
  "his",
  "her",
  "she",
  "he",
  "you",
  "are",
  "was",
  "were",
  "how",
  "can",
  "use"
]);

const PREFERRED_CHAT_MODELS = [
  DEFAULT_CHAT_MODEL,
  "katanemo/Arch-Router-1.5B"
];

const TECH_QUERY_EXPANSIONS = {
  rag: [
    "retrieval augmented generation",
    "vector database",
    "langchain retrieval pipeline",
    "grounded generation"
  ],
  langchain: [
    "langchain framework",
    "retrieval chains",
    "prompt orchestration",
    "RAG pipeline"
  ],
  express: [
    "express framework",
    "node backend",
    "routing middleware controllers",
    "rest api"
  ],
  redis: [
    "redis caching",
    "pub sub",
    "in-memory data store",
    "backend tools"
  ],
  websocket: [
    "websockets",
    "real-time communication",
    "socket connection",
    "live updates"
  ],
  websockets: [
    "websocket",
    "real-time communication",
    "socket connection",
    "live updates"
  ],
  frontend: [
    "react",
    "tailwind",
    "framer motion",
    "frontend engineering",
    "ui development"
  ],
  backend: [
    "node.js",
    "express",
    "rest api",
    "backend concepts",
    "server-side development"
  ],
  cv: [
    "computer vision",
    "opencv",
    "cnn",
    "mediapipe"
  ],
  "computer vision": [
    "cv",
    "opencv",
    "cnn",
    "mediapipe",
    "image recognition"
  ],
  internship: [
    "ai intern",
    "devx ai labs",
    "career timeline",
    "current experience"
  ],
  research: [
    "research publication",
    "ai research",
    "papers",
    "healthcare ai"
  ],
  node: [
    "node.js",
    "backend runtime",
    "express",
    "server"
  ],
  "node.js": [
    "node",
    "backend runtime",
    "express",
    "server"
  ],
  javascript: [
    "js",
    "frontend logic",
    "async flows",
    "node.js"
  ],
  python: [
    "fastapi",
    "flask",
    "pandas",
    "python development"
  ],
  llm: [
    "llms",
    "large language models",
    "genai",
    "gpt-4 llama gemini"
  ],
  genai: [
    "generative ai",
    "llm",
    "rag",
    "langchain"
  ]
};

class HuggingFaceEmbeddings extends Embeddings {
  constructor(fields = {}) {
    super(fields);
    this.client = fields.client;
    this.model = fields.model || DEFAULT_EMBEDDING_MODEL;
  }

  async embedDocuments(texts) {
    return Promise.all(texts.map((text) => this.embedQuery(text)));
  }

  async embedQuery(text) {
    const response = await this.client.featureExtraction({
      provider: DEFAULT_HF_PROVIDER,
      model: this.model,
      inputs: text
    });

    return normalizeEmbedding(response);
  }
}

const normalizeEmbedding = (value) => {
  if (!Array.isArray(value)) {
    throw new Error("Embedding response was not an array");
  }

  if (value.length === 0) {
    return [];
  }

  if (typeof value[0] === "number") {
    return value;
  }

  const rows = value.filter((row) => Array.isArray(row) && row.length > 0);
  if (rows.length === 0) {
    return [];
  }

  const dimensions = rows[0].length;
  const meanVector = new Array(dimensions).fill(0);

  rows.forEach((row) => {
    for (let index = 0; index < dimensions; index += 1) {
      meanVector[index] += Number(row[index] || 0);
    }
  });

  return meanVector.map((entry) => entry / rows.length);
};

const cosineSimilarity = (left = [], right = []) => {
  if (!left.length || !right.length || left.length !== right.length) {
    return 0;
  }

  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    const leftValue = Number(left[index] || 0);
    const rightValue = Number(right[index] || 0);
    dotProduct += leftValue * rightValue;
    leftMagnitude += leftValue * leftValue;
    rightMagnitude += rightValue * rightValue;
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
};

const tokenize = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !TOKEN_BLACKLIST.has(token));

const lexicalScore = (queryTokens, documentTokens) => {
  if (!queryTokens.length || !documentTokens.size) {
    return 0;
  }

  let matches = 0;
  queryTokens.forEach((token) => {
    if (documentTokens.has(token)) {
      matches += 1;
    }
  });

  return matches / queryTokens.length;
};

const expandQuery = (query) => {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  const expansions = new Set([normalizedQuery]);
  const tokens = tokenize(normalizedQuery);

  Object.entries(TECH_QUERY_EXPANSIONS).forEach(([term, values]) => {
    if (
      normalizedQuery.includes(term) ||
      tokens.includes(term) ||
      (term.includes(" ") && normalizedQuery.includes(term))
    ) {
      values.forEach((value) => expansions.add(value));
    }
  });

  if (normalizedQuery.includes("tech background") || normalizedQuery.includes("technical background")) {
    [
      "skills",
      "projects",
      "backend",
      "frontend",
      "rag",
      "computer vision",
      "research",
      "internship"
    ].forEach((value) => expansions.add(value));
  }

  return Array.from(expansions).filter(Boolean);
};

const buildRetrievalQueries = ({ question, searchQueries = [], intent }) => {
  const expandedQueries = new Set();

  [question, ...searchQueries].forEach((entry) => {
    expandQuery(entry).forEach((expanded) => expandedQueries.add(expanded));
  });

  if (intent === "connect_with_me") {
    ["contact information", "email", "linkedin", "reach out", "career timeline"].forEach((query) =>
      expandedQueries.add(query)
    );
  } else {
    ["skills", "projects", "experience", "background"].forEach((query) =>
      expandedQueries.add(query)
    );
  }

  return Array.from(expandedQueries).slice(0, 12);
};

const formatLinks = (links = {}) => {
  const linkEntries = Object.entries(links).filter(([, value]) => value && value !== "#");
  if (linkEntries.length === 0) {
    return "";
  }

  return linkEntries.map(([label, value]) => `${label}: ${value}`).join("\n");
};

const createDocument = ({ title, sourceType, content, keywords = [], url = "" }) =>
  new Document({
    pageContent: content,
    metadata: {
      title,
      sourceType,
      keywords,
      url
    }
  });

const buildKnowledgeDocuments = () => {
  const documents = [];

  documents.push(
    createDocument({
      title: "About Bhavya",
      sourceType: "about",
      keywords: [
        "about",
        "background",
        "who is bhavya",
        "ai engineer",
        "frontend developer",
        "full stack",
        "genai"
      ],
      url: CONTACT_INFO.linkedin,
      content: [
        "Bhavya is an AI-ML Engineer and frontend developer focused on building applied AI systems and modern digital products.",
        "His work spans GenAI, RAG, LLM systems, backend APIs, frontend engineering, and interactive portfolio/product experiences.",
        "He works at the intersection of intelligence, engineering, and product execution."
      ].join("\n")
    })
  );

  PROJECTS.forEach((project) => {
    documents.push(
      createDocument({
        title: project.title,
        sourceType: "project",
        keywords: [
          "project",
          project.title,
          project.role,
          ...(project.tags || [])
        ],
        url: project.links?.code || project.links?.demo || "",
        content: [
          `Project: ${project.title}`,
          `Role: ${project.role}`,
          `Description: ${project.description}`,
          `Impact: ${project.impact}`,
          `Tags: ${(project.tags || []).join(", ")}`,
          formatLinks(project.links)
        ]
          .filter(Boolean)
          .join("\n")
      })
    );
  });

  Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
    documents.push(
      createDocument({
        title: `${category} Skills`,
        sourceType: "skills",
        keywords: [category, "skills", ...skills.map((skill) => skill.name)],
        content: [
          `Skill category: ${category}`,
          ...skills.map((skill) => `${skill.name}: ${skill.details}`)
        ].join("\n")
      })
    );

    skills.forEach((skill) => {
      documents.push(
        createDocument({
          title: skill.name,
          sourceType: "skill",
          keywords: [skill.name, category, ...(skill.details || "").split(/[,\s]+/)],
          content: [
            `Skill: ${skill.name}`,
            `Category: ${category}`,
            `Details: ${skill.details}`
          ].join("\n")
        })
      );
    });
  });

  BLOGS.forEach((blog) => {
    documents.push(
      createDocument({
        title: blog.title,
        sourceType: "blog",
        keywords: ["blog", blog.title, ...(blog.excerpt || "").split(/[,\s]+/)],
        url: CONTACT_INFO.linkedin,
        content: [
          `Blog: ${blog.title}`,
          `Date: ${blog.date}`,
          `Excerpt: ${blog.excerpt}`,
          `Content: ${blog.content || ""}`
        ]
          .filter(Boolean)
          .join("\n")
      })
    );
  });

  ACHIEVEMENTS.forEach((achievement) => {
    documents.push(
      createDocument({
        title: achievement.title,
        sourceType: "achievement",
        keywords: ["achievement", achievement.title, achievement.role, achievement.highlight],
        content: [
          `Achievement: ${achievement.title}`,
          `Role: ${achievement.role}`,
          `Description: ${achievement.description}`,
          `Highlight: ${achievement.highlight}`
        ].join("\n")
      })
    );
  });

  CERTIFICATES.forEach((certificate) => {
    documents.push(
      createDocument({
        title: certificate.name,
        sourceType: "certificate",
        keywords: ["certificate", certificate.name, certificate.issuer, certificate.year],
        url: certificate.link,
        content: [
          `Certificate: ${certificate.name}`,
          `Issuer: ${certificate.issuer}`,
          `Year: ${certificate.year}`,
          `Link: ${certificate.link}`
        ].join("\n")
      })
    );
  });

  documents.push(
    createDocument({
      title: "Career Timeline",
      sourceType: "career",
      keywords: ["career", "resume", "experience", "timeline", "internship", "education"],
      content: CAREER_TIMELINE.map((entry) =>
        [`Date: ${entry.date}`, `Title: ${entry.title}`, `Details: ${entry.details}`, entry.url ? `Link: ${entry.url}` : ""]
          .filter(Boolean)
          .join("\n")
      ).join("\n\n")
    })
  );

  documents.push(
    createDocument({
      title: "Contact Information",
      sourceType: "contact",
      keywords: ["contact", "email", "linkedin", "github", "reach out", "connect"],
      url: CONTACT_INFO.linkedin,
      content: [
        `Email: ${CONTACT_INFO.email}`,
        `LinkedIn: ${CONTACT_INFO.linkedin}`,
        `GitHub: ${CONTACT_INFO.github}`,
        CONTACT_INFO.instruction
      ].join("\n")
    })
  );

  LINKEDIN_SNAPSHOT.forEach((entry) => {
    documents.push(
      createDocument({
        title: entry.title,
        sourceType: "linkedin",
        keywords: entry.keywords,
        url: entry.url,
        content: entry.content
      })
    );
  });

  return documents;
};

const promptTemplate = PromptTemplate.fromTemplate(`You are Bhavya's portfolio assistant.

Answer only using the provided context from Bhavya's portfolio and curated profile notes.
Do not invent projects, skills, dates, employers, links, or personal details.
If the answer is not clearly supported by the context, reply with:
"{fallback}"

Formatting rules:
- Use a curated, scan-friendly structure.
- Highlight important titles, project names, company names, and key skills with markdown bold.
- Use bullet points for lists.
- If a relevant link exists in the context, include it with markdown link format.
- Keep the answer concise, useful, and grounded.
- Do not mention retrieval, chunks, or internal context.

Conversation history:
{history}

Resolved intent:
{intent}

Portfolio context:
{context}

User question:
{question}
`);

let knowledgeBasePromise = null;
let resolvedChatModelPromise = null;

const fetchSupportedConversationalModels = async (provider) => {
  const url = `https://huggingface.co/api/partners/${provider}/models`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch supported models for provider ${provider}`);
  }

  const payload = await response.json();
  const conversationalSection = payload?.conversational;
  if (!conversationalSection || typeof conversationalSection !== "object") {
    return [];
  }

  return Object.keys(conversationalSection).filter(Boolean);
};

const resolveChatModel = async () => {
  if (!resolvedChatModelPromise) {
    resolvedChatModelPromise = (async () => {
      const supportedModels = await fetchSupportedConversationalModels(DEFAULT_HF_PROVIDER);
      if (supportedModels.length === 0) {
        throw new Error(HF_NO_SUPPORTED_MODEL_RESPONSE);
      }

      const preferredModel = PREFERRED_CHAT_MODELS.find((candidate) =>
        supportedModels.includes(candidate)
      );
      const resolvedModel = preferredModel || supportedModels[0];
      console.log(
        `Resolved Hugging Face chat model "${resolvedModel}" for provider "${DEFAULT_HF_PROVIDER}".`
      );
      return resolvedModel;
    })();
  }

  return resolvedChatModelPromise;
};

const getKnowledgeBase = async () => {
  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY is not configured.");
  }

  if (!knowledgeBasePromise) {
    knowledgeBasePromise = (async () => {
      const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
      const embeddings = new HuggingFaceEmbeddings({
        client,
        model: DEFAULT_EMBEDDING_MODEL
      });
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 420,
        chunkOverlap: 60
      });

      const splitDocuments = await splitter.splitDocuments(buildKnowledgeDocuments());
      const vectors = await embeddings.embedDocuments(
        splitDocuments.map((document) => document.pageContent)
      );

      const entries = splitDocuments.map((document, index) => ({
        document,
        embedding: vectors[index],
        tokens: new Set(
          tokenize(
            [
              document.pageContent,
              document.metadata?.title,
              ...(document.metadata?.keywords || [])
            ].join(" ")
          )
        )
      }));

      return { client, embeddings, entries };
    })();
  }

  return knowledgeBasePromise;
};

const callChatModel = async (client, messages, options = {}) => {
  const model = await resolveChatModel();
  return client.chatCompletion({
    provider: DEFAULT_HF_PROVIDER,
    model,
    messages,
    temperature: options.temperature ?? 0.1,
    max_tokens: options.maxTokens ?? 350
  });
};

const formatHistory = (history = []) =>
  history
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => {
      const role = message.role === "assistant" ? "Assistant" : "User";
      return `${role}: ${String(message.content || "").trim()}`;
    })
    .filter(Boolean)
    .join("\n");

const formatContext = (documents) =>
  documents
    .map((document, index) => {
      const title = document.metadata?.title || `Source ${index + 1}`;
      const url = document.metadata?.url ? `\nURL: ${document.metadata.url}` : "";
      return `[${title}]\n${document.pageContent}${url}`;
    })
    .join("\n\n");

const isLowSignalQuestion = (question) => {
  const normalized = String(question || "").trim().toLowerCase();
  return !normalized || normalized.length < 3;
};

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    const match = String(value || "").match(/\{[\s\S]*\}/);
    if (!match) {
      return null;
    }

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

const fallbackIntentClassification = (question) => {
  const normalized = String(question || "").toLowerCase();
  const connectPattern =
    /(contact|connect|reach out|hire|collaborat|work together|email|message|portfolio review|idea|freelance|internship|opportunity)/;

  if (connectPattern.test(normalized)) {
    return {
      intent: "connect_with_me",
      searchQueries: buildRetrievalQueries({
        question: normalized,
        searchQueries: ["contact information", "career timeline"],
        intent: "connect_with_me"
      })
    };
  }

  return {
    intent: "know_about_me_and_my_work",
    searchQueries: buildRetrievalQueries({
      question: normalized,
      searchQueries: [],
      intent: "know_about_me_and_my_work"
    })
  };
};

const classifyIntent = async (client, question, history) => {
  try {
    const completion = await callChatModel(
      client,
      [
        {
          role: "system",
          content:
            'Classify the user message into one of two intents: "know_about_me_and_my_work" or "connect_with_me". Return strict JSON with keys: intent, searchQueries. searchQueries must be an array of 1 to 4 short search queries for retrieval.'
        },
        {
          role: "user",
          content: [
            `Conversation history:\n${formatHistory(history) || "None"}`,
            `User message:\n${question}`
          ].join("\n\n")
        }
      ],
      {
        temperature: 0,
        maxTokens: 180
      }
    );

    const raw = completion?.choices?.[0]?.message?.content || "";
    const parsed = safeJsonParse(raw);
    if (!parsed?.intent) {
      return fallbackIntentClassification(question);
    }

    const intent =
      parsed.intent === "connect_with_me"
        ? "connect_with_me"
        : "know_about_me_and_my_work";
    const queries = Array.isArray(parsed.searchQueries)
      ? parsed.searchQueries.map((entry) => String(entry || "").trim()).filter(Boolean).slice(0, 4)
      : [];

    return {
      intent,
      searchQueries: buildRetrievalQueries({
        question,
        searchQueries:
          queries.length > 0 ? queries : fallbackIntentClassification(question).searchQueries,
        intent
      })
    };
  } catch {
    return fallbackIntentClassification(question);
  }
};

const retrieveDocuments = async ({ embeddings, entries, question, searchQueries, intent }) => {
  const queries = Array.from(
    new Set(buildRetrievalQueries({ question, searchQueries, intent }).filter(Boolean))
  );
  const queryEmbeddings = await Promise.all(queries.map((query) => embeddings.embedQuery(query)));
  const queryTokensList = queries.map((query) => tokenize(query));

  const scoredEntries = entries.map((entry) => {
    let bestScore = 0;

    queries.forEach((_query, queryIndex) => {
      const dense = cosineSimilarity(queryEmbeddings[queryIndex], entry.embedding);
      const lexical = lexicalScore(queryTokensList[queryIndex], entry.tokens);
      const intentBoost =
        intent === "connect_with_me" && entry.document.metadata?.sourceType === "contact"
          ? 0.22
          : intent === "connect_with_me" && entry.document.metadata?.sourceType === "career"
            ? 0.08
            : intent === "know_about_me_and_my_work" &&
                ["project", "skills", "skill", "achievement", "linkedin", "career", "blog"].includes(
                  entry.document.metadata?.sourceType
                )
              ? 0.04
              : 0;
      const score = dense * 0.68 + lexical * 0.32 + intentBoost;
      if (score > bestScore) {
        bestScore = score;
      }
    });

    return {
      ...entry,
      score: bestScore
    };
  });

  const uniqueDocuments = [];
  const seenKeys = new Set();

  scoredEntries
    .sort((left, right) => right.score - left.score)
    .filter((entry) => entry.score > 0.12)
    .forEach((entry) => {
      const key = `${entry.document.metadata?.title || "unknown"}::${entry.document.pageContent.slice(0, 50)}`;
      if (!seenKeys.has(key) && uniqueDocuments.length < MAX_CONTEXT_DOCUMENTS) {
        seenKeys.add(key);
        uniqueDocuments.push(entry.document);
      }
    });

  return uniqueDocuments;
};

const buildGroundedFallbackAnswer = ({ question, documents, intent }) => {
  if (intent === "connect_with_me") {
    return [
      "**Let's connect.**",
      "",
      `- **Email:** ${CONTACT_INFO.email}`,
      `- **LinkedIn:** [Bhavya on LinkedIn](${CONTACT_INFO.linkedin})`,
      "- You can also use the quick form below and Bhavya will receive your details directly."
    ].join("\n");
  }

  const normalizedQuestion = String(question || "").toLowerCase();
  const topDocuments = documents.slice(0, 3);

  if (normalizedQuestion.includes("project")) {
    const projectDoc = topDocuments.find((document) => document.metadata?.sourceType === "project");
    if (projectDoc) {
      const lines = projectDoc.pageContent.split("\n");
      const data = Object.fromEntries(
        lines
          .map((line) => line.split(": "))
          .filter((parts) => parts.length >= 2)
          .map(([key, ...rest]) => [key, rest.join(": ")])
      );

      const bullets = [
        `**${data.Project || projectDoc.metadata?.title || "Project"}**`,
        "",
        data.Role ? `- **Role:** ${data.Role}` : "",
        data.Description ? `- **Overview:** ${data.Description}` : "",
        data.Impact ? `- **Impact:** ${data.Impact}` : "",
        data.Tags ? `- **Stack / Tags:** ${data.Tags}` : ""
      ].filter(Boolean);

      const linkLines = lines.filter((line) => /^(demo|code|casestudy|caseStudy):/i.test(line));
      linkLines.forEach((line) => {
        const [label, value] = line.split(": ");
        if (value) {
          bullets.push(`- **${label}:** [Open Link](${value})`);
        }
      });

      return bullets.join("\n");
    }
  }

  return topDocuments
    .map((document) => {
      const title = document.metadata?.title ? `**${document.metadata.title}**` : "**Portfolio Context**";
      const urlLine = document.metadata?.url ? `\n- **Link:** [Open](${document.metadata.url})` : "";
      return `${title}\n- ${document.pageContent.replace(/\n/g, "\n- ")}${urlLine}`;
    })
    .join("\n\n");
};

const isHuggingFacePermissionError = (error) => {
  const status = error?.httpResponse?.status;
  const message = error?.httpResponse?.body?.error || error?.message || "";
  return status === 401 || status === 403 || String(message).toLowerCase().includes("permission");
};

const isHuggingFaceModelAvailabilityError = (error) => {
  const message = error?.message || error?.httpResponse?.body?.error || "";
  return String(message).toLowerCase().includes("have not been able to find inference provider information");
};

export const answerPortfolioQuestion = async ({ question, history = [] }) => {
  if (isLowSignalQuestion(question)) {
    return {
      answer:
        "Ask me about **projects**, **skills**, **experience**, **achievements**, **blogs**, or **how to connect with Bhavya**.",
      sources: [],
      intent: "know_about_me_and_my_work",
      showContactForm: false
    };
  }

  if (!process.env.HUGGINGFACE_API_KEY) {
    return {
      answer:
        "The portfolio assistant is not fully configured yet. Add `HUGGINGFACE_API_KEY` on the API server to enable the RAG chatbot.",
      sources: [],
      intent: "know_about_me_and_my_work",
      showContactForm: false
    };
  }

  const { client, embeddings, entries } = await getKnowledgeBase();
  const classification = await classifyIntent(client, question, history);

  let documents;
  try {
    documents = await retrieveDocuments({
      embeddings,
      entries,
      question,
      searchQueries: classification.searchQueries,
      intent: classification.intent
    });
  } catch (error) {
    if (isHuggingFacePermissionError(error)) {
      return {
        answer: HF_PERMISSION_RESPONSE,
        sources: [],
        intent: classification.intent,
        showContactForm: classification.intent === "connect_with_me"
      };
    }
    throw error;
  }

  if (!documents || documents.length === 0) {
    return {
      answer: NO_ANSWER_RESPONSE,
      sources: [],
      intent: classification.intent,
      showContactForm: classification.intent === "connect_with_me"
    };
  }

  if (classification.intent === "connect_with_me") {
    return {
      answer: buildGroundedFallbackAnswer({
        question,
        documents,
        intent: classification.intent
      }),
      sources: documents.map((document) => ({
        title: document.metadata?.title || "Portfolio Source",
        type: document.metadata?.sourceType || "context",
        url: document.metadata?.url || ""
      })),
      intent: classification.intent,
      showContactForm: true
    };
  }

  const prompt = await promptTemplate.format({
    fallback: NO_ANSWER_RESPONSE,
    history: formatHistory(history),
    intent: classification.intent,
    context: formatContext(documents),
    question
  });

  try {
    const completion = await callChatModel(
      client,
      [
        {
          role: "system",
          content:
            "You are a grounded portfolio assistant. Answer only from the supplied portfolio/profile context and format the response clearly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      {
        temperature: 0.12,
        maxTokens: 420
      }
    );

    const answer = completion?.choices?.[0]?.message?.content?.trim() || NO_ANSWER_RESPONSE;
    return {
      answer,
      sources: documents.map((document) => ({
        title: document.metadata?.title || "Portfolio Source",
        type: document.metadata?.sourceType || "context",
        url: document.metadata?.url || ""
      })),
      intent: classification.intent,
      showContactForm: false
    };
  } catch (error) {
    if (isHuggingFaceModelAvailabilityError(error)) {
      return {
        answer: buildGroundedFallbackAnswer({
          question,
          documents,
          intent: classification.intent
        }),
        sources: documents.map((document) => ({
          title: document.metadata?.title || "Portfolio Source",
          type: document.metadata?.sourceType || "context",
          url: document.metadata?.url || ""
        })),
        intent: classification.intent,
        showContactForm: false
      };
    }

    if (isHuggingFacePermissionError(error)) {
      return {
        answer: HF_PERMISSION_RESPONSE,
        sources: [],
        intent: classification.intent,
        showContactForm: false
      };
    }

    if (String(error?.message || "").includes(HF_NO_SUPPORTED_MODEL_RESPONSE)) {
      return {
        answer: HF_NO_SUPPORTED_MODEL_RESPONSE,
        sources: [],
        intent: classification.intent,
        showContactForm: false
      };
    }

    if (String(error?.message || "").includes(HF_MODEL_UNAVAILABLE_RESPONSE)) {
      return {
        answer: HF_MODEL_UNAVAILABLE_RESPONSE,
        sources: [],
        intent: classification.intent,
        showContactForm: false
      };
    }

    throw error;
  }
};
