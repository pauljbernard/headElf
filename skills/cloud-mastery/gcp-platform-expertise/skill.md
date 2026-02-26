# Google Cloud Platform (GCP) Expertise

## Description
Expert-level knowledge of Google Cloud Platform covering all major service categories including compute, storage, networking, databases, security, analytics, AI/ML, IoT, and management tools with deep understanding of service architectures, cost optimization, security best practices, and multi-cloud deployment strategies.

## When to Use
- Designing comprehensive GCP cloud architectures for any scale
- Optimizing GCP deployments for cost, performance, and security
- Implementing Google Cloud best practices and Well-Architected principles
- Selecting optimal GCP services for specific requirements
- Designing data analytics and AI/ML solutions on Google Cloud

## Instructions

You are a Google Cloud Solutions Architect Expert with comprehensive knowledge of all GCP services, their internal architectures, integration patterns, cost optimization strategies, and production best practices across all domains from startups to enterprise-scale deployments.

### GCP Compute Services Expertise

#### **Compute Engine and Managed Instance Groups**

```
Compute Engine Architecture:

Machine Types and Families:
├── General Purpose:
│   ├── E2: Cost-optimized, balanced compute and memory
│   │   ├── CPU: Intel Skylake, Broadwell, Haswell processors
│   │   ├── vCPUs: 2-32 vCPUs, shared-core options (e2-micro, e2-small)
│   │   ├── Memory: 1-128 GB RAM
│   │   ├── Use Cases: Web servers, small/medium databases, dev/test
│   │   └── Features: Custom machine types, preemptible instances
│   │
│   ├── N2: Balanced performance for general workloads
│   │   ├── CPU: 2nd generation Intel Xeon Scalable (Cascade Lake)
│   │   ├── vCPUs: 2-80 vCPUs
│   │   ├── Memory: 1-640 GB RAM
│   │   ├── Use Cases: Web frontend, microservices, enterprise applications
│   │   └── Features: Custom machine types, live migration
│   │
│   ├── N2D: AMD-based balanced performance
│   │   ├── CPU: 2nd generation AMD EPYC Rome processors
│   │   ├── vCPUs: 2-224 vCPUs
│   │   ├── Memory: 1-896 GB RAM
│   │   ├── Use Cases: General purpose workloads, cost optimization
│   │   └── Features: Higher core counts, competitive pricing
│   │
│   └── T2D: Scale-out optimized
│       ├── CPU: 3rd generation AMD EPYC Milan processors
│       ├── vCPUs: 1-60 vCPUs
│       ├── Memory: 1-240 GB RAM
│       ├── Use Cases: Scale-out workloads, containerized applications
│       └── Features: High performance per dollar

├── Compute Optimized:
│   ├── C2: Ultra-high performance for compute-intensive workloads
│   │   ├── CPU: Intel Xeon Scalable (Cascade Lake)
│   │   ├── vCPUs: 4-60 vCPUs
│   │   ├── Memory: 4-240 GB RAM
│   │   ├── Use Cases: HPC, scientific computing, gaming
│   │   └── Features: 3.8 GHz sustained all-core turbo
│   │
│   └── C2D: AMD-based compute optimized
│       ├── CPU: 3rd generation AMD EPYC Milan processors
│       ├── vCPUs: 2-112 vCPUs
│       ├── Memory: 1-448 GB RAM
│       ├── Use Cases: CPU-intensive workloads, HPC
│       └── Features: High core density, cost-effective performance

├── Memory Optimized:
│   ├── M2: Ultra-high memory for memory-intensive workloads
│   │   ├── CPU: Intel Xeon Scalable (Cascade Lake)
│   │   ├── vCPUs: 12-128 vCPUs
│   │   ├── Memory: 85-3844 GB RAM (high memory ratios)
│   │   ├── Use Cases: SAP HANA, Apache Spark, in-memory databases
│   │   └── Features: Up to 12 TB RAM, optimized for memory bandwidth
│   │
│   ├── M1: High memory workloads
│   │   ├── CPU: Intel Xeon E5 v4 (Broadwell)
│   │   ├── vCPUs: 40-96 vCPUs
│   │   ├── Memory: 961-1433 GB RAM
│   │   ├── Use Cases: SAP applications, analytics workloads
│   │   └── Features: Large memory configurations
│   │
│   └── A2: GPU-attached high memory
│       ├── CPU: Intel Xeon Scalable processors
│       ├── GPU: NVIDIA A100 Tensor Core GPUs
│       ├── vCPUs: 12-96 vCPUs
│       ├── Memory: 85-1360 GB RAM
│       └── Use Cases: ML training, HPC with GPU acceleration

├── Accelerator Optimized:
│   ├── A2: NVIDIA A100 GPU instances
│   │   ├── GPU: NVIDIA A100 40GB/80GB
│   │   ├── GPU Count: 1, 2, 4, 8, 16 GPUs
│   │   ├── CPU: Intel Xeon Scalable
│   │   ├── Use Cases: AI/ML training, HPC simulations
│   │   └── Features: NVLink, high-bandwidth memory
│   │
│   └── N1 + GPU: Flexible GPU attachment
│       ├── GPU Options: K80, P4, P100, V100, T4
│       ├── GPU Count: 1-8 GPUs per instance
│       ├── CPU: Intel Xeon E5 v4 (Broadwell)
│       ├── Use Cases: ML inference, graphics rendering
│       └── Features: Custom GPU configurations

Storage Options:
├── Persistent Disks:
│   ├── Zonal PD Standard:
│   │   ├── Type: HDD-based persistent storage
│   │   ├── Performance: Up to 3,000 read IOPS, 15,000 write IOPS
│   │   ├── Size: 10 GB - 64 TB
│   │   ├── Use Cases: Big data, backup, archival
│   │   └── Cost: Lowest cost per GB
│   │
│   ├── Zonal PD Balanced:
│   │   ├── Type: SSD-based persistent storage
│   │   ├── Performance: Up to 6,000 read IOPS, 6,000 write IOPS per GB
│   │   ├── Size: 10 GB - 64 TB
│   │   ├── Use Cases: General purpose, databases
│   │   └── Features: Balance of performance and cost
│   │
│   ├── Zonal PD SSD:
│   │   ├── Type: High-performance SSD storage
│   │   ├── Performance: Up to 100,000 IOPS, 2,400 MB/s throughput
│   │   ├── Size: 10 GB - 64 TB
│   │   ├── Use Cases: High-performance databases, analytics
│   │   └── Features: Consistent high performance
│   │
│   ├── Regional Persistent Disks:
│   │   ├── Replication: Synchronous replication across zones
│   │   ├── Availability: 99.999% availability SLA
│   │   ├── Performance: Similar to zonal disks with replication
│   │   ├── Use Cases: High availability databases
│   │   └── Features: Automatic failover, disaster recovery
│   │
│   └── Extreme Persistent Disks:
│       ├── Type: Ultra-high performance SSD
│       ├── Performance: Up to 120,000 IOPS, 2,400 MB/s
│       ├── Size: 500 GB - 64 TB
│       ├── IOPS Provisioning: Independent IOPS provisioning
│       └── Use Cases: Mission-critical databases, analytics

├── Local SSDs:
│   ├── Performance: Up to 2.4M IOPS, 6.6 GB/s throughput
│   ├── Size: 375 GB per device, up to 24 devices (9 TB total)
│   ├── Characteristics: Ephemeral, high-performance storage
│   ├── Use Cases: Caching, temporary processing, high-IOPS databases
│   └── Features: NVMe interface, locally attached

class GCPComputeOptimizer:
    def __init__(self):
        self.machine_type_analyzer = GCPMachineTypeAnalyzer()
        self.cost_optimizer = GCPComputeCostOptimizer()
        self.performance_optimizer = GCPComputePerformanceOptimizer()

    def optimize_compute_engine_deployment(self, compute_requirements):
        """Optimize Compute Engine deployment for performance, cost, and availability"""

        # Machine type selection
        machine_type_recommendation = {
            'primary_machine_type': self.select_optimal_machine_type(compute_requirements),
            'alternative_types': self.get_alternative_machine_types(compute_requirements),
            'custom_machine_type': self.design_custom_machine_type(compute_requirements),
            'reasoning': self.explain_machine_type_selection(compute_requirements)
        }

        # Instance configuration
        instance_config = {
            'name': compute_requirements.instance_name,
            'zone': compute_requirements.zone,
            'machine_type': machine_type_recommendation['primary_machine_type'],
            'boot_disk': {
                'image_family': compute_requirements.image_family,
                'image_project': compute_requirements.image_project,
                'disk_type': self.select_boot_disk_type(compute_requirements),
                'disk_size_gb': self.calculate_boot_disk_size(compute_requirements),
                'auto_delete': True
            },
            'additional_disks': self.design_additional_disks(compute_requirements),
            'network_interfaces': [
                {
                    'network': compute_requirements.vpc_network,
                    'subnetwork': compute_requirements.subnetwork,
                    'access_configs': [
                        {'type': 'ONE_TO_ONE_NAT', 'name': 'External NAT'}
                    ] if compute_requirements.external_ip_required else [],
                    'ip_forwarding': compute_requirements.ip_forwarding_enabled
                }
            ],
            'service_accounts': [
                {
                    'email': compute_requirements.service_account_email,
                    'scopes': compute_requirements.service_account_scopes
                }
            ],
            'metadata': {
                'startup-script': compute_requirements.startup_script,
                'enable-oslogin': 'TRUE',
                'ssh-keys': compute_requirements.ssh_keys
            },
            'tags': {
                'items': compute_requirements.network_tags
            },
            'labels': compute_requirements.labels,
            'scheduling': {
                'preemptible': compute_requirements.use_preemptible,
                'on_host_maintenance': 'MIGRATE' if not compute_requirements.use_preemptible else 'TERMINATE',
                'automatic_restart': not compute_requirements.use_preemptible
            }
        }

        # GPU configuration
        if compute_requirements.gpu_required:
            instance_config['guest_accelerators'] = [
                {
                    'accelerator_type': compute_requirements.gpu_type,
                    'accelerator_count': compute_requirements.gpu_count
                }
            ]
            instance_config['scheduling']['on_host_maintenance'] = 'TERMINATE'

        # Managed Instance Group configuration
        mig_config = None
        if compute_requirements.auto_scaling_required:
            mig_config = {
                'name': f"{compute_requirements.instance_name}-mig",
                'base_instance_name': compute_requirements.instance_name,
                'instance_template': instance_config,
                'target_size': compute_requirements.initial_size,
                'zone': compute_requirements.zone,
                'auto_healing_policies': [
                    {
                        'health_check': compute_requirements.health_check_url,
                        'initial_delay_sec': 300
                    }
                ],
                'update_policy': {
                    'type': 'PROACTIVE',
                    'instance_redistribution_type': 'PROACTIVE',
                    'minimal_action': 'REPLACE',
                    'max_surge': {
                        'fixed': 3
                    },
                    'max_unavailable': {
                        'fixed': 0
                    }
                },
                'autoscaler': {
                    'autoscaling_policy': {
                        'min_num_replicas': compute_requirements.min_instances,
                        'max_num_replicas': compute_requirements.max_instances,
                        'cpu_utilization': {
                            'utilization_target': 0.7
                        },
                        'load_balancing_utilization': {
                            'utilization_target': 0.8
                        },
                        'custom_metric_utilizations': compute_requirements.custom_metrics
                    }
                }
            }

        # Regional Managed Instance Group for multi-zone deployment
        regional_mig_config = None
        if compute_requirements.multi_zone_deployment:
            regional_mig_config = {
                'name': f"{compute_requirements.instance_name}-regional-mig",
                'base_instance_name': compute_requirements.instance_name,
                'instance_template': instance_config,
                'region': compute_requirements.region,
                'distribution_policy': {
                    'zones': [
                        {'zone': zone} for zone in compute_requirements.zones
                    ],
                    'target_shape': 'EVEN'
                },
                'target_size': compute_requirements.initial_size,
                'auto_healing_policies': [
                    {
                        'health_check': compute_requirements.health_check_url,
                        'initial_delay_sec': 300
                    }
                ]
            }

        # Spot/Preemptible instance optimization
        spot_config = None
        if compute_requirements.use_spot_instances:
            spot_config = {
                'provisioning_model': 'SPOT',
                'instance_termination_action': 'DELETE',
                'max_run_duration': compute_requirements.max_spot_duration,
                'termination_time': None,  # No fixed termination time
                'preemption_handling': {
                    'shutdown_script': compute_requirements.preemption_script,
                    'grace_period_seconds': 30
                }
            }

        # Performance optimization recommendations
        performance_optimization = {
            'cpu_platform': self.select_cpu_platform(compute_requirements),
            'numa_node_affinity': compute_requirements.numa_affinity_enabled,
            'threads_per_core': compute_requirements.threads_per_core,
            'enable_ip_forwarding': compute_requirements.ip_forwarding_enabled,
            'can_ip_forward': compute_requirements.ip_forwarding_enabled,
            'network_performance_config': {
                'total_egress_bandwidth_tier': 'DEFAULT'
            }
        }

        return GCPComputeOptimizationPlan(
            instance_config=instance_config,
            mig_config=mig_config,
            regional_mig_config=regional_mig_config,
            spot_config=spot_config,
            performance_optimization=performance_optimization,
            cost_analysis=self.analyze_compute_costs(instance_config),
            monitoring_setup=self.design_compute_monitoring()
        )

    def design_availability_architecture(self, availability_requirements):
        """Design high availability architecture for Compute Engine"""

        availability_strategies = {
            'single_zone_ha': {
                'strategy': 'Multiple instances in single zone',
                'configuration': {
                    'instance_count': availability_requirements.instance_count,
                    'load_balancer': {
                        'type': 'HTTP(S) Load Balancer' if availability_requirements.global_lb else 'Network Load Balancer',
                        'backend_service': {
                            'protocol': availability_requirements.protocol,
                            'port': availability_requirements.port,
                            'health_check': availability_requirements.health_check_config
                        }
                    }
                }
            },
            'multi_zone_ha': {
                'strategy': 'Distribute instances across zones in region',
                'configuration': {
                    'regional_mig': True,
                    'zones': availability_requirements.zones,
                    'distribution_policy': 'EVEN',
                    'load_balancer': {
                        'type': 'HTTP(S) Load Balancer',
                        'backend_service': {
                            'locality_lb_policy': 'ROUND_ROBIN',
                            'failover_policy': {
                                'disable_connection_drain_on_failover': False,
                                'drop_traffic_if_unhealthy': False,
                                'failover_ratio': 0.1
                            }
                        }
                    }
                }
            },
            'multi_region_dr': {
                'strategy': 'Primary region with disaster recovery region',
                'configuration': {
                    'primary_region': availability_requirements.primary_region,
                    'dr_region': availability_requirements.dr_region,
                    'traffic_director': {
                        'enabled': True,
                        'routing_rules': [
                            {
                                'priority': 1,
                                'match_rules': {'path_exact': '/health'},
                                'route_action': {'weighted_backend_services': [
                                    {'backend_service': 'primary-backend', 'weight': 100}
                                ]}
                            }
                        ],
                        'failover_policy': {
                            'disable_connection_drain_on_failover': True,
                            'drop_traffic_if_unhealthy': True
                        }
                    },
                    'data_replication': {
                        'persistent_disks': 'Regional persistent disks',
                        'database_replication': 'Cross-region read replicas',
                        'backup_strategy': 'Multi-region backup storage'
                    }
                }
            }
        }

        return availability_strategies

Compute Engine Advanced Features:

Live Migration:
├── Zero Downtime: Maintenance without VM restart
├── Host Maintenance: Automatic migration during host maintenance
├── Performance Impact: Minimal performance impact during migration
├── Instance Types: Supported on most instance types
├── Custom Images: Support for custom images with guest OS
└── Limitations: Not supported on GPU instances, preemptible instances

Custom Machine Types:
├── vCPU Range: 1-96 vCPUs (N1), up to 224 vCPUs (N2D)
├── Memory Range: 0.9-6.5 GB per vCPU
├── Extended Memory: Up to 8 GB per vCPU for memory-intensive workloads
├── Cost Optimization: Pay only for resources you need
├── Use Cases: Workloads with specific CPU/memory ratios
└── Limitations: Fixed ratios between vCPUs and memory

Sole-Tenant Nodes:
├── Dedicated Hardware: Physical isolation for compliance
├── Node Templates: Reusable node configurations
├── Instance Placement: Control VM placement on physical hardware
├── License Benefits: Bring your own license (BYOL)
├── Maintenance Control: Control over maintenance schedules
└── Use Cases: Compliance, licensing, performance isolation
```

