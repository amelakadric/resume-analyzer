#!/bin/bash

# AWS Configuration
AWS_REGION="us-east-1"  # Change this to your preferred region
ECR_REPOSITORY_PREFIX="resume-analyzer"

# Create ECR repositories
aws ecr create-repository --repository-name ${ECR_REPOSITORY_PREFIX}-frontend --region ${AWS_REGION}
aws ecr create-repository --repository-name ${ECR_REPOSITORY_PREFIX}-backend --region ${AWS_REGION}

# Get ECR login token and login
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.${AWS_REGION}.amazonaws.com

# Build and push frontend image
cd frontend
docker build -t ${ECR_REPOSITORY_PREFIX}-frontend .
docker tag ${ECR_REPOSITORY_PREFIX}-frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_PREFIX}-frontend:latest
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_PREFIX}-frontend:latest

# Build and push backend image
cd ../backend
docker build -t ${ECR_REPOSITORY_PREFIX}-backend .
docker tag ${ECR_REPOSITORY_PREFIX}-backend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_PREFIX}-backend:latest
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_PREFIX}-backend:latest 
