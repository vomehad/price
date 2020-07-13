<template>
    <div class="">
        <my-header :cartItemCount="cartItemCount"></my-header>
        <main>
            <div class=""
                 v-for="product in sortedProducts"
                 :key="product.id"
            >
                <div class="row">
                    <div class="col-md-5 col-md-offset-0">
                        <figure>
                            <img :src="product.image" class="product" alt="">
                        </figure>
                    </div><!-- end of col-md-5 col-md-offset-0 -->
                    <div class="col-md-6 col-md-offset-0 description">
                        <router-link
                                tag="h1"
                                :to="{name: 'Id', params: {id: product.id}}"
                        >{{ product.title }}</router-link>
                        <p v-html="product.description"></p>
                        <p class="price">
                            {{ product.price | formatPrice }}
                        </p>
                        <button class="btn btn-primary btn-lg"
                                @click="addToCart(product)"
                                v-if="canAddToCArt(product)"
                        >Add To Cart</button>
                        <transition name="bounce" mode="out-in">
                            <span class="inventory-message"
                                  v-if="product.availableInventory - cartCount(product.id) === 0"
                                  key="0"
                            >All Out!</span>
                            <span class="inventory-message"
                                  v-else-if="product.availableInventory - cartCount(product.id) < 5"
                                  key=""
                            >Only {{ product.availableInventory - cartCount(product.id) }} left!</span>
                            <span class="inventory-message"
                                  v-else
                                  key=""
                            >Buy Now!</span>
                        </transition>
                        <div class="rating">
                            <span :class="{'rating-active': checkRating(n, product)}"
                                  v-for="n in 5"
                                  :key="n"
                            >☆</span>
                        </div><!-- end of rating -->
                    </div><!-- end of col-md-6 col-md-offset-0 description -->
                </div><!-- end of row -->
                <hr />
            </div><!-- end of for -->
        </main>
    </div>
</template>

<script>
    import MyHeader from "./Header";
    import { mapGetters } from 'vuex';

    export default {
        name: "iMain",
        components: {
            MyHeader
        },
        data() {
            return {
                cart: [],
            };
        },
        computed: {
            ...mapGetters([
                'products'
            ]),
            cartItemCount() {
                return this.cart.length || '';
            },
            sortedProducts() {
                let products = this.$store.getters.products;

                if (products.length) {
                    let productsArray = products.slice(0);

                    return productsArray.sort(this.compare);
                }

                return [];
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
            },
        },
        methods: {
            addToCart(aProduct) {
                this.cart.push(aProduct.id);
            },
            canAddToCArt(aProduct) {
                return aProduct.availableInventory > this.cartCount(aProduct.id);
            },
            cartCount(id) {
                let count = 0;
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i] === id) {
                        count++;
                    }
                }

                return count;
            },
            checkRating(n, myProduct) {
                return myProduct.rating - n >= 0;
            },
            compare(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }

                return 0;
            },
            submitForm() {
                alert('Submitted');
            },
        },
        created() {
            this.$store.dispatch('initStore');
        }
    }
</script>

<style scoped>
    .bounce-enter-active {
        animation: snake 0.72s cubic-bezier(.37, .07, .19, .97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
    }

    @keyframes shake {
        10%, 90% {
            color: red;
            transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            color: red;
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>