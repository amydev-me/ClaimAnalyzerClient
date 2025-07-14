# Claim Analyzer Frontend Application

This repository contains the frontend Single Page Application (SPA) built with React, containerized using Docker, and deployed via AWS ECS on Fargate, managed by Terraform and a CI/CD pipeline. The project demonstrates the implementation of a modern, cloud-native frontend architecture.

**Demo Link:**  
[Live Frontend Demo](http://my-react-app-cicd-alb-2013842589.ap-southeast-1.elb.amazonaws.com/)


## Features

### User Interface (React SPA):
- File upload component (allows selecting images).
- Text area for entering accident descriptions.
- Submit button to trigger the analysis process.
- Display area for structured analysis results returned from the backend.

### Containerization:
- The React application is containerized using a Dockerfile.

### Hosting:
- **AWS ECS on Fargate:** Hosts the containerized frontend application, providing a serverless compute engine for scalability.
- **Amazon ECR:** Stores the Docker images for the frontend application.
- **Application Load Balancer (ALB):** Provides a public, scalable entry point for the frontend, distributing traffic to the ECS service.

### CI/CD:
- **GitHub Actions:** Automates the entire frontend pipeline:
  - Builds the React app.
  - Builds the Docker image.
  - Pushes the new image to Amazon ECR.
  - Triggers an update to the ECS service to deploy the new container.

## Architecture Diagram (Frontend Focus)




# Design Choices Explanation (Frontend)

When building the frontend, the goal was to create a responsive user interface and deploy it reliably using modern cloud practices.

## Frontend Application (React SPA):
- **Why React?**  
  Chosen for its component-based architecture, making it easier to manage UI complexity, and its popularity and strong ecosystem.
- **SPA Approach:**  
  Provides a dynamic user experience without full page reloads, making the application feel more responsive.

## Containerization (Docker):
- **Requirement:** The frontend app must be containerized.  
- **Why Docker?**  
  Docker was used to package the React application with its runtime environment (Node.js and Nginx). This ensures consistency across development and deployment environments, eliminating "it works on my machine" issues.

## Hosting (ECS on Fargate):
- **Requirement:** Deploy via AWS ECS on Fargate.  
- **Why ECS/Fargate?**  
  ECS (Elastic Container Service) with Fargate was chosen because it's a managed container orchestration service. Fargate, in particular, is serverless for containers, meaning there is no need to provision or manage EC2 instances. It allows the application to scale and run reliably without direct server management.

## Application Load Balancer (ALB):
- **Requirement:** Served via ALB.  
- **Why ALB?**  
  The ALB provides a scalable and highly available entry point for the frontend. It distributes incoming traffic to the running containers, handles health checks, and can manage SSL termination (though not explicitly configured here for simplicity). It ensures users can always access the application.

## CI/CD (GitHub Actions):
- **Requirement:** Automate frontend build, Docker build, ECR push, and ECS deployment.  
- **Why GitHub Actions?**  
  This automates the entire process from code commit to deployment. It involves building the React app, creating a Docker image, pushing it to ECR, and then triggering an ECS service update. This ensures that new versions of the frontend are deployed quickly and reliably.


# Assumptions Made During Development (Frontend)

- **Local Development Environment:**  
  Assumed Node.js and npm/yarn were installed for building the React app and Docker was installed for containerization.

- **AWS Resources:**  
  Assumed that the necessary AWS backend infrastructure (API Gateway, S3) was already deployed and accessible.

- **AWS Credentials:**  
  Assumed AWS credentials (via GitHub Secrets) would be available for the CI/CD pipeline to push to ECR and update ECS.

- **ECR Repository:**  
  Assumed an ECR repository would be created (or managed by Terraform) to store the Docker images.

- **API Endpoints:**  
  Assumed the backend API Gateway endpoints (`/upload`, `/analyze`) would be available and functioning.


# Deployment Guide

This guide covers deploying the frontend application, assuming the backend infrastructure is already in place.

## Part 1: Frontend Deployment (CI/CD via GitHub Actions)

This section explains how to get the frontend application deployed.

### Prerequisites:

- **Frontend Code:**  
  React SPA code pushed to a GitHub repository.

- **Dockerfile:**  
  Present in the repository root to build the frontend container.

- **GitHub Secrets:**  
  Configured for AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

- **Backend Infrastructure:**  
  Deployed and accessible (API Gateway URLs).

- **AWS ECS Cluster, Task Definition, Service:**  
  Terraform will create these.
