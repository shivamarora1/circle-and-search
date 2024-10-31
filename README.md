Circle to Search is a vector database powered feature that allows you to quickly search for information about what you see on your images, using a simple gesture with your finger or mouse pointer. 

### 👉 Live [Demo](https://frontend-shivamarora1s-projects.vercel.app/):

## Technologies used:


## Running in local:
1. Clone the repo.
2. Run Frontend
```
cd frontend
npm install
ng serve
```
3. Create `.env` referring to `.env.example`.
4. Run Backend
```
cd backend
npm install 
vercel dev
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
