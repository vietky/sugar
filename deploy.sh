export DOCKER_TOKEN=ya29.ImavByF3oJ2s_WezJQcNzIPuOA07ItmhW8qLDxZMdvr15OPtjaQkp2sqKnSvNqZBM4vXQKG-Znudoq9kK-pmDuCmz0msmydB4VyBMZqbLieRdlkZQe4JjadHYN9xJJcD6s2d3ZLHjx0
echo $DOCKER_TOKEN | docker login -u oauth2accesstoken --password-stdin http://asia.gcr.io

#  docker run -d --name sugar-test -p 8080:8080 -e PORT=8080 asia.gcr.io/sugar-258010/sugar
 docker run -d --name sugar-test -p 80:80 -e PORT=80 --network=host asia.gcr.io/sugar-258010/sugar

mkdir pg_data
docker run -d --name sugar-postgres -v `pwd`/pg_data:/var/lib/postgresql/data/ -p 5432:5432 --network=sugar postgres:9.6.15-alpine

docker rm -f sugar-test && docker rmi asia.gcr.io/sugar-258010/sugar:latest && docker pull asia.gcr.io/sugar-258010/sugar:latest && docker run -d --name sugar-test -p 80:80 -e HOST=172.18.0.3 -e PORT=80 -e GCLOUD_STORAGE_BUCKET=sugar-hackathon --network=sugar asia.gcr.io/sugar-258010/sugar:latest

