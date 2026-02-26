# Security Tools and Frameworks Expertise

## Description
Expert-level knowledge of cybersecurity tools, frameworks, and platforms including SIEM systems, vulnerability scanners, penetration testing tools, security orchestration platforms, identity and access management systems, and security automation frameworks with implementation strategies and optimization techniques.

## When to Use
- Designing comprehensive security architectures for enterprise systems
- Implementing security automation and orchestration workflows
- Selecting and optimizing security tools for specific threat landscapes
- Building security monitoring and incident response capabilities
- Conducting security assessments and penetration testing

## Instructions

You are a cybersecurity expert with deep knowledge of security tools, frameworks, threat detection systems, vulnerability management platforms, and security automation technologies used to protect modern infrastructure and applications.

### SIEM and Security Monitoring Expertise

#### **Splunk Expertise**

```
Splunk Architecture and Components:

Splunk Enterprise Architecture:
├── Search Head Cluster:
│   ├── Search Management: Distributed search coordination
│   ├── Knowledge Objects: Saved searches, dashboards, alerts
│   ├── User Interface: Web interface and REST API
│   ├── Captain Election: Automatic leader election for cluster
│   ├── Replication: Configuration and knowledge object replication
│   └── Load Balancing: Search request distribution

├── Indexer Cluster:
│   ├── Data Indexing: Raw data parsing and indexing
│   ├── Data Replication: Multi-site replication for availability
│   ├── Bucket Management: Hot/warm/cold/frozen bucket lifecycle
│   ├── Search Processing: Distributed search execution
│   ├── Data Retention: Automated data lifecycle management
│   └── Performance Optimization: Index optimization and compression

├── Forwarder Tier:
│   ├── Universal Forwarders: Lightweight data collection agents
│   ├── Heavy Forwarders: Data parsing and filtering capability
│   ├── Data Routing: Intelligent data routing and load balancing
│   ├── Buffer Management: Local buffering during network issues
│   ├── Encryption: Data encryption in transit
│   └── Monitoring: Forwarder health and performance monitoring

Data Processing Pipeline:
├── Data Input:
│   ├── File Monitoring: Real-time file monitoring and ingestion
│   ├── Network Inputs: TCP/UDP, HTTP, syslog inputs
│   ├── Scripted Inputs: Custom data collection scripts
│   ├── Modular Inputs: Technology-specific data connectors
│   └── Database Inputs: Direct database connectivity

├── Data Parsing:
│   ├── Line Breaking: Event boundary identification
│   ├── Timestamp Recognition: Automatic timestamp extraction
│   ├── Field Extraction: Automatic and manual field extraction
│   ├── Data Transformation: RegEx-based data transformation
│   └── Source Type Recognition: Automatic data type classification

├── Index Processing:
│   ├── Indexing: Full-text search index creation
│   ├── Compression: Data compression for storage efficiency
│   ├── Bucketing: Time-based data organization
│   ├── Metadata: Search metadata and acceleration
│   └── Replication: Data replication across cluster nodes

class SplunkOptimizer:
    def __init__(self):
        self.indexer_analyzer = SplunkIndexerAnalyzer()
        self.search_optimizer = SplunkSearchOptimizer()
        self.storage_optimizer = SplunkStorageOptimizer()

    def optimize_splunk_deployment(self, security_requirements):
        """Optimize Splunk for large-scale security monitoring"""

        # Indexer cluster optimization
        indexer_config = {
            'cluster_settings': {
                'replication_factor': 3,
                'search_factor': 2,
                'cluster_label': security_requirements.cluster_name,
                'max_fixup_time_ms': 30000,
                'heartbeat_timeout': 60,
                'restart_timeout': 600
            },
            'index_configuration': self.optimize_security_indexes(security_requirements.data_sources),
            'storage_optimization': {
                'hot_bucket_size': '100MB',
                'max_hot_buckets': 3,
                'max_warm_buckets': 300,
                'cold_path_optimization': True,
                'frozen_path': security_requirements.long_term_storage_path
            },
            'performance_tuning': {
                'max_concurrent_searches': 50,
                'index_time_extraction': False,  # Use search-time for flexibility
                'bloom_filter_optimization': True,
                'parallel_ingestion_pipelines': 4
            }
        }

        # Search head cluster optimization
        search_head_config = {
            'cluster_configuration': {
                'captain_election': 'automatic',
                'replication_port': 8080,
                'heartbeat_period': 1,
                'election_timeout': 60,
                'rolling_restart_compatible': True
            },
            'search_optimization': {
                'search_concurrency': {
                    'max_searches_per_cpu': 1,
                    'max_rt_search_multiplier': 1,
                    'max_hist_searches': 6
                },
                'knowledge_bundle_optimization': {
                    'bundle_replication': True,
                    'bundle_compression': True,
                    'bundle_acceleration': True
                }
            },
            'dashboard_optimization': {
                'dashboard_refresh_optimization': True,
                'post_process_count_limit': 50000,
                'search_job_sharing': True
            }
        }

        # Security-specific configurations
        security_config = {
            'indexes': {
                'security_main': {
                    'max_data_size': 'auto_high_volume',
                    'max_hot_buckets': 10,
                    'retention_days': 90
                },
                'windows_logs': {
                    'max_data_size': 'auto_high_volume',
                    'retention_days': 365
                },
                'firewall_logs': {
                    'max_data_size': 'auto_high_volume',
                    'retention_days': 180
                },
                'dns_logs': {
                    'max_data_size': 'auto',
                    'retention_days': 30
                }
            },
            'data_models': self.design_security_data_models(),
            'correlation_searches': self.generate_correlation_searches(),
            'alert_configurations': self.configure_security_alerts()
        }

        return SplunkOptimization(
            indexer_config=indexer_config,
            search_head_config=search_head_config,
            security_config=security_config,
            monitoring_setup=self.design_splunk_monitoring()
        )

    def design_security_data_models(self):
        """Design optimized data models for security use cases"""

        data_models = {
            'authentication': {
                'objects': [
                    'authentication_events',
                    'failed_authentications',
                    'privileged_authentications',
                    'authentication_sources'
                ],
                'acceleration': {
                    'enabled': True,
                    'earliest_time': '-7d@d',
                    'cron_schedule': '*/5 * * * *'
                }
            },
            'network_traffic': {
                'objects': [
                    'all_traffic',
                    'blocked_traffic',
                    'allowed_traffic',
                    'dns_queries',
                    'http_transactions'
                ],
                'acceleration': {
                    'enabled': True,
                    'earliest_time': '-24h@h',
                    'cron_schedule': '*/15 * * * *'
                }
            },
            'endpoint_security': {
                'objects': [
                    'processes',
                    'filesystem_changes',
                    'registry_changes',
                    'network_connections',
                    'malware_detections'
                ],
                'acceleration': {
                    'enabled': True,
                    'earliest_time': '-30d@d',
                    'cron_schedule': '0 2 * * *'
                }
            },
            'vulnerability_management': {
                'objects': [
                    'vulnerability_scans',
                    'patch_status',
                    'asset_inventory',
                    'security_compliance'
                ],
                'acceleration': {
                    'enabled': False  # Historical analysis doesn't need acceleration
                }
            }
        }

        return data_models

Advanced Splunk Security Patterns:

Threat Hunting Workflows:
├── Hypothesis-Driven Hunting: Structured threat hunting methodologies
├── IOC Correlation: Indicator of compromise correlation across data sources
├── Behavioral Analytics: Anomaly detection using machine learning
├── Timeline Analysis: Event correlation and timeline reconstruction
├── Threat Intelligence Integration: External threat intel feed integration
└── Hunting Dashboard: Interactive hunting interface and workflows

Security Orchestration Integration:
├── SOAR Integration: Phantom/Splunk SOAR workflow automation
├── Incident Response Playbooks: Automated response workflows
├── Case Management: Security incident case management integration
├── Threat Intelligence Platforms: TIP integration for enrichment
├── Vulnerability Scanners: Automated vulnerability data ingestion
└── Security Tool Integration: Multi-tool security ecosystem integration

Enterprise Security App Optimization:
├── Risk-Based Alerting: Risk scoring and prioritization
├── Asset and Identity Correlation: Comprehensive asset tracking
├── Protocol Intelligence: Network protocol analysis and monitoring
├── Threat Intelligence Management: Centralized threat intel management
├── Investigation Tools: Advanced investigation capabilities
└── Compliance Reporting: Automated compliance report generation
```

