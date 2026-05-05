import { Icons } from "@/components/icons";
import { House, Library } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Rohit Buccapatnam",
  initials: "RB",
  url: "https://rohitbuccapatnam.me",
  location: "Austin, TX",
  locationLink: "https://maps.google.com/?q=Austin,TX",
  description:
    "AI/ML Engineer — spiking neural networks, RAG systems, and model-based RL. 3 publications. MS CS, Ohio University.",
  summary:
    "I recently completed my MS in Computer Science at Ohio University, where my thesis focused on spiking world models for sample-efficient continuous control. I have production experience building LLM and RAG systems at Otsuka Pharmaceutical, and research experience spanning neuromorphic RL, reward modeling, and agentic pipelines. I'm currently looking for AI/ML engineering roles in Austin.",
  avatarUrl: "/photos/photome.png",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 3, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 5, enabled: true,
      label: "My Projects",
      heading: "Check out my latest work",
      text: "From neuromorphic RL to production RAG pipelines, here are a few things I've built.",
    },
    hackathons: {
      order: 7, enabled: true,
      label: "Publications & Talks",
      heading: "Research & Publications",
      text: "I've authored {count} publications and presentations spanning spiking neural networks, reinforcement learning, and applied ML.",
    },
    photos: {
      order: 6, enabled: false,
      heading: "Photos",
    },
    contact: {
      order: 8, enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Looking to collaborate or hire? Feel free to reach out — I'll get back to you as soon as I can.",
    },
  },
  photos: [],
  skills: [
    { name: "Python", icon: Python },
    { name: "PyTorch", icon: undefined },
    { name: "LangChain", icon: undefined },
    { name: "FastAPI", icon: undefined },
    { name: "RAG", icon: undefined },
    { name: "RLHF", icon: undefined },
    { name: "Spiking Neural Networks", icon: undefined },
    { name: "MuJoCo / Gymnasium", icon: undefined },
    { name: "FAISS", icon: undefined },
    { name: "NVIDIA NIM", icon: undefined },
    { name: "Azure AI Foundry", icon: undefined },
    { name: "Azure Databricks", icon: undefined },
    { name: "Docker", icon: Docker },
    { name: "AWS Bedrock", icon: undefined },
    { name: "Dataiku", icon: undefined },
    { name: "React", icon: ReactLight },
    { name: "C++", icon: undefined },
    { name: "Golang", icon: Golang },
    { name: "SQL", icon: undefined },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/blog", icon: Library, label: "Blog" },
  ],
  contact: {
    email: "saketrohit24@gmail.com",
    tel: "+19786770491",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/saketrohit24",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/sakethrohit",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:saketrohit24@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Otsuka Pharmaceutical",
      href: "https://www.otsuka.com",
      badges: [],
      location: "Princeton, NJ",
      title: "GenAI Engineer Intern",
      logoUrl: "/otsuka.png",
      start: "May 2025",
      end: "Aug 2025",
      description:
        "Built an LLM-powered authoring tool for CMC regulatory documents using LangChain, FastAPI, and NVIDIA NIM — generating structured first drafts from internal source materials with traceable outputs. Designed RAG pipelines with FAISS and citation-aware chunking so every generated claim linked back to a specific source passage. Iterated on prompt structure with the Biologics Lead based on domain expert corrections.",
    },
    {
      company: "Xelpmoc Design and Tech",
      href: "https://xelpmoc.in",
      badges: [],
      location: "Hyderabad, India",
      title: "Software Development Intern",
      logoUrl: "/xelpmoc.png",
      start: "Oct 2022",
      end: "Jan 2023",
      description:
        "Built REST APIs in FastAPI/Golang for a tourism portal covering booking, search, and user feedback. Containerized the application with Docker to eliminate environment drift between development and production.",
    },
    {
      company: "DRDO – Research Centre Imarat",
      href: "https://www.drdo.gov.in",
      badges: [],
      location: "Hyderabad, India",
      title: "Machine Learning Intern",
      logoUrl: "/drdo.png",
      start: "May 2022",
      end: "Aug 2022",
      description:
        "Supported a Research Scientist building a human activity recognition system for robotics — implemented a CNN+LSTM hybrid to classify motion sequences from sensor data. Collected, annotated, and cleaned a custom dataset to address gaps in publicly available benchmarks.",
    },
  ],

  education: [
    {
      school: "Ohio University",
      href: "https://www.ohio.edu",
      degree: "Master of Science, Computer Science",
      logoUrl: "/photos/oulogo.png",
      start: "2024",
      end: "2025",
      description:
        "Thesis: Spiking World Models for Sample-Efficient Continuous Control. Advisor: Dr. Chang Liu. GPA: 3.8/4.0. 3 publications (2 peer-reviewed, 1 under review). Teaching Assistant for Python Programming.",
    },
    {
      school: "Osmania University",
      href: "https://www.osmania.ac.in",
      degree: "Bachelor of Engineering, Computer Science",
      logoUrl: "/photos/osmania.png",
      start: "2019",
      end: "2023",
      description:
        "Final-year project: U-Net with attention mechanisms for automated deforestation detection from satellite imagery. Research internship at DRDO during final year.",
    },
  ],

  projects: [
    {
      title: "Spiking World Models for Sample-Efficient RL (MS Thesis)",
      href: "https://github.com/saketrohit24",
      dates: "2024 – 2025",
      active: true,
      description:
        "Designed a model-based RL framework where agents learn inside a spiking neural network world model instead of sampling from the real environment. Used an ensemble of adaptive CLIF neurons with uncertainty-guided dreaming across MuJoCo tasks (HalfCheetah-v4, Ant-v4, HumanoidCompactLite-v0). Achieved ~31–42% reduction in environment steps and 18× lower variance vs. model-free baselines. Paper submitted to ICONS '26.",
      technologies: [
        "PyTorch", "Spiking Neural Networks", "MuJoCo", "Gymnasium",
        "Surrogate Gradient Learning", "Population Coding",
      ],
      links: [
        {
          type: "Paper (under review)",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CMC Regulatory Document Authoring Tool",
      href: "https://github.com/saketrohit24",
      dates: "May 2025 – Aug 2025",
      active: true,
      description:
        "Production RAG pipeline built at Otsuka Pharmaceutical for generating structured first drafts of Chemistry, Manufacturing, and Controls regulatory submissions. Citation-aware chunking ensured every generated claim traced back to a specific source passage. Deployed via Azure AI Foundry as a managed endpoint. Iterated on prompts with the Biologics Lead across multiple review cycles.",
      technologies: [
        "LangChain", "FastAPI", "NVIDIA NIM", "FAISS",
        "Azure AI Foundry", "Docker", "Azure Container Registry",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "RLHF from Scratch — SFT, Reward Modeling, PPO",
      href: "https://github.com/saketrohit24",
      dates: "2024",
      active: true,
      description:
        "End-to-end RLHF implementation across three stages: supervised fine-tuning of GPT-2 on SST-2, reward model training with a learned reward head, and PPO policy optimization against the reward signal. Built the PPO training loop from scratch with KL regularization against the frozen SFT reference model to prevent reward hacking.",
      technologies: [
        "PyTorch", "GPT-2", "PPO", "KL Regularization",
        "Reward Modeling", "Hugging Face",
      ],
      links: [
        {
          type: "GitHub",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Multi-Agent RAG System — Azure AI Foundry",
      href: "https://github.com/saketrohit24",
      dates: "2025",
      active: true,
      description:
        "Multi-agent RAG application on Azure AI Foundry with Prompt Flow orchestration. Configured hub with shared Key Vault, Storage, and Azure AI Search. Replaced FAISS with a managed Azure AI Search index for production-scale retrieval. Containerized FastAPI wrapper deployed as a managed online endpoint.",
      technologies: [
        "Azure AI Foundry", "Prompt Flow", "Azure OpenAI",
        "Azure AI Search", "FastAPI", "Docker", "Azure Container Registry",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Incremental Data Pipeline — Medallion Architecture",
      href: "https://github.com/saketrohit24",
      dates: "2025",
      active: true,
      description:
        "End-to-end incremental pipeline following the Medallion architecture (Bronze → Silver → Gold). ADF ingests raw data, Databricks transforms it, and Delta tables serve the Gold layer as a star schema. Watermark-based CDC logic via stored procedures ensures only new records move through each run.",
      technologies: [
        "Azure Data Factory", "Azure Databricks", "Delta Lake",
        "Azure Data Lake Storage Gen2", "Azure SQL", "Parquet",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "RL- and LLM-Based AI Solvers for Wordle/Fibble",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Co-authored and presented at IEEE CoG 2025. Built custom RL environments for Wordle and Fibble (a deceptive-feedback variant). Designed reward functions and game state representations for DQN agents; built prompt-based LLM solvers with constraint tracking and retry logic. RL agents with well-shaped rewards outperformed LLM agents when feedback was consistently deceptive.",
      technologies: [
        "PyTorch", "DQN", "Gymnasium", "LLM Prompting",
        "Reward Engineering",
      ],
      links: [
        {
          type: "Paper",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Deep Stacked BiLSTM for Petroleum Forecasting",
      href: "#",
      dates: "2023",
      active: false,
      description:
        "Stacked Bidirectional LSTM architecture for long-range oil production forecasting. Benchmarked against LSTM, GRU, and RNN baselines on two real oilfield datasets. Achieved RMSE of 0.026. Published in Procedia Computer Science (Elsevier) 2023.",
      technologies: [
        "PyTorch", "BiLSTM", "Time-Series Forecasting",
      ],
      links: [
        {
          type: "Paper",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],

  hackathons: [
    {
      title: "Spiking World Models for Sample-Efficient Continuous Control",
      dates: "2026 (Under Review)",
      location: "Neuromorphic Computing and Engineering — IOP Publishing",
      description:
        "Proposed SNN-based model-based RL with ensemble adaptive LIF world models and uncertainty-guided dreaming. 30% reduction in environment steps on HalfCheetah-v4; ~7× lower convergence variance.",
      image: "",
      links: [
        {
          title: "Preprint",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "#",
        },
      ],
    },
    {
      title: "Exploring Neuromorphic Computing for RL: A Survey and Review",
      dates: "2026",
      location: "IEEE Access",
      description:
        "Surveyed surrogate gradient learning, STDP, eligibility traces, and reservoir computing for spiking RL. Analyzed hardware–software co-design trade-offs across Loihi and SpiNNaker.",
      image: "",
      links: [
        {
          title: "Paper",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "#",
        },
      ],
    },
    {
      title: "RL- and LLM-Based AI Solvers for Wordle and Fibble",
      dates: "2025",
      location: "IEEE Conference on Games (CoG 2025)",
      description:
        "Comparative study of DQN agents and LLM solvers in cooperative and adversarial word game settings. Presented at IEEE CoG 2025.",
      image: "",
      links: [
        {
          title: "Paper",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "#",
        },
      ],
    },
    {
      title: "Deep Stacked BiLSTM for Petroleum Production Forecasting",
      dates: "2023",
      location: "Procedia Computer Science — Elsevier",
      description:
        "BiLSTM architecture for oil production time-series forecasting; outperformed GRU, RNN, and DLSTM on RMSE and RMSPE metrics.",
      image: "",
      links: [
        {
          title: "Paper",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "#",
        },
      ],
    },
    {
      title: "NICE Neuromorphic Conference 2026 — Poster",
      dates: "Mar 2026",
      location: "Atlanta, GA",
      description:
        "Poster: Deep Spiking Q-Networks for Strategic Games. Demonstrated 4× reduction in synaptic operations per inference step vs. a conventional DQN on Tic-Tac-Toe and Connect 4.",
      image: "",
      links: [],
    },
  ],
} as const;
