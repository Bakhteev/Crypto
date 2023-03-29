import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface GlobalLoading {
  isLoading: boolean
}

const initialState: GlobalLoading = {
  isLoading: false
}

export const globalLoadingSlice = createSlice({
  name: 'GlobalLoading',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    }
  }
})

export const { setIsLoading } = globalLoadingSlice.actions
