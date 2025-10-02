import { useLettersCertificates } from '../hooks/useLettersCertificates';
import { Award, FileText, Trophy, GraduationCap, ExternalLink, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const LettersCertificatesSection = () => {
  const { letters, loading, error } = useLettersCertificates();

  // Иконки для разных типов документов
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'letter':
        return <FileText className="h-6 w-6" />;
      case 'certificate':
        return <Award className="h-6 w-6" />;
      case 'award':
        return <Trophy className="h-6 w-6" />;
      case 'diploma':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  // Цвета для разных типов документов
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'letter':
        return 'from-blue-500 to-blue-600';
      case 'certificate':
        return 'from-green-500 to-green-600';
      case 'award':
        return 'from-yellow-500 to-yellow-600';
      case 'diploma':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  // Названия типов документов
  const getTypeName = (type: string) => {
    switch (type) {
      case 'letter':
        return 'Благодарственное письмо';
      case 'certificate':
        return 'Сертификат';
      case 'award':
        return 'Награда';
      case 'diploma':
        return 'Диплом';
      default:
        return 'Документ';
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Благодарственные письма и грамоты
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Наши достижения
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              Ошибка загрузки данных: {error}
            </div>
            <div className="text-sm text-slate-500 mb-4">
              Возможно, таблица letters_certificates еще не создана в Supabase.
              <br />
              Создайте таблицу, используя инструкцию в файле СОЗДАНИЕ_ТАБЛИЦЫ_ПИСЕМ_И_ГРАМОТ.md
            </div>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!letters || letters.length === 0) {
    return null; // Не показываем секцию, если нет данных
  }

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            Благодарственные письма и грамоты
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наши <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">достижения</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Признание нашей работы от ведущих компаний и организаций
          </p>
        </div>

        {/* Grid of Letters and Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {letters.map((letter) => (
            <div 
              key={letter.id} 
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200"
            >
              {/* Header with Icon and Type */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTypeColor(letter.type)} flex items-center justify-center text-white`}>
                  {getTypeIcon(letter.type)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {getTypeName(letter.type)}
                  </div>
                  {letter.issued_date && (
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(letter.issued_date)}
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {letter.title}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-slate-600 mb-3 font-medium">
                {letter.issuer}
              </p>

              {/* Description */}
              {letter.description && (
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {letter.description}
                </p>
              )}

              {/* Image Preview */}
              {letter.image_url && (
                <div className="mb-4">
                  <img 
                    src={letter.image_url} 
                    alt={letter.title}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Document Link */}
              {letter.document_url && (
                <div className="flex justify-end">
                  <a 
                    href={letter.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Открыть документ
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LettersCertificatesSection;
