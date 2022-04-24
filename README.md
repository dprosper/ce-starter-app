# Hello World for IBM Cloud Code Engine

### Build and deploy to Code Engine after a Pull Request

Submit a pull request and the code will be deployed to Code Engine to facilitate the review.

### Manually deploy to Code Engine

1. Target your desired region.
  ```sh
    ibmcloud target -r us-east -g default
  ```

2. Create the Code Engine project.
  ```sh
    ibmcloud code-engine project create --name hw-ce
  ```

3. Create a configmap for the list of data centers (json file).
  ```sh
    ibmcloud code-engine configmap create \
    --name random.json \
    --from-file ./data/random.json 
  ```

4. Create the application from an existing container image, expose port 3001 and map the configmap to a volume. 
  ```sh
    ibmcloud code-engine app create -n hw-ce \
    --image <registry_host>/<registry_namespace>/hw-ce \
    --port 3001 \
    --mount-configmap /data=random.json
  ```

5. Optional - Update configmap 
  ```sh
    ibmcloud code-engine configmap update \
    --name random.json \
    --from-file ./data/random.json 
  ```

6. Optional - Update the application from an existing container image, expose port 3001 and map the configmap to a volume. 
  ```sh
    ibmcloud code-engine app update -n hw-ce \
    --image <registry_host>/<registry_namespace>/hw-ce \
    --port 3001 \
    --mount-configmap /data=random.json
  ```

### Build and run locally 

#### Build image
```sh
  docker build -t <registry_namespace>/hw-ce -f ./api/Dockerfile .
```

### Run local
```sh
  docker run --rm -v $(pwd)/data:/data -p 3001:3001 <registry_namespace>/hw-ce
```
