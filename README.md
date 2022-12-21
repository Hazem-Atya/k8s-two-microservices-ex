# Deploying a Two microservices example in azure k8s

## ECS architecture:
![image](https://user-images.githubusercontent.com/53778545/208890030-93ffa491-d36e-4cfc-9f49-9a36ebad10d0.png)

<br>

## Kubernetes cluster architecture

<br>


<img   src="https://user-images.githubusercontent.com/53778545/208890106-42c3c317-2f73-41c7-a2c5-2dc77e8d013d.png" style="width=50px">

<br>
All communication with the cluster goes only through the API server (Restful API).
To facilitate the communication, instead of writing HTTP requests to communicate with the API server, we will use the kubectl CLI.
Kuberctl is build upon the SDK of golang, under the hood the SDK uses HTTP requests to communicate with the cluster.
<br>

![image](https://user-images.githubusercontent.com/53778545/208890173-2c5badf2-7474-4003-aada-0e71773c72e4.png)
To authenticate to the cluster, we must first download a certification from the cluster, and use it for authentication in the command line.
In azure, we can use the Azure CLI to login (and automatically download the certification).
The kubectl looks for the certify in a specific location ( /home/hazem/.kube/config ) 
Kubectl CLI syntax: <br>
`kubectl verb recource-type  [ the resource ]`       
•	The resource type can be: deployment (deploy), replica set (rs) , POD (pod) 
•	The verb can be: get, describe, replace, delete, create
`az login` to to login to azure <br>
`az aks list`   list Kubernetes clusters <br>
`az aks list | jq .  ` (jq is just a json parser) <br> 
