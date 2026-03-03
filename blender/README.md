# WESHOW 3D Workspace

This directory is a **STANDALONE** workspace for 3D asset generation.
It is completely independent of the WESHOW web application.

## Purpose

To experiment with and generate 3D visuals using Blender Python (bpy).
The outputs from this workspace are **NOT** automatically part of the website build process.
They are separate creative assets.

## Workflow

1.  **Generate/Edit Scene**:
    *   Open Blender.
    *   Load `blender_kinetic_screen.py` in the Scripting tab.
    *   Run the script to build the procedural kinetic screen scene.
    *   Tween/animate as needed.

2.  **Render**:
    *   Render the animation as an image sequence.
    *   Or render directly to video.

3.  **Compile Video (Optional)**:
    *   Use `compile_video_blender.py` to stitch frames into video (requires Blender Python).
    *   `python3 compile_video_blender.py`

## Files

*   `blender_kinetic_screen.py`: Builds the 3D scene programmatically.
*   `compile_video_blender.py`: Helper to stitch frames into video.

## Important Note

These scripts are for internal creative use only. Do not confuse them with the web platform code.
