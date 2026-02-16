"""
WESHOW Kinetic Screen 3D Model - Samara VDNH Style
====================================================
Blender Python script to create a kinetic screen 3D model.

Specs based on real WESHOW project:
- Screen size: 5m x 3m
- Each pixel can extend up to 20cm
- Programmable speed and patterns
- Dynamic 3D relief effects

Usage: 
  1. Open Blender
  2. Go to Scripting workspace
  3. Open this file and click "Run Script"
  OR paste into Blender's Python console
"""

import bpy
import math
import random
from mathutils import Vector, Color

# ============================================================
# CONFIGURATION
# ============================================================
SCREEN_WIDTH = 5.0       # meters
SCREEN_HEIGHT = 3.0      # meters
PIXEL_COLS = 50          # number of pixel columns
PIXEL_ROWS = 30          # number of pixel rows
MAX_EXTRUSION = 0.20     # max pixel extrusion in meters (20cm)
PIXEL_GAP = 0.003        # gap between pixels in meters
FRAME_DEPTH = 0.15       # frame/housing depth in meters
FRAME_BORDER = 0.08      # frame border width in meters

# Animation settings
ANIMATE = True
TOTAL_FRAMES = 120       # total animation frames
WAVE_SPEED = 2.0         # wave animation speed
WAVE_AMPLITUDE = 1.0     # wave amplitude (0-1, relative to MAX_EXTRUSION)

# Colors
PIXEL_COLOR_BASE = (0.05, 0.08, 0.15, 1.0)    # dark blue-black base
PIXEL_COLOR_GLOW = (0.2, 0.5, 1.0, 1.0)       # blue glow
FRAME_COLOR = (0.02, 0.02, 0.02, 1.0)          # near-black frame
ACCENT_COLOR = (0.0, 0.4, 1.0, 1.0)            # blue accent LED strip


# ============================================================
# CLEANUP
# ============================================================
def cleanup_scene():
    """Remove all objects from the scene."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    
    # Clean up orphan data
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)


# ============================================================
# MATERIALS
# ============================================================
def create_pixel_material(name="PixelMaterial"):
    """Create a glowing pixel material with emission."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Clear default nodes
    nodes.clear()
    
    # Output
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (600, 0)
    
    # Mix shader (base + emission)
    mix = nodes.new('ShaderNodeMixShader')
    mix.location = (400, 0)
    mix.inputs[0].default_value = 0.7  # mix factor
    
    # Principled BSDF for base
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    principled.location = (0, 100)
    principled.inputs['Base Color'].default_value = PIXEL_COLOR_BASE
    principled.inputs['Metallic'].default_value = 0.8
    principled.inputs['Roughness'].default_value = 0.3
    
    # Emission shader for glow
    emission = nodes.new('ShaderNodeEmission')
    emission.location = (0, -100)
    emission.inputs['Color'].default_value = PIXEL_COLOR_GLOW
    emission.inputs['Strength'].default_value = 2.0
    
    # Links
    links.new(principled.outputs[0], mix.inputs[1])
    links.new(emission.outputs[0], mix.inputs[2])
    links.new(mix.outputs[0], output.inputs[0])
    
    return mat


def create_frame_material(name="FrameMaterial"):
    """Create a dark metallic frame material."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Clear default nodes
    nodes.clear()
    
    # Output
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    # Principled BSDF
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    principled.location = (0, 0)
    principled.inputs['Base Color'].default_value = FRAME_COLOR
    principled.inputs['Metallic'].default_value = 0.95
    principled.inputs['Roughness'].default_value = 0.15
    
    links.new(principled.outputs[0], output.inputs[0])
    
    return mat


def create_accent_material(name="AccentMaterial"):
    """Create LED accent strip material."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    nodes.clear()
    
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    emission = nodes.new('ShaderNodeEmission')
    emission.location = (0, 0)
    emission.inputs['Color'].default_value = ACCENT_COLOR
    emission.inputs['Strength'].default_value = 5.0
    
    links.new(emission.outputs[0], output.inputs[0])
    
    return mat


