<template>
  <div class="main">
    <form class="form_auth">
      <div class="container">
        <div class="container__main">
          <div class="container__main__form">
            <div class="container__main__form__header">
              <div class="logo">Логотип (Высота 40px, длина до 300px)</div>
              <h2 class="title" v-if="step === 'create'">Введите номер телефона</h2>
              <h2 class="title" v-if="step === 'send'">Введите код</h2>
              <p v-if="step === 'create'">Чтобы войти или зарегистрироваться</p>
              <p v-if="step === 'send'">Отправлен по номеру {{ phone }}</p>
            </div>
            <div class="container__main__form__inputs">
              <div class="country">
                <label v-if="step === 'create'">Страна</label>
                <select
                  v-model="selected"
                  :value="selected"
                  @change="changeCode"
                  placeholder="Страна"
                  v-if="step === 'create'"
                >
                  <option v-for="code in codes" v-bind:value="code.dial_code">
                    {{ code.name }}
                    {{ code.flag }}
                    {{ code.dial_code }}
                  </option>
                </select>
                <label v-if="step === 'send'">Способ получения кода</label>
                <select
                  v-model="option"
                  :value="option"
                  placeholder="Способ получения кода"
                  v-if="step === 'send'"
                >
                  <option v-for="option in options" v-bind:value="option.name">
                    {{ option.name }}
                    <img :src="option.icon" alt="Social media icon" />
                  </option>
                </select>
              </div>
              <div class="number">
                <input type="text" v-model="code" :class="{ invalid: !isValidCode }" v-if="step == 'send'" />
                <input
                  :class="{ invalid: !isValidPhoneNumber }"
                  type="text"
                  v-model="phone"
                  @keyup="validatePhoneNumber"
                  v-if="step === 'create'"
                />
                <label v-if="step === 'create'">Номер телефона</label>
                <label v-if="step === 'send'">Введите код</label>
                <div class="validation" v-if="!isValidPhoneNumber">Неверный формат номера</div>
                <div class="validation" v-if="!isValidCode">Код введен неверно</div>
              </div>
            </div>
          </div>
          <div class="container__main__button">
            <div class="back" v-if="step === 'send'" @click="navigateBack">
              <img src="../assets/icons/arrow_back.svg" alt="Arrow back" />
              <p>Назад</p>
            </div>
            <button @click.prevent="createSession" v-if="step === 'create'">Продолжить</button>
            <button @click.prevent="checkCode" v-if="step === 'send'">Далее</button>
          </div>
        </div>
        <div class="container__footer">
          <div class="container__footer__language">
            <select v-model="lang">
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
          <div class="container__footer__terms">
            <p>Условия</p>
            <p>Конфиденциальность</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from 'vue'
import axios from 'axios'
import codes from '../api/data/phone_codes.json'
import whatsapp from '../assets/icons/whatsapp.svg'

const selected = ref(null)
const lang = ref('Русский')
const phone = ref('')
const status = ref(false)
let isValidPhoneNumber = ref(true)
let isValidCode = ref(true)
const step = ref('create')
const code = ref('')
const session_id = ref('')
const options = ref([
  {
    name: 'Whatsapp',
    icon: '/src/assets/icons/whatsapp.svg'
  },
  {
    name: 'Telegram',
    icon: ''
  },
  {
    name: 'Viber',
    icon: ''
  },
  {
    name: 'SMS',
    icon: ''
  }
])
const option = ref('')

onMounted(() => {
  console.log(codes)
})

const key = import.meta.env.VITE_API_KEY

const validatePhoneNumber = () => {
  const validationRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if (phone.value.match(validationRegex)) {
    isValidPhoneNumber.value = true
  } else {
    isValidPhoneNumber.value = false
  }
}

const createSession = async () => {
  if (isValidPhoneNumber.value == true) {
    phone.value = phone.value.replaceAll('+', '')
    const response = await axios.get(
      `https://api.kod.mobi/api/v1/message/create?phone=${phone.value}&type=telegram&lang=ru&x-api-key=${key}`
    )
    session_id.value = response.data.data.session_id
    step.value = 'send'
    console.log(response.data)
  } else {
    console.log('Invalid phone number')
    console.log(isValidPhoneNumber.value)
  }
}

