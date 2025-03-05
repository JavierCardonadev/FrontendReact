   const useCurrencyFormat = (value: number, locale: string = "en-US", currency: string = "USD") => {
     return new Intl.NumberFormat(locale, {
       style: "currency",
       currency,
     }).format(value);
   };

   export default useCurrencyFormat;