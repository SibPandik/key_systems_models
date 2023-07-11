<template>
    <div>
        <input 
            :className="inputClass" 
            :type="type" 
            :placeholder="placeholder" 
            :value="value" 
            :checked="value"
            @input="updateInput" 
        />
    </div>
</template>

<script>
export default {
    name: "UInput",
    props: {
        value: [String, Number, Boolean],
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            default: '.u-input',
        },
    },
    computed: {
        inputClass() {
            return this.class;
        },
    },
    methods: {
        updateInput(event) {
            if (this.type === "checkbox") {
                this.$emit("input", event.target.checked);
            } else {
                this.$emit("input", event.target.value);
            }
        },
    }

}
</script>

<style scoped>
input {
    min-height: 32px;
}

.u-input input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: -webkit-fill-available;
}

.u-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.u-input-add input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: -webkit-fill-available;
    margin-right: 10px;
    width: 100px;
}
</style>