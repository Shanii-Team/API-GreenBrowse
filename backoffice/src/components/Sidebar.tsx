import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SidebarItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  isOpen: boolean;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeSection,
  onSectionChange,
  isOpen,
  isDarkMode,
}) => {
  const { translate } = useTranslation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onSectionChange(activeSection)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isDarkMode
            ? 'bg-slate-800/95 border-slate-700/50'
            : 'bg-white/95 border-slate-200/50'
        } backdrop-blur-lg border-r`}
      >
        <nav className="h-full overflow-y-auto">
          <div className="p-4 space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform translate-x-1'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                  <span className="capitalize">
                    {translate(item.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;