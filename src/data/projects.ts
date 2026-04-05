export type TechItem = { name: string; color: string };
export type Challenge = { title: string; description: string };

export type Project = {
  title: string;
  category: string;
  tagline: string;
  description: string;       // short — used on the card
  overview: string;       // long — used on the Blueprint page
  role: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Deployed';
  features: string[];
  highlight: string;
  challenges: Challenge[];
  tech: TechItem[];
  image: string;
  accent: string;       // Tailwind gradient classes
  accentBorder: string;
  accentText: string;
  link: string;
  github: string;
  flip: boolean;
};

const projects: Project[] = [
  {
    title: 'Socials',
    category: 'AI Social Media Platform',
    tagline: 'Your AI-powered content engine — from idea to post in seconds.',
    description:
      'A full-stack platform that lets creators generate AI-powered captions and automate scheduled posting across social media channels — all from one dashboard.',
    overview:
      'Socials was born out of the problem that content creators spend more time writing captions and scheduling posts than actually creating. The platform integrates LLM APIs to generate on-brand captions from a simple prompt or uploaded image, then lets users schedule and auto-publish across multiple platforms. The backend is built with FastAPI for its native async support, allowing thousands of scheduled jobs to run in parallel without blocking API responses. Media assets are stored via CDN with automatic format optimisation on upload. The React dashboard gives a real-time view of scheduled content, engagement analytics, and AI generation history.',
    role: 'Solo Full-Stack Developer',
    duration: '3 months',
    status: 'In Progress',
    features: [
      'AI caption generation via LLM API integration',
      'Automated scheduled posting across platforms',
      'Media upload pipeline with CDN optimisation',
      'Analytics dashboard for engagement tracking',
      'Async task queue for non-blocking post scheduling',
    ],
    highlight:
      'FastAPI async backend handles burst traffic with a Celery task queue, keeping API response times under 200 ms even during peak scheduling windows with hundreds of concurrent jobs.',
    challenges: [
      {
        title: 'Rate limiting across platforms',
        description:
          'Each social platform enforces strict per-minute API limits. Solved this by building a per-platform token-bucket rate limiter inside the task queue so jobs self-throttle without failing.',
      },
      {
        title: 'LLM response consistency',
        description:
          'Raw LLM output was inconsistent in tone and length. Added a prompt engineering layer with post-processing validation that re-generates if the output fails quality heuristics.',
      },
    ],
    tech: [
      { name: 'Python', color: '#3776AB' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Celery', color: '#a855f7' },
      { name: 'LLM APIs', color: '#f59e0b' },
    ],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-purple-500/20 to-emerald-500/10',
    accentBorder: 'border-purple-500/25',
    accentText: 'text-purple-400',
    link: 'https://socials.yoco.co.in',
    github: '#',
    flip: false,
  },
  {
    title: 'Decloud',
    category: 'Decentralized Storage Network',
    tagline: 'Own your storage. Earn from your disk. No middleman.',
    description:
      'A peer-to-peer distributed file storage system where anyone can contribute unused disk space and earn on-chain rewards, backed by a smart contract incentive layer.',
    overview:
      'Decloud is a decentralised alternative to centralised cloud storage. Storage providers register their nodes on-chain, and the protocol automatically routes file uploads to available nodes based on capacity and latency. Files are split into 64 KB shards using a custom chunking algorithm, each shard encrypted and replicated across three geographically distinct nodes. Smart contracts written in Solidity and compiled with Hardhat govern the reward distribution — providers earn tokens proportional to storage uptime, verified by periodic challenge-response proofs. A Flutter mobile app lets contributors monitor their node health, storage contribution, and earned rewards in real time.',
    role: 'Lead Backend & Smart Contract Developer',
    duration: '4 months',
    status: 'In Progress',
    features: [
      'File chunking & AES-256 encryption before upload',
      'Replication across 3 independent storage nodes',
      'Solidity smart contracts for trustless reward payouts',
      'Challenge-response proofs for uptime verification',
      'Flutter mobile app for node monitoring',
      'Web3 wallet integration for contributor payouts',
    ],
    highlight:
      'Custom chunking algorithm splits files into 64 KB shards with Reed-Solomon parity bits, achieving 99.9% retrieval reliability even when one of the three replica nodes goes offline.',
    challenges: [
      {
        title: 'Ensuring data integrity without a central server',
        description:
          'Without a trusted coordinator, detecting silent data corruption was hard. Implemented Merkle-tree-based integrity proofs that any client can verify independently without downloading the full file.',
      },
      {
        title: 'Fair reward distribution',
        description:
          'Providers could game uptime metrics. Designed a random-beacon challenge system where the contract periodically requests a proof-of-storage; missing a challenge slashes the provider\'s staked collateral.',
      },
    ],
    tech: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Solidity', color: '#627EEA' },
      { name: 'Hardhat', color: '#e5cc00' },
      { name: 'Web3.js', color: '#F16822' },
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'PostgreSQL', color: '#336791' },
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    accent: 'from-sky-500/20 to-violet-500/10',
    accentBorder: 'border-sky-500/25',
    accentText: 'text-sky-400',
    link: '#',
    github: '#',
    flip: true,
  },
  {
    title: "Keep",
    category: "Advanced Personal Finance App",
    tagline: "Offline-first finance tracking with deep analytics and smart automation.",
    description: "A high-performance personal finance app with advanced analytics, predictive insights, and offline-first architecture.",
    overview: "Keep is an offline-first personal finance system designed for deep financial awareness and control. It uses an embedded database (Isar) and advanced analytics to deliver real-time insights without relying on cloud infrastructure.",
    role: "Full-Stack / Mobile Developer (solo)",
    duration: "Ongoing",
    status: "In Progress",
    features: [
      "Offline-first architecture with Isar embedded database",
      "Advanced analytics (burn rate, anomaly detection, predictions)",
      "Smart SMS-based transaction detection",
      "Category-based budgeting with enforcement",
      "Daily allowance and smart savings tracking",
      "Multiple UI visualization modes for spending insights",
      "CSV export and full transaction history tracking"
    ],
    highlight: "A fully offline-first system with advanced financial analytics including anomaly detection, predictive modeling, and behavioral insights.",
    challenges: [
      {
        title: "Designing offline-first architecture",
        description: "Built the system entirely on a local database to ensure high performance and zero dependency on cloud services."
      },
      {
        title: "Implementing advanced analytics locally",
        description: "Developed statistical models like Z-score anomaly detection and Markov chain predictions directly within the app."
      }
    ],
    tech: [
      { name: "Flutter", color: "#54C5F8" },
      { name: "Isar DB", color: "#6C47FF" }
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop",
    accent: "from-yellow-500/20 to-blue-500/10",
    accentBorder: "border-yellow-500/25",
    accentText: "text-yellow-400",
    link: "#",
    github: "#",
    flip: true
  }
];

export default projects;
