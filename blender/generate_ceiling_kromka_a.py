import bpy
import bmesh
import random
from mathutils import Vector, Euler

# ==============================================================================
# CONFIGURATION
# ==============================================================================
MODULE_SIZE_X = 0.6  # 600mm
MODULE_SIZE_Y = 0.6  # 600mm
GRID_WIDTH_MODULES = 6   # 6 modules wide (approx 3.6m)
GRID_DEPTH_MODULES = 4   # 4 modules deep (approx 2.4m)

# T24 System Dimensions
PROFILE_WIDTH = 0.024
PROFILE_HEIGHT = 0.038
PROFILE_HEIGHT_CROSS = 0.029 # Often cross tees are shorter, sticking to 38 for uniformity or 29 for realism
PROFILE_HEIGHT_CROSS_SUB = 0.029

# Wall Angle
ANGLE_H = 0.024
ANGLE_W = 0.019

# Hangers
HANGER_LENGTH = 1.0 # 1 meter suspension
HANGER_SPACING = 1.2 # Space hangers every 1.2m along main runner

# Panel
PANEL_THICKNESS = 0.015
PANEL_CLEARANCE = 0.001
PANEL_WIDTH = MODULE_SIZE_X - 0.005
PANEL_LENGTH = MODULE_SIZE_Y - 0.005

# Colors
MAT_GRID_COLOR = (0.9, 0.9, 0.9, 1.0)
MAT_PANEL_COLOR = (0.95, 0.95, 0.95, 1.0)
MAT_HANGER_COLOR = (0.5, 0.5, 0.5, 1.0) # Metallic wire

# ==============================================================================
# HELPERS
# ==============================================================================
def cleanup_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

def create_material(name, color):
    mat = bpy.data.materials.get(name)
    if not mat:
        mat = bpy.data.materials.new(name=name)
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        nodes.clear()
        shader = nodes.new('ShaderNodeBsdfPrincipled')
        shader.inputs['Base Color'].default_value = color
        shader.inputs['Roughness'].default_value = 0.4
        shader.inputs['Metallic'].default_value = 0.1 if 'Hanger' in name else 0.0
        output = nodes.new('ShaderNodeOutputMaterial')
        mat.node_tree.links.new(shader.outputs[0], output.inputs[0])
    return mat

def create_profile_mesh(length, profile_type="T24_Main", name="Profile"):
    # Vertices for T24 or Angle
    w = PROFILE_WIDTH / 2
    h = PROFILE_HEIGHT
    
    if profile_type == "WallAngle":
        # L-shape 19x24
        w_leg = ANGLE_W
        h_leg = ANGLE_H
        th = 0.0015
        verts = [
            (0, 0, 0), (w_leg, 0, 0), (w_leg, th, 0), (th, th, 0),
            (th, h_leg, 0), (0, h_leg, 0)
        ]
        faces = [[0, 1, 2, 3, 4, 5]]
    else:
        # T-Shape
        if "Cross" in profile_type:
            h = PROFILE_HEIGHT_CROSS
            
        bulb = 0.006 / 2
        flange_th = 0.0015
        stem_th = 0.0015
        
        verts = [
            (-w, 0, 0), (w, 0, 0),
            (w, flange_th, 0), (stem_th/2, flange_th, 0),
            (stem_th/2, h - 0.003, 0), 
            (bulb, h - 0.003, 0), (bulb, h, 0), (-bulb, h, 0), (-bulb, h - 0.003, 0),
            (-stem_th/2, h - 0.003, 0),
            (-stem_th/2, flange_th, 0), (-w, flange_th, 0)
        ]
        faces = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]

    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    
    # Extrude
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, length, 0)})
    bpy.ops.object.mode_set(mode='OBJECT')
    
    # Center Origin
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    return obj

def create_hanger_mesh():
    # 1. Upper Wire (Hooked to ceiling)
    upper_len = HANGER_LENGTH * 0.5
    bpy.ops.mesh.primitive_cylinder_add(radius=0.0015, depth=upper_len, location=(0, 0, upper_len/2 + 0.1))
    wire_top = bpy.context.active_object
    
    # 2. Lower Wire (Hooked to profile)
    lower_len = HANGER_LENGTH * 0.5
    bpy.ops.mesh.primitive_cylinder_add(radius=0.0015, depth=lower_len, location=(0, 0, -lower_len/2 - 0.1))
    wire_bot = bpy.context.active_object
    
    # 3. Butterfly Spring Clip (The adjuster)
    # A curved sheet metal shape. Simplified as a scaled cube with slight deformation or just 2 plates.
    bpy.ops.mesh.primitive_cube_add(size=0.04)
    clip = bpy.context.active_object
    clip.scale = (0.3, 1.0, 1.5) # Thin in X, proper width Y, tall Z
    bpy.ops.object.transform_apply(scale=True)
    
    # Join parts
    parts = [wire_top, wire_bot, clip]
    with bpy.context.temp_override(active_object=clip, selected_editable_objects=parts):
        bpy.ops.object.join()

    
    # Adjust origin to bottom to attach to profile easily
    # The bottom of wire_bot is at (-lower_len/2 - 0.1) - (lower_len/2) = -lower_len - 0.1
    # Actually let's just leave origin at center and handle placement in main loop
    
    clip.name = "Hanger_Adjustable"
    return clip


