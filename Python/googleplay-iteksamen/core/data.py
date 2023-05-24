# Data Manipulation
import pandas as pd
import numpy as np
import json

class Dataset:
    def __init__(self, path: str) -> None:
        '''
        Initialize the Dataset object.

        @param path: The path to the dataset file.
        '''
        self._path = path
        self._data: pd.DataFrame = None

    def parse_json(self) -> int:
        '''
        Parse a JSON file and load the data into a DataFrame.

        @returns:
        - 0: JSON parsing successful.
        - 1: File '{self._path}' not found. Invalid path.
        - 2: Error parsing JSON file '{self._path}'. Invalid JSON format.
        '''
        try: 
            self._data = pd.read_json(self._path)
            self._data.fillna('', inplace=True)
            return 0
        except FileNotFoundError:
            return 1
        except pd.errors.ParserError:
            return 2

    def parse_csv(self) -> int:
        '''
        Parse a CSV file and load the data into a DataFrame.

        @returns:
        - 0: CSV parsing successful.
        - 1: File '{self._path}' not found. Invalid path.
        - 2: Error parsing CSV file '{self._path}'. Invalid CSV format.
        '''
        try:
            self._data = pd.read_csv(self._path)
            return 0
        except FileNotFoundError:
            return 1
        except pd.errors.ParserError:
            return 2

    def sort(self, key: str, ascending: bool = False) -> None:
        '''
        Sort the data based on the specified key in descending order.

        @param key: The column name to sort the data by.
        @param ascending: Whether or not to sort by ascending order. Defaults to false.
        '''
        self._data.sort_values(key, ascending=ascending, inplace=True)

    def cleanup(self) -> None:
        pass