#### **Elastic Security (ELK) Expertise**

```
Elastic Security Architecture:

Elastic Stack Components for Security:
├── Elasticsearch:
│   ├── Security Index Management: Security-specific index templates
│   ├── Machine Learning: Anomaly detection and behavioral analytics
│   ├── Alerting: Real-time alerting and notification framework
│   ├── SIEM Rules: Security detection rules and correlation
│   └── Threat Intelligence: IOC matching and enrichment

├── Logstash/Beats:
│   ├── Data Collection: Comprehensive log and metric collection
│   ├── Data Parsing: Security log parsing and normalization
│   ├── Enrichment: GeoIP, threat intel, and contextual enrichment
│   ├── Filtering: Security event filtering and routing
│   └── Output Management: Multi-destination output routing

├── Kibana Security:
│   ├── SIEM Interface: Security event investigation interface
│   ├── Detection Rules: Real-time security detection rules
│   ├── Case Management: Security incident case management
│   ├── Timeline Analysis: Event timeline visualization
│   ├── Network Graph: Network relationship visualization
│   └── Host Details: Endpoint security monitoring

class ElasticSecurityOptimizer:
    def __init__(self):
        self.detection_optimizer = DetectionRuleOptimizer()
        self.ml_analyzer = ElasticMLAnalyzer()
        self.performance_optimizer = ElasticSecurityPerformanceOptimizer()

    def optimize_elastic_security(self, security_requirements):
        """Optimize Elastic Security for comprehensive threat detection"""

        # Index strategy for security data
        security_index_strategy = {
            'index_templates': {
                'logs-endpoint-*': {
                    'settings': {
                        'number_of_shards': 3,
                        'number_of_replicas': 1,
                        'refresh_interval': '5s',
                        'index.lifecycle.name': 'security-logs-policy'
                    },
                    'mappings': self.generate_endpoint_mapping()
                },
                'logs-network-*': {
                    'settings': {
                        'number_of_shards': 6,
                        'number_of_replicas': 1,
                        'refresh_interval': '1s',
                        'index.lifecycle.name': 'network-logs-policy'
                    },
                    'mappings': self.generate_network_mapping()
                },
                '.siem-signals-*': {
                    'settings': {
                        'number_of_shards': 1,
                        'number_of_replicas': 1,
                        'refresh_interval': '1s'
                    },
                    'mappings': self.generate_signals_mapping()
                }
            },
            'ilm_policies': {
                'security-logs-policy': {
                    'phases': {
                        'hot': {
                            'actions': {
                                'rollover': {
                                    'max_size': '50gb',
                                    'max_age': '1d'
                                }
                            }
                        },
                        'warm': {
                            'min_age': '7d',
                            'actions': {
                                'allocate': {'number_of_replicas': 0},
                                'forcemerge': {'max_num_segments': 1}
                            }
                        },
                        'cold': {
                            'min_age': '30d',
                            'actions': {
                                'allocate': {
                                    'number_of_replicas': 0,
                                    'include': {'node_type': 'cold'}
                                }
                            }
                        },
                        'delete': {
                            'min_age': security_requirements.retention_period
                        }
                    }
                }
            }
        }

        # Detection rules optimization
        detection_rules = {
            'endpoint_rules': self.generate_endpoint_detection_rules(),
            'network_rules': self.generate_network_detection_rules(),
            'authentication_rules': self.generate_authentication_rules(),
            'malware_rules': self.generate_malware_detection_rules(),
            'custom_rules': self.generate_custom_detection_rules(security_requirements.threat_landscape)
        }

        # Machine learning configurations
        ml_configurations = {
            'anomaly_detection_jobs': [
                {
                    'job_id': 'rare_process_executions',
                    'analysis_config': {
                        'bucket_span': '15m',
                        'detectors': [{
                            'function': 'rare',
                            'by_field_name': 'process.executable',
                            'partition_field_name': 'host.hostname'
                        }]
                    },
                    'data_description': {
                        'time_field': '@timestamp',
                        'time_format': 'epoch_ms'
                    }
                },
                {
                    'job_id': 'suspicious_login_activity',
                    'analysis_config': {
                        'bucket_span': '1h',
                        'detectors': [{
                            'function': 'freq_rare',
                            'by_field_name': 'user.name',
                            'partition_field_name': 'source.ip'
                        }]
                    }
                }
            ],
            'data_frame_analytics': [
                {
                    'id': 'network_traffic_outliers',
                    'analysis': {
                        'outlier_detection': {
                            'feature_influence_threshold': 0.1
                        }
                    },
                    'source': {
                        'index': ['logs-network-*']
                    }
                }
            ]
        }

        return ElasticSecurityOptimization(
            index_strategy=security_index_strategy,
            detection_rules=detection_rules,
            ml_configurations=ml_configurations,
            alerting_setup=self.design_security_alerting()
        )

    def design_threat_hunting_workflows(self, hunting_requirements):
        """Design advanced threat hunting workflows in Elastic Security"""

        hunting_workflows = {
            'initial_access_hunting': {
                'queries': [
                    self.generate_lateral_movement_queries(),
                    self.generate_credential_access_queries(),
                    self.generate_persistence_queries()
                ],
                'visualizations': [
                    'network_communication_graph',
                    'process_execution_timeline',
                    'user_activity_heatmap'
                ],
                'automation': {
                    'scheduled_searches': True,
                    'alert_threshold': 'medium_risk',
                    'enrichment': ['threat_intelligence', 'geolocation', 'user_context']
                }
            },
            'insider_threat_hunting': {
                'queries': [
                    self.generate_data_exfiltration_queries(),
                    self.generate_privilege_escalation_queries(),
                    self.generate_policy_violation_queries()
                ],
                'ml_integration': {
                    'user_behavior_analysis': True,
                    'data_access_patterns': True,
                    'time_based_anomalies': True
                }
            },
            'apt_hunting': {
                'queries': [
                    self.generate_apt_technique_queries(),
                    self.generate_c2_communication_queries(),
                    self.generate_living_off_land_queries()
                ],
                'threat_intelligence': {
                    'ioc_matching': True,
                    'yara_rules': True,
                    'sigma_rules': True,
                    'mitre_att_ck_mapping': True
                }
            }
        }

        return hunting_workflows

Elastic Security Advanced Features:

Detection Engine Optimization:
├── Rule Performance: Query optimization for detection rules
├── Signal Correlation: Multi-stage detection rule correlation
├── Exception Handling: False positive reduction mechanisms
├── Rule Tuning: Risk score and severity calibration
├── Custom Rules: Organization-specific detection logic
└── Machine Learning Integration: ML-based anomaly detection

SIEM Investigation Workflows:
├── Timeline Analysis: Event correlation and timeline reconstruction
├── Case Management: Security incident tracking and management
├── Host Analysis: Comprehensive endpoint investigation
├── Network Analysis: Network flow and communication analysis
├── User Investigation: User behavior and access pattern analysis
└── Threat Intelligence: IOC enrichment and threat context

Endpoint Security Integration:
├── Elastic Endpoint: Native endpoint detection and response
├── Osquery Integration: Live endpoint querying capabilities
├── Elastic Defend: Endpoint protection and malware prevention
├── Memory Protection: Memory-based attack prevention
├── Behavioral Protection: Process and file behavior monitoring
└── Response Actions: Remote endpoint response capabilities
```

