import csv
import matplotlib.pyplot as plt

class Data:
    '''Class that processes data and finds the 3 most and least visited stations and plots them in a graph from May 1 to 31, 2022'''
    def __init__(self, filename: str) -> None:
        '''Constructor that takes in the filename and creates variables for start locations and number of trips per day'''
        self.filename = filename
        self.start_locations = {}
        self.trips_per_day = {}

    def __str__(self) -> str:
        '''Parses and formats the dataset as a string (most used and least used stations)'''
        self.count_start_locations()
        most_used = self.find_most_used()
        least_used = self.find_least_used()
        string = ""

        string += "The three most used start locations are:\n"
        for location, count in most_used:
            string += f"{location} ({count} times)\n"

        string += "\nThe three least used start locations are:\n"
        for location, count in least_used:
            string += f"{location} ({count} times)\n"
        
        return string
   
    def count_start_locations(self) -> None:
        '''
        Method to count the number of times each start location appears in the file
        '''
        with open(self.filename, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                start_location = row['start_station_name']
                if start_location in self.start_locations:
                    self.start_locations[start_location] += 1
                else:
                    self.start_locations[start_location] = 1

    def find_most_used(self) -> list[str]:
        '''Method to find the three most used start locations'''
        return sorted(self.start_locations.items(), key=lambda x: x[1], reverse=True)[:3]

    def find_least_used(self) -> list[str]:
        '''Method to find the three least used start locations'''
        return sorted(self.start_locations.items(), key=lambda x: x[1])[:3]

    def count_trips_per_day(self) -> None:
        '''Method to count the number of trips per day in the month'''
        for day in range(1, 32):
            self.trips_per_day[day] = 0

        with open(self.filename, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                start_time = row['started_at']
                day = int(start_time.split('-')[2].split()[0])
                self.trips_per_day[day] += 1

    def plot_trips_per_day(self) -> None:
        '''Method to create a chart showing the number of trips per day in the month'''
        trip_counts = [self.trips_per_day[day] for day in range(1, 32)]

        plt.bar(range(1, 32), trip_counts,  color='hotpink')
        plt.title('Number of trips per day in May')
        plt.xlabel('Day of the month')
        plt.ylabel('Number of trips')
        plt.show()

def show(data: Data) -> None:
    '''Method that runs all the other methods in the correct order'''
    data.count_trips_per_day()
    data.plot_trips_per_day()

if __name__ == '__main__':
    data = Data('./05.csv')
    print(data)
    show(data)