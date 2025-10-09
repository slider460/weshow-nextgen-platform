import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart, Plus } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { toast } from 'sonner'

interface AddToCartButtonProps {
  equipmentId: string
  name: string
  category: string
  price: number
  image?: string
  className?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  equipmentId,
  name,
  category,
  price,
  image,
  className,
  variant = 'default',
  size = 'default'
}) => {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      equipmentId,
      name,
      category,
      price,
      quantity: 1,
      image
    })

    toast.success(`${name} добавлен в корзину!`, {
      description: 'Товар успешно добавлен в корзину',
      duration: 3000
    })
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
      variant={variant}
      size={size}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Добавить в корзину
    </Button>
  )
}