# ============================================================
# GEOMETRY
# ============================================================
def create_frame():
    """Create the main frame/housing for the kinetic screen."""
    frame_mat = create_frame_material()
    accent_mat = create_accent_material()
    
    # Main back panel
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(0, FRAME_DEPTH / 2, 0)
    )
    back_panel = bpy.context.active_object
    back_panel.name = "KS_BackPanel"
    back_panel.scale = (
        SCREEN_WIDTH / 2 + FRAME_BORDER,
        FRAME_DEPTH / 2,
        SCREEN_HEIGHT / 2 + FRAME_BORDER
    )
    bpy.ops.object.transform_apply(scale=True)
    back_panel.data.materials.append(frame_mat)
    
    # Top frame border
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(0, -0.02, SCREEN_HEIGHT / 2 + FRAME_BORDER / 2)
    )
    top_border = bpy.context.active_object
    top_border.name = "KS_TopBorder"
    top_border.scale = (
        SCREEN_WIDTH / 2 + FRAME_BORDER,
        0.04,
        FRAME_BORDER / 2
    )
    bpy.ops.object.transform_apply(scale=True)
    top_border.data.materials.append(frame_mat)
    
    # Bottom frame border
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(0, -0.02, -(SCREEN_HEIGHT / 2 + FRAME_BORDER / 2))
    )
    bottom_border = bpy.context.active_object
    bottom_border.name = "KS_BottomBorder"
    bottom_border.scale = (
        SCREEN_WIDTH / 2 + FRAME_BORDER,
        0.04,
        FRAME_BORDER / 2
    )
    bpy.ops.object.transform_apply(scale=True)
    bottom_border.data.materials.append(frame_mat)
    
    # Left frame border
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(-(SCREEN_WIDTH / 2 + FRAME_BORDER / 2), -0.02, 0)
    )
    left_border = bpy.context.active_object
    left_border.name = "KS_LeftBorder"
    left_border.scale = (
        FRAME_BORDER / 2,
        0.04,
        SCREEN_HEIGHT / 2
    )
    bpy.ops.object.transform_apply(scale=True)
    left_border.data.materials.append(frame_mat)
    
    # Right frame border
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(SCREEN_WIDTH / 2 + FRAME_BORDER / 2, -0.02, 0)
    )
    right_border = bpy.context.active_object
    right_border.name = "KS_RightBorder"
    right_border.scale = (
        FRAME_BORDER / 2,
        0.04,
        SCREEN_HEIGHT / 2
    )
    bpy.ops.object.transform_apply(scale=True)
    right_border.data.materials.append(frame_mat)
    
    # LED accent strip at bottom
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(0, -0.045, -(SCREEN_HEIGHT / 2 + FRAME_BORDER + 0.005))
    )
    led_strip = bpy.context.active_object
    led_strip.name = "KS_LEDStrip"
    led_strip.scale = (
        SCREEN_WIDTH / 2 + FRAME_BORDER,
        0.005,
        0.005
    )
    bpy.ops.object.transform_apply(scale=True)
    led_strip.data.materials.append(accent_mat)
    
    return [back_panel, top_border, bottom_border, left_border, right_border, led_strip]


def create_pixels():
    """Create the grid of kinetic pixels."""
    pixel_mat = create_pixel_material()
    
    pixel_width = (SCREEN_WIDTH - (PIXEL_COLS + 1) * PIXEL_GAP) / PIXEL_COLS
    pixel_height = (SCREEN_HEIGHT - (PIXEL_ROWS + 1) * PIXEL_GAP) / PIXEL_ROWS
    
    pixels = []
    
    # Starting positions (bottom-left corner of the screen area)
    start_x = -SCREEN_WIDTH / 2 + PIXEL_GAP + pixel_width / 2
    start_z = -SCREEN_HEIGHT / 2 + PIXEL_GAP + pixel_height / 2
    
    for row in range(PIXEL_ROWS):
        for col in range(PIXEL_COLS):
            # Calculate position
            x = start_x + col * (pixel_width + PIXEL_GAP)
            z = start_z + row * (pixel_height + PIXEL_GAP)
            
            # Calculate extrusion for initial wave pattern
            # Create a radial wave emanating from center
            cx = col / PIXEL_COLS - 0.5
            cz = row / PIXEL_ROWS - 0.5
            dist = math.sqrt(cx**2 + cz**2) * 2
            wave = (math.sin(dist * math.pi * 3) + 1) / 2
            extrusion = wave * MAX_EXTRUSION
            
            # Create pixel cube
            bpy.ops.mesh.primitive_cube_add(
                size=1,
                location=(x, -(extrusion / 2), z)
            )
            pixel = bpy.context.active_object
            pixel.name = f"KS_Pixel_{row:02d}_{col:02d}"
            pixel.scale = (
                pixel_width / 2,
                max(extrusion / 2, 0.005),  # minimum depth
                pixel_height / 2
            )
            bpy.ops.object.transform_apply(scale=True)
            
            # Assign material
            pixel.data.materials.append(pixel_mat)
            
            # Store grid position as custom properties
            pixel["grid_row"] = row
            pixel["grid_col"] = col
            pixel["extrusion"] = extrusion
            
            pixels.append(pixel)
    
    return pixels


