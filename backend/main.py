from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client connected")

    try:
        while True:
            data = await websocket.receive_text()
            print("📩 Received:", data)

            await websocket.send_text(f"Message from server: {data}")

    except Exception as e:
        print("❌ Client disconnected:", e)