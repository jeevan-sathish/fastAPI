from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ Connection successful")

    try:
        while True:
            data = await websocket.receive_text()
            print("📩 From client:", data)

            await websocket.send_text(f"Message from server: {data}")

    except Exception as e:
        print("❌ Error:", e)