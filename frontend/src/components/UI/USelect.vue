<template>
    <select :text="text" :value="value" @change="$emit('input', $event.target.value)">
        <option disabled value="">{{ text }}</option>
        <option v-for="option in options" :key="option.id" :value="getOptionValue(option)">
            <div v-if="option.value">{{ option.value }}</div>
            <div v-else>
                {{ option.name }}
            </div>
        </option>
    </select>
</template>
  
<script>
export default {
    name: "USelect",
    props: {
        value: {
            type: [String, Array]
        },
        options: {
            type: Array,
            default: () => []
        },
        // Текст отображаемый в option disabled
        text: {
            type: String,
            default: "Выберите из списка"
        },
        // Получение значение элемента списка, по умолчанию поле "name"
        valueField: {
            type: String,
            default: "name"
        }
    },
    methods: {
        getOptionValue(option) {
            return option[this.valueField];
        }
    }
}
</script>
  
  
<style scoped>
select {
    height: 50px;
    padding: 10px;
    font-size: 15px;
    border-radius: 5px;
}
</style>