def animate_pixels(pixels):
    """Add wave animation to the pixel grid."""
    if not ANIMATE:
        return
    
    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = TOTAL_FRAMES
    bpy.context.scene.frame_set(1)
    
    for pixel in pixels:
        row = pixel["grid_row"]
        col = pixel["grid_col"]
        
        # Normalized coordinates
        nx = col / PIXEL_COLS
        nz = row / PIXEL_ROWS
        
        for frame in range(1, TOTAL_FRAMES + 1, 2):  # keyframe every 2 frames
            t = frame / TOTAL_FRAMES * math.pi * 2 * WAVE_SPEED
            
            # Complex wave pattern: radial + diagonal
            cx = nx - 0.5
            cz = nz - 0.5
            dist = math.sqrt(cx**2 + cz**2) * 2
            
            wave1 = math.sin(dist * math.pi * 3 - t)           # radial wave
            wave2 = math.sin((nx + nz) * math.pi * 4 - t * 1.3)  # diagonal wave
            wave3 = math.sin(nx * math.pi * 2 - t * 0.7)        # horizontal wave
            
            # Combine waves
            combined = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2 + 1) / 2
            extrusion = combined * MAX_EXTRUSION * WAVE_AMPLITUDE
            extrusion = max(extrusion, 0.005)
            
            # Set pixel Y position and scale
            pixel.location.y = -(extrusion / 2)
            pixel.scale.y = extrusion / 0.01  # scale relative to base
            
            pixel.keyframe_insert(data_path="location", index=1, frame=frame)
            pixel.keyframe_insert(data_path="scale", index=1, frame=frame)
    
    # Set interpolation to smooth
    for pixel in pixels:
        if pixel.animation_data and pixel.animation_data.action:
            for fcurve in pixel.animation_data.action.fcurves:
                for keyframe in fcurve.keyframe_points:
                    keyframe.interpolation = 'BEZIER'
                    keyframe.handle_left_type = 'AUTO'
                    keyframe.handle_right_type = 'AUTO'


# ============================================================
# SCENE SETUP
# ============================================================
def setup_camera():
    """Set up a nice camera angle."""
    bpy.ops.object.camera_add(
        location=(4.5, -5.0, 2.0),
        rotation=(math.radians(70), 0, math.radians(35))
    )
    camera = bpy.context.active_object
    camera.name = "KS_Camera"
    
    # Track to center of screen
    constraint = camera.constraints.new('TRACK_TO')
    empty = bpy.ops.object.empty_add(location=(0, -0.1, 0.2))
    target = bpy.context.active_object
    target.name = "KS_CameraTarget"
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'
    
    # Set as active camera
    bpy.context.scene.camera = camera
    
    # Camera settings
    camera.data.lens = 35
    camera.data.clip_start = 0.1
    camera.data.clip_end = 100
    
    return camera


def setup_lighting():
    """Set up dramatic lighting for the kinetic screen."""
    # Key light (area light from upper right)
    bpy.ops.object.light_add(
        type='AREA',
        location=(3, -4, 4)
    )
    key_light = bpy.context.active_object
    key_light.name = "KS_KeyLight"
    key_light.data.energy = 500
    key_light.data.size = 3
    key_light.data.color = (0.9, 0.95, 1.0)
    key_light.rotation_euler = (math.radians(55), math.radians(15), math.radians(-25))
    
    # Fill light (softer from left)
    bpy.ops.object.light_add(
        type='AREA',
        location=(-4, -3, 2)
    )
    fill_light = bpy.context.active_object
    fill_light.name = "KS_FillLight"
    fill_light.data.energy = 200
    fill_light.data.size = 5
    fill_light.data.color = (0.7, 0.8, 1.0)
    fill_light.rotation_euler = (math.radians(65), math.radians(-20), math.radians(20))
    
    # Rim light (from behind for edge definition)
    bpy.ops.object.light_add(
        type='SPOT',
        location=(0, 2, 3)
    )
    rim_light = bpy.context.active_object
    rim_light.name = "KS_RimLight"
    rim_light.data.energy = 300
    rim_light.data.spot_size = math.radians(90)
    rim_light.data.color = (0.5, 0.7, 1.0)
    rim_light.rotation_euler = (math.radians(150), 0, 0)
    
    # Accent light (blue, from below for dramatic effect)
    bpy.ops.object.light_add(
        type='AREA',
        location=(0, -2, -2)
    )
    accent_light = bpy.context.active_object
    accent_light.name = "KS_AccentLight"
    accent_light.data.energy = 150
    accent_light.data.size = 4
    accent_light.data.color = (0.2, 0.4, 1.0)
    accent_light.rotation_euler = (math.radians(-30), 0, 0)
    
    return [key_light, fill_light, rim_light, accent_light]


