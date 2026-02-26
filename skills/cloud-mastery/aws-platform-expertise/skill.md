# AWS Cloud Platform Expertise

## Description
Expert-level knowledge of Amazon Web Services (AWS) covering all major service categories including compute, storage, networking, databases, security, analytics, machine learning, IoT, and management tools with deep understanding of service architectures, cost optimization, security best practices, and multi-region deployment strategies.

## When to Use
- Designing comprehensive AWS cloud architectures for any scale
- Optimizing AWS deployments for cost, performance, and security
- Implementing AWS Well-Architected Framework principles
- Selecting optimal AWS services for specific requirements
- Troubleshooting complex AWS infrastructure and service issues

## Instructions

You are an AWS Solutions Architect Expert with comprehensive knowledge of all AWS services, their internal architectures, integration patterns, cost optimization strategies, and production best practices across all domains from startups to enterprise-scale deployments.

### AWS Compute Services Expertise

#### **Amazon EC2 and Auto Scaling**

```
EC2 Instance Architecture and Optimization:

EC2 Instance Types and Use Cases:
├── General Purpose (M, T, A series):
│   ├── M6i/M6a: Balanced compute, memory, and networking
│   ├── M5/M5a/M5n: Previous generation general purpose
│   ├── T4g/T3/T3a: Burstable performance instances
│   ├── A1: Arm-based processors for scale-out workloads
│   └── Use Cases: Web servers, microservices, small/medium databases

├── Compute Optimized (C series):
│   ├── C6i/C6a: Latest generation compute optimized
│   ├── C5/C5n: High-performance processors
│   ├── C6gn: Arm-based with enhanced networking
│   ├── C4: Previous generation compute optimized
│   └── Use Cases: CPU-intensive applications, HPC, gaming

├── Memory Optimized (R, X, z1d series):
│   ├── R6i/R6a: Latest generation memory optimized
│   ├── R5/R5a/R5n: Previous generation memory optimized
│   ├── X1e/X1: High memory instances up to 3,904 GB RAM
│   ├── z1d: High frequency processors with NVMe SSD
│   └── Use Cases: In-memory databases, real-time analytics

├── Storage Optimized (I, D, H series):
│   ├── I4i: NVMe SSD-backed instance storage
│   ├── I3/I3en: NVMe SSD with enhanced networking
│   ├── D2/D3: Dense HDD storage for distributed file systems
│   ├── H1: High disk throughput for HDFS
│   └── Use Cases: NoSQL databases, distributed file systems

├── Accelerated Computing (P, G, F1 series):
│   ├── P4d/P3: GPU instances for ML training and HPC
│   ├── G4dn/G4ad: GPU instances for ML inference and graphics
│   ├── F1: FPGA instances for hardware acceleration
│   ├── Inf1: AWS Inferentia for ML inference
│   └── Use Cases: Machine learning, HPC, graphics workloads

EC2 Networking and Storage Optimization:
├── Enhanced Networking:
│   ├── SR-IOV: Single Root I/O Virtualization
│   ├── ENA (Elastic Network Adapter): Up to 100 Gbps
│   ├── Intel 82599 VF: Up to 10 Gbps
│   ├── Placement Groups: Cluster, partition, and spread
│   └── Jumbo Frames: 9000 MTU for reduced overhead

├── Storage Options:
│   ├── EBS (Elastic Block Store): Persistent block storage
│   ├── Instance Store: High-performance temporary storage
│   ├── EFS (Elastic File System): Scalable file storage
│   ├── FSx: Fully managed file systems
│   └── S3: Object storage integration

class AWSComputeOptimizer:
    def __init__(self):
        self.instance_analyzer = EC2InstanceAnalyzer()
        self.cost_optimizer = EC2CostOptimizer()
        self.performance_optimizer = EC2PerformanceOptimizer()

    def optimize_ec2_deployment(self, compute_requirements):
        """Optimize EC2 deployment for cost, performance, and availability"""

        # Instance selection optimization
        instance_recommendation = {
            'primary_instance_type': self.select_optimal_instance_type(compute_requirements),
            'alternative_instances': self.get_alternative_instances(compute_requirements),
            'instance_analysis': {
                'vcpu_to_memory_ratio': self.analyze_cpu_memory_requirements(compute_requirements),
                'network_performance': self.analyze_network_requirements(compute_requirements),
                'storage_performance': self.analyze_storage_requirements(compute_requirements),
                'cost_performance_ratio': self.calculate_cost_performance_ratio(compute_requirements)
            }
        }

        # Auto Scaling configuration
        autoscaling_config = {
            'launch_template': {
                'instance_type': instance_recommendation['primary_instance_type'],
                'ami_id': self.select_optimal_ami(compute_requirements.os_requirements),
                'security_groups': self.design_security_groups(compute_requirements.security_requirements),
                'user_data': self.generate_user_data_script(compute_requirements.startup_requirements),
                'iam_instance_profile': self.design_instance_iam_role(compute_requirements.permissions),
                'monitoring': {'enabled': True},
                'block_device_mappings': self.optimize_storage_configuration(compute_requirements)
            },
            'auto_scaling_group': {
                'min_size': compute_requirements.min_instances,
                'max_size': compute_requirements.max_instances,
                'desired_capacity': compute_requirements.desired_instances,
                'vpc_zone_identifier': compute_requirements.subnet_ids,
                'health_check_type': 'ELB' if compute_requirements.load_balanced else 'EC2',
                'health_check_grace_period': 300,
                'default_cooldown': 300,
                'termination_policies': ['OldestInstance', 'Default']
            },
            'scaling_policies': [
                {
                    'policy_name': 'scale-up-cpu',
                    'policy_type': 'TargetTrackingScaling',
                    'target_tracking_configuration': {
                        'target_value': 70.0,
                        'predefined_metric_specification': {
                            'predefined_metric_type': 'ASGAverageCPUUtilization'
                        },
                        'scale_out_cooldown': 300,
                        'scale_in_cooldown': 300
                    }
                },
                {
                    'policy_name': 'scale-up-requests',
                    'policy_type': 'TargetTrackingScaling',
                    'target_tracking_configuration': {
                        'target_value': compute_requirements.target_requests_per_instance,
                        'predefined_metric_specification': {
                            'predefined_metric_type': 'ALBRequestCountPerTarget',
                            'resource_label': compute_requirements.alb_target_group_label
                        }
                    }
                }
            ]
        }

        # Spot Instances optimization for cost savings
        spot_fleet_config = None
        if compute_requirements.spot_instance_eligible:
            spot_fleet_config = {
                'spot_fleet_request_config': {
                    'target_capacity': compute_requirements.desired_instances,
                    'allocation_strategy': 'diversified',
                    'iam_fleet_role': compute_requirements.spot_fleet_role_arn,
                    'launch_template_configs': self.generate_spot_launch_templates(
                        instance_recommendation['primary_instance_type'],
                        instance_recommendation['alternative_instances']
                    ),
                    'replace_unhealthy_instances': True,
                    'type': 'maintain'
                },
                'estimated_savings': self.calculate_spot_savings(compute_requirements)
            }

        return EC2OptimizationPlan(
            instance_recommendation=instance_recommendation,
            autoscaling_config=autoscaling_config,
            spot_fleet_config=spot_fleet_config,
            monitoring_setup=self.design_ec2_monitoring(compute_requirements)
        )

    def design_placement_strategy(self, application_requirements):
        """Design optimal EC2 placement strategy"""

        placement_strategies = {
            'high_performance_computing': {
                'placement_group_type': 'cluster',
                'instance_types': ['c5n.18xlarge', 'c5n.24xlarge'],
                'enhanced_networking': True,
                'sr_iov': True,
                'rationale': 'Low latency, high throughput networking'
            },
            'distributed_application': {
                'placement_group_type': 'partition',
                'partitions': min(7, application_requirements.partition_count),
                'instance_distribution': 'balanced',
                'rationale': 'Fault isolation across hardware partitions'
            },
            'high_availability': {
                'placement_group_type': 'spread',
                'availability_zones': application_requirements.availability_zones,
                'max_instances_per_az': 7,  # AWS limit for spread placement groups
                'rationale': 'Maximum fault tolerance and availability'
            },
            'cost_optimized': {
                'placement_group_type': None,
                'mixed_instance_types': True,
                'spot_instances': True,
                'on_demand_percentage': 20,
                'rationale': 'Cost optimization with acceptable availability'
            }
        }

        return placement_strategies.get(
            application_requirements.workload_type,
            placement_strategies['high_availability']
        )

EC2 Advanced Patterns:

Reserved Instance and Savings Plans Strategy:
├── Standard Reserved Instances: 1-3 year commitment with up to 75% savings
├── Convertible Reserved Instances: Flexible instance type changes
├── Scheduled Reserved Instances: Predictable recurring capacity
├── Compute Savings Plans: Flexible compute savings across EC2, Fargate, Lambda
├── EC2 Instance Savings Plans: EC2-specific savings with family flexibility
├── Regional vs AZ-specific: Availability zone flexibility vs discount rate
└── RI Portfolio Management: Optimal mix of reservation types

Elastic Load Balancing Integration:
├── Application Load Balancer (ALB): Layer 7 load balancing
├── Network Load Balancer (NLB): Layer 4 ultra-high performance
├── Gateway Load Balancer (GWLB): Third-party virtual appliances
├── Classic Load Balancer (CLB): Legacy layer 4/7 load balancing
├── Target Group Management: Health checks and routing
├── SSL/TLS Termination: Certificate management and SSL policies
└── Cross-Zone Load Balancing: Even distribution across AZs
```

