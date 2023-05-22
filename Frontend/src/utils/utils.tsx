

import axios from "axios";

export const sortByLastName = (arr: any[]) => {
    return arr.sort((a, b) => {
      if (a.last_name < b.last_name) {
        return -1;
      }
      if (a.last_name > b.last_name) {
        return 1;
      }
      return 0;
    });
  };

  export function getTimeElapsed(dateString: any) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    if (diff < minute) {
      return "just now";
    } else if (diff < 2 * minute) {
      return "1 minute ago";
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)} minutes ago`;
    } else if (diff < 2 * hour) {
      return "1 hour ago";
    } else if (diff < day) {
      return `${Math.floor(diff / hour)} hours ago`;
    } else {
      return `${Math.floor(diff / day)} days ago`;
    }
}




 export const getLocationGeocoordinates = async (location: string, api_key: any, markerColor: any, markerTitle: any) => {
      
      try {
         const data = await axios.get(
              `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${api_key}`
          ).then((response) => {
              return {
                  latitude: response.data[0].lat,
                  longitude: response.data[0].lon,
                  title: location + " - " + markerTitle ,
                  color: markerColor,
              }});
              console.log(data);
              return data;
      }
       catch (error) {
          console.log(error);
       }
      
       
      }

      export const convertDate = (date: string) => {
        const d = new Date(date);
        const options: any = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        return d.toLocaleString("en-GB", options);
      };
    
  

  