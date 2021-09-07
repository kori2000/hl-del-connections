build:
	docker-compose build
up:
	docker-compose up -d
	sleep 3
	docker logs hl-delcon
down:
	docker-compose down