<template>
    <div>
        <header>
            <div class="navbar navbar-default">
                <div class="navbar-header">
                    <h1>{{ siteName }}</h1>
                </div>
            </div>

            <div class="nav navbar-nav navbar-right cart">
                <button type="button" class="btn btn-default btn-lg" @click="showCheckout">
                    Купить
                    <span class="glyphicon glyphicon-shopping-cart">{{ cartItemCount }}</span>
                </button>
            </div>
        </header>
        <main>
            <div class="row" v-if="showProduct">
                <div class="col-md-2 col-md-offset-1">
                    <figure><img alt="Kitty Food"></figure>
                </div>
                <div class="col-md-6 col-md-offset-2 description">
                    <h1 v-text="product.title"></h1>
                    <p v-html="product.description"></p>
                    <p class="price">{{ product.price | formatPrice }}</p>
                    <button class="btn btn-primary btn-lg"
                            @click="addToCart"
                            v-if="canAddToCArt"
                    >Add to cart</button>
                    <button class="btn btn-primary btn-lg"
                            disabled="true"
                            v-else
                    >Add To Card</button>
                    <span class="inventory-message"
                          v-if="product.availableInventory - cartItemCount === 0"
                    >
                        All Out
                    </span>
                    <span class="inventory-message"
                          v-else-if="product.availableInventory - cartItemCount < 5"
                    >
                        Only {{ product.availableInventory - cartItemCount }} left
                    </span>
                    <span class="inventory-message"
                          v-else
                    >
                        Buy Now
                    </span>
                    <div class="rating">
                        <span :class="{'rating-active': checkRating(n)}"
                              v-for="n in 5"
                              :key="n"
                        >*</span>
                    </div>
                </div>
            </div>

            <div class="row" v-else>
                <div class="form-group">
                    <div class="col-md-12">
                        <strong>First Name:</strong>
                        <input v-model.trim="order.firstName" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <strong>LastName:</strong>
                        <input v-model.trim="order.lastName" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <strong>Adress:</strong>
                        <input v-model.lazy="order.address" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <strong>City:</strong>
                        <input v-model.trim="order.city" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <strong>State:</strong>
                        <select v-model="order.state" class="form-control">
                            <option disabled value="">State</option>
                            <option v-for="(state, key) in states" :value="state" :key="key">{{ key }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-12 boxes">
                    <input type="checkbox"
                           id="gift"
                           value="true"
                           :true-value="order.sendGift"
                           :false-value="order.dontSendGift"
                           v-model="order.gift"
                    ><label for="gift">Ship As A Gift?</label>
                </div>
                <div class="form-group">
                    <div class="col-md-12 boxes">
                        <input type="radio"
                               id="home"
                               :value="order.home"
                               v-model="order.method"
                        ><label for="home">Home</label>
                        <input type="radio"
                               id="business"
                               :value="order.business"
                               v-model="order.method"
                        ><label for="business">Business</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary submit" @click="submitForm">Заказать</button>
                    </div>
                </div>
                <div class="col-md-12 verify">
                    <pre>
                        FirstName:  {{ order.firstName }}
                        LastName:   {{ order.lastName }}
                        Adress:     {{ order.address }}
                        City:       {{ order.city }}
                        State:      {{ order.state }}
                        Method:     {{ order.method }}
                        Gift:       {{ order.gift }}
                    </pre>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from "axios";

    const APP_LIFECYCLE_EVENTS = false;

    export default {
        name: "App",
        data() {
            return {
                siteName: 'Vue.js Pet Deport',
                product: {
                    id: 1001,
                    title: "Жрачка для котов",
                    description: "Котячая <em>жратва</em>, коты крутые",
                    price: 20000000,
                    image: "../src/assets/images/food-cat.jpg",
                    availableInventory: 10,
                    rating: 3,
                },
                cart: [],
                showProduct: true,
                order: {
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    state: '',
                    method: 'Home Address',
                    home: 'Home Address',
                    business: 'Business Address',
                    gift: 'Send As A Gift',
                    sendGift: 'Send As A Gift',
                    dontSendGift: 'Do Not Send As A Gift',
                },
                states: {
                    NY: 'New-Yirk',
                    LA: 'Los Angeles',
                    CA: 'California',
                },
            }
        },
        computed: {
            cartItemCount() {
                return this.cart.length || '';
            },
            canAddToCArt() {
                return this.product.availableInventory > this.cartItemCount;
            },
        },
        filters: {
            formatPrice(price) {
                if (!parseInt(price)) {
                    return "";
                }
                if (price > 99999) {
                    let priceString = (price / 100).toFixed(2);
                    let priceArray = priceString.split("").reverse();
                    let index = 3;

                    while (priceArray.length > index +3) {
                        priceArray.splice(index + 3, 0, " ");
                        index += 4;
                    }

                    return "$" + priceArray.reverse().join("");
                } else {
                    return "$" + (price /100).toFixed(2);
                }
            }
        },
        methods: {
            showCheckout() {
                this.showProduct = !this.showProduct;
            },
            addToCart() {
                this.cart.push(this.product.id);
            },
            submitForm() {
                alert('Submitted');
            },
            checkRating(n) {
                return this.product.rating - n >= 0;
            },
        },
        beforeCreate: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('before create');
            }
        },
        created() {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('created');
            }
            axios.get('./products.json').then((response) => {
                this.products = response.data.products;
                console.log(this.products);
            });
        },
        beforeMount: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('before mount');
            }
        },
        mounted: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('mounted');
            }
        },
        beforeUpdate: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('before update');
            }
        },
        updated: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('updated');
            }
        },
        beforeDestroy: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('before destroy');
            }
        },
        destroyed: () => {
            if (APP_LIFECYCLE_EVENTS) {
                console.log('destroy');
            }
        }
    }
</script>

<style scoped>

</style>