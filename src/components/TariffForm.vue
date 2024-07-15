<template lang="pug">
  div.container.mx-auto.p-4
    h1.text-2xl.font-bold Тарифный калькулятор
    form(@submit.prevent="calculate")
      div.mb-4
        label.block.mb-2 Тариф
        select(v-model="tariff", class="w-full p-2 border rounded" @change="calculate")
          option(value="standard") Стандарт
          option(value="advanced") Продвинутый
      div.mb-4
        label.block.mb-2 Валюта
        select(v-model="currency", class="w-full p-2 border rounded" @change="calculate")
          option(value="CNY") Юань
          option(value="KZT") Тенге
      div.mb-4
        label.block.mb-2 Период
        select(v-model="period", class="w-full p-2 border rounded" @change="calculate")
          option(value="monthly") Месяц
          option(value="yearly") Год
      button(type="submit", class="bg-blue-500 text-white px-4 py-2 rounded") Посчитать
    div.mt-4
      p Сумма: {{ store.sum }} {{ currency }}
      p Скидка: {{ store.discount }} {{ currency }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTariffStore } from '../stores/tariff'

const tariff = ref<string>('standard')
const currency = ref<string>('CNY')
const period = ref<string>('monthly')
const store = useTariffStore()

const calculate = () => {
    store.calculateTariff(tariff.value, period.value, currency.value)
}
</script>
