export interface SkillItem {
  name: string;
  slug: string;
}

export interface SkillCategory {
  label: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" }
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css3" },
      { name: "JavaScript", slug: "javascript" },
      { name: "React.js", slug: "react" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express.js", slug: "express" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB", slug: "mongodb" },
      { name: "Mongoose", slug: "mongoose" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    label: "Tools & Tech",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "JWT", slug: "jsonwebtokens" },
      { name: "REST APIs", slug: "openapiinitiative" },
      { name: "Axios", slug: "axios" },
      { name: "Vite", slug: "vite" },
    ],
  },
  {
    label: "Concepts",
    items: [
      { name: "OOP", slug: "abstract" },
      { name: "DBMS", slug: "databricks" },
      { name: "RDBMS", slug: "mysql" },
      { name: "ML Basics", slug: "scikitlearn" },
      { name: "Deep Learning", slug: "tensorflow" },
    ],
  },
];
