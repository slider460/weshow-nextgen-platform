import { supabase } from '../config/supabase'
import { Image, ImageInsert, ImageUpdate } from '../types/database'

// Конвертация File в base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Убираем префикс "data:image/jpeg;base64," и оставляем только base64
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

// Конвертация base64 в data URL для отображения
export const base64ToDataUrl = (base64: string, mimeType: string): string => {
  return `data:${mimeType};base64,${base64}`
}

// Получить изображение по ID
export const getImageById = async (id: string): Promise<Image | null> => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching image:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getImageById:', error)
    throw error
  }
}

// Загрузить изображение в БД
export const uploadImageToDB = async (file: File): Promise<Image> => {
  try {
    console.log('📤 Загружаем изображение в БД:', file.name)
    
    // Конвертируем файл в base64
    const base64Data = await fileToBase64(file)
    
    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}_${randomString}.${fileExtension}`
    
    // Получаем размеры изображения (опционально)
    const dimensions = await getImageDimensions(file)
    
    // Создаем запись в БД
    const imageData: ImageInsert = {
      filename,
      original_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      data: base64Data,
      width: dimensions.width,
      height: dimensions.height
    }
    
    const { data, error } = await supabase
      .from('images')
      .insert(imageData)
      .select()
      .single()
    
    if (error) {
      console.error('Error uploading image to DB:', error)
      throw error
    }
    
    console.log('✅ Изображение загружено в БД:', data.id)
    return data
  } catch (error) {
    console.error('Error in uploadImageToDB:', error)
    throw error
  }
}

// Получить размеры изображения
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      resolve({ width: 0, height: 0 })
    }
    img.src = URL.createObjectURL(file)
  })
}

// Удалить изображение из БД
export const deleteImageFromDB = async (id: string): Promise<void> => {
  try {
    console.log('🗑️ Удаляем изображение из БД:', id)
    
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting image from DB:', error)
      throw error
    }
    
    console.log('✅ Изображение удалено из БД')
  } catch (error) {
    console.error('Error in deleteImageFromDB:', error)
    throw error
  }
}

// Получить все изображения (с пагинацией)
export const getImages = async (limit: number = 50, offset: number = 0): Promise<Image[]> => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) {
      console.error('Error fetching images:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getImages:', error)
    throw error
  }
}

// Обновить изображение
export const updateImage = async (id: string, updates: ImageUpdate): Promise<Image> => {
  try {
    const { data, error } = await supabase
      .from('images')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating image:', error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error in updateImage:', error)
    throw error
  }
}

// Получить URL изображения для отображения
export const getImageUrl = (image: Image): string => {
  return base64ToDataUrl(image.data, image.mime_type)
}

// Получить URL миниатюры (если есть)
export const getThumbnailUrl = (image: Image): string | null => {
  if (image.thumbnail_data) {
    return base64ToDataUrl(image.thumbnail_data, image.mime_type)
  }
  return null
}
