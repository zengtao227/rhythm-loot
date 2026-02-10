from PIL import Image
import os

# New sources from latest generation
sources = [
    {
        "name": "zelda_fairy_bottle_uncommon",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/fairy_bottle_v1_1770743223040.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/rewards/quest/v1"
    },
    {
        "name": "zelda_light_arrows_epic",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/light_arrows_v1_1770743237332.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/rewards/quest/v1"
    },
    {
        "name": "cyber_railgun",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/railgun_sniper_v1_1770743253861.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/images/loot"
    },
    {
        "name": "shadow_drone",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/shadow_drone_v2_1770743280512.png",
        "dest": "/Users/zengtao/rhythm-loot/public/assets/images/loot"
    },
    {
        "name": "tactical_visor",
        "src": "/Users/zengtao/.gemini/antigravity/brain/c7097869-181a-4f58-a0d4-f1628851e141/tactical_visor_v2_1770743294369.png",
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
