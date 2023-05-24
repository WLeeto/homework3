class Good {
  constructor(id, name, description, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;
    this.available = available;
  }

  setAvailable(available) {
    this.available = available;
  }
}

class GoodsList {
    #goods;
  constructor() {
    this.#goods = [];
    this.filter = null;
    this.sortPrice = false;
    this.sortDir = true;
  }

  get list() {
    let filteredGoods = this.#goods;
    if (this.filter) {
      filteredGoods = filteredGoods.filter((good) =>
        this.filter.test(good.name)
      );
    }
    if (this.sortPrice) {
      filteredGoods.sort((a, b) => {
        const diff = a.price - b.price;
        return this.sortDir ? diff : -diff;
      });
    }
    return filteredGoods.filter((good) => good.available);
  }

  add(good) {
    this.#goods.push(good);
  }

  remove(id) {
    this.#goods = this.#goods.filter((good) => good.id !== id);
  }
}

class BasketGood extends Good {
  constructor(good, amount) {
    super(good.id, good.name, good.description, good.sizes, good.price, good.available);
    this.amount = amount;
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }

  get totalAmount() {
    return this.goods.reduce((total, good) => total + good.amount, 0);
  }

  get totalSum() {
    return this.goods.reduce((total, good) => total + good.price * good.amount, 0);
  }

  add(good, amount) {
    const basketGood = this.goods.find((item) => item.id === good.id);
    if (basketGood) {
      basketGood.amount += amount;
    } else {
      this.goods.push(new BasketGood(good, amount));
    }
  }

  remove(good, amount) {
    const basketGood = this.goods.find((item) => item.id === good.id);
    if (basketGood) {
      basketGood.amount -= amount;
      if (basketGood.amount <= 0) {
        this.goods = this.goods.filter((item) => item.id !== good.id);
      }
    }
  }

  clear() {
    this.goods = [];
  }

  removeUnavailable() {
    this.goods = this.goods.filter((good) => good.available);
  }
}

// Создание экземпляров класса Good
const good1 = new Good(1, 'Товар 1', 'Описание товара 1', ['S', 'M', 'L'], 10, true);
const good2 = new Good(2, 'Товар 2', 'Описание товара 2', ['M', 'L'], 20, false);
const good3 = new Good(3, 'Товар 3', 'Описание товара 3', ['S', 'L'], 15, true);
const good4 = new Good(4, 'Товар 4', 'Описание товара 4', ['S', 'M'], 30, true);
const good5 = new Good(5, 'Товар 5', 'Описание товара 5', ['S', 'M', 'L'], 25, false);

// Создание экземпляров класса GoodsList и Basket
const goodsList = new GoodsList();
const basket = new Basket();

// Добавление товаров в каталог
goodsList.add(good1);
goodsList.add(good2);
goodsList.add(good3);
goodsList.add(good4);
goodsList.add(good5);

// Добавление товаров в корзину
basket.add(good1, 2);
basket.add(good3, 1);
basket.add(good4, 3);

// Вывод отфильтрованного и сортированного каталога товаров
console.log(goodsList.list);

// Вывод общей суммы и количества товаров в корзине
console.log('Общая сумма товаров в корзине:', basket.totalSum);
console.log('Общее количество товаров в корзине:', basket.totalAmount);
