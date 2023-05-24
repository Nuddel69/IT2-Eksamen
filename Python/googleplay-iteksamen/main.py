import pandas as pd

from core.data import Dataset     
from core.presenter import Presenter

class AppData(Dataset):
    def cleanup(self) -> None:
        '''
        Clean up the dataset.
        '''
        char_to_remove = ['+', ',', '$', 'M']
        col_to_clean = ['Price', 'Installs', 'Reviews', 'Size']

        for col in col_to_clean:
            self._data[col] = self._data[col].astype(str)  # Cast column to string

            for char in char_to_remove:
                self._data[col] = self._data[col].apply(lambda x: x.replace(char, ''))

        target = ['Free', 'Everyone']
        col_to_clean = ['Price', 'Installs']

        for col in col_to_clean:
            self._data[col] = self._data[col].astype(str)  # Cast column to string

            for char in target:
                self._data[col] = self._data[col].apply(lambda x: x.replace(char, '0'))

        # Cast Install to float
        self._data['Installs'] = self._data['Installs'].astype(float)

        # Cast Review to float
        self._data['Reviews'] = self._data['Reviews'].astype(float)

        # Cast Price to float data type
        self._data['Price'] = self._data['Price'].astype(float)
        
        # Cast 'Last Updated' column to datetime format for sorting
        self._data['Last Updated'] = pd.to_datetime(self._data['Last Updated'], format='%B %d, %Y')

        self._data['Size'] = self._data['Size'].astype(float)

        # Checking dtypes of the self._data dataframe
        print(self._data.dtypes)

    print("Cleanup completed.")

if __name__ == "__main__":
    data1 = AppData("./data/demo.csv")
    renderer = Presenter(data1)

    if not data1.parse_csv():
        data1.cleanup()
        print(data1._data)

    print("\n\n")
    # data1.sort("App")
    #data1.sort("Size", True)
    data1.sort("Last Updated")
    #data1.sort("Price", False)



    print("\n\n")
    print(data1._data)



    #renderer.plot('App', 'Installs', [0, 50], 'Mest populære', 'Appnavn', 'Antall Installasjoner')
    # print(renderer._plot)

