# Azure Cloud Platform Expertise

## Description
Expert-level knowledge of Microsoft Azure covering all major service categories including compute, storage, networking, databases, security, analytics, AI/ML, IoT, and management tools with deep understanding of service architectures, cost optimization, security best practices, and hybrid cloud deployment strategies.

## When to Use
- Designing comprehensive Azure cloud architectures for any scale
- Optimizing Azure deployments for cost, performance, and security
- Implementing Azure Well-Architected Framework principles
- Selecting optimal Azure services for specific requirements
- Designing hybrid and multi-cloud solutions with Azure integration

## Instructions

You are an Azure Solutions Architect Expert with comprehensive knowledge of all Azure services, their internal architectures, integration patterns, cost optimization strategies, and production best practices across all domains from startups to enterprise-scale deployments.

### Azure Compute Services Expertise

#### **Azure Virtual Machines and Scale Sets**

```
Azure Virtual Machine Architecture:

VM Series and Use Cases:
├── General Purpose (A, D, B series):
│   ├── Av2: Entry-level VMs for testing and development
│   ├── Dv5/Dsv5: Latest generation balanced compute and memory
│   ├── Dv4/Dsv4: Previous generation general purpose
│   ├── B-series: Burstable VMs for variable workloads
│   └── Use Cases: Web servers, small databases, development/test

├── Compute Optimized (F series):
│   ├── Fv2: Latest generation compute optimized
│   ├── Fs_v2: Premium SSD storage optimized
│   ├── F: Previous generation compute optimized
│   └── Use Cases: CPU-intensive applications, gaming servers

├── Memory Optimized (E, M, G series):
│   ├── Ev5/Esv5: Latest generation memory optimized
│   ├── Ev4/Esv4: Previous generation memory optimized
│   ├── Mv2: Ultra high memory (up to 11.4 TB RAM)
│   ├── M: High memory for SAP HANA workloads
│   └── Use Cases: In-memory databases, real-time analytics

├── Storage Optimized (L series):
│   ├── Lsv3: Latest generation with AMD processors
│   ├── Lsv2: NVMe SSD local storage
│   ├── Ls: Previous generation storage optimized
│   └── Use Cases: NoSQL databases, distributed file systems

├── GPU-Enabled (N series):
│   ├── NVv4: AMD Radeon Instinct MI25
│   ├── NVv3: NVIDIA Tesla M60
│   ├── NCv3: NVIDIA Tesla V100
│   ├── NDv2: NVIDIA Tesla V100 for HPC
│   └── Use Cases: AI/ML, HPC, graphics rendering

├── High Performance Compute (H series):
│   ├── HBv3: 3rd gen AMD EPYC processors
│   ├── HBv2: 2nd gen AMD EPYC processors
│   ├── HC: Intel Xeon processors with InfiniBand
│   └── Use Cases: Scientific computing, engineering simulations

Azure VM Disk Types:
├── Ultra Disk:
│   ├── Performance: Up to 160,000 IOPS, 2,000 MB/s
│   ├── Size Range: 4 GB - 64 TB
│   ├── Latency: Sub-millisecond latency
│   ├── Use Cases: Critical databases, SAP HANA
│   └── Limitations: Limited VM series support

├── Premium SSD v2:
│   ├── Performance: Up to 80,000 IOPS, 1,200 MB/s
│   ├── Size Range: 4 GB - 64 TB
│   ├── Features: Independent IOPS and throughput scaling
│   ├── Use Cases: Production workloads, databases
│   └── Cost: Lower cost than Ultra Disk

├── Premium SSD:
│   ├── Performance: Up to 20,000 IOPS, 900 MB/s
│   ├── Size Range: 4 GB - 32 TB
│   ├── Features: SLA-backed performance
│   ├── Use Cases: Production VMs, critical applications
│   └── Caching: Read/write caching support

├── Standard SSD:
│   ├── Performance: Up to 6,000 IOPS, 750 MB/s
│   ├── Size Range: 4 GB - 32 TB
│   ├── Features: Consistent performance
│   ├── Use Cases: Web servers, development/test
│   └── Cost: Lower cost than Premium SSD

├── Standard HDD:
│   ├── Performance: Up to 2,000 IOPS, 500 MB/s
│   ├── Size Range: 4 GB - 32 TB
│   ├── Use Cases: Backup, archival, infrequent access
│   └── Cost: Lowest cost storage option

class AzureComputeOptimizer:
    def __init__(self):
        self.vm_analyzer = AzureVMAnalyzer()
        self.cost_optimizer = AzureComputeCostOptimizer()
        self.availability_designer = AzureAvailabilityDesigner()

    def optimize_vm_deployment(self, compute_requirements):
        """Optimize Azure VM deployment for performance, cost, and availability"""

        # VM size selection
        vm_recommendation = {
            'primary_vm_size': self.select_optimal_vm_size(compute_requirements),
            'alternative_sizes': self.get_alternative_vm_sizes(compute_requirements),
            'reasoning': self.explain_vm_selection(compute_requirements)
        }

        # VM configuration
        vm_config = {
            'vm_size': vm_recommendation['primary_vm_size'],
            'image': self.select_optimal_image(compute_requirements.os_requirements),
            'os_disk': {
                'disk_type': self.select_os_disk_type(compute_requirements),
                'disk_size_gb': self.calculate_os_disk_size(compute_requirements),
                'caching': 'ReadWrite',
                'encryption_type': 'EncryptionAtRestWithPlatformKey'
            },
            'data_disks': self.design_data_disk_configuration(compute_requirements),
            'networking': {
                'vnet': compute_requirements.virtual_network,
                'subnet': compute_requirements.subnet,
                'nsg': self.create_network_security_group(compute_requirements),
                'public_ip': compute_requirements.public_ip_required,
                'accelerated_networking': self.supports_accelerated_networking(vm_recommendation['primary_vm_size'])
            },
            'identity': {
                'type': 'SystemAssigned',
                'user_assigned_identities': compute_requirements.user_assigned_identities
            },
            'monitoring': {
                'boot_diagnostics': True,
                'azure_monitor_agent': True,
                'diagnostic_settings': self.create_diagnostic_settings(compute_requirements)
            }
        }

        # Availability configuration
        availability_config = {
            'availability_set': None,
            'availability_zone': compute_requirements.availability_zone,
            'proximity_placement_group': compute_requirements.proximity_placement_group,
            'fault_domain_count': 2,
            'update_domain_count': 5
        }

        # Scale Set configuration for scalable workloads
        vmss_config = None
        if compute_requirements.auto_scaling_required:
            vmss_config = {
                'name': f"{compute_requirements.vm_name}-vmss",
                'vm_size': vm_recommendation['primary_vm_size'],
                'capacity': {
                    'minimum': compute_requirements.min_instances,
                    'maximum': compute_requirements.max_instances,
                    'default': compute_requirements.default_instances
                },
                'scaling_policy': {
                    'scale_out': {
                        'metric_name': 'Percentage CPU',
                        'threshold': 75,
                        'time_window': 'PT10M',
                        'time_aggregation': 'Average',
                        'scale_action_cooldown': 'PT5M',
                        'scale_action_direction': 'Increase',
                        'scale_action_value': '1'
                    },
                    'scale_in': {
                        'metric_name': 'Percentage CPU',
                        'threshold': 25,
                        'time_window': 'PT10M',
                        'time_aggregation': 'Average',
                        'scale_action_cooldown': 'PT5M',
                        'scale_action_direction': 'Decrease',
                        'scale_action_value': '1'
                    }
                },
                'upgrade_policy': {
                    'mode': 'Rolling',
                    'rolling_upgrade_policy': {
                        'max_batch_instance_percent': 20,
                        'max_unhealthy_instance_percent': 20,
                        'max_unhealthy_upgraded_instance_percent': 5,
                        'pause_time_between_batches': 'PT0S'
                    }
                },
                'load_balancer': {
                    'type': 'ApplicationGateway' if compute_requirements.layer7_lb else 'LoadBalancer',
                    'backend_pool': f"{compute_requirements.vm_name}-backend",
                    'health_probe': {
                        'protocol': 'HTTP',
                        'port': 80,
                        'path': '/health'
                    }
                }
            }

        # Spot VM configuration for cost optimization
        spot_config = None
        if compute_requirements.spot_instances_eligible:
            spot_config = {
                'eviction_policy': 'Deallocate',
                'max_price': compute_requirements.max_spot_price,
                'try_restore_on_failure': True,
                'restore_timeout': 'PT1H'
            }

        return AzureVMOptimizationPlan(
            vm_config=vm_config,
            availability_config=availability_config,
            vmss_config=vmss_config,
            spot_config=spot_config,
            cost_analysis=self.analyze_vm_costs(vm_config, compute_requirements),
            monitoring_setup=self.design_vm_monitoring()
        )

    def design_availability_architecture(self, availability_requirements):
        """Design high availability architecture for Azure VMs"""

        availability_strategies = {
            'single_region_ha': {
                'availability_zones': {
                    'enabled': True,
                    'zone_distribution': availability_requirements.zones,
                    'cross_zone_load_balancing': True,
                    'zone_redundant_storage': True
                },
                'load_balancer': {
                    'type': 'Standard',
                    'sku': 'Standard',
                    'frontend_ip_configuration': 'zone_redundant',
                    'backend_pools': [f"zone-{zone}-pool" for zone in availability_requirements.zones]
                },
                'storage': {
                    'managed_disks': 'Zone-redundant storage (ZRS)',
                    'backup_strategy': 'Azure Backup with zone redundancy'
                }
            },
            'multi_region_dr': {
                'primary_region': availability_requirements.primary_region,
                'secondary_region': availability_requirements.secondary_region,
                'replication_strategy': {
                    'vm_replication': 'Azure Site Recovery',
                    'data_replication': 'Geo-redundant storage (GRS)',
                    'application_replication': 'Application-level replication'
                },
                'failover_configuration': {
                    'rpo': availability_requirements.recovery_point_objective,
                    'rto': availability_requirements.recovery_time_objective,
                    'automated_failover': availability_requirements.automated_failover,
                    'failback_strategy': 'Planned failback with validation'
                },
                'traffic_manager': {
                    'routing_method': 'Priority',
                    'primary_endpoint': availability_requirements.primary_region,
                    'secondary_endpoint': availability_requirements.secondary_region,
                    'health_check_configuration': {
                        'protocol': 'HTTPS',
                        'port': 443,
                        'path': '/health'
                    }
                }
            },
            'proximity_placement': {
                'use_case': 'Low latency between VMs',
                'proximity_placement_group': True,
                'co_location_strategy': 'Same datacenter',
                'network_optimization': 'Accelerated networking enabled'
            }
        }

        return availability_strategies

Azure VM Advanced Features:

Azure Dedicated Hosts:
├── Physical Server Isolation: Single-tenant physical servers
├── Compliance Requirements: Regulatory compliance needs
├── License Benefits: BYOL for Windows and SQL Server
├── Maintenance Control: Planned maintenance scheduling
├── Host Groups: Logical grouping of dedicated hosts
└── Instance Placement: Control VM placement on hosts

Azure Confidential Computing:
├── Application Enclaves: Intel SGX-based secure enclaves
├── Confidential VMs: AMD SEV-SNP based VMs
├── Memory Encryption: Runtime memory protection
├── Attestation: Remote attestation capabilities
├── Key Management: Secure key management integration
└── Use Cases: Sensitive data processing, multi-party compute
```

