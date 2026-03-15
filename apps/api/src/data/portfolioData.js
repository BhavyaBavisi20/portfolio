export const PROJECTS = [
  {
    id: 1,
    title: "DocTalk AI",
    role: "GenAI & RAG Architecture",
    image: "/project_doctalk.png",
    description:
      "Built a production-grade GenAI assistant using LangChain and Vector Databases. Engineered a retrieval pipeline that reduces hallucination by grounding responses in medical documents.",
    impact: "40% faster document search and response using RAG pipelines",
    tags: ["GenAI", "RAG", "LangChain", "Pinecone"],
    links: {
      demo: "https://github.com/BhavyaBavisi20/DocTalk-AI",
      code: "https://github.com/BhavyaBavisi20/DocTalk-AI",
      caseStudy: "#"
    }
  },
  {
    id: 2,
    title: "Indian Sign Language Recognition",
    role: "Computer Vision",
    image: "/project_isl.png",
    description:
      "Developed a real-time ISL recognition system using CNNs and MediaPipe. Designed a custom preprocessing pipeline (segmentation, normalization) to handle variable lighting conditions.",
    impact: "90% Accuracy in real-time gesture detection at 30 FPS.",
    tags: ["CNNs", "MediaPipe", "Deep Learning", "OpenCV"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  },
  {
    id: 3,
    title: "Clinical Decision Support System",
    role: "Healthcare AI",
    image: "/project_clinical.png",
    description:
      "Engineered a CNN-based diagnostic model to assist doctors in early disease detection. Utilized transfer learning on the INbreast dataset to identify microcalcifications.",
    impact: "99% diagnostic accuracy validated across diverse datasets.",
    tags: ["CNN", "Medical Imaging", "Python", "PyTorch"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  },
  {
    id: 4,
    title: "Portfolio Website",
    role: "Full-Stack Portfolio Engineering",
    image: "/project_portfolio_fullstack.svg",
    description:
      "Built an immersive portfolio with a decoupled React frontend and a backend API layer for projects, blogs, achievements, certificates, and contact workflows. Combined motion-heavy UI, responsive layouts, and structured data delivery into a single production-style system.",
    impact:
      "Evolved the portfolio from a static showcase into a full-stack app with dynamic content pipelines.",
    tags: ["React", "Tailwind", "Framer Motion", "Node.js", "REST API", "MongoDB"],
    links: {
      demo: "https://github.com/BhavyaBavisi20/portfolio",
      code: "https://github.com/BhavyaBavisi20/portfolio",
      caseStudy: "#"
    }
  },
  {
    id: 5,
    title: "AI-Assisted Tetris",
    role: "Game AI & Frontend Logic",
    image: "/project_tetris_ai.svg",
    description:
      "Recreated the classic retro Tetris experience with an explainable AI assistant that analyzes the board, suggests optimal placements, and can play the game step-by-step.",
    impact:
      "Built a transparent heuristic-driven AI system paired with a pixel-perfect retro UI.",
    tags: ["Tetris", "Explainable AI", "Heuristics", "Game Logic", "Retro UI"],
    links: {
      demo: "https://github.com/BhavyaBavisi20/ai-assisted-tetris-retro-revival",
      code: "https://github.com/BhavyaBavisi20/ai-assisted-tetris-retro-revival",
      caseStudy: "#"
    }
  }
];

export const SKILLS_DATA = {
  "AI-Core": [
    { name: "GenAI", icon: "Sparkles", details: "Fine-tuning, Prompt Eng." },
    { name: "LLMs", icon: "Brain", details: "Llama 3, GPT-4, Gemini" },
    { name: "RAG & VectorDB", icon: "Database", details: "Pinecone, Chroma, Weaviate" },
    { name: "AI Agent Design", icon: "Terminal", details: "AutoGPT, CrewAI" },
    { name: "NLP", icon: "FileText", details: "Transformers, HuggingFace" },
    { name: "ML / Deep Learning", icon: "Layers", details: "PyTorch, TensorFlow" }
  ],
  Development: [
    { name: "Python", icon: "Code", details: "FastAPI, Flask, Pandas" },
    { name: "JavaScript", icon: "Globe", details: "ES6+, async flows, app logic" },
    { name: "Node.js", icon: "Server", details: "Backend runtime, APIs, tooling" },
    { name: "Express", icon: "Server", details: "Routing, middleware, controllers" },
    { name: "Backend Concepts", icon: "Layout", details: "CRUD, MVC, auth flow basics" },
    { name: "React", icon: "Atom", details: "Hooks, Redux, Next.js" },
    { name: "Tailwind", icon: "Wind", details: "Responsive, Shadcn" },
    { name: "Framer Motion", icon: "Layout", details: "Animations, Gestures" }
  ],
  Tools: [
    { name: "Docker", icon: "Container", details: "Containerization" },
    { name: "Git/GitHub", icon: "GitBranch", details: "CI/CD, Version Control" },
    { name: "MongoDB", icon: "Database", details: "NoSQL, Aggregation" },
    { name: "Redis", icon: "Database", details: "Caching, pub/sub basics" },
    { name: "WebSockets", icon: "Activity", details: "Real-time communication" },
    { name: "Power BI", icon: "Activity", details: "Data Visualization" },
    { name: "n8n", icon: "Zap", details: "Workflow Automation" }
  ]
};

export const ACHIEVEMENTS = [
  {
    title: "President of AI Club",
    role: "Leadership",
    icon: "Users",
    description:
      "Leading the AI community at SCET. Organizing workshops, hackathons, and technical sessions to foster innovation and peer learning.",
    highlight: "Community Lead"
  },
  {
    title: "Research Publication",
    role: "Lead Author",
    icon: "BookOpen",
    description:
      "Authoring research papers on 'CNN-based Breast Cancer Detection' and 'Real-time ISL Translation' for peer-reviewed journals.",
    highlight: "Healthcare AI"
  },
  {
    title: "Smart India Hackathon 2024",
    role: "Participant",
    icon: "Trophy",
    description:
      "Competed in a nationwide 36-hour hackathon solving complex government problem statements.",
    highlight: "National Level"
  },
  {
    title: "Flipkart Grid 7.0",
    role: "Participant",
    icon: "Cpu",
    description:
      "Participated in the robotics and AI challenge, optimizing path planning algorithms for autonomous systems.",
    highlight: "Robotics Challenge"
  }
];

export const CERTIFICATES = [
  {
    name: "Machine Learning Crash Course",
    issuer: "Google Developers",
    year: "2024",
    link: "https://developers.google.com/profile/u/111380742482293108022",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
  },
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    year: "2024",
    link:
      "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_LajCTCJAiDvN3XgAh_1748375797384_completion_certificate.pdf",
    thumb: "deloitte.png"
  },
  {
    name: "Intro to Deep Learning",
    issuer: "Kaggle Learn",
    year: "2023",
    link: "https://www.kaggle.com/learn/certification/bhavyabavisi/intro-to-deep-learning",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png"
  },
  {
    name: "Python for Data Science",
    issuer: "Kaggle Learn",
    year: "2023",
    link: "https://www.kaggle.com/learn/certification/bhavyabavisi/python",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png"
  },
  {
    name: "Green Skills and AI",
    issuer: "Edunet Foundation",
    year: "2024",
    link: "https://drive.google.com/file/d/11aKJfT2MgkRA3DQPVNs1LwyYWqSXt2nf/view",
    thumb: "https://cdn-icons-png.flaticon.com/512/1598/1598431.png"
  },
  {
    name: "AI for Digital Readiness",
    issuer: "ADiRA",
    year: "2024",
    link: "https://drive.google.com/file/d/1ERGHgVDiHJx6DVtSj_GkkHy6ekZh7Cnq/view?usp=drive_link",
    thumb: "https://cdn-icons-png.flaticon.com/512/2083/2083213.png"
  }
];

export const BLOGS = [
  {
    id: 1,
    title: "The Case of the Missing Zip File: My ChatGPT Portfolio Saga",
    excerpt:
      "Why AI is a brilliant co-developer, but not your deployment engineer. A story of loops, context windows, and 5-minute promises.",
    date: "Nov 27, 2025",
    readTime: "4 min read",
    content: `I recently decided to give my portfolio website a modern makeover.

But instead of opening VS Code, I thought: why not let ChatGPT handle it?

I shared an example link, a few design ideas, and a detailed prompt. Within minutes, it confidently handed me a ready-to-download ZIP file with HTML, CSS, and JS.

So far, so good.

Then came the real test.

I asked for a few small edits: name updates, color tweaks, and smoother animation.

ChatGPT replied: "Absolutely. I'll have the updated ZIP ready in 5 minutes."

Five minutes later, it was: "Almost done. Just 5 more minutes."

And then: GPT limit exhausted.

The next day I tried again. Same promise. Same loop.

After digging a bit deeper, here's what likely happened:

Context overload: the model tried to hold all the previous code while rewriting the new version and ran out of context space.

Tool timeout: the code generation may have worked, but the ZIP packaging step likely failed.

Reassurance bias: instead of saying it could not finish, the model defaulted to a friendly "just 5 more minutes."

In short, the AI did not forget. It ran out of bandwidth.

The takeaway for me was simple:

AI is an incredible co-developer for writing, debugging, and explaining code.

But when it comes to building and packaging full projects, your local development environment still wins.

Sometimes the best workflow is simple:

AI for thinking.
Your machine for building.`
  },
  {
    id: 2,
    title: "From Chemistry to Chatbots: How Entropy Solves Real-World Problems",
    excerpt:
      "A simple idea from chemistry and information theory can help chatbots avoid bad guesses and ask better questions.",
    date: "Mar 15, 2026",
    readTime: "4 min read",
    content: `While building a chatbot recently, I ran into a common problem.

Users often send ambiguous queries like: "I need help with my order."

But that can mean very different things. It could be a request to track an order, cancel it, ask for a refund, or report a delivery issue. If the bot guesses too early, it risks taking the conversation in the wrong direction.

Instead of treating this as just another intent-classification issue, I remembered a concept I first saw in chemistry and later again in decision trees: entropy.

H(S) = - sum p(x) log2 p(x)

Entropy is a measure of uncertainty. The higher the entropy, the less confident the system should be about making a direct decision.

That led to a simple rule:

Low entropy: the bot is confident, so it can respond directly.

High entropy: the bot is uncertain, so it should ask a clarifying question first.

For example, imagine the model predicts:

Track Order: 0.35
Cancel Order: 0.30
Refund: 0.20
Delivery Issue: 0.15

Those probabilities are too close to justify a confident response. Instead of guessing, the better move is to ask: "Do you want to track, cancel, or request a refund for your order?"

That one small decision improves both accuracy and user experience. The bot becomes more transparent, less error-prone, and much more useful in real conversations.

The biggest takeaway for me is that many real engineering problems are solved using concepts we learned years ago.

Entropy once felt like just another formula on paper. Today, it helps build AI systems that make better decisions.

Sometimes the real edge is not learning a brand-new tool. It is understanding the fundamentals deeply enough to reuse them in the right context.`
  }
];
