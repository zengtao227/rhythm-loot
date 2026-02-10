from PIL import Image
import os
import shutil

# New sources from latest generation (Labubu)
sources = [
    {
        "name": "blink_labubu_doll_common",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/labubu_doll_v1_1770756549436.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/rewards/blink/v1"
    },
    {
        "name": "blink_labubu_space_suit_rare",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/labubu_space_suit_v1_1770756566192.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/rewards/blink/v1"
    }
]

def process_images():
    for item in sources:
        src_path = item["src"]
        dest_dir = item["dest"]
        name = item["name"]
        
        if not os.path.exists(src_path):
            print(f"Skipping {name}, source not found at {src_path}")
            continue
            
        if not os.path.exists(dest_dir):
            os.makedirs(dest_dir, exist_ok=True)
            
        try:
            img = Image.open(src_path)
            
            # Resize
            img = img.resize((256, 256), Image.Resampling.LANCZOS)
            
            # Save as WebP
            out_path = os.path.join(dest_dir, f"{name}.webp")
            img.save(out_path, "WEBP", quality=85, optimize=True)
            print(f"Processed {name} -> {out_path}")
            
        except Exception as e:
            print(f"Error processing {name}: {e}")

if __name__ == "__main__":
    process_images()
