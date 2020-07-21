const output = document.querySelector('.output');
const locationEl = document.querySelector('.location');
const descriptionEl = document.querySelector('.description');
const pag = document.querySelector('.pag-container');

let limit = 10;
let current = 0;

const getData = async () => {
    const res = await fetch('https://jobs.github.com/positions.json?page=1&search=code');
    const data = await res.json();
    renderData(data);
}

const renderData = (data) => {
    let list = data;
    if(list.length > 10) {
        for(let i = 1; i <= list.length / limit; i++) {
            const spanEl = document.createElement('span');
            spanEl.innerText = i;
            pag.appendChild(spanEl);
        }
    
        manipulateData(list, 0, 9);
    
        const spanEls = pag.querySelectorAll('span');
        spanEls.forEach((el, idx) => {
            el.addEventListener('click', (e) => {
                spanEls.forEach(el => el.classList.remove('active'));
                if(idx > 0) {
                    if(idx == spanEls.length - 1) {
                        manipulateData(list, idx * 10, list.length);
                    }else{
                        manipulateData(list, idx * 10, idx * 10 + 9);
                    }
                }
                else{
                    manipulateData(list, idx, idx + 9);
                }
            })
        })
    }


}

function manipulateData(list, start, end) {
    current = start / 10;
    const spanEls = pag.querySelectorAll('span');
    spanEls[current].classList.add('active');
    const arrData = list.slice(start, end);
    showData(arrData);
}

function showData(data) {
    console.log(data);
    output.innerHTML = data.map(el => `
                          <div class="card">
                            <div class="card-first">
                               <div class="card-first-name">
                                  <h3 class="title">${el.title}-<small>${el.company}</small></h3>
                                  
                               </div>
                               ${el.company_logo ? `<img src="${el.company_logo}">` : `<img src="https://brannetmarket.com/wp-content/uploads/2018/08/BRALOGO04.jpg">`}
                            </div>
                            <span class="card-time">Posted:  ${( ( ( new Date().getTime() - `${new Date(el.created_at).getTime()}` ) / (1000 * 3600 * 24) ).toFixed(0) ) == 0? "Today" : `${( ( ( new Date().getTime() - `${new Date(el.created_at).getTime()}` ) / (1000 * 3600 * 24) ).toFixed(0) )} days ago`}</span>
                            <div class="tag-container">
                              <span>${el.type}</span>
                              <span class="card-location">${el.location}</span>
                            </div>
                            <a href="${el.url}">${el.url}</a>
                            <button>View detail</button>
                          </div>
                       `).join('');
}

getData();

descriptionEl.addEventListener('input', (e) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(el => {
        const title = el.querySelector('.title').innerText.toUpperCase();
        const term = e.target.value.toUpperCase();
        if(title.indexOf(term) > -1) {
            el.style.display = 'flex';
        }else{
            el.style.display = 'none';
        }
    })
})

locationEl.addEventListener('input', (e) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(el => {
        const title = el.querySelector('.card-location').innerText.toUpperCase();
        const term = e.target.value.toUpperCase();
        if(title.indexOf(term) > -1) {
            el.style.display = 'flex';
        }else{
            el.style.display = 'none';
        }
    })
})