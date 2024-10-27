# circle-and-search
circle the object and search


Frontend deployment: 
https://frontend-shivamarora1s-projects.vercel.app/

Backend deployment:
https://backend-shivamarora1s-projects.vercel.app/

Deploy to Vercel:
```
cd frontend / backend
vercel             
```


```mermaid
---
title: UI to Backend control flow
---
flowchart LR
    A[Cropped image from user] --> B[Backend]
    B -- similarity search --> C[(Vector DB)]
    C -- similar images with meta --> A
```
<hr>
<br>


```mermaid
---
title: Vector Generation and Storage
---
flowchart LR
    A[[Images with meta]] --> B[Backend]
    B -- Generate vectors --> C[(Vector DB)]

```