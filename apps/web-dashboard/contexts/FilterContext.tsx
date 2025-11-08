import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  // Date range
  dateFrom: string;
  dateTo: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;

  // Project
  selectedProject: string;
  setSelectedProject: (project: string) => void;

  // Source
  selectedSource: 'all' | 'form' | 'chat';
  setSelectedSource: (source: 'all' | 'form' | 'chat') => void;

  // Status
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;

  // Duplicates
  showDuplicates: boolean;
  setShowDuplicates: (show: boolean) => void;

  // Reset all filters
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'form' | 'chat'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDuplicates, setShowDuplicates] = useState<boolean>(false);

  const resetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedProject('all');
    setSelectedSource('all');
    setSelectedStatus('all');
    setShowDuplicates(false);
  };

  return (
    <FilterContext.Provider
      value={{
        dateFrom,
        dateTo,
        setDateFrom,
        setDateTo,
        selectedProject,
        setSelectedProject,
        selectedSource,
        setSelectedSource,
        selectedStatus,
        setSelectedStatus,
        showDuplicates,
        setShowDuplicates,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
