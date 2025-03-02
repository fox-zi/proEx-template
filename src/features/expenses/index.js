import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { getExpensesApi } from "./expenseSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { useParams } from "react-router-dom"
import SearchBar from "../../components/Input/SearchBar"

const TopSideButtons = ({applySearch, searchText, setSearchText, productId}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchText.length >= 3 || searchText.length === 0) {
            applySearch()
        }
    }, [searchText])

    const openAddNewExpenseModal = () => {
        dispatch(openModal({ title: "Add New Expense", bodyType: MODAL_BODY_TYPES.EXPENSE_ADD_NEW, extraObject: { productId: productId } }))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary mr-4" onClick={() => openAddNewExpenseModal()}>Add New</button>
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
        </div>
    )
}

function Expenses() {
    const { productId } = useParams()
    const { expenses } = useSelector(state => state.expense)
    const dispatch = useDispatch()
    const [sortField, setSortField] = useState('id')
    const [sortDirection, setSortDirection] = useState('asc')
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        dispatch(getExpensesApi({
            productId: productId,
            keyword: searchText,
            sortField: sortField,
            sortDirection: sortDirection
        }))
    }, [dispatch, productId])

    const deleteCurrentExpense = (index, id) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { parentId: productId, id: id, message: `Are you sure you want to delete this Expenses?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.EXPENSE_DELETE, index }
        }))
    }

    const applySearch = () => {
        const newParams = {
            sortField: sortField,
            sortDirection: sortDirection,
            productId: productId,
            keyword: searchText,
        }
        dispatch(getExpensesApi(newParams))
    }

    const handleSort = (field) => {
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
        setSortField(field)
        setSortDirection(newDirection)

        const sortedExpenses = [...expenses].sort((a, b) => {
            if (field === 'date' || field === 'created_at') {
                return sortDirection === 'asc'
                    ? new Date(a[field]) - new Date(b[field])
                    : new Date(b[field]) - new Date(a[field])
            }
            return sortDirection === 'asc'
                ? a[field] > b[field] ? 1 : -1
                : b[field] > a[field] ? 1 : -1
        })
        dispatch(getExpensesApi({
            productId: productId,
            keyword: searchText,
            sortField: sortField,
            sortDirection: sortDirection
        }))
    }

    return (
        <>

            <TitleCard title="Recent Transactions" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} searchText={searchText} setSearchText={setSearchText} productId={productId}/>}>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                    <button className="flex items-center" onClick={() => handleSort('name')}>
                                        Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button className="flex items-center" onClick={() => handleSort('price')}>
                                        Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button className="flex items-center" onClick={() => handleSort('date')}>
                                        Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button className="flex items-center" onClick={() => handleSort('created_at')}>
                                        Created At {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{l.name}</td>
                                            <td>{l.price}</td>
                                            <td>{moment(new Date(l.date), 'days').format("DD MMM YY")}</td>
                                            <td>{moment(new Date(l.created_at), 'days').format("DD MMM YY")}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentExpense(k, l.id)}><TrashIcon className="w-5" /></button></td>
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


export default Expenses
