---
date: 2024-12-12
title: Terrain Models
params:
    projectStatus: Complete
---


# Cut or Print Real Terrain

## Get the Data

1. Visit [USGS Nationalmap](https://apps.nationalmap.gov/downloader/)
2. Zoom to desired area. Click "Extent" on upper left, and draw box outlining relevant area
3. Tick "Elevation Products (3DEP)" on left menu
4. Select "1/3 arc-second DEM" and click "Search Products" (Blue button)
5. Click "Download Link (TIF). Or, add necessary files to cart, view cart, and download GeoTIFF files

## Trim Data

1. Download and install [QGIS](https://www.qgis.org) or use package manager. Launch it.
2. Click "Data Source Manager" (upper left, three little squares icon)
3. Choose "Raster", and choose source file downloaded. Click Add, then Close.
4. The downloaded data will be larger than the area you selected, so if it's hard to find the feature you chose originally, you can add an OSM layer by following the steps above but going to XYZ, then OpenStreetMap.
5. In QGIS menus, choose Raster -&gt; Extraction -&gt; Clip Raster By Extent -&gt; Choose dialog for "clipping extent..." -&gt; Select Extent on Canvas -&gt; Choose desired area
6. Choose "Clipped (extent)" chooser menu and name output layer.

## Convert to STL

1. Install "DEMto3D" plugin (plugins -&gt; manage and install plugins)
2. Select Raster -&gt; DEMto3D -&gt; DEM 3D Printing
   
   1. You can choose "select full extent" to do the entire thing.
   2. 0.2mm spacing works well for smaller models, 0.1 for more detail. Check your physical machine's capabilities.
   3. Enter width and length.
   4. For height field, a positive value will "chop" that many meters off the original model. If you set it to the minimum elevation in your area, there will be no extra base padding.
   5. Export to STL

## Clean Up

1. Install and launch [Blender](https://www.blender.org/).
2. Delete default objects, then File -&gt; Import -&gt; STL. Choose your file.
3. Select imported mesh, then add modifier Smooth Corrective. I found these settings fix the "grid" pattern pretty well:
   
   - Factor: 0.8
   - Repeat: 5
   - Scale: 1.0
   - Smooth Type: Simple
   - Only Smooth
4. Then, you can re-export to STL or whatever and print or carve.
