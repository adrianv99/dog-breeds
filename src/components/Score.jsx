import { forwardRef, useImperativeHandle } from "react"
import useScore from "../hooks/useScore"

const Score = (props, ref) => {

    const { streak, increaseStreak, resetStreak } = useScore()

    useImperativeHandle(ref, () => ({
        up({ streakPoints }) {
            increaseStreak(streakPoints)
        },
        reset() {
            resetStreak()
        }
    }));

    return (
        <>
            <h1 className="text-2xl">
                🔥 Streak: {streak}
            </h1>
        </>
    )
}

export default forwardRef(Score);