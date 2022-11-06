<template>
    <div id="wrapper"></div>
    <splitpanes style="height: 90vh" class="default-theme">
        <pane min-size="20" max-size="70" size="30">
            <splitpanes horizontal style="height: 100%">
                <pane size="70">
                    <div class="conteiner-userPoints">
                        <PointsTable v-if="pointsItem.length > 0" :point_data="pointsItem" @selectItem="selectItem"></PointsTable>
                        <button class="btn btn-primary" type="button" @click="toggleIsOpen">Добавить точку</button>
                    </div>
                </pane>
                <pane  style="background: rgba(141, 137, 137, 0.507)"  size="20">
                    <PopupEditPoint  v-if="isOpen"  :setID="this.oldID" ></PopupEditPoint>  
                </pane>
            </splitpanes>
        </pane>
        <pane style="background: #002233;" size="70" >
            <div id="map" ref="MapConteiner" ></div>
        </pane>
    </splitpanes>
</template>
  
<script >
import 'leaflet/dist/leaflet.css'
import  LMap from 'leaflet'
import { Icon } from 'leaflet';
import { mapActions, mapMutations, mapState } from 'vuex'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as GeoSearch from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import { ref } from 'vue'

const { Splitpanes, Pane } = require('splitpanes');
import 'splitpanes/dist/splitpanes.css'

import PointsTable from '@/components/PointsTable.vue'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'MapPage',

    components: {
        Splitpanes, 
        Pane,
        PointsTable
    },
    setup() {
        const isOpen = ref(false)
        const oldID = ref(null)
        const toggleIsOpen = () => {
            isOpen.value = !isOpen.value
        }

        return { isOpen, oldID, toggleIsOpen }
    },

    data() {
        return {
            map : Object,
            layerMyMarker: new LMap.LayerGroup(),
            
         }
    },
    computed: {
        ...mapState({
            mapInstance: state => state.map.mapInstance,
            pointsItem: state => state.map.pointsItem
        })
    },
    methods : {
        ...mapMutations({
            SET_MAP_INSTANCE: 'map/SET_MAP_INSTANCE'
        }),
        ...mapActions({
            GET_POINTSITEM_API: 'map/GET_POINTSITEM_API'
        }),
        selectItem (id) {
            if (this.oldID != id) {
                this.oldID = id;
                this.isOpen = true
            } else {
                this.oldID = null
                this.isOpen = false
            } 
        },
        addPoint () {
            this.visibleEdit = !this.visibleEdit
        },
        renderMap () {
            this.map = LMap.map(this.$refs.MapConteiner, {
			center: [53.903731, 27.565384],
			zoom: 10,
			layers: [this.layerMyMarker]
		});
            const tileLayer = LMap.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            })
            tileLayer.addTo(this.map)

            const search = new GeoSearch.GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            });
            this.map.addControl(search);
            this.map.on('geosearch/showlocation', this.searchEventHandler);

            return this.map
        },
        searchEventHandler(result) {
            console.log(result.location);
        },
        addMap () {
            this.SET_MAP_INSTANCE(this.renderMap())
        },
        removeMarkers() {
                this.layerMyMarker.clearLayers()
  
        },
        addMarkers() {
            for (const point of this.pointsItem) {
                const marker = LMap.marker(new LMap.LatLng(point.latitude, point.longitude), { title: point.point_name })
                this.layerMyMarker.addLayer(marker);
            }
        }
    },
    mounted () {
        this.addMap()
        this.GET_POINTSITEM_API()
    },
    watch: {
        pointsItem () {
            this.removeMarkers()
            this.addMarkers()
        },
    },
    beforeUnmount() {
        if(this.mapInstance) {
            this.mapInstance.remove()
            this.SET_MAP_INSTANCE(null)

        }
    }
}



</script>
  
<style scoped>

#map { 
    margin: 0 auto;
    height: 100%;
    width: 100vw; 
}


.conteiner-userPoints {
    height: 100%;
    width: 100%;
    background: #d4d4d4;
    display: flex; 
    flex-direction: column;
    align-content: space-between;
}

.listUserPoints {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 1rem;
}


 
</style>
  

///this.map.on('click', this.mapClick);

// mapClick(event) {
            
    //     console.log(event)
    //     this.createMarker(event.latlng);
    // },
    // createMarker(latlng) {
    //     LMap.marker(latlng).addTo(this.map);
    // },