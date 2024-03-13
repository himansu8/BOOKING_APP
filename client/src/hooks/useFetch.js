import { useEffect, useState } from "react";
import axios from "axios";
function useFetch(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const res = await axios.get(url);
                //console.log(res)
                setData(res.data)
                
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData();
    }, [url])


    async function reFetch() {
        setLoading(true)
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data, loading, error, reFetch}
}
export default useFetch;

