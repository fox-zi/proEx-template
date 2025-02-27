import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('/products/index', async () => {
	const response = await axios.get('/api/v1/products', {})
	return response.data;
})

export const addProduct = createAsyncThunk('/products/create', async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/v1/products', productData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});

export const deleteProductApi = createAsyncThunk('/products/delete', async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`api/v1/products/${productId}`);
        return response.data; // Ensure the response data is returned
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
    }
});


export const productSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        products : []
    },
    reducers: {
        addNewProduct: (state, action) => {
            let { data } = action.payload
            state.products = [data, ...state.products]
        },

        deleteProduct: (state, action) => {
            let {index} = action.payload
            state.products.splice(index, 1)
        }
    },

    extraReducers: {
		[getProducts.pending]: state => {
			state.isLoading = true
		},
		[getProducts.fulfilled]: (state, action) => {
			state.products = action.payload.data
			state.isLoading = false
		},
		[getProducts.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer
