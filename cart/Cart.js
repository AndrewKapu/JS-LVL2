class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; // Общая сумма
        this.cartItems = []; //Все товары в корзине
        this._init(this.source);
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        }).on('click', '.remove-btn', event => {
            this._removeProduct(event);
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        $container.append($(`<button class="remove-btn">Удалить товар</button>`));
        $('.cart-items-wrap').append($container);
    }
    _renderSum(amount, countGoods){
        $('.sum-amount').text(`Всего товаров в корзине: ${countGoods}`);
        $('.sum-price').text(`Общая сумма: ${amount} руб.`);

    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum(data.amount, data.countGoods);
            })
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }
    _addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum(this.amount, this.countGoods);

    }

    /**
     * Функция удаления продукта из корзины
     * @param {event} event Событие клика по элементу
     * @private
     */
    _removeProduct(event){
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].id_product == event.target.parentNode.getAttribute('data-product')) {
                console.log(this.cartItems[i]);
                this.cartItems.splice(i, 1);
                console.log(this.cartItems);
            }
        }
        event.target.parentNode.remove();

    }
}