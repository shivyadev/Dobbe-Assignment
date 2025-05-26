import pydicom
from PIL import Image
import io
import numpy as np

def convert_dicom_bytes_to_jpeg(file_bytes: bytes) -> io.BytesIO:
    # Step 1: Load DICOM file from bytes
    try:
        dcm = pydicom.dcmread(io.BytesIO(file_bytes), force=True)
    except Exception as e:
        raise ValueError(f"Failed to read DICOM file: {e}")

    # Step 2: Ensure pixel data exists
    if "PixelData" not in dcm:
        raise ValueError("DICOM file does not contain image data.")

    try:
        # Step 3: Access pixel array (this will trigger decompression if needed)
        pixel_array = dcm.pixel_array
    except Exception as e:
        raise ValueError(f"Failed to decode pixel data: {e}")

    # Step 4: Normalize pixel values to 8-bit (0–255)
    pixel_array = pixel_array.astype(np.float32)
    pixel_array -= pixel_array.min()
    if pixel_array.max() > 0:
        pixel_array /= pixel_array.max()
    pixel_array *= 255.0
    pixel_array = pixel_array.astype(np.uint8)

    # Step 5: Convert to RGB
    img = Image.fromarray(pixel_array).convert("RGB")

    # Step 6: Save to JPEG in-memory
    jpeg_buffer = io.BytesIO()
    img.save(jpeg_buffer, format="JPEG")
    jpeg_buffer.seek(0)
    return jpeg_buffer

def base64_to_data_url(base64_str: str) -> str:
    return f"data:image/png;base64,{base64_str}"

