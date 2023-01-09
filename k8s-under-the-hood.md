
* K8s architecture
* Liveness probe and readiness probe
* configmaps
* secrets
* persistent volume

* init containers
* RBAC
* Network policites
* System capabilities

# K8s architecture
![image](https://user-images.githubusercontent.com/53778545/209653279-6a4c8d0f-577b-4086-aac4-ee9d4abef9a3.png)


## Worker node component
### The kubelet is:
 - An agent: The process that registers in the master node and get its jobs
 - a server: receives jobs from the master node and executes them in the container runtime.

The kubelet reports performance, utilization,.. of the node. It's the interface that communicates with the master.

### The kube-proxy:
kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept. <br>kube-proxy maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.

## Master node components

### Scheduler
Schedules the jobs (communicates with the kubelet)

### Control manager:
Communicates with the kubelet, in case of problem detection (for example a pod crashed), it communicates with the scheduler the resolve the problem (create a new pod fro example).

### etcd
key value store (rapid+consistent): The source of truth of the cluster. (contains all information of the cluster). <br>
When we lauch a query (for e.g. `kubectl get deployments`) the api server will get the information from the ``etcd``. <br>
Every information is sent to the `etcd` (reports, unhealthy pods,..)

### cloud control manager
loadbalancers, monitoring/logs, volumes (when we create volumes inside the cluster, the volumes will be created in the cloud provider, this is possible thanks to the cloud control manager ),..

# Liveness probe and readiness probe

The kubelet uses liveness probes to know when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. Restarting a container in such a state can help to make the application more available despite bugs.

The kubelet uses readiness probes to know when a container is ready to start accepting traffic. A Pod is considered ready when all of its containers are ready.

# Config maps
A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.
* <b>Creating a config map</b>
```bash
kubectl create configmap my-config --from-literal=age=23 --from-literal=name=hazem -oyaml --dry-run=client > infrastracture/ms-a/my-config.yaml
```
* <b>Inject config map values as env variables in container</b>:<br>
Under the container spec (in deployment.yaml):
```yaml
    env:
      - name: hazemAge # the name of the env var in the containers
        # from the key name in the ConfigMap.
        valueFrom:
          configMapKeyRef:
            name: my-config # The ConfigMap this value comes from.
            key: age # The key to fetch.

```
After executing `kubectl apply`, you can verify that the env variables were injected by opening a bash inside the pod's container and `echo $hazemAge` <br>
* <b>Mounting as config map in a volume</b>
* Creating a volume countaining files such as:
* Mounting the volume to the container (see infrastructure/ms-a/01-deployment.yaml).
* In the example in 01-deployment.yaml, we can see our value by seeing the content of `/configuration/test`.
We mount a whole configmap (instead of mounting a single variable) in the volume, the file names will be the keys and the content will be the values.
(see k8s documentation for more details).
# Secrets
* Create a secret
``` 
kubectl create secret generic empty-secret --from-literal=key1=secret1 -o yaml --dry-run=client > infrastracture/ms-a/secrets.yaml
```
The secrets created are base64 encoded.
Secrets can be used in the same way as configmaps.

# Persistent volumes
`kubectl get storageclasses`: get all storage classes (we will use the managed storageclass in our pvc)
* Create the manifest of a  persistent volume claim => applying the changements. 
* ` kubectl get pvc`: get <b>p</b>ersistent <b>v</b>olume <b>c</b>laims
* Attach our volume to our containers (in deployment.yaml)
<b>Verify that the volume is shared </b>
`kubectl exec ms-a-674c5f5896-kn5nn -it -- /bin/sh`: Create a file inside the new volume in one of the pods then verify that it's accessible in the others.

#### <b>NOTE</b>
If we delete the pods or the deployment, the volume and data won't be delete. They will be deleted only if we delete the volume claim.  

# Init containers 
A Pod can have multiple containers running apps within it, but it can also have one or more init containers, which are run before the app containers are started.

Init containers are exactly like regular containers, except:
* Init containers always run to completion.
* Each init container must complete successfully before the next one starts.








