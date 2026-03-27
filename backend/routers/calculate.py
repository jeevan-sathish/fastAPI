from fastapi import APIRouter
from pydantic import BaseModel


class calculator(BaseModel):
    data:str

router =APIRouter()

@router.post('/calculate')
def calculate(data:calculator):
    result =eval(data.data) # just for demo not recomended
    return {
        "message":result
    }