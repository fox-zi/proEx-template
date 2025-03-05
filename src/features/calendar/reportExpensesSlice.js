import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReportExpensesApi = createAsyncThunk('/report/expenses', async (date) => {
	const response = await axios.get(`/api/v1/report/expenses?date=${date}`)
	return response.data;
})

export const reportExpensesSlice = createSlice({
    name: 'reportExpenses',
    initialState: {
        isLoading: false,
        data : {}
    },

    extraReducers: {
		[getReportExpensesApi.pending]: state => {
			state.isLoading = true
		},
		[getReportExpensesApi.fulfilled]: (state, action) => {
			state.data = {
				...state.data,
				[action.meta.arg]: action.payload.data
			}
			state.isLoading = false
		},
		[getReportExpensesApi.rejected]: state => {
			state.isLoading = false
		},
    }
})

export default reportExpensesSlice.reducer