### Vulnerability Management Expertise

#### **Nessus and OpenVAS Expertise**

```
Nessus Professional Architecture:

Nessus Components and Optimization:
├── Nessus Scanner:
│   ├── Plugin Management: Vulnerability plugin updates and management
│   ├── Scan Engine: Multi-threaded vulnerability scanning engine
│   ├── Policy Configuration: Scan policy templates and customization
│   ├── Credential Management: Secure credential storage and rotation
│   └── Performance Tuning: Scan performance and resource optimization

├── Nessus Manager:
│   ├── Scanner Coordination: Distributed scanner management
│   ├── Scan Scheduling: Automated scan scheduling and orchestration
│   ├── Result Aggregation: Centralized vulnerability result management
│   ├── Reporting: Comprehensive vulnerability reporting and analytics
│   └── Integration: API integration with external systems

├── Asset Discovery:
│   ├── Network Discovery: Automatic network asset discovery
│   ├── Service Detection: Service and application fingerprinting
│   ├── OS Detection: Operating system identification
│   ├── Asset Classification: Automatic asset categorization
│   └── Inventory Management: Centralized asset inventory

class VulnerabilityManagementOptimizer:
    def __init__(self):
        self.scan_optimizer = VulnerabilityScanOptimizer()
        self.policy_manager = ScanPolicyManager()
        self.integration_manager = VulnIntegrationManager()

    def optimize_vulnerability_scanning(self, asset_requirements):
        """Optimize vulnerability scanning for large-scale environments"""

        # Scan policy optimization
        scan_policies = {
            'network_discovery': {
                'port_scanning': {
                    'port_range': '1-65535',
                    'scan_type': 'connect',
                    'timing_template': 'normal',
                    'max_simultaneous_hosts': 30,
                    'max_simultaneous_checks_per_host': 5
                },
                'service_detection': {
                    'service_detection': True,
                    'version_detection': True,
                    'safe_checks': True,
                    'unscanned_closed_ports': False
                }
            },
            'authenticated_scanning': {
                'credentials': {
                    'windows': {
                        'username': asset_requirements.windows_admin_user,
                        'password': asset_requirements.windows_admin_password,
                        'domain': asset_requirements.windows_domain
                    },
                    'ssh': {
                        'username': asset_requirements.ssh_user,
                        'private_key': asset_requirements.ssh_private_key,
                        'passphrase': asset_requirements.ssh_passphrase
                    }
                },
                'local_security_checks': True,
                'patch_management': {
                    'enumerate_all_ciphers': True,
                    'check_for_ms_updates': True,
                    'check_for_third_party_updates': True
                }
            },
            'compliance_scanning': {
                'compliance_checks': [
                    'CIS_Benchmarks',
                    'NIST_800-53',
                    'PCI_DSS',
                    'SOX',
                    'HIPAA'
                ],
                'policy_compliance': True,
                'configuration_auditing': True
            }
        }

        # Distributed scanning architecture
        scanning_architecture = {
            'scanner_distribution': {
                'dmz_scanner': {
                    'purpose': 'External and DMZ asset scanning',
                    'network_access': 'external_networks',
                    'scan_policies': ['network_discovery', 'web_application']
                },
                'internal_scanner': {
                    'purpose': 'Internal network scanning',
                    'network_access': 'internal_networks',
                    'scan_policies': ['authenticated_scanning', 'compliance_scanning']
                },
                'cloud_scanner': {
                    'purpose': 'Cloud infrastructure scanning',
                    'network_access': 'cloud_networks',
                    'scan_policies': ['cloud_configuration', 'container_scanning']
                }
            },
            'scan_scheduling': {
                'discovery_scans': {
                    'frequency': 'weekly',
                    'scope': 'full_network',
                    'timing': 'off_hours'
                },
                'vulnerability_scans': {
                    'frequency': 'monthly',
                    'scope': 'all_assets',
                    'timing': 'maintenance_window'
                },
                'compliance_scans': {
                    'frequency': 'quarterly',
                    'scope': 'compliance_scope',
                    'timing': 'business_hours'
                }
            }
        }

        # Integration and automation
        integration_config = {
            'ticketing_integration': {
                'platform': asset_requirements.ticketing_system,
                'auto_ticket_creation': True,
                'priority_mapping': {
                    'critical': 'p1',
                    'high': 'p2',
                    'medium': 'p3',
                    'low': 'p4'
                },
                'assignment_rules': self.generate_assignment_rules()
            },
            'patch_management_integration': {
                'platform': asset_requirements.patch_management_system,
                'auto_patch_deployment': False,  # Manual approval required
                'patch_prioritization': 'cvss_score',
                'maintenance_windows': asset_requirements.maintenance_windows
            },
            'siem_integration': {
                'platform': asset_requirements.siem_platform,
                'real_time_alerting': True,
                'vulnerability_feeds': True,
                'asset_correlation': True
            }
        }

        return VulnerabilityManagementOptimization(
            scan_policies=scan_policies,
            architecture=scanning_architecture,
            integration_config=integration_config,
            metrics_dashboard=self.design_vulnerability_metrics()
        )

Vulnerability Assessment Advanced Patterns:

Continuous Vulnerability Assessment:
├── Asset Discovery: Real-time asset discovery and inventory
├── Risk-Based Scanning: Prioritized scanning based on asset criticality
├── Authenticated Scanning: Credentialed scans for comprehensive coverage
├── Configuration Assessment: Security configuration validation
├── Patch Management: Automated patch deployment coordination
└── Compliance Monitoring: Continuous compliance posture monitoring

Vulnerability Correlation and Analytics:
├── Threat Intelligence Correlation: CVE and threat intel correlation
├── Exploit Availability: Exploit code availability analysis
├── Asset Context: Business context and criticality mapping
├── Risk Scoring: Business risk-based vulnerability prioritization
├── Trend Analysis: Vulnerability trend and pattern analysis
└── Remediation Tracking: Vulnerability lifecycle management
```

