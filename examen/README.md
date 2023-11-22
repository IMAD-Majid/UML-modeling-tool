# 2010

UC
```
{"systemName":"School","actors":[null,null,null,null,null,null,null,null,{"name":"Student","usecases":["inscription a un cours"],"x":24.5,"y":407,"width":160,"height":96},{"name":"Teacher","usecases":["prendre un cours"],"x":25.5,"y":177,"width":160,"height":96},null,{"name":"Director","usecases":["donner Catalogue"],"x":21.5,"y":48,"width":160,"height":96}],"cases":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"name":"verification","inclusions":[],"extensions":[],"x":784.5,"y":388,"width":160,"height":32},null,null,null,null,null,null,{"name":"selectioned 2 cours Secondaires","inclusions":[],"extensions":[],"x":545.5,"y":439,"width":160,"height":32},{"name":"selectioned 2 cours Primaires","inclusions":[],"extensions":[],"x":540.5,"y":490,"width":160,"height":32},{"name":"prendre un cours","inclusions":[],"extensions":[],"x":263.5,"y":228,"width":160,"height":32},{"name":"inscription a un cours","inclusions":["verification","selectioned 2 cours Secondaires","selectioned 2 cours Primaires"],"extensions":[],"x":439.5,"y":384,"width":160,"height":32},{"name":"donner Catalogue","inclusions":[],"extensions":[],"x":393.5,"y":89,"width":160,"height":32}]}
```

CD
```
{"Student":{"name":"Student","attributes":["cours secondaires","cours primaires"],"methods":[],"inheritances":[],"x":349.6875,"y":266,"width":180,"height":96},"Cour":{"name":"Cour","attributes":["teacher NOT NULL","cursus","prerequis"],"methods":[],"inheritances":[],"x":613.6875,"y":162,"width":180,"height":112},"Director":{"name":"Director","attributes":[],"methods":["donner catalogue"],"inheritances":[],"x":120.6875,"y":26,"width":180,"height":80},"Teacher":{"name":"Teacher","attributes":["mes cours"],"methods":[],"inheritances":[],"x":601.6875,"y":18,"width":180,"height":80},"Catalogue":{"name":"Catalogue","attributes":["list des cours"],"methods":[],"inheritances":[],"x":115.6875,"y":130,"width":180,"height":80}}
```
