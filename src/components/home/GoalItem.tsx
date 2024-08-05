import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { differenceInMinutes, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { EllipsisVertical, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export type Item = {
    id: number
    text: string
    timer: number
    date: Date
}

type GoalItemPops = {
    item: Item
    onDelete: (id: number) => void
    
}

export const GoalItem: React.FC<GoalItemPops> = ({ item, onDelete}) => {
    const [timeAgo, setTimeAgo] = useState<string>('')
    const [progress, setProgess] = useState<number>(0)

    const caulculateProgress = () => {
        const now = new Date()
        const minutesElapesd = differenceInMinutes(now, item.date)
        const goalTimeInMinutes = item.timer * 24 * 60
        const percentage = (minutesElapesd / goalTimeInMinutes) * 100
        setProgess(percentage)
    }
    useEffect(() => {
        caulculateProgress()

        const intervalId = setInterval(caulculateProgress, 60000)

        return () => clearInterval(intervalId)
    }, [item.date, item.timer])

    useEffect(() => {

        const caulculateTimeAgo = () => {
            const timePassed = formatDistanceToNow(item.date, {
                addSuffix: true,
                locale: ptBR
            })
            setTimeAgo(timePassed)
        }
        caulculateTimeAgo()
        const intevalId = setInterval(caulculateTimeAgo, 60000)

        return () => clearInterval(intevalId)
    }, [item.date])
    return (
        <section className="m-4 p-2 font-semibold bg-white rounded-md w-80 flex gap-2">
            <div>
                <img src="/sample-icon.png" alt="" width={30} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between">
                    <h1 className="text-lg">{item.text}</h1>
                    <span className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger><EllipsisVertical size={18} className="text-slate-600 ml-2 cursor-pointer" /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="justify-center" onClick={() => onDelete(item.id)}><Trash2 size={18} className="cursor-pointer"/></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Abstinitinence time</span>
                    <span className="text-lg">{timeAgo}</span>
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold">
                        <span>Current goal: {item.timer} days</span>
                        <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded">
                        <div className='h-1 bg-bg-color1 rounded' style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </section>

    )
}