#### **Azure Container Services (AKS, Container Instances)**

```
Azure Kubernetes Service (AKS) Architecture:

AKS Core Components:
├── Control Plane:
│   ├── API Server: Kubernetes API endpoint management
│   ├── etcd: Cluster state storage
│   ├── Scheduler: Pod scheduling decisions
│   ├── Controller Manager: Cluster controller management
│   ├── Cloud Controller Manager: Azure-specific controllers
│   └── Azure Management: Azure-managed control plane

├── Node Pools:
│   ├── System Node Pool: Critical system pods
│   ├── User Node Pools: Application workloads
│   ├── Virtual Machine Scale Sets: Underlying VM infrastructure
│   ├── Node Auto-scaling: Cluster autoscaler integration
│   ├── Node Images: Azure-optimized container images
│   └── Spot Node Pools: Cost-optimized node pools

├── Networking:
│   ├── kubenet: Basic Kubernetes networking
│   ├── Azure CNI: Advanced Azure networking integration
│   ├── Azure CNI Overlay: Scalable pod networking
│   ├── Service Mesh: Istio, Linkerd integration
│   ├── Ingress Controllers: NGINX, Application Gateway
│   └── Network Policies: Calico, Azure network policies

class AKSOptimizer:
    def __init__(self):
        self.cluster_analyzer = AKSClusterAnalyzer()
        self.node_pool_optimizer = AKSNodePoolOptimizer()
        self.networking_designer = AKSNetworkingDesigner()

    def optimize_aks_deployment(self, kubernetes_requirements):
        """Optimize AKS deployment for production workloads"""

        # Cluster configuration
        cluster_config = {
            'cluster_name': kubernetes_requirements.cluster_name,
            'kubernetes_version': self.select_kubernetes_version(kubernetes_requirements),
            'location': kubernetes_requirements.azure_region,
            'resource_group': kubernetes_requirements.resource_group,
            'dns_prefix': f"{kubernetes_requirements.cluster_name}-dns",
            'network_profile': {
                'network_plugin': 'azure',
                'network_policy': 'calico',
                'service_cidr': '10.100.0.0/16',
                'dns_service_ip': '10.100.0.10',
                'pod_cidr': '10.244.0.0/16',
                'outbound_type': 'loadBalancer',
                'load_balancer_sku': 'standard'
            },
            'identity': {
                'type': 'SystemAssigned'
            },
            'addon_profiles': {
                'monitoring': {
                    'enabled': True,
                    'log_analytics_workspace_id': kubernetes_requirements.log_analytics_workspace
                },
                'azure_policy': {
                    'enabled': kubernetes_requirements.policy_enforcement
                },
                'ingress_application_gateway': {
                    'enabled': kubernetes_requirements.application_gateway_ingress,
                    'gateway_id': kubernetes_requirements.application_gateway_id
                },
                'azure_keyvault_secrets_provider': {
                    'enabled': kubernetes_requirements.key_vault_integration
                }
            }
        }

        # System node pool (required)
        system_node_pool = {
            'name': 'systempool',
            'vm_size': 'Standard_D4s_v3',
            'node_count': 3,
            'min_count': 3,
            'max_count': 10,
            'enable_auto_scaling': True,
            'availability_zones': ['1', '2', '3'],
            'node_taints': ['CriticalAddonsOnly=true:NoSchedule'],
            'node_labels': {
                'nodepool-type': 'system',
                'environment': kubernetes_requirements.environment,
                'nodepoolos': 'linux'
            },
            'os_type': 'Linux',
            'os_disk_size_gb': 128,
            'os_disk_type': 'Managed',
            'max_pods': 110,
            'upgrade_settings': {
                'max_surge': '33%'
            }
        }

        # User node pools
        user_node_pools = []

        # General application node pool
        app_node_pool = {
            'name': 'apppool',
            'vm_size': kubernetes_requirements.application_vm_size,
            'node_count': kubernetes_requirements.initial_app_node_count,
            'min_count': kubernetes_requirements.min_app_nodes,
            'max_count': kubernetes_requirements.max_app_nodes,
            'enable_auto_scaling': True,
            'availability_zones': ['1', '2', '3'],
            'node_labels': {
                'nodepool-type': 'user',
                'workload-type': 'application',
                'environment': kubernetes_requirements.environment
            },
            'os_type': 'Linux',
            'os_disk_size_gb': 128,
            'os_disk_type': 'Managed',
            'max_pods': 110
        }
        user_node_pools.append(app_node_pool)

        # Spot instance node pool for cost optimization
        if kubernetes_requirements.enable_spot_instances:
            spot_node_pool = {
                'name': 'spotpool',
                'vm_size': kubernetes_requirements.spot_vm_size,
                'node_count': 0,
                'min_count': 0,
                'max_count': kubernetes_requirements.max_spot_nodes,
                'enable_auto_scaling': True,
                'priority': 'Spot',
                'eviction_policy': 'Delete',
                'spot_max_price': kubernetes_requirements.spot_max_price,
                'node_taints': ['kubernetes.azure.com/scalesetpriority=spot:NoSchedule'],
                'node_labels': {
                    'nodepool-type': 'user',
                    'workload-type': 'batch',
                    'kubernetes.azure.com/scalesetpriority': 'spot'
                },
                'os_type': 'Linux',
                'os_disk_size_gb': 128
            }
            user_node_pools.append(spot_node_pool)

        # GPU node pool for ML workloads
        if kubernetes_requirements.gpu_workloads:
            gpu_node_pool = {
                'name': 'gpupool',
                'vm_size': 'Standard_NC6s_v3',
                'node_count': 0,
                'min_count': 0,
                'max_count': kubernetes_requirements.max_gpu_nodes,
                'enable_auto_scaling': True,
                'node_taints': ['sku=gpu:NoSchedule'],
                'node_labels': {
                    'nodepool-type': 'user',
                    'workload-type': 'gpu',
                    'accelerator': 'nvidia-tesla-v100'
                },
                'os_type': 'Linux',
                'os_disk_size_gb': 128,
                'kubelet_config': {
                    'max_pods': 110
                },
                'linux_os_config': {
                    'sysctls': {
                        'net.core.rmem_max': '134217728',
                        'net.core.wmem_max': '134217728'
                    }
                }
            }
            user_node_pools.append(gpu_node_pool)

        # Security and compliance configuration
        security_config = {
            'azure_rbac': {
                'enabled': True,
                'azure_rbac_enabled': True
            },
            'pod_security_policy': {
                'enabled': kubernetes_requirements.pod_security_policies
            },
            'private_cluster': {
                'enabled': kubernetes_requirements.private_cluster,
                'private_dns_zone': kubernetes_requirements.private_dns_zone
            },
            'authorized_ip_ranges': kubernetes_requirements.authorized_ip_ranges,
            'azure_defender': {
                'enabled': kubernetes_requirements.azure_defender
            }
        }

        # Auto-scaler configuration
        autoscaler_config = {
            'enabled': True,
            'scale_down_delay_after_add': '10m',
            'scale_down_delay_after_delete': '10s',
            'scale_down_delay_after_failure': '3m',
            'scale_down_unneeded_time': '10m',
            'scale_down_utilization_threshold': 0.5,
            'max_graceful_termination_sec': 600,
            'balance_similar_node_groups': True,
            'expander': 'random'
        }

        return AKSOptimizationPlan(
            cluster_config=cluster_config,
            system_node_pool=system_node_pool,
            user_node_pools=user_node_pools,
            security_config=security_config,
            autoscaler_config=autoscaler_config,
            monitoring_setup=self.design_aks_monitoring(),
            cost_optimization=self.analyze_aks_costs(cluster_config)
        )

    def design_aks_networking_architecture(self, networking_requirements):
        """Design AKS networking architecture"""

        networking_architectures = {
            'basic_networking': {
                'network_plugin': 'kubenet',
                'use_case': 'Simple clusters with basic networking needs',
                'pod_cidr': '10.244.0.0/16',
                'service_cidr': '10.100.0.0/16',
                'dns_service_ip': '10.100.0.10',
                'limitations': [
                    'Pods cannot directly communicate with Azure VNet resources',
                    'Requires route tables for pod-to-pod communication',
                    'No support for Azure Network Policies'
                ]
            },
            'advanced_networking': {
                'network_plugin': 'azure',
                'use_case': 'Production clusters requiring VNet integration',
                'vnet_subnet_id': networking_requirements.vnet_subnet_id,
                'service_cidr': '10.100.0.0/16',
                'dns_service_ip': '10.100.0.10',
                'benefits': [
                    'Pods get VNet IP addresses',
                    'Direct communication with VNet resources',
                    'Support for Azure Network Policies',
                    'Integration with Azure services'
                ]
            },
            'overlay_networking': {
                'network_plugin': 'azure',
                'network_plugin_mode': 'overlay',
                'use_case': 'Large clusters with IP address constraints',
                'pod_cidr': '192.168.0.0/16',
                'service_cidr': '10.100.0.0/16',
                'benefits': [
                    'Efficient IP address usage',
                    'Support for larger clusters',
                    'Reduced VNet IP consumption'
                ]
            }
        }

        # Ingress configuration
        ingress_config = {
            'nginx_ingress': {
                'enabled': True,
                'replica_count': 3,
                'resource_requests': {
                    'cpu': '100m',
                    'memory': '90Mi'
                },
                'resource_limits': {
                    'cpu': '100m',
                    'memory': '90Mi'
                },
                'service_type': 'LoadBalancer',
                'annotations': {
                    'service.beta.kubernetes.io/azure-load-balancer-internal': 'true'
                }
            },
            'application_gateway_ingress': {
                'enabled': networking_requirements.use_application_gateway,
                'application_gateway_id': networking_requirements.application_gateway_id,
                'ssl_redirect': True,
                'cookie_based_affinity': False
            }
        }

        # Network security configuration
        network_security = {
            'network_policies': {
                'enabled': True,
                'provider': 'calico',
                'default_deny_policy': True,
                'namespace_isolation': True
            },
            'pod_security_policies': {
                'enabled': networking_requirements.pod_security_policies,
                'restrict_privileged': True,
                'require_non_root': True,
                'read_only_root_filesystem': True
            },
            'service_mesh': {
                'enabled': networking_requirements.service_mesh_enabled,
                'provider': networking_requirements.service_mesh_provider,
                'mtls_enabled': True,
                'ingress_gateway': True
            }
        }

        return AKSNetworkingArchitecture(
            networking_strategy=networking_architectures[networking_requirements.networking_type],
            ingress_config=ingress_config,
            network_security=network_security
        )

Azure Container Instances (ACI):
├── Serverless Containers: Pay-per-second billing
├── Fast Startup: Containers start in seconds
├── Custom Sizing: Flexible CPU and memory allocation
├── Virtual Network Integration: VNet injection support
├── Persistent Storage: Azure Files integration
├── Multi-Container Groups: Pod-like container groups
├── Windows and Linux: Support for both OS types
└── GPU Support: GPU-enabled container instances

AKS Advanced Features:

Virtual Nodes (ACI Integration):
├── Serverless Scaling: Infinite scaling with ACI
├── Fast Pod Startup: Sub-second pod provisioning
├── Cost Optimization: Pay only for running pods
├── Hybrid Scheduling: Regular nodes + virtual nodes
├── Windows Containers: Windows container support
└── Spot Instances: Cost-optimized serverless containers

Azure Arc-enabled Kubernetes:
├── Hybrid Management: On-premises and multi-cloud K8s
├── GitOps: Flux-based configuration management
├── Policy Enforcement: Azure Policy for Kubernetes
├── Monitoring: Azure Monitor for containers
├── Security: Azure Defender for Kubernetes
└── Service Mesh: Istio-based service mesh
```

