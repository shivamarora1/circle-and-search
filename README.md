Circle to Search is a vector database powered feature that allows you to quickly search for information about what you see on your images, using a simple gesture with your finger or mouse pointer. <br>

![icon](https://github.com/user-attachments/assets/04f0a5a1-cc01-44dc-bc96-7e33d5fd162f)

<center><img src="https://github.com/user-attachments/assets/34da6c9f-5452-4b8f-b137-f5eedf0332e3" heigth=600 width=800></img></center>


 👉 <b>Live Demo:</b> [https://frontend-shivamarora1s-projects.vercel.app/](https://frontend-shivamarora1s-projects.vercel.app/)

 ## Architecture
![architecture](https://github.com/user-attachments/assets/6dedaa27-5b08-4579-a246-c8e8d74a0fad)

Embeddings of images along with their meta are stored inside Milvus vector database. Image embeddings are generated using titan multi embeddings generation model.

1. Image from frontend is sent to backend.
2. Backend generates embeddings of uploaded image using AWS Bedrock Titan Embedding generation model.
3. Vector Similarity search is performed using these generated embeddings and Milvus vector query.
4. Fetched results (Product image, Price, Link) are returned to frontend.

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
