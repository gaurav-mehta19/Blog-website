import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative inline-flex items-center justify-center
        w-12 h-6 bg-bg-secondary hover:bg-bg-tertiary
        rounded-full transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2
        border border-border-primary
        group
      "
      aria-label="Toggle theme"
    >
      {/* Toggle Switch */}
      <div
        className={`
          absolute top-0.5 left-0.5 w-5 h-5
          bg-bg-primary rounded-full shadow-theme-sm
          transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          border border-border-primary
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-yellow-500" />
        ) : (
          <Moon className="w-3 h-3 text-blue-400" />
        )}
      </div>
      
      {/* Background Icons */}
      <div className="flex items-center justify-between w-full px-1">
        <Sun 
          className={`
            w-3 h-3 transition-opacity duration-300
            ${theme === 'light' ? 'opacity-0' : 'opacity-30 text-yellow-500'}
          `} 
        />
        <Moon 
          className={`
            w-3 h-3 transition-opacity duration-300
            ${theme === 'dark' ? 'opacity-0' : 'opacity-30 text-blue-400'}
          `} 
        />
      </div>
    </button>
  );
}

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg transition-all duration-200
        bg-bg-secondary hover:bg-bg-tertiary
        border border-border-primary
        text-text-secondary hover:text-text-primary
        shadow-theme-sm hover:shadow-theme-md
        focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2
      "
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}