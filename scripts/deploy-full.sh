#!/bin/bash
set -e

echo "🚀 Starting full deployment..."

# Build and push image
./scripts/build-and-push.sh

echo "🏗️  Deploying infrastructure..."
cd terraform
terraform init
terraform plan
terraform apply -auto-approve

echo "✅ Full deployment complete!"
echo "🌐 Your app will be available at: $(terraform output -raw app_url)"