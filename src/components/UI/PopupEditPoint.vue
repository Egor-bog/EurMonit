<template>
    <div class="popupEditPoint" >
        <div class="popupEditPoint-wrapper">
            <div class="popupEditPoint-conteiner">
                Привет я модальное окно
                <button>Сохранить</button>
                <button>Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PopupEditPoint',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
  }
</script>

<style scoped>



</style>
  