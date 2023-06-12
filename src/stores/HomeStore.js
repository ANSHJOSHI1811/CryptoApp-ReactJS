import { create } from 'zustand'
import axios from 'axios'
const HomeStore = create((set) => ({
    coins:[],
    query:'',
    setQuery:(e)=>{
 set({query:e.target.value})
 HomeStore.getState().searchCoins()
    },
    searchCoins: async()=>{
     const {query}= HomeStore.getState()
     const res =await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
     console.log(res)
    },
 fetchCoins : async()=>{
    const res = await axios.get(`https://api.coingecko.com/api/v3/search/trending` )
    console.log(res)
    const coins =res.data.coins.map(coin=>{
        return{
            name:coin.item.name,
            image:coin.item.large,
            id:coin.item.id,
            priceBTC:coin.item.price_btc
        }
    })
    set({coins:coins})
 }
}))
export default HomeStore