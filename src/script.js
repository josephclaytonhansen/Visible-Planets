var all_planets = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Moon"]

var r = document.querySelector(':root');

function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function planetSummary(planet, sender) {
    var ele = document.querySelectorAll('.planet-card');
    console.log(ele);

    Array.from(ele).forEach((e) => {
        console.log(e);
        e.id = "noid";
        console.log(e);
    })

    sender.id = "active";
    fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' + planet + '&format=json')
        .then((response) => {
            return response.json();
        }).then((data) => {
            let text = data['query']['pages'];
            var t = "";
            for (page in text) {
                t = strip(text[page]["extract"]).split(/\r?\n{2,}/)[1];
                var working = t.split(". ");
                var final = "";
                var i = 0;
                for (sentence in working) {
                    i = i + 1;
                    final = final + working[sentence] + ". ";
                    if (i % 3 === 0) {
                        i = 0;
                        final = final + "\n\n";
                    }
                }
            }
            console.log(final);
            var con_toggle = document.getElementById("container").className;
            if (con_toggle == "planet-container") {
                document.getElementById("top").className = "top top-closed"
                document.getElementById("footer").className = "footer invisible"
                document.getElementById("container").className = "planet-container collapse"
                document.getElementById("details").className = "details-container expand"
                document.getElementById("details-text").innerText = final;
                document.getElementById("close").className = "close show"
            } else if (con_toggle == "planet-container collapse") {
                document.getElementById("details-text").innerText = final;
            }
            console.log(con_toggle);
        })
}

function footerText() {
    final = "<span style = 'line-height:1.3rem;'><h2>Visible Planets</h2><h5 style = 'margin-top:10px'>by Joseph Hansen</h5><br/><p style = 'margin-top:-50px'>This was a quick and simple project to improve my knowledge of working with APIs in Javascript. This is by no means optimized, but I learned a lot from it and I enjoyed making it. <br/><br/>A green light indicates that you could see this planet, atmospherical conditions and sunlight/moonlight permitting. Try some different locations around the world to see how the sky differs; it's pretty interesting.</br></br>Note that this is fully reponsive, written in pure CSS/HTML/JS, and uses CSS variables. Those variables create a TON of extra functionality I didn't bother to do anything with: try modifying --zoom-factor, for example. <br/><br/>The APIs in use are:</p><ul><li>Visible Planets : https://visible-planets-api.herokuapp.com/</li><li>Open Cage Data : https://opencagedata.com/</li><li>WikiMedia API : https://en.wikipedia.org/w/api.php?</li></ul><p>Feel free to reach out to me at <a href = 'mailto:josephclaytonhansen@gmail.com'>josephclaytonhansen@gmail.com</a> for any reason whatsoever!</p></span>"
    var con_toggle = document.getElementById("container").className;
    if (con_toggle == "planet-container") {
        document.getElementById("top").className = "top top-closed"
        document.getElementById("footer").className = "footer invisible"
        document.getElementById("container").className = "planet-container collapse"
        document.getElementById("details").className = "details-container expand"
        document.getElementById("details-text").innerHTML = final;
        document.getElementById("close").className = "close show"
    } else if (con_toggle == "planet-container collapse") {
        document.getElementById("details-text").innerHTML = final;
    }
    console.log(con_toggle);
}

function doClose() {
    document.getElementById("container").className = "planet-container"
    document.getElementById("footer").className = "footer"
    document.getElementById("top").className = "top"
    document.getElementById("details").className = "details-container"
    document.getElementById("details-text").innerHTML = "";
    document.getElementById("close").className = "close invisible";
    var ele = document.querySelectorAll('.planet-card');
    console.log(ele);


    Array.from(ele).forEach((e) => {
        console.log(e);
        e.id = "noid";
        console.log(e);
    })
}

function changeLoc() {

    console.log(document.getElementById("place").value);
    working = encodeURIComponent(document.getElementById("place").value);

    console.log(working);
    loc(working);
    return false;
}

function loc(loc) {
    var l = "";
    var lat = "";
    var long = "";

    fetch("https://api.opencagedata.com/geocode/v1/json?q=" + loc + "&key=fe75b7368cb04c18a13eb33855a13deb")
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            l = data["results"]["0"]["geometry"]
            lat = l["lat"];
            long = l["lng"];
            console.log(lat + " " + long);
            coordsToPlanets(lat, long);

        })

}

function coordsToPlanets(lat, long) {
    fetch('https://visible-planets-api.herokuapp.com/v2?latitude=' + lat + '&longitude=' + long)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var visible_planets = [];
            for (planet in data['data']) {
                visible_planets.push(data['data'][planet]['name']);
                console.log(visible_planets);
            }
            if (visible_planets.includes("Mercury")) {
                document.getElementById("mercury").className = "planet mercury on";
                document.getElementById("mercury_indic").className = "indic";
            } else {
                document.getElementById("mercury").className = "planet mercury off";
                document.getElementById("mercury_indic").className = "indic off";
            }
            if (visible_planets.includes("Venus")) {
                document.getElementById("venus").className = "planet venus on";
                document.getElementById("venus_indic").className = "indic";
            } else {
                document.getElementById("venus").className = "planet venus off";
                document.getElementById("venus_indic").className = "indic off";
            }
            if (visible_planets.includes("Moon")) {
                document.getElementById("moon").className = "planet moon on";
                document.getElementById("moon_indic").className = "indic";
            } else {
                document.getElementById("moon").className = "planet moon off";
                document.getElementById("moon_indic").className = "indic off";
            }
            if (visible_planets.includes("Mars")) {
                document.getElementById("mars").className = "planet mars on";
                document.getElementById("mars_indic").className = "indic";
            } else {
                document.getElementById("mars").className = "planet mars off";
                document.getElementById("mars_indic").className = "indic off";
            }
            if (visible_planets.includes("Jupiter")) {
                document.getElementById("jupiter").className = "planet jupiter on";
                document.getElementById("jo").className = "jupiter-over";
                document.getElementById("jupiter_indic").className = "indic";
            } else {
                document.getElementById("jupiter").className = "planet jupiter off";
                document.getElementById("jupiter_indic").className = "indic off";
                document.getElementById("jo").className = "jupiter-over invisible";
            }
            if (visible_planets.includes("Saturn")) {
                document.getElementById("saturn").className = "planet saturn on";
                document.getElementById("rl").className = "rings-l on";
                document.getElementById("rol").className = "rings-over-l on";
                document.getElementById("ror").className = "rings-over-r on";
                document.getElementById("rr").className = "rings-l on";
                document.getElementById("saturn_indic").className = "indic";
            } else {
                document.getElementById("saturn").className = "planet saturn off";
                document.getElementById("saturn_indic").className = "indic off";
                document.getElementById("rl").className = "rings-l off";
                document.getElementById("rol").className = "rings-over-l off";
                document.getElementById("ror").className = "rings-over-r off";
                document.getElementById("rr").className = "rings-l off";
            }
            if (visible_planets.includes("Uranus")) {
                document.getElementById("uranus").className = "planet uranus on";
                document.getElementById("uranus_indic").className = "indic";
            } else {
                document.getElementById("uranus").className = "planet uranus off";
                document.getElementById("uranus_indic").className = "indic off";
            }
            if (visible_planets.includes("Neptune")) {
                document.getElementById("neptune").className = "planet neptune on";
                document.getElementById("neptune_indic").className = "indic";
            } else {
                document.getElementById("neptune").className = "planet neptune off";
                document.getElementById("neptune_indic").className = "indic off";
            }
        });
}

loc("rexburg idaho")
