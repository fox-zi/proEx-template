import React from "react";
import DashboardStats from '../../dashboard/components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import { formatValue } from '../../../utils/priceFormat';

const statsData = [
    { title: "Thu nhập", value: "123.123.123", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
    { title: "Chi tiêu", value: "123.123.123", icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
    { title: "Tổng", value: "123.123.123", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
]

const MonthlyExpenses = ({ expenses }) => {

    const groupedByDate = () => {
        return expenses.reduce((result, item) => {
            // Initialize array for this date if it doesn't exist
            if (!result[item.date]) {
                result[item.date] = [];
                result[item.date].total = 0;
            }

            // Add item to array
            result[item.date].push(item);
            // Add price to total
            result[item.date].total += Number(item.price);

            return result;
        }, {});
    }
    const expenseList = () => {
        const expensesData = groupedByDate()
        return Object.entries(expensesData).map(([date, expenses]) => (
            <div key={date} className="bg-base-100 shadow-md mb-4">
                <div className="flex justify-between p-2 bg-gray-400 text-primary">
                    <strong>{date}</strong>
                    <span>{formatValue(expensesData[date].total)}</span>
                </div>
                { expneseItem(expenses) }
            </div>
        ))
    }

    const expneseItem = (expensesDate) => {
        return expensesDate.map((expense) => (
            <div key={expense.id} className="flex justify-between p-2">
                <span>{expense.product.name} - {expense.name}</span>
                <span className="float-right">{ formatValue(expense.price) }</span>
            </div>
        ))
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>
            <div className="mt-4">
                {expenseList()}

            </div>
        </>
    );
};

export default MonthlyExpenses;
