export type ProjectType = 'Residence' | 'Villa' | 'Independent House' | 'Renovation' | 'Commercial';
export type ProjectStatus = 'Completed' | 'Ongoing';

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  builtUpArea: number;
  floors: number;
  type: ProjectType;
  status: ProjectStatus;
  year: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  design: string;
  construction: string;
  result: string;
  featured: boolean;
}

export interface ProjectFilters {
  type: ProjectType | 'All';
  status: ProjectStatus | 'All';
}

/** Lightweight backend-driven project shown in cards + fullscreen viewer. */
export interface ProjectCardItem {
  id: number;
  name: string;
  description: string;
  image: string;
  status: string;
  isLive: boolean;
  location: string;
  type: string;
  area: number;
}