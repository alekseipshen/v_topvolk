'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { services } from '@/lib/data/services';

interface ModalContextType {
  isModalOpen: boolean;
  selectedService: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function detectServiceFromPath(pathname: string): string {
  // Match /services/[slug] or /services/[slug]/[city]
  const match = pathname.match(/^\/services\/([^/]+)/);
  if (match) {
    const slug = match[1];
    if (services.some(s => s.slug === slug)) return slug;
  }
  return '';
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const pathname = usePathname();

  const openModal = (service?: string) => {
    const svc = service || detectServiceFromPath(pathname);
    setSelectedService(svc);
    setIsModalOpen(true);

    // GTM Event - Open Lead Form
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'open_lead_form',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, selectedService, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