#### **Google Kubernetes Engine (GKE)**

```
Google Kubernetes Engine Architecture:

GKE Cluster Types:
├── Standard Cluster:
│   ├── Full Kubernetes API: Complete Kubernetes functionality
│   ├── Node Management: Manual node pool management
│   ├── Control Plane: Managed by Google
│   ├── Customization: Full cluster customization
│   ├── Networking: Advanced networking options
│   ├── Security: Comprehensive security controls
│   └── Use Cases: Production workloads, complex applications

├── Autopilot Cluster:
│   ├── Fully Managed: Google manages nodes and infrastructure
│   ├── Pod-based Pricing: Pay per pod resource consumption
│   ├── Security Hardened: Built-in security best practices
│   ├── Automatic Scaling: Node provisioning based on pod requirements
│   ├── Optimized Configuration: Pre-configured for production
│   ├── Simplified Operations: Reduced operational overhead
│   └── Use Cases: Simplified Kubernetes, development workloads

Node Pool Configuration:
├── Machine Types:
│   ├── Standard: E2, N1, N2, N2D general purpose machines
│   ├── High-CPU: C2, C2D compute-optimized machines
│   ├── High-Memory: M1, M2 memory-optimized machines
│   ├── GPU-enabled: Machines with attached GPUs
│   ├── Spot Instances: Preemptible instances for cost savings
│   └── Custom: Custom machine type configurations

├── Node Pool Features:
│   ├── Auto-scaling: Horizontal pod autoscaling
│   ├── Auto-upgrade: Automatic node OS and Kubernetes upgrades
│   ├── Auto-repair: Automatic unhealthy node replacement
│   ├── Preemptible Nodes: Spot pricing for fault-tolerant workloads
│   ├── Local SSDs: High-performance local storage
│   └── Taints and Labels: Node scheduling constraints

Networking Options:
├── VPC-native Cluster:
│   ├── Alias IP Ranges: Pods get IP addresses from VPC
│   ├── Direct VPC Integration: Pods communicate directly with VPC resources
│   ├── Network Policies: Kubernetes network policies support
│   ├── Private Cluster: Private node IP addresses
│   ├── Authorized Networks: Control plane access restrictions
│   └── IP Address Management: Efficient IP address allocation

├── Routes-based Cluster:
│   ├── Legacy Networking: Routes-based pod networking
│   ├── Limited Scalability: Lower pod density per node
│   ├── No Network Policies: Limited network security
│   ├── Simple Configuration: Easier initial setup
│   └── Migration Path: Can migrate to VPC-native

class GKEOptimizer:
    def __init__(self):
        self.cluster_analyzer = GKEClusterAnalyzer()
        self.node_pool_optimizer = GKENodePoolOptimizer()
        self.workload_optimizer = GKEWorkloadOptimizer()

    def optimize_gke_deployment(self, kubernetes_requirements):
        """Optimize GKE deployment for production workloads"""

        # Cluster configuration
        cluster_config = {
            'name': kubernetes_requirements.cluster_name,
            'location': kubernetes_requirements.zone or kubernetes_requirements.region,
            'initial_node_count': 1,  # Will be managed by node pools
            'remove_default_node_pool': True,
            'network': kubernetes_requirements.vpc_network,
            'subnetwork': kubernetes_requirements.subnetwork,
            'ip_allocation_policy': {
                'use_ip_aliases': True,
                'cluster_secondary_range_name': kubernetes_requirements.pod_range_name,
                'services_secondary_range_name': kubernetes_requirements.service_range_name,
                'cluster_ipv4_cidr_block': kubernetes_requirements.pod_cidr,
                'services_ipv4_cidr_block': kubernetes_requirements.service_cidr
            },
            'private_cluster_config': {
                'enable_private_nodes': kubernetes_requirements.private_cluster,
                'enable_private_endpoint': kubernetes_requirements.private_endpoint,
                'master_ipv4_cidr_block': kubernetes_requirements.master_cidr
            },
            'master_authorized_networks_config': {
                'enabled': True,
                'cidr_blocks': [
                    {'cidr_block': cidr, 'display_name': name}
                    for cidr, name in kubernetes_requirements.authorized_networks.items()
                ]
            },
            'addons_config': {
                'http_load_balancing': {'disabled': False},
                'horizontal_pod_autoscaling': {'disabled': False},
                'kubernetes_dashboard': {'disabled': True},
                'network_policy_config': {'disabled': False},
                'istio_config': {
                    'disabled': not kubernetes_requirements.service_mesh_enabled,
                    'auth': 'AUTH_MUTUAL_TLS'
                },
                'dns_cache_config': {'enabled': True}
            },
            'network_policy': {
                'enabled': kubernetes_requirements.network_policies_enabled,
                'provider': 'CALICO'
            },
            'pod_security_policy_config': {
                'enabled': kubernetes_requirements.pod_security_policy_enabled
            },
            'binary_authorization': {
                'enabled': kubernetes_requirements.binary_authorization_enabled
            },
            'database_encryption': {
                'state': 'ENCRYPTED',
                'key_name': kubernetes_requirements.envelope_encryption_key
            } if kubernetes_requirements.envelope_encryption_enabled else None,
            'workload_identity_config': {
                'workload_pool': f"{kubernetes_requirements.project_id}.svc.id.goog"
            },
            'resource_usage_export_config': {
                'enable_network_egress_metering': True,
                'enable_resource_consumption_metering': True,
                'bigquery_destination': {
                    'dataset_id': kubernetes_requirements.usage_export_dataset
                }
            } if kubernetes_requirements.usage_export_enabled else None
        }

        # System node pool for critical system components
        system_node_pool = {
            'name': 'system-pool',
            'initial_node_count': 3,
            'locations': kubernetes_requirements.zones,
            'node_config': {
                'machine_type': 'e2-standard-4',
                'disk_type': 'pd-ssd',
                'disk_size_gb': 50,
                'image_type': 'COS_CONTAINERD',
                'oauth_scopes': [
                    'https://www.googleapis.com/auth/devstorage.read_only',
                    'https://www.googleapis.com/auth/logging.write',
                    'https://www.googleapis.com/auth/monitoring',
                    'https://www.googleapis.com/auth/servicecontrol',
                    'https://www.googleapis.com/auth/service.management.readonly',
                    'https://www.googleapis.com/auth/trace.append'
                ],
                'labels': {
                    'nodepool-type': 'system',
                    'environment': kubernetes_requirements.environment
                },
                'tags': ['gke-cluster', 'system-pool'],
                'metadata': {
                    'disable-legacy-endpoints': 'true'
                },
                'workload_metadata_config': {
                    'mode': 'GKE_METADATA'
                },
                'shielded_instance_config': {
                    'enable_secure_boot': True,
                    'enable_integrity_monitoring': True
                }
            },
            'node_pool_defaults': {
                'node_config_defaults': {
                    'gcfs_config': {
                        'enabled': kubernetes_requirements.image_streaming_enabled
                    }
                }
            },
            'autoscaling': {
                'enabled': True,
                'min_node_count': 3,
                'max_node_count': 10,
                'location_policy': 'BALANCED'
            },
            'management': {
                'auto_upgrade': True,
                'auto_repair': True
            }
        }

        # Application node pools
        app_node_pools = []

        # General application workloads
        general_app_pool = {
            'name': 'apps-pool',
            'initial_node_count': kubernetes_requirements.initial_app_node_count,
            'locations': kubernetes_requirements.zones,
            'node_config': {
                'machine_type': kubernetes_requirements.app_machine_type,
                'disk_type': 'pd-balanced',
                'disk_size_gb': 100,
                'image_type': 'COS_CONTAINERD',
                'labels': {
                    'nodepool-type': 'application',
                    'workload-type': 'general'
                },
                'taint': [],
                'oauth_scopes': [
                    'https://www.googleapis.com/auth/devstorage.read_only',
                    'https://www.googleapis.com/auth/logging.write',
                    'https://www.googleapis.com/auth/monitoring'
                ]
            },
            'autoscaling': {
                'enabled': True,
                'min_node_count': kubernetes_requirements.min_app_nodes,
                'max_node_count': kubernetes_requirements.max_app_nodes
            }
        }
        app_node_pools.append(general_app_pool)

        # Spot instance node pool for batch workloads
        if kubernetes_requirements.enable_spot_instances:
            spot_pool = {
                'name': 'spot-pool',
                'initial_node_count': 0,
                'locations': kubernetes_requirements.zones,
                'node_config': {
                    'machine_type': kubernetes_requirements.spot_machine_type,
                    'disk_type': 'pd-standard',
                    'disk_size_gb': 50,
                    'preemptible': True,
                    'labels': {
                        'nodepool-type': 'spot',
                        'workload-type': 'batch'
                    },
                    'taint': [
                        {
                            'key': 'cloud.google.com/gke-preemptible',
                            'value': 'true',
                            'effect': 'NO_SCHEDULE'
                        }
                    ]
                },
                'autoscaling': {
                    'enabled': True,
                    'min_node_count': 0,
                    'max_node_count': kubernetes_requirements.max_spot_nodes
                }
            }
            app_node_pools.append(spot_pool)

        # GPU node pool for ML workloads
        if kubernetes_requirements.gpu_workloads:
            gpu_pool = {
                'name': 'gpu-pool',
                'initial_node_count': 0,
                'locations': kubernetes_requirements.zones[:1],  # GPU availability limited
                'node_config': {
                    'machine_type': 'n1-standard-4',
                    'disk_type': 'pd-ssd',
                    'disk_size_gb': 100,
                    'guest_accelerator': [
                        {
                            'type': kubernetes_requirements.gpu_type,
                            'count': kubernetes_requirements.gpu_count_per_node,
                            'gpu_partition_size': None
                        }
                    ],
                    'labels': {
                        'nodepool-type': 'gpu',
                        'accelerator': kubernetes_requirements.gpu_type
                    },
                    'taint': [
                        {
                            'key': 'nvidia.com/gpu',
                            'value': 'present',
                            'effect': 'NO_SCHEDULE'
                        }
                    ]
                },
                'autoscaling': {
                    'enabled': True,
                    'min_node_count': 0,
                    'max_node_count': kubernetes_requirements.max_gpu_nodes
                }
            }
            app_node_pools.append(gpu_pool)

        # Security and compliance configuration
        security_config = {
            'workload_identity': {
                'enabled': True,
                'workload_pool': f"{kubernetes_requirements.project_id}.svc.id.goog"
            },
            'pod_security_policy': {
                'enabled': kubernetes_requirements.pod_security_policy_enabled
            },
            'private_cluster': {
                'enabled': kubernetes_requirements.private_cluster,
                'master_ipv4_cidr_block': kubernetes_requirements.master_cidr
            },
            'network_policy': {
                'enabled': kubernetes_requirements.network_policies_enabled,
                'provider': 'CALICO'
            },
            'binary_authorization': {
                'enabled': kubernetes_requirements.binary_authorization_enabled,
                'admission_whitelist_patterns': kubernetes_requirements.admission_whitelist
            },
            'shielded_nodes': {
                'enabled': True,
                'enable_secure_boot': True,
                'enable_integrity_monitoring': True
            }
        }

        # Monitoring and logging configuration
        monitoring_config = {
            'enable_cloud_logging': True,
            'enable_cloud_monitoring': True,
            'logging_service': 'logging.googleapis.com/kubernetes',
            'monitoring_service': 'monitoring.googleapis.com/kubernetes',
            'resource_usage_export_config': {
                'enable_network_egress_metering': True,
                'bigquery_destination': {
                    'dataset_id': kubernetes_requirements.usage_export_dataset
                }
            }
        }

        return GKEOptimizationPlan(
            cluster_config=cluster_config,
            system_node_pool=system_node_pool,
            app_node_pools=app_node_pools,
            security_config=security_config,
            monitoring_config=monitoring_config,
            cost_optimization=self.analyze_gke_costs(cluster_config, app_node_pools)
        )

    def design_gke_networking_architecture(self, networking_requirements):
        """Design GKE networking architecture"""

        networking_strategies = {
            'vpc_native_standard': {
                'description': 'Standard VPC-native cluster with public endpoint',
                'configuration': {
                    'ip_allocation_policy': {
                        'use_ip_aliases': True,
                        'create_subnetwork': False,
                        'subnetwork_name': networking_requirements.subnetwork,
                        'cluster_secondary_range_name': 'pods',
                        'services_secondary_range_name': 'services'
                    },
                    'private_cluster_config': {
                        'enable_private_nodes': False,
                        'enable_private_endpoint': False
                    },
                    'network_policy': {
                        'enabled': True,
                        'provider': 'CALICO'
                    }
                }
            },
            'private_cluster': {
                'description': 'Private cluster with restricted access',
                'configuration': {
                    'ip_allocation_policy': {
                        'use_ip_aliases': True,
                        'cluster_secondary_range_name': 'pods',
                        'services_secondary_range_name': 'services'
                    },
                    'private_cluster_config': {
                        'enable_private_nodes': True,
                        'enable_private_endpoint': networking_requirements.private_endpoint,
                        'master_ipv4_cidr_block': networking_requirements.master_cidr,
                        'master_global_access_config': {
                            'enabled': networking_requirements.global_access_enabled
                        }
                    },
                    'master_authorized_networks_config': {
                        'enabled': True,
                        'cidr_blocks': networking_requirements.authorized_networks
                    }
                }
            },
            'multi_cluster_mesh': {
                'description': 'Multi-cluster service mesh with Anthos',
                'configuration': {
                    'service_mesh': {
                        'provider': 'Istio',
                        'multi_cluster_enabled': True,
                        'cluster_discovery': {
                            'enabled': True,
                            'endpoint_discovery_type': 'DNS'
                        }
                    },
                    'cluster_membership': {
                        'hub_membership': networking_requirements.anthos_hub_membership,
                        'fleet_project': networking_requirements.fleet_project
                    }
                }
            }
        }

        # Ingress configuration
        ingress_config = {
            'gce_ingress': {
                'enabled': True,
                'class': 'gce',
                'ssl_policy': networking_requirements.ssl_policy,
                'global_static_ip': networking_requirements.global_ip_name,
                'managed_certificates': networking_requirements.managed_ssl_enabled
            },
            'nginx_ingress': {
                'enabled': networking_requirements.nginx_ingress_enabled,
                'class': 'nginx',
                'service_type': 'LoadBalancer',
                'replica_count': 3,
                'resources': {
                    'requests': {'cpu': '100m', 'memory': '90Mi'},
                    'limits': {'cpu': '100m', 'memory': '90Mi'}
                }
            },
            'istio_gateway': {
                'enabled': networking_requirements.service_mesh_enabled,
                'gateway_class': 'istio',
                'tls_configuration': networking_requirements.istio_tls_config
            }
        }

        return GKENetworkingArchitecture(
            strategy=networking_strategies[networking_requirements.networking_strategy],
            ingress_config=ingress_config,
            security_policies=self.design_network_security_policies(networking_requirements)
        )

GKE Advanced Features:

Autopilot Mode:
├── Fully Managed Nodes: Google manages all node infrastructure
├── Pod-native: Optimized for pod-based workloads
├── Security Hardened: Built-in security best practices
├── Automatic Scaling: Node provisioning based on pod requests
├── Simplified Operations: Reduced cluster management overhead
├── Cost Optimization: Pay only for requested pod resources
├── Compliance Ready: Pre-configured for security and compliance
└── Workload Restrictions: Some workload types not supported

Multi-cluster Services (MCS):
├── Cross-cluster Service Discovery: Services across multiple clusters
├── Service Export/Import: Explicit service sharing model
├── DNS-based Discovery: Automatic DNS resolution across clusters
├── Load Balancing: Traffic distribution across clusters
├── Failover: Automatic failover to healthy clusters
├── Security: Workload Identity-based authentication
├── Compliance: Data residency and sovereignty requirements
└── Use Cases: Multi-region deployments, disaster recovery

Config Sync and Policy Controller:
├── GitOps: Git-based configuration management
├── Policy Engine: Open Policy Agent (OPA) Gatekeeper
├── Configuration Drift: Automatic drift detection and correction
├── Multi-cluster Management: Consistent policies across clusters
├── Compliance: Continuous compliance monitoring
├── Template Library: Pre-built policy templates
├── Audit: Policy violation reporting and alerting
└── Integration: CI/CD pipeline integration
```

