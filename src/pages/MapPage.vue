<template>
    <div id="wrapper"></div>
    <splitpanes style="height: 80vh" class="default-theme">
        <pane min-size="20" max-size="70" size="30">
            <splitpanes horizontal>
                <pane  v-if="pointsItem.length > 0" style="background: rgba(141, 137, 137, 0.507)" min-size="50" max-size="100" size="100">
                    <PointsTable :point_data="pointsItem"></PointsTable>
                </pane>
                <pane  style="background: rgba(141, 137, 137, 0.507)">
                </pane>
                <pane  style="background: rgba(141, 137, 137, 0.507)">
                </pane>
            </splitpanes>
        </pane>
        <pane style="background: #002233;" min-size="20" max-size="80" >
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

const { Splitpanes, Pane } = require('splitpanes');
import 'splitpanes/dist/splitpanes.css'

import PointsTable from '@/components/UI/PointsTable.vue'

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

    data() {
        return {
            map : Object,
            layerMyMarker: new LMap.LayerGroup(),
            searchPoint: {}
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