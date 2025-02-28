import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addProduct, addNewProduct } from "../expenseSlice"

const INITIAL_PRODUCT_OBJ = {
    name : "",
    color : "",
    date : "",
    price: 0,
}

function AddProductModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [productObj, setproductObj] = useState(INITIAL_PRODUCT_OBJ)

    const saveNewProduct = async () =>  {
        if(productObj.name.trim() === "") return setErrorMessage("Name is required!")

        const productData = {
            name: productObj.name,
            color: productObj.color,
            date: productObj.date,
            price: productObj.price
        };

        const resultAction = await dispatch(addProduct(productData));

        if (addProduct.fulfilled.match(resultAction)) {
            dispatch(showNotification({ message : "New Product Added!", status : 1 }))
            dispatch(addNewProduct(resultAction.payload))  // Pass the new product data
            closeModal()
        } else {
            dispatch(showNotification({ message : resultAction.payload.message, status : 0 }))
            setErrorMessage(resultAction.payload.detail)
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setproductObj({...productObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={productObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>

            <InputText type="color" defaultValue={productObj.color} updateType="color" containerStyle="mt-4 bd-4" labelTitle="Color" updateFormValue={updateFormValue}/>

            <InputText type="number" defaultValue={productObj.price} updateType="price" containerStyle="mt-4" labelTitle="Price" updateFormValue={updateFormValue}/>

            <InputText type="date" defaultValue={productObj.date} updateType="date" containerStyle="mt-4" labelTitle="Date" updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewProduct()}>Save</button>
            </div>
        </>
    )
}

export default AddProductModalBody
