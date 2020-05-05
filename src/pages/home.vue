<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :transparent="false  " :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-searchbar
        :disable-button="!$theme.aurora"
        placeholder="Para onde vamos?"
      >
      </f7-searchbar>
    </f7-navbar>
    <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" 
             data-projection="EPSG:4326" style="height: 400px" >  
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="static/marker.png" :scale="0.3" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box> 
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px">
    </div>
  </div>
  </f7-page>
</template>
<script>
  export default {
    data () {
      return { 
        zoom: 14,
        center: [-47.8921573, -21.9964066],
        rotation: 0,
        geolocPosition: undefined,
      }
    },
  }
</script>
<style scoped>

</style>