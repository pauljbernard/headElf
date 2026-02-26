# Machine Learning and AI Frameworks Expertise

## Description
Expert-level knowledge of machine learning and AI frameworks including TensorFlow, PyTorch, Scikit-learn, Hugging Face, MLflow, Kubeflow, Apache Spark ML, cloud ML platforms, and MLOps tools with optimization techniques, deployment strategies, and production implementation patterns.

## When to Use
- Designing and implementing machine learning pipelines and infrastructure
- Selecting optimal ML frameworks for specific use cases and requirements
- Optimizing model training, inference, and deployment performance
- Building MLOps platforms and automated ML workflows
- Implementing AI/ML solutions in production environments

## Instructions

You are a machine learning and AI expert with deep knowledge of ML frameworks, distributed training systems, model deployment platforms, and MLOps practices for production AI systems.

### Deep Learning Frameworks Expertise

#### **TensorFlow and TensorFlow Extended (TFX) Expertise**

```
TensorFlow Architecture and Components:

TensorFlow Core Components:
├── Computational Graph:
│   ├── Graph Definition: Static and eager execution modes
│   ├── Operation Nodes: Mathematical operations and transformations
│   ├── Tensor Flow: Data flow through computational graph
│   ├── Session Management: Graph execution context
│   ├── Graph Optimization: XLA compilation and optimization
│   └── Distributed Execution: Multi-device and multi-node execution

├── High-Level APIs:
│   ├── Keras API: High-level neural network API
│   ├── Estimators: Pre-built model architectures and training loops
│   ├── Layers API: Building blocks for neural network construction
│   ├── Losses and Metrics: Built-in loss functions and evaluation metrics
│   ├── Optimizers: Gradient descent and adaptive optimization algorithms
│   └── Callbacks: Training hooks and monitoring utilities

├── Data Pipeline:
│   ├── tf.data API: Efficient data input pipeline construction
│   ├── Feature Columns: Feature engineering and preprocessing
│   ├── Transform: Data preprocessing and feature transformation
│   ├── Data Validation: Automated data quality validation
│   ├── ETL Integration: Extract, transform, load data pipelines
│   └── Distributed Data Loading: Scalable data loading and preprocessing

Production Deployment Components:
├── TensorFlow Serving:
│   ├── Model Server: High-performance model serving infrastructure
│   ├── Model Versioning: Multiple model version management
│   ├── Batching: Request batching for improved throughput
│   ├── GPU Acceleration: GPU-accelerated inference
│   ├── REST/gRPC APIs: Multiple API interfaces for model access
│   └── Monitoring: Model performance and health monitoring

├── TensorFlow Lite:
│   ├── Model Optimization: Model quantization and pruning
│   ├── Mobile Deployment: Android and iOS model deployment
│   ├── Edge Computing: IoT and edge device inference
│   ├── Hardware Acceleration: Specialized hardware support
│   ├── Delegate Support: GPU, NPU, and custom accelerator support
│   └── Model Converter: TensorFlow to TFLite model conversion

├── TensorFlow.js:
│   ├── Browser Deployment: Client-side ML in web browsers
│   ├── Node.js Support: Server-side JavaScript ML execution
│   ├── WebGL Acceleration: GPU acceleration in browsers
│   ├── Model Conversion: TensorFlow to TensorFlow.js conversion
│   ├── Pre-trained Models: Ready-to-use model ecosystem
│   └── Transfer Learning: Browser-based model fine-tuning

class TensorFlowOptimizer:
    def __init__(self):
        self.training_optimizer = TFTrainingOptimizer()
        self.serving_optimizer = TFServingOptimizer()
        self.distributed_optimizer = TFDistributedOptimizer()

    def optimize_tensorflow_training(self, training_requirements):
        """Optimize TensorFlow training for large-scale models"""

        # Training configuration optimization
        training_config = {
            'distribution_strategy': self.select_distribution_strategy(training_requirements),
            'mixed_precision': {
                'enabled': training_requirements.use_mixed_precision,
                'loss_scale': 'dynamic',
                'optimizer': self.wrap_optimizer_for_mixed_precision()
            },
            'data_pipeline_optimization': {
                'prefetch': tf.data.AUTOTUNE,
                'parallel_calls': tf.data.AUTOTUNE,
                'cache': training_requirements.enable_caching,
                'batch_size': self.calculate_optimal_batch_size(training_requirements),
                'shuffle_buffer': min(10000, training_requirements.dataset_size // 10)
            },
            'gradient_optimization': {
                'gradient_clipping': training_requirements.gradient_clipping_norm,
                'gradient_accumulation': training_requirements.gradient_accumulation_steps,
                'optimizer_type': training_requirements.optimizer_type,
                'learning_rate_schedule': self.design_lr_schedule(training_requirements)
            }
        }

        # Model architecture optimization
        model_optimization = {
            'layer_optimization': {
                'use_bias': training_requirements.model_complexity < 0.8,
                'activation_functions': self.select_optimal_activations(training_requirements),
                'normalization': self.select_normalization_strategy(training_requirements),
                'regularization': {
                    'dropout_rate': training_requirements.dropout_rate,
                    'l2_regularization': training_requirements.l2_weight,
                    'weight_decay': training_requirements.weight_decay
                }
            },
            'memory_optimization': {
                'gradient_checkpointing': training_requirements.enable_gradient_checkpointing,
                'model_parallelism': training_requirements.model_too_large_for_single_gpu,
                'pipeline_parallelism': training_requirements.enable_pipeline_parallelism,
                'tensor_rematerialization': training_requirements.reduce_memory_usage
            }
        }

        # Distributed training configuration
        distributed_config = {
            'multi_gpu_strategy': {
                'strategy': 'MirroredStrategy',
                'cross_device_ops': 'HierarchicalCopyAllReduce',
                'gradient_compression': training_requirements.enable_gradient_compression
            },
            'multi_node_strategy': {
                'strategy': 'MultiWorkerMirroredStrategy',
                'cluster_spec': self.generate_cluster_spec(training_requirements.cluster_config),
                'communication': 'nccl' if training_requirements.use_gpus else 'ring',
                'fault_tolerance': training_requirements.enable_fault_tolerance
            },
            'parameter_server_strategy': {
                'use_case': 'large_embeddings',
                'num_ps': training_requirements.num_parameter_servers,
                'variable_partitioner': self.design_variable_partitioning()
            }
        }

        return TensorFlowTrainingOptimization(
            training_config=training_config,
            model_optimization=model_optimization,
            distributed_config=distributed_config,
            monitoring_setup=self.design_training_monitoring()
        )

    def optimize_tensorflow_serving(self, serving_requirements):
        """Optimize TensorFlow Serving for production inference"""

        # Model serving configuration
        serving_config = {
            'model_config': {
                'model_name': serving_requirements.model_name,
                'base_path': serving_requirements.model_base_path,
                'model_platform': 'tensorflow',
                'model_version_policy': {
                    'specific': {
                        'versions': serving_requirements.model_versions
                    }
                }
            },
            'server_config': {
                'port': 8500,
                'rest_api_port': 8501,
                'model_config_file': '/models/models.config',
                'monitoring_config_file': '/models/monitoring.config',
                'ssl_config_file': serving_requirements.ssl_config if serving_requirements.enable_ssl else None
            },
            'optimization_config': {
                'enable_batching': True,
                'batching_parameters': {
                    'max_batch_size': serving_requirements.max_batch_size,
                    'batch_timeout_micros': serving_requirements.batch_timeout_microseconds,
                    'num_batch_threads': serving_requirements.num_batch_threads,
                    'max_enqueued_batches': serving_requirements.max_enqueued_batches
                },
                'model_optimization': {
                    'graph_optimization_level': 'AGGRESSIVE_OPTIMIZATIONS',
                    'allow_fp16_accumulation': serving_requirements.allow_fp16,
                    'auto_mixed_precision': serving_requirements.enable_auto_mixed_precision
                }
            }
        }

        # Model preprocessing and postprocessing
        pipeline_config = {
            'preprocessing': {
                'input_validation': True,
                'feature_engineering': serving_requirements.require_feature_engineering,
                'data_normalization': serving_requirements.normalization_strategy,
                'text_preprocessing': serving_requirements.text_preprocessing_pipeline
            },
            'postprocessing': {
                'output_transformation': serving_requirements.output_transformation,
                'confidence_thresholding': serving_requirements.confidence_threshold,
                'result_formatting': serving_requirements.output_format,
                'explanation_generation': serving_requirements.enable_explanations
            }
        }

        # Auto-scaling and load balancing
        deployment_config = {
            'kubernetes_deployment': {
                'replicas': serving_requirements.min_replicas,
                'autoscaling': {
                    'enabled': True,
                    'min_replicas': serving_requirements.min_replicas,
                    'max_replicas': serving_requirements.max_replicas,
                    'target_cpu_utilization': 70,
                    'custom_metrics': [
                        {
                            'name': 'inference_latency_p95',
                            'target_value': serving_requirements.latency_sla_ms
                        },
                        {
                            'name': 'request_queue_depth',
                            'target_value': 10
                        }
                    ]
                }
            },
            'load_balancer_config': {
                'type': 'nginx',
                'health_check': {
                    'path': '/v1/models/{model_name}/metadata',
                    'interval': '10s',
                    'timeout': '3s',
                    'retries': 3
                },
                'circuit_breaker': {
                    'failure_threshold': 5,
                    'recovery_timeout': '30s'
                }
            }
        }

        return TensorFlowServingOptimization(
            serving_config=serving_config,
            pipeline_config=pipeline_config,
            deployment_config=deployment_config,
            monitoring_setup=self.design_serving_monitoring()
        )

TensorFlow Extended (TFX) Production Pipeline:

TFX Components:
├── ExampleGen: Data ingestion and splitting
├── StatisticsGen: Data statistics generation
├── SchemaGen: Schema inference and validation
├── ExampleValidator: Data validation and anomaly detection
├── Transform: Feature engineering and preprocessing
├── Trainer: Model training and evaluation
├── Tuner: Hyperparameter tuning automation
├── Evaluator: Model evaluation and validation
├── Pusher: Model deployment and serving
└── BulkInferrer: Batch inference processing

Advanced TFX Patterns:

Model Monitoring and Drift Detection:
├── Data Drift Detection: Statistical data distribution changes
├── Model Performance Monitoring: Real-time model accuracy tracking
├── Feature Importance Tracking: Feature contribution analysis
├── Concept Drift Detection: Model assumption validation
├── Automated Retraining: Trigger-based model retraining
└── A/B Testing Integration: Multi-model comparison and validation

Pipeline Orchestration:
├── Apache Beam: Distributed data processing
├── Apache Airflow: Workflow orchestration and scheduling
├── Kubeflow Pipelines: Kubernetes-native ML workflows
├── Custom Orchestrator: Domain-specific pipeline orchestration
├── Pipeline Caching: Component result caching for efficiency
└── Pipeline Versioning: Pipeline version management and rollback
```

