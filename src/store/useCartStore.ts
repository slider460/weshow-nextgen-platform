import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Типы для корзины
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface ServiceOptions {
  delivery: boolean
  installation: boolean
  support: boolean
  content: boolean
}

export interface CartState {
  items: CartItem[]
  services: ServiceOptions
  totalItems: number
  totalPrice: number
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleService: (service: keyof ServiceOptions) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const initialState: CartState = {
  items: [],
  services: {
    delivery: false,
    installation: false,
    support: false,
    content: false
  },
  totalItems: 0,
  totalPrice: 0
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (item, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(i => i.id === item.id)
        
        if (existingItem) {
          // Увеличиваем количество существующего товара
          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          })
        } else {
          // Добавляем новый товар
          const newItem: CartItem = {
            ...item,
            quantity
          }
          set({
            items: [...items, newItem]
          })
        }
        
        // Пересчитываем общие значения
        const newItems = get().items
        set({
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        })
      },

      removeItem: (id) => {
        const { items } = get()
        const newItems = items.filter(item => item.id !== id)
        
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        const { items } = get()
        const newItems = items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
        
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        })
      },

      toggleService: (service) => {
        const { services } = get()
        set({
          services: {
            ...services,
            [service]: !services[service]
          }
        })
      },

      clearCart: () => {
        set(initialState)
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        services: state.services
      })
    }
  )
)
