import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface DataContextType {
  services: Service[];
  gallery: GalleryImage[];
  projects: Project[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const defaultServices: Service[] = [
  { id: '1', title: 'Web Development', description: 'Custom websites and web applications with modern technologies', icon: 'Code' },
  { id: '2', title: 'Graphic Design', description: 'Stunning visuals for print and digital media', icon: 'Palette' },
  { id: '3', title: 'Logo Design', description: 'Unique brand identities that stand out', icon: 'Sparkles' },
  { id: '4', title: 'UI/UX Design', description: 'User-centered interface experiences', icon: 'Layout' },
  { id: '5', title: 'Mobile App', description: 'Native and cross-platform mobile applications', icon: 'Smartphone' },
  { id: '6', title: 'Digital Marketing', description: 'Strategies to grow your online presence', icon: 'TrendingUp' },
];

const defaultGallery: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop', title: 'Brand Design', category: 'branding' },
  { id: '2', url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=800&fit=crop', title: 'Web Interface', category: 'web' },
  { id: '3', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop', title: 'Creative Art', category: 'design' },
  { id: '4', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop', title: 'Abstract Design', category: 'design' },
  { id: '5', url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=800&fit=crop', title: 'Logo Collection', category: 'branding' },
  { id: '6', url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=800&fit=crop', title: 'UI Components', category: 'web' },
];

const defaultProjects: Project[] = [
  { 
    id: '1', 
    title: 'E-Commerce Website', 
    description: 'A fully responsive online store with cart functionality and payment integration',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    link: '#'
  },
  { 
    id: '2', 
    title: 'Portfolio Design', 
    description: 'Creative portfolio website for a photography business',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    link: '#'
  },
  { 
    id: '3', 
    title: 'Brand Identity', 
    description: 'Complete branding package for a tech startup',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop',
    link: '#'
  },
  { 
    id: '4', 
    title: 'Mobile App UI', 
    description: 'Fitness tracking app interface design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    link: '#'
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioServices');
      return saved ? JSON.parse(saved) : defaultServices;
    }
    return defaultServices;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioGallery');
      return saved ? JSON.parse(saved) : defaultGallery;
    }
    return defaultGallery;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioProjects');
      return saved ? JSON.parse(saved) : defaultProjects;
    }
    return defaultProjects;
  });

  useEffect(() => {
    localStorage.setItem('portfolioServices', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('portfolioGallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  }, [projects]);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGallery(prev => [...prev, newImage]);
  };

  const deleteGalleryImage = (id: string) => {
    setGallery(prev => prev.filter(img => img.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...project } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <DataContext.Provider value={{
      services,
      gallery,
      projects,
      addService,
      updateService,
      deleteService,
      addGalleryImage,
      deleteGalleryImage,
      addProject,
      updateProject,
      deleteProject,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
