from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from routers import cart

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message":"Fast Api running"}


app.include_router(user.router ,prefix='/api',tags=['Users'])

app.include_router(cart.router,prefix='/api',tags=["carts"])