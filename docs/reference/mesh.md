## Mesh

```
Mesh {
  field MFString url [ ]
}
```

### Description

The [Mesh](#mesh) node represents a 3D shape imported from an external file created by a 3D modeling software.
The [Mesh](#mesh) node can be used either as a graphical or as a collision detection primitive (in a boundingObject).
Currently, the following formats are supported:
  - [Collada](https://en.wikipedia.org/wiki/COLLADA) files (.dae).
  - [STL](https://en.wikipedia.org/wiki/STL_(file_format)) files (.stl).
  - [Wavefront](https://wiki.fileformat.com/3d/obj) files (.obj).

If the file contains more than one mesh, the meshes will be merged into a single one.

### Field Summary

The `url` field defines the 3D file.
If the `url` value starts with `http://` or `https://`, Webots will get the file from the web.
Otherwise, the file should be specified with a relative path.
The same search algorithm as for [ImageTexture](imagetexture.md) is used (cf. [this section](imagetexture.md#search-rule-of-the-texture-path)).
Absolute paths work as well, but they are not recommended because they are not portable across systems.
