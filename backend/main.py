from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def home():
    return {"message":"Fast Api running"}

@app.get('/add')
def add(a:int,b:int):
    result =a=b
    return {
        "message":"the sum is :",
        "result":result
    }