const sendCode = async () => {
  if (session_id.value) {
    const response = await axios.get(
      `https://api.kod.mobi/api/v1/message/send?session_id=${session_id.value}&type=telegram&x-api-key=${key}`
    )
    console.log(response.data)
  }
}

const checkCode = async () => {
  if (session_id.value) {
    try{
      const response = await axios.get(
      `https://api.kod.mobi/api/v1/message/check?session_id=${session_id.value}&code=${code.value}&lang=ru&x-api-key=${key}`
    )
    console.log(response.data);
    isValidCode.value = true
    step.value = 'final'
    }catch(error){
      console.log(error)
      isValidCode.value = false
    }
  }
}

const navigateBack = () =>{
  step.value = 'create';
}
const changeCode = () => {
  phone.value = selected.value
}
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500';
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.form_auth {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(#dfdfdf);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 70px;

  &__main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;

    &__form {
      display: flex;
      width: 500px;
      padding: 0px 30px;
      flex-direction: column;
      align-items: center;
      gap: 30px;

      &__header {
        display: flex;
        padding: 50px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        align-self: stretch;

        .logo {
          display: flex;
          padding: 12px 20px;
          width: 300px;
          align-items: flex-start;
          background: #f8f8f8;
          font-family: Roboto;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .title {
          font-family: Roboto;
          font-size: 32px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          color: #000;
        }
      }

      &__inputs {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;

        .country {
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.12);

          label {
            position: absolute;
            top: -20px;
            left: 20px;
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 133.333% */
            letter-spacing: 0.4px;
            color: #9e9e9e;
          }

          select {
            cursor: pointer;
            width: 440px;
            height: 55px;
            padding: 16px;
            border: none;
            color: #000;
            font-family: Roboto;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0.15px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url('../assets/icons/arrow.svg') no-repeat 96% / 15% #fff;
            background-size: 25px;
            border-radius: 4px;

            &:focus {
              outline: none;
            }
          }
        }

        .number {
          position: relative;

          input:focus + label{
              top: -20px;
              font-size: 12px;
          }
          label {
            position: absolute;
            top: 15px;
            left: 20px;
            font-family: Roboto;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; 
            letter-spacing: 0.15px;
            color: #9e9e9e;
            transition: 0.3s all;
          }

          input {
            width: 440px;
            height: 55px;
            padding: 16px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 4px;

            &::placeholder {
              font-family: Roboto;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              letter-spacing: 0.15px;
            }

            &:focus {
              outline: none;
            }

            &.invalid {
              border: 1px solid #eb4036;
            }
          }

          .validation {
            font-family: Roboto;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 133.333% */
            letter-spacing: 0.4px;
            color: #eb4036;
            margin-left: 16px;
            margin-top: 4px;
          }
        }
      }
    }

    &__button {
      display: flex;
      padding: 0px 32px;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      width: 100%;

      button {
        cursor: pointer;
        display: flex;
        height: 55px;
        padding: 0px 16px;
        justify-content: center;
        align-items: center;
        gap: 16px;
        flex: 1 0 0;
        border-radius: 4px;
        border: 0px;
        background: #007aff;
        color: #fff;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
      }

    .back{
      cursor: pointer;
      display: flex;
      height: 55px;
      padding: 0px 16px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex: 1 0 0;

      p{
        color: #007AFF;
        text-align: center;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
      }
    }
    }
  }

  &__footer {
    display: flex;
    padding: 0px 32px 24px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    width: 100%;

    &__language {
      select {
        cursor: pointer;
        color: #666;
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url('../assets/icons/arrow_small.svg') no-repeat 65% transparent;
        background-size: 14px;
        border-radius: 4px;
        border: 0px;
        width: 100px;

        &:focus {
          outline: none;
        }
      }
    }

    &__terms {
      display: flex;
      gap: 24px;

      p {
        cursor: pointer;
        color: #666;
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 200% */
      }
    }
  }
}
</style>
