import { Loader2, BookOpen } from "lucide-react";

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Loading = ({ 
  size = 'md', 
  variant = 'spinner', 
  text, 
  className = '',
  fullScreen = false 
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  const renderSpinner = () => (
    <Loader2 
      className={`${sizeClasses[size]} text-theme-primary animate-spin ${className}`}
    />
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} bg-theme-primary rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${className}`}>
      <BookOpen 
        className={`${sizeClasses[size]} text-theme-primary animate-pulse-slow`}
      />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      default: return renderSpinner();
    }
  };

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center justify-center space-y-3">
        {renderVariant()}
        {text && (
          <p className={`${textSizes[size]} text-text-secondary font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

// Specialized loading components for common use cases
export const FullScreenLoading = ({ text = "Loading..." }: { text?: string }) => (
  <Loading fullScreen variant="spinner" size="lg" text={text} />
);

export const ButtonLoading = ({ text }: { text?: string }) => (
  <Loading variant="spinner" size="sm" text={text} className="text-white" />
);

export const PageLoading = ({ text = "Loading content..." }: { text?: string }) => (
  <div className="flex items-center justify-center py-16">
    <Loading variant="spinner" size="lg" text={text} />
  </div>
);

export const InlineLoading = ({ text }: { text?: string }) => (
  <Loading variant="dots" size="sm" text={text} />
);