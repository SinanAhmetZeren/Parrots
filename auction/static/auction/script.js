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
    console.log("hello from slider goToSlide");

    if(!single_vehicle_page){
        if (!my_vehicles_page){
        
          slides.forEach(
          (s, i) => {
            console.log("hello from for each 40");
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




/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////// MAIN PAGE APP /////////////////////////////////
/////////////////////////// MAPID /////////////////////////////////


class App_main_page {
  #map;
  #mapZoomLevel = 8;
  #seeOnMapButtons = document.querySelectorAll('.see-on-map-button');
  // #toggleExpiredButton = document.querySelector("#toggle-expired-button")
  // #toggleExpired = false

  constructor() {
    this._getPosition();
    this.#seeOnMapButtons.forEach(button => button.addEventListener('click', this._moveToAuction.bind(this)));
    // this.#toggleExpiredButton.addEventListener("click", this._toggleExpiredAuctions.bind(this));  
  }

  // _toggleExpiredAuctions(){}

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
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
    // console.log("hello from loadmap");

    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map("mapid", {worldCopyJump:true}).setView(coords, 8);
    // console.log("mapzoom level");
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
    let info = button.dataset.trip_details.slice(0,60) + "..."
    L.marker(coords)
    .addTo(this.#map)
    .bindPopup(
        L.popup({
        maxWidth: 130,
        minWidth: 130,
        autoClose: false,
        closeOnClick: false,
        className: `${button.dataset.id}-auctionID`,
        })) 
    .setPopupContent(
        // ` <a href="${window.location.origin}/auctions/${button.dataset.id}" style="color:white">${info}</a>`
          `<a href="javascript:void(0);" onclick="goToSlide(${+button.dataset.slide_number-1})" style="color:white">&#128270; ${info}</a>`
    )
    .openPopup(); 
    

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
  
// $(function () {
//   $('[data-toggle="popover"]').popover()
//   console.log("enable popovers");
// })

// $(document).ajaxComplete(function() {
//   $('[data-toggle="popover"]').popover();
// });

// $(document).ajaxSuccess(function () {
//   $("[data-toggle=popover]").popover();

// });
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
    console.log("createformbutton:",this.#createFormButton.textContent);
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
          const waypoint_url = `/auctions/${auction_id}/createwaypoint/`
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
                  let auction_view_url = `/auctions/${auction_id}/`
                  let auction_view_button = `<a href="${auction_view_url}" class="btn btn-primary btn-block" role="button" aria-pressed="true" id="auction-view-button" type="submit">Go To Trip</a>`
                  // <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>

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
        url: window.location.origin+"/auctions/"+userbidID+ "/updatebid/",
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

if(window.location.pathname == "/auctions/myauctions/"){
  console.log("WINDOW LOCATION:",window.location.pathname);
  
  let cardButtonsTopAll = document.querySelectorAll(".card-buttons-top")
  // let seeOnMapButtonsAll = document.querySelectorAll("#see-on-map-button")
  cardButtonsTopAll.forEach(card => {
    let editAuctionButton = `
    <a href="${ window.location.origin +"/auctions/update/"+card.dataset.id}" class="btn btn-info" role="button" 
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
console.log(sendMessageButtons)

sendMessageButtons.forEach(button => {
  button.addEventListener("click",sendMessage )
})