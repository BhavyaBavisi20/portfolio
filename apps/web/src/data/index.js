import { Code, Brain, Sparkles, Atom, Wind, GitBranch, Container, Activity, Database, Server, Layout, Globe, FileText, Layers, Terminal, Users, BookOpen, Trophy, Cpu, Zap } from 'lucide-react';

export const USER_IMAGE_URL = "/bhavya_3.png"; 
export const RESUME_PATH = "/resume.pdf"; 

export const PROJECTS = [
  {
    id: 1,
    title: "DocTalk AI",
    role: "GenAI & RAG Architecture",
    image: "/project_doctalk.png",
    description: "Built a production-grade GenAI assistant using LangChain and Vector Databases. Engineered a retrieval pipeline that reduces hallucination by grounding responses in medical documents.",
    impact: "40% faster document search and response using RAG pipelines",
    tags: ["GenAI", "RAG", "LangChain", "Pinecone"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  },
  {
    id: 2,
    title: "Indian Sign Language Recognition",
    role: "Computer Vision",
    image: "/project_isl.png",
    description: "Developed a real-time ISL recognition system using CNNs and MediaPipe. Designed a custom preprocessing pipeline (segmentation, normalization) to handle variable lighting conditions.",
    impact: "90% Accuracy in real-time gesture detection at 30 FPS.",
    tags: ["CNNs", "MediaPipe", "Deep Learning", "OpenCV"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  },
  {
    id: 3,
    title: "Clinical Decision Support System",
    role: "Healthcare AI",
    image: "/project_clinical.png",
    description: "Engineered a CNN-based diagnostic model to assist doctors in early disease detection. Utilized transfer learning on the INbreast dataset to identify microcalcifications.",
    impact: "99% diagnostic accuracy validated across diverse datasets.",
    tags: ["CNN", "Medical Imaging", "Python", "PyTorch"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  },
  {
    id: 4,
    title: "Portfolio Website",
    role: "Frontend Engineering",
    image: "/project_portfolio.png",
    description: "Designed and built a high-performance, immersive portfolio. Implemented complex framer motion animations, 3D tilting cards, and responsive glassmorphism layouts.",
    impact: "100/100 Lighthouse Performance Score.",
    tags: ["React", "Tailwind", "Framer Motion"],
    links: { demo: "#", code: "#", caseStudy: "#" }
  }
];

export const SKILLS_DATA = {
  "AI-Core": [
    { name: "GenAI", icon: Sparkles, details: "Fine-tuning, Prompt Eng." },
    { name: "LLMs", icon: Brain, details: "Llama 3, GPT-4, Gemini" },
    { name: "RAG & VectorDB", icon: Database, details: "Pinecone, Chroma, Weaviate" },
    { name: "AI Agent Design", icon: Terminal, details: "AutoGPT, CrewAI" },
    { name: "NLP", icon: FileText, details: "Transformers, HuggingFace" },
    { name: "ML / Deep Learning", icon: Layers, details: "PyTorch, TensorFlow" },
  ],
  "Development": [
    { name: "Python", icon: Code, details: "FastAPI, Flask, Pandas" },
    { name: "JavaScript", icon: Globe, details: "ES6+, Node.js" },
    { name: "React", icon: Atom, details: "Hooks, Redux, Next.js" },
    { name: "Tailwind", icon: Wind, details: "Responsive, Shadcn" },
    { name: "Framer Motion", icon: Layout, details: "Animations, Gestures" },
    { name: "REST APIs", icon: Server, details: "Design, Integration" },
  ],
  "Tools": [
    { name: "Docker", icon: Container, details: "Containerization" },
    { name: "Git/GitHub", icon: GitBranch, details: "CI/CD, Version Control" },
    { name: "MongoDB", icon: Database, details: "NoSQL, Aggregation" },
    { name: "Power BI", icon: Activity, details: "Data Visualization" },
    { name: "n8n", icon: Zap, details: "Workflow Automation" },
  ]
};

// Fix the missing Zap icon by importing it

export const ACHIEVEMENTS = [
  {
    title: "President of AI Club",
    role: "Leadership",
    icon: Users,
    description: "Leading the AI community at SCET. Organizing workshops, hackathons, and technical sessions to foster innovation and peer learning.",
    highlight: "Community Lead"
  },
  {
    title: "Research Publication",
    role: "Lead Author",
    icon: BookOpen,
    description: "Authoring research papers on 'CNN-based Breast Cancer Detection' and 'Real-time ISL Translation' for peer-reviewed journals.",
    highlight: "Healthcare AI"
  },
  {
    title: "Smart India Hackathon 2024",
    role: "Participant",
    icon: Trophy,
    description: "Competed in a nationwide 36-hour hackathon solving complex government problem statements.",
    highlight: "National Level"
  },
  {
    title: "Flipkart Grid 7.0",
    role: "Participant",
    icon: Cpu,
    description: "Participated in the robotics and AI challenge, optimizing path planning algorithms for autonomous systems.",
    highlight: "Robotics Challenge"
  }
];

export const CERTIFICATES = [
  {
    name: "Machine Learning Crash Course",
    issuer: "Google Developers",
    year: "2024",
    link: "https://developers.google.com/profile/u/111380742482293108022",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
  },
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    year: "2024",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_LajCTCJAiDvN3XgAh_1748375797384_completion_certificate.pdf",
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
    excerpt: "Why AI is a brilliant co-developer, but not your deployment engineer. A story of loops, context windows, and 5-minute promises.",
    date: "Nov 27, 2025",
    readTime: "4 min read",
    content: "" 
  },
  {
    id: 2,
    title: "The Future of Multimodal Agents",
    excerpt: "How text-to-image and image-to-text models are converging to create truly intelligent assistants.",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    content: "..."
  },
  {
    id: 3,
    title: "Optimizing CNNs for Edge Devices",
    excerpt: "Techniques for pruning and quantization to run heavy computer vision models on mobile phones.",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    content: "..."
  }
];
