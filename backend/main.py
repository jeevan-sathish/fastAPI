from fastapi import FastAPI ,WebSocket

app =FastAPI()
@app.websockwet("/ws")
async def websocklet_endpoint(websocket:WebSocket):
    await websocket.accept()

    while True:
        data = await websocket.receive_text()
        print("Recieved",data)