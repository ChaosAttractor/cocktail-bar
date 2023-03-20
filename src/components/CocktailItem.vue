<template>
    <div >
        <div class="card">
            <div class="card_img">
                <img :src="cocktail.src">
            </div>
            <div class="card_content">
                <p class="title">{{cocktail.title}}</p>
                <p class="rate">Рейтинг: <b>{{ cocktail.rate }}</b> <svg-icon type="mdi" :path="path"  :viewbox="'3 -3 24 24'" :color="'gold'" class="icon"/></p>
                <p class="ing">Состав:</p>
                <ul>
                    <li v-for="ingridient in cocktail.ingridients" :key="ingridient"> {{ ingridient }}, </li>
                </ul>
            </div>
            <div class="cocktail_info">
                <h2 class="price"><b>{{cocktail.price}} ₽</b></h2>
                <button class="buy" @click="addToCart(data)">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiStar } from '@mdi/js'

    export default {
        components: {
            SvgIcon,
        },
        props: {
            cocktail: {
                type: Object
            }
        },
        data() {
            return {
                path: mdiStar,
            }
        },
        methods: {
            addToCart() {
                this.$emit('addToCart',this.cocktail)
            }
        }
    }
</script>

<style scoped>
.card {
        display: flex;
        align-items: center;
        border: 1px solid var(--card-background-color);
        border-radius: 5px;
        background: var(--card-background-color);
        width: 1000px;
        max-height: 400px;
    }

    .card_content {
        flex: 1;
    }

    .card_content p {
        background: var(--card-background-color);
    }

    .card_content ul, li {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        list-style: none;
        background: var(--card-background-color);
    }

    .card_img {
        padding: 15px;
        background: var(--card-background-color);
    }


    .card_img img {
        height: 200px;
        width: 100%;
        background: var(--card-background-color);
    }

    .buy {
        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        border: 1px solid var(--btn-main-color);
        border-radius: 5px;
        background: var(--btn-main-color);
        padding: 5px;
        margin-right: 10px;
        color: white;
        cursor: pointer;
    }

    .buy:hover{
        border: 1px solid var(--btn-active-color);
        background: var(--btn-active-color);
        transition: .3s all;
    }

    .cocktail_info, h2, b, .icon{
        background: var(--card-background-color);
    }

    .title {
        font-size: 2em;  
    }
    .rate {
        font-size: 1.2em;
    }
    .ing {
        font-size: 1.2em;
    }
</style>