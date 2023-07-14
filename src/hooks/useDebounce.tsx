import { useEffect, useState } from "react";

function useDebounce(value: string, delay = 500) {
    const [debounced, setDebaunced] = useState(value)
  
    useEffect(() => {
    const timer = setTimeout(() => {
        setDebaunced(value)
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced
}

export default useDebounce;
