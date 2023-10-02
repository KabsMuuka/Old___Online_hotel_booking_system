let viewImage = document.getElementById('viewImage');
let roomNumber = document.getElementById('roomNumber');
let roomDescription = document.getElementById('roomDescription');
let roomPrice = document.getElementById('roomPrice');


function openImage(imageSrc, number, description, price){
    const imageViewer = document.getElementById('imageViewer');
    viewImage.src = imageSrc;
    roomNumber.textContent = `Room number: ${number}`;
    roomDescription.textContent = `Description: ${description}`;
    roomPrice.textContent = `Price: ${price}`;
    imageViewer.style.display = 'block';
}        
// Function to close the image viewer (modal)
function closeImageViewer() {
    const imageViewer = document.getElementById('imageViewer');
    imageViewer.style.display = 'none';
}
// Attach click event listeners to each image
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');
const img5 = document.getElementById('img5');
const img6 = document.getElementById('img6');


img1.addEventListener('click', () => openImage(img1.src, '23', 'Fair lighting with a beautiful view of the city', 'k400 per Night'));
img2.addEventListener('click', () => openImage(img2.src, '43', 'Dark room amazing for relaxing', 'k600 per Night'));
img3.addEventListener('click', () => openImage(img3.src, '66', 'Morning sunlights with a beautiful view of the ocean', 'k500 per Night'));
img4.addEventListener('click', () => openImage(img4.src, '77', 'huge room with view of the city', 'k800 per Night'));
img5.addEventListener('click', () => openImage(img5.src, '90', 'bright room electric beddings', 'k900 per Night'));
img6.addEventListener('click', () => openImage(img6.src, '02', 'simple bright room with nature lighting', 'k400 per Night'));

const closeViewer = document.getElementById('closeViewer');
closeViewer.addEventListener('click', closeImageViewer);

function Pick(imageId) {
    // Get the selected image's src and alt attributes
    const imgElement = document.getElementById(imageId);
    const selectedSrc = imgElement.src;
    const selectedAlt = imgElement.alt;

    // Save the selected image details to local storage
    localStorage.setItem('selectedImageSrc', selectedSrc);
    localStorage.setItem('selectedImageAlt', selectedAlt);

    // Disable all "pick" buttons to enforce one selection
    const buttons = document.querySelectorAll('.pick-button');
    buttons.forEach(button => {
        button.disabled = true;
        
    });
    alert(`room picked`)
}
