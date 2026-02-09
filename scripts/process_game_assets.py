from PIL import Image
import os
import shutil

# Source paths (from previous generation output)
sources = {
    "cyber_pistol": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/cyber_pistol_v1_1770668744049.png",
    "plasma_rifle": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/plasma_rifle_v1_1770668757662.png",
    "holo_sight": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/holo_sight_v1_1770668774791.png",
    "mecha_spider": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/mecha_spider_v1_1770668793727.png",
    "slime_blob": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/slime_blob_v1_1770668807149.png"
}

target_dir = "/Users/zengtao/rhythm-loot/public/assets/images/loot"

def process_images():
    for name, path in sources.items():
        if not os.path.exists(path):
            print(f"Skipping {name}, file not found")
            continue
            
        try:
            img = Image.open(path)
            
            # Resize
            # Standard game asset icon size: 256x256
            img = img.resize((256, 256), Image.Resampling.LANCZOS)
            
            # Save as WebP
            out_path = os.path.join(target_dir, f"{name}.webp")
            img.save(out_path, "WEBP", quality=85, optimize=True)
            print(f"Processed {name} -> {out_path}")
            
            # Remove old png if exists
            old_png = os.path.join(target_dir, f"{name}.png")
            if os.path.exists(old_png):
                os.remove(old_png)
            
        except Exception as e:
            print(f"Error processing {name}: {e}")

if __name__ == "__main__":
    process_images()