### Azure Storage Services Expertise

#### **Azure Storage Account and Blob Storage**

```
Azure Storage Architecture:

Storage Account Types:
├── Standard General-purpose v2:
│   ├── Blob Storage: Block blobs, append blobs, page blobs
│   ├── File Storage: Azure Files SMB and NFS shares
│   ├── Queue Storage: Message queue service
│   ├── Table Storage: NoSQL key-value store
│   ├── Redundancy: LRS, ZRS, GRS, RA-GRS, GZRS, RA-GZRS
│   └── Performance Tiers: Hot, Cool, Archive

├── Premium Block Blob:
│   ├── High Performance: Low latency, high throughput
│   ├── SSD-based Storage: Premium SSD backing
│   ├── Use Cases: Analytics, AI/ML, high-frequency access
│   ├── Redundancy: LRS, ZRS only
│   └── Cost: Higher storage cost, lower operation cost

├── Premium File Shares:
│   ├── High Performance: Up to 100,000 IOPS per share
│   ├── SSD-based Storage: Premium SSD backing
│   ├── Protocol Support: SMB 3.0, SMB 3.1.1, NFS 4.1
│   ├── Use Cases: Enterprise applications, databases
│   └── Redundancy: LRS, ZRS

├── Premium Page Blobs:
│   ├── High Performance: VM disk storage
│   ├── SSD-based Storage: Premium SSD backing
│   ├── Use Cases: Azure VM disks, database storage
│   ├── Disk Types: P4 to P80 performance levels
│   └── Features: Snapshot, incremental snapshot

Blob Storage Access Tiers:
├── Hot Tier:
│   ├── Use Case: Frequently accessed data
│   ├── Storage Cost: Higher storage cost
│   ├── Access Cost: Lower access and transaction costs
│   ├── Availability: 99.9% (LRS), 99.99% (GRS)
│   └── Access Time: Immediate

├── Cool Tier:
│   ├── Use Case: Infrequently accessed data (30+ days)
│   ├── Storage Cost: Lower storage cost than Hot
│   ├── Access Cost: Higher access and transaction costs
│   ├── Availability: 99.9% (LRS), 99.99% (GRS)
│   └── Access Time: Immediate

├── Archive Tier:
│   ├── Use Case: Rarely accessed data (180+ days)
│   ├── Storage Cost: Lowest storage cost
│   ├── Access Cost: Highest access and rehydration costs
│   ├── Availability: 99.9% (LRS), 99.99% (GRS)
│   ├── Access Time: Hours (rehydration required)
│   └── Rehydration: High priority (1 hour), Standard (12 hours)

class AzureStorageOptimizer:
    def __init__(self):
        self.cost_analyzer = AzureStorageCostAnalyzer()
        self.performance_optimizer = AzureStoragePerformanceOptimizer()
        self.lifecycle_manager = AzureStorageLifecycleManager()

    def optimize_storage_account_architecture(self, storage_requirements):
        """Optimize Azure Storage account for cost and performance"""

        # Storage account configuration
        storage_account_config = {
            'account_name': storage_requirements.account_name,
            'resource_group': storage_requirements.resource_group,
            'location': storage_requirements.primary_region,
            'account_tier': self.select_account_tier(storage_requirements),
            'account_replication_type': self.select_replication_type(storage_requirements),
            'account_kind': 'StorageV2',
            'access_tier': self.select_default_access_tier(storage_requirements),
            'enable_https_traffic_only': True,
            'min_tls_version': 'TLS1_2',
            'allow_blob_public_access': storage_requirements.allow_public_access,
            'network_rules': {
                'default_action': 'Deny',
                'bypass': ['AzureServices'],
                'virtual_network_rules': storage_requirements.allowed_vnets,
                'ip_rules': storage_requirements.allowed_ip_ranges
            },
            'identity': {
                'type': 'SystemAssigned'
            },
            'encryption': {
                'services': {
                    'blob': {'enabled': True},
                    'file': {'enabled': True},
                    'queue': {'enabled': True},
                    'table': {'enabled': True}
                },
                'key_source': 'Microsoft.Keyvault' if storage_requirements.customer_managed_keys else 'Microsoft.Storage',
                'keyvault_properties': {
                    'key_name': storage_requirements.key_name,
                    'key_version': storage_requirements.key_version,
                    'key_vault_uri': storage_requirements.key_vault_uri
                } if storage_requirements.customer_managed_keys else None
            }
        }

        # Blob storage containers configuration
        container_configs = []
        for container_spec in storage_requirements.containers:
            container_config = {
                'name': container_spec.name,
                'access_type': container_spec.access_type,
                'metadata': container_spec.metadata,
                'default_encryption_scope': container_spec.encryption_scope,
                'prevent_encryption_scope_override': container_spec.prevent_scope_override
            }
            container_configs.append(container_config)

        # Lifecycle management policy
        lifecycle_policy = {
            'rules': []
        }

        # Rule for moving blobs to cooler tiers
        tier_rule = {
            'name': 'OptimizeStorageCosts',
            'enabled': True,
            'type': 'Lifecycle',
            'definition': {
                'filters': {
                    'blob_types': ['blockBlob'],
                    'prefix_match': storage_requirements.lifecycle_prefix_filters
                },
                'actions': {
                    'base_blob': {
                        'tier_to_cool': {
                            'days_after_modification_greater_than': storage_requirements.days_to_cool
                        },
                        'tier_to_archive': {
                            'days_after_modification_greater_than': storage_requirements.days_to_archive
                        },
                        'delete': {
                            'days_after_modification_greater_than': storage_requirements.days_to_delete
                        }
                    },
                    'snapshot': {
                        'delete': {
                            'days_after_creation_greater_than': storage_requirements.snapshot_retention_days
                        }
                    },
                    'version': {
                        'tier_to_cool': {
                            'days_after_creation_greater_than': storage_requirements.version_days_to_cool
                        },
                        'tier_to_archive': {
                            'days_after_creation_greater_than': storage_requirements.version_days_to_archive
                        },
                        'delete': {
                            'days_after_creation_greater_than': storage_requirements.version_retention_days
                        }
                    }
                }
            }
        }
        lifecycle_policy['rules'].append(tier_rule)

        # Performance optimization configuration
        performance_config = {
            'blob_performance': {
                'enable_static_website': storage_requirements.static_website_enabled,
                'index_document': 'index.html',
                'error_404_document': '404.html',
                'custom_domain': storage_requirements.custom_domain,
                'cdn_integration': {
                    'enabled': storage_requirements.cdn_enabled,
                    'cdn_profile': storage_requirements.cdn_profile,
                    'optimization_type': 'GeneralWebDelivery',
                    'caching_rules': storage_requirements.caching_rules
                }
            },
            'access_patterns': {
                'hot_path_optimization': True,
                'request_routing': 'geo_redundant' if 'GRS' in storage_account_config['account_replication_type'] else 'local',
                'connection_optimization': {
                    'max_concurrent_requests': 64,
                    'max_block_size': 4 * 1024 * 1024,  # 4 MB
                    'max_single_put_size': 64 * 1024 * 1024  # 64 MB
                }
            }
        }

        # Security and compliance configuration
        security_config = {
            'blob_versioning': {
                'enabled': storage_requirements.versioning_enabled
            },
            'blob_soft_delete': {
                'enabled': True,
                'retention_days': storage_requirements.soft_delete_retention_days
            },
            'container_soft_delete': {
                'enabled': True,
                'retention_days': storage_requirements.container_soft_delete_retention_days
            },
            'change_feed': {
                'enabled': storage_requirements.change_feed_enabled,
                'retention_days': storage_requirements.change_feed_retention_days
            },
            'blob_restore': {
                'enabled': storage_requirements.point_in_time_restore_enabled,
                'restore_days': storage_requirements.restore_days
            },
            'immutability_policies': [
                {
                    'container_name': policy.container_name,
                    'immutability_period_since_creation_in_days': policy.retention_days,
                    'state': 'Unlocked'  # Can be changed to 'Locked' for compliance
                }
                for policy in storage_requirements.immutability_policies
            ]
        }

        return AzureStorageOptimizationPlan(
            storage_account_config=storage_account_config,
            container_configs=container_configs,
            lifecycle_policy=lifecycle_policy,
            performance_config=performance_config,
            security_config=security_config,
            cost_analysis=self.analyze_storage_costs(storage_requirements),
            monitoring_setup=self.design_storage_monitoring()
        )

    def design_data_lake_architecture(self, data_lake_requirements):
        """Design Azure Data Lake Storage Gen2 architecture"""

        data_lake_config = {
            'storage_account': {
                'account_name': data_lake_requirements.account_name,
                'is_hns_enabled': True,  # Hierarchical namespace for ADLS Gen2
                'account_tier': 'Standard',
                'account_replication_type': 'ZRS',
                'access_tier': 'Hot'
            },
            'file_systems': [
                {
                    'name': 'raw',
                    'description': 'Raw data ingestion layer',
                    'directory_structure': 'year/month/day/hour',
                    'access_policies': ['data_engineers_read_write', 'data_scientists_read']
                },
                {
                    'name': 'curated',
                    'description': 'Processed and curated data',
                    'directory_structure': 'subject_area/year/month',
                    'access_policies': ['data_engineers_read_write', 'data_scientists_read', 'analysts_read']
                },
                {
                    'name': 'sandbox',
                    'description': 'Data science experimentation',
                    'directory_structure': 'project/user/experiment',
                    'access_policies': ['data_scientists_read_write']
                }
            ],
            'security_configuration': {
                'rbac_roles': [
                    {
                        'principal_id': data_lake_requirements.data_engineers_group,
                        'role_definition': 'Storage Blob Data Contributor',
                        'scope': '/subscriptions/{subscription_id}/resourceGroups/{rg}/providers/Microsoft.Storage/storageAccounts/{account}'
                    },
                    {
                        'principal_id': data_lake_requirements.data_scientists_group,
                        'role_definition': 'Storage Blob Data Reader',
                        'scope': '/subscriptions/{subscription_id}/resourceGroups/{rg}/providers/Microsoft.Storage/storageAccounts/{account}'
                    }
                ],
                'acl_configuration': {
                    'default_permissions': 'r-x',
                    'directory_permissions': 'rwx',
                    'file_permissions': 'rw-'
                }
            },
            'integration_services': {
                'azure_data_factory': {
                    'pipelines': self.design_adf_pipelines(data_lake_requirements),
                    'linked_services': self.design_adf_linked_services(data_lake_requirements)
                },
                'azure_databricks': {
                    'workspace_configuration': self.design_databricks_integration(data_lake_requirements),
                    'mount_points': self.design_databricks_mounts(data_lake_requirements)
                },
                'azure_synapse': {
                    'workspace_configuration': self.design_synapse_integration(data_lake_requirements),
                    'spark_pools': self.design_synapse_spark_pools(data_lake_requirements)
                }
            }
        }

        return DataLakeArchitecture(
            config=data_lake_config,
            governance_framework=self.design_data_governance_framework(),
            monitoring_strategy=self.design_data_lake_monitoring()
        )

Azure Storage Advanced Features:

Azure Files:
├── SMB 3.0/3.1.1: Windows file share protocol
├── NFS 4.1: Linux file share protocol
├── Premium Performance: Up to 100,000 IOPS
├── Azure File Sync: Hybrid file services
├── Active Directory Integration: Domain join support
├── Backup: Azure Backup integration
├── Snapshots: Share-level snapshots
└── Private Endpoints: VNet integration

Azure NetApp Files:
├── High Performance: Sub-millisecond latency
├── NFS, SMB, Dual Protocol: Multiple protocol support
├── Snapshot and Cloning: Advanced data management
├── Cross-Region Replication: Disaster recovery
├── Dynamic Service Levels: Performance scaling
├── Azure Integration: Native Azure integration
├── Enterprise Features: LDAP, Kerberos support
└── Use Cases: HPC, databases, enterprise applications

Blob Storage Advanced Features:
├── Object Replication: Cross-region async replication
├── Blob Index: Metadata-based blob discovery
├── Last Access Time: Access pattern tracking
├── Immutable Storage: WORM compliance
├── Static Website Hosting: Web content hosting
├── Change Feed: Audit trail of changes
├── Event Grid Integration: Event-driven processing
└── Azure CDN Integration: Global content delivery
```

