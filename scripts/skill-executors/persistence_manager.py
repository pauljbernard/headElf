#!/usr/bin/env python3
"""
Git-Based Persistence Manager for HeadElf

Python interface to the Git-based persistence system, providing:
- Decision history tracking with Git audit trail
- User context persistence and retrieval
- Analytics generation and trend analysis
- Extension management through Git repositories
"""

import os
import json
import subprocess
import datetime
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
import uuid
import asyncio

class GitPersistenceManager:
    """Python interface to HeadElf's Git-based persistence system."""

    def __init__(self, repo_root: Optional[str] = None):
        self.repo_root = Path(repo_root) if repo_root else Path.cwd()
        self.data_dir = self.repo_root / "data"
        self.decisions_dir = self.data_dir / "decisions"
        self.contexts_dir = self.data_dir / "contexts"
        self.analytics_dir = self.data_dir / "analytics"
        self.extensions_dir = self.data_dir / "extensions"

        self.initialize_directories()

    def initialize_directories(self) -> None:
        """Initialize the data directory structure."""
        directories = [
            self.data_dir,
            self.decisions_dir,
            self.contexts_dir,
            self.analytics_dir,
            self.extensions_dir,
            self.contexts_dir / "users",
            self.decisions_dir / "by-role",
            self.decisions_dir / "by-date",
            self.analytics_dir / "snapshots",
            self.analytics_dir / "trends"
        ]

        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)

        # Create .gitignore if it doesn't exist
        gitignore_path = self.data_dir / ".gitignore"
        if not gitignore_path.exists():
            gitignore_content = """# Sensitive data patterns
*.key
*.secret
**/private/
**/temp/
*.tmp

# OS specific
.DS_Store
Thumbs.db

# Temporary files
*.log
*.tmp
"""
            gitignore_path.write_text(gitignore_content)

    async def persist_decision(self, decision_data: Dict[str, Any]) -> str:
        """Persist executive decision with Git tracking."""
        timestamp = datetime.datetime.utcnow().isoformat() + "Z"
        decision_id = decision_data.get('id', self.generate_decision_id())

        # Prepare enhanced decision record
        enhanced_decision = {
            **decision_data,
            'id': decision_id,
            'timestamp': timestamp,
            'persistence_metadata': {
                'persisted_by': 'HeadElf-GitPersistence',
                'version': '1.0',
                'schema_version': '1.0'
            }
        }

        # Generate file paths
        date_str = timestamp.split('T')[0]
        executive_role = decision_data.get('executive_role', 'unknown').lower()

        filename = f"{date_str}-{executive_role}-{decision_id}.json"

        main_path = self.decisions_dir / filename
        role_path = self.decisions_dir / "by-role" / executive_role / filename
        date_path = self.decisions_dir / "by-date" / date_str / filename

        # Ensure subdirectories exist
        role_path.parent.mkdir(parents=True, exist_ok=True)
        date_path.parent.mkdir(parents=True, exist_ok=True)

        # Write decision files
        decision_json = json.dumps(enhanced_decision, indent=2, ensure_ascii=False)

        main_path.write_text(decision_json)
        role_path.write_text(decision_json)
        date_path.write_text(decision_json)

        # Update user context
        user_id = decision_data.get('user_id', 'anonymous')
        await self.update_user_context(user_id, {
            'last_decision': decision_id,
            'last_activity': timestamp,
            'decision_count': await self.get_user_decision_count(user_id) + 1
        })

        # Commit to Git
        commit_hash = await self.commit_to_git(
            [main_path, role_path, date_path],
            f"{executive_role.upper()} decision: {decision_data.get('decision_type', 'analysis')} - {decision_data.get('query', '')[:50]}..."
        )

        if commit_hash:
            enhanced_decision['git_commit_hash'] = commit_hash
            # Update files with commit hash
            decision_json = json.dumps(enhanced_decision, indent=2, ensure_ascii=False)
            main_path.write_text(decision_json)

        return decision_id

    async def get_decision_history(self, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Retrieve decision history with optional filtering."""
        if filters is None:
            filters = {}

        decisions = []

        # Determine search directories
        search_dirs = [self.decisions_dir]

        if filters.get('executive_role'):
            role_dir = self.decisions_dir / "by-role" / filters['executive_role'].lower()
            if role_dir.exists():
                search_dirs.append(role_dir)

        if filters.get('date_range', {}).get('start'):
            date_str = filters['date_range']['start'].split('T')[0]
            date_dir = self.decisions_dir / "by-date" / date_str
            if date_dir.exists():
                search_dirs.append(date_dir)

        # Collect decision files
        for search_dir in search_dirs:
            if not search_dir.exists():
                continue

            json_files = sorted(search_dir.glob("*.json"), reverse=True)

            for json_file in json_files:
                if filters.get('limit') and len(decisions) >= filters['limit']:
                    break

                try:
                    decision = json.loads(json_file.read_text())

                    # Apply filters
                    if self._decision_matches_filters(decision, filters):
                        decisions.append(decision)

                except (json.JSONDecodeError, Exception) as e:
                    print(f"Error reading decision file {json_file}: {e}")

        # Remove duplicates and apply final limit
        unique_decisions = []
        seen_ids = set()

        for decision in decisions:
            decision_id = decision.get('id')
            if decision_id and decision_id not in seen_ids:
                seen_ids.add(decision_id)
                unique_decisions.append(decision)

        return unique_decisions[:filters.get('limit', len(unique_decisions))]

    def _decision_matches_filters(self, decision: Dict[str, Any], filters: Dict[str, Any]) -> bool:
        """Check if a decision matches the given filters."""
        # User ID filter
        if filters.get('user_id') and decision.get('user_id') != filters['user_id']:
            return False

        # Decision type filter
        if filters.get('decision_type') and decision.get('decision_type') != filters['decision_type']:
            return False

        # Date range filter
        if filters.get('date_range'):
            decision_date = datetime.datetime.fromisoformat(decision.get('timestamp', '').replace('Z', '+00:00'))

            if filters['date_range'].get('start'):
                start_date = datetime.datetime.fromisoformat(filters['date_range']['start'].replace('Z', '+00:00'))
                if decision_date < start_date:
                    return False

            if filters['date_range'].get('end'):
                end_date = datetime.datetime.fromisoformat(filters['date_range']['end'].replace('Z', '+00:00'))
                if decision_date > end_date:
                    return False

        return True

    async def persist_user_context(self, user_id: str, context: Dict[str, Any]) -> None:
        """Persist user context to file system."""
        context_path = self.contexts_dir / "users" / f"{user_id}.json"
        context_path.parent.mkdir(parents=True, exist_ok=True)

        enhanced_context = {
            **context,
            'user_id': user_id,
            'last_updated': datetime.datetime.utcnow().isoformat() + "Z"
        }

        context_path.write_text(json.dumps(enhanced_context, indent=2, ensure_ascii=False))

        await self.commit_to_git([context_path], f"Update user context: {user_id}")

    async def get_user_context(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve user context from file system."""
        context_path = self.contexts_dir / "users" / f"{user_id}.json"

        if not context_path.exists():
            return None

        try:
            return json.loads(context_path.read_text())
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error reading user context for {user_id}: {e}")
            return None

    async def update_user_context(self, user_id: str, updates: Dict[str, Any]) -> None:
        """Update user context with new information."""
        existing_context = await self.get_user_context(user_id) or {
            'user_id': user_id,
            'organization_profile': {},
            'role_preferences': {},
            'historical_decisions': [],
            'learning_patterns': {},
            'custom_extensions': []
        }

        existing_context.update(updates)
        await self.persist_user_context(user_id, existing_context)

    async def generate_analytics(self, time_range: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
        """Generate analytics snapshot for decision patterns."""
        if time_range is None:
            # Default to last 30 days
            end_date = datetime.datetime.utcnow()
            start_date = end_date - datetime.timedelta(days=30)
            time_range = {
                'start': start_date.isoformat() + "Z",
                'end': end_date.isoformat() + "Z"
            }

        decisions = await self.get_decision_history({'date_range': time_range})

        analytics = {
            'time_range': time_range,
            'total_decisions': len(decisions),
            'decisions_by_role': {},
            'confidence_metrics': {
                'average': 0.0,
                'distribution': {}
            },
            'most_active_areas': [],
            'trend_analysis': {},
            'generated_at': datetime.datetime.utcnow().isoformat() + "Z"
        }

        if not decisions:
            return analytics

        # Analyze decisions by role
        for decision in decisions:
            role = decision.get('executive_role', 'unknown')
            analytics['decisions_by_role'][role] = analytics['decisions_by_role'].get(role, 0) + 1

        # Confidence metrics
        confidences = [d.get('confidence', 0.0) for d in decisions if 'confidence' in d]
        if confidences:
            analytics['confidence_metrics']['average'] = sum(confidences) / len(confidences)

            # Confidence distribution
            for confidence in confidences:
                bucket = round(confidence, 1)
                analytics['confidence_metrics']['distribution'][str(bucket)] = \
                    analytics['confidence_metrics']['distribution'].get(str(bucket), 0) + 1

        # Most active decision types
        decision_types = {}
        for decision in decisions:
            decision_type = decision.get('decision_type', 'unknown')
            decision_types[decision_type] = decision_types.get(decision_type, 0) + 1

        analytics['most_active_areas'] = sorted(
            decision_types.items(),
            key=lambda x: x[1],
            reverse=True
        )[:10]

        # Persist analytics snapshot
        timestamp = datetime.datetime.utcnow().isoformat().split('T')[0]
        snapshot_path = self.analytics_dir / "snapshots" / f"{timestamp}.json"
        snapshot_path.write_text(json.dumps(analytics, indent=2, ensure_ascii=False))

        await self.commit_to_git([snapshot_path], f"Analytics snapshot: {time_range['start']} to {time_range['end']}")

        return analytics

    async def get_user_decision_count(self, user_id: str) -> int:
        """Get total decision count for a user."""
        decisions = await self.get_decision_history({'user_id': user_id})
        return len(decisions)

    async def commit_to_git(self, file_paths: List[Path], message: str) -> Optional[str]:
        """Commit files to Git with HeadElf signature."""
        try:
            # Check if we're in a Git repository
            result = await self.run_git_command(['rev-parse', '--git-dir'])
            if not result[0]:
                return None

            # Add files to Git
            for file_path in file_paths:
                relative_path = file_path.relative_to(self.repo_root)
                await self.run_git_command(['add', str(relative_path)])

            # Create commit message
            commit_message = f"[HeadElf] {message}\n\nGenerated by HeudElf Executive Intelligence System\nTimestamp: {datetime.datetime.utcnow().isoformat()}Z\nFiles: {len(file_paths)} file(s)"

            # Commit
            commit_result = await self.run_git_command(['commit', '-m', commit_message])
            if not commit_result[0]:
                return None

            # Get commit hash
            hash_result = await self.run_git_command(['rev-parse', 'HEAD'])
            return hash_result[1].strip() if hash_result[0] else None

        except Exception as e:
            print(f"Git operation failed (continuing without version control): {e}")
            return None

    async def run_git_command(self, args: List[str]) -> Tuple[bool, str]:
        """Run a Git command and return success status and output."""
        try:
            process = await asyncio.create_subprocess_exec(
                'git', *args,
                cwd=self.repo_root,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )

            stdout, stderr = await process.communicate()

            if process.returncode == 0:
                return True, stdout.decode('utf-8')
            else:
                return False, stderr.decode('utf-8')

        except Exception as e:
            return False, str(e)

    def generate_decision_id(self) -> str:
        """Generate a unique decision ID."""
        return f"{int(datetime.datetime.utcnow().timestamp() * 1000)}-{uuid.uuid4().hex[:8]}"

    async def register_extension(self, extension_repo: str, version: Optional[str] = None) -> bool:
        """Register an extension from a Git repository."""
        try:
            extension_name = Path(extension_repo).stem.replace('.git', '')
            extension_path = self.extensions_dir / extension_name

            if extension_path.exists():
                # Update existing extension
                result = await self.run_git_command(['pull', 'origin', 'main'])
                if not result[0]:
                    print(f"Failed to update extension {extension_name}: {result[1]}")
                    return False
            else:
                # Clone new extension
                clone_result = await asyncio.create_subprocess_exec(
                    'git', 'clone', extension_repo, str(extension_path),
                    cwd=self.extensions_dir
                )
                await clone_result.communicate()

                if clone_result.returncode != 0:
                    print(f"Failed to clone extension {extension_repo}")
                    return False

            # Checkout specific version if provided
            if version:
                checkout_result = await self.run_git_command(['checkout', version])
                if not checkout_result[0]:
                    print(f"Failed to checkout version {version}: {checkout_result[1]}")
                    return False

            # Update extensions manifest
            manifest_path = self.extensions_dir / "manifest.json"
            manifest = {}

            if manifest_path.exists():
                manifest = json.loads(manifest_path.read_text())

            manifest[extension_name] = {
                'repository': extension_repo,
                'version': version or 'main',
                'installed_at': datetime.datetime.utcnow().isoformat() + "Z",
                'path': str(extension_path)
            }

            manifest_path.write_text(json.dumps(manifest, indent=2))

            await self.commit_to_git([manifest_path], f"Register extension: {extension_name}")

            return True

        except Exception as e:
            print(f"Extension registration failed: {e}")
            return False

    async def get_installed_extensions(self) -> Dict[str, Any]:
        """Get list of installed extensions."""
        manifest_path = self.extensions_dir / "manifest.json"

        if not manifest_path.exists():
            return {}

        try:
            return json.loads(manifest_path.read_text())
        except (json.JSONDecodeError, Exception) as e:
            print(f"Error reading extensions manifest: {e}")
            return {}


# Integration with existing HeadElf executors
class ExecutorPersistenceIntegration:
    """Integration layer between HeadElf executors and Git persistence."""

    def __init__(self, persistence_manager: GitPersistenceManager):
        self.persistence = persistence_manager

    async def persist_decision_result(self,
                                    executive_role: str,
                                    decision_type: str,
                                    query: str,
                                    result: Dict[str, Any],
                                    context: Dict[str, Any]) -> str:
        """Persist an executive decision result."""

        decision_record = {
            'executive_role': executive_role,
            'decision_type': decision_type,
            'query': query,
            'context': context,
            'recommendation': result.get('recommendation', {}),
            'analysis': result.get('analysis', {}),
            'confidence': result.get('confidence', 0.0),
            'user_id': context.get('user_id', 'anonymous'),
            'session_id': context.get('session_id', 'unknown'),
            'execution_metadata': result.get('execution_metadata', {})
        }

        return await self.persistence.persist_decision(decision_record)

    async def get_relevant_context(self, user_id: str, decision_type: str) -> Dict[str, Any]:
        """Get relevant historical context for a decision."""
        user_context = await self.persistence.get_user_context(user_id)
        recent_decisions = await self.persistence.get_decision_history({
            'user_id': user_id,
            'decision_type': decision_type,
            'limit': 5
        })

        return {
            'user_context': user_context,
            'recent_similar_decisions': recent_decisions,
            'learning_patterns': user_context.get('learning_patterns', {}) if user_context else {}
        }