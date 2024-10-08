import React, { ChangeEvent, useState } from 'react'
import { GoalItem } from './GoalItem'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusCircleIcon } from 'lucide-react'

type GoalItemProps = {
    id: number
    text: string
    timer: number
    date: Date
}
export const Goals: React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [goalTime, setGoalTime] = useState<number>(0)
    const [items, setItems] = useState<GoalItemProps[]>(() => {
        const itemsOnStorage = localStorage.getItem("items")

        if (itemsOnStorage) return JSON.parse(itemsOnStorage)

        return []
    })



    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value
        setTitle(newValue)
    }
    const handleGoalTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = +event.target.value
        setGoalTime(newValue)
    }

    const handleDeleteItem = (id: number) => {
        const ItemArray = items.filter(item => {
            return item.id !== id
        });
        setItems(ItemArray)

        localStorage.setItem('items', JSON.stringify(ItemArray))
    }

    const handleAddNewItem = () => {
            const newItem: GoalItemProps = {
                timer: goalTime,
                text: title,
                id: items.length + 1,
                date: new Date()
            }
            const ItemArray = [newItem, ...items]
            setItems(ItemArray)
            setTitle('')
            setGoalTime(0)
            localStorage.setItem('items', JSON.stringify(ItemArray)) 
        

    }
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
                                disabled={!title || !goalTime }
                            >
                                <span>Create New</span>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <ul className="flex flex-col gap-2 items-center text-start max-md:items-start">
                {items.map((item => (
                    <GoalItem key={item.id} item={item} onDelete={handleDeleteItem} />
                )))}

            </ul>
        </div>
    )
}
