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
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>
  
<script>
export default {
    name: "USelect",
    props: {
        value: {
            type: String
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