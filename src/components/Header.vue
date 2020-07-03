<template>
    <header>
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <h1>
                    <router-link :to="{name: 'iMain'}">
                        {{ siteName }}
                    </router-link>
                </h1>
            </div>
            <div class="nav navbar-nav navbar-right cart">
                <button class="btn btn-default btn-lg"
                        type="button"
                        @click="showCheckout"
                >
                    <span class="glyphicon glypicon-shopping-cart">
                        {{ cartItemCount }}
                    </span>
                    Checkout
                </button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "my-header",
        data() {
            return {
                siteName: 'Vue.js Pet Deport',
            }
        },
        props: ['cartItemCount'],
        methods: {
            showCheckout() {
                this.$router.push({name: 'Form'});
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }
</style>