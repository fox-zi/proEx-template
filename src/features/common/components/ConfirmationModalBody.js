import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MESSAGE_API } from '../../../utils/globalConstantUtil'
import { deleteProduct, deleteProductApi } from '../../products/productSlice'
import { showNotification } from '../headerSlice'
import { deleteExpense, deleteExpensesApi } from '../../expenses/expenseSlice'

function ConfirmationModalBody({ extraObject, closeModal}){

    const dispatch = useDispatch()

    const { message, type, id, index, parentId} = extraObject


    const proceedWithYes = async() => {
        if(type === CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE){
            const resultAction = await dispatch(deleteProductApi(id));
            closeModal()
            if (resultAction.payload?.data?.message === MESSAGE_API.DELETED_SUCCESS) {
                dispatch(deleteProduct({index}))
                dispatch(showNotification({message : "Product Deleted!", status : 1}))
                return
            }
            dispatch(showNotification({message : resultAction.payload.message, status : 0}))

        } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EXPENSE_DELETE){
            const params = { parentId: parentId, id: id }
            const resultAction = await dispatch(deleteExpensesApi(params));
            closeModal()
            if (resultAction.payload?.data?.message === MESSAGE_API.DELETED_SUCCESS) {
                dispatch(deleteExpense({index}))
                dispatch(showNotification({message : "Expense Deleted!", status : 1}))
                return
            }
            dispatch(showNotification({message : resultAction.payload.message, status : 0}))
        }
    }

    return(
        <>
        <p className=' text-xl mt-8 text-center'>
            {message}
        </p>

        <div className="modal-action mt-12">

                <button className="btn btn-outline   " onClick={() => closeModal()}>Cancel</button>

                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>

        </div>
        </>
    )
}

export default ConfirmationModalBody
