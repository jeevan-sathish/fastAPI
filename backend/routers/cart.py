from fastapi import APIRouter

router =APIRouter()

@router.get('/cart')
def cart():
    return {"message":"cart router running"}