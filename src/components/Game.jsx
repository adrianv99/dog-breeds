import { useState, useRef } from "react"
import { useQuery } from "react-query"
import { ToastContainer, toast } from "react-toastify"
import Option from "./Option"
import Score from "./Score"

// call a function n times
const times = x => f => {
    if (x > 0) {
      f()
      times (x - 1) (f)
    }
}

// get a random element from array
const getRandom = (arr) => {
    const index = Math.floor(Math.random() * (arr.length))
    return arr[index]
} 

const Game = ({ breeds }) => { 

    /*
        Options Type: [
            {
                breed: String,
                imgUrl: String,
                correct: Boolean,
            }
        ]
    */
    const [options, setOptions] = useState([])
    const correctOption = options.filter(breed => breed.correct)[0]

    const scoreRef = useRef()

    const handleRandomBreedFetched = (url) => {
        let optionList = []

        // get breed name from image url
        const breedName = url.split('/')[4]

        // add the correct option to optionList
        const correctOption = { breed: breedName, imgUrl: url, correct: true }
        optionList.push(correctOption)
        
        // add 3 random options to optionList 
        times (3) (() => { 
            let randomBreed = getRandom(breeds)
            optionList.push({ breed: randomBreed, imgUrl: '', correct: false })
        })

        // suffle optionList
        const shuffledOptions = optionList.sort((a, b) => 0.5 - Math.random())

        setOptions(shuffledOptions)
    }

    const fetchRandomBreed = async () => {
        const res = await fetch('https://dog.ceo/api/breeds/image/random')
        const { message } = await res.json()
        handleRandomBreedFetched(message)
    }

    const handleClickOption = (option) => {
        if (option.breed === correctOption.breed) {
            scoreRef.current.up({ streakPoints: 1 })
            toast.success('Right answer!', { autoClose: 1500 })
        } else {
            scoreRef.current.reset()
            toast.error('Wrong answer!', { autoClose: 1500 })
        }
        refetch()
    }
    
    const { refetch } = useQuery('randomBreed', fetchRandomBreed)

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <img 
                    src={correctOption ? correctOption.imgUrl : ''} 
                    alt="breed" 
                    className="breed-img my-8" 
                />
                <div className="my-3 grid grid-cols-2 gap-6">
                    {
                        options.map((breed, index) => {
                            return (
                                <Option 
                                    key={index} 
                                    option={breed} 
                                    handleClickOption={handleClickOption} 
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-center my-10">
                <Score 
                    ref={scoreRef} 
                />
            </div>
            <ToastContainer 
                position="bottom-right"
                hideProgressBar={true}
                toastStyle={{ backgroundColor: "#0f172a", color: "white" }}
            />
        </>
    )
}

export default Game;