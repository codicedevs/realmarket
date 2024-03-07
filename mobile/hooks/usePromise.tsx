import { useLoading } from '../context/LoadingProvider';


const usePromise = () => {
    const { setIsLoading } = useLoading()

    const handlePromise= async <T=any> (promise:Promise<T>, time = 0) => {
        let res = null;
        try {
            setIsLoading(true)
            res = await promise
            console.log('try')
        }
        catch (err) {
            console.error('Error:', err)
            throw new Error(err)
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, time);

            return res;
        }
    }

    return handlePromise;
}

export default usePromise