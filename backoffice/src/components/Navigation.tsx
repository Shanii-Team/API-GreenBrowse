import React from 'react';
import { Leaf, Moon, Sun, Settings, Menu } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  onConfigToggle: () => void;
  onMenuToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  toggleTheme,
  currentLanguage,
  changeLanguage,
  onConfigToggle,
  onMenuToggle,
}) => {
  const languages = ['fr', 'en', 'es'];

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'fr': return 'FR';
      case 'en': return 'EN';
      case 'es': return 'ES';
      default: return lang.toUpperCase();
    }
  };

  const handleLanguageChange = (lang: string) => {
    console.log('🔄 Navigation: triggering language change to', lang);
    changeLanguage(lang);
    
    // Add visual feedback
    const button = document.querySelector(`[data-lang="${lang}"]`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 300);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800/80 border-slate-700/50' 
        : 'bg-white/80 border-slate-200/50'
    } border-b`}>
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Greenbrows Pro
                </h1>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className={`hidden sm:flex rounded-xl p-1 ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang}
                  data-lang={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentLanguage === lang
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {getLanguageLabel(lang)}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Config Button */}
            <button
              onClick={onConfigToggle}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className={`lg:hidden p-2 rounded-xl ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;