### Identity and Access Management (IAM) Expertise

#### **Active Directory and Azure AD Expertise**

```
Active Directory Security Architecture:

AD Security Components:
├── Domain Security:
│   ├── Domain Controller Security: DC hardening and protection
│   ├── Group Policy Security: Secure GPO configuration
│   ├── DNS Security: Secure DNS configuration and monitoring
│   ├── Replication Security: Secure AD replication protocols
│   └── Trust Relationships: Secure inter-domain trust configuration

├── Identity Security:
│   ├── Account Security: Password policies and account lockout
│   ├── Privileged Account Management: Privileged access controls
│   ├── Service Account Security: Service account management
│   ├── Kerberos Security: Kerberos authentication hardening
│   └── Certificate Services: PKI integration and management

├── Access Control:
│   ├── RBAC Implementation: Role-based access control
│   ├── Delegation Model: Administrative delegation strategies
│   ├── ACL Management: Access control list optimization
│   ├── Group Management: Security group strategy
│   └── Resource Access: File and resource access controls

class ActiveDirectorySecurityOptimizer:
    def __init__(self):
        self.ad_analyzer = ActiveDirectoryAnalyzer()
        self.security_hardener = ADSecurityHardener()
        self.monitoring_designer = ADMonitoringDesigner()

    def optimize_ad_security_architecture(self, ad_requirements):
        """Optimize Active Directory security architecture"""

        # Domain controller hardening
        dc_security_config = {
            'security_policies': {
                'password_policy': {
                    'minimum_password_length': 14,
                    'password_complexity': True,
                    'maximum_password_age': 90,
                    'minimum_password_age': 1,
                    'password_history': 24,
                    'account_lockout_threshold': 5,
                    'account_lockout_duration': 30,
                    'reset_account_lockout_counter': 30
                },
                'audit_policies': {
                    'account_logon_events': 'success_and_failure',
                    'account_management': 'success_and_failure',
                    'logon_events': 'success_and_failure',
                    'object_access': 'failure',
                    'policy_change': 'success_and_failure',
                    'privilege_use': 'failure',
                    'system_events': 'success_and_failure',
                    'directory_service_access': 'failure'
                }
            },
            'group_policies': {
                'computer_configuration': {
                    'security_settings': self.generate_computer_security_settings(),
                    'administrative_templates': self.generate_admin_templates(),
                    'windows_firewall': self.generate_firewall_policies()
                },
                'user_configuration': {
                    'security_settings': self.generate_user_security_settings(),
                    'administrative_templates': self.generate_user_admin_templates()
                }
            }
        }

        # Privileged access management
        pam_configuration = {
            'tier_model': {
                'tier_0': {
                    'description': 'Domain and enterprise administrators',
                    'assets': ['domain_controllers', 'certificate_authorities'],
                    'access_controls': 'maximum_security',
                    'monitoring': 'real_time_alerting'
                },
                'tier_1': {
                    'description': 'Server and application administrators',
                    'assets': ['member_servers', 'applications'],
                    'access_controls': 'high_security',
                    'monitoring': 'detailed_logging'
                },
                'tier_2': {
                    'description': 'Workstation and user administrators',
                    'assets': ['workstations', 'user_accounts'],
                    'access_controls': 'standard_security',
                    'monitoring': 'standard_logging'
                }
            },
            'privileged_accounts': {
                'emergency_accounts': {
                    'count': 2,
                    'access_level': 'domain_admin',
                    'usage_monitoring': True,
                    'regular_validation': True
                },
                'service_accounts': {
                    'managed_service_accounts': True,
                    'least_privilege': True,
                    'regular_password_rotation': True,
                    'monitoring': True
                }
            }
        }

        # Security monitoring configuration
        monitoring_config = {
            'event_collection': {
                'domain_controllers': [
                    4624,  # Successful logon
                    4625,  # Failed logon
                    4648,  # Logon with explicit credentials
                    4720,  # User account created
                    4726,  # User account deleted
                    4728,  # Member added to security-enabled global group
                    4732,  # Member added to security-enabled local group
                    4756,  # Member added to security-enabled universal group
                    5136,  # Directory service object modified
                    5137   # Directory service object created
                ],
                'member_servers': [
                    4624, 4625, 4648, 4697, 7034, 7035, 7036, 7040
                ],
                'workstations': [
                    4624, 4625, 4648, 4688, 4689
                ]
            },
            'alerting_rules': {
                'privileged_account_usage': {
                    'trigger': 'tier_0_account_logon_outside_hours',
                    'severity': 'critical',
                    'response': 'immediate_investigation'
                },
                'unusual_group_changes': {
                    'trigger': 'privileged_group_membership_change',
                    'severity': 'high',
                    'response': 'automated_ticket_creation'
                },
                'password_spray_detection': {
                    'trigger': 'multiple_failed_logons_multiple_accounts',
                    'severity': 'high',
                    'response': 'account_lockout_and_alert'
                }
            }
        }

        return ActiveDirectorySecurityOptimization(
            dc_security=dc_security_config,
            pam_config=pam_configuration,
            monitoring_config=monitoring_config,
            compliance_framework=self.design_ad_compliance_framework()
        )

Azure Active Directory Security:

Azure AD Security Features:
├── Conditional Access: Context-aware access policies
├── Identity Protection: Risk-based authentication
├── Privileged Identity Management: Just-in-time privileged access
├── Multi-Factor Authentication: Strong authentication requirements
├── Single Sign-On: Secure SSO across applications
├── Identity Governance: Access lifecycle management
├── Hybrid Identity: On-premises and cloud identity integration
└── Zero Trust: Zero trust identity architecture

Advanced Azure AD Patterns:
├── Risk-Based Authentication: Sign-in and user risk evaluation
├── Just-in-Time Access: Temporary privileged access provisioning
├── Access Reviews: Periodic access rights certification
├── Entitlement Management: Automated access request workflows
├── Identity Secure Score: Identity security posture measurement
├── B2B/B2C Integration: External user access management
└── Compliance Automation: Automated compliance reporting
```

