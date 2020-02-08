let APIKey = 'J5Wh3wDFl6GkRi4fxyGLUwyw4oKS8vdr',
    searchBtn = document.getElementById('search-btn'),
    searchInput = document.getElementById('search'),
    refreshBtn = document.getElementById('refresh-btn'),
    content = document.querySelector('.content'),
    defaultRequest = 'cats',
    url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&tag=${defaultRequest}`;


document.addEventListener('DOMContentLoaded', randomImg);

refreshBtn.addEventListener('click', searchImg);

searchBtn.addEventListener('click', searchImg);


function randomImg() {
    content.textContent = '';
    fillContent();
}

function searchImg(event) {
    event.preventDefault();
    request = searchInput.value.trim();
    if (request == '') {
        url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&tag=${defaultRequest}`;
    } else {
        url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKey}&tag=${request}`;
    }
    
    content.textContent = '';
    fillContent();
}


function titleLength(str) {
    if (str.length > 20) {
        return str.substr(0, 20) + '...';
    } else {
        return str;
    }
}

function fillContent() {
    for (let i = 0; i < 8; i++) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let fig = document.createElement('figure'),
                    img = document.createElement('img'),
                    fc = document.createElement('figcaption'),
                    infoWrap = document.createElement('div'),
                    infoBtn = document.createElement('button'),
                    infoWrapBtn = document.createElement('button');

                img.src = data.data.images.preview_gif.url;
                img.alt = data.data.title;
                img.width = '200';
                img.height = '200';
                fc.textContent = titleLength(data.data.title);
                infoBtn.classList.add('info-btn');
                infoBtn.textContent = 'i';
                infoWrap.classList.add('info-wrap');
                infoWrap.classList.add('hide');
                infoWrap.textContent = `${data.data.image_width}x${data.data.image_height}`;
                infoWrapBtn.classList.add('info-wrap-btn');
                infoWrapBtn.innerHTML = `<a href="${data.data.image_original_url}" target="_blank">ORIGINAL</a>`;
                infoWrap.appendChild(infoWrapBtn);
                fig.appendChild(img);
                fig.appendChild(infoWrap)
                fig.appendChild(fc);
                content.appendChild(fig);
                fc.appendChild(infoBtn);

                infoBtn.addEventListener('click', function() {
                    if (infoWrap.classList.contains('hide')) {
                        infoWrap.classList.remove('hide');
                    } else {
                        infoWrap.classList.add('hide');
                    }
                });

            })
            .catch(err => {
                let errorNotice = document.createElement('div');

                content.appendChild(errorNotice);
                errorNotice.textContent = 'Error! ';
                console.log('Error! ', err);
            });
    }
}