"use strict";

////////////////////////////////////
//////////// SLIDER ////////////////
////////////////////////////////////

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnLeftVehicle = document.querySelector(".slider__btn--left-vehicle");

const btnRight = document.querySelector(".slider__btn--right");
const btnRightVehicle = document.querySelector(".slider__btn--right-vehicle");
let curSlide ;

const slider = function (slidenumber=0) {
  curSlide = slidenumber;
  const maxSlide = slides.length;

  // functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide=${i}></button>`
      );
    });
  };
  let single_vehicle_page = document.querySelector(".single-vehicle-page")
  let my_vehicles_page = document.querySelector(".myvehicles")
  let main_page = document.querySelector(".main-page-container")

   const goToSlide = function (slide) {

    if(!single_vehicle_page){
        if (!my_vehicles_page){
        
          slides.forEach(
          (s, i) => {
            (s.style.transform = `translateX(${50 * (i - slide)}%) scale(0.88)`);
              s.classList.add("transparent-item")
              s.classList.remove("non-transparent-item")
              s.querySelector(".card-img-top").classList.add("transparent-item")
          if (document.getElementById(`slide-no-${slide}`)) {
            let currentslide = document.getElementById(`slide-no-${slide}`)
            currentslide.classList.remove("transparent-item")
            currentslide.querySelector(".card-img-top").classList.remove("transparent-item")
            currentslide.style.transform = `scale(1)`
            currentslide.classList.add("non-transparent-item")
            }}
            )

        }

        
      }

        // if (vehicle_page) {
        //     slides.forEach(
        //       (s, i) => {
        //         (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        //       }
        //     );
        //   };
}


  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(slidenumber);
    if(!single_vehicle_page && !my_vehicles_page){
      slides.forEach(s => s.classList.toggle("hidden"))
    }
    // if(!my_vehicles_page){
    //   slides.forEach(s => s.classList.toggle("hidden"))
    // }

  };

  init();


  // Event handlers
  if(btnRight){
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  }
  if(btnRightVehicle){
    btnRightVehicle.addEventListener("click", nextSlide);
    btnLeftVehicle.addEventListener("click", prevSlide);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

};

if (document.querySelector(".slide")) {
  slider();
}

const goToSlide = function (slide) {

  console.log("hello from outer goToSlide");

     slides.forEach(
        (s, i) => {
          (s.style.transform = `translateX(${50 * (i - slide)}%) scale(0.88)`);
            s.classList.add("transparent-item")
            s.classList.remove("non-transparent-item")
            s.querySelector(".card-img-top").classList.add("transparent-item")
        if (document.getElementById(`slide-no-${slide}`)) {
          let currentslide = document.getElementById(`slide-no-${slide}`)
          currentslide.classList.remove("transparent-item")
          currentslide.querySelector(".card-img-top").classList.remove("transparent-item")
          currentslide.style.transform = `scale(1)`
          currentslide.classList.add("non-transparent-item")
          }
        })
     


}


////////// PROFILE AND PUBLIC PROFILE PAGES //////



let voyage_lines = document.querySelectorAll(".voyage-line")
let public_profile_page = document.getElementById("public-profile-page")
let username = document.getElementById("username")
if (username) {username = username.innerHTML
}
let voyages_h4_element = document.getElementById("voyages")
let user_auctions_url = `/voyages/uservoyages/${username}/`
let my_auctions_url = `/voyages/myvoyages/`
let user_auctions_button = 
`<a href="${user_auctions_url}" class="btn btn-primary" 
style="box-shadow: rgba(3, 7, 59, 0.15) 0px -2px 5px 0px inset,
rgba(3, 7, 59, 0.3) 0px -5px 9px 0px inset; 
/* rgba(3, 7, 59, 0.4) 0px -7px 11px 0px inset; */
border-radius: .9rem; font-weight: 700; border:none;
margin-left: 1.7rem;"
role="button" aria-pressed="true" 
id="auction-view-button" type="submit">Map View</a>`
let my_auctions_button = 
`<a href="${my_auctions_url}" class="btn btn-primary" 
style="box-shadow: rgba(3, 7, 59, 0.15) 0px -2px 5px 0px inset,
rgba(3, 7, 59, 0.3) 0px -5px 9px 0px inset; 
/* rgba(3, 7, 59, 0.4) 0px -7px 11px 0px inset; */
border-radius: .9rem; font-weight: 700; border:none;
margin-left: 1.7rem;"
role="button" aria-pressed="true" 
id="auction-view-button" type="submit">Map View</a>`
if (voyage_lines.length > 0) {
  if (public_profile_page){
    voyages_h4_element.innerHTML = `Voyages
    ${user_auctions_button}`
  }
  else {
    voyages_h4_element.innerHTML = `Voyages
    ${my_auctions_button}`
    setTimeout(() => {
      if (document.getElementById("cke_id_profile_info")) {
        document.getElementById("cke_id_profile_info").style.width = "100%"
        document.getElementById("cke_id_profile_info").style.display = "block"

      }
    }, 3000);
    setTimeout(() => {
      if (document.getElementById("cke_id_profile_info")) {
        document.getElementById("cke_id_profile_info").style.width = "100%"
        document.getElementById("cke_id_profile_info").style.display = "block"

      }
    }, 8000);
  }
}