#### **AWS Container Services (ECS, EKS, Fargate)**

```
Amazon ECS (Elastic Container Service):

ECS Architecture Components:
├── Cluster Management:
│   ├── EC2 Launch Type: Container instances on EC2
│   ├── Fargate Launch Type: Serverless container execution
│   ├── Cluster Auto Scaling: Automatic capacity management
│   ├── Container Insights: Performance monitoring
│   └── Service Discovery: DNS-based service discovery

├── Task Definitions:
│   ├── Container Definitions: Image, CPU, memory specifications
│   ├── Task Role: IAM permissions for containers
│   ├── Network Mode: Bridge, host, awsvpc networking
│   ├── Volume Definitions: Persistent and ephemeral storage
│   └── Logging Configuration: CloudWatch and third-party logging

├── Service Management:
│   ├── Service Scheduler: Long-running service management
│   ├── Task Placement: Constraint-based task placement
│   ├── Load Balancer Integration: ALB/NLB integration
│   ├── Auto Scaling: Service-level auto scaling
│   └── Rolling Deployments: Zero-downtime deployments

Amazon EKS (Elastic Kubernetes Service):

EKS Architecture and Optimization:
├── Control Plane:
│   ├── Managed Kubernetes API: Highly available API servers
│   ├── etcd Management: Automated backup and maintenance
│   ├── Master Node Security: AWS-managed security patches
│   ├── Version Management: Kubernetes version lifecycle
│   └── Add-on Management: AWS and third-party add-ons

├── Node Groups:
│   ├── Managed Node Groups: AWS-managed worker nodes
│   ├── Self-Managed Nodes: Custom AMI and configuration
│   ├── Fargate Profiles: Serverless pod execution
│   ├── Spot Instance Integration: Cost-optimized node groups
│   └── Multi-AZ Distribution: High availability node placement

class AWSContainerOptimizer:
    def __init__(self):
        self.ecs_optimizer = ECSOptimizer()
        self.eks_optimizer = EKSOptimizer()
        self.fargate_optimizer = FargateOptimizer()

    def optimize_eks_deployment(self, kubernetes_requirements):
        """Optimize EKS deployment for production workloads"""

        # Cluster configuration
        cluster_config = {
            'cluster_name': kubernetes_requirements.cluster_name,
            'version': kubernetes_requirements.kubernetes_version,
            'role_arn': kubernetes_requirements.cluster_service_role,
            'vpc_config': {
                'subnet_ids': kubernetes_requirements.subnet_ids,
                'security_group_ids': [self.create_cluster_security_group(kubernetes_requirements)],
                'endpoint_config': {
                    'private_access': True,
                    'public_access': kubernetes_requirements.public_api_access,
                    'public_access_cidrs': kubernetes_requirements.api_access_cidrs
                }
            },
            'logging': {
                'enable': ['api', 'audit', 'authenticator', 'controllerManager', 'scheduler']
            },
            'encryption_config': [
                {
                    'resources': ['secrets'],
                    'provider': {
                        'key_arn': kubernetes_requirements.kms_key_arn
                    }
                }
            ]
        }

        # Node group configuration
        node_groups = []

        # Primary node group for system workloads
        system_node_group = {
            'node_group_name': f"{kubernetes_requirements.cluster_name}-system",
            'instance_types': ['m5.large', 'm5.xlarge'],
            'ami_type': 'AL2_x86_64',
            'capacity_type': 'ON_DEMAND',
            'scaling_config': {
                'min_size': 3,
                'max_size': 10,
                'desired_size': 3
            },
            'update_config': {
                'max_unavailable_percentage': 25
            },
            'labels': {
                'node-type': 'system',
                'workload': 'infrastructure'
            },
            'taints': [
                {
                    'key': 'CriticalAddonsOnly',
                    'value': 'true',
                    'effect': 'NO_SCHEDULE'
                }
            ]
        }
        node_groups.append(system_node_group)

        # Application node group
        app_node_group = {
            'node_group_name': f"{kubernetes_requirements.cluster_name}-applications",
            'instance_types': kubernetes_requirements.application_instance_types,
            'ami_type': 'AL2_x86_64',
            'capacity_type': 'SPOT' if kubernetes_requirements.use_spot_instances else 'ON_DEMAND',
            'scaling_config': {
                'min_size': kubernetes_requirements.min_app_nodes,
                'max_size': kubernetes_requirements.max_app_nodes,
                'desired_size': kubernetes_requirements.desired_app_nodes
            },
            'labels': {
                'node-type': 'application',
                'workload': 'general'
            }
        }
        node_groups.append(app_node_group)

        # GPU node group if needed
        if kubernetes_requirements.gpu_workloads:
            gpu_node_group = {
                'node_group_name': f"{kubernetes_requirements.cluster_name}-gpu",
                'instance_types': ['p3.2xlarge', 'p3.8xlarge', 'g4dn.xlarge'],
                'ami_type': 'AL2_x86_64_GPU',
                'capacity_type': 'ON_DEMAND',
                'scaling_config': {
                    'min_size': 0,
                    'max_size': kubernetes_requirements.max_gpu_nodes,
                    'desired_size': 0
                },
                'labels': {
                    'node-type': 'gpu',
                    'workload': 'ml-training'
                },
                'taints': [
                    {
                        'key': 'nvidia.com/gpu',
                        'value': 'true',
                        'effect': 'NO_SCHEDULE'
                    }
                ]
            }
            node_groups.append(gpu_node_group)

        # Add-on configuration
        addon_config = {
            'vpc_cni': {
                'addon_name': 'vpc-cni',
                'addon_version': 'latest',
                'configuration_values': {
                    'env': {
                        'ENABLE_PREFIX_DELEGATION': 'true',
                        'WARM_PREFIX_TARGET': '1'
                    }
                }
            },
            'coredns': {
                'addon_name': 'coredns',
                'addon_version': 'latest'
            },
            'kube_proxy': {
                'addon_name': 'kube-proxy',
                'addon_version': 'latest'
            },
            'aws_ebs_csi_driver': {
                'addon_name': 'aws-ebs-csi-driver',
                'addon_version': 'latest',
                'service_account_role_arn': kubernetes_requirements.ebs_csi_role_arn
            }
        }

        # Fargate profiles for serverless workloads
        fargate_profiles = []
        if kubernetes_requirements.serverless_workloads:
            fargate_profile = {
                'fargate_profile_name': f"{kubernetes_requirements.cluster_name}-serverless",
                'pod_execution_role_arn': kubernetes_requirements.fargate_pod_execution_role,
                'subnets': kubernetes_requirements.private_subnet_ids,
                'selectors': [
                    {
                        'namespace': 'serverless',
                        'labels': {
                            'compute-type': 'fargate'
                        }
                    }
                ]
            }
            fargate_profiles.append(fargate_profile)

        return EKSOptimizationPlan(
            cluster_config=cluster_config,
            node_groups=node_groups,
            addons=addon_config,
            fargate_profiles=fargate_profiles,
            monitoring_setup=self.design_eks_monitoring(),
            security_hardening=self.design_eks_security_hardening()
        )

AWS Container Advanced Patterns:

ECS Service Connect and Service Discovery:
├── Service Connect: Application-level networking
├── CloudMap Service Discovery: DNS-based service registration
├── Service Mesh Integration: App Mesh integration
├── Load Balancer Integration: ALB and NLB target groups
├── Blue/Green Deployments: CodeDeploy integration
└── Circuit Breaker: Automatic failure detection and isolation

EKS Networking and Security:
├── VPC CNI: Advanced networking with ENI per pod
├── Security Groups for Pods: Pod-level security groups
├── Network Policies: Kubernetes network segmentation
├── Service Mesh: Istio and App Mesh integration
├── Pod Security Standards: Kubernetes pod security
├── IRSA: IAM Roles for Service Accounts
└── Secrets Management: AWS Secrets Manager integration
```

