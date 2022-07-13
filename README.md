# Automate Workout Registration and Payment System
## Powerful Technology
- Vue 3
- Vuex
- Vite
- Vueuse

---
## Install dependencies
```
./update.sh
```

## Run project
```
./ui.sh
```

## Show result
```
http://localhost:3001/
```

## Stop project
```
Ctrl + C
```

## Change node version
```
sudo npm i -g n
```

## Install necessary packages another projects
```
sudo n stable
```

```
sudo n v12.22.9
```

```
sudo n latest
```

---
### RUN APP IN DOCKER CONTAINER ###
---
### Build docker image for app
```
docker build -t workout-frontend .
```
### Run the app
```
docker run -d --name workout-ui -p 80:80 --restart always workout-frontend
```