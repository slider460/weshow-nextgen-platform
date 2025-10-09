import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export const HeaderCart: React.FC = () => {
  const navigate = useNavigate()
  const totalItems = useCartStore((state) => state.totalItems)

  // Скрываем компонент, если корзина пуста
  if (totalItems === 0) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate('/cart')}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      <Badge
        variant="destructive"
        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
      >
        {totalItems}
      </Badge>
    </Button>
  )
}




