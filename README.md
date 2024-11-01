Circle to Search is a vector database powered feature that allows you to quickly search for information about what you see on your images, using a simple gesture with your finger or mouse pointer. <br>

![icon](https://github.com/user-attachments/assets/04f0a5a1-cc01-44dc-bc96-7e33d5fd162f)

<center><img src="https://github.com/user-attachments/assets/b160bdb9-af46-41f5-94f4-6c84c92f86f5" heigth=600 width=800></img></center>

 👉 <b>Live Demo:</b> [https://frontend-shivamarora1s-projects.vercel.app/](https://frontend-shivamarora1s-projects.vercel.app/)

 ## Architecture
![architecture](https://github.com/user-attachments/assets/6dedaa27-5b08-4579-a246-c8e8d74a0fad)


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
