<template>
    <select 
        :text="text" 
        :value="value" 
        @change="$emit('input', $event.target.value)"
    >
        <option disabled value="">{{ text }}</option>
        <option 
            v-for="option in options" 
            :key="option.id" 
            :value="option.name"
        >
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
        text: {
            type: String,
            default: "Выберите из списка"
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