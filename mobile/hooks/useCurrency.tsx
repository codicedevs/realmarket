import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useLoading } from "../context/LoadingProvider";

const useCurrency = ({ onChange }: { onChange?: () => void }): [string, (func?: () => void) => void] => {
  // const [currency, setCurrency] = useState('ARS');
  const { setLoadingScreen } = useLoading();
  const { currency, setCurrency } = useContext(AppContext)

  const toggleCurrency = () => {
    setLoadingScreen(true);
    const newCurrency = currency === 'ARS' ? 'USD' : 'ARS';
    setCurrency(newCurrency);
    setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
  };

  useEffect(() => {
    if (onChange) {
      onChange()
    }
  }, [currency])

  return [currency, toggleCurrency];
}

export default useCurrency;