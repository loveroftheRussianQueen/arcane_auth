<template>
    <select @change="switchLanguage">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`${sLocale}`) }}
    </option>
  </select>
</template>
<script>
  import { useI18n } from 'vue-i18n'
  import Tr from "@/i18n/translations"
  
  export default {
    setup() {
      const { t, locale } = useI18n()
      const supportedLocales = Tr.supportedLocales
      const switchLanguage = async (event) => { 
        const newLocale = event.target.value 
        await Tr.switchLanguage(newLocale) 
      }
      return { t, locale, supportedLocales, switchLanguage } 
    }
  }
</script>

<style scoped>
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
</style>