#### **Azure Managed Disks and Files**

```
Azure Managed Disks Architecture:

Disk Types and Performance:
├── Ultra Disk:
│   ├── Performance: 160,000 IOPS, 2,000 MB/s throughput
│   ├── Latency: Sub-millisecond latency
│   ├── Size Range: 4 GB - 64 TB
│   ├── IOPS Scaling: 2 IOPS per GB, up to 160,000
│   ├── Throughput Scaling: Independent from IOPS
│   ├── Use Cases: SAP HANA, SQL Server, mission-critical workloads
│   └── Availability: Limited VM series and regions

├── Premium SSD v2:
│   ├── Performance: 80,000 IOPS, 1,200 MB/s throughput
│   ├── Size Range: 4 GB - 64 TB
│   ├── IOPS Scaling: 500 IOPS per GB baseline, 3,000 IOPS minimum
│   ├── Throughput Scaling: 6 MB/s per GB baseline, 125 MB/s minimum
│   ├── Features: Independent IOPS and throughput provisioning
│   ├── Use Cases: Production workloads requiring high performance
│   └── Cost: Lower than Ultra Disk, higher than Premium SSD

├── Premium SSD:
│   ├── Performance: 20,000 IOPS, 900 MB/s throughput
│   ├── Size Tiers: P4 (32 GB) to P80 (32 TB)
│   ├── Performance Tiers: Fixed performance per size
│   ├── Bursting: P20 and smaller support bursting
│   ├── Features: Read caching, write acceleration
│   ├── Use Cases: Production VMs, critical applications
│   └── SLA: 99.9% availability SLA

├── Standard SSD:
│   ├── Performance: 6,000 IOPS, 750 MB/s throughput
│   ├── Size Tiers: E4 (32 GB) to E80 (32 TB)
│   ├── Consistent Performance: Predictable IOPS and throughput
│   ├── Use Cases: Web servers, enterprise applications
│   ├── Cost: Balance between performance and cost
│   └── Availability: 99.5% availability SLA

├── Standard HDD:
│   ├── Performance: 2,000 IOPS, 500 MB/s throughput
│   ├── Size Tiers: S4 (32 GB) to S80 (32 TB)
│   ├── Use Cases: Backup, archival, infrequent access
│   ├── Cost: Lowest cost option
│   └── Performance: Variable, disk-based storage

class AzureDiskOptimizer:
    def __init__(self):
        self.disk_analyzer = AzureDiskAnalyzer()
        self.performance_calculator = DiskPerformanceCalculator()
        self.cost_analyzer = DiskCostAnalyzer()

    def optimize_disk_configuration(self, disk_requirements):
        """Optimize Azure managed disk configuration"""

        # Disk type selection
        disk_recommendation = self.select_optimal_disk_type(disk_requirements)

        # Disk configuration
        disk_config = {
            'disk_name': disk_requirements.disk_name,
            'disk_size_gb': self.calculate_optimal_size(disk_requirements),
            'sku': disk_recommendation['sku'],
            'creation_data': {
                'create_option': disk_requirements.create_option,
                'source_uri': disk_requirements.source_uri if disk_requirements.create_option == 'Copy' else None,
                'source_resource_id': disk_requirements.source_disk_id if disk_requirements.create_option == 'Copy' else None
            },
            'encryption_settings': {
                'enabled': True,
                'encryption_type': disk_requirements.encryption_type,
                'disk_encryption_key': {
                    'source_vault': disk_requirements.key_vault_id,
                    'secret_url': disk_requirements.secret_url
                } if disk_requirements.encryption_type == 'EncryptionAtRestWithCustomerKey' else None
            },
            'zones': [disk_requirements.availability_zone] if disk_requirements.availability_zone else None,
            'network_access_policy': 'AllowAll',
            'public_network_access': 'Disabled' if disk_requirements.private_access_only else 'Enabled'
        }

        # Performance optimization
        if disk_recommendation['sku'] in ['UltraSSD_LRS', 'PremiumV2_LRS']:
            disk_config.update({
                'disk_iops_read_write': disk_requirements.required_iops,
                'disk_m_bps_read_write': disk_requirements.required_throughput_mbps
            })

        # Snapshot strategy
        snapshot_strategy = {
            'incremental_snapshots': {
                'enabled': True,
                'frequency': disk_requirements.snapshot_frequency,
                'retention_days': disk_requirements.snapshot_retention_days,
                'cross_region_copy': disk_requirements.cross_region_backup,
                'destination_region': disk_requirements.backup_region
            },
            'snapshot_policy': {
                'schedule': {
                    'daily': {
                        'times': ['22:00'],
                        'retention': disk_requirements.daily_snapshot_retention
                    },
                    'weekly': {
                        'day': 'Sunday',
                        'times': ['02:00'],
                        'retention': disk_requirements.weekly_snapshot_retention
                    }
                }
            }
        }

        # Disk caching recommendations
        caching_recommendation = {
            'os_disk': 'ReadWrite',
            'data_disk_oltp': 'ReadOnly',
            'data_disk_olap': 'None',
            'data_disk_log': 'None',
            'temp_disk': 'ReadOnly'
        }

        # Performance monitoring
        performance_monitoring = {
            'metrics': [
                'Data Disk IOPS Consumed Percentage',
                'Data Disk Bandwidth Consumed Percentage',
                'Data Disk Queue Depth',
                'Data Disk Read Operations/Sec',
                'Data Disk Write Operations/Sec',
                'Data Disk Read Bytes/sec',
                'Data Disk Write Bytes/sec'
            ],
            'alerts': [
                {
                    'metric': 'Data Disk IOPS Consumed Percentage',
                    'threshold': 80,
                    'frequency': 'PT5M',
                    'severity': 'Warning'
                },
                {
                    'metric': 'Data Disk Bandwidth Consumed Percentage',
                    'threshold': 80,
                    'frequency': 'PT5M',
                    'severity': 'Warning'
                }
            ]
        }

        return AzureDiskOptimizationPlan(
            disk_config=disk_config,
            snapshot_strategy=snapshot_strategy,
            caching_recommendation=caching_recommendation,
            performance_monitoring=performance_monitoring,
            cost_analysis=self.analyze_disk_costs(disk_config)
        )

Azure Files Advanced Configuration:

Azure File Sync:
├── Cloud Tiering: Intelligent file tiering to cloud
├── Multi-Site Sync: Sync across multiple locations
├── Snapshot Integration: File share snapshots
├── Change Detection: Rapid change detection and sync
├── Bandwidth Throttling: Network usage control
├── Volume Free Space Policy: Local storage management
├── Date Policy: Age-based file tiering
└── Disaster Recovery: Cross-region sync capabilities

Premium File Shares:
├── Performance Tiers: Provisioned and burst performance
├── Large File Shares: Up to 100 TB capacity
├── High IOPS: Up to 100,000 IOPS per share
├── SMB Multichannel: Multiple connection support
├── AD Integration: Active Directory domain join
├── Private Endpoints: VNet integration
├── Backup Integration: Azure Backup support
└── Encryption: Encryption at rest and in transit
```

