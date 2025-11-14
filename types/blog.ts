export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  date: string;
  day: number;
  image: string;
  content: string[];
  quote?: string;
  reflection: string;
  tags: string[];
  coordinates: [number, number]; // [latitude, longitude]
  gallery?: string[];
  videos?: string[];
}