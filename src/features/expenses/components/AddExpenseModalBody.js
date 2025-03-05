import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { createExpensesApi, addNewExpense } from "../expenseSlice"

const INITIAL_EXPENSE_OBJ = {
    name: "",
    date: new Date().toISOString().split('T')[0],
    price: 0
}

function AddExpenseModalBody({ extraObject, closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [expenseObj, setExpenseObj] = useState(INITIAL_EXPENSE_OBJ)

    const saveNewExpense = async () => {
        if (expenseObj.name.trim() === "") return setErrorMessage("Name is required!")

        const expenseData = {
            name: expenseObj.name,
            date: expenseObj.date,
            price: expenseObj.price,
            productId: extraObject.productId
        };

        const resultAction = await dispatch(createExpensesApi(expenseData));

        if (createExpensesApi.fulfilled.match(resultAction)) {
            dispatch(showNotification({ message: "New Expense Added!", status: 1 }))
            dispatch(addNewExpense(resultAction.payload))  // Pass the new product data
            closeModal()
        } else {
            dispatch(showNotification({ message: resultAction.payload.message, status: 0 }))
            setErrorMessage(resultAction.payload.detail)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setExpenseObj({ ...expenseObj, [updateType]: value })
    }

    return (
        <>

            <InputText type="text" defaultValue={expenseObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

            <InputText type="price" defaultValue={expenseObj.price} updateType="price" containerStyle="mt-4" labelTitle="Price" updateFormValue={updateFormValue} />

            <InputText type="date" defaultValue={expenseObj.date} updateType="date" containerStyle="mt-4" labelTitle="Date" updateFormValue={updateFormValue} />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewExpense()}>Save</button>
            </div>
        </>
    )
}

export default AddExpenseModalBody
