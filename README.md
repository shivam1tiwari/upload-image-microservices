# Upload Image On Cloud with NodeJs
This is an app where we can upload an image from frontend and recieve on server side then it send on cloudinary in a response image url saved in database and can further access througth our database.
In this app we used multur for file handling and cloudinary for cloud upload service.
## Run This project
 ```bash
  git clone https://github.com/shivam1tiwari/upload-image-microservices.git
  cd upload-image-microservices
```
## For Frontend
   ```bash
  cd frontend
  npm install
  npm run dev
```
## For Backend
   ```bash
  cd backend
  npm install
```
### Before running start backend will sure you have 
#### set database parameters as mention in env file
 ```bash
export  CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dntanks1k
npm start
```

<img width="1166" alt="Screenshot 2025-04-24 at 5 26 00 PM" src="https://github.com/user-attachments/assets/05e6831a-84ed-46dc-8316-c3881f92eec5" />