### AWS Storage Services Expertise

#### **Amazon S3 and Storage Classes**

```
Amazon S3 Architecture and Storage Classes:

S3 Storage Classes Optimization:
├── S3 Standard:
│   ├── Use Case: Frequently accessed data
│   ├── Durability: 99.999999999% (11 9's)
│   ├── Availability: 99.99%
│   ├── Cost: Highest storage cost, lowest retrieval cost
│   └── Performance: Milliseconds access time

├── S3 Intelligent-Tiering:
│   ├── Use Case: Unknown or changing access patterns
│   ├── Automatic Tiering: Frequent, Infrequent, Archive, Deep Archive
│   ├── Monitoring Fee: Small monthly fee per object
│   ├── No Retrieval Fees: Automatic optimization
│   └── Performance: Variable based on tier

├── S3 Standard-IA (Infrequent Access):
│   ├── Use Case: Long-lived, infrequently accessed data
│   ├── Storage Cost: Lower than Standard
│   ├── Retrieval Cost: Per GB retrieved
│   ├── Minimum Duration: 30 days
│   └── Performance: Milliseconds access time

├── S3 One Zone-IA:
│   ├── Use Case: Infrequently accessed, recreatable data
│   ├── Availability: 99.5% (single AZ)
│   ├── Cost Savings: 20% less than Standard-IA
│   ├── Risk: AZ destruction risk
│   └── Use Cases: Secondary backup copies

├── S3 Glacier Storage Classes:
│   ├── S3 Glacier Instant Retrieval:
│   │   ├── Use Case: Archive with instant access
│   │   ├── Retrieval Time: Milliseconds
│   │   ├── Minimum Duration: 90 days
│   │   └── Cost: Lower storage, higher retrieval
│   ├── S3 Glacier Flexible Retrieval:
│   │   ├── Use Case: Backup and archive
│   │   ├── Retrieval Options: 1-5 minutes, 3-5 hours, 5-12 hours
│   │   ├── Minimum Duration: 90 days
│   │   └── Cost: Very low storage cost
│   └── S3 Glacier Deep Archive:
│       ├── Use Case: Long-term retention and compliance
│       ├── Retrieval Time: 12-48 hours
│       ├── Minimum Duration: 180 days
│       └── Cost: Lowest storage cost

class S3Optimizer:
    def __init__(self):
        self.cost_analyzer = S3CostAnalyzer()
        self.performance_optimizer = S3PerformanceOptimizer()
        self.lifecycle_optimizer = S3LifecycleOptimizer()

    def optimize_s3_architecture(self, storage_requirements):
        """Optimize S3 bucket architecture for cost and performance"""

        # Bucket configuration
        bucket_config = {
            'bucket_name': storage_requirements.bucket_name,
            'region': storage_requirements.primary_region,
            'versioning': {
                'status': 'Enabled' if storage_requirements.version_control else 'Suspended'
            },
            'encryption': {
                'default_encryption': {
                    'sse_algorithm': storage_requirements.encryption_type,
                    'kms_key_id': storage_requirements.kms_key_id if storage_requirements.encryption_type == 'aws:kms' else None
                },
                'bucket_key_enabled': True  # Reduce KMS costs
            },
            'public_access_block': {
                'block_public_acls': True,
                'block_public_policy': True,
                'ignore_public_acls': True,
                'restrict_public_buckets': True
            },
            'notification_configuration': self.design_event_notifications(storage_requirements),
            'cors_configuration': self.design_cors_rules(storage_requirements) if storage_requirements.web_access else None
        }

        # Lifecycle policy optimization
        lifecycle_policy = {
            'rules': [
                {
                    'id': 'StandardToIA',
                    'status': 'Enabled',
                    'transitions': [
                        {
                            'days': 30,
                            'storage_class': 'STANDARD_IA'
                        },
                        {
                            'days': 90,
                            'storage_class': 'GLACIER'
                        },
                        {
                            'days': 365,
                            'storage_class': 'DEEP_ARCHIVE'
                        }
                    ],
                    'expiration': {
                        'days': storage_requirements.retention_days
                    } if storage_requirements.retention_days else None
                },
                {
                    'id': 'DeleteIncompleteMultipartUploads',
                    'status': 'Enabled',
                    'abort_incomplete_multipart_upload': {
                        'days_after_initiation': 7
                    }
                },
                {
                    'id': 'DeleteOldVersions',
                    'status': 'Enabled' if storage_requirements.version_control else 'Disabled',
                    'noncurrent_version_transitions': [
                        {
                            'noncurrent_days': 30,
                            'storage_class': 'STANDARD_IA'
                        },
                        {
                            'noncurrent_days': 90,
                            'storage_class': 'GLACIER'
                        }
                    ],
                    'noncurrent_version_expiration': {
                        'noncurrent_days': 365
                    }
                }
            ]
        }

        # Performance optimization
        performance_config = {
            'transfer_acceleration': storage_requirements.global_access,
            'request_payer': 'Requester' if storage_requirements.requester_pays else 'BucketOwner',
            'multipart_upload_threshold': 64 * 1024 * 1024,  # 64 MB
            'multipart_chunk_size': 8 * 1024 * 1024,  # 8 MB
            'max_concurrency': 10,
            'max_bandwidth': storage_requirements.bandwidth_limit,
            'prefix_distribution': self.design_prefix_strategy(storage_requirements.access_patterns)
        }

        # Cross-region replication
        replication_config = None
        if storage_requirements.disaster_recovery:
            replication_config = {
                'role': storage_requirements.replication_role_arn,
                'rules': [
                    {
                        'id': 'ReplicateToSecondaryRegion',
                        'status': 'Enabled',
                        'priority': 1,
                        'filter': {
                            'prefix': storage_requirements.replication_prefix
                        },
                        'destination': {
                            'bucket': storage_requirements.destination_bucket_arn,
                            'storage_class': 'STANDARD_IA',
                            'replica_kms_key_id': storage_requirements.destination_kms_key,
                            'replication_time': {
                                'status': 'Enabled',
                                'time': {
                                    'minutes': 15
                                }
                            },
                            'metrics': {
                                'status': 'Enabled',
                                'event_threshold': {
                                    'minutes': 15
                                }
                            }
                        }
                    }
                ]
            }

        return S3OptimizationPlan(
            bucket_config=bucket_config,
            lifecycle_policy=lifecycle_policy,
            performance_config=performance_config,
            replication_config=replication_config,
            cost_analysis=self.analyze_storage_costs(storage_requirements),
            monitoring_setup=self.design_s3_monitoring()
        )

    def design_data_lake_architecture(self, data_lake_requirements):
        """Design S3-based data lake architecture"""

        data_lake_structure = {
            'raw_data_bucket': {
                'purpose': 'Raw data ingestion',
                'storage_class': 'STANDARD',
                'lifecycle_policy': {
                    'transition_to_ia': 30,
                    'transition_to_glacier': 90,
                    'retention_years': 7
                },
                'partitioning_strategy': 'year/month/day/hour',
                'compression': 'gzip',
                'file_formats': ['json', 'csv', 'parquet']
            },
            'processed_data_bucket': {
                'purpose': 'Processed and curated data',
                'storage_class': 'STANDARD',
                'lifecycle_policy': {
                    'intelligent_tiering': True
                },
                'partitioning_strategy': 'dataset/year/month',
                'compression': 'snappy',
                'file_formats': ['parquet', 'delta']
            },
            'analytics_bucket': {
                'purpose': 'Analytics and reporting data',
                'storage_class': 'STANDARD',
                'lifecycle_policy': {
                    'transition_to_ia': 90,
                    'retention_years': 3
                },
                'partitioning_strategy': 'report_type/year/month',
                'compression': 'lz4',
                'file_formats': ['parquet']
            }
        }

        # Data catalog integration
        data_catalog = {
            'glue_catalog': {
                'databases': ['raw_data_db', 'processed_data_db', 'analytics_db'],
                'crawlers': self.design_glue_crawlers(data_lake_requirements),
                'etl_jobs': self.design_etl_jobs(data_lake_requirements)
            },
            'lake_formation': {
                'data_lake_settings': {
                    'create_database_default_permissions': [],
                    'create_table_default_permissions': []
                },
                'permissions': self.design_lake_formation_permissions(data_lake_requirements)
            }
        }

        return DataLakeArchitecture(
            bucket_structure=data_lake_structure,
            data_catalog=data_catalog,
            security_configuration=self.design_data_lake_security(),
            governance_framework=self.design_data_governance()
        )

S3 Advanced Features and Patterns:

S3 Performance Optimization:
├── Request Patterns: Avoid sequential prefix patterns
├── Multipart Upload: Large object upload optimization
├── Transfer Acceleration: Global upload/download acceleration
├── CloudFront Integration: Global content delivery
├── VPC Endpoints: Private network access to S3
├── S3 Select: Server-side data filtering
├── S3 Batch Operations: Large-scale object operations
└── Storage Lens: Organization-wide storage analytics

S3 Security and Compliance:
├── Bucket Policies: Resource-based access control
├── IAM Policies: Identity-based access control
├── Access Control Lists (ACLs): Object-level permissions
├── S3 Block Public Access: Account and bucket level protection
├── Server-Side Encryption: SSE-S3, SSE-KMS, SSE-C
├── Object Lock: WORM compliance and retention
├── Access Logging: Detailed access audit trails
└── CloudTrail Integration: API call logging and monitoring
```

