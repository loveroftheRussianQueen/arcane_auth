<script setup> 
  import { useI18n } from 'vue-i18n'
  import AuthForm from '../components/AuthForm.vue'

  const { t } = useI18n()
    
</script>

<template>
  <main>
    <AuthForm />
  </main>
</template>
