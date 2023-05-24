# Data vizualisation
import matplotlib.pyplot as plt

from data import Dataset

class Presenter:
    def __init__(self, data: Dataset) -> None:
        self._data = data

    def plot(self, data_range: tuple[int, int]) -> None:
        '''
        Plot a graph based on the data within the specified range.

        @param data_range: A tuple specifying the range of data to plot.
        '''
        pass

    def string(self) -> None:
        '''
        Generate a formatted string representation of the data.
        '''
        pass

    def storefront(self) -> None:
        '''
        Display the data as a storefront or in an e-commerce format.
        '''
        pass