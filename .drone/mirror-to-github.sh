#!/usr/bin/env bash

set -euo pipefail

username="calvinbui"
token=$GITHUB_PAT
repo="calvinbui/calvin.me"

echo "--- Add safe directory"
git config --global --add safe.directory '*'

echo "--- Add GitHub origin"
git remote add github "https://${username}:${token}@github.com/${repo}.git"

echo "--- Pushing to GitHub"
git push --force github HEAD
