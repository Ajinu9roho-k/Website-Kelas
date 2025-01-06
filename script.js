function openPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

function showGallery(categoryId) {
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach(gallery => {
        gallery.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}

function uploadFile() {
    const category = document.getElementById('categorySelect').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                document.getElementById(category).appendChild(imgElement);
            } else if (file.type.startsWith('video/')) {
                const videoElement = document.createElement('video');
                videoElement.src = URL.createObjectURL(file);
                videoElement.controls = true;
                document.getElementById(category).appendChild(videoElement);
            }
        };
        reader.readAsDataURL(file);
    }
    closePopup();
}

function goToPesanPage() {
    window.location.href = 'Pesan.html';  // Mengarahkan ke Pesan.html
}

function sendMessage() {
    const message = document.getElementById('messageText').value;
    if (message) {
        alert("Pesan terkirim: " + message);
        document.getElementById('messageText').value = '';
        closeMessagePopup();
    } else {
        alert("Pesan tidak boleh kosong!");
    }
}