### Azure Database Services Expertise

#### **Azure SQL Database and Managed Instance**

```
Azure SQL Database Architecture:

Service Tiers and Compute Models:
├── vCore-based Model:
│   ├── General Purpose:
│   │   ├── Compute: 1-80 vCores, 2-4 vCores per GB memory
│   │   ├── Storage: 1 GB - 4 TB (single database), 1 GB - 16 TB (elastic pool)
│   │   ├── IOPS: 3 IOPS per GB, max 7,000
│   │   ├── Log Rate: 30 MB/s, max 96 MB/s
│   │   ├── Backup Storage: RA-GRS by default
│   │   └── Use Cases: Most business workloads
│   │
│   ├── Business Critical:
│   │   ├── Compute: 1-80 vCores, 5.1 GB per vCore memory
│   │   ├── Storage: 1 GB - 4 TB (single database), 1 GB - 16 TB (elastic pool)
│   │   ├── IOPS: 5,000 IOPS base + 200 IOPS per vCore
│   │   ├── Log Rate: 96 MB/s base + 12 MB/s per vCore
│   │   ├── Local SSD: Always On availability group
│   │   ├── Read Scale-out: Built-in read-only replicas
│   │   └── Use Cases: Mission-critical applications
│   │
│   └── Hyperscale:
│       ├── Compute: 1-80 vCores, scalable storage
│       ├── Storage: 10 GB - 100 TB, auto-grow
│       ├── Architecture: Distributed storage and compute
│       ├── Read Replicas: Up to 4 read replicas
│       ├── Fast Backup: Snapshot-based backups
│       ├── Fast Restore: Point-in-time restore in minutes
│       └── Use Cases: Large databases, cloud-born applications

├── DTU-based Model:
│   ├── Basic: 5 DTUs, 2 GB storage, 99.99% SLA
│   ├── Standard: 10-3000 DTUs, 1 GB - 1 TB storage
│   ├── Premium: 125-4000 DTUs, 1 GB - 4 TB storage
│   └── Use Cases: Simple pricing, predictable workloads

Azure SQL Managed Instance:
├── General Purpose:
│   ├── Compute: 4-80 vCores, 5.1 GB per vCore
│   ├── Storage: 32 GB - 16 TB
│   ├── Performance: Up to 24,000 IOPS
│   ├── Availability: 99.99% SLA
│   └── Use Cases: Lift-and-shift scenarios

├── Business Critical:
│   ├── Compute: 4-80 vCores, 5.1 GB per vCore
│   ├── Storage: 32 GB - 4 TB
│   ├── Performance: Up to 200,000 IOPS
│   ├── Availability: 99.995% SLA, Always On
│   ├── Read Scale-out: Built-in read replicas
│   └── Use Cases: Mission-critical applications

class AzureSQLOptimizer:
    def __init__(self):
        self.database_analyzer = AzureSQLAnalyzer()
        self.performance_optimizer = AzureSQLPerformanceOptimizer()
        self.cost_optimizer = AzureSQLCostOptimizer()

    def optimize_sql_database_deployment(self, database_requirements):
        """Optimize Azure SQL Database for performance and cost"""

        # Service tier selection
        service_tier_recommendation = self.select_optimal_service_tier(database_requirements)

        # Database configuration
        database_config = {
            'database_name': database_requirements.database_name,
            'server_name': database_requirements.server_name,
            'location': database_requirements.azure_region,
            'sku': {
                'name': service_tier_recommendation['sku_name'],
                'tier': service_tier_recommendation['service_tier'],
                'capacity': service_tier_recommendation['compute_size']
            },
            'max_size_bytes': self.calculate_max_size(database_requirements),
            'collation': database_requirements.collation,
            'backup_storage_redundancy': self.select_backup_redundancy(database_requirements),
            'zone_redundant': database_requirements.zone_redundant_enabled,
            'read_replica_count': database_requirements.read_replica_count if service_tier_recommendation['service_tier'] == 'BusinessCritical' else 0,
            'maintenance_configuration_id': database_requirements.maintenance_window_id
        }

        # Auto-scaling configuration (if applicable)
        if database_requirements.auto_scaling_enabled and service_tier_recommendation['service_tier'] in ['GeneralPurpose', 'BusinessCritical']:
            database_config['auto_pause_delay'] = database_requirements.auto_pause_delay
            database_config['min_capacity'] = database_requirements.min_capacity
            database_config['max_capacity'] = database_requirements.max_capacity

        # Elastic pool configuration (if applicable)
        elastic_pool_config = None
        if database_requirements.use_elastic_pool:
            elastic_pool_config = {
                'elastic_pool_name': f"{database_requirements.server_name}-pool",
                'sku': {
                    'name': service_tier_recommendation['pool_sku_name'],
                    'tier': service_tier_recommendation['service_tier'],
                    'capacity': service_tier_recommendation['pool_capacity']
                },
                'per_database_settings': {
                    'min_capacity': database_requirements.pool_min_capacity_per_db,
                    'max_capacity': database_requirements.pool_max_capacity_per_db
                },
                'max_size_bytes': database_requirements.pool_max_size_bytes,
                'zone_redundant': database_requirements.pool_zone_redundant,
                'license_type': 'BasePrice' if database_requirements.azure_hybrid_benefit else 'LicenseIncluded'
            }

        # Security configuration
        security_config = {
            'transparent_data_encryption': {
                'state': 'Enabled',
                'protector_type': 'ServiceManaged'
            },
            'advanced_data_security': {
                'is_enabled': True,
                'vulnerability_assessments': {
                    'baseline_name': 'default',
                    'recurring_scans': {
                        'is_enabled': True,
                        'email_subscription_admins': True,
                        'emails': database_requirements.security_contact_emails
                    },
                    'storage_container_path': database_requirements.vulnerability_assessment_storage
                },
                'sql_vulnerability_assessment': {
                    'is_enabled': True
                },
                'advanced_threat_protection': {
                    'state': 'Enabled'
                }
            },
            'audit_configuration': {
                'state': 'Enabled',
                'audit_actions_and_groups': [
                    'SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP',
                    'FAILED_DATABASE_AUTHENTICATION_GROUP',
                    'BATCH_COMPLETED_GROUP'
                ],
                'storage_endpoint': database_requirements.audit_storage_endpoint,
                'storage_account_access_key': database_requirements.audit_storage_key,
                'retention_days': database_requirements.audit_retention_days,
                'log_analytics_workspace_id': database_requirements.log_analytics_workspace
            }
        }

        # Performance optimization
        performance_config = {
            'query_store': {
                'operation_mode': 'ReadWrite',
                'cleanup_policy': 'AUTO',
                'data_flush_interval_seconds': 900,
                'interval_length_minutes': 60,
                'max_plans_per_query': 200,
                'max_storage_size_mb': 1024,
                'query_capture_mode': 'AUTO',
                'size_based_cleanup_mode': 'AUTO',
                'stale_query_threshold_days': 30
            },
            'automatic_tuning': {
                'create_index': 'On',
                'drop_index': 'On',
                'force_plan': 'On'
            },
            'compatibility_level': database_requirements.compatibility_level,
            'max_degree_of_parallelism': database_requirements.max_dop,
            'cost_threshold_for_parallelism': database_requirements.parallelism_cost_threshold,
            'optimize_for_ad_hoc_workloads': database_requirements.optimize_for_ad_hoc
        }

        # Backup and disaster recovery
        backup_config = {
            'short_term_retention': {
                'retention_days': database_requirements.pitr_backup_retention_days,
                'differential_backup_frequency': 'PT12H'
            },
            'long_term_retention': {
                'weekly_retention': database_requirements.ltr_weekly_retention,
                'monthly_retention': database_requirements.ltr_monthly_retention,
                'yearly_retention': database_requirements.ltr_yearly_retention,
                'week_of_year': database_requirements.ltr_week_of_year
            },
            'geo_backup_policy': {
                'state': 'Enabled' if database_requirements.geo_backup_enabled else 'Disabled'
            }
        }

        # Geo-replication configuration
        geo_replication_config = None
        if database_requirements.geo_replication_enabled:
            geo_replication_config = {
                'secondary_server_name': database_requirements.secondary_server_name,
                'secondary_region': database_requirements.secondary_region,
                'secondary_type': database_requirements.secondary_type,  # Geo or Named
                'read_scale': database_requirements.secondary_read_scale_enabled,
                'failover_group': {
                    'name': f"{database_requirements.database_name}-failover-group",
                    'primary_server': database_requirements.server_name,
                    'secondary_servers': [database_requirements.secondary_server_name],
                    'read_write_endpoint': {
                        'failover_policy': 'Automatic',
                        'grace_period_with_data_loss_hours': database_requirements.failover_grace_period
                    },
                    'read_only_endpoint': {
                        'failover_policy': 'Enabled' if database_requirements.read_only_failover_enabled else 'Disabled'
                    }
                }
            }

        return AzureSQLOptimizationPlan(
            database_config=database_config,
            elastic_pool_config=elastic_pool_config,
            security_config=security_config,
            performance_config=performance_config,
            backup_config=backup_config,
            geo_replication_config=geo_replication_config,
            cost_analysis=self.analyze_sql_costs(database_config),
            monitoring_setup=self.design_sql_monitoring()
        )

    def optimize_sql_managed_instance(self, managed_instance_requirements):
        """Optimize Azure SQL Managed Instance deployment"""

        # Instance configuration
        instance_config = {
            'managed_instance_name': managed_instance_requirements.instance_name,
            'location': managed_instance_requirements.azure_region,
            'sku': {
                'name': managed_instance_requirements.service_tier,
                'tier': managed_instance_requirements.service_tier,
                'capacity': managed_instance_requirements.vcores
            },
            'storage_size_in_gb': managed_instance_requirements.storage_size_gb,
            'subnet_id': managed_instance_requirements.subnet_id,
            'license_type': 'BasePrice' if managed_instance_requirements.azure_hybrid_benefit else 'LicenseIncluded',
            'v_cores': managed_instance_requirements.vcores,
            'hardware_family': managed_instance_requirements.hardware_generation,
            'collation': managed_instance_requirements.collation,
            'public_data_endpoint_enabled': managed_instance_requirements.public_endpoint_enabled,
            'proxy_override': managed_instance_requirements.connection_type,  # Proxy or Redirect
            'timezone_id': managed_instance_requirements.timezone,
            'instance_pool_id': managed_instance_requirements.instance_pool_id,
            'maintenance_configuration_id': managed_instance_requirements.maintenance_window_id
        }

        # Instance pool configuration (if applicable)
        instance_pool_config = None
        if managed_instance_requirements.use_instance_pool:
            instance_pool_config = {
                'instance_pool_name': f"{managed_instance_requirements.instance_name}-pool",
                'location': managed_instance_requirements.azure_region,
                'subnet_id': managed_instance_requirements.pool_subnet_id,
                'sku': {
                    'name': managed_instance_requirements.pool_service_tier,
                    'tier': managed_instance_requirements.pool_service_tier,
                    'capacity': managed_instance_requirements.pool_vcores
                },
                'license_type': 'BasePrice' if managed_instance_requirements.azure_hybrid_benefit else 'LicenseIncluded'
            }

        # Network configuration
        network_config = {
            'virtual_network': {
                'resource_group': managed_instance_requirements.vnet_resource_group,
                'name': managed_instance_requirements.vnet_name,
                'subnet_name': managed_instance_requirements.subnet_name,
                'address_space': managed_instance_requirements.subnet_address_range
            },
            'network_security_group': {
                'name': f"{managed_instance_requirements.instance_name}-nsg",
                'rules': self.create_managed_instance_nsg_rules()
            },
            'route_table': {
                'name': f"{managed_instance_requirements.instance_name}-rt",
                'routes': self.create_managed_instance_routes()
            }
        }

        return ManagedInstanceOptimizationPlan(
            instance_config=instance_config,
            instance_pool_config=instance_pool_config,
            network_config=network_config,
            monitoring_setup=self.design_managed_instance_monitoring()
        )

Azure SQL Advanced Features:

SQL Database Serverless:
├── Auto-pause/Resume: Automatic database pausing during inactivity
├── Auto-scaling: Automatic compute scaling based on workload
├── Per-second Billing: Pay for actual compute usage
├── Memory Management: Automatic memory optimization
├── Cold Start: Resume latency considerations
└── Use Cases: Variable workloads, development/testing

Hyperscale Architecture:
├── Distributed Storage: Separation of compute and storage
├── Page Servers: Distributed page server architecture
├── Log Service: Centralized transaction log service
├── Fast Backup: Snapshot-based backup and restore
├── Read Scale-out: Up to 4 read replicas
├── Rapid Scale-up: Compute scaling in minutes
└── Large Databases: Support for 100+ TB databases

Always On Availability Groups:
├── High Availability: 99.995% availability SLA
├── Automatic Failover: Transparent failover for applications
├── Read Scale-out: Read-only routing to secondary replicas
├── Backup Offloading: Backup operations on secondary replicas
├── Zero Data Loss: Synchronous commit mode
└── Cross-AZ Distribution: Availability zone distribution
```

