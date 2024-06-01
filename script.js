let cropper;
let currentImageIndex;
let currentImageWidth;
let currentImageHeight;
const cropModal = document.getElementById('cropModal');
const imageToCrop = document.getElementById('imageToCrop');

function openCropModal(event, index, width, height) {
    const file = event.target.files[0];
    currentImageIndex = index;
    currentImageWidth = width;
    currentImageHeight = height;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageToCrop.src = e.target.result;
            cropModal.style.display = 'flex';
            cropper = new Cropper(imageToCrop, {
                aspectRatio: width / height,
                viewMode: 1,
                ready: function () {
                    const containerData = cropper.getContainerData();
                    cropper.setCropBoxData({
                        left: (containerData.width - width) / 2,
                        top: (containerData.height - height) / 2,
                        width: width,
                        height: height
                    });
                }
            });
        };
        reader.readAsDataURL(file);
    }
}

function confirmCrop() {
    const canvas = cropper.getCroppedCanvas({
        width: currentImageWidth,
        height: currentImageHeight
    });
    const imgElement = document.getElementById(`uploadedImage${currentImageIndex}`);
    imgElement.src = canvas.toDataURL();
    imgElement.style.display = 'block'; // Ensure the image element is displayed
    document.querySelectorAll('.upload-container')[currentImageIndex - 1].classList.add('active');
    closeCropModal();
}

function closeCropModal() {
    cropModal.style.display = 'none';
    cropper.destroy();
    imageToCrop.src = ''; // Reset the src of the image to crop
}
