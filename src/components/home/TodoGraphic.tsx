import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type TodoGrapicProps = {
    completed: number
    total: number
}

export const TodoGraphic: React.FC<TodoGrapicProps> = ({ completed, total }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0

    return (
        <div className="bg-bg-color1 flex justify-around max-w-96  items-center rounded">
            <div className='w-40 h-40 p-3 '>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage.toFixed(0)}%`}
                    styles={buildStyles({
                        textSize: '14px',
                        pathColor: `rgba( 255, 255, 255, ${percentage / 100})`,
                        textColor: '#ffffff',
                        trailColor: '#fab48c',
                        backgroundColor: '#ffffff',
                    })}
                />
            </div>
            <div className="flex flex-col gap-4 p-8">
                <p className=" text-white p-4"><span className="font-semibold">{completed} of {total} habits</span> <br />completed today!</p>
                <img src="/Calendar.png" alt="" className='sticky bottom-0 right-0' />
            </div>
        </div>
    )
}

