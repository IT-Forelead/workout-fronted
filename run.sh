#!/bin/bash
# Run the app development server
echo '--------------------------------------------------------------------'
echo 'Stoppping & Removing Frontend container...'
echo '--------------------------------------------------------------------'
docker container stop workout-ui
docker container rm workout-ui
echo '--------------------------------------------------------------------'
echo 'Removing Frontend image...'
echo '--------------------------------------------------------------------'
docker rmi workout-frontend:latest
echo '===================================================================='
echo 'Building Frontend image...'
echo '--------------------------------------------------------------------'
docker build -t workout-frontend .
echo '--------------------------------------------------------------------'
# echo 'Running Frontend image container...'
# echo '--------------------------------------------------------------------'
# docker run -d --name workout-ui -p 80:80 --restart always workout-frontend
# echo '--------------------------------------------------------------------'
# echo 'All Done!'