#### **PyTorch and PyTorch Lightning Expertise**

```
PyTorch Architecture and Ecosystem:

PyTorch Core Components:
├── Dynamic Computational Graph:
│   ├── Autograd: Automatic differentiation system
│   ├── Dynamic Execution: Eager execution and graph construction
│   ├── Tensor Operations: N-dimensional array operations
│   ├── CUDA Integration: GPU acceleration and memory management
│   ├── Distributed Training: Multi-GPU and multi-node training
│   └── JIT Compilation: TorchScript for production optimization

├── Neural Network Modules:
│   ├── nn.Module: Base class for neural network layers
│   ├── Parameter Management: Model parameter handling and initialization
│   ├── Loss Functions: Built-in loss functions and custom losses
│   ├── Optimizers: SGD, Adam, and advanced optimization algorithms
│   ├── Learning Rate Schedulers: Dynamic learning rate adjustment
│   └── Activation Functions: Built-in and custom activation functions

├── Data Loading and Processing:
│   ├── Dataset: Abstract dataset interface and implementations
│   ├── DataLoader: Efficient batch loading and shuffling
│   ├── Transforms: Data augmentation and preprocessing
│   ├── Sampler: Custom sampling strategies for training
│   ├── Distributed Sampling: Multi-process data loading
│   └── Memory Mapping: Efficient large dataset handling

Production Deployment:
├── TorchScript:
│   ├── Tracing: Model tracing for production deployment
│   ├── Scripting: Python-to-TorchScript compilation
│   ├── Optimization: Graph optimization and fusion
│   ├── Mobile Deployment: Mobile-optimized model execution
│   ├── C++ Integration: Seamless C++ deployment
│   └── Cross-Platform: Platform-independent model deployment

├── TorchServe:
│   ├── Model Archive: Model packaging and versioning
│   ├── Multi-Model Serving: Multiple model serving on single instance
│   ├── Auto-Scaling: Dynamic scaling based on load
│   ├── A/B Testing: Multi-version model testing
│   ├── Metrics Collection: Detailed inference metrics
│   └── Custom Handlers: Custom preprocessing and postprocessing

class PyTorchOptimizer:
    def __init__(self):
        self.training_optimizer = PyTorchTrainingOptimizer()
        self.deployment_optimizer = PyTorchDeploymentOptimizer()
        self.distributed_optimizer = PyTorchDistributedOptimizer()

    def optimize_pytorch_training(self, training_requirements):
        """Optimize PyTorch training for performance and scalability"""

        # Training loop optimization
        training_optimization = {
            'data_loading': {
                'num_workers': min(training_requirements.cpu_count, 8),
                'pin_memory': training_requirements.use_gpu,
                'prefetch_factor': 4,
                'persistent_workers': True,
                'batch_size': self.calculate_optimal_batch_size(training_requirements),
                'drop_last': True  # For consistent batch sizes
            },
            'memory_optimization': {
                'gradient_accumulation_steps': training_requirements.gradient_accumulation,
                'gradient_checkpointing': training_requirements.enable_checkpointing,
                'mixed_precision': training_requirements.use_mixed_precision,
                'torch_compile': training_requirements.pytorch_version >= '2.0'
            },
            'computation_optimization': {
                'torch_backends': {
                    'cudnn_benchmark': True,
                    'cudnn_deterministic': False,
                    'allow_tf32': training_requirements.allow_tf32,
                    'matmul_allow_tf32': training_requirements.allow_tf32
                },
                'fused_optimizers': training_requirements.use_fused_optimizers,
                'channels_last_memory_format': training_requirements.use_channels_last
            }
        }

        # Model architecture optimization
        model_optimization = {
            'layer_fusion': {
                'conv_bn_fusion': True,
                'linear_activation_fusion': True,
                'attention_fusion': training_requirements.model_type == 'transformer'
            },
            'initialization': {
                'strategy': training_requirements.initialization_strategy,
                'gain': training_requirements.initialization_gain,
                'mode': training_requirements.fan_mode
            },
            'regularization': {
                'weight_decay': training_requirements.weight_decay,
                'dropout_rate': training_requirements.dropout_rate,
                'label_smoothing': training_requirements.label_smoothing
            }
        }

        # Distributed training configuration
        distributed_config = self.configure_distributed_training(training_requirements)

        return PyTorchTrainingOptimization(
            training_config=training_optimization,
            model_config=model_optimization,
            distributed_config=distributed_config
        )

    def configure_distributed_training(self, requirements):
        """Configure PyTorch distributed training"""

        if requirements.num_nodes == 1 and requirements.num_gpus <= 1:
            return {'strategy': 'single_device'}

        elif requirements.num_nodes == 1:
            # Single-node multi-GPU training
            return {
                'strategy': 'ddp',
                'backend': 'nccl',
                'find_unused_parameters': requirements.model_has_unused_params,
                'gradient_as_bucket_view': True,
                'static_graph': requirements.model_graph_static
            }
        else:
            # Multi-node distributed training
            return {
                'strategy': 'ddp',
                'backend': 'nccl',
                'init_method': 'env://',
                'world_size': requirements.num_nodes * requirements.num_gpus_per_node,
                'rank': requirements.node_rank,
                'local_rank': requirements.local_rank,
                'master_addr': requirements.master_address,
                'master_port': requirements.master_port,
                'timeout': requirements.distributed_timeout
            }

PyTorch Lightning Framework:

Lightning Components and Patterns:
├── LightningModule: Research code organization
├── LightningDataModule: Data loading abstraction
├── Trainer: Training loop automation and optimization
├── Callbacks: Extensible training hooks and monitoring
├── Loggers: Experiment tracking and visualization
├── Plugins: Training strategy and precision plugins
├── Utilities: Common utilities and helper functions
└── CLI Integration: Command-line interface automation

Advanced PyTorch Patterns:

Model Parallelism Strategies:
├── Data Parallel (DP): Simple multi-GPU training
├── Distributed Data Parallel (DDP): Multi-node training
├── Fully Sharded Data Parallel (FSDP): Memory-efficient training
├── Pipeline Parallel: Sequential layer distribution
├── Tensor Parallel: Individual layer parallelization
├── ZeRO: Zero redundancy optimization
└── DeepSpeed Integration: Microsoft DeepSpeed optimization

Custom Operators and Extensions:
├── Custom CUDA Kernels: GPU-optimized operations
├── C++ Extensions: High-performance custom operations
├── TorchScript Extensions: Production-ready custom ops
├── Quantization: Model quantization for efficiency
├── Pruning: Model compression techniques
└── Knowledge Distillation: Model compression via teacher-student
```

