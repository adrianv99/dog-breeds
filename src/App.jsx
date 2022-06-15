import Header from "./components/Header"
import Breeds from "./components/Breeds"
import { QueryClient, QueryClientProvider } from "react-query"
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Breeds />
    </QueryClientProvider>
  )
}

export default App