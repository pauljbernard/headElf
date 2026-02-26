# Complete Database Technology Mastery

## Description
Expert-level knowledge of all database technologies, their internal architectures, strengths, weaknesses, implementation patterns, and optimization techniques across relational, NoSQL, NewSQL, and specialized databases.

## When to Use
- Database selection and architecture decisions
- Performance optimization and troubleshooting
- Migration strategies and compatibility analysis
- Polyglot persistence architecture design

## Instructions

You are a database expert with deep knowledge of every database technology's internals, trade-offs, and optimal usage patterns.

### Relational Databases Deep Expertise

#### **PostgreSQL Internal Architecture**
```
PostgreSQL Deep Knowledge:

Internal Architecture:
├── Process Model:
│   ├── Postmaster: Main supervisor process managing connections
│   ├── Backend Processes: One per client connection (fork-based model)
│   ├── Background Processes: WAL writer, checkpointer, autovacuum, stats collector
│   ├── Shared Memory: Shared buffers, WAL buffers, lock tables
│   └── Memory Context: Hierarchical memory management system

├── Storage Engine:
│   ├── Heap Files: Variable-length records with TOAST for large values
│   ├── Pages: 8KB pages with line pointers and tuple headers
│   ├── MVCC Implementation: XID-based versioning, no undo logs
│   ├── WAL (Write-Ahead Logging): Transaction durability and replication
│   └── Vacuum Process: Dead tuple cleanup, space reclamation

├── Query Processing:
│   ├── Parser: SQL parsing and syntax tree generation
│   ├── Analyzer: Semantic analysis and query tree transformation
│   ├── Planner/Optimizer: Cost-based optimization with genetic algorithm
│   ├── Executor: Plan node execution with iterator model
│   └── Statistics: ANALYZE command updates table statistics for optimization

Performance Optimization Expertise:

Index Strategy:
├── B-tree Indexes: Default for most datatypes, supports range queries
├── Hash Indexes: Equality lookups only, not WAL-logged until v10
├── GiST Indexes: Generalized search trees for geometric, full-text, custom types
├── SP-GiST: Space-partitioned GiST for clustered data (IP addresses, ranges)
├── GIN Indexes: Generalized inverted indexes for arrays, JSONB, full-text
├── BRIN Indexes: Block range indexes for very large, naturally ordered tables
└── Partial Indexes: Indexes with WHERE clause for subset of rows

Query Optimization Techniques:
├── EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON): Detailed execution analysis
├── pg_stat_statements: Query performance monitoring extension
├── work_mem Tuning: Memory for sorts, hash joins, bitmap operations
├── shared_buffers: PostgreSQL's buffer cache sizing
├── effective_cache_size: Hint for optimizer about OS cache
├── random_page_cost vs seq_page_cost: Storage speed tuning
├── Join Algorithm Selection: Nested loop, hash join, merge join costs
├── Partition Pruning: Elimination of partitions during planning
├── Parallel Query: parallel_workers, max_parallel_workers configuration
└── JIT Compilation: Just-in-time compilation for expression evaluation

Advanced PostgreSQL Features:
├── Logical Replication: Row-level replication with conflict resolution
├── Streaming Replication: Binary replication for high availability
├── Partitioning: Range, list, hash partitioning strategies
├── Foreign Data Wrappers: Access external data sources as tables
├── Extensions: PostGIS, pg_stat_statements, pg_trgm, uuid-ossp
├── Custom Types and Functions: User-defined types, PL/pgSQL, PL/Python
├── Window Functions: Advanced analytical queries
├── Common Table Expressions: Recursive queries, query optimization
├── JSONB: Binary JSON storage with indexing support
└── Full-Text Search: Built-in text search with ranking

PostgreSQL Limitations and Workarounds:
├── Write Scalability: Single writer per table, solved with partitioning/sharding
├── Connection Overhead: Process-per-connection model, use PgBouncer pooling
├── Vacuum Overhead: Dead tuple cleanup impact, tune autovacuum parameters
├── Large Object Limitations: TOAST overhead, consider external blob storage
├── Lock Contention: Row-level locking, but can have wait cascades
└── Memory Usage: Process-per-connection memory overhead with many connections

Example - PostgreSQL Performance Tuning:
-- High-performance OLTP configuration
shared_buffers = '8GB'                    -- 25% of system RAM
effective_cache_size = '24GB'             -- 75% of system RAM
work_mem = '256MB'                        -- Per sort operation
maintenance_work_mem = '2GB'              -- For VACUUM, CREATE INDEX
checkpoint_completion_target = 0.9        -- Smooth checkpoints
wal_buffers = '64MB'                      -- WAL buffer size
default_statistics_target = 500           -- More detailed statistics
random_page_cost = 1.1                    -- SSD optimization
```

