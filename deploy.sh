#!/bin/bash
# Run the app development server
echo '--------------------------------------------------------------------'
echo 'Stoppping & Removing Frontend container...'
echo '--------------------------------------------------------------------'
docker container stop app_frontend_1
docker container rm app_frontend_1
echo '--------------------------------------------------------------------'
echo 'Removing Frontend image...'
echo '--------------------------------------------------------------------'
docker rmi -f workout-frontend:latest
echo '===================================================================='
echo 'Building Frontend image...'
echo '--------------------------------------------------------------------'
docker build -t workout-frontend .
echo '--------------------------------------------------------------------'
echo 'Saving frontend image.............'
docker save workout-frontend:latest > workout_frontend.tar.gz
echo 'Uploading images to .............'
scp workout_frontend.tar.gz timeweb2:./