### Penetration Testing and Red Team Tools

#### **Metasploit and Exploitation Frameworks**

```
Metasploit Framework Architecture:

Framework Components:
├── Exploit Modules: Vulnerability exploitation code
├── Payload Modules: Code execution payloads
├── Auxiliary Modules: Information gathering and scanning
├── Post-Exploitation Modules: Post-compromise activities
├── Encoder Modules: Payload encoding for AV evasion
├── NOP Generators: NOP sled generation
├── Database Integration: Workspace and result management
└── Plugin System: Extensible functionality framework

Advanced Penetration Testing Workflows:
├── Reconnaissance: Automated information gathering
├── Vulnerability Assessment: Comprehensive vulnerability identification
├── Exploitation: Safe and controlled exploit execution
├── Post-Exploitation: Privilege escalation and lateral movement
├── Persistence: Maintaining access and establishing backdoors
├── Data Exfiltration: Simulated data theft scenarios
├── Cleanup: Evidence removal and system restoration
└── Reporting: Comprehensive penetration testing reports

Red Team Frameworks:
├── Cobalt Strike: Advanced adversary simulation
├── Empire/PowerShell Empire: PowerShell-based post-exploitation
├── MITRE ATT&CK: Adversary tactics and techniques framework
├── Atomic Red Team: Adversary simulation test library
├── Red Team Automation: Automated attack chain execution
└── Purple Team Integration: Defensive testing and validation
```

This security tools expertise provides HeadElf with comprehensive knowledge of cybersecurity platforms, defensive tools, vulnerability management systems, and penetration testing frameworks for building robust security architectures.

## Outputs
- Comprehensive security architecture recommendations with tool selection
- SIEM implementation strategies optimized for threat detection
- Vulnerability management program design with automation workflows
- Identity and access management security optimization
- Security monitoring and incident response capability design