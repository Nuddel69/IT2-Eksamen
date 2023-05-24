# Data vizualisation
import matplotlib.pyplot as plt
import seaborn as sns


from core.data import Dataset

class Presenter:
    def __init__(self, data: Dataset) -> None:
        self._data = data

    def plot(self, xdata: any, ydata: any, data_range: tuple[int, int], title: str, xlabel: str = 'X', ylabel: str = 'Y') -> None:
        '''
        Plot a graph based on the data within the specified range.

        @param data_range: A tuple specifying the range of data to plot.
        '''
        start_index, end_index = data_range
        subset_data = self._data._data.iloc[start_index:end_index]  # Subset the data based on the range

        # Example: Plotting a bar chart using seaborn
        sns.barplot(x=xdata, y=ydata, data=subset_data)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        plt.title(title)
        plt.show()

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