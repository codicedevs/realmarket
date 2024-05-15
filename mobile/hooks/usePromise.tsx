import { useLoading } from '../context/LoadingProvider';


const usePromise = () => {
    const { setLoadingScreen } = useLoading()

    const handlePromise = async <T = any>(promise: Promise<T>, time = 0) => {
        let res = null;
        try {
            setLoadingScreen(true)
            res = await promise
            console.log('try')
        }
        catch (err) {
            console.error('Error:', err)
            throw new Error(err)
        }
        finally {
            setTimeout(() => {
                setLoadingScreen(false)
            }, time);

            return res;
        }
    }

    return handlePromise;
}

export default usePromise