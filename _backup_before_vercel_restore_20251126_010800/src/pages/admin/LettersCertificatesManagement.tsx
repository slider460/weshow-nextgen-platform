import { useState, useEffect } from 'react';
import { useLettersCertificates } from '../../hooks/useLettersCertificates';
import { LetterCertificate, LetterCertificateInsert, LetterCertificateUpdate, LetterCertificateType } from '../../types/database';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown,
  Award,
  FileText,
  Trophy,
  GraduationCap,
  Calendar,
  ExternalLink
} from 'lucide-react';

const LettersCertificatesManagement = () => {
  const { letters, loading, error, addLetter, updateLetter, deleteLetter, fetchAllLetters } = useLettersCertificates();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<LetterCertificateInsert>({
    title: '',
    description: '',
    image_url: '',
    document_url: '',
    type: 'letter',
    issuer: '',
    issued_date: '',
    is_visible: true,
    sort_order: 0
  });

  // Загружаем все письма при монтировании компонента
  useEffect(() => {
    fetchAllLetters();
  }, [fetchAllLetters]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      document_url: '',
      type: 'letter',
      issuer: '',
      issued_date: '',
      is_visible: true,
      sort_order: 0
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    
    try {
      if (editingId) {
        await updateLetter(editingId, formData);
        setSubmitSuccess('Документ успешно обновлен!');
      } else {
        await addLetter(formData);
        setSubmitSuccess('Документ успешно добавлен!');
      }
      resetForm();
      // Обновляем список после добавления/редактирования
      await fetchAllLetters();
      
      // Автоматически скрываем уведомление об успехе через 3 секунды
      setTimeout(() => {
        setSubmitSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
      setSubmitError(err instanceof Error ? err.message : 'Неизвестная ошибка при сохранении');
    }
  };

  const handleEdit = (letter: LetterCertificate) => {
    setFormData({
      title: letter.title,
      description: letter.description || '',
      image_url: letter.image_url || '',
      document_url: letter.document_url || '',
      type: letter.type,
      issuer: letter.issuer,
      issued_date: letter.issued_date || '',
      is_visible: letter.is_visible,
      sort_order: letter.sort_order
    });
    setEditingId(letter.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
      try {
        await deleteLetter(id);
        // Обновляем список после удаления
        await fetchAllLetters();
      } catch (err) {
        console.error('Ошибка при удалении:', err);
      }
    }
  };

  const toggleVisibility = async (letter: LetterCertificate) => {
    try {
      await updateLetter(letter.id, { is_visible: !letter.is_visible });
      // Обновляем список после изменения видимости
      await fetchAllLetters();
    } catch (err) {
      console.error('Ошибка при изменении видимости:', err);
    }
  };

  const moveUp = async (letter: LetterCertificate) => {
    try {
      await updateLetter(letter.id, { sort_order: letter.sort_order - 1 });
      // Обновляем список после перемещения
      await fetchAllLetters();
    } catch (err) {
      console.error('Ошибка при перемещении:', err);
    }
  };

  const moveDown = async (letter: LetterCertificate) => {
    try {
      await updateLetter(letter.id, { sort_order: letter.sort_order + 1 });
      // Обновляем список после перемещения
      await fetchAllLetters();
    } catch (err) {
      console.error('Ошибка при перемещении:', err);
    }
  };

  const getTypeIcon = (type: LetterCertificateType) => {
    switch (type) {
      case 'letter':
        return <FileText className="h-4 w-4" />;
      case 'certificate':
        return <Award className="h-4 w-4" />;
      case 'award':
        return <Trophy className="h-4 w-4" />;
      case 'diploma':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: LetterCertificateType) => {
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Управление письмами и грамотами
        </h1>
        <p className="text-slate-600">
          Добавляйте, редактируйте и управляйте благодарственными письмами и грамотами
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div className="font-medium mb-2">Ошибка: {error}</div>
          {error.includes('не найдена') && (
            <div className="text-sm text-red-600">
              Создайте таблицу letters_certificates в Supabase Dashboard, используя SQL из файла СОЗДАНИЕ_ТАБЛИЦЫ_ПИСЕМ_И_ГРАМОТ.md
            </div>
          )}
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div className="font-medium">Ошибка при сохранении: {submitError}</div>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <div className="font-medium">✅ {submitSuccess}</div>
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingId ? 'Редактировать документ' : 'Добавить новый документ'}
            </CardTitle>
            <CardDescription>
              Заполните форму для добавления или редактирования документа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Название *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Тип документа *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: LetterCertificateType) => 
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">Благодарственное письмо</SelectItem>
                      <SelectItem value="certificate">Сертификат</SelectItem>
                      <SelectItem value="award">Награда</SelectItem>
                      <SelectItem value="diploma">Диплом</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="issuer">Выдающая организация *</Label>
                  <Input
                    id="issuer"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="issued_date">Дата выдачи</Label>
                  <Input
                    id="issued_date"
                    type="date"
                    value={formData.issued_date}
                    onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
                  />
                </div>

                {/* Поле image_url убрано - превью больше не используются */}

                <div>
                  <Label htmlFor="document_url">URL документа</Label>
                  <Input
                    id="document_url"
                    value={formData.document_url}
                    onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                    placeholder="https://example.com/document.pdf"
                  />
                </div>

                <div>
                  <Label htmlFor="sort_order">Порядок сортировки</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_visible"
                  checked={formData.is_visible}
                  onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_visible">Отображать на сайте</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {editingId ? 'Сохранить изменения' : 'Добавить документ'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!isAdding && (
        <div className="mb-6">
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить документ
          </Button>
        </div>
      )}

      {/* Letters List */}
      <div className="space-y-4">
        {letters.map((letter) => (
          <Card key={letter.id} className={`${!letter.is_visible ? 'opacity-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTypeIcon(letter.type)}
                    <h3 className="text-lg font-semibold">{letter.title}</h3>
                    <Badge variant={letter.is_visible ? 'default' : 'secondary'}>
                      {getTypeName(letter.type)}
                    </Badge>
                    {!letter.is_visible && (
                      <Badge variant="outline">Скрыто</Badge>
                    )}
                  </div>
                  
                  <p className="text-slate-600 mb-2">
                    <strong>Организация:</strong> {letter.issuer}
                  </p>
                  
                  {letter.issued_date && (
                    <p className="text-slate-500 text-sm mb-2 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(letter.issued_date)}
                    </p>
                  )}
                  
                  {letter.description && (
                    <p className="text-slate-600 text-sm mb-3">{letter.description}</p>
                  )}
                  
                  <div className="flex gap-2 text-sm text-slate-500">
                    {letter.document_url && (
                      <a 
                        href={letter.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Документ
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveUp(letter)}
                    disabled={letter.sort_order <= 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveDown(letter)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleVisibility(letter)}
                  >
                    {letter.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(letter)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(letter.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {letters.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Нет документов</h3>
          <p className="text-slate-500 mb-4">Добавьте первый документ, чтобы начать</p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить документ
          </Button>
        </div>
      )}
    </div>
  );
};

export default LettersCertificatesManagement;
