import json

import cv2
import base64
import numpy as np
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import uvicorn

app = FastAPI()

# Cho phép React truy cập API từ domain khác
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Load mô hình YOLO
model = YOLO("yolov8n-oiv7.pt")  # Tải YOLOv8 model (có thể thay bằng yolov8s.pt, yolov8m.pt...)
model.export(format="onnx")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client đã kết nối!")

    try:
        while True:
            data = await websocket.receive_text()  # Nhận dữ liệu từ React
            if not data or not isinstance(data, str):
                print("❌ Lỗi: Dữ liệu nhận được không hợp lệ!")
                continue

            try:
                frame_data = base64.b64decode(data)  # Giải mã Base64
                np_arr = np.frombuffer(frame_data, dtype=np.uint8)
                frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                if frame is None:
                    print("❌ Lỗi: Không thể decode ảnh")
                    continue

                # Chạy YOLO object detection
                results = model(frame)
                detected_frame = results[0].plot()

                detections = []
                for result in results:
                    for box in result.boxes:
                        cls = int(box.cls[0])  # Lấy chỉ số class
                        label = model.names[cls]  # Tên đối tượng
                        confidence = float(box.conf[0])  # Mức độ tin cậy
                        x1, y1, x2, y2 = map(int, box.xyxy[0])  # Tọa độ

                        detections.append({
                            "label": label,
                            "confidence": confidence,
                            "bbox": [x1, y1, x2, y2]
                        })

                # Chuyển ảnh đã xử lý thành Base64
                _, buffer = cv2.imencode(".jpg", detected_frame)
                frame_base64 = base64.b64encode(buffer).decode("utf-8")

                response_data = json.dumps({
                    "image": frame_base64,
                    "detections": detections
                })

                await websocket.send_text(response_data)  # Gửi ảnh đã xử lý về React

            except Exception as e:
                print(f"❌ Lỗi xử lý ảnh: {e}")

    except Exception as e:
        print(f"❌ Lỗi WebSocket: {e}")

    finally:
        print("❌ Client đã ngắt kết nối!")


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render sẽ gán PORT tự động
    uvicorn.run(app, host="0.0.0.0", port=port)