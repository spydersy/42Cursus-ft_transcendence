mkdir app && cd app
git clone -b back-end https://github.com/spydersy/42Cursus-ft_transcendence .
git clone -b front-end https://github.com/spydersy/42Cursus-ft_transcendence front-end
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
docker-compose up --build
