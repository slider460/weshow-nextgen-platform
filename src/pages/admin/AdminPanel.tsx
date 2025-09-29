import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminManagement from './AdminManagement'
import EstimatesManagement from './EstimatesManagement'
import EquipmentManagement from './EquipmentManagement'
import EquipmentBlocksManagement from './EquipmentBlocksManagement'
import ServicesBlocksManagement from './ServicesBlocksManagement'
import CasesManagement from './CasesManagement'
import AdminTest from './AdminTest'

// Заглушки для недостающих разделов
const SolutionsManagement = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Комплексные решения</h1>
    <p>Раздел в разработке</p>
  </div>
)

const ArticlesManagement = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Управление статьями</h1>
    <p>Раздел в разработке</p>
  </div>
)

const UsersManagement = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Управление пользователями</h1>
    <p>Раздел в разработке</p>
  </div>
)

const AdminPanel: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/test" element={<AdminTest />} />
      <Route path="/" element={<AdminLayout><AdminManagement /></AdminLayout>} />
      <Route path="/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/estimates" element={<AdminLayout><EstimatesManagement /></AdminLayout>} />
      <Route path="/equipment" element={<AdminLayout><EquipmentManagement /></AdminLayout>} />
      <Route path="/equipment-blocks" element={<AdminLayout><EquipmentBlocksManagement /></AdminLayout>} />
      <Route path="/services-blocks" element={<AdminLayout><ServicesBlocksManagement /></AdminLayout>} />
      <Route path="/cases" element={<AdminLayout><CasesManagement /></AdminLayout>} />
      <Route path="/solutions" element={<AdminLayout><SolutionsManagement /></AdminLayout>} />
      <Route path="/articles" element={<AdminLayout><ArticlesManagement /></AdminLayout>} />
      <Route path="/users" element={<AdminLayout><UsersManagement /></AdminLayout>} />
      <Route path="*" element={<Navigate to="/admin/" replace />} />
    </Routes>
  )
}

export default AdminPanel
