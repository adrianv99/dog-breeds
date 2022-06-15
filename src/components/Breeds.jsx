import { useQuery } from "react-query"
import Game from "./Game"

/* 
  Turn breeds object into an array 
  Example: 
    { 'husky': [], 'terrier': ['australian'] } => ['husky', 'terrier-australian']
*/
const formatBreedsObject = (breedsObject) => {
    let breedsArr = []
    const entries = Object.entries(breedsObject)

    entries.map(breed => { 
        const mainBreed = breed[0] 
        const subBreeds = breed[1]
  
        if (subBreeds.length) {
          subBreeds.map(sub => breedsArr.push(mainBreed + '-' + sub))
        } else {
          breedsArr.push(mainBreed)
        }
    });

    return breedsArr
}

const fetchBreeds = async () => {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const { message } = await res.json()
    return formatBreedsObject(message)
}

const Breeds = () => {

    const { data: breeds, isLoading, error } = useQuery('breeds', fetchBreeds)

    if (isLoading) {
      return <p className="text-center">Loading breeds...</p>
    } 

    if (error) {
      return <p className="text-center text-red-500">Error on fetching breeds...</p>
    }

    return (<Game breeds={breeds}/>)
}

export default Breeds;