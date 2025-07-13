#!/bin/bash
set -e

echo "🚀 Starting simple deployment..."

cd terraform

# Use simple configuration for testing
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -auto-approve

echo "✅ Simple deployment complete!"