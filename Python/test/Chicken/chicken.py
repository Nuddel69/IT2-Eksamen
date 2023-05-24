import random as rd

class Chicken:
    ''' 🐔 '''
    def __init__(self):
        print("Egg")
        for i in range(4):
            self.egg = Egg()

class Egg:
    ''' 🥚 '''
    def __init__(self):
        print("Hatch")
        self.hatch = Chicken()

class Pen:
    '''' 🐣 '''
    def __init__(self):
        if rd.randint(0, 1) == 0:
            Egg()
        else:
            Chicken()

            
Pen()

