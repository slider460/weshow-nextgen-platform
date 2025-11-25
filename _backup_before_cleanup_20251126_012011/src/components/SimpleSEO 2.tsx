import { useEffect } from 'react';

interface SimpleSEOProps {
  title?: string;
  description?: string;
}

const SimpleSEO = ({ 
  title = 'WeShow NextGen Platform - Комплексные мультимедийные решения',
  description = 'Современная платформа мультимедийных решений для корпоративных клиентов'
}: SimpleSEOProps) => {
  
  useEffect(() => {
    // Обновляем только title страницы
    document.title = title;
    
    // Обновляем description безопасно
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null; // Этот компонент ничего не рендерит
};

export default SimpleSEO;