/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////////////// MAPID /////////////////////////////////

let mapCenter_custom = 0
let mapZoom_custom = 0
let vehicle_filter = null
let vacancy_filter = null
let startdate_filter = null
let enddate_filter = null

let vehicle_filter_field = document.getElementsByName("auctionVehicleType")
let vacancy_filter_field = document.getElementsByName("vacancy")
let startdate_filter_field = document.getElementsByName("trip_startDate")
let enddate_filter_field = document.getElementsByName("trip_endDate")

// let allmarkers500 = 500

class App_main_page {
  #map;
  #mapZoomLevel = 8;
  #seeOnMapButtons = document.querySelectorAll('.see-on-map-button');
  #mapbounds 
  #map_lat_low = 0
  #map_lat_high = 0
  #map_lng_low = 0 
  #map_lng_high = 0
  #filterButton = document.getElementById("filter-button")
  #filterButton2 = document.getElementById("filter-button2")
  // #clearFilterButton = document.getElementById("clear-filter-button")
  #input_latLT = document.getElementsByName("lat__lt")[0]
  #input_latGT = document.getElementsByName("lat__gt")[0]
  #input_lngLT = document.getElementsByName("lon__lt")[0]
  #input_lngGT = document.getElementsByName("lon__gt")[0]

  constructor() {
    this._getPosition();
    this.#seeOnMapButtons.forEach(button => button.addEventListener('click', this._moveToAuction.bind(this)));
    this.#filterButton.addEventListener("mouseover", this._getMapBounds_and_Zoom.bind(this))
    this.#filterButton2.addEventListener("mouseover", this._getMapBounds_and_Zoom.bind(this))

    // console.log("vehicle_filter:", vehicle_filter);
    // console.log("vacancy_filter:", vacancy_filter);
    // console.log("startdate_filter:", startdate_filter);
    // console.log("enddate_filter:", enddate_filter);

    vehicle_filter_field[0].options.selectedIndex = localStorage.getItem('vehicle')
    vacancy_filter_field[0].options.selectedIndex = localStorage.getItem('vacancy')
    let start_date = localStorage.getItem('starts')
    let end_date = localStorage.getItem("ends")
    let start_year = start_date.substr(1, 4)
    let start_month = start_date.substr(6, 2)
    let start_day = start_date.substr(9, 2)
    let end_year = end_date.substr(1, 4)
    let end_month = end_date.substr(6, 2)
    let end_day = end_date.substr(9, 2)

//     console.log("start:",start_day,"-",start_month,"-",start_year);
//     console.log("end:",end_day,"-",end_month,"-",end_year);

    startdate_filter_field[0].value = `${start_year}-${start_month}-${start_day}`  
    enddate_filter_field[0].value = `${end_year}-${end_month}-${end_day}`
  }

  // _clearFilter(){
  //   vehicle_filter_field[0].options.selectedIndex = 0
  //   vacancy_filter = vacancy_filter_field[0].options.selectedIndex = 0 
  //   startdate_filter = startdate_filter_field[0].value = 0 
  //   enddate_filter = enddate_filter_field[0].value = 0 
  // }

