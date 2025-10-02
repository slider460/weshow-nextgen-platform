// Скрипт для проверки профиля администратора
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAdminProfile() {
  console.log('🔍 Проверка профиля администратора...\n')

  try {
    // 1. Проверяем всех пользователей в user_profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
    
    if (profilesError) {
      console.error('❌ Ошибка получения профилей:', profilesError)
      return
    }

    console.log(`📊 Всего профилей: ${profiles?.length || 0}\n`)
    
    if (profiles && profiles.length > 0) {
      profiles.forEach((profile, index) => {
        console.log(`👤 Профиль ${index + 1}:`)
        console.log(`   ID: ${profile.id}`)
        console.log(`   Имя: ${profile.full_name}`)
        console.log(`   Компания: ${profile.company_name}`)
        console.log(`   Телефон: ${profile.phone_number}`)
        console.log(`   Роль: ${profile.role}`)
        console.log(`   Создан: ${profile.created_at}`)
        console.log('')
      })
    } else {
      console.log('⚠️  Профилей не найдено!')
    }

    // 2. Пробуем войти с admin@weshow.ru
    console.log('🔐 Попытка входа с admin@weshow.ru...\n')
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    })

    if (authError) {
      console.error('❌ Ошибка входа:', authError.message)
      return
    }

    console.log('✅ Вход успешен!')
    console.log(`   User ID: ${authData.user?.id}`)
    console.log(`   Email: ${authData.user?.email}`)
    
    // 3. Проверяем профиль этого пользователя
    const { data: userProfile, error: userProfileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authData.user?.id)
      .single()
    
    if (userProfileError) {
      console.error('\n❌ Профиль не найден в user_profiles!')
      console.error('   Ошибка:', userProfileError.message)
      console.log('\n💡 Решение: Нужно создать профиль для этого пользователя')
      
      // Создаем профиль
      console.log('\n🔧 Создаю профиль...')
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user?.id,
          full_name: 'Администратор',
          company_name: 'WeShow',
          phone_number: '+7 (495) 580-75-37',
          role: 'admin'
        })
        .select()
        .single()
      
      if (createError) {
        console.error('❌ Ошибка создания профиля:', createError)
      } else {
        console.log('✅ Профиль успешно создан!')
        console.log(`   ID: ${authData.user?.id}`)
        console.log(`   Роль: admin`)
      }
      
      return
    }

    console.log('\n✅ Профиль найден!')
    console.log(`   Имя: ${userProfile.full_name}`)
    console.log(`   Роль: ${userProfile.role}`)
    console.log(`   Компания: ${userProfile.company_name}`)
    
    if (userProfile.role !== 'admin' && userProfile.role !== 'manager') {
      console.log('\n⚠️  ВНИМАНИЕ: Роль не admin и не manager!')
      console.log(`   Текущая роль: ${userProfile.role}`)
      console.log('\n💡 Обновляю роль на admin...')
      
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ role: 'admin' })
        .eq('id', authData.user?.id)
      
      if (updateError) {
        console.error('❌ Ошибка обновления роли:', updateError)
      } else {
        console.log('✅ Роль обновлена на admin!')
      }
    } else {
      console.log('\n✅ Всё в порядке! Роль корректная.')
    }

    // Выходим
    await supabase.auth.signOut()

  } catch (error) {
    console.error('❌ Неожиданная ошибка:', error)
  }
}

checkAdminProfile()