#### **Amazon EBS and EFS**

```
Amazon EBS (Elastic Block Store):

EBS Volume Types and Optimization:
├── General Purpose SSD (gp3):
│   ├── Performance: 3,000-16,000 IOPS, 125-1,000 MB/s
│   ├── Size Range: 1 GB - 16 TB
│   ├── Use Cases: Boot volumes, low-latency applications
│   ├── Cost: Baseline performance included, pay for additional
│   └── Optimization: Independent IOPS and throughput scaling

├── General Purpose SSD (gp2):
│   ├── Performance: Baseline 3 IOPS/GB, burst to 3,000 IOPS
│   ├── Size Range: 1 GB - 16 TB
│   ├── Use Cases: General purpose workloads
│   ├── Cost: Single price per GB
│   └── Limitation: Performance tied to volume size

├── Provisioned IOPS SSD (io2):
│   ├── Performance: Up to 64,000 IOPS, 1,000 MB/s
│   ├── Size Range: 4 GB - 16 TB
│   ├── IOPS/GB Ratio: Up to 500:1
│   ├── Use Cases: I/O intensive applications, databases
│   └── Durability: 99.999% durability (io2 Block Express: 99.9999%)

├── Provisioned IOPS SSD (io1):
│   ├── Performance: Up to 64,000 IOPS, 1,000 MB/s
│   ├── Size Range: 4 GB - 16 TB
│   ├── IOPS/GB Ratio: Up to 50:1
│   ├── Use Cases: Legacy applications requiring io1
│   └── Durability: 99.999% durability

├── Throughput Optimized HDD (st1):
│   ├── Performance: Baseline 40 MB/s/TB, burst to 250 MB/s/TB
│   ├── Size Range: 125 GB - 16 TB
│   ├── Use Cases: Big data, data warehousing, log processing
│   ├── Cost: Lowest cost per GB for HDD
│   └── Limitation: Cannot be boot volume

├── Cold HDD (sc1):
│   ├── Performance: Baseline 12 MB/s/TB, burst to 80 MB/s/TB
│   ├── Size Range: 125 GB - 16 TB
│   ├── Use Cases: Infrequent access, archival storage
│   ├── Cost: Lowest cost per GB
│   └── Limitation: Cannot be boot volume, lowest performance

class EBSOptimizer:
    def __init__(self):
        self.performance_analyzer = EBSPerformanceAnalyzer()
        self.cost_optimizer = EBSCostOptimizer()
        self.snapshot_manager = EBSSnapshotManager()

    def optimize_ebs_configuration(self, storage_requirements):
        """Optimize EBS configuration for workload requirements"""

        # Volume type selection
        volume_recommendation = self.select_optimal_volume_type(storage_requirements)

        # EBS configuration
        ebs_config = {
            'volume_type': volume_recommendation['volume_type'],
            'size': self.calculate_optimal_size(storage_requirements),
            'iops': volume_recommendation['iops'] if 'iops' in volume_recommendation else None,
            'throughput': volume_recommendation['throughput'] if 'throughput' in volume_recommendation else None,
            'encrypted': True,
            'kms_key_id': storage_requirements.kms_key_id,
            'availability_zone': storage_requirements.availability_zone,
            'tags': storage_requirements.tags
        }

        # Multi-Attach configuration for shared storage
        if storage_requirements.shared_storage:
            ebs_config.update({
                'multi_attach_enabled': True,
                'supported_instance_types': ['c5n', 'm5n', 'r5n'],  # Nitro instances only
                'file_system': 'cluster_aware',  # Requires cluster-aware file system
                'max_attachments': 16
            })

        # Snapshot strategy
        snapshot_strategy = {
            'lifecycle_policy': {
                'resource_types': ['VOLUME'],
                'target_tags': [storage_requirements.backup_tag],
                'schedules': [
                    {
                        'name': 'daily-snapshots',
                        'copy_tags': True,
                        'tags_to_add': [
                            {'Key': 'SnapshotType', 'Value': 'Daily'},
                            {'Key': 'CreatedBy', 'Value': 'DLM'}
                        ],
                        'create_rule': {
                            'interval': 24,
                            'interval_unit': 'HOURS',
                            'times': ['23:45']
                        },
                        'retain_rule': {
                            'count': 7
                        },
                        'fast_snapshot_restore_rule': {
                            'count': 1,
                            'interval': 1,
                            'interval_unit': 'DAYS',
                            'availability_zones': [storage_requirements.availability_zone]
                        }
                    },
                    {
                        'name': 'weekly-snapshots',
                        'copy_tags': True,
                        'create_rule': {
                            'interval': 168,  # 7 days
                            'interval_unit': 'HOURS',
                            'times': ['01:00'],
                            'cron_expression': '0 1 ? * SUN *'
                        },
                        'retain_rule': {
                            'count': 4
                        },
                        'copy_rule': {
                            'target_region': storage_requirements.backup_region,
                            'encrypted': True,
                            'copy_tags': True
                        }
                    }
                ]
            }
        }

        # Performance optimization recommendations
        performance_optimization = {
            'instance_optimization': {
                'ebs_optimized': True,
                'nitro_instances_recommended': True,
                'instance_types': self.recommend_ebs_optimized_instances(storage_requirements)
            },
            'raid_configuration': self.analyze_raid_benefits(storage_requirements),
            'file_system_optimization': {
                'recommended_file_systems': ['xfs', 'ext4'],
                'mount_options': self.generate_mount_options(volume_recommendation['volume_type']),
                'block_size': '4096'
            }
        }

        return EBSOptimizationPlan(
            volume_config=ebs_config,
            snapshot_strategy=snapshot_strategy,
            performance_optimization=performance_optimization,
            cost_analysis=self.analyze_ebs_costs(ebs_config),
            monitoring_setup=self.design_ebs_monitoring()
        )

Amazon EFS (Elastic File System):

EFS Performance Modes and Storage Classes:
├── Performance Modes:
│   ├── General Purpose: Up to 7,000 file operations per second
│   ├── Max I/O: Higher aggregate throughput and operations per second
│   └── Optimization: General Purpose for most use cases

├── Throughput Modes:
│   ├── Bursting Throughput: Baseline + burst performance
│   ├── Provisioned Throughput: Consistent high throughput
│   └── Elastic Throughput: Automatic scaling based on workload

├── Storage Classes:
│   ├── EFS Standard: Frequently accessed files
│   ├── EFS Infrequent Access (IA): Cost-optimized for infrequent access
│   ├── EFS One Zone: Single AZ storage for cost savings
│   └── EFS One Zone-IA: Single AZ infrequent access

EFS Advanced Features:
├── Lifecycle Management: Automatic file tiering to IA
├── Access Points: Application-specific access control
├── VPC Endpoints: Private network access to EFS
├── Backup: Automatic backups with AWS Backup
├── Encryption: Encryption at rest and in transit
├── Regional Replication: Cross-region disaster recovery
└── POSIX Permissions: Full POSIX file system semantics
```

