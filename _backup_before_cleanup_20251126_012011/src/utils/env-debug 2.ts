// Диагностика переменных окружения
export const debugEnvironment = () => {
  console.log('=== ENVIRONMENT DEBUG ===');
  console.log('import.meta.env:', import.meta.env);
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '***defined***' : 'undefined');
  console.log('Mode:', import.meta.env.MODE);
  console.log('Dev:', import.meta.env.DEV);
  console.log('Prod:', import.meta.env.PROD);
  console.log('Base URL:', import.meta.env.BASE_URL);
  console.log('========================');
  
  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD
  };
};

// Fallback значения для Supabase
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://zbykhdjqrtqftfitbvbt.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'
};
