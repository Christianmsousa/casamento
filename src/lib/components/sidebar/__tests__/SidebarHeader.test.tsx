import React from 'react'
import { render } from '@testing-library/react'
import { SideBarHeader } from '../SidebarHeader'
import { useSidebar } from '../context'
import { useStoreManager } from '@/lib/hooks/store'
import { useSelectedStore } from '@/lib/hooks/useSelectedStore'
import { IconName } from '@/lib/components/icons'

// Mock dependencies
jest.mock('../context')
jest.mock('@/lib/hooks/store', () => ({
  useStoreManager: jest.fn(),
  MATRIX_STORE_ID: 'matriz',
}))
jest.mock('@/lib/hooks/useSelectedStore')

const mockSwitchToStore = jest.fn()
const mockSwitchToMatrix = jest.fn()
const mockHandleCreateStore = jest.fn()
const mockInitializeStoreOptions = jest.fn()
const mockToggleSidebar = jest.fn()

describe('SideBarHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSidebar as jest.Mock).mockReturnValue({
      sideBarData: { mainSidebar: true, subSidebar: false },
      toggleSidebar: mockToggleSidebar,
      selectedStore: null,
      initializeStoreOptions: mockInitializeStoreOptions,
    })
    ;(useStoreManager as jest.Mock).mockReturnValue({
      switchToStore: mockSwitchToStore,
      switchToMatrix: mockSwitchToMatrix,
    })
    ;(useSelectedStore as jest.Mock).mockReturnValue({
      handleCreateStore: mockHandleCreateStore,
    })
  })

  describe('Store options initialization', () => {
    it('When storeOptions are provided, then calls initializeStoreOptions with converted options', () => {
        // Arrange
      const storeOptions: Array<{
        id: string
        name: string
        number: string
        icon: IconName
        isMatrix: boolean
      }> = [
          {
            id: 'store-1',
            name: 'Store 1',
            number: 'Loja 1',
            icon: 'store',
            isMatrix: false,
          },
        ]

        // Act
      render(
        <SideBarHeader
          storeName="Store Name"
          storeNumber="Store Number"
          storeOptions={storeOptions}
        />,
      )

        // Assert
      expect(mockInitializeStoreOptions).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'store-1',
            name: 'Store 1',
            number: 'Loja 1',
            icon: 'store',
            isMatrix: false,
          }),
        ]),
      )
    })

    it('When storeOptions are updated, then calls initializeStoreOptions with new options', () => {
        // Arrange
      const initialStoreOptions: Array<{
        id: string
        name: string
        number: string
        icon: IconName
        isMatrix: boolean
      }> = [
          {
            id: 'store-1',
            name: 'Store 1',
            number: 'Loja 1',
            icon: 'store',
            isMatrix: false,
          },
        ]
      const updatedStoreOptions: Array<{
        id: string
        name: string
        number: string
        icon: IconName
        isMatrix: boolean
      }> = [
          {
            id: 'store-1',
            name: 'Store 1',
            number: 'Loja 1',
            icon: 'store',
            isMatrix: false,
          },
          {
            id: 'store-2',
            name: 'Store 2',
            number: 'Loja 2',
          icon: 'warehouse',
            isMatrix: false,
          },
        ]

      // Act
      const { rerender } = render(
        <SideBarHeader
          storeName="Store Name"
          storeNumber="Store Number"
          storeOptions={initialStoreOptions}
        />,
      )

      rerender(
        <SideBarHeader
          storeName="Store Name"
          storeNumber="Store Number"
          storeOptions={updatedStoreOptions}
        />,
      )

        // Assert
        expect(mockInitializeStoreOptions).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ id: 'store-1' }),
            expect.objectContaining({ id: 'store-2' }),
          ]),
        )
    })
  })
})
