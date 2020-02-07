let APIKey = 'J5Wh3wDFl6GkRi4fxyGLUwyw4oKS8vdr',
    searchBtn = document.getElementById('search-btn'),
    searchInput = document.getElementById('search'),
    refreshBtn = document.getElementById('refresh-btn'),
    content = document.querySelector('.content'),
    request = 'cats',
    url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&tag=${request}`;


document.addEventListener('DOMContentLoaded', randomImg);

refreshBtn.addEventListener('click', searchImg);

searchBtn.addEventListener('click', searchImg);

function randomImg() {
    content.textContent = '';

    for (let i = 0; i < 8; i++) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let fig = document.createElement('figure'),
                    img = document.createElement('img'),
                    fc = document.createElement('figcaption');

                img.src = data.data.images.downsized_still.url;
                img.alt = data.data.title;
                fc.textContent = data.data.title;
                fig.appendChild(img);
                fig.appendChild(fc);
                content.appendChild(fig);
            })
            .catch(err => {
                console.log('Error! ', err);
            });
    }
}

function searchImg(event) {
    event.preventDefault();
    let request = searchInput.value.trim(),
        url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&tag=${request}`;

    content.textContent = '';
        
    for (let i = 0; i < 8; i++) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let fig = document.createElement('figure'),
                    img = document.createElement('img'),
                    fc = document.createElement('figcaption');

                img.src = data.data.images.downsized_large.url;
                img.alt = data.data.title;
                fc.textContent = data.data.title;
                fig.appendChild(img);
                fig.appendChild(fc);
                content.appendChild(fig);
            })
            .catch(err => {
                let errorNotice = document.createElement('div');

                content.appendChild(errorNotice);
                errorNotice.textContent = 'No images for your request!';
                console.log('Error! ', err);
            });
    }
}