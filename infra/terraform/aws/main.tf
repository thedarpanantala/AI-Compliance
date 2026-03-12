terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "platform" {
  cidr_block = "10.40.0.0/16"
  tags = { Name = "ai-compliance-vpc" }
}

resource "aws_ecs_cluster" "platform" {
  name = "ai-compliance-cluster"
}
