<template>
    <div class="main">
        <form class="form_auth">
            <div class="container">
                <div class="container__main">
                    <div class="container__main__form">
                        <div class="container__main__form__header">
                            <div class="logo">
                                Логотип (Высота 40px, длина до 300px)
                            </div>
                            <h2 class="title">Введите номер телефона</h2>
                            <p>Чтобы войти или зарегистрироваться</p>
                        </div>
                    </div>
                    <div class="container__main__button">
                        <button>Продолжить</button>
                    </div>
                </div>
                <div class="container__footer">
                    footer
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.form_auth{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px; 
    border-radius: 8px;
    border: 1px solid var(#DFDFDF);
    background-color: antiquewhite;
}

.container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 70px; 

    &__main{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 50px; 

        &__form{
            display: flex;
            width: 500px;
            padding: 0px 30px;
            flex-direction: column;
            align-items: center;
            gap: 30px; 

            &__header{
                display: flex;
                padding: 50px 0px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 30px;
                align-self: stretch; 
                background-color: aqua;

                .logo{
                    display: flex;
                    padding: 12px 20px;
                    width: 300px;
                    align-items: flex-start; 
                    background: #F8F8F8;
                    font-family: Roboto;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal; 
                }
                
                .title{
                    font-family: Roboto;
                    font-size: 32px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal; 
                    color: #000;
                }
            }
        }
    }
}
</style>