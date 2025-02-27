import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteProduct, getProducts } from "./productSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewProductModal = () => {
        dispatch(openModal({ title: "Add New Product", bodyType: MODAL_BODY_TYPES.PRODUCT_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewProductModal()}>Add New</button>
        </div>
    )
}

function Products() {

    const { products } = useSelector(state => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])


    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }


    const deleteCurrentProduct = (index, id) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { id: id, message: `Are you sure you want to delete this Product?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE, index }
        }))
    }

    return (
        <>

            <TitleCard title="Current Products" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Default</th>
                                <th>Date</th>
                                <th>Created At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{l.name}</td>
                                            <td className="flex items-center gap-2 p-2">
                                                <span
                                                    className="rounded-[5px] p-2"
                                                    style={{ backgroundColor: l.color }}
                                                    >{l.color}
                                                </span>
                                            </td>
                                            <td>{l.price}</td>
                                            <td>{l.default?.toString()}</td>
                                            <td>{moment(new Date(l.date)).add(-5 * (k + 2), 'days').format("DD MMM YY")}</td>
                                            <td>{moment(new Date(l.created_at)).add(-5 * (k + 2), 'days').format("DD MMM YY")}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentProduct(k, l.id)}><TrashIcon className="w-5" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Products
