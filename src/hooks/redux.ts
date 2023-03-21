import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector
