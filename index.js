/** @type {HTMLFormElement} */
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const elements = form.elements;
        /** @type {HTMLInputElement} */
        const fileInput = elements[0];
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('csvFile', file);

        const res = await fetch('http://localhost:3001/subir-archivo', {
            method: 'POST',
            body: formData
        })

        const result = await res.json();
    console.log(result.message)
    } catch (err) {
        console.error(err)
    }
})