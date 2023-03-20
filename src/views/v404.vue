<template>
    <div class="err_page">
        <div class="err_content">
            <img src="../assets/404.gif" alt="тут была гифка с котиком, но вы не прогрузили ее">
            <h1 class="err_title">404</h1>
            <p>Да мне всё равно на тебя, слушай. Какая у тебя там тачка, квартиры, яхты, всё. Мне всё равно, там, хоть «Бэнтли», хоть «Майбах», хоть «Роллс-Ройс», хоть «Бугатти», хоть стометровая яхта. Мне на это всё равно, понимаешь? Сколько ты там, кого имеешь, каких баб, каких вот этих самок шикарных или атласных, в космос ты летишь, мне на это всё равно, понимаешь? Я в своём познании настолько преисполнился, что я как будто бы уже сто триллионов миллиардов лет проживаю на триллионах и триллионах таких же планет, понимаешь, как эта Земля. Мне уже этот мир абсолютно понятен, и я здесь ищу только одного: покоя, умиротворения и вот этой гармонии от слияния с бесконечно вечным.</p>
            <button @click="redirectUser()" class="redirect_btn">Вернуться на главную</button>
        </div>
       </div>
</template>

<script>
    export default {
        methods: {
            redirectUser(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .err_page{
        position: fixed;
        top: 0;
        left: 0;   
        right: 0;
        bottom: 0;
        background: white;
        display: flex;
    }

    .err_title{
        font-size: 3rem;
        color: rgb(213, 2, 2);
        background: white;
    }

    .err_content{
        font-family: 'Roboto', sans-serif;
        margin: auto;
        width: 800px;
        text-align: center;
        background: white;
    }

    .err_img{
        width: 50%;
        height: 50%;
    }
    
    p{
        background: white;
        color: black;
    }

    .redirect_btn{
        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        border: 1px solid #42b983;
        background: #42b983;
        padding: 10px;
        margin-top: 10px;
        color: white;
        cursor: pointer;
    }

    .redirect_btn:hover{
        border: 1px solid #36956a;
        background: #36956a;
        transition: .3s all;
    }

</style>