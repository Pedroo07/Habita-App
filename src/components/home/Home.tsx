import { Goals } from "./Goals";
import { TodoDaily } from "./TodoDaily"

export const Home = () => {
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const now = new Date()
  const day = now.getDate();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = monthsOfYear[now.getMonth()]
  const year = now.getFullYear()

  return (
    <div className="flex justify-around max-md:flex-col-reverse max-md:items-center">
      <div className="flex flex-col gap-4 p-4">
        <h4 className="font-semibold">{dayOfWeek}, {day} {month} {year}</h4>
        <TodoDaily />
      </div>
      <Goals/>
    </div>
  )
}
