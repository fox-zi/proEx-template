import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import productSlice from '../features/products/productSlice'
import expenseSlice from '../features/expenses/expenseSlice'
import reportExpensesSlice from '../features/calendar/reportExpensesSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  product : productSlice,
  expense : expenseSlice,
  reportExpenses: reportExpensesSlice,
}

export default configureStore({
    reducer: combinedReducer
})
