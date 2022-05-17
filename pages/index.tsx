import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults"

interface Result {
    id: number,
    price: number,
    priceFormated:string,
    title: string
}

interface Results {
  totalPrice: number,
  data: Result[]
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results,setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })


  async function handleSearch(evt: FormEvent){
    evt.preventDefault()

    if (!search.trim()){
      return
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const products = data.map( product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormated: formatter.format(product.price)
      }
    } )

    const totalPrice = data.reduce((total, produto) => {
      return total + produto.price
    },0)

      setResults({ totalPrice, data: products})
    }

  const addToWishList = useCallback(async (id: number) => {
      console.log(id)
  },[])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={evt => setSearch(evt.target.value)}/>

        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results.data} 
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}
