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


# --- HOW TO USE THEM TOGETHER ---

# Step 1: Create the report content
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
            cls._instance.currency = "ETB"  # Ethiopian Birr
        return cls._instance 
