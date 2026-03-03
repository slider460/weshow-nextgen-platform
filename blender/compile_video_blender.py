import bpy
import os

# Configuration
IMAGE_DIR = "/tmp"
OUTPUT_FILE = "/Users/aleksandrnarodetskii/Documents/WESHOW2026_antigravity/weshow-nextgen-platform/public/we_show_kinetic.mp4"
FPS = 30

# Count frames
files = [f for f in os.listdir(IMAGE_DIR) if f.endswith(".png") and f[:4].isdigit()]
files.sort()
if not files:
    print("No PNG files found in /tmp")
    exit(1)

START_FRAME = 1
END_FRAME = int(files[-1][:4])
print(f"Found {len(files)} frames. Rendering from {START_FRAME} to {END_FRAME}...")

# Clear existing data
bpy.ops.wm.read_factory_settings(use_empty=True)

# Set up scene
scene = bpy.context.scene
scene.render.fps = FPS
scene.frame_start = START_FRAME
scene.frame_end = END_FRAME
scene.render.image_settings.file_format = 'FFMPEG'
scene.render.ffmpeg.format = 'MPEG4'
scene.render.ffmpeg.codec = 'H264'
scene.render.ffmpeg.constant_rate_factor = 'MEDIUM'
scene.render.ffmpeg.ffmpeg_preset = 'GOOD'
scene.render.filepath = OUTPUT_FILE

# Set up sequence editor
if not scene.sequence_editor:
    scene.sequence_editor_create()

seq = scene.sequence_editor
# Add image strip
directory = IMAGE_DIR + "/"
files_list = [{"name": f} for f in files]
seq.sequences.new_image("ImageSequence", directory, 1, 1)

# Render animation
bpy.ops.render.render(animation=True)
print(f"Video rendered to: {OUTPUT_FILE}")
