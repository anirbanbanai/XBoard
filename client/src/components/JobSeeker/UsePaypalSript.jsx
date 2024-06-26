import { useEffect } from "react";

const usePayPalScript = (clientId, currency = "USD") => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, currency]);
};

export default usePayPalScript;
