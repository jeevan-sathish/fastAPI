from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import ollama

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ Connection successful")

    try:
        while True:
            data = await websocket.receive_text()
            print("📩 From client:", data)

            response = ollama.chat(
                model="llama3",
                messages=[{"role": "user", "content": data}]
            )

            ai_reply = response["message"]["content"]

            # ✅ Send ONE string
            await websocket.send_text(f"AI: {ai_reply}")

    except WebSocketDisconnect:
        print("❌ Client disconnected")