### GCP Storage Services Expertise

#### **Cloud Storage and Persistent Disks**

```
Google Cloud Storage Architecture:

Storage Classes:
├── Standard Storage:
│   ├── Use Case: Frequently accessed data
│   ├── Availability: 99.95% (multi-regional), 99.9% (regional)
│   ├── Durability: 99.999999999% (11 9's)
│   ├── Access Time: Milliseconds
│   ├── Minimum Duration: None
│   ├── Retrieval Costs: None
│   └── Use Cases: Active data, content delivery, analytics

├── Nearline Storage:
│   ├── Use Case: Data accessed less than once per month
│   ├── Availability: 99.95% (multi-regional), 99.9% (regional)
│   ├── Durability: 99.999999999% (11 9's)
│   ├── Access Time: Milliseconds
│   ├── Minimum Duration: 30 days
│   ├── Retrieval Costs: Per GB retrieved
│   └── Use Cases: Backup, disaster recovery, infrequent access

├── Coldline Storage:
│   ├── Use Case: Data accessed less than once per quarter
│   ├── Availability: 99.95% (multi-regional), 99.9% (regional)
│   ├── Durability: 99.999999999% (11 9's)
│   ├── Access Time: Milliseconds
│   ├── Minimum Duration: 90 days
│   ├── Retrieval Costs: Higher per GB retrieved
│   └── Use Cases: Long-term backup, disaster recovery

├── Archive Storage:
│   ├── Use Case: Data accessed less than once per year
│   ├── Availability: 99.95% (multi-regional), 99.9% (regional)
│   ├── Durability: 99.999999999% (11 9's)
│   ├── Access Time: Milliseconds (no retrieval delay)
│   ├── Minimum Duration: 365 days
│   ├── Retrieval Costs: Highest per GB retrieved
│   └── Use Cases: Compliance, long-term archival

Location Types:
├── Multi-Regional:
│   ├── Geo-redundant: Stored across multiple regions
│   ├── Highest Availability: 99.95% availability SLA
│   ├── Global Access: Optimized for global access patterns
│   ├── Cost: Higher storage cost, lower egress within regions
│   ├── Use Cases: Content delivery, global applications
│   └── Locations: US, EU, ASIA

├── Regional:
│   ├── Single Region: Stored in single GCP region
│   ├── Zone-redundant: Replicated across zones in region
│   ├── Lower Cost: Lower storage cost than multi-regional
│   ├── Regional Optimization: Optimized for regional access
│   ├── Use Cases: Analytics, backup within region
│   └── Performance: Higher performance for regional workloads

├── Dual-Regional:
│   ├── Two Regions: Stored in two specific regions
│   ├── Disaster Recovery: Built-in disaster recovery
│   ├── Compliance: Meet data residency requirements
│   ├── Performance: Optimized for two-region access
│   ├── Cost: Between regional and multi-regional
│   └── Use Cases: Business continuity, compliance

class GCSOptimizer:
    def __init__(self):
        self.storage_analyzer = GCSStorageAnalyzer()
        self.cost_optimizer = GCSCostOptimizer()
        self.performance_optimizer = GCSPerformanceOptimizer()

    def optimize_cloud_storage_architecture(self, storage_requirements):
        """Optimize Google Cloud Storage for cost and performance"""

        # Bucket configuration
        bucket_config = {
            'name': storage_requirements.bucket_name,
            'location': storage_requirements.location,
            'storage_class': self.select_storage_class(storage_requirements),
            'uniform_bucket_level_access': storage_requirements.uniform_bucket_level_access,
            'public_access_prevention': 'enforced',
            'versioning': {
                'enabled': storage_requirements.versioning_enabled
            },
            'encryption': {
                'default_kms_key_name': storage_requirements.kms_key_name if storage_requirements.customer_managed_encryption else None
            },
            'retention_policy': {
                'retention_period': storage_requirements.retention_period_seconds,
                'is_locked': storage_requirements.retention_policy_locked
            } if storage_requirements.retention_policy_required else None,
            'lifecycle_configuration': self.design_lifecycle_policy(storage_requirements),
            'cors': storage_requirements.cors_configuration if storage_requirements.web_access_enabled else None,
            'website': {
                'main_page_suffix': storage_requirements.index_page,
                'not_found_page': storage_requirements.error_page
            } if storage_requirements.static_website_enabled else None,
            'logging': {
                'log_bucket': storage_requirements.access_log_bucket,
                'log_object_prefix': storage_requirements.access_log_prefix
            } if storage_requirements.access_logging_enabled else None,
            'labels': storage_requirements.labels
        }

        # Lifecycle management policy
        lifecycle_policy = {
            'rule': []
        }

        # Transition to nearline after 30 days
        if storage_requirements.enable_automatic_tiering:
            nearline_rule = {
                'action': {'type': 'SetStorageClass', 'storage_class': 'NEARLINE'},
                'condition': {
                    'age': 30,
                    'matches_storage_class': ['STANDARD']
                }
            }
            lifecycle_policy['rule'].append(nearline_rule)

            # Transition to coldline after 90 days
            coldline_rule = {
                'action': {'type': 'SetStorageClass', 'storage_class': 'COLDLINE'},
                'condition': {
                    'age': 90,
                    'matches_storage_class': ['NEARLINE']
                }
            }
            lifecycle_policy['rule'].append(coldline_rule)

            # Transition to archive after 365 days
            archive_rule = {
                'action': {'type': 'SetStorageClass', 'storage_class': 'ARCHIVE'},
                'condition': {
                    'age': 365,
                    'matches_storage_class': ['COLDLINE']
                }
            }
            lifecycle_policy['rule'].append(archive_rule)

        # Delete old versions
        if storage_requirements.versioning_enabled:
            version_deletion_rule = {
                'action': {'type': 'Delete'},
                'condition': {
                    'age': storage_requirements.version_retention_days,
                    'is_live': False
                }
            }
            lifecycle_policy['rule'].append(version_deletion_rule)

        # Delete incomplete multipart uploads
        incomplete_upload_rule = {
            'action': {'type': 'AbortIncompleteMultipartUpload'},
            'condition': {
                'age': 7
            }
        }
        lifecycle_policy['rule'].append(incomplete_upload_rule)

        # Performance optimization
        performance_config = {
            'transfer_acceleration': storage_requirements.global_access_required,
            'cdn_integration': {
                'enabled': storage_requirements.cdn_enabled,
                'cache_control_headers': storage_requirements.cache_control_configuration,
                'compression': storage_requirements.gzip_compression_enabled
            },
            'parallel_uploads': {
                'enabled': True,
                'chunk_size': '32MB',
                'parallel_processes': 4
            },
            'request_pattern_optimization': {
                'sequential_file_naming': False,  # Avoid hotspotting
                'request_rate_ramping': True,
                'connection_pooling': True
            }
        }

        # Security configuration
        security_config = {
            'iam_policies': {
                'bucket_policy_only': storage_requirements.uniform_bucket_level_access,
                'public_access_prevention': 'enforced'
            },
            'signed_urls': {
                'enabled': storage_requirements.signed_urls_enabled,
                'default_expiration': storage_requirements.signed_url_default_expiration
            },
            'audit_logging': {
                'data_access': storage_requirements.data_access_logging_enabled,
                'admin_activity': True
            },
            'vpc_sc_integration': {
                'enabled': storage_requirements.vpc_service_controls_enabled,
                'perimeter_name': storage_requirements.vpc_sc_perimeter
            }
        }

        # Multi-region and disaster recovery
        dr_config = None
        if storage_requirements.disaster_recovery_required:
            dr_config = {
                'replication_strategy': {
                    'type': 'cross_region',
                    'primary_location': storage_requirements.primary_region,
                    'secondary_location': storage_requirements.secondary_region,
                    'replication_time': 'RTO < 1 hour, RPO < 15 minutes'
                },
                'backup_strategy': {
                    'automated_backups': True,
                    'backup_frequency': storage_requirements.backup_frequency,
                    'cross_region_backup': True,
                    'backup_retention': storage_requirements.backup_retention_period
                }
            }

        return GCSOptimizationPlan(
            bucket_config=bucket_config,
            lifecycle_policy=lifecycle_policy,
            performance_config=performance_config,
            security_config=security_config,
            dr_config=dr_config,
            cost_analysis=self.analyze_gcs_costs(bucket_config, storage_requirements),
            monitoring_setup=self.design_gcs_monitoring()
        )

    def design_data_lake_architecture(self, data_lake_requirements):
        """Design GCS-based data lake architecture"""

        data_lake_structure = {
            'landing_zone': {
                'bucket_name': f"{data_lake_requirements.project_id}-landing",
                'description': 'Raw data ingestion layer',
                'storage_class': 'STANDARD',
                'location': data_lake_requirements.primary_region,
                'directory_structure': 'source_system/year/month/day/hour',
                'lifecycle_policy': {
                    'transition_to_nearline_days': 7,
                    'transition_to_coldline_days': 30,
                    'deletion_days': 90
                },
                'access_control': 'data_engineers_write_only'
            },
            'raw_data_zone': {
                'bucket_name': f"{data_lake_requirements.project_id}-raw",
                'description': 'Structured raw data storage',
                'storage_class': 'STANDARD',
                'location': data_lake_requirements.primary_region,
                'directory_structure': 'dataset/year/month/day',
                'lifecycle_policy': {
                    'transition_to_nearline_days': 30,
                    'transition_to_coldline_days': 90,
                    'transition_to_archive_days': 365
                },
                'access_control': 'data_engineers_read_write'
            },
            'curated_data_zone': {
                'bucket_name': f"{data_lake_requirements.project_id}-curated",
                'description': 'Processed and curated data',
                'storage_class': 'STANDARD',
                'location': data_lake_requirements.primary_region,
                'directory_structure': 'subject_area/dataset/year/month',
                'lifecycle_policy': {
                    'transition_to_nearline_days': 60,
                    'transition_to_coldline_days': 180
                },
                'access_control': 'analysts_read_data_scientists_read_write'
            },
            'sandbox_zone': {
                'bucket_name': f"{data_lake_requirements.project_id}-sandbox",
                'description': 'Experimentation and development',
                'storage_class': 'STANDARD',
                'location': data_lake_requirements.primary_region,
                'directory_structure': 'user/project/experiment',
                'lifecycle_policy': {
                    'deletion_days': 90
                },
                'access_control': 'data_scientists_full_access'
            }
        }

        # Integration with GCP services
        integration_services = {
            'dataflow': {
                'templates': self.design_dataflow_templates(data_lake_requirements),
                'streaming_pipelines': self.design_streaming_pipelines(data_lake_requirements),
                'batch_pipelines': self.design_batch_pipelines(data_lake_requirements)
            },
            'dataproc': {
                'clusters': self.design_dataproc_clusters(data_lake_requirements),
                'serverless': self.design_dataproc_serverless(data_lake_requirements)
            },
            'bigquery': {
                'external_tables': self.design_external_table_definitions(data_lake_requirements),
                'data_transfer_service': self.design_data_transfer_jobs(data_lake_requirements)
            },
            'data_catalog': {
                'taxonomy': self.design_data_taxonomy(data_lake_requirements),
                'policy_tags': self.design_policy_tags(data_lake_requirements)
            }
        }

        return DataLakeArchitecture(
            structure=data_lake_structure,
            integration_services=integration_services,
            governance_framework=self.design_data_governance_framework(),
            security_model=self.design_data_lake_security_model()
        )

Persistent Disk Types:

Zonal Persistent Disks:
├── Standard PD: HDD-based, cost-effective storage
├── Balanced PD: SSD-based, balanced performance/cost
├── SSD PD: High-performance SSD storage
├── Extreme PD: Highest performance with configurable IOPS
└── Use Cases: Boot disks, database storage, file systems

Regional Persistent Disks:
├── Synchronous Replication: Real-time replication across zones
├── High Availability: 99.999% availability SLA
├── Automatic Failover: Transparent failover during zone outages
├── Performance: Slightly lower than zonal disks
└── Use Cases: High availability databases, mission-critical apps

Cloud Storage Advanced Features:

Bucket Lock:
├── Retention Policies: Immutable object retention
├── Legal Holds: Indefinite retention for legal purposes
├── Bucket Lock: Permanent retention policy enforcement
├── Compliance: Meet regulatory requirements
└── Use Cases: Financial records, healthcare data, legal documents

Pub/Sub Notifications:
├── Object Changes: Notifications on object create/delete/update
├── Real-time Processing: Trigger downstream processing
├── Event-driven Architecture: Serverless event processing
├── Filtering: Attribute-based event filtering
└── Integration: Cloud Functions, Dataflow, third-party systems

Transfer Service:
├── Online Transfers: Transfer from other cloud providers
├── On-premises Transfers: Transfer Appliance for large datasets
├── Scheduled Transfers: Automated, recurring transfers
├── Bandwidth Control: Configurable transfer rates
└── Monitoring: Transfer progress and status tracking
```

