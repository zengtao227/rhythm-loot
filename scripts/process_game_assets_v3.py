from PIL import Image
import os
import shutil

# New sources from latest generation
sources = [
    {
        "name": "blink_backstage_pass_epic_v2",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/blink_backstage_pass_v2_1770755700146.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/rewards/blink/v1"
    },
    {
        "name": "cyber_katana_epic",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/cyber_katana_v2_1770755730467.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/images/loot"
    },
    {
        "name": "cyber_energy_cell_common",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/energy_cell_v3_1770755745865.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/images/loot"
    },
    {
        "name": "cyber_hacking_deck_uncommon",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/hacking_deck_v1_1770755759555.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/images/loot"
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
            
            # Resize - maintain aspect ratio but fit within 256x256
            # Actually standardizing to 256x256 square is better for grid consistency
            img = img.resize((256, 256), Image.Resampling.LANCZOS)
            
            # Save as WebP
            out_path = os.path.join(dest_dir, f"{name}.webp")
            img.save(out_path, "WEBP", quality=85, optimize=True)
            print(f"Processed {name} -> {out_path}")
            
        except Exception as e:
            print(f"Error processing {name}: {e}")

if __name__ == "__main__":
    process_images()
