<template>
    <div class="popupEditPoint" >
        <div class="popupEditPoint-wrapper">
            <div class="popupEditPoint-conteiner">
                <p class="text-input">Наименование точки</p>
                <input 
                    type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm" 
                    v-model="point_name" 
                />
                <div class="latlong">
                    <p class="text-input">Шир</p>
                    <input 
                        type="text" 
                        class="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                        v-model.number="latitude"
                    />
                    <p class="text-input">Долг</p>
                    <input 
                        type="text" 
                        class="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-sm" 
                        v-model.number="longitude"
                    />
                </div>
                <p class="text-input">Адресс</p>
                <input 
                    type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm" 
                    v-model="address" 
                />
                <button type="button" class="btn btn-primary btn-sm" @click="submit">Сохранить</button>
                <button type="button" class="btn btn-secondary btn-sm" @click="deletePoint">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
  export default {
    name: 'PopupEditPoint',
    props: {
        setID: {
            type: Number,
        }
    },
    data() {
        return {
            selectPoind: null,
            id: 0,
            point_name: " ",
            latitude: 0,
            longitude: 0,
            address: " "
        }
    },
    computed: {
        ...mapState({
            pointsItem: state => state.map.pointsItem
        })
    },
    methods: {
        ...mapActions({
            DELETE_POINTSISTEM_API: 'map/DELETE_POINTSISTEM_API'
        }),
        selectProps() {
            if(this.setID) {
                console.log(this.setID)
                this.selectPoind = this.pointsItem.find(point => point.id == this.setID)
                this.id = this.selectPoind.id
                this.point_name = this.selectPoind.point_name
                this.latitude = this.selectPoind.latitude
                this.longitude = this.selectPoind.longitude
                this.address = this.selectPoind.address
            } else {
                console.log('1 ' + this.setID)
                this.id = Date.now().toString()
                this.latitude = this.longitude = " "
                this.point_name = this.address = " "
            }
        },

        deletePoint() {
            this.DELETE_POINTSISTEM_API(this.point.id)
            this.$emit('close', this.point.id)
        }
    },
    watch: {
        setID () {
            this.selectProps()
        },
    }, 
    mounted () {
        this.selectProps()
    }, 

  }
</script>

<style scoped>

.popupEditPoint-conteiner {
    margin: 0.2em;
    display: flex;
    flex-direction: column;
    justify-content: start;
}
.latlong {
    margin: 0.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    height: 1.7em;
}

.text-input {
    margin: 0.2em;
    padding-left: 0.8em;
    text-align: start;
    font-size: 0.9em;
    color: #000;
}
</style>
  