import { ChangeEvent, useState } from 'react'
import { GoalItem } from './GoalItem'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusCircleIcon } from 'lucide-react'

 type GoalItemProps = {
    id: number
    text: string
    timer: number
}
export const Goals = () => {
    const  [title, setTitle] = useState<string>("")
    const [goalTime, setGoalTime] = useState<number>(0)
    const [items, setItems] = useState<GoalItemProps[]>([])

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value
        setTitle(newValue)
    }
    const handleGoalTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue  = +event.target.value
        setGoalTime(newValue)
    }

    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    }

    const handleAddNewItem = () => {
        const  newItem : GoalItemProps = {
            timer: goalTime,
            text: title,
            id: items.length + 1
        }
        setItems([...items, newItem])
        setTitle('')
        setGoalTime(0)
    }
    const createdAt = new Date()
    return (
        <div>
            <div className="flex justify-between w-80">
                <h1 className="text-2xl font-semibold ">Your Goals</h1>
                <Dialog>
                    <DialogTrigger>
                        <button className="bg-bg-color2 rounded-full h-7 w-7 items-center justify-center flex text-white"><PlusCircleIcon className="w-full h-full" />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new To-do</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-4">
                            <label htmlFor="title" className="text-right font-medium">Goal Name</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Add new goal item..."
                                value={title}
                                autoFocus={true}
                                onChange={handleTitleChange}
                                className="border-gray-400 border-solid border-2 rounded-sm p-0.5" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="goalTime" className="text-right font-medium">Current Goal</label>
                            <input
                                id="goalTime"
                                type="number"
                                value={goalTime}
                                autoFocus={false}
                                onChange={handleGoalTimeChange}
                                className="border-gray-400 border-solid border-2 rounded-sm p-0.5" />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleAddNewItem}
                                type="button"
                                className="items-center px-3 rounded-sm flex gap-1 text-white"
                                disabled={!title}
                            >
                                <span>Create New</span>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <ul className="flex flex-col gap-2 items-center text-start">
                {items.map((item => (
                    <GoalItem key={item.id}  item={item} onDelete={handleDeleteItem} date={createdAt}  />
                )))}
                
            </ul>
        </div>
    )
}
