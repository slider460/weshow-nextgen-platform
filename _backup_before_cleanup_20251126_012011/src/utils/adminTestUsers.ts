// Тестовые пользователи для админ панели
export const ADMIN_TEST_USERS = {
  admin: {
    email: 'admin@weshow.ru',
    password: 'password',
    role: 'admin',
    name: 'Администратор',
    company_name: 'WeShow'
  },
  manager: {
    email: 'manager@weshow.ru', 
    password: 'password',
    role: 'manager',
    name: 'Менеджер',
    company_name: 'WeShow'
  }
}

// Функция для проверки тестовых пользователей
export const isTestUser = (email: string, password: string) => {
  const user = Object.values(ADMIN_TEST_USERS).find(
    u => u.email === email && u.password === password
  )
  return user || null
}

// Функция для создания тестовых пользователей в Supabase
export const createTestUsers = async () => {
  const { supabase } = await import('../config/supabase')
  
  for (const [key, user] of Object.entries(ADMIN_TEST_USERS)) {
    try {
      // Проверяем, существует ли пользователь
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single()

      if (!existingUser) {
        // Создаем пользователя
        const { data: authUser, error: authError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
        })

        if (authError) {
          console.error(`Error creating auth user for ${user.email}:`, authError)
          continue
        }

        if (authUser.user) {
          // Создаем профиль пользователя
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: authUser.user.id,
              email: user.email,
              name: user.name,
              company_name: user.company_name,
              role: user.role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (profileError) {
            console.error(`Error creating profile for ${user.email}:`, profileError)
          } else {
            console.log(`✅ Test user ${user.email} created successfully`)
          }
        }
      } else {
        console.log(`ℹ️ Test user ${user.email} already exists`)
      }
    } catch (error) {
      console.error(`Error processing test user ${user.email}:`, error)
    }
  }
}
