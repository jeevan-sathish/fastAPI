class app:
    databse =["jeevan","chintu"]

    def __init__(self,name):
        self.name =name

    def login(self):
        print("log in succesfull")
    
    def dashboard(self):
        print(f"this si {self.name}")

    def validate(self):
        if self.name in self.databse:
            self.login()
            self.dashboard()
        else:
            print("log in failed")
        

obj =app("chintu")
obj.validate()