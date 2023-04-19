const output = document.querySelector('.output')
const viewAllButton = document.querySelector('.vewAll')

let data
let number = 6
let category = 'all' // Define the initial category

const getFoods = async (category) => {
    let url = `http://localhost:3004/food?_limit=${number}`
    if (category && category !== 'all') {
        url += `&category=${category}`
    }
    const response = await fetch(url)
    data = await response.json()
    categoriesRender(data)
}

getFoods(category)

const categoriesRender = (data) => {
    let foodItems = data.map((el) => {
        const itemHtml = `
      <div class="wrap">
        <img src="${el.img}" alt="">
        <h2>${el.name}</h2>
        <button class="showContent">show content</button>
        <div class="details" style="display:none">
          <h2>${el.price}</h2>
        </div>
      </div>
    `;
        return itemHtml;
    });

    output.innerHTML = foodItems.join('');


    const showContentButtons = document.querySelectorAll('.showContent');
    showContentButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            if (details.style.display === 'none') {
                details.style.display = 'block';
            } else {
                details.style.display = 'none';
            }
        });
    });
};

const renderButtons = () => {
    const categoryItems = ['all', 'burgers', 'pizzas', 'drinks'];
    const buttonWrap = document.querySelector('.categories__choise');

    categoryItems.forEach(el => {
        const button = document.createElement('button');
        button.className = 'btns';
        button.textContent = el;

        button.addEventListener('click', () => {
            category = el;
            if (el === 'all') {
                getFoods('all');
            } else if (el === 'drinks') {
                getFoods('drinks');
            } else {
                getFoods(el);
            }
        });


        buttonWrap.append(button);
    });

    viewAllButton.addEventListener('click', () => {
        viewAllButtons(category);
        viewAllButton.style.display = 'none';
    });
};

renderButtons();

const searchItems = () => {
    const input = document.querySelector('#search')
    const form = document.querySelector('#form')


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const filteredItems = data.filter(el => {
            return el.name.toLowerCase().includes(input.value.toLowerCase())
        })

        if (filteredItems.length > 0) {
            categoriesRender(filteredItems)
        } else {
            output.textContent = 'Sorry, no items'
        }


    })

}
searchItems()

const viewAllButtons = (category) => {
    number = 15
    getFoods(category)

}
