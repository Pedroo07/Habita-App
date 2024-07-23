import { differenceInMinutes, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"


type GoalItemPops = {
    title: string
    date: Date
    goalTime: number
}

export const GoalItem: React.FC<GoalItemPops> = ({ title, date, goalTime }) => {
    const [timeAgo, setTimeAgo] = useState<string>('')
    const [progress, setProgess] = useState<number>(0)

    const caulculateProgress = () => {
        const now = new Date()
        const minutesElapesd = differenceInMinutes(now, date)
        const goalTimeInMinutes = goalTime * 24 * 60
        const percentage = (minutesElapesd / goalTimeInMinutes) * 100
        setProgess(percentage)
    }
    useEffect(() => {
        caulculateProgress()

        const intervalId = setInterval(caulculateProgress, 60000)

        return() =>  clearInterval(intervalId)
    }, [date, goalTime])

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
                        <span>Current goal: {goalTime} days</span>
                        <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded">
                        <div className='h-1 bg-bg-color1 rounded' style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>
        </section>

    )
}