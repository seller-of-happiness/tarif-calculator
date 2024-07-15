import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useTariffStore = defineStore('tariff', () => {
    interface Rates {
        [key: string]: number
    }

    const rates = ref<Rates>({})

    interface TariffDetails {
        monthly: number
        yearly: number
        [key: string]: number
    }

    interface Tariffs {
        [key: string]: TariffDetails
    }

    const tariffs = ref<Tariffs>({
        standard: { monthly: 100, yearly: 1000 },
        advanced: { monthly: 150, yearly: 1400 },
    })

    const sum = ref<number>(0)
    const discount = ref<number>(0)

    const fetchRates = async () => {
        try {
            const { data } = await useFetch(
                'https://v6.exchangerate-api.com/v6/b0fcdb6b5dc39526cb7502d2/latest/RUB'
            )

            if (data.value && typeof data.value === 'string') {
                let aspObj = JSON.parse(data.value)
                rates.value = aspObj.conversion_rates
            }
        } catch (error) {
            console.error('Не удалось загрузить курсы обмена:', error)
        }
    }

    const calculateTariff = (
        tariff: string,
        period: string,
        currency: string
    ) => {
        sum.value = tariffs.value[tariff][period] * rates.value[currency]
        sum.value = parseFloat(sum.value.toFixed(2))

        discount.value =
            period === 'yearly'
                ? (tariffs.value[tariff].monthly * 12 -
                      tariffs.value[tariff].yearly) *
                  rates.value[currency]
                : 0
        discount.value = parseFloat(discount.value.toFixed(2))
    }

    onMounted(() => {
        fetchRates()
    })

    return {
        fetchRates,
        calculateTariff,
        tariffs,
        sum,
        discount,
        rates,
    }
})
