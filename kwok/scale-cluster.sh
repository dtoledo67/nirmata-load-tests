#!/bin/bash


#-- Cluster Sizing -------------------------------

NODE_COUNT=20
NAMESPACE_COUNT=10
APPLICATION_PER_NAMESPACE_COUNT=3
DEPLOYMENT_PER_APPLICATION_COUNT=4
POD_PER_DEPLOYMENT_COUNT=3

#-- Versions -------------------------------------

KUBERNETES_VERSION=1.25.0
KYVERNO_DISTRIBUTION=opensource  # n4k | opensource
KYVERNO_VERSION=latest

#-- Resource prefixes ----------------------------

NAMESPACE_NAME_PREFIX=ns
APPLICATION_NAME_PREFIX=app
DEPLOYMENT_NAME_PREFIX=deployment


#-- functions ------------------------------------

function scale_cluster() {
   start_kwok
   create_cluster_nodes
   create_namespaces
   deploy_kyverno
   deploy_policies
}

function start_kwok {
   kwok \
     --kubeconfig=~/.kube/config \
     --manage-all-nodes=false \
     --manage-nodes-with-annotation-selector=kwok.x-k8s.io/node=fake \
     --manage-nodes-with-label-selector= \
     --disregard-status-with-annotation-selector=kwok.x-k8s.io/status=custom \
     --disregard-status-with-label-selector= \
     --cidr=10.0.0.1/24 \
     --node-ip=10.0.0.1 > /dev/null 2>&1 &
}

function deploy_kyverno {
   helm repo add kyverno https://kyverno.github.io/kyverno/
   helm repo update
   helm install kyverno kyverno/kyverno -n kyverno --create-namespace
}

function deploy_policies {
   helm install kyverno-policies --namespace kyverno kyverno/kyverno-policies
   helm install nirmata-best-practices  --namespace kyverno nirmata/best-practice-policies
}

function create_cluster_nodes() {
   for ((i=0; i<$NODE_COUNT; i++)); do
      sed -e 's/NODEID/'"${i}"'/g' -e 's/KUBERNETES_VERSION/'"${KUBERNETES_VERSION}"'/g' node-tmpl.yaml > node.yaml
      kubectl create -f node.yaml
   done
}

function create_namespaces() {
   echo "create namespaces"
   for ((i=1; i<=$NAMESPACE_COUNT; i++)); do
      create_namespace $i 
   done
}

function create_namespace {
   echo "create ns"
   local nsId=$1
   kubectl create ns ${NAMESPACE_NAME_PREFIX}-${nsId}
   create_applications $nsId
}

function create_applications {
   echo "create applications"
   local nsId=$1
   for ((appId=1; appId<=$APPLICATION_PER_NAMESPACE_COUNT; appId++)); do
      create_application $nsId  $appId
   done
}

function create_application {
   echo "create app"
   local nsId=$1
   local appId=$2
   for ((depId=1; depId<=$DEPLOYMENT_PER_APPLICATION_COUNT; depId++)); do
      create_deployment $nsId $appId $depId
   done
}

function create_deployment {
   echo "create deployment"
   local nsId=$1
   local appId=$2
   local depId=$3

   sed   \
           -e 's/NSID/'"${nsId}"'/g'  \
           -e 's/APPID/'"${appId}"'/g'  \
           -e 's/DEPID/'"${depId}"'/g'  \
           -e 's/REPLICAS/'"${POD_PER_DEPLOYMENT_COUNT}"'/g'  deployment-tmpl.yaml  > deployment-instance.yaml

   # cat deployment-instance.yaml

   kubectl create -f deployment-instance.yaml
}

function main {
   scale_cluster
}

#-- entry point ------------------------------------------
main
