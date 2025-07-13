#!/bin/bash
set -e

REGION="ap-southeast-1"
ECR_REPO="914852670718.dkr.ecr.ap-southeast-1.amazonaws.com/my-react-app"

echo "🏗️  Building React app..."
cd react-app
npm install
npm run build
cd ..

echo "🐳 Building Docker image for AMD64..."
docker build --platform linux/amd64 -f docker/Dockerfile -t my-react-app .

echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO

echo "🏷️  Tagging image..."
docker tag my-react-app:latest $ECR_REPO:latest

echo "⬆️  Pushing to ECR..."
docker push $ECR_REPO:latest

echo "✅ Build and push complete!"