  _getMapBounds_and_Zoom() {
    this.#mapbounds = this.#map.getBounds()
    this.#map_lat_low = this.#mapbounds._southWest.lat
    this.#map_lat_high = this.#mapbounds._northEast.lat
    this.#map_lng_low = this.#mapbounds._southWest.lng
    this.#map_lng_high = this.#mapbounds._northEast.lng
    
    this.#input_latGT.value = (+this.#map_lat_low.toFixed(3) );
    this.#input_latLT.value = (+this.#map_lat_high.toFixed(3)) ;
    this.#input_lngGT.value = (+this.#map_lng_low.toFixed(3)) ;
    this.#input_lngLT.value = (+this.#map_lng_high.toFixed(3)) ;

    this.#mapZoomLevel = this.#map.getZoom() 
    mapZoom_custom = this.#mapZoomLevel
    mapCenter_custom = [(+this.#map_lat_low + +this.#map_lat_high)/2, (+this.#map_lng_low + +this.#map_lng_high)/2 ]
    
    vehicle_filter = vehicle_filter_field[0].options.selectedIndex
    vacancy_filter = vacancy_filter_field[0].options.selectedIndex
    startdate_filter = startdate_filter_field[0].value
    enddate_filter = enddate_filter_field[0].value

    localStorage.setItem('mapcenter', JSON.stringify(mapCenter_custom));
    localStorage.setItem('mapzoom', JSON.stringify(mapZoom_custom));
    localStorage.setItem('vehicle', JSON.stringify(vehicle_filter));
    localStorage.setItem('vacancy', JSON.stringify(vacancy_filter));
    localStorage.setItem('starts', JSON.stringify(startdate_filter));
    localStorage.setItem('ends', JSON.stringify(enddate_filter));


    // console.log("vehicle_filter_field: ",vehicle_filter_field);
  }


  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position.  Please use secure connection with HTTPS ! ");
        }
      );
  }

  _moveToAuction(e) {
    if (!this.#map) return;
    const seeOnMapButton = e.target.closest('.see-on-map-button');
    if (!seeOnMapButton) return;
    let latitude = seeOnMapButton.dataset.latitude
    let longitude = seeOnMapButton.dataset.longitude

    // this.#map.setView([ latitude,longitude], this.#mapZoomLevel, {
    this.#map.setView([ latitude,longitude], 8, {

        animate: true,
        pan: {
        duration: 1.5,
        },
    });
  
    }


  _loadMap(position) {

    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    const map_center_from_memory = JSON.parse(localStorage.getItem('mapcenter'));
    const map_zoom_from_memory = JSON.parse(localStorage.getItem('mapzoom'));
    mapCenter_custom = map_center_from_memory

    // console.log("map zoom memory: ",map_zoom_from_memory);
    // console.log("map center memory: ", +map_center_from_memory[0], +map_center_from_memory[1]);
    if (mapCenter_custom) {
    this.#map = L.map("mapid", {worldCopyJump:true}).setView([+map_center_from_memory[0], +map_center_from_memory[1]], map_zoom_from_memory);
     }  else {
    this.#map = L.map("mapid", {worldCopyJump:true}).setView(coords, this.#mapZoomLevel);
     }

    localStorage.removeItem('mapcenter')
    localStorage.removeItem('mapzoom')
    localStorage.removeItem('vehicle')
    localStorage.removeItem('vacancy')
    localStorage.removeItem('starts')
    localStorage.removeItem('ends')


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#seeOnMapButtons.forEach(button => this._addMarker(button))  


}

  _getCoordinates(e) {
    return new Promise(function (resolve) {
      const coords = [e.latlng.lat, e.latlng.lng];
      resolve(coords);
    });
  }


  _addMarker(button) {
    let coords = [button.dataset.latitude, button.dataset.longitude]
    let info = button.dataset.trip_details.slice(0,160) + "..."
    let vehicle_type = button.dataset.vehicle_type
    let auction_title = button.dataset.trip_title.toUpperCase()
    L.marker(coords)
    .addTo(this.#map)
    .bindPopup(
        L.popup({
        maxWidth: 200,
        minWidth: 200,
        autoClose: false,
        closeOnClick: false,
        className: `${button.dataset.id}-auctionID`,
        })) 
    .setPopupContent(
        // ` <a href="${window.location.origin}/voyages/${button.dataset.id}" style="color:white">${info}</a>`
          // `<a href="javascript:void(0);"  onclick="goToSlide(${+button.dataset.slide_number-1})" style="color:white">&#128270; <strong style="font-style:italic;color:#ffff9b;font-weight:700">${auction_title}</strong> <br/> ${info}</a>`
    `
    <div class="card popup-card" style="width: 14rem;">
  <div class="card-body popup-card-body">
    <h7 class="card-title" style="color:darkred; font-weight:700;">${auction_title}</h7>
    <br>
    <a href="javascript:void(0);" style="color:#664d23" onclick="goToSlide(${+button.dataset.slide_number-1})" 
    style="color:white">&#128270;${info}</a>
    </div>
</div>`
    
          )
    .openPopup(); 
    
console.log(info);
  }

  _moveToClick(coords) {
    if (!this.#map) return;
    this.#map.panTo(coords, {
      animate: true,
      duration: .5, //1
      easeLinearity: 0.8,
    });
  }
}




