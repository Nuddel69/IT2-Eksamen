from core.data import Dataset     
from core.presenter import Presenter

if __name__ == "__main__":
    data1 = Dataset("./data/demo.csv")

    if not data1.parse_csv():
        print(data1._data)

    print("\n\n")
    data1.sort("Rating")

    print(data1._data)
