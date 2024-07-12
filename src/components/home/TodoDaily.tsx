import { EllipsisVertical, PlusCircleIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Trash2 } from "lucide-react";
import { TodoGraphic } from "./TodoGraphic";
import { Button } from "../ui/button";

type CustomCheckboxProps = {
    id: number
    isChecked: boolean;
    handleCheckboxChange: () => void;
}

type TodoItem = {
    id: number
    text: string
    isChecked: boolean
}

type TodoDailyItemProps = {
    item: TodoItem;
    handleCheckboxChange: (id: number) => void;
    onDelete: (id: number) => void;
}



const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, isChecked, handleCheckboxChange }) => (
    <>
        <input
            type="checkbox"
            id={`custom-checkbox-${id}`}
            className="sr-only"
            checked={isChecked}
            onChange={handleCheckboxChange}
        />
        <label
            htmlFor={`custom-checkbox-${id}`}
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors ${isChecked ? 'bg-bg-color2 border-none' : 'bg-white border-gray-400'}`}
        >
            {isChecked && (
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    ></path>
                </svg>
            )}
        </label>
    </>
);
const TodoDailyItem: React.FC<TodoDailyItemProps> = ({ item, handleCheckboxChange, onDelete }) => {
    return (
        <li
            className={`w-full py-3 rounded px-1 flex justify-between items-center transition-colors ${item.isChecked ? 'bg-green-100' : 'bg-gray-100'}`}
        >
            <span className={`font-semibold ${item.isChecked ? 'text-green-500' : ''}`}>{item.text}</span>
            <span className="flex items-center">
                <CustomCheckbox id={item.id} isChecked={item.isChecked} handleCheckboxChange={() => handleCheckboxChange(item.id)} />
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical size={18} className="text-slate-600 ml-2 cursor-pointer" /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="justify-center" onClick={() => onDelete(item.id)}><Trash2 size={18} /></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>
        </li>
    )
}
export const TodoDaily = () => {
    const [title, setTitle] = useState<string>("")
    const [items, setItems] = useState<TodoItem[]>([])

    const handleCheckboxChange = (id: number) => {
        setItems(items.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    }
    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    }
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value
        setTitle(newValue)
    }
    const handleAddTodoItem = () => {
        const newItem: TodoItem = {
            id: items.length + 1,
            text: title,
            isChecked: false
        }
        setItems([...items, newItem])
        setTitle('')
    }

    const completedTodos = items.filter(item => item.isChecked).length
    const totalTodos = items.length
    return (
        <div className="flex flex-col-reverse gap-8">
        <div className="max-w-md">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Today Habit</h2>
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
                            <label htmlFor="title" className="text-right font-medium">Habit Name</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Add new todo item..."
                                value={title}
                                autoFocus={true}
                                onChange={handleTitleChange}
                                className="border-gray-400 border-solid border-2 rounded-sm p-0.5" />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleAddTodoItem}
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
                {items.map(item => (
                    <TodoDailyItem key={item.id} item={item} handleCheckboxChange={handleCheckboxChange} onDelete={handleDeleteItem} />
                ))}
            </ul>
        </div>
            <TodoGraphic completed={completedTodos} total={totalTodos}/> 
        </div>
    );
};
