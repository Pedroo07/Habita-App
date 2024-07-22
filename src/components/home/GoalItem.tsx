import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"


type GoalItemPops = {
    title: string
    date: Date
}

export const GoalItem: React.FC<GoalItemPops> = ({title, date}) => {
    const [timeAgo, setTimeAgo] = useState<string>('')

    useEffect(() => {
        const caulculateTimeAgo = () => {
            const timePassed = formatDistanceToNow(date, {
                addSuffix: true,
                locale: ptBR
            })
            setTimeAgo(timePassed)
        }
        caulculateTimeAgo()
        const intevalId = setInterval(caulculateTimeAgo, 60000)

        return () => clearInterval(intevalId)
    }, [date])
    return (
        <section className="m-4 p-2 font-semibold bg-white rounded-md w-80 flex gap-2">
            <div>
                <img src="/sample-icon.png" alt="" width={30} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-lg">{title}</h1>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Abstinitinence time</span>
                    <span className="text-lg">{timeAgo}</span>
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold">
                        <span>Current goal: 10 days</span>
                        <span>50%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded">
                        <div className="w-2/4 h-1 bg-bg-color1 rounded"></div>
                    </div>
                </div>
            </div>
        </section>

    )
}