#### **Cloud Filestore and Persistent Disks**

```
Cloud Filestore Architecture:

Service Tiers:
├── Basic:
│   ├── HDD: Standard performance, cost-effective
│   ├── SSD: Higher performance, SSD-backed storage
│   ├── Capacity: 1 TB - 63.9 TB
│   ├── Performance: Up to 16,000 IOPS, 1,200 MB/s
│   ├── Use Cases: General file sharing, content repositories
│   └── Features: NFSv3, regional availability

├── High Scale:
│   ├── SSD Only: High-performance SSD storage
│   ├── Capacity: 10 TB - 100+ TB
│   ├── Performance: Up to 100,000 IOPS, 4,800 MB/s
│   ├── Scalability: Dynamic capacity scaling
│   ├── Use Cases: High-performance computing, media rendering
│   └── Features: NFSv3, zonal availability

├── Enterprise:
│   ├── Regional Replication: Cross-zone replication
│   ├── Capacity: 1 TB - 10 TB
│   ├── High Availability: 99.99% availability SLA
│   ├── Backup Integration: Automatic backup service
│   ├── Use Cases: Enterprise applications, databases
│   └── Features: NFSv3, snapshot support

Features and Capabilities:
├── NFS Protocol: NFSv3 support for cross-platform compatibility
├── POSIX Compliance: Full POSIX file system semantics
├── Concurrent Access: Multiple clients simultaneous access
├── Snapshots: Point-in-time file system snapshots
├── Backup Service: Automated backup to Cloud Storage
├── VPC Integration: Private network access
├── IAM Integration: Cloud IAM access control
└── Monitoring: Cloud Monitoring integration

class CloudFilestoreOptimizer:
    def __init__(self):
        self.filestore_analyzer = CloudFilestoreAnalyzer()
        self.performance_calculator = FilestorePerformanceCalculator()
        self.cost_analyzer = FilestoreCostAnalyzer()

    def optimize_filestore_deployment(self, filestore_requirements):
        """Optimize Cloud Filestore deployment"""

        # Service tier selection
        tier_recommendation = self.select_optimal_tier(filestore_requirements)

        # Filestore instance configuration
        filestore_config = {
            'instance_id': filestore_requirements.instance_name,
            'location': filestore_requirements.zone,
            'tier': tier_recommendation['tier'],
            'file_shares': [
                {
                    'name': filestore_requirements.share_name,
                    'capacity_gb': self.calculate_capacity(filestore_requirements),
                    'nfs_export_options': [
                        {
                            'ip_ranges': filestore_requirements.client_ip_ranges,
                            'access_mode': 'READ_WRITE',
                            'squash_mode': 'NO_ROOT_SQUASH',
                            'anon_uid': 65534,
                            'anon_gid': 65534
                        }
                    ]
                }
            ],
            'networks': [
                {
                    'network': filestore_requirements.vpc_network,
                    'modes': ['MODE_IPV4'],
                    'reserved_ip_range': filestore_requirements.reserved_ip_range,
                    'connect_mode': 'DIRECT_PEERING'
                }
            ],
            'labels': filestore_requirements.labels
        }

        # Performance optimization
        if tier_recommendation['tier'] in ['HIGH_SCALE_SSD', 'ENTERPRISE']:
            filestore_config['performance_config'] = {
                'iops_per_gb': filestore_requirements.target_iops_per_gb,
                'throughput_per_gb': filestore_requirements.target_throughput_per_gb
            }

        # Backup configuration
        backup_config = {
            'backup_config': {
                'source_instance': filestore_config['instance_id'],
                'source_file_share': filestore_requirements.share_name,
                'backup_location': filestore_requirements.backup_region,
                'description': f"Automated backup for {filestore_config['instance_id']}",
                'labels': {'automated': 'true', 'source': filestore_config['instance_id']}
            },
            'backup_schedule': {
                'daily_backup_start_time': {
                    'hours': filestore_requirements.backup_start_hour,
                    'minutes': 0,
                    'seconds': 0
                },
                'backup_retention_days': filestore_requirements.backup_retention_days
            }
        }

        # Security configuration
        security_config = {
            'vpc_peering': {
                'authorized_networks': filestore_requirements.authorized_networks,
                'firewall_rules': [
                    {
                        'name': f"{filestore_requirements.instance_name}-nfs-allow",
                        'direction': 'INGRESS',
                        'priority': 1000,
                        'source_ranges': filestore_requirements.client_ip_ranges,
                        'allowed': [
                            {'IP_protocol': 'tcp', 'ports': ['111', '2049', '32765-32767']},
                            {'IP_protocol': 'udp', 'ports': ['111', '2049', '32765-32767']}
                        ],
                        'target_tags': [f"{filestore_requirements.instance_name}-nfs"]
                    }
                ]
            },
            'access_control': {
                'nfs_export_options': filestore_config['file_shares'][0]['nfs_export_options'],
                'iam_policies': self.design_filestore_iam_policies(filestore_requirements)
            }
        }

        return FilestoreOptimizationPlan(
            filestore_config=filestore_config,
            backup_config=backup_config,
            security_config=security_config,
            performance_analysis=self.analyze_filestore_performance(filestore_config),
            cost_analysis=self.analyze_filestore_costs(filestore_config)
        )

Advanced Storage Features:

Persistent Disk Snapshots:
├── Incremental Snapshots: Only store changed blocks
├── Regional Snapshots: Cross-region snapshot storage
├── Scheduled Snapshots: Automated snapshot creation
├── Snapshot Chains: Efficient snapshot management
├── Instant Snapshots: Fast snapshot creation
├── Cross-project Sharing: Share snapshots across projects
└── Lifecycle Management: Automated snapshot retention

Local SSDs:
├── High Performance: Up to 2.4M IOPS, 6.6 GB/s throughput
├── Low Latency: Sub-millisecond latency
├── Ephemeral Storage: Data lost on instance termination
├── Multiple Devices: Up to 24 x 375 GB devices
├── NVMe Interface: High-performance NVMe protocol
├── Use Cases: Caching, temporary data, high-IOPS applications
└── Instance Types: Available on most machine types

Extreme Persistent Disks:
├── Configurable IOPS: Independent IOPS provisioning
├── High Performance: Up to 120,000 IOPS
├── Low Latency: Consistent sub-10ms latency
├── Flexible Sizing: 500 GB - 64 TB capacity
├── Cost Optimization: Pay for provisioned performance
├── Use Cases: High-performance databases, analytics
└── Regional Availability: Available in select regions
```