/////////////////// AUCTION DETAIL PAGE APP /////////////////////////////////
/////////////////// AUCTION DETAIL PAGE APP /////////////////////////////////
/////////////////// AUCTION_VIEW.HTML ///////////////////////////////////////
////////////////// MAPID2 ///////////////////////////////////////////////////
  

$("[data-toggle=popover]").popover();  


class App_auction_detail_page {
  #map;
  #mapZoomLevel = 8;
  #seeOnMapButtons = document.querySelectorAll('.see-on-map-button');
  #waypoints_dataEl = document.querySelector("#waypoints-information")
  #waypoints_array = []
  #polyline

  constructor() {
    this._extract_waypoints_JSON()
    this._getPosition();
    this.#seeOnMapButtons.forEach(button => button.addEventListener('click', this._moveToAuction.bind(this)));
   }



  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }


  _loadMap(position) {

    let first_location = this.#waypoints_array[0]
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("mapid2", {worldCopyJump:true}).setView(first_location, 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._handleClick.bind(this));

    this._drawPolygon()
}



_extract_waypoints_JSON () {
  let array_raw = (JSON.parse(this.#waypoints_dataEl.dataset.waypoints_array))
  // console.log("array raw:", array_raw);
  let coords = []
  array_raw.forEach(item => {
    coords = [+item[1],+item[2]]
    this.#waypoints_array.push(coords)
  })

  }

_handleClick(e) {
this._getCoordinates(e).then((coords) => {
  this._moveToClick(coords);
  this._setFormFields(coords);
});
}


_getCoordinates(e) {
  return new Promise(function (resolve) {
    const coords = [e.latlng.lat, e.latlng.lng];
    resolve(coords);
  });
}

 
_drawPolygon() {
  this.#polyline = L.polyline(this.#waypoints_array, {color: "blue",smoothFactor: 0,  dashArray: '12, 8'}).addTo(this.#map)
  this.#waypoints_array.forEach( (waypoint,i) => {
    if(i==0){
      let myIcon = L.icon({
        iconUrl: ("/static/green-pin.png"),
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
      });
      L.marker(waypoint, {icon: myIcon}).addTo(this.#map);
    } else if(i==this.#waypoints_array.length-1){
      let myIcon = L.icon({
        iconUrl: ("/static/red-pin.png"),
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
      });
      L.marker(waypoint, {icon: myIcon}).addTo(this.#map);
    } else {
      let myIcon = L.icon({
        iconUrl: ("/static/marker-icon.png"),
        iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location

      });
      L.marker(waypoint, {icon: myIcon}).addTo(this.#map);
    }

    
  })
  let bounds = L.latLngBounds(this.#waypoints_array).pad(.1) 
  this.#map.fitBounds(bounds)
  const currentZoom = this.#map.getZoom()
  if (currentZoom == 18) this.#map.setZoom(12)
}
}

/////////////////// AUCTION CREATE PAGE APP /////////////////////////////////
/////////////////// AUCTION CREATE PAGE APP /////////////////////////////////
/////////////////// AUCTION CREATE PAGE APP /////////////////////////////////
////////////////// MAPID3 ///////////////////////////////////////////////////

class App_auction_create_page {
  #map;
  #mapZoomLevel = 6;
  #createFormButton = document.querySelector("#create-form-button")
  


  constructor() {
    this._getPosition();
    console.log("hello from auction create");
    if (window.location.href.includes("update")){
      this.#createFormButton.textContent = "Update Auction"
    }    
    setTimeout(() => {
      if (document.getElementById("cke_id_tripDetails")) {
        document.getElementById("cke_id_tripDetails").style.width = "30rem"
        document.getElementById("cke_id_tripDetails").style.display = "block"

      }
    }, 3000);
    setTimeout(() => {
      if (document.getElementById("cke_id_tripDetails")) {
        document.getElementById("cke_id_tripDetails").style.width = "30rem"
        document.getElementById("cke_id_tripDetails").style.display = "block"

      }
    }, 7000);
    setTimeout(() => {
      if (document.getElementById("cke_id_tripDetails")) {
        document.getElementById("cke_id_tripDetails").style.width = "30rem"
        document.getElementById("cke_id_tripDetails").style.display = "block"

      }
    }, 25000);

      } 




      

    

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }
     
  _loadMap(position) {
    
        const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("mapid3", {worldCopyJump:true}).setView(coords, 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._handleClick.bind(this));

  }
  
    _handleClick(e) {
  this._getCoordinates(e).then((coords) => {
    this._hideMarkers();
    this._moveToClick(coords);
    this._setFormFields(coords);
    L.marker(coords)
    .addTo(this.#map)
  });
  }
  
  _hideMarkers() {
    let allmarkers = document.querySelectorAll(".leaflet-marker-icon")
    let shadows = document.querySelector(".leaflet-shadow-pane")
    console.log("shadows:", shadows);
    console.log("allmarkers:" ,allmarkers);
    shadows.style.display ="none";
    allmarkers.forEach(marker => marker.style.display ="none")

  }

  _setFormFields(coords) {
    let [lat,lon] = coords;
    let latitudeFormField = document.getElementById("id_Latitude")
    let longitudeFormField = document.getElementById("id_Longitude")
    console.log("------------");
    console.log("lon:", lon, " lat:", lat);
    console.log("latitudeFormField: ",latitudeFormField);
    console.log("longitudeFormField: ", longitudeFormField);
    latitudeFormField.value = lat;
    longitudeFormField.value = lon;

  }
  
  _getCoordinates(e) {
    return new Promise(function (resolve) {
      const coords = [e.latlng.lat, e.latlng.lng];
      resolve(coords);
    });
  }
  
  _moveToClick(coords) {
    if (!this.#map) return;
    this.#map.panTo(coords, {
      animate: true,
      duration: .5, //1
      easeLinearity: 0.8,
    });
  }
  
}

/////////////////// WAYPOINTS PAGE APP /////////////////////////////////
/////////////////// WAYPOINTS PAGE APP /////////////////////////////////
/////////////////// WAYPOINTS PAGE APP /////////////////////////////////
////////////////// mapid_itinerary /////////////////////////////////////
////// IMPORTANT:  AUCTION_DETAIL.HTML /////

class App_create_itinerary_page {
  #map;
  #mapZoomLevel = 6;
  #waypoints = [];
  #waypoints_counter = 0;
  #waypoints_json
  #deleteButtons
  #polyline
  #confirm_route_button = document.querySelector("#confirm-route-button")
  #itinerary_waypoints_container = document.querySelector("#itinerary-waypoints-container")
  #data_sent = false

  constructor() {
    this._getPosition();
    this._send_Waypoint();
    console.log(this.#itinerary_waypoints_container);
    this.#itinerary_waypoints_container.addEventListener("click", this._moveToWaypoint.bind(this))

    }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }
     
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("mapid_itinerary", {worldCopyJump:true}).setView(coords, 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._handleClick.bind(this));

  }
  
    _handleClick(e) {
    this._getCoordinates(e).then((coords) => {
    this._moveToClick(coords);
    this._addToDashboard(coords);
    if (this.#data_sent) return

    L.marker(coords )
    .addTo(this.#map)
    // this._drawPolygon()
    }
    )


  }
  
  _moveToWaypoint(e) {
    if (!this.#map) return;
    if (e.target.classList.contains("delete-icon")) return;
    console.log(e.target.classList);
    let waypoint_item_toPan = e.target.closest('.waypoint_item');
    if (!waypoint_item_toPan) return;
    let pan_Lat = +waypoint_item_toPan.attributes.lat.value;
    let pan_Lon = +waypoint_item_toPan.attributes.lon.value;
    let coords = [pan_Lat,pan_Lon]
    this.#map.panTo(coords, {
      animate: true,
      duration: .5,
      easeLinearity: 0.8,
    });

  }


  _addToDashboard(coords) {
    if (this.#data_sent) return

    let [lat,lon] = [coords[0].toFixed(5), coords[1].toFixed(5)];  //.toFixed()
    let lon_cleaned = lon
    if (lon < -180) {
      lon_cleaned = (lon% 360) +360
      lon_cleaned = lon_cleaned.toFixed(5)
    }

    let waypoints_container_alert_box = document.querySelector("#alert-box")
    this.#waypoints_counter ++;
    let waypoint_item_html = `<div class="waypoint_item" id="${this.#waypoints_counter}" lat="${lat}" lon="${lon}">
    <div class="latitude-longitude">Lat: ${lat}</div>
    <div class="latitude-longitude">Lon: ${lon_cleaned}</div>
    <div><img class="delete-icon" id="delete-icon-${this.#waypoints_counter}" data-id="${this.#waypoints_counter}" src="/static/delete.png" alt=""></div> 
    </div>`
    waypoints_container_alert_box.insertAdjacentHTML("afterend", waypoint_item_html )
    this.#waypoints.push([this.#waypoints_counter, lat, lon_cleaned])
    this.#waypoints_json = JSON.stringify(this.#waypoints);
    let deleteButton = document.querySelector(`#delete-icon-${this.#waypoints_counter}`)
    deleteButton.addEventListener('click', this._deleteWaypoint.bind(this))
    this._drawPolygon()
    console.log(this.#waypoints_json);
  }
  
  _drawPolygon() {
    let all_waypoints = document.querySelectorAll(".waypoint_item")
    let waypoints_array = []
    all_waypoints.forEach(waypoint => {
      waypoints_array.unshift([waypoint.attributes.lat.value,waypoint.attributes.lon.value])
    })
    this.#polyline = L.polyline(waypoints_array, {color: "blue",smoothFactor: 0,  dashArray: '12, 8'}).addTo(this.#map)

  }



  // deletes waypoint from dashboard, deletes all markers and re-renders all markers
  _deleteWaypoint(e){
    if (this.#data_sent) return

    // select all markers and shadows
    let all_markers = document.querySelectorAll(".leaflet-marker-icon")
    let all_shadows = document.querySelectorAll(".leaflet-marker-shadow")
    // delete parent of clicked delete item
    console.log( e.srcElement.closest(".waypoint_item"));
    let deleted_item_id = e.srcElement.closest(".waypoint_item").id;
    console.log(deleted_item_id);

    this.#waypoints.forEach(waypoint => {
      if (waypoint[0] == deleted_item_id){
        let index = this.#waypoints.indexOf(waypoint);
        if (index > -1) {
          this.#waypoints.splice(index, 1);
          // console.log("waypoint array after deletion:",this.#waypoints);
          this.#waypoints_json = JSON.stringify(this.#waypoints);
          console.log("waypoint array after deletion:",this.#waypoints_json);

        }
      }
      
    })

    e.srcElement.closest(".waypoint_item").remove()
    //remove all markers and shadows
    all_markers.forEach(marker =>  marker.remove())
    all_shadows.forEach(shadow => shadow.remove())
    // select all remaining waypoint items from dashboard
    let all_waypoints = document.querySelectorAll(".waypoint_item")
    let waypoints_array = []
    // Add each waypoint on dashboard to the array
    all_waypoints.forEach(waypoint => waypoints_array.unshift([waypoint.attributes.lat,waypoint.attributes.lon]))
    // re-render all markers on the map
    waypoints_array.forEach(waypoint => {
      L.marker([waypoint[0].value, waypoint[1].value] )
      .addTo(this.#map)

    })


    let all_lines = document.getElementsByTagName("path")
    console.log("-------");
    console.log("all lines:",all_lines);
    let arry = Array.from(all_lines);    
    arry.forEach(item => item.remove())
    this._drawPolygon()

  }

  _getCoordinates(e) {
    return new Promise(function (resolve) {
      const coords = [e.latlng.lat, e.latlng.lng];
      resolve(coords);
    });
  }
  
  _moveToClick(coords) {
    if (!this.#map) return;
    this.#map.panTo(coords, {
      animate: true,
      duration: .5, //1
      easeLinearity: 0.8,
    });
  }
  
  _send_Waypoint() {
    if (this.#data_sent) return

    if(this.#confirm_route_button){
      console.log("hello from add waypoint");
      console.log(this.#confirm_route_button);
      this.#confirm_route_button.addEventListener('click', e=>{
          e.preventDefault()
          console.log("hello from button");
          let auction_id = document.querySelector(".itinerary-page").id
          const waypoint_url = `/voyages/${auction_id}/createwaypoint/`
          const fd = new FormData()
          let csrf = document.getElementsByName('csrfmiddlewaretoken')
          fd.append('csrfmiddlewaretoken', csrf[0].value)
          fd.append("auction", auction_id)
          fd.append('trip', this.#waypoints_json)
          console.log(fd.get("csrfmiddlewaretoken"));
          console.log(fd.get("auction"));
          console.log(fd.get("trip"));
          this.#data_sent = true;

          const handleAlerts1 = (type, text) =>{
            alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
            this.#confirm_route_button.style.display = "None"

        }

          // AJAX FOR SENDING WAYPOINTS DATA

          $.ajax({
              type: 'POST',
              url: waypoint_url,
              enctype: 'multipart/form-data',
              data: fd,
              success: function(response){
                  const sText = `Itinerary successfully created for this trip.`
                  handleAlerts1('success', sText)
                  let auction_view_url = `/voyages/${auction_id}/`
                  let auction_view_button = `<a href="${auction_view_url}" class="btn btn-primary btn-block"
                  style="box-shadow: rgba(3, 7, 59, 0.15) 0px -2px 5px 0px inset,
                  rgba(3, 7, 59, 0.3) 0px -5px 9px 0px inset; 
                  /* rgba(3, 7, 59, 0.4) 0px -7px 11px 0px inset; */
                 border-radius: .9rem; font-weight: 700; border:none;" 
                 role="button" aria-pressed="true" id="auction-view-button" type="submit">Go To Trip</a>`

                  let form = document.querySelector("#trip-confirm-form")
                  console.log("form",form);
                  form.insertAdjacentHTML("afterbegin",auction_view_button)
                },
              error: function(error){
                  console.log(error)
                  handleAlerts('danger', 'You can bid only once for a trip')
              },
              cache: false,
              contentType: false,
              processData: false,
          })
      })
      }
  }

  

}


/// STARTING MAP ACCORING TO PAGE ////

if(document.querySelector(".main-page-container"))  {
    const app_main_page = new App_main_page();
    console.log("we are in the main page");
  }


if(document.querySelector(".auction-detail-page"))  {
    const app_main_page = new App_auction_detail_page();
    console.log("we are in the auction detail page");
}

if(document.querySelector(".mapid3"))  {
  const app_main_page = new App_auction_create_page();
  console.log("we are in the auction create page");
}


if(document.querySelector(".mapid_itinerary"))  {
  const app_main_page = new App_create_itinerary_page();
  console.log("we are in the itinerary create page");
}

if(!document.querySelector(".change-bid-button")) {  
  if(document.querySelector(".new-bid")){
    document.querySelector(".new-bid").classList.remove("hidden")
  }
} else {
  if(document.querySelector(".change-bid-button")){
    document.querySelector(".change-bid-button").classList.remove("hidden")

}}


////////////////////// AJAX FOR CREATE BID //////////////////////
////////////////////// AJAX FOR CREATE BID //////////////////////
////////////////////// AJAX FOR CREATE BID //////////////////////
////////////////////// AJAX FOR CREATE BID //////////////////////
////////////////////// AJAX FOR CREATE BID //////////////////////


const alertBox = document.querySelector('.alert-box')

const updateBidForm = document.getElementById('update-bid-form')
const newBidForm = document.getElementById('new-bid-form')
const updateBidPrice = document.querySelector('.update-bid-price')
const newBidPrice = document.querySelector('.new-bid-price')
const newIntroduction = document.querySelector("#id_introduction")
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const auction_page = document.querySelector(".auction-detail-page")

const formPriceField = document.getElementById("div_id_price")
const newBidModal = document.getElementById("new-bid-form")
const newBidButton = document.getElementById("new-bid-button")
const handleAlerts = (type, text) =>{
    alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
    formPriceField.style.display = "None"
}


if(newBidForm){
newBidForm.addEventListener('submit', e=>{
    e.preventDefault()
    const bid_create_url = "createbid/"
    const newBidForm = document.getElementById('new-bid-form')
    let currentUserID = auction_page.dataset.current_user_id
    let currentAuctionID = auction_page.dataset.auction_id
    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf[0].value)
    fd.append('price', newBidPrice.value)
    fd.append('introduction', newIntroduction.value)
    fd.append('auction', currentAuctionID)
    console.log("intro: ",newIntroduction.value);

    // AJAX FOR NEW BID
    $.ajax({
        type: 'POST',
        url: bid_create_url,
        enctype: 'multipart/form-data',
        data: fd,
        success: function(response){
            newBidButton.disabled = true;
            console.log("fd price:",fd.get("price"));
            console.log("fd auction:",fd.get("auction"));
            console.log("fd bidCreated:",fd.get("bidCreated"));
            console.log("fd intro:", fd.get("introduction"));
            const sText = `You placed a bid of $ ${fd.get("price")} for this trip`
            handleAlerts('success', sText)
        },
        error: function(error){
            console.log(error)
            handleAlerts('danger', 'You can bid only once for a trip')
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})
}

////////////////////// AJAX FOR UPDATE BID //////////////////////
////////////////////// AJAX FOR UPDATE BID //////////////////////
////////////////////// AJAX FOR UPDATE BID //////////////////////
////////////////////// AJAX FOR UPDATE BID //////////////////////
////////////////////// AJAX FOR UPDATE BID //////////////////////


if (updateBidForm){
  updateBidForm.addEventListener('submit', e=>{
    e.preventDefault()
    let currentUserID = auction_page.dataset.current_user_id
    let currentAuctionID = auction_page.dataset.auction_id
    let userbidID_element = document.getElementById("user-bid-id")
    let userbidID = userbidID_element.dataset.current_user_bid_id
    const bid_update_url = "updatebid/"
    const fd_update = new FormData()
    fd_update.append('csrfmiddlewaretoken', csrf[0].value)
    fd_update.append('price', updateBidPrice.value)
    fd_update.append('auction', currentAuctionID)
    fd_update.append('introduction', newIntroduction.value)
    $("[data-toggle=popover]").popover();  

    // AJAX FOR UPDATE BID
    $.ajax({
        type: 'POST',
        url: window.location.origin+"/voyages/"+userbidID+ "/updatebid/",
        enctype: 'multipart/form-data',
        data: fd_update,
        success: function(response){
            console.log("update function");
            console.log("fd price:",fd_update.get("price"));
            const sText = `You updated your bid at $ ${fd_update.get("price")} for this trip`
            handleAlerts('success', sText)
        },
        error: function(error){
            console.log(error)
            handleAlerts('danger', 'You can bid only once for a trip')
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})
}

if(window.location.pathname == "/voyages/myvoyages/"){
  console.log("WINDOW LOCATION:",window.location.pathname);
  
  let cardButtonsTopAll = document.querySelectorAll(".card-buttons-top")
  // let seeOnMapButtonsAll = document.querySelectorAll("#see-on-map-button")
  cardButtonsTopAll.forEach(card => {
    let editAuctionButton = `
    <a href="${ window.location.origin +"/voyages/update/"+card.dataset.id}" class="btn btn-info" role="button" 
                              aria-pressed="true">Edit</a>
    `
    let wholecard = card.closest(".card")
    let seeOnMapButton = wholecard.querySelector(".see-on-map-button");
    seeOnMapButton.insertAdjacentHTML("afterend",editAuctionButton)
  }) 
}


        //------------/// MESSAGING ///---------------------------//

const sendMessage = function (e) {
  let sender_id = e.target.id
  let inputArea = document.querySelector(`#sender-${sender_id}`)
  let inputValue = inputArea.value
  let csrfToken = document.getElementsByName("csrfmiddlewaretoken")
  const fd1 = new FormData()
  fd1.append('csrfmiddlewaretoken', csrf[0].value)
  fd1.append("received_by", sender_id)
  fd1.append("message_text", inputValue)
  console.log("------");
  console.log(fd1.get("csrfmiddlewaretoken"));
  console.log(fd1.get("received_by"));
  console.log(fd1.get("message_text"));

  const handleAlerts2 = (type, text) =>{
  let alertBox = document.querySelector(`#alert-box-${sender_id}`) 

  let inputbox = document.getElementsByName(`message_input_${sender_id}`)
  inputbox[0].value = "Message sent..."
  // alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;

  setTimeout(() => {
    inputbox[0].value = ""
    }, 2500);
  }
        // AJAX FOR SENDING message
  console.log(window.location.origin);
  let send_message_url = window.location.origin + "/messages/create_message/"

    $.ajax({
        type: 'POST',
        url: send_message_url,
        enctype: 'multipart/form-data',
        data: fd1,
        success: function(response){
            const sText = `Message sent.`
            handleAlerts2('success', sText)
          },
        error: function(error){
            console.log(error)
            handleAlerts2('danger', 'Message not sent')
        },
        cache: false,
        contentType: false,
        processData: false,
    })
}

let sendMessageButtons = document.querySelectorAll(".send-message-button")

sendMessageButtons.forEach(button => {
  button.addEventListener("click",sendMessage )
})