def main():
    cleanup_scene()
    
    mat_grid = create_material("GridMat", MAT_GRID_COLOR)
    mat_panel = create_material("PanelMat", MAT_PANEL_COLOR)
    mat_hanger = create_material("HangerMat", MAT_HANGER_COLOR)
    
    coll = bpy.data.collections.new("VetonitCeiling")
    bpy.context.scene.collection.children.link(coll)
    
    # Grid Dimensions
    total_w = GRID_WIDTH_MODULES * MODULE_SIZE_X
    total_d = GRID_DEPTH_MODULES * MODULE_SIZE_Y
    
    # Offset to center
    off_x = -total_w / 2
    off_y = -total_d / 2
    
    # 1. Main Runners (Spaced 1200mm = 2 * Module X)
    # We place them at 0, 1.2, 2.4, 3.6...
    # Assuming GRID_WIDTH_MODULES is even for symmetry 
    
    main_runner_indices = []
    
    for i in range(0, GRID_WIDTH_MODULES + 1, 2):
        x = off_x + (i * MODULE_SIZE_X)
        
        runner = create_profile_mesh(total_d, "T24_Main", f"MainRunner_{i}")
        # Align: Extruded along Y. Y length is total_d.
        runner.location = (x, 0, PROFILE_HEIGHT/2) 
        runner.data.materials.append(mat_grid)
        
        bpy.context.collection.objects.unlink(runner)
        coll.objects.link(runner)
        main_runner_indices.append(i)
        
        # Add Hangers along this runner
        # Spacing HANGER_SPACING (1.2m)
        num_hangers = int(total_d / HANGER_SPACING)
        for h_idx in range(num_hangers + 1):
            hy = off_y + (h_idx * HANGER_SPACING)
            if hy > total_d/2: break
            
            hanger = create_hanger_mesh()
            hanger.location = (x, hy, PROFILE_HEIGHT + HANGER_LENGTH/2)
            hanger.data.materials.append(mat_hanger)
            bpy.context.collection.objects.unlink(hanger)
            coll.objects.link(hanger)

    # 2. Cross Tees (1200mm) - Spanning between Main Runners
    # Located at every MODULE_SIZE_Y along Y
    for j in range(GRID_DEPTH_MODULES + 1):
        y = off_y + (j * MODULE_SIZE_Y)
        
        for i_idx in range(len(main_runner_indices) - 1):
            start_i = main_runner_indices[i_idx]
            # Spanning 2 modules width (1200mm)
            
            x_center = off_x + (start_i * MODULE_SIZE_X) + MODULE_SIZE_X # Center of the 1200 span
            
            tee = create_profile_mesh(MODULE_SIZE_X * 2, "T24_Cross_1200", f"Cross1200_{i_idx}_{j}")
            tee.rotation_euler = (0, 0, 1.5708) # Rotate 90
            tee.location = (x_center, y, PROFILE_HEIGHT_CROSS/2)
            tee.data.materials.append(mat_grid)
            
            bpy.context.collection.objects.unlink(tee)
            coll.objects.link(tee)

    # 3. Cross Tees (600mm) - Subdividing the 1200mm spans
    # Located at center of 1200mm spans (X)
    for j in range(GRID_DEPTH_MODULES + 1):
         y = off_y + (j * MODULE_SIZE_Y)
         
         for i_idx in range(len(main_runner_indices) - 1):
            start_i = main_runner_indices[i_idx]
            x_mid = off_x + (start_i * MODULE_SIZE_X) + MODULE_SIZE_X
            
            # This tee runs Parallel to Main Runners, connecting the 1200 cross tees?
            # Standard pattern: Main runners 1200 apart. 
            # Cross tees (1200) connect main runners every 600.
            # Cross tees (600) connect the 1200 tees at their midpoints.
            # So the 600 tee runs Parallel to Main Runners.
            
            # Wait, 600 tee runs along Y (parallel to Main), connecting Cross Tees (X aligned).
            # It connects CrossTee at Y=0 to CrossTee at Y=0.6
            
            # Correction: The loop above (Cross Tees 1200) placed tees along X.
            # Now we need tees along Y, in the middle of the 1200 span.
            
            if j < GRID_DEPTH_MODULES: # Don't place beyond last row
                sub_y_center = y + (MODULE_SIZE_Y / 2)
                
                sub_tee = create_profile_mesh(MODULE_SIZE_Y, "T24_Cross_600", f"SubTee_{i_idx}_{j}")
                # Runs along Y, so no rot Z needed (extrusion is Y)
                sub_tee.location = (x_mid, sub_y_center, PROFILE_HEIGHT_CROSS_SUB/2)
                sub_tee.data.materials.append(mat_grid)
                
                bpy.context.collection.objects.unlink(sub_tee)
                coll.objects.link(sub_tee)

    # 4. Wall Angle (Perimeter)
    # Top/Bottom
    angle_top = create_profile_mesh(total_w, "WallAngle", "WallAngle_Top")
    angle_top.rotation_euler = (0, 0, 1.5708)
    angle_top.location = (0, total_d/2, ANGLE_H/2)
    angle_top.data.materials.append(mat_grid)
    bpy.context.collection.objects.unlink(angle_top)
    coll.objects.link(angle_top)
    
    angle_bot = create_profile_mesh(total_w, "WallAngle", "WallAngle_Bot")
    angle_bot.rotation_euler = (0, 0, 1.5708)
    # Flip it? Usually angles face inside.
    angle_bot.location = (0, -total_d/2, ANGLE_H/2)
    angle_bot.data.materials.append(mat_grid)
    bpy.context.collection.objects.unlink(angle_bot)
    coll.objects.link(angle_bot)

    # Left/Right
    angle_left = create_profile_mesh(total_d, "WallAngle", "WallAngle_Left")
    angle_left.location = (-total_w/2, 0, ANGLE_H/2)
    angle_left.data.materials.append(mat_grid)
    bpy.context.collection.objects.unlink(angle_left)
    coll.objects.link(angle_left)

    angle_right = create_profile_mesh(total_d, "WallAngle", "WallAngle_Right")
    angle_right.rotation_euler = (0, 0, 3.14159) # Rotate 180 to face inside??
    angle_right.location = (total_w/2, 0, ANGLE_H/2)
    angle_right.data.materials.append(mat_grid)
    bpy.context.collection.objects.unlink(angle_right)
    coll.objects.link(angle_right)

    # 5. Panels
    offset_z = 0.0015
    
    # Randomly skip some panels to show "cutout" effect like in diagram?
    # Or just fill all. User said "1 in 1 as in photo". Photo has cutaway.
    # Let's fill 80% and leave a corner open.
    
    for i in range(GRID_WIDTH_MODULES):
        for j in range(GRID_DEPTH_MODULES):
            # Cutaway logic: Skip corner (0,0) and (0,1)?
            if i < 2 and j < 2: continue 
            
            cx = off_x + (i * MODULE_SIZE_X) + MODULE_SIZE_X/2
            cy = off_y + (j * MODULE_SIZE_Y) + MODULE_SIZE_Y/2
            
            panel = bpy.data.objects.new(f"Panel_{i}_{j}", bpy.data.meshes.new(f"PanelMesh_{i}_{j}"))
            bpy.ops.mesh.primitive_cube_add(size=1)
            temp = bpy.context.active_object
            panel.data = temp.data
            bpy.ops.object.delete()
            
            panel.scale = (PANEL_WIDTH, PANEL_LENGTH, PANEL_THICKNESS)
            panel.location = (cx, cy, offset_z + PANEL_THICKNESS/2)
            panel.data.materials.append(mat_panel)
            
            # Ensure panel is in our collection
            if panel.name not in coll.objects:
                coll.objects.link(panel)
            
            # Remove from other collections (e.g. Scene Collection) to avoid duplicates
            for c in panel.users_collection:
                if c != coll:
                    c.objects.unlink(panel)



    # Camera Setup (Isometric-ish)
    bpy.ops.object.camera_add(location=(4, -4, 3))
    cam = bpy.context.active_object
    cam.rotation_euler = (0.9, 0, 0.785)
    bpy.context.scene.camera = cam
    
    # Lighting
    bpy.ops.object.light_add(type='SUN', location=(5, -5, 10))
    light = bpy.context.active_object
    light.data.energy = 5
    
    bpy.ops.object.light_add(type='AREA', location=(-2, -2, 4))
    fill = bpy.context.active_object
    fill.data.energy = 50
    
    # Save
    # bpy.ops.wm.save_as_mainfile(filepath="blender/kromka_a_detailed.blend")


if __name__ == "__main__":
    main()

