import { memo, useState } from 'react'
import { AddProductToWishListProps } from './AddProductToWishList'
import lodash from 'lodash'

import dynamic from 'next/dynamic'

// import { AddProductToWishList } from './AddProductToWishList'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
   return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
},{
    loading: () => <span>Carregando...</span>
})
 
interface ProductItemProps {
    product: {
        id: number,
        price: number,
        priceFormated: string,
        title: string
    },
    onAddToWishList: (id: number) => void
}

function ProductItemComponent({product, onAddToWishList}: ProductItemProps){
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.priceFormated}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>Favoritar</button>

            {
                isAddingToWishList &&
                <AddProductToWishList 
                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps,nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product)
})