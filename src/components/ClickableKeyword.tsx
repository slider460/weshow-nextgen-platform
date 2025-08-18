import React from "react";
import { Link } from "react-router-dom";

interface ClickableKeywordProps {
  keyword: string;
  link: string;
  className?: string;
}

const ClickableKeyword: React.FC<ClickableKeywordProps> = ({ 
  keyword, 
  link, 
  className = "text-blue-600 hover:text-blue-800 underline decoration-blue-400 decoration-2 underline-offset-2 transition-colors duration-200" 
}) => {
  return (
    <Link 
      to={link} 
      className={`inline-block ${className}`}
      title={`Подробнее о ${keyword}`}
    >
      {keyword}
    </Link>
  );
};

export default ClickableKeyword;