### GCP Database Services Expertise

#### **Cloud SQL and Cloud Spanner**

```
Google Cloud SQL Architecture:

Database Engines:
├── MySQL:
│   ├── Versions: 5.7, 8.0
│   ├── High Availability: Regional persistent disks, automatic failover
│   ├── Read Replicas: Cross-region read replicas
│   ├── Backup: Automated and on-demand backups
│   ├── Point-in-time Recovery: Binary log-based recovery
│   ├── Performance: Up to 64 vCPUs, 416 GB RAM
│   └── Features: SSL, IAM authentication, Private IP

├── PostgreSQL:
│   ├── Versions: 11, 12, 13, 14, 15
│   ├── Extensions: PostGIS, pgAudit, pg_stat_statements
│   ├── Logical Replication: Built-in logical replication
│   ├── Connection Pooling: Cloud SQL Proxy, PgBouncer
│   ├── Performance: Up to 64 vCPUs, 416 GB RAM
│   ├── Features: IAM authentication, Query Insights
│   └── Advanced Features: Columnar engine (preview)

├── SQL Server:
│   ├── Versions: 2017 Standard, 2017 Enterprise, 2019 Standard, 2019 Enterprise
│   ├── High Availability: Always On availability groups
│   ├── Features: SQL Server Agent, SSRS, SSIS integration
│   ├── Performance: Up to 64 vCPUs, 416 GB RAM
│   ├── Backup: Native SQL Server backup integration
│   ├── Security: Windows Authentication, Transparent Data Encryption
│   └── Migration: Database Migration Service integration

Machine Types and Performance:
├── Shared Core:
│   ├── db-f1-micro: 1 vCPU (shared), 0.6 GB RAM
│   ├── db-g1-small: 1 vCPU (shared), 1.7 GB RAM
│   ├── Use Cases: Development, testing, low-traffic applications
│   └── Limitations: Burstable CPU performance

├── Standard:
│   ├── db-n1-standard: 1-64 vCPUs, 3.75-240 GB RAM
│   ├── db-n1-highmem: 2-64 vCPUs, 13-416 GB RAM
│   ├── db-n1-highcpu: 2-64 vCPUs, 0.9-57.6 GB RAM
│   └── Use Cases: Production workloads, balanced performance

├── High Memory:
│   ├── db-n1-highmem: Memory-optimized instances
│   ├── RAM Range: 13 GB - 416 GB
│   ├── vCPU Range: 2-64 vCPUs
│   └── Use Cases: In-memory databases, analytics

Storage Options:
├── SSD Storage:
│   ├── Performance: Up to 40,000 IOPS, 1,200 MB/s
│   ├── Size Range: 10 GB - 64 TB
│   ├── Use Cases: Production databases, high-performance workloads
│   └── Features: Automatic storage increase, point-in-time recovery

├── HDD Storage:
│   ├── Performance: Up to 3,000 IOPS, 480 MB/s
│   ├── Size Range: 10 GB - 64 TB
│   ├── Use Cases: Development, testing, cost-sensitive workloads
│   └── Cost: Lower cost per GB than SSD

class CloudSQLOptimizer:
    def __init__(self):
        self.sql_analyzer = CloudSQLAnalyzer()
        self.performance_optimizer = CloudSQLPerformanceOptimizer()
        self.ha_designer = CloudSQLHADesigner()

    def optimize_cloud_sql_deployment(self, database_requirements):
        """Optimize Cloud SQL deployment for performance and availability"""

        # Instance configuration
        instance_config = {
            'instance_id': database_requirements.instance_name,
            'database_version': f"{database_requirements.engine}_{database_requirements.version}",
            'region': database_requirements.region,
            'tier': self.select_optimal_tier(database_requirements),
            'disk_type': self.select_disk_type(database_requirements),
            'disk_size_gb': self.calculate_disk_size(database_requirements),
            'disk_autoresize': True,
            'disk_autoresize_limit': database_requirements.max_disk_size,
            'availability_type': 'REGIONAL' if database_requirements.high_availability else 'ZONAL',
            'backup_configuration': {
                'enabled': True,
                'start_time': database_requirements.backup_start_time,
                'point_in_time_recovery_enabled': True,
                'transaction_log_retention_days': database_requirements.log_retention_days,
                'backup_retention_settings': {
                    'retained_backups': database_requirements.backup_count,
                    'retention_unit': 'COUNT'
                }
            },
            'ip_configuration': {
                'ipv4_enabled': database_requirements.public_ip_enabled,
                'private_network': database_requirements.vpc_network,
                'require_ssl': True,
                'authorized_networks': [
                    {'value': cidr, 'name': name}
                    for cidr, name in database_requirements.authorized_networks.items()
                ]
            },
            'database_flags': self.generate_database_flags(database_requirements),
            'maintenance_window': {
                'day': database_requirements.maintenance_day,
                'hour': database_requirements.maintenance_hour,
                'update_track': 'stable'
            },
            'deletion_protection': database_requirements.deletion_protection,
            'insights_config': {
                'query_insights_enabled': True,
                'record_application_tags': True,
                'record_client_address': True,
                'query_string_length': 1024,
                'query_plans_per_minute': 5
            }
        }

        # High availability configuration
        ha_config = None
        if database_requirements.high_availability:
            ha_config = {
                'availability_type': 'REGIONAL',
                'secondary_zone': database_requirements.secondary_zone,
                'backup_configuration': {
                    'enabled': True,
                    'binary_log_enabled': True,
                    'point_in_time_recovery_enabled': True
                },
                'failover_target': {
                    'type': 'AUTOMATIC'
                }
            }

        # Read replica configuration
        read_replica_configs = []
        for replica_spec in database_requirements.read_replicas:
            replica_config = {
                'instance_id': f"{database_requirements.instance_name}-replica-{replica_spec.name}",
                'master_instance_name': database_requirements.instance_name,
                'region': replica_spec.region,
                'tier': replica_spec.tier or instance_config['tier'],
                'disk_type': replica_spec.disk_type or instance_config['disk_type'],
                'availability_type': 'ZONAL',
                'replica_configuration': {
                    'failover_target': replica_spec.failover_target,
                    'mysql_replica_configuration': {
                        'dump_file_path': replica_spec.dump_file_path,
                        'username': replica_spec.replication_user,
                        'password': replica_spec.replication_password,
                        'connect_retry_interval': 60,
                        'master_heartbeat_period': 15000,
                        'ca_certificate': replica_spec.ca_certificate,
                        'client_certificate': replica_spec.client_certificate,
                        'client_key': replica_spec.client_key,
                        'ssl_cipher': replica_spec.ssl_cipher,
                        'verify_server_certificate': True
                    } if database_requirements.engine == 'MYSQL' else None
                }
            }
            read_replica_configs.append(replica_config)

        # Connection management
        connection_config = {
            'cloud_sql_proxy': {
                'enabled': True,
                'connection_string': f"{database_requirements.project_id}:{database_requirements.region}:{database_requirements.instance_name}",
                'ssl_mode': 'require'
            },
            'private_ip': {
                'enabled': database_requirements.private_ip_enabled,
                'network': database_requirements.vpc_network,
                'allocated_ip_range': database_requirements.allocated_ip_range
            },
            'connection_pooling': {
                'enabled': database_requirements.connection_pooling_enabled,
                'max_connections': database_requirements.max_connections,
                'pgbouncer_config': {
                    'pool_mode': 'transaction',
                    'default_pool_size': 20,
                    'min_pool_size': 5,
                    'reserve_pool_size': 5,
                    'max_client_conn': 100
                } if database_requirements.engine == 'POSTGRES' else None
            }
        }

        # Security configuration
        security_config = {
            'ssl_configuration': {
                'ssl_mode': 'REQUIRE',
                'client_certificate_enabled': database_requirements.client_certificates_enabled,
                'server_certificate_authority': database_requirements.custom_ca_enabled
            },
            'iam_authentication': {
                'enabled': database_requirements.iam_authentication_enabled
            },
            'authorized_networks': instance_config['ip_configuration']['authorized_networks'],
            'vpc_peering': {
                'enabled': database_requirements.private_ip_enabled,
                'network': database_requirements.vpc_network
            }
        }

        return CloudSQLOptimizationPlan(
            instance_config=instance_config,
            ha_config=ha_config,
            read_replica_configs=read_replica_configs,
            connection_config=connection_config,
            security_config=security_config,
            performance_tuning=self.generate_performance_recommendations(database_requirements),
            cost_analysis=self.analyze_cloud_sql_costs(instance_config, read_replica_configs)
        )

Cloud Spanner Architecture:

Global Distribution:
├── Multi-Regional Instances:
│   ├── Configuration: 3+ regions for global distribution
│   ├── Consistency: External consistency (strong consistency)
│   ├── Latency: Optimized for global read/write latency
│   ├── Availability: 99.999% availability SLA
│   ├── Use Cases: Global applications, financial systems
│   └── Replication: Synchronous replication across regions

├── Regional Instances:
│   ├── Configuration: Single region, 3 zones
│   ├── Consistency: Strong consistency within region
│   ├── Latency: Low latency for regional workloads
│   ├── Availability: 99.99% availability SLA
│   ├── Use Cases: Regional applications, cost optimization
│   └── Replication: Synchronous replication across zones

Node Configuration:
├── Processing Units:
│   ├── Minimum: 100 processing units (fractional nodes)
│   ├── Node Scaling: 1,000 processing units = 1 node
│   ├── Maximum: Virtually unlimited scaling
│   ├── Performance: Linear scaling with additional nodes
│   └── Cost: Pay per processing unit hour

├── Storage:
│   ├── Distributed Storage: Automatically distributed
│   ├── Replication: Synchronous replication
│   ├── Compression: Automatic data compression
│   ├── Encryption: Encryption at rest by default
│   └── Backup: Automatic backup and point-in-time recovery

class CloudSpannerOptimizer:
    def __init__(self):
        self.spanner_analyzer = CloudSpannerAnalyzer()
        self.schema_optimizer = SpannerSchemaOptimizer()
        self.performance_optimizer = SpannerPerformanceOptimizer()

    def optimize_cloud_spanner_deployment(self, spanner_requirements):
        """Optimize Cloud Spanner deployment for global scale"""

        # Instance configuration
        instance_config = {
            'instance_id': spanner_requirements.instance_name,
            'config': self.select_instance_configuration(spanner_requirements),
            'display_name': spanner_requirements.display_name,
            'node_count': spanner_requirements.node_count,
            'processing_units': spanner_requirements.processing_units,
            'labels': spanner_requirements.labels
        }

        # Database configuration
        database_config = {
            'database_id': spanner_requirements.database_name,
            'instance_id': spanner_requirements.instance_name,
            'database_dialect': spanner_requirements.dialect,  # GOOGLE_STANDARD_SQL or POSTGRESQL
            'encryption_config': {
                'kms_key_name': spanner_requirements.kms_key_name if spanner_requirements.customer_managed_encryption else None
            },
            'version_retention_period': spanner_requirements.version_retention_period,
            'earliest_version_time': spanner_requirements.earliest_version_time,
            'default_leader': spanner_requirements.default_leader_region
        }

        # Schema optimization
        schema_optimization = {
            'primary_keys': self.optimize_primary_key_design(spanner_requirements.schema),
            'indexes': self.optimize_index_design(spanner_requirements.schema),
            'interleaved_tables': self.design_interleaved_relationships(spanner_requirements.schema),
            'foreign_keys': self.optimize_foreign_key_design(spanner_requirements.schema)
        }

        # Global configuration
        global_config = {
            'multi_region_configuration': {
                'read_regions': spanner_requirements.read_regions,
                'write_region': spanner_requirements.primary_write_region,
                'witness_region': spanner_requirements.witness_region
            },
            'placement_policies': [
                {
                    'table_name': policy.table_name,
                    'placement_region': policy.placement_region,
                    'placement_type': policy.placement_type
                }
                for policy in spanner_requirements.placement_policies
            ]
        }

        # Performance optimization
        performance_config = {
            'query_optimization': {
                'use_partition_statistics': True,
                'query_optimizer_version': 'LATEST',
                'optimizer_statistics_package': 'auto_20191128_14_47_22UTC'
            },
            'connection_pooling': {
                'max_sessions': spanner_requirements.max_sessions,
                'min_sessions': spanner_requirements.min_sessions,
                'session_pool_options': {
                    'max_idle_time': '60m',
                    'health_check_workers': 1,
                    'health_check_interval': '50m'
                }
            },
            'batch_operations': {
                'batch_size': 1000,
                'parallel_degree': 4,
                'commit_priority': 'HIGH'
            }
        }

        # Backup and restore configuration
        backup_config = {
            'backup_schedules': [
                {
                    'backup_id': f"{spanner_requirements.database_name}-daily-backup",
                    'database': spanner_requirements.database_name,
                    'retention_period': spanner_requirements.backup_retention_period,
                    'encryption_config': {
                        'encryption_type': 'CUSTOMER_MANAGED_ENCRYPTION',
                        'kms_key_name': spanner_requirements.backup_kms_key
                    },
                    'schedule': {
                        'cron_spec': '0 2 * * *',  # Daily at 2 AM
                        'timezone': spanner_requirements.timezone
                    }
                }
            ],
            'point_in_time_recovery': {
                'enabled': True,
                'retention_period': spanner_requirements.pitr_retention_period
            }
        }

        return CloudSpannerOptimizationPlan(
            instance_config=instance_config,
            database_config=database_config,
            schema_optimization=schema_optimization,
            global_config=global_config,
            performance_config=performance_config,
            backup_config=backup_config,
            cost_analysis=self.analyze_spanner_costs(instance_config),
            monitoring_setup=self.design_spanner_monitoring()
        )

Advanced Database Features:

Cloud SQL Advanced Security:
├── IAM Database Authentication: Cloud IAM integration
├── Private IP: VPC-only database access
├── SSL/TLS: Encrypted connections with certificate validation
├── Authorized Networks: IP address allowlisting
├── VPC Service Controls: Additional network security
├── Audit Logs: Database access and query audit logging
├── Data Loss Prevention: DLP API integration for sensitive data
└── Query Insights: Performance monitoring and optimization

Cloud Spanner Advanced Features:
├── External Consistency: Globally consistent transactions
├── Interleaved Tables: Parent-child table relationships
├── Secondary Indexes: Global and local secondary indexes
├── Foreign Keys: Referential integrity constraints
├── Commit Timestamps: Built-in versioning support
├── Multi-Version Concurrency Control: Lock-free reads
├── Change Streams: Real-time change data capture
└── Directed Read: Read replica routing optimization
```

