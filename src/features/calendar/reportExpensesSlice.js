import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReportExpensesApi = createAsyncThunk('/reports/monthly/expenses', async (date) => {
	const response = await axios.get(`/api/v1/reports/monthly/expenses?date=${date}`)
	return response.data;
})

export const getSummaryReportExpensesApi = createAsyncThunk('/reports/monthly/summary', async (date) => {
	const response = await axios.get(`/api/v1/reports/monthly/summary?date=${date}`)
	return response.data;
})

export const reportExpensesSlice = createSlice({
    name: 'reportExpenses',
    initialState: {
        isLoading: false,
        data : {},
				summary: {}
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

			[getSummaryReportExpensesApi.pending]: state => {
				state.isLoading = true
			},
			[getSummaryReportExpensesApi.fulfilled]: (state, action) => {
				state.summary = {
					...state.summary,
					[action.meta.arg]: action.payload.data
				}
				state.isLoading = false
			},
			[getSummaryReportExpensesApi.rejected]: state => {
				state.isLoading = false
			},
    }
})

export default reportExpensesSlice.reducer
