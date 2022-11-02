import { api } from "api";
import { useEffect, useState } from "react";

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true);

  useEffect(() => {
    const fn = async () => {
      setIsLoadingInvoices(true);

      const { err, response } = await api.getInvoices();
      setError(err);
      setInvoices(response);
      setIsLoadingInvoices(false);
    };
    fn();
  }, []);

  return { error, invoices, isLoadingInvoices };
}