### AWS Database Services Expertise

#### **Amazon RDS and Aurora**

```
Amazon RDS (Relational Database Service):

RDS Engine Options and Optimization:
├── Amazon Aurora:
│   ├── MySQL Compatible: Up to 5x MySQL performance
│   ├── PostgreSQL Compatible: Up to 3x PostgreSQL performance
│   ├── Serverless: On-demand, auto-scaling database
│   ├── Multi-Master: Multiple write instances
│   ├── Global Database: Cross-region replication
│   └── Parallel Query: Analytical query acceleration

├── MySQL:
│   ├── Versions: 5.7, 8.0
│   ├── Storage: gp2, gp3, io1, io2
│   ├── Read Replicas: Up to 5 cross-region
│   ├── Backup: Automated backups, manual snapshots
│   └── Performance Insights: Query performance monitoring

├── PostgreSQL:
│   ├── Versions: 11, 12, 13, 14, 15
│   ├── Extensions: PostGIS, pg_stat_statements
│   ├── Logical Replication: Built-in replication
│   ├── Vacuum Management: Automated maintenance
│   └── Connection Pooling: pgBouncer integration

├── Oracle:
│   ├── Editions: Standard, Enterprise
│   ├── License Models: BYOL, License Included
│   ├── RAC: Real Application Clusters (Enterprise)
│   ├── Data Guard: Disaster recovery
│   └── Transparent Data Encryption: Built-in encryption

├── SQL Server:
│   ├── Editions: Express, Web, Standard, Enterprise
│   ├── Always On: High availability and disaster recovery
│   ├── SQL Server Agent: Job scheduling
│   ├── Reporting Services: SSRS support
│   └── Integration Services: SSIS support

├── MariaDB:
│   ├── Versions: 10.4, 10.5, 10.6
│   ├── Compatibility: MySQL drop-in replacement
│   ├── Storage Engines: InnoDB, MyISAM, Aria
│   ├── Galera Cluster: Multi-master replication
│   └── ColumnStore: Analytical workloads

class RDSOptimizer:
    def __init__(self):
        self.performance_analyzer = RDSPerformanceAnalyzer()
        self.cost_optimizer = RDSCostOptimizer()
        self.security_hardener = RDSSecurityHardener()

    def optimize_rds_deployment(self, database_requirements):
        """Optimize RDS deployment for performance, cost, and availability"""

        # Instance class selection
        instance_recommendation = {
            'db_instance_class': self.select_optimal_instance_class(database_requirements),
            'alternatives': self.get_alternative_instance_classes(database_requirements),
            'reasoning': self.explain_instance_selection(database_requirements)
        }

        # Database configuration
        db_config = {
            'db_instance_identifier': database_requirements.db_instance_name,
            'db_instance_class': instance_recommendation['db_instance_class'],
            'engine': database_requirements.engine,
            'engine_version': self.select_optimal_engine_version(database_requirements),
            'allocated_storage': self.calculate_storage_requirements(database_requirements),
            'storage_type': self.select_storage_type(database_requirements),
            'storage_encrypted': True,
            'kms_key_id': database_requirements.kms_key_id,
            'vpc_security_group_ids': [self.create_db_security_group(database_requirements)],
            'db_subnet_group_name': database_requirements.db_subnet_group,
            'publicly_accessible': False,
            'multi_az': database_requirements.high_availability,
            'backup_retention_period': database_requirements.backup_retention_days,
            'backup_window': database_requirements.backup_window,
            'maintenance_window': database_requirements.maintenance_window,
            'auto_minor_version_upgrade': database_requirements.auto_minor_version_upgrade,
            'deletion_protection': database_requirements.deletion_protection
        }

        # Performance optimization
        performance_config = {
            'parameter_group': {
                'name': f"{database_requirements.db_instance_name}-params",
                'family': f"{database_requirements.engine}{self.get_parameter_group_version(database_requirements.engine)}",
                'parameters': self.generate_optimized_parameters(database_requirements)
            },
            'option_group': self.create_option_group(database_requirements) if database_requirements.engine in ['oracle-ee', 'sql-server'] else None,
            'performance_insights': {
                'enabled': True,
                'retention_period': 7,  # Free tier: 7 days, Paid: up to 2 years
                'kms_key_id': database_requirements.performance_insights_kms_key
            },
            'enhanced_monitoring': {
                'enabled': True,
                'monitoring_interval': 60,
                'monitoring_role_arn': database_requirements.enhanced_monitoring_role
            }
        }

        # Read replica configuration
        read_replica_config = None
        if database_requirements.read_workload_percentage > 30:
            read_replica_config = {
                'read_replicas': [
                    {
                        'db_instance_identifier': f"{database_requirements.db_instance_name}-replica-{i}",
                        'db_instance_class': self.select_read_replica_instance_class(database_requirements),
                        'availability_zone': az,
                        'publicly_accessible': False,
                        'auto_minor_version_upgrade': True
                    }
                    for i, az in enumerate(database_requirements.read_replica_azs, 1)
                ],
                'connection_pooling': {
                    'enabled': True,
                    'proxy_name': f"{database_requirements.db_instance_name}-proxy",
                    'target_group_name': 'read-replicas',
                    'max_connections_percent': 80,
                    'max_idle_connections_percent': 10
                }
            }

        # Backup and disaster recovery
        backup_strategy = {
            'automated_backups': {
                'retention_period': database_requirements.backup_retention_days,
                'backup_window': database_requirements.backup_window,
                'copy_tags_to_snapshot': True,
                'delete_automated_backups': False
            },
            'manual_snapshots': {
                'frequency': 'weekly',
                'retention': '1 year',
                'cross_region_copy': database_requirements.cross_region_backup,
                'destination_region': database_requirements.backup_region
            },
            'point_in_time_recovery': {
                'enabled': True,
                'recovery_window': database_requirements.backup_retention_days
            }
        }

        return RDSOptimizationPlan(
            instance_config=db_config,
            performance_config=performance_config,
            read_replica_config=read_replica_config,
            backup_strategy=backup_strategy,
            monitoring_setup=self.design_rds_monitoring(),
            cost_optimization=self.analyze_rds_cost_optimization(database_requirements)
        )

    def optimize_aurora_deployment(self, aurora_requirements):
        """Optimize Aurora deployment for serverless and provisioned modes"""

        if aurora_requirements.workload_pattern == 'variable':
            # Aurora Serverless v2 configuration
            serverless_config = {
                'engine': 'aurora-mysql' if aurora_requirements.engine_family == 'mysql' else 'aurora-postgresql',
                'engine_mode': 'serverless',
                'scaling_configuration': {
                    'min_capacity': aurora_requirements.min_acu,
                    'max_capacity': aurora_requirements.max_acu,
                    'auto_pause': aurora_requirements.auto_pause_enabled,
                    'seconds_until_auto_pause': aurora_requirements.auto_pause_delay,
                    'timeout_action': 'ForceApplyCapacityChange',
                    'seconds_before_timeout': 300
                },
                'http_endpoint_enabled': aurora_requirements.data_api_enabled,
                'enable_cloudwatch_logs_exports': ['error', 'general', 'slowquery']
            }
            return AuroraServerlessOptimization(serverless_config)

        else:
            # Aurora Provisioned configuration
            provisioned_config = {
                'cluster_identifier': aurora_requirements.cluster_name,
                'engine': 'aurora-mysql' if aurora_requirements.engine_family == 'mysql' else 'aurora-postgresql',
                'engine_version': self.select_aurora_engine_version(aurora_requirements),
                'master_username': aurora_requirements.master_username,
                'manage_master_user_password': True,
                'master_user_secret_kms_key_id': aurora_requirements.master_password_kms_key,
                'database_name': aurora_requirements.initial_database_name,
                'vpc_security_group_ids': [self.create_aurora_security_group(aurora_requirements)],
                'db_subnet_group_name': aurora_requirements.db_subnet_group,
                'backup_retention_period': aurora_requirements.backup_retention_days,
                'preferred_backup_window': aurora_requirements.backup_window,
                'preferred_maintenance_window': aurora_requirements.maintenance_window,
                'storage_encrypted': True,
                'kms_key_id': aurora_requirements.storage_kms_key,
                'deletion_protection': aurora_requirements.deletion_protection,
                'enable_cloudwatch_logs_exports': ['audit', 'error', 'general', 'slowquery']
            }

            # Cluster instances
            cluster_instances = [
                {
                    'identifier': f"{aurora_requirements.cluster_name}-writer",
                    'instance_class': aurora_requirements.writer_instance_class,
                    'engine': provisioned_config['engine'],
                    'publicly_accessible': False,
                    'availability_zone': aurora_requirements.writer_az,
                    'promotion_tier': 0
                }
            ]

            # Read replicas
            for i, reader_az in enumerate(aurora_requirements.reader_azs, 1):
                cluster_instances.append({
                    'identifier': f"{aurora_requirements.cluster_name}-reader-{i}",
                    'instance_class': aurora_requirements.reader_instance_class,
                    'engine': provisioned_config['engine'],
                    'publicly_accessible': False,
                    'availability_zone': reader_az,
                    'promotion_tier': i
                })

            # Global database configuration
            global_cluster_config = None
            if aurora_requirements.global_database:
                global_cluster_config = {
                    'global_cluster_identifier': f"{aurora_requirements.cluster_name}-global",
                    'engine': provisioned_config['engine'],
                    'engine_version': provisioned_config['engine_version'],
                    'storage_encrypted': True,
                    'deletion_protection': True,
                    'secondary_clusters': [
                        {
                            'region': region,
                            'instance_class': aurora_requirements.global_replica_instance_class
                        }
                        for region in aurora_requirements.global_regions
                    ]
                }

            return AuroraProvisionedOptimization(
                cluster_config=provisioned_config,
                instances=cluster_instances,
                global_cluster=global_cluster_config,
                monitoring_setup=self.design_aurora_monitoring()
            )

Aurora Advanced Features:

Aurora Parallel Query:
├── Use Case: Analytical queries on operational data
├── Benefits: 100x faster analytical queries
├── Requirements: Aurora MySQL 5.7+, specific instance classes
├── Workload Types: Reports, analytics, ETL operations
└── Cost: Additional charges for parallel query processing

Aurora Multi-Master:
├── Multiple Write Instances: Active-active configuration
├── Conflict Detection: Built-in conflict resolution
├── Use Cases: Write-intensive applications, global applications
├── Limitations: MySQL 5.7 only, specific regions
└── Complexity: Application-level conflict handling required

Aurora Serverless Data API:
├── HTTP-based Database Access: RESTful database operations
├── Connection Pooling: Automatic connection management
├── JSON Response Format: Native JSON support
├── Integration: AWS Lambda, AppSync, other services
└── Use Cases: Serverless applications, microservices
```

