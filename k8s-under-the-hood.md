
* K8s architecture
* configmaps
* secrets
* persistent volume
* Liveness Probe (LP) and Readiness Probe (RB)
* RBAC
* init containers
* System capabilities
* Network policites


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



















