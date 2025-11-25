/**
 * Панель редактирования свойств блоков для CMS системы WESHOW
 * Динамическая форма для настройки параметров блоков
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../../lib/utils';
import { blockRegistry } from '../blocks/BlockRegistry';
import {
  ContentBlock,
  BlockSettings,
  MultiLanguageContent,
  SpacingSettings,
  ResponsiveSettings
} from '../../../types/cms';

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

interface PropertiesPanelProps {
  /** Редактируемый блок */
  block: ContentBlock;
  
  /** Текущий язык */
  language: 'ru' | 'en';
  
  /** Обработчик обновления блока */
  onBlockUpdate: (blockId: string, updates: Partial<ContentBlock>) => void;
  
  /** Обработчик закрытия панели */
  onClose: () => void;
  
  /** Панель открыта */
  isOpen: boolean;
}

interface FieldEditorProps {
  field: any; // FieldConfig из BlockRegistry
  value: any;
  language: 'ru' | 'en';
  onChange: (value: any) => void;
}

interface SpacingEditorProps {
  value: SpacingSettings;
  onChange: (value: SpacingSettings) => void;
  label: string;
}

interface ResponsiveEditorProps {
  settings: BlockSettings;
  responsiveSettings: ResponsiveSettings;
  onChange: (responsiveSettings: ResponsiveSettings) => void;
}

// =============================================================================
// РЕДАКТОР ОТСТУПОВ
// =============================================================================

