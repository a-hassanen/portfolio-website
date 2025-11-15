export interface Profile {
  name: string;
  title: string;
  bio: string;
  profilePictureUrl: string; 
  contact: {
    email: string;
    linkedin: string;
    github: string;
    credly?: string;
    googleSkills?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface Badge {
  title: string;
  issuer: string;
  imageUrl: string;
  credentialUrl: string;
  featured?: boolean;
  display?: 'card' | 'iframe';
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  profile: Profile;
  about: string;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  badges: Badge[];
}

// Fix: Added missing AdminConfig interface definition
export interface AdminConfig {
  credentials: {
    username: string;
    password: string;
  };
  github: {
    owner: string;
    repo: string;
    branch: string;
  };
}
