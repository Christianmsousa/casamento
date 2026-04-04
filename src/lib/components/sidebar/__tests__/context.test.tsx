import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { SidebarProvider, useSidebar } from '../context'
import { useToast } from '@/lib/hooks/shared/useToast'

// Mock dependencies
jest.mock('@/lib/hooks/shared/useToast')
jest.mock('@/lib/hooks/shared/useAlertDialog', () => ({
  useAlertDialog: () => ({
    confirm: jest.fn(),
    AlertDialogComponent: null,
  }),
}))

const mockToast = jest.fn()

describe('SidebarContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useToast as jest.Mock).mockReturnValue(mockToast)
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>{children}</SidebarProvider>
  )

  describe('validateStoreOnFocus', () => {
    describe('When store does not exist', () => {
      it('When user returns to window and selected store was deleted but there are other stores available, then shows warning toast and selects first store automatically', () => {
        // Arrange
        const selectedStore = {
          id: 'deleted-store',
          name: 'Loja Deletada',
          number: 'Loja 1',
        }
        const availableStores = [
          { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
        ]

        const { result } = renderHook(() => useSidebar(), { wrapper })

        // Set selected store first
        act(() => {
          result.current.setSelectedStore(selectedStore, true)
        })

        // Act
        act(() => {
          result.current.validateStoreOnFocus(availableStores)
        })

        // Assert
        expect(mockToast).toHaveBeenCalledWith({
          status: 'warning',
          title: 'Loja não disponível',
          description: expect.stringContaining('Loja Deletada'),
          toastId: 'store-unavailable-deleted-store',
        })
        expect(result.current.selectedStore).toEqual(availableStores[0])
      })

      it('When user returns to window and selected store was deleted and there are no other stores available, then shows warning toast and clears selection', () => {
        // Arrange
        const selectedStore = {
          id: 'deleted-store',
          name: 'Loja Deletada',
          number: 'Loja 1',
        }
        const availableStores: Array<{
          id: string
          name: string
          number: string
          icon?: string
        }> = []

        const { result } = renderHook(() => useSidebar(), { wrapper })

        // Set selected store first
        act(() => {
          result.current.setSelectedStore(selectedStore, true)
        })

        // Act
        act(() => {
          result.current.validateStoreOnFocus(availableStores)
        })

        // Assert
        expect(mockToast).toHaveBeenCalledWith({
          status: 'warning',
          title: 'Loja não disponível',
          description: expect.stringContaining('Nenhuma loja disponível'),
          toastId: 'store-unavailable-deleted-store',
        })
        expect(result.current.selectedStore).toBeNull()
      })
    })

    describe('When store exists but data changed', () => {
      it('When user returns to window and selected store exists but data (name, icon, number) changed on server, then updates data silently without showing notifications', () => {
        // Arrange
        const selectedStore = {
          id: 'store-1',
          name: 'Loja Antiga',
          icon: 'store',
          number: 'Loja 1',
        }
        const availableStores = [
          {
            id: 'store-1',
            name: 'Loja Nova',
            icon: 'warehouse',
            number: 'Loja 1',
          },
        ]

        const { result } = renderHook(() => useSidebar(), { wrapper })

        // Set selected store first
        act(() => {
          result.current.setSelectedStore(selectedStore, true)
        })

        // Act
        act(() => {
          result.current.validateStoreOnFocus(availableStores)
        })

        // Assert
        expect(mockToast).not.toHaveBeenCalled()
        expect(result.current.selectedStore).toEqual(availableStores[0])
      })
    })

    describe('When store exists and data did not change', () => {
      it('When user returns to window and selected store exists and data did not change, then does not perform any operation', () => {
        // Arrange
        const selectedStore = {
          id: 'store-1',
          name: 'Loja 1',
          number: 'Loja 1',
        }
        const availableStores = [
          { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
        ]

        const { result } = renderHook(() => useSidebar(), { wrapper })

        // Set selected store first
        act(() => {
          result.current.setSelectedStore(selectedStore, true)
        })

        // Act
        act(() => {
          result.current.validateStoreOnFocus(availableStores)
        })

        // Assert
        expect(mockToast).not.toHaveBeenCalled()
      })
    })

    describe('When no store is selected', () => {
      it('When user returns to window and there is no store selected, then does not perform any operation', () => {
        // Arrange
        const availableStores = [
          { id: 'store-1', name: 'Loja 1', number: 'Loja 1' },
        ]

        const { result } = renderHook(() => useSidebar(), { wrapper })

        // Act
        act(() => {
          result.current.validateStoreOnFocus(availableStores)
        })

        // Assert
        expect(mockToast).not.toHaveBeenCalled()
      })
    })
  })

  describe('Window Focus Listener', () => {
    it('When browser window gains focus and there are available stores, then calls validateStoreOnFocus with available stores', () => {
      // Arrange
      const availableStores = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
      ]
      const selectedStore = {
        id: 'store-1',
        name: 'Loja 1',
        number: 'Loja 1',
        icon: 'store',
      }

      const { result } = renderHook(() => useSidebar(), { wrapper })

      // Set selected store first
      act(() => {
        result.current.setSelectedStore(selectedStore, true)
      })

      // Initialize store options to set available stores
      act(() => {
        result.current.initializeStoreOptions(availableStores)
      })

      // Clear previous toast calls
      jest.clearAllMocks()

      // Act
      act(() => {
        window.dispatchEvent(new Event('focus'))
      })

      // Assert - validateStoreOnFocus should be called when window gains focus
      // Since store exists and data matches, toast should not be called
      expect(mockToast).not.toHaveBeenCalled()
    })

    it('When component unmounts, then removes window focus event listener to prevent memory leaks', () => {
      // Arrange
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
      const availableStores = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
      ]

      // Act
      const { result, unmount } = renderHook(() => useSidebar(), { wrapper })

      act(() => {
        result.current.initializeStoreOptions(availableStores)
      })

      unmount()

      // Assert
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'focus',
        expect.any(Function),
      )

      removeEventListenerSpy.mockRestore()
    })
  })

  describe('initializeStoreOptions', () => {
    it('When storeOptions are initialized and there is no store selected, then selects first store from list automatically', () => {
      // Arrange
      const storeOptions = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
      ]

      const { result } = renderHook(() => useSidebar(), { wrapper })

      // Act
      act(() => {
        result.current.initializeStoreOptions(storeOptions)
      })

      // Assert
      expect(result.current.selectedStore).toEqual(storeOptions[0])
    })

    it('When storeOptions are initialized and there is already a store selected, then does not change selected store', () => {
      // Arrange
      const existingStore = {
        id: 'store-existing',
        name: 'Loja Existente',
        number: 'Loja 1',
        icon: 'store',
      }
      const newStoreOptions = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
      ]

      const { result } = renderHook(() => useSidebar(), { wrapper })

      // Set existing store first
      act(() => {
        result.current.setSelectedStore(existingStore, true)
      })

      // Act
      act(() => {
        result.current.initializeStoreOptions(newStoreOptions)
      })

      // Assert
      expect(result.current.selectedStore).toEqual(existingStore)
    })

    it('When storeOptions are updated, then availableStores are updated for future validations', () => {
      // Arrange
      const initialStoreOptions = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
      ]
      const updatedStoreOptions = [
        { id: 'store-1', name: 'Loja 1', number: 'Loja 1', icon: 'store' },
        { id: 'store-2', name: 'Loja 2', number: 'Loja 2', icon: 'warehouse' },
      ]
      const selectedStore = {
        id: 'store-1',
        name: 'Loja 1',
        number: 'Loja 1',
        icon: 'store',
      }

      const { result } = renderHook(() => useSidebar(), { wrapper })

      act(() => {
        result.current.setSelectedStore(selectedStore, true)
      })

      act(() => {
        result.current.initializeStoreOptions(initialStoreOptions)
      })

      // Act - update store options
      act(() => {
        result.current.initializeStoreOptions(updatedStoreOptions)
      })

      // Act - validate with updated stores (store should still exist)
      act(() => {
        result.current.validateStoreOnFocus(updatedStoreOptions)
      })

      // Assert - No toast should be shown since store still exists
      expect(mockToast).not.toHaveBeenCalled()
    })
  })
})
