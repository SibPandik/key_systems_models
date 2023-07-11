<template>
    <div class="popup-wrapper" @click="closePopup">
        <div class="popup" @click.stop>
            <span class="close" @click="closePopup">
                &times;
            </span>
            <slot @click.stop></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "UPopup",
    methods: {
        closePopup() {
            this.$emit('closePopup')
        }
    }
}
</script>

<style scoped>
.popup-wrapper {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;
}

.popup {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 500px;
    display: flex;
    flex-direction: column;
}

@media (max-width: 560px) {
    .popup{
        width: auto;
        margin: 15% 10px;
    }
}

.close {
    display: flex;
    flex-direction: row-reverse;
    font-size: xx-large;
    cursor: pointer;
}
</style>