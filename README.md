# TripSync

TripSync is a mobile application that is being done as part of a bachelor's project. It is application that helps teacher's during school trips. Application tracks location of students during trip and gives all of these important information's to teacher. Frontend of TripSync is built using React Native and integrates with various APIs, including the OpenWeather API and the Google Maps API. Backend is built using ExpressJS, MongoDB.

## Screens
![Home Screen](https://github.com/msobczyk-x/TripSync/assets/75531536/6b119f3e-f00d-40dd-9e22-d1ea87229714)
![Trip Screen](https://github.com/msobczyk-x/TripSync/assets/75531536/5620c852-f6a7-43de-8636-4ec2fdd7b53f)
![Map Screen](https://github.com/msobczyk-x/TripSync/assets/75531536/0823a772-6d43-4b54-9429-b27264d8b80f)


## Jak uruchomić aplikację?

### Backend

Baza danych jest poprawnie skonfigurowana do testowania (korzystam z bazy danych MongoDB Atlas w chmurze), więc nie ma potrzeby konfigurowania jej lokalnie. Wystarczy uruchomić serwer.

```bash
cd backend
npm install
npm start
```

Do dodawania dokumentów do bazy danych możemy użyć panelu AdminJS dostępnego pod adresem `http://localhost:3000/admin`. Będzie dostępny po uruchomieniu serwera.

### Frontend

Aplikacja mobilna została stworzona przy użyciu React Native z pomocą platformy deweloperskiej Expo. Aby uruchomić aplikację na emulatorze należy zainstalować Android Studio i skonfigurować emulator (bądź zainstalować aplikację Xcode wraz z Xcode-sdk na platformie MacOS). Następnie należy uruchomić następujące komendy:

[Link do pobrania Android Studio SDK](https://developer.android.com/studio)

Można także uruchomić aplikację na telefonie z systemem Android lub iOS. W tym celu należy zainstalować aplikację Expo na telefonie i zeskanować kod QR, który pojawi się po uruchomieniu komendy `npm run android` (bądź `npm run ios`). W tym przypadku telefon musi być podłączony do tej samej sieci WiFi co komputer. Oraz trzeba zmodyfikować plik .env w folderze frontend i zmienić wartość zmiennej `LOCALHOST` na adres IP komputera, na którym uruchomiony jest serwer.

```bash
cd frontend
npm install
npm run android (npm run ios)

```

#### Przykładowe dane do logowania
- Student: email: "student@wp.pl", kod weryfikacyjny: "337292"
- Nauczyciel: email: "nauczyciel@wp.pl", kod weryfikacyjny: "620718"

Inne dane do logowania można znaleźć w panelu AdminJS.


### Możliwe problemy podczas uruchamiania aplikacji

Uruchamiając aplikację na emulatorze Android Studio może pojawić się błąd `Error running adb: No Android device found. Please connect a device and follow the instructions here to enable USB debugging: https://developer.android.com/studio/run/device.html#developer-device-options. If you are using Genymotion go to Settings -> ADB, select "Use custom Android SDK tools", and point it at your Android SDK directory.`. W takim przypadku należy uruchomić Android Studio, przejść do zakładki `Tools` -> `AVD Manager` i uruchomić emulator. Następnie należy uruchomić komendę `adb reverse tcp:3000 tcp:3000` w terminalu.

Ostrzeżenia pojawiające się w środowisku deweloperskim dotyczące potencjalnych nieobsłużonych promes można zignorować. Są one spowodowane tym, że niektóre funkcje z biblioteki Expo nie są obsługiwane przez środowisko deweloperskie. Nie powodują one błędów w działaniu aplikacji.
