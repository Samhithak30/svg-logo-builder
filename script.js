document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const downloadMessage = document.getElementById('downloadMessage');

    // --- Logo Generator Elements ---
    const dynamicLogo = document.getElementById('dynamicLogo');
    const logoShape = document.getElementById('logoShape');
    const logoWidth = document.getElementById('logoWidth');
    const logoHeight = document.getElementById('logoHeight');
    const fillColor = document.getElementById('fillColor');
    const strokeColor = document.getElementById('strokeColor');
    const strokeWidth = document.getElementById('strokeWidth');
    const logoText = document.getElementById('logoText');
    const textColor = document.getElementById('textColor');
    const fontSize = document.getElementById('fontSize');
    const downloadLogoBtn = document.getElementById('downloadLogoBtn');
    const resetLogoBtn = document.getElementById('resetLogoBtn');
    const currentLogoDimensionsDisplay = document.getElementById('currentLogoDimensions');

    // Store default values for logo generator reset functionality
    const defaultLogoValues = {
        logoShape: logoShape.value,
        logoWidth: logoWidth.value,
        logoHeight: logoHeight.value,
        fillColor: "#0A6ED1", // Updated default to Fiori blue
        strokeColor: "#32363A", // Updated default to Fiori gray
        strokeWidth: "2",
        logoText: "SAP Fiori", // Updated default text
        textColor: "#F8F8F8",
        fontSize: "16"
    };

    // --- Image Converter Elements ---
    const imageUpload = document.getElementById('imageUpload');
    const imageWidth = document.getElementById('imageWidth');
    const imageHeight = document.getElementById('imageHeight');
    const imageSvgPreview = document.getElementById('imageSvgPreview');
    const imagePreviewPlaceholder = document.getElementById('imagePreviewPlaceholder');
    const downloadImageSvgBtn = document.getElementById('downloadImageSvgBtn');
    const resetImageBtn = document.getElementById('resetImageBtn');
    const currentImageDimensionsDisplay = document.getElementById('currentImageDimensions');

    let uploadedImageDataURI = null; // Stores the Data URI of the uploaded image

    // --- Helper Function for Download Confirmation ---
    function showDownloadConfirmation() {
        downloadMessage.classList.add('show');
        setTimeout(() => {
            downloadMessage.classList.remove('show');
        }, 3000); // Message disappears after 3 seconds
    }

    // --- Tab Switching Logic ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });


    // --- Logo Generator Functions ---
    function updateLogoSVG() {
        const width = parseInt(logoWidth.value);
        const height = parseInt(logoHeight.value);
        const currentShape = logoShape.value;
        const currentFillColor = fillColor.value;
        const currentStrokeColor = strokeColor.value;
        const currentStrokeWidth = parseInt(strokeWidth.value);
        const currentText = logoText.value;
        const currentTextColor = textColor.value;
        const currentFontSize = parseInt(fontSize.value);

        dynamicLogo.setAttribute('width', width);
        dynamicLogo.setAttribute('height', height);
        dynamicLogo.setAttribute('viewBox', `0 0 ${width} ${height}`);
        currentLogoDimensionsDisplay.textContent = `${width}x${height} px`;

        while (dynamicLogo.firstChild) {
            dynamicLogo.removeChild(dynamicLogo.firstChild);
        }

        let mainShape;
        const safeStrokeWidth = Math.max(0.1, currentStrokeWidth);

        switch (currentShape) {
            case 'circle':
                mainShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const radius = Math.min(width, height) / 2 - safeStrokeWidth / 2;
                mainShape.setAttribute('cx', width / 2);
                mainShape.setAttribute('cy', height / 2);
                mainShape.setAttribute('r', Math.max(0, radius));
                break;
            case 'rectangle':
                mainShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                mainShape.setAttribute('x', safeStrokeWidth / 2);
                mainShape.setAttribute('y', safeStrokeWidth / 2);
                mainShape.setAttribute('width', Math.max(0, width - safeStrokeWidth));
                mainShape.setAttribute('height', Math.max(0, height - safeStrokeWidth));
                mainShape.setAttribute('rx', '6'); // Slightly more rounded for Fiori-like rect
                mainShape.setAttribute('ry', '6');
                break;
            case 'triangle':
                mainShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const x1 = width / 2;
                const y1 = safeStrokeWidth / 2;
                const x2 = safeStrokeWidth / 2;
                const y2 = height - safeStrokeWidth / 2;
                const x3 = width - safeStrokeWidth / 2;
                const y3 = height - safeStrokeWidth / 2;
                mainShape.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
                break;
        }

        if (mainShape) {
            mainShape.setAttribute('fill', currentFillColor);
            mainShape.setAttribute('stroke', currentStrokeColor);
            mainShape.setAttribute('stroke-width', safeStrokeWidth);
            dynamicLogo.appendChild(mainShape);
        }

        if (currentText) {
            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textElement.setAttribute('x', '50%');
            textElement.setAttribute('y', '50%');
            textElement.setAttribute('dominant-baseline', 'middle');
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('fill', currentTextColor);
            textElement.setAttribute('font-size', currentFontSize);
            textElement.setAttribute('font-family', 'IBM Plex Sans, sans-serif'); // Use IBM Plex Sans for logo text
            textElement.setAttribute('font-weight', 'bold'); // Make text bolder
            textElement.textContent = currentText;
            dynamicLogo.appendChild(textElement);
        }
    }

    function downloadLogoSVG() {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(dynamicLogo);
        const svgData = `<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n${source}`;
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'custom_logo.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        showDownloadConfirmation();
    }

    function resetLogoForm() {
        Object.keys(defaultLogoValues).forEach(key => {
            document.getElementById(key).value = defaultLogoValues[key];
        });
        updateLogoSVG();
    }

    // --- Image Converter Functions ---
    function updateImageSvgPreview() {
        const width = parseInt(imageWidth.value);
        const height = parseInt(imageHeight.value);

        imageSvgPreview.setAttribute('width', width);
        imageSvgPreview.setAttribute('height', height);
        imageSvgPreview.setAttribute('viewBox', `0 0 ${width} ${height}`);
        currentImageDimensionsDisplay.textContent = `${width}x${height} px`;

        while (imageSvgPreview.firstChild) {
            imageSvgPreview.removeChild(imageSvgPreview.firstChild);
        }

        if (uploadedImageDataURI) {
            imagePreviewPlaceholder.style.display = 'none';

            const imageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            imageElement.setAttribute('href', uploadedImageDataURI);
            imageElement.setAttribute('x', '0');
            imageElement.setAttribute('y', '0');
            imageElement.setAttribute('width', '100%');
            imageElement.setAttribute('height', '100%');
            imageElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            imageSvgPreview.appendChild(imageElement);
            downloadImageSvgBtn.disabled = false;
        } else {
            imagePreviewPlaceholder.style.display = 'block';
            downloadImageSvgBtn.disabled = true;
        }
    }

    function downloadImageSvg() {
        if (!uploadedImageDataURI) {
            alert('Please upload an image first!');
            return;
        }
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(imageSvgPreview);
        const svgData = `<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n${source}`;
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'wrapped_image.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        showDownloadConfirmation();
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImageDataURI = e.target.result;
                updateImageSvgPreview();
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImageDataURI = null;
            updateImageSvgPreview();
        }
    }

    function resetImageConverter() {
        imageUpload.value = '';
        uploadedImageDataURI = null;
        imageWidth.value = 200;
        imageHeight.value = 200;
        updateImageSvgPreview();
    }


    // --- Event Listeners ---
    // Logo Generator Listeners
    const logoInputs = [
        logoShape, logoWidth, logoHeight, fillColor, strokeColor,
        strokeWidth, logoText, textColor, fontSize
    ];
    logoInputs.forEach(input => input.addEventListener('input', updateLogoSVG));
    downloadLogoBtn.addEventListener('click', downloadLogoSVG);
    resetLogoBtn.addEventListener('click', resetLogoForm);

    // Image Converter Listeners
    imageUpload.addEventListener('change', handleImageUpload);
    imageWidth.addEventListener('input', updateImageSvgPreview);
    imageHeight.addEventListener('input', updateImageSvgPreview);
    downloadImageSvgBtn.addEventListener('click', downloadImageSvg);
    resetImageBtn.addEventListener('click', resetImageConverter);

    // Initial renders
    updateLogoSVG();
    updateImageSvgPreview();
});