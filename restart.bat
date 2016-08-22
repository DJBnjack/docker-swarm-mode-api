docker kill my-api
docker rm my-api
docker build -t my-api .

timeout 10
docker run -d -p 3000:3000 --privileged -v /var/run/docker.sock:/var/run/docker.sock --name my-api my-api