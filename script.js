// Import Firebase functions from firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV-aZwovuhXZFC7rDlp2LrYau0Qhq_ob4",
  authDomain: "kenangan-project.firebaseapp.com",
  projectId: "kenangan-project",
  storageBucket: "kenangan-project.firebasestorage.app",
  messagingSenderId: "774686225546",
  appId: "1:774686225546:web:b2db50fb3c4faec7bb6973",
  measurementId: "G-2EVFWN4WF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Get references to HTML elements
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');
const categorySelect = document.getElementById('categorySelect');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

// Gallery containers for uploaded files
const galleries = {
  studyTour: document.getElementById('studyTour'),
  randomImages: document.getElementById('randomImages'),
  classPhotos: document.getElementById('classPhotos'),
  randomVideos: document.getElementById('randomVideos'),
};

// Function to upload files
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0]; // Get file from input
  const category = categorySelect.value; // Get selected category

  if (file) {
    const fileName = `${category}/${file.name}`; // Define path in Firebase Storage
    const storageRef = ref(storage, fileName); // Create a reference to the file
    const uploadTask = uploadBytesResumable(storageRef, file); // Start upload task

    // Handle upload progress
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, (error) => {
      console.error('Error uploading file:', error);
    }, () => {
      // File uploaded successfully
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // Create an element for the uploaded file
        let element;
        if (file.type.startsWith('image/')) {
          element = document.createElement('img');
          element.src = downloadURL;
          element.alt = file.name;
        } else if (file.type.startsWith('video/')) {
          element = document.createElement('video');
          element.src = downloadURL;
          element.controls = true;
        }
        // Add the element to the appropriate gallery
        if (element) {
          galleries[category].appendChild(element);
        }
        closePopup(); // Close popup after upload
      });
    });
  }
});

// Function to open popup
function openPopup() {
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

// Function to close popup
function closePopup() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

// Function to show gallery
function showGallery(category) {
  Object.keys(galleries).forEach((key) => {
    galleries[key].style.display = key === category ? 'block' : 'none';
  });
}

export { openPopup, closePopup, showGallery };
