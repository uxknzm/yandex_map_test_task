import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import m from "../../img/basketball-svgrepo-com.svg";

import "./map.css";

const MapContainer = () => {
  const ymaps = useYMaps(["Map"]);
  const [count, setCount] = useState(0);
  const iconContentTemplate = ymaps?.templateLayoutFactory.createClass(
    `<div id="placemark" class="placemark">
        <p id="count" class="count">${count}</p>
        <img src=${m} height="40px" width="40px" />
        </div>`,
    {
      build: function () {
        iconContentTemplate.superclass.build.call(this);
        this.getData().geoObject.events.add("click", () => {
          const markerDomNode = document.getElementById("placemark");
          markerDomNode.classList.add("placemark-visited");
          setTimeout(() => {
            markerDomNode.classList.remove("placemark-visited");
            setCount(count + 1);
          }, 1000);
        });
      },
    }
  );

  const mapState = { center: [55.921612, 37.534918], zoom: 10 };
  return (
    <Map
      defaultState={mapState}
      width="100%"
      height="100vh"
      modules={["templateLayoutFactory", "layout.ImageWithContent"]}
    >
      <Placemark
        geometry={[55.661574, 37.573856]}
        options={{
          iconLayout: "default#imageWithContent",
          // не нашел способа скрыть дефолтную метку)
          iconImageHref:
            "https://s6.hostingkartinok.com/uploads/images/2013/11/c1298a511919792334c6a247e2b573c1.png",
          iconImageSize: [48, 48],
          iconImageOffset: [-24, -24],
          // наша кастомная метка
          iconContentLayout: iconContentTemplate,
        }}
      />
    </Map>
  );
};

export default MapContainer;
