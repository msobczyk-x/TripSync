import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";
import * as TaskManager from "expo-task-manager";
import { LocationObject } from "expo-location";
import {polyfillWebCrypto} from 'expo-standard-web-crypto';

import { v4 } from "uuid";
type Callback = (coords: LatLng) => void;
const BACKGROUND_TASK_NAME = "background";

polyfillWebCrypto();
const executor: (body: TaskManager.TaskManagerTaskBody<object>) => void = (
  body
) => {
  const data = body.data as unknown as { locations: LocationObject[] };
  const l = data?.locations[0];
  if (!l) return;

  for (const callback of Object.values(locationCallbacks)) {
    callback({
      latitude: l.coords.latitude,
      longitude: l.coords.longitude,
    });
  }
};

TaskManager.defineTask(BACKGROUND_TASK_NAME, executor);

const locationCallbacks: { [key: string]: Callback } = {};
const hasStartedBackgroundTaskRef = {
  hasStarted: false,
};

function startBackgroundTaskIfNecessary() {
  if (hasStartedBackgroundTaskRef.hasStarted) return;
  Location.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
  }).catch((e) => {
    hasStartedBackgroundTaskRef.hasStarted = false;
  });
  hasStartedBackgroundTaskRef.hasStarted = true;
}

function addLocationCallback(callback: Callback) {
  const id = v4() as string;
  locationCallbacks[id] = callback;
  return {
    remove: () => {
      delete locationCallbacks[id];
    },
  };
}

export default function useLocationChangeListener(
  callback: Callback | null,
  active: boolean = true
) {
  const callbackRef = useRef<null | Callback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;
    if (!callback) return;
    Location.getLastKnownPositionAsync().then((l) => {
      if (l)
        callback({
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
        });
    });
    startBackgroundTaskIfNecessary();
    const watch = Location.watchPositionAsync({}, (location) => {
      callback({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    });
    const subscription = addLocationCallback(callback);
    return () => {
      subscription.remove();
      watch.then((e) => {
        e.remove();
      });
    };
  }, [callback, active]);

  useEffect(() => {
    if (__DEV__) {
      addLocationCallback((coords) => {
        console.log("Location changed to ");
        console.log(coords);
      });
    }
  }, []);
}