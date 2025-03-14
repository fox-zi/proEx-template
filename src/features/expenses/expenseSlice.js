import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getExpensesApi = createAsyncThunk('/expenses/index', async (params) => {
    const { productId, keyword, sortField, sortDirection } = params
	const response = await axios.get(
		`/api/v1/products/${productId}/expenses?keyword=${keyword}&sort_field=${sortField || ''}&sort_direction=${sortDirection || ''}`
	)
	return response.data;
})

export const createExpensesApi = createAsyncThunk('/expenses/create', async (expenseData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/v1/products/${expenseData.productId}/expenses`, expenseData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});

export const deleteExpensesApi = createAsyncThunk('/expenses/delete', async (params, { rejectWithValue }) => {
    try {
        const { parentId, id } = params
        const response = await axios.delete(`/api/v1/products/${parentId}/expenses/${id}`);
        return response.data; // Ensure the response data is returned
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});


export const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        isLoading: false,
        expenses : []
    },
    reducers: {
        addNewExpense: (state, action) => {
            let { data } = action.payload
            state.expenses = [data, ...state.expenses]
        },

        deleteExpense: (state, action) => {
            let {index} = action.payload
            state.expenses.splice(index, 1)
        }
    },

    extraReducers: {
		[getExpensesApi.pending]: state => {
			state.isLoading = true
		},
		[getExpensesApi.fulfilled]: (state, action) => {
			state.expenses = action.payload.data
			state.isLoading = false
		},
		[getExpensesApi.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewExpense, deleteExpense } = expenseSlice.actions

export default expenseSlice.reducer
