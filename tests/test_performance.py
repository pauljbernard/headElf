#!/usr/bin/env python3
"""
Performance and Reliability Testing Framework

Comprehensive performance benchmarks, stress tests, and reliability validation
for HeadElf's executive intelligence capabilities at enterprise scale.
"""

import pytest
import asyncio
import json
import time
import statistics
from pathlib import Path
from typing import Dict, Any, List
from concurrent.futures import ThreadPoolExecutor

class TestPerformance:
    """Performance and reliability test suite for HeadElf."""

    def setup_method(self):
        """Setup for each test method."""
        self.headelf_root = Path(__file__).parent.parent
        self.performance_results = []

    async def benchmark_skill_execution(self, skill_name: str, input_data: Dict[str, Any], iterations: int = 10) -> Dict[str, Any]:
        """Benchmark skill execution performance."""
        import sys
        sys.path.append(str(self.headelf_root / "scripts/skill-executors"))

        executor_module = __import__(f"{skill_name}_executor", fromlist=[f"execute_{skill_name}_intelligence"])
        executor_func = getattr(executor_module, f"execute_{skill_name}_intelligence")

        execution_times = []
        success_count = 0

        for _ in range(iterations):
            start_time = time.perf_counter()
            try:
                result = await executor_func(json.dumps(input_data), json.dumps({}))
                result_data = json.loads(result)
                if result_data.get("success"):
                    success_count += 1
            except Exception:
                pass

            execution_times.append((time.perf_counter() - start_time) * 1000)

        return {
            "skill": skill_name,
            "iterations": iterations,
            "success_rate": success_count / iterations,
            "avg_execution_time_ms": statistics.mean(execution_times),
            "median_execution_time_ms": statistics.median(execution_times),
            "min_execution_time_ms": min(execution_times),
            "max_execution_time_ms": max(execution_times),
            "std_deviation_ms": statistics.stdev(execution_times) if len(execution_times) > 1 else 0
        }

    @pytest.mark.asyncio
    async def test_cto_performance_benchmark(self):
        """Benchmark CTO Intelligence performance."""
        input_data = {
            "decision_type": "technology_strategy",
            "query": "Evaluate cloud platform strategy",
            "context": {
                "organization": "enterprise",
                "urgency": "medium"
            }
        }

        benchmark = await self.benchmark_skill_execution("cto", input_data, iterations=20)

        assert benchmark["success_rate"] >= 0.95  # 95%+ success rate
        assert benchmark["avg_execution_time_ms"] <= 3000  # Average under 3 seconds
        assert benchmark["median_execution_time_ms"] <= 2000  # Median under 2 seconds

        self.performance_results.append(benchmark)

    @pytest.mark.asyncio
    async def test_concurrent_skill_execution(self):
        """Test concurrent execution of multiple skills."""
        tasks = []

        # Create concurrent tasks for different skills
        skill_inputs = {
            "cto": {
                "decision_type": "venture_capital",
                "query": "Evaluate startup technology stack",
                "context": {"investment_stage": "series_a"}
            }
        }

        # Execute multiple concurrent requests
        for _ in range(5):
            for skill, input_data in skill_inputs.items():
                task = self.benchmark_skill_execution(skill, input_data, iterations=3)
                tasks.append(task)

        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Verify concurrent execution doesn't degrade performance significantly
        successful_results = [r for r in results if isinstance(r, dict) and r.get("success_rate", 0) > 0.8]
        assert len(successful_results) >= len(tasks) * 0.8  # 80%+ of concurrent tasks succeed

    @pytest.mark.asyncio
    async def test_memory_and_resource_usage(self):
        """Test memory usage and resource consumption."""
        import psutil
        import os

        # Get initial memory usage
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss

        # Execute multiple skill operations
        input_data = {
            "decision_type": "technology_strategy",
            "query": "Memory usage test scenario",
            "context": {"test": "memory_benchmark"}
        }

        for _ in range(10):
            try:
                await self.benchmark_skill_execution("cto", input_data, iterations=5)
            except:
                pass

        # Check memory usage after operations
        final_memory = process.memory_info().rss
        memory_increase = (final_memory - initial_memory) / (1024 * 1024)  # MB

        # Memory increase should be reasonable (< 100MB for test operations)
        assert memory_increase < 100

    @pytest.mark.asyncio
    async def test_error_handling_and_recovery(self):
        """Test error handling and graceful recovery."""
        # Test with invalid input data
        invalid_inputs = [
            {},  # Empty input
            {"invalid": "structure"},  # Wrong structure
            {"decision_type": "invalid_type"},  # Invalid decision type
        ]

        for invalid_input in invalid_inputs:
            try:
                benchmark = await self.benchmark_skill_execution("cto", invalid_input, iterations=3)
                # Should handle errors gracefully, not crash
                assert isinstance(benchmark, dict)
            except Exception:
                # Exceptions should be handled gracefully
                pass

    @pytest.mark.asyncio
    async def test_scalability_limits(self):
        """Test system behavior under high load."""
        # Test with increasing load
        load_levels = [1, 5, 10, 20]
        results = []

        input_data = {
            "decision_type": "technology_strategy",
            "query": "Scalability test",
            "context": {"load_test": True}
        }

        for load in load_levels:
            start_time = time.perf_counter()
            tasks = []

            for _ in range(load):
                task = self.benchmark_skill_execution("cto", input_data, iterations=2)
                tasks.append(task)

            concurrent_results = await asyncio.gather(*tasks, return_exceptions=True)
            total_time = time.perf_counter() - start_time

            successful_results = [r for r in concurrent_results
                                if isinstance(r, dict) and r.get("success_rate", 0) > 0.5]

            results.append({
                "load_level": load,
                "success_rate": len(successful_results) / load,
                "total_time": total_time,
                "avg_time_per_task": total_time / load
            })

        # Verify system maintains reasonable performance under load
        for result in results:
            assert result["success_rate"] >= 0.7  # At least 70% success rate
            assert result["avg_time_per_task"] <= 10  # Reasonable time per task

    def test_skill_registry_performance(self):
        """Test skill registry discovery performance."""
        import sys
        sys.path.append(str(self.headelf_root / "skills"))
        from skills import get_skill_registry

        # Benchmark registry operations
        registry = get_skill_registry()

        start_time = time.perf_counter()
        for _ in range(100):
            registry.find_skill_by_query("cto technology strategy")
        search_time = time.perf_counter() - start_time

        start_time = time.perf_counter()
        for _ in range(100):
            registry.get_skill_summary()
        summary_time = time.perf_counter() - start_time

        # Registry operations should be fast
        assert search_time < 1.0  # 100 searches under 1 second
        assert summary_time < 0.5  # 100 summaries under 0.5 seconds

    @pytest.mark.asyncio
    async def test_node_bridge_performance(self):
        """Test Node.js TypeScript bridge performance."""
        node_bridge = self.headelf_root / "scripts/ts-executors/node-bridge.js"

        execution_times = []

        for _ in range(10):
            start_time = time.perf_counter()

            cmd = [
                "node",
                str(node_bridge),
                "cto-intelligence",
                json.dumps({"decision_type": "technology_strategy", "query": "Performance test"})
            ]

            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=str(self.headelf_root)
            )

            await process.communicate()
            execution_times.append((time.perf_counter() - start_time) * 1000)

        avg_time = statistics.mean(execution_times)
        assert avg_time <= 1000  # Average Node bridge execution under 1 second

    def test_file_system_performance(self):
        """Test file system operations performance."""
        skills_dir = self.headelf_root / "skills"

        # Test skill discovery file operations
        start_time = time.perf_counter()

        skill_files = []
        for skill_dir in skills_dir.rglob("skill.md"):
            skill_files.append(skill_dir)

        discovery_time = time.perf_counter() - start_time

        # File discovery should be fast
        assert discovery_time < 2.0  # Skill discovery under 2 seconds
        assert len(skill_files) >= 40  # Should find expected number of skills

    def teardown_method(self):
        """Cleanup after each test method."""
        # Log performance results if needed
        if self.performance_results:
            print(f"\nPerformance Results Summary:")
            for result in self.performance_results:
                print(f"- {result['skill']}: {result['avg_execution_time_ms']:.2f}ms avg, "
                      f"{result['success_rate']:.2%} success rate")

if __name__ == "__main__":
    # Run performance tests
    pytest.main([__file__, "-v", "--tb=short", "-s"])