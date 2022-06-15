import { useEffect, useState } from "react"

const useColorTheme = () => {

    const [theme, setTheme] = useState(localStorage.theme)
    const colorTheme = theme === 'dark' ? 'light' : 'dark'

    useEffect(() => {
        // apply theme on DOM
        const root = window.document.documentElement
        root.classList.remove(colorTheme)
        root.classList.add(theme)

        // save theme on local storage
        localStorage.setItem('theme', theme)
    }, [theme ,colorTheme])

    return [colorTheme, setTheme]
}

export default useColorTheme