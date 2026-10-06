export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  id: number;
  index: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TimelineStage {
  id: string;
  label: string;
  description: string;
  progress: number;
  image: string;
}