import { getEquipment, getEquipmentByCategory, getCategories, searchEquipment } from './equipment';

// Простой API роутер для Vite dev server
export async function handleApiRequest(url: string, method: string = 'GET') {
  const path = url.replace('/api/', '');
  
  try {
    switch (path) {
      case 'equipment':
        if (method === 'GET') {
          const equipment = await getEquipment();
          return new Response(JSON.stringify(equipment), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        break;
        
      case 'categories':
        if (method === 'GET') {
          const categories = await getCategories();
          return new Response(JSON.stringify(categories), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        break;
        
      default:
        if (path.startsWith('equipment/search/')) {
          const query = decodeURIComponent(path.replace('equipment/search/', ''));
          const equipment = await searchEquipment(query);
          return new Response(JSON.stringify(equipment), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        if (path.startsWith('equipment/category/')) {
          const categoryId = path.replace('equipment/category/', '');
          const equipment = await getEquipmentByCategory(categoryId);
          return new Response(JSON.stringify(equipment), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
        break;
    }
    
    return new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