#### **Azure Cosmos DB**

```
Azure Cosmos DB Architecture:

Multi-Model Database APIs:
├── Core (SQL) API:
│   ├── Document Database: JSON document storage
│   ├── SQL Queries: Familiar SQL-like query syntax
│   ├── JavaScript UDFs: User-defined functions in JavaScript
│   ├── Stored Procedures: Server-side programming
│   ├── Triggers: Pre/post triggers for data operations
│   └── Use Cases: Web applications, content management

├── MongoDB API:
│   ├── Wire Protocol: MongoDB driver compatibility
│   ├── MongoDB Features: Aggregation pipeline, GridFS
│   ├── Sharding: Automatic horizontal partitioning
│   ├── Indexing: Rich indexing capabilities
│   ├── Migration: Migrate from MongoDB with minimal changes
│   └── Use Cases: Existing MongoDB applications

├── Cassandra API:
│   ├── CQL: Cassandra Query Language support
│   ├── Column Family: Wide-column data model
│   ├── Eventual Consistency: Tunable consistency levels
│   ├── Automatic Scaling: Elastic throughput scaling
│   ├── Migration: Migrate from Cassandra clusters
│   └── Use Cases: IoT telemetry, time-series data

├── Gremlin API:
│   ├── Graph Database: Vertex and edge storage
│   ├── Gremlin Queries: Graph traversal language
│   ├── Graph Algorithms: Built-in graph analytics
│   ├── Property Graph: Rich graph data model
│   ├── OLTP and OLAP: Real-time and analytical workloads
│   └── Use Cases: Social networks, recommendation engines

├── Table API:
│   ├── Key-Value Store: Simple key-value operations
│   ├── Azure Table Storage: Compatible with Azure Table Storage
│   ├── Premium Performance: Higher throughput and lower latency
│   ├── Global Distribution: Multi-region replication
│   ├── Elastic Scaling: Automatic scaling capabilities
│   └── Use Cases: Session stores, device data, metadata

Consistency Levels:
├── Strong:
│   ├── Linearizability: Reads guaranteed to return most recent write
│   ├── Global Ordering: Total order of operations across regions
│   ├── Highest Consistency: Strongest consistency guarantees
│   ├── Performance Impact: Higher latency, lower availability
│   └── Use Cases: Financial applications, inventory management

├── Bounded Staleness:
│   ├── Configurable Lag: Time or operations-based staleness bounds
│   ├── Prefix Consistency: Consistent prefix ordering
│   ├── Global Ordering: Within staleness bounds
│   ├── Balance: Consistency vs performance trade-off
│   └── Use Cases: Collaborative editing, live dashboards

├── Session:
│   ├── Per-Session: Consistency within client session
│   ├── Read Your Writes: See your own writes immediately
│   ├── Monotonic Reads: Reads never go backward in time
│   ├── Performance: Good performance with guarantees for session
│   └── Use Cases: Shopping carts, user profiles

├── Consistent Prefix:
│   ├── Prefix Consistency: Reads never see out-of-order writes
│   ├── No Lag Bounds: No specific staleness guarantees
│   ├── Global Ordering: Eventual global ordering
│   ├── Performance: Better performance than bounded staleness
│   └── Use Cases: Social media feeds, group collaboration

├── Eventual:
│   ├── Eventual Convergence: All replicas eventually converge
│   ├── Highest Performance: Lowest latency and highest availability
│   ├── No Ordering Guarantees: Reads may see operations out of order
│   ├── Best Availability: Highest write and read availability
│   └── Use Cases: Reviews and ratings, telemetry data

class CosmosDBOptimizer:
    def __init__(self):
        self.account_analyzer = CosmosDBAccountAnalyzer()
        self.performance_optimizer = CosmosDBPerformanceOptimizer()
        self.cost_optimizer = CosmosDBCostOptimizer()

    def optimize_cosmosdb_deployment(self, cosmosdb_requirements):
        """Optimize Cosmos DB deployment for global distribution and performance"""

        # Account configuration
        account_config = {
            'account_name': cosmosdb_requirements.account_name,
            'location': cosmosdb_requirements.primary_region,
            'database_account_offer_type': 'Standard',
            'api_properties': {
                'server_version': cosmosdb_requirements.api_version if cosmosdb_requirements.api_type == 'MongoDB' else None
            },
            'kind': self.get_account_kind(cosmosdb_requirements.api_type),
            'consistency_policy': {
                'default_consistency_level': cosmosdb_requirements.consistency_level,
                'max_interval_in_seconds': cosmosdb_requirements.max_staleness_interval if cosmosdb_requirements.consistency_level == 'BoundedStaleness' else None,
                'max_staleness_prefix': cosmosdb_requirements.max_staleness_prefix if cosmosdb_requirements.consistency_level == 'BoundedStaleness' else None
            },
            'locations': [
                {
                    'location_name': region,
                    'failover_priority': priority,
                    'is_zone_redundant': cosmosdb_requirements.zone_redundant_enabled
                }
                for priority, region in enumerate(cosmosdb_requirements.regions)
            ],
            'capabilities': self.get_account_capabilities(cosmosdb_requirements),
            'backup_policy': {
                'type': cosmosdb_requirements.backup_type,
                'backup_interval_in_minutes': cosmosdb_requirements.backup_interval if cosmosdb_requirements.backup_type == 'Periodic' else None,
                'backup_retention_interval_in_hours': cosmosdb_requirements.backup_retention if cosmosdb_requirements.backup_type == 'Periodic' else None,
                'backup_storage_redundancy': cosmosdb_requirements.backup_redundancy if cosmosdb_requirements.backup_type == 'Periodic' else None
            }
        }

        # Database and container configuration
        database_config = {
            'database_name': cosmosdb_requirements.database_name,
            'throughput': cosmosdb_requirements.database_throughput if cosmosdb_requirements.database_throughput_type == 'provisioned' else None,
            'autoscale_settings': {
                'max_throughput': cosmosdb_requirements.database_max_throughput
            } if cosmosdb_requirements.database_throughput_type == 'autoscale' else None
        }

        container_configs = []
        for container_spec in cosmosdb_requirements.containers:
            container_config = {
                'container_name': container_spec.name,
                'partition_key': {
                    'paths': container_spec.partition_key_paths,
                    'kind': container_spec.partition_key_kind,
                    'version': container_spec.partition_key_version
                },
                'throughput': container_spec.throughput if container_spec.throughput_type == 'provisioned' else None,
                'autoscale_settings': {
                    'max_throughput': container_spec.max_throughput
                } if container_spec.throughput_type == 'autoscale' else None,
                'indexing_policy': self.design_indexing_policy(container_spec),
                'unique_key_policy': {
                    'unique_keys': [
                        {'paths': paths} for paths in container_spec.unique_key_paths
                    ]
                } if container_spec.unique_key_paths else None,
                'conflict_resolution_policy': {
                    'mode': container_spec.conflict_resolution_mode,
                    'conflict_resolution_path': container_spec.conflict_resolution_path if container_spec.conflict_resolution_mode == 'LastWriterWins' else None,
                    'conflict_resolution_procedure': container_spec.conflict_resolution_procedure if container_spec.conflict_resolution_mode == 'Custom' else None
                },
                'default_ttl': container_spec.default_ttl,
                'analytical_storage_ttl': container_spec.analytical_storage_ttl if cosmosdb_requirements.analytical_storage_enabled else None
            }
            container_configs.append(container_config)

        # Performance optimization
        performance_config = {
            'connection_policy': {
                'connection_mode': 'Direct',
                'connection_protocol': 'Tcp',
                'request_timeout': 60,
                'max_connection_limit': 50,
                'retry_options': {
                    'max_retry_attempts_on_throttled_requests': 9,
                    'max_retry_wait_time_in_seconds': 30
                },
                'enable_endpoint_discovery': True,
                'preferred_locations': cosmosdb_requirements.read_regions
            },
            'query_optimization': {
                'max_item_count': -1,
                'enable_cross_partition_query': True,
                'max_degree_of_parallelism': -1,
                'max_buffered_item_count': -1,
                'populate_query_metrics': True
            },
            'bulk_operations': {
                'enabled': cosmosdb_requirements.bulk_operations_enabled,
                'max_concurrent_operations': cosmosdb_requirements.max_concurrent_operations,
                'max_micro_batch_size': cosmosdb_requirements.max_micro_batch_size
            }
        }

        # Security configuration
        security_config = {
            'ip_filter': {
                'ip_range_filter': ','.join(cosmosdb_requirements.allowed_ip_ranges) if cosmosdb_requirements.allowed_ip_ranges else ''
            },
            'virtual_network_filter': {
                'enabled': bool(cosmosdb_requirements.virtual_network_rules),
                'virtual_network_rules': [
                    {
                        'subnet': vnet_rule.subnet_id,
                        'ignore_missing_vnet_service_endpoint': vnet_rule.ignore_missing_endpoint
                    }
                    for vnet_rule in cosmosdb_requirements.virtual_network_rules
                ]
            },
            'private_endpoint_connections': cosmosdb_requirements.private_endpoint_enabled,
            'key_vault_key_uri': cosmosdb_requirements.customer_managed_key_uri if cosmosdb_requirements.customer_managed_encryption else None
        }

        # Multi-region configuration
        multi_region_config = {
            'automatic_failover_enabled': cosmosdb_requirements.automatic_failover,
            'multiple_write_locations_enabled': cosmosdb_requirements.multi_master_enabled,
            'session_consistency_policy': cosmosdb_requirements.session_consistency_policy if cosmosdb_requirements.multi_master_enabled else None,
            'geo_redundant_backup': cosmosdb_requirements.geo_redundant_backup
        }

        return CosmosDBOptimizationPlan(
            account_config=account_config,
            database_config=database_config,
            container_configs=container_configs,
            performance_config=performance_config,
            security_config=security_config,
            multi_region_config=multi_region_config,
            cost_analysis=self.analyze_cosmosdb_costs(account_config, container_configs),
            monitoring_setup=self.design_cosmosdb_monitoring()
        )

    def design_indexing_policy(self, container_spec):
        """Design optimal indexing policy for Cosmos DB container"""

        indexing_policies = {
            'write_heavy_workload': {
                'indexing_mode': 'Consistent',
                'automatic': True,
                'included_paths': [
                    {'path': '/*'}  # Index all paths by default
                ],
                'excluded_paths': [
                    {'path': '/largeTextFields/*'},  # Exclude large text fields
                    {'path': '/binaryData/*'},       # Exclude binary data
                    {'path': '/_etag/?'}             # Exclude system _etag
                ],
                'composite_indexes': [],  # Minimal composite indexes for writes
                'spatial_indexes': []
            },
            'read_heavy_workload': {
                'indexing_mode': 'Consistent',
                'automatic': True,
                'included_paths': [
                    {'path': '/*'}  # Index all paths
                ],
                'excluded_paths': [
                    {'path': '/_etag/?'}  # Only exclude system properties
                ],
                'composite_indexes': container_spec.composite_index_paths,
                'spatial_indexes': container_spec.spatial_index_paths
            },
            'analytical_workload': {
                'indexing_mode': 'Consistent',
                'automatic': True,
                'included_paths': [
                    {'path': '/timestamp/?'},
                    {'path': '/category/?'},
                    {'path': '/status/?'},
                    {'path': '/metadata/*'}
                ],
                'excluded_paths': [
                    {'path': '/*'}  # Exclude all paths not explicitly included
                ],
                'composite_indexes': [
                    [
                        {'path': '/timestamp', 'order': 'ascending'},
                        {'path': '/category', 'order': 'ascending'}
                    ],
                    [
                        {'path': '/status', 'order': 'ascending'},
                        {'path': '/timestamp', 'order': 'descending'}
                    ]
                ]
            }
        }

        return indexing_policies.get(container_spec.workload_type, indexing_policies['read_heavy_workload'])

Cosmos DB Advanced Features:

Global Distribution:
├── Multi-Master: Multiple write regions for global applications
├── Automatic Failover: Transparent failover during regional outages
├── Custom Failover: Manual failover control for planned maintenance
├── Session Tokens: Client-side session consistency tracking
├── Conflict Resolution: Automated and custom conflict resolution
└── Global Consistency: Consistent experience across all regions

Analytical Storage:
├── Azure Synapse Link: Real-time analytics without ETL
├── Columnar Storage: Optimized for analytical queries
├── Auto-sync: Automatic synchronization from transactional store
├── TTL Management: Independent TTL for analytical data
├── Cost Optimization: Separate billing for analytical workloads
└── No Impact: Zero impact on transactional workloads

Change Feed:
├── Real-time Processing: Process changes as they occur
├── Azure Functions: Serverless change processing
├── Event Hub: Stream changes to event processing systems
├── Microservices: Trigger microservice workflows
├── Materialized Views: Maintain derived data views
└── Audit Trail: Track all data changes for compliance
```

This comprehensive Azure platform expertise provides HeadElf with deep knowledge of all major Azure services, their architectures, optimization techniques, and best practices for production deployments.

## Outputs
- Azure service recommendations optimized for specific use cases and requirements
- Multi-service architecture designs following Azure Well-Architected Framework
- Cost optimization strategies across all Azure service categories
- Security and compliance configurations for Azure workloads
- Hybrid and multi-cloud integration patterns with Azure services