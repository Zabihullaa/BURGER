const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: 'img/image 1.png',
        get summ() {
            return this.amount * this.price
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        amount: 0,
        img: 'img/image 2.png',
        get summ() {
            return this.amount * this.price
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        amount: 0,
        img: 'img/image 3.png',
        get summ() {
            return this.amount * this.price
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        amount: 0,
        img: 'img/image 4.png',
        get summ() {
            return this.amount * this.price
        }
    }
}
const menuBtn = document.querySelectorAll('.menu__btn'),
    basketBtn = document.querySelector('.nav__btn'),
    basketModal = document.querySelector('.nav__basket'),
    closeBasketModal = document.querySelector('.nav__basket-btn'),
    basketChecklist = document.querySelector('.nav__basket-checklist'),
    basketTotalPrice = document.querySelector('.nav__basket-totalPrice'),
    basketBtnCount = document.querySelector('.nav__btn-count'),
    batCard = document.querySelector('.nav__basket-bottom'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer');

menuBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
});

function plusOrMinus(btn) {
    let parent = btn.closest('.menu__item');
    let parentId = parent.getAttribute('id')
    products[parentId].amount++
    basket()
}

function basket() {
    const productArry = [];
    let totalCount = 0
    for (const key in products) {
        const po = products[key],
            productCard = document.querySelector(`#${key}`),
            parentIndecator = productCard.querySelector('.menu__count');
        if (po.amount > 0) {
            productArry.push(po)
            totalCount += po.amount
            basketBtnCount.classList.add('active')
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        if (totalCount == 0) {
            basketBtnCount.classList.remove('active')
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArry.length; i++) {
        const element = productArry[i];
        basketChecklist.innerHTML += cardBurger(element)
    }
    basketTotalPrice.innerHTML = totalPriceProduct()
}

basketBtn.addEventListener('click', function () {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})

function cardBurger(date) {
    const {
        name,
        summ: price,
        img,
        amount
    } = date
    return `
    <div class="product">
    <div class="product__info">
        <img src="${img}" alt="" class="product__img">
        <div>
            <p class="product__name">${name} </p>
            <p class="product__price">${price} сум</p>
        </div>
    </div>
    <div class="product__option" id="${name.toLowerCase()}__card">
    <button class="product__symbol minus" data-symbol="-">-</button>
    <output class="product__count">${amount}</output>
    <button class="product__symbol plus" data-symbol="+">+</button>
    </div>
</div>
    `
}

function totalPriceProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].summ
    }
    return total
}
window.addEventListener('click', function (e) {
    const btn = e.target
    if (btn.classList.contains('product__symbol')) {
        const attribute = btn.getAttribute('data-symbol'),
            parent = btn.closest('.product__option')
        console.log(parent);
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            attribute == '+' ? products[idParent].amount++ : products[idParent].amount--
            basket()
        }
    }
})

batCard.addEventListener('click', function () {
    printBody.innerHTML = ''    
    for (const key in products) {
        const {name, summ, amount} = products[key]
        if (amount > 0) {
            printBody.innerHTML +=`
            <div class="print__item">
            <p class="print__name">
                <span>${name}</span>
                <span>${amount}</span>
            </p>
            <p class="print__summ">${summ}</p>
        </div>
            `
        }
    }
    printFooter.inrHneTML =  totalPriceProduct()
    window.print()
})