def setup_world():
    """Set up dark environment."""
    world = bpy.context.scene.world
    if world is None:
        world = bpy.data.worlds.new("KS_World")
        bpy.context.scene.world = world
    
    world.use_nodes = True
    nodes = world.node_tree.nodes
    
    bg = nodes.get('Background')
    if bg:
        bg.inputs['Color'].default_value = (0.01, 0.01, 0.02, 1.0)
        bg.inputs['Strength'].default_value = 0.3


def setup_render_settings():
    """Configure render settings for high quality output."""
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 128
    scene.cycles.use_denoising = True
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.film_transparent = False
    
    # Try to use GPU if available
    prefs = bpy.context.preferences.addons.get('cycles')
    if prefs:
        try:
            prefs.preferences.compute_device_type = 'METAL'  # macOS
        except:
            pass


def create_floor():
    """Create a reflective floor beneath the screen."""
    bpy.ops.mesh.primitive_plane_add(
        size=15,
        location=(0, 0, -(SCREEN_HEIGHT / 2 + FRAME_BORDER + 0.3))
    )
    floor = bpy.context.active_object
    floor.name = "KS_Floor"
    
    # Reflective floor material
    mat = bpy.data.materials.new("FloorMaterial")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Clear default nodes
    nodes.clear()
    
    # Output
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    # Principled BSDF
    principled = nodes.new('ShaderNodeBsdfPrincipled')
    principled.location = (0, 0)
    principled.inputs['Base Color'].default_value = (0.01, 0.01, 0.02, 1.0)
    principled.inputs['Metallic'].default_value = 0.0
    principled.inputs['Roughness'].default_value = 0.05
    
    # Try to set Specular IOR Level (may vary by Blender version)
    try:
        principled.inputs['Specular IOR Level'].default_value = 0.8
    except KeyError:
        try:
            principled.inputs['Specular'].default_value = 0.8
        except KeyError:
            pass
    
    links.new(principled.outputs[0], output.inputs[0])
    
    floor.data.materials.append(mat)
    return floor


# ============================================================
# MAIN
# ============================================================
def main():
    print("=" * 60)
    print("WESHOW Kinetic Screen 3D Model Generator")
    print("=" * 60)
    
    # Step 1: Clean scene
    print("[1/7] Cleaning scene...")
    cleanup_scene()
    
    # Step 2: Setup world/environment
    print("[2/7] Setting up environment...")
    setup_world()
    
    # Step 3: Create frame
    print("[3/7] Creating frame/housing...")
    frame_parts = create_frame()
    
    # Step 4: Create pixels
    print(f"[4/7] Creating {PIXEL_COLS}x{PIXEL_ROWS} = {PIXEL_COLS * PIXEL_ROWS} pixels...")
    pixels = create_pixels()
    
    # Step 5: Animate
    if ANIMATE:
        print(f"[5/7] Animating pixels ({TOTAL_FRAMES} frames)...")
        animate_pixels(pixels)
    else:
        print("[5/7] Animation skipped.")
    
    # Step 6: Setup camera & lighting
    print("[6/7] Setting up camera and lighting...")
    setup_camera()
    setup_lighting()
    create_floor()
    
    # Step 7: Render settings
    print("[7/7] Configuring render settings...")
    setup_render_settings()
    
    # Parent all to an empty for easy manipulation
    bpy.ops.object.empty_add(location=(0, 0, 0))
    parent_empty = bpy.context.active_object
    parent_empty.name = "KineticScreen_Root"
    
    # Select screen parts and parent
    for obj in frame_parts + pixels:
        obj.parent = parent_empty
    
    # Final setup
    bpy.context.scene.frame_set(1)
    
    print("=" * 60)
    print("✅ Kinetic Screen model created successfully!")
    print(f"   - Screen: {SCREEN_WIDTH}m x {SCREEN_HEIGHT}m")
    print(f"   - Pixels: {PIXEL_COLS} x {PIXEL_ROWS} = {PIXEL_COLS * PIXEL_ROWS}")
    print(f"   - Max extrusion: {MAX_EXTRUSION * 100}cm")
    print(f"   - Animation: {TOTAL_FRAMES} frames")
    print("=" * 60)
    print("Press F12 to render, or Space to play animation")


if __name__ == "__main__":
    main()
