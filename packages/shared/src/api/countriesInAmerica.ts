export interface Country {
    name: {
        common: string;
    };
    region: string;
    subregion: string;
}

export const countriesInAmerica = async (): Promise<Country[]> => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/america");

        if (!response.ok) {
         throw new Error("Error al consultar la API de países.");
        }

       return  await response.json();
    } catch (error) {
        throw new Error("Error al consultar la API de países.");
    }
};