#### **MySQL/MariaDB Internal Architecture**
```
MySQL Deep Knowledge:

Storage Engine Architecture:
├── InnoDB (Default):
│   ├── Buffer Pool: In-memory cache for data and index pages
│   ├── Redo Log: Circular write-ahead log for crash recovery
│   ├── Undo Log: Multi-version concurrency control implementation
│   ├── Change Buffer: Insert/update buffering for secondary indexes
│   ├── Adaptive Hash Index: Automatic in-memory hash indexes
│   ├── Doublewrite Buffer: Protection against partial page writes
│   ├── Row Format: Compact, redundant, dynamic, compressed formats
│   └── MVCC: Consistent non-locking reads using undo information

├── MyISAM (Legacy):
│   ├── Table-level Locking: Concurrent reads, exclusive writes
│   ├── Key Cache: Index caching in memory
│   ├── Packed Keys: Key compression for space efficiency
│   └── Fast COUNT(*): Stored row count for fast queries

├── Memory/HEAP: In-memory temporary tables
├── Archive: Compressed storage for historical data
├── CSV: Comma-separated values format
├── Federated: Access remote MySQL tables
└── NDB Cluster: Distributed, shared-nothing clustering

InnoDB Optimization Expertise:
├── Buffer Pool Sizing: innodb_buffer_pool_size (70-80% of RAM)
├── Buffer Pool Instances: innodb_buffer_pool_instances for concurrency
├── Log File Size: innodb_log_file_size for write performance
├── Page Size: innodb_page_size (16KB default, 4KB for SSD)
├── Compression: innodb_compression_level for storage efficiency
├── Purge Threads: innodb_purge_threads for MVCC cleanup
├── I/O Threads: innodb_read_io_threads, innodb_write_io_threads
├── Flush Method: innodb_flush_method (O_DIRECT for dedicated servers)
├── Adaptive Hash: innodb_adaptive_hash_index tuning
└── Change Buffer: innodb_change_buffering configuration

MySQL Replication Architecture:
├── Binary Log: Row-based, statement-based, or mixed replication
├── GTID: Global Transaction Identifiers for consistent replication
├── Semi-Synchronous: Acknowledgment from at least one replica
├── Group Replication: Multi-master synchronous replication
├── MySQL Cluster: Synchronous multi-master with auto-sharding
└── Point-in-Time Recovery: Binary log replay for recovery

Performance Schema and Monitoring:
├── sys Schema: Simplified views of Performance Schema data
├── Query Analysis: Slow query log, pt-query-digest tools
├── Index Usage: sys.schema_unused_indexes, duplicate index detection
├── Buffer Pool Analysis: Information_schema.innodb_buffer_pool_stats
├── Lock Analysis: sys.innodb_lock_waits, Performance Schema tables
└── Connection Monitoring: Processlist, user statistics

MySQL Limitations:
├── Query Cache: Deprecated in MySQL 8.0, poor scalability
├── Partition Pruning: Limited compared to PostgreSQL
├── JSON Support: Less advanced than PostgreSQL JSONB
├── Parallel Query: Limited parallel processing capabilities
├── Expression Indexes: Functional indexes only in MySQL 8.0+
└── CTE Support: Recursive CTEs only in MySQL 8.0+
```

### NoSQL Database Deep Expertise

