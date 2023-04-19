const output = document.querySelector('.output')
let data
const getFoods = async () => {
    const response = await fetch('http://localhost:3004/food')
    data = await response.json()
    categoriesRender(data)
}



const categoriesRender = (data, showDrinks) => {
    output.innerHTML = '';

    data.forEach((el) => {
        if (!showDrinks && el.category === 'drinks') {
            return; // skip 'drinks' category if it is not selected
        }

        const image = document.createElement('img');
        const title = document.createElement('h2');
        const price = document.createElement('h2');
        const category = document.createElement('h2');
        const button = document.createElement('button');

        const wrap = document.createElement('div');
        const details = document.createElement('div');

        image.src = el.img;
        title.textContent = el.name;
        category.textContent = el.category;
        price.textContent = el.price;
        button.textContent = 'show content';

        wrap.className = 'wrap';
        details.className = 'details';
        details.style.display = 'none'; // hide by default

        button.addEventListener('click', () => {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            button.textContent = details.style.display === 'none' ? 'show content' : 'hide content';
        });

        details.append(price);
        wrap.append(image, title, button, details);
        output.append(wrap);
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
            if (el === 'all') {
                categoriesRender(data, true);
            } else if (el === 'drinks') {
                const result = data.filter(item => {
                    return item.category === 'drinks';
                });
                categoriesRender(result, true);
            } else {
                const result = data.filter(item => {
                    return item.category === el;
                });
                categoriesRender(result, false);
            }
        });

        buttonWrap.append(button);
    });
};

renderButtons()


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
const viewAllButtons = () => {
    const viewAllButton = document.createElement('button');
    viewAllButton.className = 'vewAll'
    viewAllButton.textContent = 'View All';
    viewAllButton.addEventListener('click', () => {
        categoriesRender(data, true);
    });
    output.after(viewAllButton);
}
getFoods()
viewAllButtons()


// console.log(btns);







// console.log(result);
