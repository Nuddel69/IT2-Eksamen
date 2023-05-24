import pandas as pd
import numpy as np
from core.data import Dataset     
from core.presenter import Presenter

class GooglePlayData(Dataset):
    def cleanup(self) -> None:
        '''
        Clean up the dataset.
        '''

        self._data.drop_duplicates(inplace=True)

        char_to_remove = ['+', ',', '$', 'M', 'k']
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

        self._data['Size'] = self._data['Size'].apply(lambda x: np.nan if x == 'Varies with device' else x)
        self._data.dropna(inplace=True)


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
    appData = GooglePlayData("./data/googleplaystore.csv")
    renderer = Presenter(appData)

    if not appData.parse_csv():
        appData.cleanup()
        print(appData._data)

    print("\n\n")
    # appData.sort("App")
    #appData.sort("Size", True)
    appData.sort("Type")
    appData.sort("Price")
    appData.sort("Installs")
    
    print("\n\n")
    print(appData._data)

    #renderer.plot('App', 'Price', [0, 50], 'Dyreste apper', 'Appnavn', 'Priser i $')
    renderer.plot('App', 'Installs', [0,25], "Most used apps", "Appnavn", "Installs" )