### MLOps and Model Management Expertise

#### **MLflow and Model Lifecycle Management**

```
MLflow Components and Architecture:

MLflow Tracking:
├── Experiment Management: Experiment organization and comparison
├── Run Tracking: Individual training run tracking
├── Metric Logging: Scalar and artifact metric logging
├── Parameter Logging: Hyperparameter and configuration tracking
├── Artifact Storage: Model and file artifact management
├── Model Registry Integration: Automatic model registration
├── Backend Storage: Database and file system storage
└── UI and API: Web interface and REST API access

MLflow Models:
├── Model Packaging: Framework-agnostic model packaging
├── Model Signatures: Input/output schema definition
├── Model Flavors: Framework-specific model handling
├── Model Deployment: Multiple deployment target support
├── Model Serving: Built-in model serving capabilities
├── Model Validation: Automated model validation
├── Model Versioning: Model version management
└── Model Lineage: Model training and data lineage tracking

MLflow Model Registry:
├── Model Catalog: Centralized model catalog and discovery
├── Model Staging: Development to production promotion workflow
├── Model Approval: Model review and approval process
├── Model Monitoring: Model performance monitoring in production
├── Model Retirement: Model lifecycle and retirement management
├── Access Control: Role-based model access control
├── Model Comparison: Side-by-side model comparison
└── Integration: CI/CD pipeline integration

class MLflowOptimizer:
    def __init__(self):
        self.tracking_optimizer = MLflowTrackingOptimizer()
        self.registry_manager = MLflowRegistryManager()
        self.deployment_optimizer = MLflowDeploymentOptimizer()

    def design_mlflow_platform(self, mlops_requirements):
        """Design enterprise-grade MLflow platform"""

        # Tracking server configuration
        tracking_config = {
            'backend_store': {
                'type': 'postgresql',
                'connection_string': mlops_requirements.database_connection,
                'pool_size': 20,
                'max_overflow': 30,
                'pool_timeout': 30,
                'pool_recycle': 3600
            },
            'artifact_store': {
                'type': 's3',
                'bucket': mlops_requirements.artifact_bucket,
                'region': mlops_requirements.aws_region,
                'access_control': 'iam_roles',
                'encryption': 'sse_s3',
                'lifecycle_policy': {
                    'transition_to_ia': '30_days',
                    'transition_to_glacier': '90_days',
                    'expiration': '7_years'
                }
            },
            'server_configuration': {
                'host': '0.0.0.0',
                'port': 5000,
                'workers': mlops_requirements.server_workers,
                'worker_class': 'sync',
                'worker_connections': 1000,
                'max_requests': 1000,
                'max_requests_jitter': 100,
                'timeout': 120
            }
        }

        # Model registry configuration
        registry_config = {
            'model_stages': ['Staging', 'Production', 'Archived'],
            'approval_workflow': {
                'staging_to_production': {
                    'required_approvers': mlops_requirements.approval_count,
                    'approval_roles': mlops_requirements.approver_roles,
                    'automated_checks': [
                        'model_validation',
                        'performance_regression_test',
                        'bias_evaluation',
                        'security_scan'
                    ]
                }
            },
            'model_validation': {
                'schema_validation': True,
                'performance_thresholds': mlops_requirements.performance_requirements,
                'data_drift_detection': True,
                'bias_detection': mlops_requirements.fairness_requirements,
                'security_scanning': mlops_requirements.security_requirements
            }
        }

        # Integration configuration
        integration_config = {
            'ci_cd_integration': {
                'github_actions': self.generate_github_actions_workflow(),
                'jenkins_pipeline': self.generate_jenkins_pipeline(),
                'gitlab_ci': self.generate_gitlab_ci_pipeline()
            },
            'monitoring_integration': {
                'prometheus_metrics': True,
                'grafana_dashboards': self.generate_monitoring_dashboards(),
                'alerting_rules': self.generate_alerting_rules(),
                'log_aggregation': mlops_requirements.log_aggregation_system
            },
            'deployment_targets': {
                'kubernetes': self.design_k8s_deployment_strategy(),
                'sagemaker': self.design_sagemaker_deployment(),
                'azure_ml': self.design_azure_ml_deployment(),
                'databricks': self.design_databricks_deployment()
            }
        }

        return MLflowPlatformDesign(
            tracking_config=tracking_config,
            registry_config=registry_config,
            integration_config=integration_config,
            governance_framework=self.design_ml_governance_framework()
        )

Kubeflow and Kubernetes-native MLOps:

Kubeflow Components:
├── Kubeflow Pipelines: Workflow orchestration for ML
├── Katib: Hyperparameter tuning and neural architecture search
├── KFServing (KServe): Model serving and inference
├── Training Operators: Distributed training job management
├── Notebooks: Jupyter notebook management
├── Multi-Tenancy: Resource isolation and user management
├── AutoML: Automated machine learning workflows
└── Model Management: Model versioning and deployment

Advanced MLOps Patterns:

Continuous Integration/Continuous Deployment (CI/CD) for ML:
├── Code Quality: Automated code quality checks and testing
├── Data Validation: Automated data quality and schema validation
├── Model Training: Automated model training and evaluation
├── Model Testing: A/B testing and canary deployments
├── Model Deployment: Automated model deployment to production
├── Model Monitoring: Real-time model performance monitoring
├── Model Rollback: Automated rollback on performance degradation
└── Compliance: Automated compliance and audit trail generation

Feature Store Architecture:
├── Feature Engineering: Centralized feature computation
├── Feature Serving: Low-latency feature serving for inference
├── Feature Discovery: Feature catalog and lineage tracking
├── Feature Validation: Feature quality monitoring and validation
├── Feature Versioning: Feature schema evolution and versioning
├── Point-in-Time Correctness: Historical feature accuracy
├── Feature Sharing: Cross-team feature reuse and collaboration
└── Feature Monitoring: Feature drift detection and alerting
```

