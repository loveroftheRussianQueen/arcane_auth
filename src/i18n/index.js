import { createI18n } from 'vue-i18n'

const messages = {
  ru: {
    title: {
      logo: 'Логотип (Высота 40px, длина до 300px)',
      phone: 'Введите номер телефона',
      code: 'Введите код'
    },
    paragraph: {
      register: 'Чтобы войти или зарегистрироваться',
      to_number: 'Отправлено по номеру',
      channel: 'Для использования данного канала связи вам необходимо авторизоваться в боте'
    },
    inputs: {
      code_option: 'Способ получения кода',
      country: 'Страна',
      phone: 'Номер телефона',
      code: 'Введите код',
      wrong_phone: 'Неверный формат номера',
      wrong_code: 'Код введен неверно'
    },
    buttons: {
      register: 'Продолжить',
      authorize: 'Авторизоваться в боте',
      check: 'Далее',
      send: 'Отправить',
      status: 'Проверить статус',
      back: 'Назад'
    },
    footer: {
      terms: 'Условия',
      conf: 'Конфиденциальность'
    }
  },
  en: {
    title: {
      logo: 'Logo (Height 40px, length up to 300px)',
      phone: 'Enter your phone number',
      code: 'Enter your code'
    },
    paragraph: {
      register: 'Log in or Sign up',
      to_number: 'Sent to',
      channel: 'To use this communication channel, you need to log in to the bot'
    },
    inputs: {
      code_option: 'Choose the method',
      country: 'Country',
      phone: 'Phone number',
      code: 'Enter your code',
      wrong_phone: 'Invalid number format',
      wrong_code: 'Incorrect code'
    },
    buttons: {
      register: 'Next',
      authorize: 'Log in to the bot',
      check: 'Next',
      send: 'Send',
      status: 'Check the status',
      back: 'Back'
    },
    footer: {
      terms: 'Terms',
      conf: 'Confidentiality'
    }
  }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages
})