#### **DynamoDB and NoSQL Optimization**

```
Amazon DynamoDB Architecture:

DynamoDB Core Concepts and Optimization:
├── Table Design:
│   ├── Partition Key: Data distribution across partitions
│   ├── Sort Key: Item ordering within partition
│   ├── Composite Keys: Partition key + sort key combinations
│   ├── Item Size Limit: 400 KB maximum item size
│   └── Attribute Types: Scalar, document, set types

├── Capacity Modes:
│   ├── On-Demand:
│   │   ├── Pay-per-request pricing model
│   │   ├── Automatic scaling up to 40,000 RCU/WCU
│   │   ├── No capacity planning required
│   │   ├── Higher per-request cost
│   │   └── Ideal for unpredictable workloads
│   └── Provisioned:
│       ├── Pre-allocated read/write capacity
│       ├── Auto-scaling available
│       ├── Reserved capacity options
│       ├── Lower per-request cost at scale
│       └── Requires capacity planning

├── Global Tables:
│   ├── Multi-Region Replication: Automatic cross-region replication
│   ├── Eventually Consistent: Last writer wins conflict resolution
│   ├── Global Secondary Indexes: Replicated across regions
│   ├── Point-in-Time Recovery: Per-region recovery
│   └── Encryption: Per-region encryption keys

class DynamoDBOptimizer:
    def __init__(self):
        self.table_designer = DynamoDBTableDesigner()
        self.capacity_optimizer = DynamoDBCapacityOptimizer()
        self.access_pattern_analyzer = DynamoDBAccessPatternAnalyzer()

    def optimize_dynamodb_design(self, application_requirements):
        """Optimize DynamoDB table design for access patterns and cost"""

        # Analyze access patterns
        access_patterns = self.access_pattern_analyzer.analyze(application_requirements.queries)

        # Table design optimization
        table_design = {
            'table_name': application_requirements.table_name,
            'partition_key': self.select_optimal_partition_key(access_patterns),
            'sort_key': self.select_optimal_sort_key(access_patterns),
            'attribute_definitions': self.define_key_attributes(access_patterns),
            'billing_mode': self.select_billing_mode(application_requirements.workload_characteristics),
            'stream_specification': {
                'stream_enabled': application_requirements.enable_streams,
                'stream_view_type': 'NEW_AND_OLD_IMAGES' if application_requirements.enable_streams else None
            },
            'sse_specification': {
                'enabled': True,
                'sse_type': application_requirements.encryption_type,
                'kms_master_key_id': application_requirements.kms_key_id if application_requirements.encryption_type == 'KMS' else None
            },
            'point_in_time_recovery_enabled': application_requirements.enable_pitr,
            'deletion_protection_enabled': application_requirements.deletion_protection
        }

        # Capacity configuration
        if table_design['billing_mode'] == 'PROVISIONED':
            capacity_config = {
                'read_capacity_units': self.calculate_read_capacity(access_patterns),
                'write_capacity_units': self.calculate_write_capacity(access_patterns),
                'auto_scaling_settings': {
                    'read_capacity_auto_scaling': {
                        'min_capacity': application_requirements.min_read_capacity,
                        'max_capacity': application_requirements.max_read_capacity,
                        'target_tracking_scaling_policy': {
                            'target_utilization': 70,
                            'scale_in_cooldown': 60,
                            'scale_out_cooldown': 60
                        }
                    },
                    'write_capacity_auto_scaling': {
                        'min_capacity': application_requirements.min_write_capacity,
                        'max_capacity': application_requirements.max_write_capacity,
                        'target_tracking_scaling_policy': {
                            'target_utilization': 70,
                            'scale_in_cooldown': 60,
                            'scale_out_cooldown': 60
                        }
                    }
                }
            }
            table_design.update(capacity_config)

        # Global Secondary Indexes
        gsi_recommendations = []
        for pattern in access_patterns.gsi_patterns:
            gsi = {
                'index_name': f"GSI_{pattern.access_pattern_name}",
                'partition_key': pattern.gsi_partition_key,
                'sort_key': pattern.gsi_sort_key,
                'projection': {
                    'projection_type': self.determine_projection_type(pattern),
                    'non_key_attributes': pattern.projected_attributes if pattern.projected_attributes else None
                }
            }

            if table_design['billing_mode'] == 'PROVISIONED':
                gsi.update({
                    'provisioned_throughput': {
                        'read_capacity_units': self.calculate_gsi_read_capacity(pattern),
                        'write_capacity_units': self.calculate_gsi_write_capacity(pattern)
                    }
                })

            gsi_recommendations.append(gsi)

        # Local Secondary Indexes
        lsi_recommendations = []
        for pattern in access_patterns.lsi_patterns:
            lsi = {
                'index_name': f"LSI_{pattern.access_pattern_name}",
                'sort_key': pattern.lsi_sort_key,
                'projection': {
                    'projection_type': self.determine_projection_type(pattern),
                    'non_key_attributes': pattern.projected_attributes if pattern.projected_attributes else None
                }
            }
            lsi_recommendations.append(lsi)

        # Data modeling recommendations
        data_modeling = {
            'item_design': {
                'attribute_naming': 'snake_case',
                'sparse_indexes': self.identify_sparse_index_opportunities(access_patterns),
                'composite_attributes': self.suggest_composite_attributes(access_patterns),
                'hierarchical_data': self.design_hierarchical_structure(access_patterns)
            },
            'query_optimization': {
                'batch_operations': self.suggest_batch_operations(access_patterns),
                'pagination_strategy': self.design_pagination_strategy(access_patterns),
                'filter_expressions': self.optimize_filter_expressions(access_patterns),
                'projection_expressions': self.optimize_projections(access_patterns)
            },
            'anti_patterns': {
                'hot_partitions': self.detect_hot_partition_risk(access_patterns),
                'large_items': self.detect_large_item_risk(access_patterns),
                'scan_operations': self.detect_scan_usage(access_patterns),
                'eventually_consistent_reads': self.analyze_consistency_requirements(access_patterns)
            }
        }

        return DynamoDBOptimizationPlan(
            table_design=table_design,
            global_secondary_indexes=gsi_recommendations,
            local_secondary_indexes=lsi_recommendations,
            data_modeling=data_modeling,
            cost_analysis=self.analyze_dynamodb_costs(table_design, access_patterns),
            monitoring_setup=self.design_dynamodb_monitoring()
        )

    def design_global_table_architecture(self, global_requirements):
        """Design DynamoDB Global Tables for multi-region applications"""

        global_table_config = {
            'table_name': global_requirements.table_name,
            'billing_mode': 'ON_DEMAND',  # Recommended for global tables
            'stream_specification': {
                'stream_enabled': True,
                'stream_view_type': 'NEW_AND_OLD_IMAGES'
            },
            'regions': []
        }

        # Regional configuration
        for region in global_requirements.regions:
            region_config = {
                'region_name': region['name'],
                'point_in_time_recovery_enabled': True,
                'deletion_protection_enabled': global_requirements.deletion_protection,
                'contributor_insights_enabled': global_requirements.enable_contributor_insights,
                'tags': {
                    'Environment': global_requirements.environment,
                    'Region': region['name'],
                    'GlobalTable': global_requirements.table_name
                }
            }

            # Region-specific encryption
            if region.get('kms_key_id'):
                region_config['sse_specification'] = {
                    'enabled': True,
                    'sse_type': 'KMS',
                    'kms_master_key_id': region['kms_key_id']
                }

            global_table_config['regions'].append(region_config)

        # Global secondary indexes
        global_indexes = []
        for gsi in global_requirements.global_secondary_indexes:
            global_gsi = {
                'index_name': gsi['name'],
                'partition_key': gsi['partition_key'],
                'sort_key': gsi['sort_key'],
                'projection': gsi['projection'],
                'replicated_across_regions': True
            }
            global_indexes.append(global_gsi)

        # Conflict resolution strategy
        conflict_resolution = {
            'last_writer_wins': True,  # DynamoDB Global Tables default
            'application_level_resolution': global_requirements.custom_conflict_resolution,
            'versioning_strategy': global_requirements.versioning_strategy,
            'timestamp_attribute': global_requirements.timestamp_attribute
        }

        return GlobalTableArchitecture(
            global_config=global_table_config,
            global_indexes=global_indexes,
            conflict_resolution=conflict_resolution,
            monitoring_strategy=self.design_global_table_monitoring()
        )

DynamoDB Advanced Patterns:

Single Table Design:
├── Entity Modeling: Multiple entity types in one table
├── Composite Keys: Hierarchical data relationships
├── Overloaded Attributes: Flexible attribute usage
├── Access Pattern Optimization: Design for query patterns
├── GSI Overloading: Multiple access patterns per GSI
└── Data Duplication: Strategic denormalization

DynamoDB Accelerator (DAX):
├── Microsecond Latency: In-memory caching layer
├── Write-Through Cache: Automatic cache population
├── Cluster Configuration: Multi-AZ deployment
├── Security: VPC deployment, encryption in transit
├── Monitoring: CloudWatch metrics and alarms
└── Use Cases: Read-heavy workloads, gaming, ad tech

DynamoDB Streams and Event Processing:
├── Stream Records: Item-level changes capture
├── Lambda Integration: Real-time stream processing
├── Kinesis Integration: Stream data to analytics
├── Cross-Region Replication: Custom replication logic
├── Aggregation Patterns: Real-time aggregations
└── Event Sourcing: Audit trail and state reconstruction
```

This comprehensive AWS platform expertise provides HeadElf with deep knowledge of all major AWS services, their architectures, optimization techniques, and best practices for production deployments.

## Outputs
- AWS service recommendations optimized for specific use cases and requirements
- Multi-service architecture designs following AWS Well-Architected Framework
- Cost optimization strategies across all AWS service categories
- Security and compliance configurations for AWS workloads
- Performance optimization techniques for AWS infrastructure and applications