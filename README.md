# Full Stack Dental X-ray Assignment

This is a full-stack application capable of taking **dental X-rays** as input and providing insights about the **detected pathology** in a **visually appealing** manner.

## 📸 Project Screenshot

![Project Screenshot - Analysis](/client/src/assets/screenshot-2.png)

## 🚀 Features

- 🖼️ **Drag and drop `.dcm` or `.rvg` image upload**
- 🤖 **Roboflow API implementation for object detection**
- 🟥 **Bounding box display** on the image to highlight detected regions along with their predicted pathology
- 🧠 **OpenAI integration for generating a clinical report**

## 🛠️ Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS
- **Backend:** FastAPI
- **APIs Implemented:** Roboflow, OpenAI

## 📦 Installation

The entire project has been **dockerized**, making it really easy to clone and run.

### 1. Create a `.env` file in the `server/` directory

Add the following variables:

```env
ROBOFLOW_API_KEY=your_roboflow_api_key
ROBOFLOW_MODEL=adr/6
OPENAI_API_KEY=your_openai_api_key  # optional
```

### 🔑 API Key Setup

The **Roboflow API key** can be obtained for free by:

- Signing into [Roboflow](https://roboflow.com/)
- Going to **Settings**
- Creating your **API key**

Set `ROBOFLOW_MODEL` to `"adr/6"` (this is required).

---

If you **do not have a valid OpenAI API key**, a **mock response** has been setup for testing purposes.

---

### ▶️ Start the Application

```bash
docker compose up --build
```