#### **MongoDB Internal Architecture**
```
MongoDB Deep Knowledge:

Document Storage Model:
├── BSON Format: Binary JSON with additional types (ObjectId, Date, etc.)
├── Collections: Schema-flexible document containers
├── Documents: Up to 16MB size limit, nested document support
├── GridFS: Storage system for files larger than 16MB
└── Capped Collections: Fixed-size collections with insertion order

Storage Engines:
├── WiredTiger (Default since 3.2):
│   ├── Document-Level Locking: Concurrent writes to same collection
│   ├── Compression: Snappy, zlib, zstd compression algorithms
│   ├── Checkpointing: Periodic consistent snapshots
│   ├── Cache: In-memory cache with LRU eviction
│   ├── Write-Ahead Logging: Journal for durability
│   └── Index Prefix Compression: Key compression for efficiency

├── In-Memory Storage Engine: All data in RAM
└── MMAPv1 (Deprecated): Memory-mapped file storage

Replication and Sharding:
├── Replica Sets:
│   ├── Primary-Secondary Model: Single writer, multiple readers
│   ├── Oplog: Operation log for replication (capped collection)
│   ├── Election Process: Raft-based consensus for primary selection
│   ├── Read Preferences: Primary, secondary, nearest routing
│   ├── Write Concerns: Acknowledgment requirements (w, j, wtimeout)
│   └── Read Concerns: Consistency level guarantees

├── Sharding:
│   ├── Shard Key Selection: Critical for performance and distribution
│   ├── Chunk Management: Automatic data balancing across shards
│   ├── Config Servers: Metadata storage for cluster configuration
│   ├── Query Routing: mongos routers direct queries to appropriate shards
│   ├── Scatter-Gather Queries: Queries requiring multiple shards
│   └── Zone Sharding: Geographic or hardware-based data placement

Query Processing and Indexing:
├── Query Planner: Cost-based optimization with plan caching
├── Aggregation Pipeline: Multi-stage data processing framework
├── Index Types:
│   ├── Single Field: B-tree indexes on single fields
│   ├── Compound: Multi-field indexes with field order importance
│   ├── Multikey: Indexes on array values
│   ├── Text: Full-text search indexes with stemming
│   ├── 2dsphere: Geospatial queries on spherical geometry
│   ├── Hashed: Hash-based indexes for sharding
│   ├── Sparse: Indexes only documents with indexed field
│   └── Partial: Indexes with filter expressions

├── Query Optimization:
│   ├── Index Intersection: Use multiple indexes for single query
│   ├── Covered Queries: Return data entirely from index
│   ├── Index Hints: Force specific index usage
│   ├── Plan Cache: Cached query execution plans
│   └── Profiler: Query performance analysis tool

MongoDB Performance Optimization:
├── Schema Design:
│   ├── Embedding vs Referencing: Denormalization strategies
│   ├── Polymorphic Patterns: Single collection for related types
│   ├── Bucket Pattern: Group related documents for efficiency
│   ├── Outlier Pattern: Separate handling for exceptional documents
│   └── Anti-Patterns: Avoid large arrays, deep nesting

├── Index Strategy:
│   ├── ESR Rule: Equality, Sort, Range for compound indexes
│   ├── Index Cardinality: High cardinality fields first
│   ├── Index Intersection: Multiple single-field vs compound indexes
│   ├── Background Building: Online index creation
│   └── Index Maintenance: Monitor index usage and remove unused

├── Connection Management:
│   ├── Connection Pooling: Driver-level connection management
│   ├── Read Preference: Route reads to secondaries for scalability
│   ├── Write Concern: Balance durability vs performance
│   └── Retry Logic: Handle transient network failures

MongoDB Limitations:
├── Transaction Support: Limited multi-document transactions
├── Memory Usage: Working set should fit in RAM
├── Shard Key Immutability: Cannot change shard key after sharding
├── Join Limitations: $lookup performance issues with large datasets
├── Aggregation Memory: 100MB limit per stage (allowDiskUse option)
└── Index Size: Indexes should fit in memory for optimal performance

Example - MongoDB Performance Optimization:
// Optimal compound index for query pattern
db.orders.createIndex({
    "customerId": 1,           // Equality match
    "orderDate": -1,          // Sort field
    "status": 1               // Range filter
}, { background: true })

// Aggregation pipeline optimization
db.orders.aggregate([
    { $match: { customerId: 123 } },     // Filter early
    { $sort: { orderDate: -1 } },        // Use index for sorting
    { $limit: 10 },                      // Limit results early
    { $lookup: { /* join data */ } },     // Join after filtering
    { $project: { /* minimize fields */ } } // Project only needed fields
])
```

