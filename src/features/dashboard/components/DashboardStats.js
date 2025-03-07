function DashboardStats({title, icon, value, description, colorIndex, customColor}){

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    const buildCustomColor = () => {
        if (customColor === true) {
            const positive = Number(value) > 0 ? 'text-green-700 dark:text-green-300' : 'text-rose-500 dark:text-red-400'
            return <div className={`stat-value dark:text-slate-300 ${positive}`}>{value}</div>
        }
        return <div className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{value}</div>
    }

    return(
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{icon}</div>
                <div className="stat-title dark:text-slate-300">{title}</div>
                {buildCustomColor()}
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats
