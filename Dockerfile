FROM europe-west4-docker.pkg.dev/ssx-cloud-network-gke/ssx-image-repository/api-doc-gen:latest

WORKDIR /app

COPY swagger.yaml swagger.yaml
COPY menu.yaml menu.yaml
COPY logo.svg web/assets/logo.svg

EXPOSE 3000

CMD ["npm", "start"]