# Deploying a Two microservices example in azure k8s

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
       <a href="#introduction">Introduction </a>
      <ul>
          <li> <a href="#ecs-architecture">AWS ECS architecture </a> </li>
     <li> <a href="#creating-and-testing-a-pod">Creating and testing a pod  </a> </li>
      </ul>
      </li>
  <li>
           <a href="#manipulating-a-k8s-cluster-in-azure">Manipulating a K8s cluster in Azure </a>
    <ul>
      <li>  
                 <a href="#connection-to-the-azure-cluster">Connection to the azure cluster</a>
      </li>
       <li>  
                 <a href="#creating-and-testing-a-pod"> Creating and testing a pod</a>
      </li>
       <li>  
                 <a href="#creating-a-deployment"> Creating a deployment</a>
      </li>
       <li>  
                 <a href="#creating-a-service"> Creating a service</a>
      </li>
    </ul>
    </li>
  </ul>
 </details>

# Introduction
Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.
## ECS architecture:
<img   src="https://user-images.githubusercontent.com/53778545/208890030-93ffa491-d36e-4cfc-9f49-9a36ebad10d0.png" style="width:700px">

<br>

## Kubernetes cluster architecture  

<br>


<img   src="https://user-images.githubusercontent.com/53778545/208890106-42c3c317-2f73-41c7-a2c5-2dc77e8d013d.png" style="width:700px">

<br>

# Manipulating a K8s cluster in Azure

## Connection to the azure cluster

All communication with the cluster goes only through the API server (Restful API).
To facilitate the communication, instead of writing HTTP requests to communicate with the API server, we will use the kubectl CLI.
Kuberctl is build upon the SDK of golang, under the hood the SDK uses HTTP requests to communicate with the cluster.
<br>
<br>
<img   src="https://user-images.githubusercontent.com/53778545/208890173-2c5badf2-7474-4003-aada-0e71773c72e4.png" style="width:300px">
<br>
To authenticate to the cluster, we must first download a certification from the cluster, and use it for authentication in the command line. <br>
In azure, we can use the Azure CLI to login (and automatically download the certification). <br>
The kubectl looks for the certify in a specific location ( /home/hazem/.kube/config ) <br> 
Kubectl CLI syntax: <br>
`kubectl verb recource-type  [ the resource ]`       <br>
•	The resource type can be: deployment (deploy), replica set (rs) , POD (pod) <br>
•	The verb can be: get, describe, replace, delete, create <br>

`az login` to to login to azure <br>
`az aks list`   list Kubernetes clusters <br>
`az aks list | jq .  ` (jq is just a json parser) <br> 
Login to the cluster (look at the connect section in the cluster in azure portal) :
* Set the subscription  <br>
 <img   src="https://user-images.githubusercontent.com/53778545/208927306-c8a5ac47-83b5-4ef5-8786-6493d02eb036.png" style="width:600px">

=>  The certificate is downloaded under /home/hazem/.kube/config  (config is the name of the file) <br>
* `kubectl cluster-info ` : Verify that our cluster is running <br>
> **Note**:  List all k8s resource <br>
> * `kubectl api-resources`: List all resources (prints full name and short name)   
> <img   src="https://user-images.githubusercontent.com/53778545/208939804-668a23a9-8fc3-41c4-8fca-ffcb9750fe35.png" style="width:600px"> <br> <br>


## Creating and testing a pod:
The minimal configuration of a pod is the name and the container image <br>
* `kubectl run first-pod --image=nginx` <br>
* `kubectl get pod`: Verify that the pod is created: <br>
 <img   src="https://user-images.githubusercontent.com/53778545/208928376-f0d96232-78da-4f5a-ad36-bccd53bda620.png" style="width:600px"> <br>
 
* `kubectl describe pod first-pod `: output the details of the pod <br>

* `kubectl port-forward pods/first-pod 8080:80`: Forward a local port to a pord of the POD to test nginx (80 is the port exposed by the pod, 8080 is my local port) <br>
  <img   src="https://user-images.githubusercontent.com/53778545/208928617-ac525764-5920-42a8-9f83-18966f7633a0.png" style="width:350px">

<br>

## Creating a deployment

* `kubectl create deployment test-deploy --image=nginx --replicas=3`:	Creating a deployment with 3 replicas   <br>
* `kubectl get deployment `: get all deployments <br> <br>
  <img   src="https://user-images.githubusercontent.com/53778545/208933991-d0825046-02d4-4042-9fd5-d8dcf501b4a9.png" style="width:600px"> <br> <br>
  Up-to-date: By default, Kubernetes uses the rolling update deployment strategy, up-to-date indicates the number of pods that have the latest version.
  Age: Time from deployment creation
* List the replica sets  <br> <br>
    <img   src="https://user-images.githubusercontent.com/53778545/208934925-73b9f7fc-0c62-4a14-8a79-e0426179e720.png" style="width:600px"> <br> <br>
* Describe the replica set: (we want to see that it belongs to the deployment we created) <br> <br>
    <img   src="https://user-images.githubusercontent.com/53778545/208935144-8734d6bf-8d33-40d2-a023-956a9804c76d.png" style="width:750px"> <br>…………. Output omitted……….. <br>
        <img   src="https://user-images.githubusercontent.com/53778545/208935553-63b5f420-d9f8-4838-9281-e827e3eae10e.png" style="width:750px"> <br> <br>

* Verify that we have 4 pods (the pod created in the beginning and the 3 created by the replica set)
    <img   src="https://user-images.githubusercontent.com/53778545/208935866-4b4ea28e-2938-4168-a775-4eee79fd58e8.png" style="width:600px"> <br> <br>
* <b>Verifying that the replica-set always keeps 3 pods: <b>
  * `watch kubectl get replicaset`:  <br>
      <img   src="https://user-images.githubusercontent.com/53778545/208936557-2aeaeecd-5dd8-4b52-9fb0-5fb8fbe8afe1.png" style="width:600px"> <br> <br>
  *  `kubectl delete pod test-deploy-8649d8db8b-g9lgh`: delete one of the pods
      <img   src="https://user-images.githubusercontent.com/53778545/208936815-4b40c37b-da66-4419-92ff-cde20b958004.png" style="width:600px"> <br> <br>
(ready and current become 2, then they will go back to 3 => a new pod is created)

## Creating a service
  <br>
 
<img   src="https://user-images.githubusercontent.com/53778545/208937648-d67d32be-dd57-4616-a82a-e36195865436.png" style="width:600px"> <br> <br>

  * See available services before creating our service:
  
<img   src="https://user-images.githubusercontent.com/53778545/208938557-67abe692-42a4-4b62-921d-429d4bb296c0.png" style="width:600px"> <br> <br>
 * `kubectl expose deployment test-deploy --port 80 --target-port 80`: Exposing a service <br> <br>
  ![image](https://user-images.githubusercontent.com/53778545/208938967-9268bf98-d482-4342-914e-546e1b74fb5c.png)
  <br> The port exposed by the service is 80, the target port is the target of the service
 *  List our services after creating our new service: <br>
<img   src="https://user-images.githubusercontent.com/53778545/208940863-e4a81277-9aa7-4ec7-80d6-ea1b9ca57067.png" style="width:600px"> <br> <br>

 












