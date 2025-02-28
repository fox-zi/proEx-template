import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import productSlice from '../features/products/productSlice'
import expenseSlice from '../features/expenses/expenseSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  product : productSlice,
  expense : expenseSlice
}

export default configureStore({
    reducer: combinedReducer
})