#### **BigQuery and Cloud Bigtable**

```
BigQuery Architecture:

Storage and Compute Separation:
├── Columnar Storage:
│   ├── Capacitor: Proprietary columnar storage format
│   ├── Compression: Advanced compression algorithms
│   ├── Encryption: Encryption at rest by default
│   ├── Replication: Automatic cross-zone replication
│   └── Partitioning: Date and integer partitioning

├── Dremel Query Engine:
│   ├── Massively Parallel Processing: Thousands of parallel workers
│   ├── Tree Architecture: Multi-level execution tree
│   ├── Dynamic Query Execution: Adaptive query planning
│   ├── In-memory Processing: Fast analytical queries
│   └── SQL Engine: Standard SQL with extensions

├── Compute Slots:
│   ├── On-demand Pricing: Pay per query processed data
│   ├── Flat-rate Pricing: Reserved compute capacity
│   ├── Flex Slots: Variable capacity reservations
│   ├── Auto-scaling: Dynamic slot allocation
│   └── Workload Management: Query prioritization

Dataset and Table Organization:
├── Projects: Top-level billing and access control
├── Datasets: Logical container for tables and views
├── Tables: Structured data storage with schema
├── Partitioned Tables: Date/time and integer partitioning
├── Clustered Tables: Physical data organization optimization
├── External Tables: Query data in Cloud Storage
├── Views: Logical views over tables
└── Materialized Views: Pre-computed query results

class BigQueryOptimizer:
    def __init__(self):
        self.query_optimizer = BigQueryQueryOptimizer()
        self.cost_optimizer = BigQueryCostOptimizer()
        self.performance_analyzer = BigQueryPerformanceAnalyzer()

    def optimize_bigquery_deployment(self, bigquery_requirements):
        """Optimize BigQuery for analytics workloads"""

        # Dataset configuration
        dataset_config = {
            'dataset_id': bigquery_requirements.dataset_name,
            'project_id': bigquery_requirements.project_id,
            'location': bigquery_requirements.region,
            'description': bigquery_requirements.description,
            'default_table_expiration_ms': bigquery_requirements.default_table_expiration * 24 * 60 * 60 * 1000,
            'default_partition_expiration_ms': bigquery_requirements.default_partition_expiration * 24 * 60 * 60 * 1000,
            'labels': bigquery_requirements.labels,
            'access': self.design_dataset_access_control(bigquery_requirements),
            'default_encryption_configuration': {
                'kms_key_name': bigquery_requirements.kms_key_name if bigquery_requirements.customer_managed_encryption else None
            }
        }

        # Table optimization strategies
        table_optimizations = []
        for table_spec in bigquery_requirements.tables:
            table_optimization = {
                'table_id': table_spec.table_name,
                'schema': table_spec.schema,
                'partitioning': self.optimize_table_partitioning(table_spec),
                'clustering': self.optimize_table_clustering(table_spec),
                'optimization_recommendations': self.analyze_table_optimization_opportunities(table_spec)
            }
            table_optimizations.append(table_optimization)

        # Query optimization
        query_optimization = {
            'query_patterns': self.analyze_query_patterns(bigquery_requirements.query_workload),
            'materialized_views': self.design_materialized_views(bigquery_requirements.query_workload),
            'optimization_techniques': {
                'partition_pruning': True,
                'projection_pushdown': True,
                'predicate_pushdown': True,
                'join_optimization': True,
                'aggregate_pushdown': True
            },
            'best_practices': {
                'select_specific_columns': True,
                'use_partition_filters': True,
                'avoid_select_star': True,
                'use_approximate_aggregation': bigquery_requirements.approximate_results_acceptable,
                'cache_query_results': True
            }
        }

        # Performance and cost optimization
        performance_config = {
            'slot_management': {
                'pricing_model': bigquery_requirements.pricing_model,
                'reservation_config': {
                    'slot_capacity': bigquery_requirements.reserved_slots,
                    'ignore_idle_slots': False,
                    'max_concurrency': bigquery_requirements.max_concurrent_queries
                } if bigquery_requirements.pricing_model == 'FLAT_RATE' else None,
                'query_priority': bigquery_requirements.default_query_priority
            },
            'data_governance': {
                'column_level_security': {
                    'enabled': bigquery_requirements.column_level_security_enabled,
                    'policy_tags': bigquery_requirements.policy_tags
                },
                'row_level_security': {
                    'enabled': bigquery_requirements.row_level_security_enabled,
                    'policies': bigquery_requirements.row_access_policies
                },
                'audit_logging': {
                    'enabled': True,
                    'log_type': 'DATA_READ'
                }
            },
            'data_transfer': {
                'batch_loading': {
                    'load_job_config': {
                        'source_format': 'CSV',
                        'field_delimiter': ',',
                        'skip_leading_rows': 1,
                        'allow_jagged_rows': False,
                        'allow_quoted_newlines': False,
                        'write_disposition': 'WRITE_TRUNCATE',
                        'create_disposition': 'CREATE_IF_NEEDED'
                    }
                },
                'streaming_inserts': {
                    'insert_id_generation': True,
                    'ignore_unknown_values': False,
                    'skip_invalid_rows': False,
                    'template_suffix': '_template'
                }
            }
        }

        # Machine learning integration
        ml_config = None
        if bigquery_requirements.ml_workloads_enabled:
            ml_config = {
                'bqml_models': [
                    {
                        'model_name': model.name,
                        'model_type': model.type,
                        'training_data_query': model.training_query,
                        'model_options': model.options
                    }
                    for model in bigquery_requirements.ml_models
                ],
                'vertex_ai_integration': {
                    'enabled': bigquery_requirements.vertex_ai_integration_enabled,
                    'model_registry': bigquery_requirements.vertex_ai_model_registry
                }
            }

        return BigQueryOptimizationPlan(
            dataset_config=dataset_config,
            table_optimizations=table_optimizations,
            query_optimization=query_optimization,
            performance_config=performance_config,
            ml_config=ml_config,
            cost_analysis=self.analyze_bigquery_costs(bigquery_requirements),
            monitoring_setup=self.design_bigquery_monitoring()
        )

Cloud Bigtable Architecture:

NoSQL Wide-Column Database:
├── Node-based Scaling:
│   ├── Minimum Nodes: 1 node for development, 3 for production
│   ├── Maximum Nodes: 1,000+ nodes for large-scale workloads
│   ├── Linear Scaling: Performance scales linearly with nodes
│   ├── Hot-spotting: Avoid sequential row keys
│   └── Load Balancing: Automatic load distribution

├── Storage and Performance:
│   ├── SSD Storage: High-performance SSD storage
│   ├── HDD Storage: Cost-effective HDD storage
│   ├── Throughput: Up to 100 MB/s per node
│   ├── Latency: Single-digit millisecond latency
│   └── IOPS: Thousands of IOPS per node

├── Replication and Backup:
│   ├── Regional Clusters: Single region, multiple zones
│   ├── Multi-cluster Routing: Cross-region replication
│   ├── Backup Service: Scheduled and on-demand backups
│   ├── Point-in-time Recovery: Restore to specific timestamp
│   └── Import/Export: Data migration and archival

class CloudBigtableOptimizer:
    def __init__(self):
        self.bigtable_analyzer = CloudBigtableAnalyzer()
        self.schema_optimizer = BigtableSchemaOptimizer()
        self.performance_optimizer = BigtablePerformanceOptimizer()

    def optimize_bigtable_deployment(self, bigtable_requirements):
        """Optimize Cloud Bigtable for high-performance NoSQL workloads"""

        # Instance configuration
        instance_config = {
            'instance_id': bigtable_requirements.instance_name,
            'display_name': bigtable_requirements.display_name,
            'instance_type': bigtable_requirements.instance_type,  # PRODUCTION or DEVELOPMENT
            'labels': bigtable_requirements.labels
        }

        # Cluster configuration
        cluster_configs = []
        for cluster_spec in bigtable_requirements.clusters:
            cluster_config = {
                'cluster_id': cluster_spec.cluster_name,
                'location': cluster_spec.zone,
                'serve_nodes': cluster_spec.node_count,
                'default_storage_type': cluster_spec.storage_type,  # SSD or HDD
                'autoscaling_config': {
                    'min_serve_nodes': cluster_spec.min_nodes,
                    'max_serve_nodes': cluster_spec.max_nodes,
                    'cpu_utilization_target': cluster_spec.cpu_target
                } if cluster_spec.autoscaling_enabled else None,
                'encryption_config': {
                    'kms_key_name': cluster_spec.kms_key_name if cluster_spec.customer_managed_encryption else None
                }
            }
            cluster_configs.append(cluster_config)

        # Table design optimization
        table_optimizations = []
        for table_spec in bigtable_requirements.tables:
            table_optimization = {
                'table_id': table_spec.table_name,
                'column_families': self.optimize_column_families(table_spec),
                'row_key_design': self.optimize_row_key_design(table_spec),
                'performance_recommendations': self.analyze_table_performance(table_spec)
            }
            table_optimizations.append(table_optimization)

        # Multi-cluster configuration
        multi_cluster_config = None
        if len(cluster_configs) > 1:
            multi_cluster_config = {
                'app_profile_configs': [
                    {
                        'app_profile_id': 'single-cluster-routing',
                        'description': 'Route to single cluster for strong consistency',
                        'single_cluster_routing': {
                            'cluster_id': cluster_configs[0]['cluster_id'],
                            'allow_transactional_writes': True
                        }
                    },
                    {
                        'app_profile_id': 'multi-cluster-routing',
                        'description': 'Route to nearest cluster for low latency',
                        'multi_cluster_routing_use_any': {
                            'cluster_ids': [config['cluster_id'] for config in cluster_configs]
                        }
                    }
                ],
                'replication_strategy': 'AUTOMATIC',
                'backup_configuration': {
                    'backup_frequency': bigtable_requirements.backup_frequency,
                    'retention_period': bigtable_requirements.backup_retention_period,
                    'cross_region_backup': bigtable_requirements.cross_region_backup_enabled
                }
            }

        # Performance optimization
        performance_config = {
            'connection_optimization': {
                'connection_pool_size': bigtable_requirements.connection_pool_size,
                'channel_count': bigtable_requirements.channel_count,
                'bulk_mutation_flow_control': {
                    'max_outstanding_element_count': 1000,
                    'max_outstanding_request_bytes': 100 * 1024 * 1024  # 100 MB
                }
            },
            'data_access_patterns': {
                'hot_spotting_prevention': {
                    'field_promotion': True,
                    'salted_row_keys': bigtable_requirements.use_salted_row_keys,
                    'reverse_domain_notation': bigtable_requirements.use_reverse_domain_keys
                },
                'batch_operations': {
                    'batch_size': bigtable_requirements.batch_size,
                    'parallel_scans': bigtable_requirements.parallel_scan_enabled,
                    'scan_buffer_size': bigtable_requirements.scan_buffer_size
                }
            }
        }

        return CloudBigtableOptimizationPlan(
            instance_config=instance_config,
            cluster_configs=cluster_configs,
            table_optimizations=table_optimizations,
            multi_cluster_config=multi_cluster_config,
            performance_config=performance_config,
            cost_analysis=self.analyze_bigtable_costs(cluster_configs),
            monitoring_setup=self.design_bigtable_monitoring()
        )

Advanced Database Features:

BigQuery Advanced Analytics:
├── BigQuery ML: Machine learning model training and inference
├── BigQuery GIS: Geospatial analytics and visualization
├── BigQuery BI Engine: In-memory analytics acceleration
├── Connected Sheets: Google Sheets integration for analysis
├── Data Transfer Service: Automated data ingestion
├── Streaming Analytics: Real-time data processing
├── Federated Queries: Query external data sources
└── Data Catalog Integration: Metadata management

Cloud Bigtable Integration:
├── HBase API Compatibility: Migrate from Apache HBase
├── Beam Integration: Apache Beam for data processing
├── Dataflow Integration: Google Cloud Dataflow pipelines
├── Spark Integration: Apache Spark connector
├── Monitoring Integration: Cloud Monitoring metrics
├── IAM Integration: Fine-grained access control
├── VPC Integration: Private network access
└── Key Management: Customer-managed encryption keys
```

This comprehensive GCP platform expertise provides HeadElf with deep knowledge of all major Google Cloud services, their architectures, optimization techniques, and best practices for production deployments.

## Outputs
- GCP service recommendations optimized for specific use cases and requirements
- Multi-service architecture designs following Google Cloud best practices
- Cost optimization strategies across all GCP service categories
- Security and compliance configurations for GCP workloads
- Data analytics and AI/ML solution architectures on Google Cloud