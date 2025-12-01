import { supabase } from '../config/supabase';

export interface UploadResponse {
  url: string;
  path: string;
  size: number;
  type: string;
}

export const uploadImage = async (file: File, folder: string = 'uploads'): Promise<UploadResponse> => {
  try {
    // Генерируем уникальное имя файла
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    // Загружаем файл в Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Ошибка загрузки файла: ${error.message}`);
    }

    // Получаем публичный URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error('Не удалось получить публичный URL файла');
    }

    return {
      url: urlData.publicUrl,
      path: filePath,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};

export const deleteImage = async (path: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) {
      console.error('Error deleting file:', error);
      throw new Error(`Ошибка удаления файла: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
};
