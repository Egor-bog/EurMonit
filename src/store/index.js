import { createStore } from "vuex";
import { mapModule } from "./mapModule";


export default createStore ({
    modules: {
        map: mapModule
    }
})