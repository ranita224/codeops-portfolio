#Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it 
#into three focused classes. 
class BuildReport:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def format_text(self):
        return f"Report Title: {self.title} ,\n Content:{self.content}"  
class ReportSaver:
    def __init__(self,report_text,filename):
        self.report_text = report_text
        self.filename = filename
    def save_file(self):
        with open(self.filename, "w") as file:
            file.write(self.report_text)
        print(f"Saved to {self.filename} successfully!")
class EmailSender:
    def send(self, recipient, subject, body):
        print(f"Sending email to {recipient}...")
        print(f"Subject: {subject}\nBody:\n{body}")

my_report = BuildReport("Sales Report","We made $1,000 today!")
formatted_content = my_report.format_text()
print(formatted_content)
saver = ReportSaver(formatted_content, "sales.txt")
saver.save_file()
mailer = EmailSender()
mailer.send("boss@example.com", my_report.title, formatted_content)
#2. Refactor to OCP. Replace an if/elif that prints a shape's area by shape type with a small 
#class hierarchy and one method.
from abc import ABC , abstractmethod
class Shape(ABC):
    def __init__(self,shape_type): 
        self.shape_type = shape_type
    @abstractmethod
    def calculate_area(self):
        pass
class Circle(Shape):
    def __init__(self, radius):
        super().__init__("circle")
        self.radius = radius
    def calculate_area(self):
        return 3.14 * self.radius * self.radius

class Square(Shape):
    def __init__(self, side):
        super().__init__("square")
        self.side = side
    def calculate_area(self):
        return self.side * self.side


circle = Circle(5)
square = Square(4)

print(circle.calculate_area())
print(square.calculate_area())
#3.Write a Singleton. Build an AppSettings Singleton holding a currency ("ETB") and confirm two instances are the same object.
class AppSettings:
    _instance = None   

    def __new__(cls):
        if cls._instance is None:  
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"  
        return cls._instance
if __name__ == "__main__":
    a = AppSettings()
    b = AppSettings()

    print("Currency:", a.currency)       
    print("Singleton check:", a is b)    
#4. Write a Factory. Create a ShapeFactory.create(kind) that returns a Circle, Square, or 
#Triangle. 
class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area")
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius * self.radius
class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side * self.side
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height
class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        if kind == "circle":
            return Circle(*args)
        elif kind == "square":
            return Square(*args)
        elif kind == "triangle":
            return Triangle(*args)
        else:
            raise ValueError("Unknown shape type")
if __name__ == "__main__":
    shape1 = ShapeFactory.create("circle", 3)     
    shape2 = ShapeFactory.create("square", 4)     
    shape3 = ShapeFactory.create("triangle", 5, 2) 

    print("Circle area:", shape1.area())   
    print("Square area:", shape2.area())   
    print("Triangle area:", shape3.area()) 
#5. Write an Observer pair. Make a NewsAgency subject and two subscriber classes that print when notified. 
class NewsAgency:
    def __init__(self):
        self._subscribers = []
    def subscribe(self, subscriber):
        self._subscribers.append(subscriber)
    def notify(self, news):
        for s in self._subscribers:
            s.update(news)
class EmailSubscriber:
    def update(self, news):
        print(f"Email: {news}")
class SMSSubscriber:
    def update(self, news):
        print(f"SMS: {news}")
if __name__ == "__main__":
    agency = NewsAgency()
    agency.subscribe(EmailSubscriber())
    agency.subscribe(SMSSubscriber())
    agency.notify("Breaking news: Observer pattern implemented!")
