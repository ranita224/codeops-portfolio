#1. Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method. Add Car and Truck subclasses. 
class Vehicle :
    def __init__ (self,make,model):
        self.make = make
        self.model = model
    def describe (self):
        print (f"The vechile is {self.make} ; {self.model}")
class Car(Vehicle):
    pass
class Truck(Vehicle):
    pass 
car1 = Car("Toyota", "Corolla")
truck1 = Truck("Volvo", "FH16")
car1.describe()
truck1.describe()
#2. Use super(). Give Truck a capacity attribute, setting make and model via super().__init__().
class Vehicle:
    def __init__(self,make,model):
        self.make = make
        self.model = model
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model) 
        self.capacity = capacity
    def describe(self):
        print (f"Truck with capacity {self.capacity}")
truck1 = Truck("Volvo", "FH16", 10)
truck1.describe()

#3. Override. Override describe() in Truck so it also mentions the capacity.
class Vehicle:
    def __init__(self,make,model):
        self.make = make
        self.model = model
    def describe (self):
        print (f"The vechile is {self.make} ; {self.model}")
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model) 
        self.capacity = capacity
    def describe (self):
        super().describe()
        print(f" The vechile is {self.make} ; {self.model} the capacit is {self.capacity} tons")
truck1 = Truck("Volvo", "FH16", 10)
truck1.describe()
#4. Polymorphism. Put several vehicles in a list and loop over them, calling describe() on each. 
class Vehicle:
    def __init__(self,make,model):
        self.make = make
        self.model = model
    def describe (self):
        print (f"{self.make} ; {self.model}")
class Car(Vehicle):
    def __init__(self, make, model,capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe (self):
        print(f"Car {self.make} {self.model} with capacity {self.capacity} passengers")
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model) 
        self.capacity = capacity
     
    def describe (self):
        print(f"Truck {self.make} {self.model} with capacity {self.capacity} tons")
Vehicles = [Vehicle("bycycle","hownem",) ,Car("Toyota", "Corolla", 10), Truck("Volvo", "FH16",23)]
for veh in Vehicles:
    veh.describe()
#5.. Abstract method. Make Vehicle an abstract base class with an abstract wheels() method, and have each subclass return its own number.
from abc import ABC, abstractmethod
class Vehicle(ABC):
    @abstractmethod
    def wheels(self):
        pass
class Car(Vehicle):
    def wheels(self):
        return 4
class Truck(Vehicle):
    def wheels(self):
        return 6
class Motorcycle(Vehicle):
    def wheels(self):
        return 2
Vehicles = [ Car() , Truck() , Motorcycle()]
for v in Vehicles:
     print(f"{v.__class__.__name__} has {v.wheels()} wheels.") 

         