#### **Apache Cassandra Internal Architecture**
```
Cassandra Deep Knowledge:

Distributed Architecture:
├── Ring Topology: Consistent hashing for data distribution
├── Gossip Protocol: Peer-to-peer cluster state management
├── Virtual Nodes: Multiple token ranges per physical node
├── Replication Strategy:
│   ├── SimpleStrategy: Single datacenter replication
│   ├── NetworkTopologyStrategy: Multi-datacenter aware replication
│   ├── Replication Factor: Number of copies per data item
│   └── Consistency Levels: Trade-offs between consistency and availability

├── Partitioning:
│   ├── Partition Key: Determines data distribution across nodes
│   ├── Clustering Keys: Sorts data within partition
│   ├── Token Range: Hash space division among nodes
│   └── Hot Partitions: Avoiding uneven data distribution

Storage Engine (LSM-Tree based):
├── Memtables: In-memory write buffer
├── SSTables: Immutable on-disk storage files
├── Commit Log: Write-ahead log for durability
├── Compaction: Background merge of SSTables
├── Bloom Filters: Probabilistic data structure for read optimization
├── Compression: Block-level compression (LZ4, Snappy, Deflate)
└── Row Cache: Cached frequently accessed rows

Cassandra Data Model:
├── Keyspaces: Top-level namespace (equivalent to database)
├── Tables: Schema-defined structure within keyspace
├── Primary Key: Partition key + clustering columns
├── Denormalization: Query-driven data modeling
├── Time-to-Live: Automatic data expiration
├── Lightweight Transactions: Compare-and-set operations
└── Materialized Views: Automatically maintained query tables

Query Language (CQL):
├── SELECT: Limited to single partition or token range
├── WHERE: Restrictions on primary key columns
├── Clustering Order: Sort order within partition
├── Secondary Indexes: Global indexes (use sparingly)
├── BATCH: Atomic operations (same partition preferred)
└── User-Defined Functions: Custom logic in Java/JavaScript

Performance Optimization:
├── Data Modeling:
│   ├── Query-First Design: Model tables for specific query patterns
│   ├── Partition Size: Keep partitions under 100MB
│   ├── Hot Partitions: Distribute load across multiple partitions
│   ├── Time Series: Use time-based clustering for chronological data
│   └── Denormalization: Duplicate data to avoid joins

├── Compaction Strategy:
│   ├── Size-Tiered (STCS): Good for write-heavy workloads
│   ├── Leveled (LCS): Better read performance, more I/O overhead
│   ├── Time-Window (TWCS): Optimal for time-series data
│   └── Hybrid: Combination strategies for mixed workloads

├── Memory and I/O:
│   ├── Heap Size: Generally 8-14GB max for garbage collection
│   ├── Off-Heap: Row cache, bloom filters, compression metadata
│   ├── Memtable Size: Balance between memory usage and flush frequency
│   ├── Concurrent Reads/Writes: Thread pool sizing
│   └── Network: Compression for inter-node communication

Cassandra Strengths:
├── Linear Scalability: Add nodes without downtime
├── High Availability: No single points of failure
├── Geographic Distribution: Multi-datacenter replication
├── Write Performance: Optimized for high write throughput
├── Flexible Consistency: Tunable consistency levels
└── Operational Simplicity: Masterless architecture

Cassandra Limitations:
├── Query Flexibility: Limited query patterns compared to SQL
├── Data Modeling Complexity: Requires expertise for optimal performance
├── Storage Overhead: Multiple copies and tombstone overhead
├── Consistency Challenges: Eventually consistent by default
├── Operational Complexity: Requires understanding of internals
└── Memory Requirements: Large heap and off-heap memory needs

Example - Cassandra Data Modeling:
-- Time series data model
CREATE TABLE sensor_data (
    sensor_id UUID,
    time_bucket text,        -- "2024-01-15-14" for hourly buckets
    recorded_at timestamp,
    temperature decimal,
    humidity decimal,
    PRIMARY KEY ((sensor_id, time_bucket), recorded_at)
) WITH CLUSTERING ORDER BY (recorded_at DESC);

-- Efficient query for recent data
SELECT * FROM sensor_data
WHERE sensor_id = ? AND time_bucket = '2024-01-15-14'
ORDER BY recorded_at DESC LIMIT 100;
```

### Specialized Database Technologies

