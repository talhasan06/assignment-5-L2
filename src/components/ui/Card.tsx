import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
}) => {
  const baseStyle = 'bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800';
  const hoverStyle = hoverEffect ? 'transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg' : '';
  
  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => (
  <div className={`w-full ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold mb-2 text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

interface CardTextProps {
  children: ReactNode;
  className?: string;
}

export const CardText: React.FC<CardTextProps> = ({ children, className = '' }) => (
  <p className={`text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
  </p>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-5 py-3 bg-gray-50 dark:bg-gray-700 ${className}`}>
    {children}
  </div>
);

export default Card;