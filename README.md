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
* `kubectl get deployment `: get all deployments
![image](https://user-images.githubusercontent.com/53778545/208933991-d0825046-02d4-4042-9fd5-d8dcf501b4a9.png) <br>
  Up-to-date: By default, Kubernetes uses the rolling update deployment strategy, up-to-date indicates the number of pods that have the latest version.
  Age: Time from deployment creation

