#### **Time Series Databases**
```
InfluxDB Architecture:
├── Time-Structured Merge Tree: Optimized for time-ordered data
├── Series Cardinality: Unique combinations of measurement + tag set
├── Retention Policies: Automatic data expiration
├── Continuous Queries: Real-time data aggregation
├── Flux Query Language: Functional query language for analytics
└── Clustering: InfluxDB Enterprise clustering capabilities

TimescaleDB (PostgreSQL Extension):
├── Hypertables: Automatic partitioning by time
├── Chunks: Time-based partitions with space partitioning
├── Compression: Native compression for older data
├── Continuous Aggregates: Materialized views for real-time analytics
├── Data Retention: Automatic old data removal
└── SQL Compatibility: Full PostgreSQL SQL support

Apache Druid:
├── Columnar Storage: Optimized for analytical queries
├── Real-time Ingestion: Stream processing with low latency
├── Pre-aggregation: Roll-up rules for automatic aggregation
├── Approximate Algorithms: HyperLogLog, theta sketches
├── Multi-tenancy: Segment-level isolation
└── Query Engine: SQL and native JSON-based queries
```

#### **Graph Databases**
```
Neo4j Architecture:
├── Property Graph Model: Nodes, relationships, and properties
├── Cypher Query Language: Declarative graph query language
├── ACID Transactions: Full transaction support
├── Index-Free Adjacency: Direct relationship traversal
├── Causal Clustering: Multi-instance deployment
└── Graph Algorithms: Built-in graph analysis algorithms

Amazon Neptune:
├── Multi-Model: Property graph (Gremlin) and RDF (SPARQL)
├── Serverless: Automatic scaling and management
├── Global Database: Cross-region replication
├── Backup and Recovery: Continuous backup to S3
├── Security: VPC, IAM, encryption at rest and in transit
└── Performance Insights: Query performance monitoring

ArangoDB:
├── Multi-Model: Document, graph, and key-value in one database
├── AQL: Unified query language for all data models
├── SmartGraphs: Automatic graph sharding
├── Foxx: JavaScript application framework
├── Streaming: Change streams for real-time applications
└── Cluster Architecture: Shared-nothing clustering
```

### Database Selection Decision Framework
```
Selection Criteria Matrix:

Workload Characteristics:
├── OLTP vs OLAP: Transaction processing vs analytics
├── Read/Write Ratio: Read-heavy, write-heavy, or balanced
├── Data Volume: Small datasets vs big data
├── Scaling Requirements: Vertical vs horizontal scaling needs
├── Consistency Requirements: ACID vs eventual consistency
├── Query Patterns: Simple lookups vs complex analytics
├── Real-time Requirements: Millisecond response vs batch processing
└── Geographic Distribution: Single region vs global distribution

Database Recommendation Matrix:
├── High-Volume OLTP: PostgreSQL, MySQL, CockroachDB, Yugabyte
├── Real-time Analytics: ClickHouse, Apache Druid, Rockset
├── Time Series: InfluxDB, TimescaleDB, Prometheus
├── Document Store: MongoDB, CouchDB, Amazon DocumentDB
├── Wide Column: Cassandra, HBase, Google Bigtable
├── Graph Analysis: Neo4j, Amazon Neptune, ArangoDB
├── Search: Elasticsearch, Solr, Amazon CloudSearch
├── Cache/Session Store: Redis, Memcached, Amazon ElastiCache
├── Data Warehouse: Snowflake, BigQuery, Redshift, Clickhouse
└── Multi-Model: ArangoDB, CosmosDB, FaunaDB

Performance Benchmarking:
├── TPC Benchmarks: TPC-C (OLTP), TPC-H (OLAP), TPC-DS (Decision Support)
├── YCSB: Yahoo Cloud Serving Benchmark for NoSQL systems
├── Custom Workloads: Application-specific performance testing
├── Scalability Testing: Linear scalability validation
├── Consistency Testing: CAP theorem trade-off validation
└── Operational Testing: Failure scenarios, backup/recovery, maintenance
```

This comprehensive database technology mastery provides HeadElf with deep expertise in database internals, optimization strategies, and selection criteria for any use case.

## Outputs
- Database architecture recommendations with detailed technical justification
- Performance optimization strategies specific to each database technology
- Migration strategies between different database systems
- Polyglot persistence architecture designs
- Database capacity planning and scaling strategies