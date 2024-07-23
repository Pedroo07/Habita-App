import { GoalItem } from './GoalItem'

export const Goals = () => {
    const createdAt = new Date()
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold ">Your Goals</h1>
                <span className="text-color1 font-semibold cursor-pointer" >See all</span>
            </div>
            <div className="flex flex-col gap-2">
                <GoalItem title="Alcool" date={createdAt} goalTime={10} />
                <GoalItem title="Porn" date={createdAt} goalTime={10} />
                <GoalItem title="Procastination" date={createdAt} goalTime={10} />
            </div>
        </div>
    )
}
