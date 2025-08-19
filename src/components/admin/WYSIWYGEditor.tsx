import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WYSIWYGEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  label?: string;
  error?: string;
  className?: string;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  value,
  onChange,
  placeholder = 'Начните писать...',
  maxLength,
  label,
  error,
  className = '',
}) => {
  const [charCount, setCharCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    if (maxLength) {
      const count = value.replace(/<[^>]*>/g, '').length;
      setCharCount(count);
      setIsOverLimit(count > maxLength);
    }
  }, [value, maxLength]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block', 'blockquote'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'direction',
    'code-block', 'script',
  ];

  const handleChange = (content: string) => {
    onChange(content);
  };

  const getCharCountColor = () => {
    if (!maxLength) return 'text-gray-500';
    if (isOverLimit) return 'text-red-500';
    if (charCount > maxLength * 0.9) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className={`border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[200px]"
        />
      </div>

      {maxLength && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {isOverLimit ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            <span className={getCharCountColor()}>
              {charCount} / {maxLength} символов
            </span>
          </div>
          
          {isOverLimit && (
            <span className="text-red-500 font-medium">
              Превышен лимит символов
            </span>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {maxLength && charCount > maxLength * 0.8 && !isOverLimit && (
        <Alert>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-700">
            Приближается лимит символов ({Math.round((charCount / maxLength) * 100)}%)
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WYSIWYGEditor;
