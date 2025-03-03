import React, { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footerContent,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-gray-800 shadow-lg`}
    >
      {title && (
        <div
          className={`border-b border-gray-700 px-6 py-4`}
        >
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        </div>
      )}

      <div className={`px-6 py-4`}>
        {children}
      </div>

      {footerContent && (
        <div className="border-t border-gray-700 bg-gray-900 px-6 py-4">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;
