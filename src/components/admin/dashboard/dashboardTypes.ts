
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface ToastMessage {
  title: string;
  description: string;
}

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  section?: string;
  toastMessage?: ToastMessage;
  onClick?: () => void;
}

export interface QuickLinkItem {
  title: string;
  icon: ReactNode;
  section: string;
}
