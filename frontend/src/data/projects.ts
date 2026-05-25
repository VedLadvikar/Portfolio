import type { Project } from "@/types/project";

import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export const projects: Project[] = [
  {
    id: "1",
    number: "01",
    title: "FinTrack- Expense Tracker With Dashboard",
    tag: "Dashboard",
    description:
      "Full-stack MERN expense tracker with JWT authentication, transaction management, interactive analytics dashboard, financial reporting, and responsive UI.",
    stack: ["React.JS", "Tailwind CSS", "MongoDB", "Express", "REST APIs"],
    image_url: p1,
    live_url: "https://fin-track-an-expense-tracker-with-d.vercel.app/",
    code_url: "https://github.com/VedLadvikar/FinTrack---An-Expense-Tracker-with-Dashboard",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    number: "02",
    title: "MediProof [Hackathon Project]",
    tag: "Blockchain",
    description:
      "MediProof is a decentralized application (dApp) built to combat counterfeit medicines and ensure supply chain integrity. By leveraging blockchain technology, we help manufacturers track their drug batches securely and allow consumers to easily verify the authenticity of their medicines.",
      stack: ["React + Vite", "TailwindCSS", "Solidity", "Hardhat", "Node.js", "Express", "IPFS", "The Graph", "Push Protocol", "Ethers.js", "MetaMask"],
    image_url: p2,
    live_url: "https://mediproof-object.vercel.app/",
    code_url: "https://github.com/Iam-jayant/-object-object-",
    featured: false,
    order: 2,
  },
  {
    id: "3",
    number: "03",
    title: "Halo Chat",
    tag: "Realtime · Mobile",
    description:
      "End-to-end encrypted messaging with rich presence, threads, and a calm minimalist UI.",
    stack: ["React Native", "Socket.io", "Node"],
    image_url: p3,
    live_url: "#",
    code_url: "#",
    featured: false,
    order: 3,
  },
];
