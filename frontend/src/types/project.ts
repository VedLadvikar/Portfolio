export interface Project {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  image_url: string;
  live_url: string;
  code_url: string;
  featured: boolean;
  order: number;
}