### Cloud ML Platform Expertise

#### **AWS SageMaker Expertise**

```
Amazon SageMaker Components:

SageMaker Studio and Notebooks:
├── Studio IDE: Integrated development environment for ML
├── Notebook Instances: Managed Jupyter notebook environments
├── Git Integration: Version control integration
├── Collaborative Features: Team collaboration and sharing
├── Custom Images: Custom container image support
├── Lifecycle Configurations: Automated setup and configuration
└── Cost Optimization: Automatic instance stop and optimization

SageMaker Training:
├── Built-in Algorithms: Pre-built ML algorithms and frameworks
├── Custom Training: Bring-your-own-algorithm support
├── Distributed Training: Multi-instance and multi-GPU training
├── Spot Training: Cost-optimized training with spot instances
├── Hyperparameter Tuning: Automated hyperparameter optimization
├── Debugger: Training job debugging and profiling
├── Experiments: Experiment tracking and comparison
└── Model Registry: Model versioning and management

SageMaker Inference:
├── Real-time Endpoints: Low-latency model serving
├── Batch Transform: Batch inference processing
├── Multi-Model Endpoints: Multiple model hosting
├── Auto Scaling: Automatic endpoint scaling
├── A/B Testing: Traffic splitting for model comparison
├── Data Capture: Inference data capture for monitoring
└── Model Monitor: Automated model quality monitoring

class SageMakerOptimizer:
    def __init__(self):
        self.training_optimizer = SageMakerTrainingOptimizer()
        self.inference_optimizer = SageMakerInferenceOptimizer()
        self.cost_optimizer = SageMakerCostOptimizer()

    def optimize_sagemaker_training(self, training_requirements):
        """Optimize SageMaker training for performance and cost"""

        # Training job configuration
        training_config = {
            'algorithm_specification': {
                'training_image': self.select_optimal_training_image(training_requirements),
                'training_input_mode': 'Pipe' if training_requirements.large_dataset else 'File',
                'metric_definitions': training_requirements.custom_metrics
            },
            'role_arn': training_requirements.sagemaker_execution_role,
            'input_data_config': self.optimize_input_data_config(training_requirements),
            'output_data_config': {
                's3_output_path': training_requirements.model_output_path,
                'kms_key_id': training_requirements.encryption_key
            },
            'resource_config': {
                'instance_type': self.select_optimal_instance_type(training_requirements),
                'instance_count': training_requirements.instance_count,
                'volume_size_in_gb': self.calculate_volume_size(training_requirements),
                'volume_kms_key_id': training_requirements.volume_encryption_key
            },
            'stopping_condition': {
                'max_runtime_in_seconds': training_requirements.max_training_time
            }
        }

        # Distributed training optimization
        if training_requirements.distributed_training:
            training_config['algorithm_specification']['training_image'] = \
                self.select_distributed_training_image(training_requirements.framework)
            training_config['input_data_config'] = \
                self.optimize_distributed_data_config(training_requirements)

        # Spot training configuration for cost optimization
        if training_requirements.use_spot_instances:
            training_config['enable_managed_spot_training'] = True
            training_config['max_wait_time_in_seconds'] = training_requirements.max_wait_time
            training_config['checkpoint_config'] = {
                's3_uri': training_requirements.checkpoint_s3_path,
                'local_path': '/opt/ml/checkpoints'
            }

        return SageMakerTrainingOptimization(
            training_config=training_config,
            hyperparameter_tuning=self.design_hyperparameter_tuning(),
            monitoring_setup=self.design_training_monitoring()
        )

    def optimize_sagemaker_inference(self, inference_requirements):
        """Optimize SageMaker inference for performance and cost"""

        # Endpoint configuration
        endpoint_config = {
            'production_variants': [
                {
                    'variant_name': 'primary',
                    'model_name': inference_requirements.model_name,
                    'instance_type': self.select_inference_instance_type(inference_requirements),
                    'initial_instance_count': inference_requirements.min_instances,
                    'initial_variant_weight': 100,
                    'accelerator_type': self.select_accelerator_type(inference_requirements)
                }
            ],
            'data_capture_config': {
                'enable_capture': inference_requirements.enable_data_capture,
                'initial_sampling_percentage': inference_requirements.sampling_percentage,
                'destination_s3_uri': inference_requirements.data_capture_s3_uri,
                'capture_options': [
                    {'capture_mode': 'Input'},
                    {'capture_mode': 'Output'}
                ]
            },
            'kms_key_id': inference_requirements.encryption_key
        }

        # Auto-scaling configuration
        autoscaling_config = {
            'policy_name': f"{inference_requirements.endpoint_name}-scaling-policy",
            'service_namespace': 'sagemaker',
            'resource_id': f"endpoint/{inference_requirements.endpoint_name}/variant/primary",
            'scalable_dimension': 'sagemaker:variant:DesiredInstanceCount',
            'min_capacity': inference_requirements.min_instances,
            'max_capacity': inference_requirements.max_instances,
            'target_tracking_scaling_policies': [
                {
                    'policy_name': 'SageMakerVariantInvocationsPerInstance',
                    'target_value': inference_requirements.target_invocations_per_instance,
                    'scale_out_cooldown': 300,
                    'scale_in_cooldown': 300
                }
            ]
        }

        # Multi-model endpoint configuration
        if inference_requirements.multi_model_endpoint:
            endpoint_config['production_variants'][0]['model_data_url'] = \
                inference_requirements.multi_model_s3_prefix
            endpoint_config['production_variants'][0]['container_startup_health_check_timeout'] = 600

        return SageMakerInferenceOptimization(
            endpoint_config=endpoint_config,
            autoscaling_config=autoscaling_config,
            monitoring_setup=self.design_inference_monitoring()
        )

SageMaker Advanced Features:

SageMaker Pipelines:
├── Pipeline Definition: ML workflow definition and orchestration
├── Step Types: Training, processing, model registration steps
├── Conditional Execution: Conditional pipeline execution logic
├── Parameter Store: Pipeline parameter management
├── Caching: Step result caching for efficiency
├── Parallel Execution: Parallel step execution
├── Integration: External service integration capabilities
└── Monitoring: Pipeline execution monitoring and alerting

SageMaker Feature Store:
├── Feature Groups: Logical feature organization
├── Online Store: Low-latency feature retrieval
├── Offline Store: Batch feature processing
├── Feature Processing: Feature transformation and engineering
├── Point-in-Time Queries: Historical feature accuracy
├── Feature Discovery: Feature catalog and search
├── Data Quality: Feature quality monitoring
└── Lineage Tracking: Feature lineage and dependency tracking
```

This machine learning and AI frameworks expertise provides HeadElf with comprehensive knowledge of all major ML platforms, optimization techniques, and production deployment strategies for AI systems.

## Outputs
- ML framework recommendations optimized for specific use cases and requirements
- Production ML pipeline architectures with MLOps best practices
- Model training and inference optimization strategies for performance and cost
- Cloud ML platform implementation patterns and integration strategies
- AI/ML governance and compliance frameworks for enterprise deployment

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Create machine learning and AI frameworks expertise", "status": "completed", "activeForm": "Created machine learning and AI frameworks expertise"}]