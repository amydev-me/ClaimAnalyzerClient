variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "my-react-app"
}

variable "ecr_repo_uri" {
  description = "ECR repository URI"
  type        = string
  default     = "914852670718.dkr.ecr.ap-southeast-1.amazonaws.com/my-react-app"
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "cicd"
}