const SpacingEditor: React.FC<SpacingEditorProps> = ({ value, onChange, label }) => {
  const spacing = value || { top: 0, right: 0, bottom: 0, left: 0 };

  const handleChange = (side: keyof SpacingSettings, newValue: string) => {
    const numValue = parseInt(newValue) || 0;
    onChange({
      ...spacing,
      [side]: numValue
    });
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-gray-500">Верх</Label>
          <Input
            type="number"
            value={spacing.top || 0}
            onChange={(e) => handleChange('top', e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Право</Label>
          <Input
            type="number"
            value={spacing.right || 0}
            onChange={(e) => handleChange('right', e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Низ</Label>
          <Input
            type="number"
            value={spacing.bottom || 0}
            onChange={(e) => handleChange('bottom', e.target.value)}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Лево</Label>
          <Input
            type="number"
            value={spacing.left || 0}
            onChange={(e) => handleChange('left', e.target.value)}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// РЕДАКТОР ПОЛЕЙ
// =============================================================================

const FieldEditor: React.FC<FieldEditorProps> = ({ field, value, language, onChange }) => {
  const getLocalizedLabel = (label: MultiLanguageContent): string => {
    return label[language] || label.ru || field.name;
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'multilang-text':
        if (field.type === 'multilang-text') {
          const mlValue = value || { ru: '', en: '' };
          return (
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-gray-500">Русский</Label>
                <Input
                  value={mlValue.ru || ''}
                  onChange={(e) => onChange({ ...mlValue, ru: e.target.value })}
                  placeholder="Введите текст на русском"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">English</Label>
                <Input
                  value={mlValue.en || ''}
                  onChange={(e) => onChange({ ...mlValue, en: e.target.value })}
                  placeholder="Enter text in English"
                />
              </div>
            </div>
          );
        } else {
          return (
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={getLocalizedLabel(field.label)}
            />
          );
        }

      case 'textarea':
      case 'multilang-textarea':
        if (field.type === 'multilang-textarea') {
          const mlValue = value || { ru: '', en: '' };
          return (
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-gray-500">Русский</Label>
                <Textarea
                  value={mlValue.ru || ''}
                  onChange={(e) => onChange({ ...mlValue, ru: e.target.value })}
                  placeholder="Введите текст на русском"
                  rows={field.rows || 3}
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">English</Label>
                <Textarea
                  value={mlValue.en || ''}
                  onChange={(e) => onChange({ ...mlValue, en: e.target.value })}
                  placeholder="Enter text in English"
                  rows={field.rows || 3}
                />
              </div>
            </div>
          );
        } else {
          return (
            <Textarea
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={getLocalizedLabel(field.label)}
              rows={field.rows || 3}
            />
          );
        }

      case 'number':
        return (
          <Input
            type="number"
            value={value || field.defaultValue || 0}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value || false}
              onCheckedChange={onChange}
            />
            <Label className="text-sm">
              {value ? 'Включено' : 'Выключено'}
            </Label>
          </div>
        );

      case 'select':
        return (
          <Select value={value || field.defaultValue} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите опцию" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label[language] || option.label.ru}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'media':
        return (
          <div className="space-y-2">
            <Input
              value={value?.url || ''}
              onChange={(e) => onChange({ ...value, url: e.target.value })}
              placeholder="URL медиа файла"
            />
            <Button variant="outline" size="sm" className="w-full">
              Выбрать файл
            </Button>
            {value?.url && (
              <div className="mt-2">
                <img
                  src={value.url}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded border"
                />
              </div>
            )}
          </div>
        );

      case 'cta-list':
        const buttons = value || [];
        return (
          <div className="space-y-3">
            {buttons.map((button: any, index: number) => (
              <Card key={index} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Кнопка {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newButtons = buttons.filter((_: any, i: number) => i !== index);
                        onChange(newButtons);
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                  <Input
                    value={button.text?.ru || ''}
                    onChange={(e) => {
                      const newButtons = [...buttons];
                      newButtons[index] = {
                        ...button,
                        text: { ...button.text, ru: e.target.value }
                      };
                      onChange(newButtons);
                    }}
                    placeholder="Текст кнопки (рус)"
                  />
                  <Input
                    value={button.link || ''}
                    onChange={(e) => {
                      const newButtons = [...buttons];
                      newButtons[index] = { ...button, link: e.target.value };
                      onChange(newButtons);
                    }}
                    placeholder="Ссылка"
                  />
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newButton = {
                  text: { ru: '', en: '' },
                  link: '',
                  style: 'primary'
                };
                onChange([...buttons, newButton]);
              }}
              className="w-full"
            >
              + Добавить кнопку
            </Button>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-50 rounded border text-center text-gray-500">
            Редактор для типа "{field.type}" не реализован
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {getLocalizedLabel(field.label)}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

// =============================================================================
// РЕДАКТОР АДАПТИВНЫХ НАСТРОЕК
// =============================================================================

const ResponsiveEditor: React.FC<ResponsiveEditorProps> = ({
  settings,
  responsiveSettings,
  onChange
}) => {
  const devices = [
    { key: 'mobile', name: 'Мобильный', icon: '📱' },
    { key: 'tablet', name: 'Планшет', icon: '💻' },
    { key: 'desktop', name: 'Десктоп', icon: '🖥️' }
  ];

  return (
    <Tabs defaultValue="mobile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {devices.map(device => (
          <TabsTrigger key={device.key} value={device.key} className="text-xs">
            <span className="mr-1">{device.icon}</span>
            {device.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {devices.map(device => (
        <TabsContent key={device.key} value={device.key} className="space-y-4">
          <div className="text-sm text-gray-600">
            Настройки для {device.name.toLowerCase()}
          </div>
          
          {/* Отступы */}
          <SpacingEditor
            label="Внутренние отступы"
            value={responsiveSettings[device.key]?.padding || settings.padding || {}}
            onChange={(padding) => {
              const deviceSettings = responsiveSettings[device.key] || {};
              onChange({
                ...responsiveSettings,
                [device.key]: { ...deviceSettings, padding }
              });
            }}
          />
          
          <SpacingEditor
            label="Внешние отступы"
            value={responsiveSettings[device.key]?.margin || settings.margin || {}}
            onChange={(margin) => {
              const deviceSettings = responsiveSettings[device.key] || {};
              onChange({
                ...responsiveSettings,
                [device.key]: { ...deviceSettings, margin }
              });
            }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

// =============================================================================
// ОСНОВНОЙ КОМПОНЕНТ ПАНЕЛИ СВОЙСТВ
// =============================================================================

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  block,
  language,
  onBlockUpdate,
  onClose,
  isOpen
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [localContent, setLocalContent] = useState(block.content);
  const [localSettings, setLocalSettings] = useState(block.settings);

  // Получаем конфигурацию блока
  const blockConfig = blockRegistry.getConfig(block.type);

  // Синхронизация с внешними изменениями
  useEffect(() => {
    setLocalContent(block.content);
    setLocalSettings(block.settings);
  }, [block]);

  // Применение изменений
  const applyChanges = useCallback(() => {
    onBlockUpdate(block.id, {
      content: localContent,
      settings: localSettings
    });
  }, [block.id, localContent, localSettings, onBlockUpdate]);

  // Автоматическое применение изменений через debounce
  useEffect(() => {
    const timeout = setTimeout(applyChanges, 500);
    return () => clearTimeout(timeout);
  }, [localContent, localSettings, applyChanges]);

  const handleContentChange = useCallback((fieldName: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const handleSettingsChange = useCallback((settingName: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [settingName]: value
    }));
  }, []);

  const handleResponsiveChange = useCallback((responsiveSettings: ResponsiveSettings) => {
    setLocalSettings(prev => ({
      ...prev,
      responsive: responsiveSettings
    }));
  }, []);

  if (!isOpen || !blockConfig) return null;

  return (
    <Card className="w-80 h-full border-l">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">{blockConfig.icon}</span>
              {blockConfig.name[language]}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {blockConfig.description[language]}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4">
            <TabsTrigger value="content" className="text-xs">Контент</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">Стиль</TabsTrigger>
            <TabsTrigger value="responsive" className="text-xs">Адаптив</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="content" className="m-0 p-4 space-y-4">
              {blockConfig.editableFields?.map((field, index) => (
                <FieldEditor
                  key={field.name}
                  field={field}
                  value={localContent[field.name]}
                  language={language}
                  onChange={(value) => handleContentChange(field.name, value)}
                />
              ))}
              
              {blockConfig.editableFields?.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Нет настраиваемых полей
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="m-0 p-4 space-y-4">
              {/* Цвета */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Цвета</Label>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs text-gray-500">Фон</Label>
                    <Input
                      type="color"
                      value={localSettings.backgroundColor || '#ffffff'}
                      onChange={(e) => handleSettingsChange('backgroundColor', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Текст</Label>
                    <Input
                      type="color"
                      value={localSettings.textColor || '#000000'}
                      onChange={(e) => handleSettingsChange('textColor', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Отступы */}
              <SpacingEditor
                label="Внутренние отступы"
                value={localSettings.padding || {}}
                onChange={(padding) => handleSettingsChange('padding', padding)}
              />

              <SpacingEditor
                label="Внешние отступы"
                value={localSettings.margin || {}}
                onChange={(margin) => handleSettingsChange('margin', margin)}
              />

              <Separator />

              {/* Дополнительные настройки */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Скругление углов</Label>
                  <Input
                    type="number"
                    value={localSettings.borderRadius || 0}
                    onChange={(e) => handleSettingsChange('borderRadius', parseInt(e.target.value) || 0)}
                    min={0}
                    max={50}
                    className="h-8"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Ширина контейнера</Label>
                  <Select
                    value={localSettings.width || 'full'}
                    onValueChange={(value) => handleSettingsChange('width', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Полная ширина</SelectItem>
                      <SelectItem value="container">Контейнер</SelectItem>
                      <SelectItem value="narrow">Узкий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Выравнивание</Label>
                  <Select
                    value={localSettings.alignment || 'left'}
                    onValueChange={(value) => handleSettingsChange('alignment', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">По левому краю</SelectItem>
                      <SelectItem value="center">По центру</SelectItem>
                      <SelectItem value="right">По правому краю</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="responsive" className="m-0 p-4">
              <ResponsiveEditor
                settings={localSettings}
                responsiveSettings={localSettings.responsive || {}}
                onChange={handleResponsiveChange}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PropertiesPanel;