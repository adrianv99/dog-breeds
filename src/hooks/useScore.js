import { useEffect, useState } from "react"

const useScore = () => {

    const initialStreak = Number(localStorage.streak) || 0
    const [streak, setStreak] = useState(initialStreak)

    const increaseStreak = (points) => setStreak(streak + points)
    const resetStreak = () => setStreak(0)

    useEffect(() => {
        // save streak on local storage
        localStorage.setItem('streak', streak)
    }, [streak])

    return { streak, increaseStreak, resetStreak }
}

export default useScore