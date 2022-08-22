#!/usr/bin/env bash

set -euo pipefail

username="calvinbui"
token=$GITHUB_PAT
repo="calvinbui/calvin.me"

echo "--- Add GitHub origin"
git remote add github "https://${username}:${token}@github.com/${repo}.git"

echo "--- Pushing to GitHub"
git push --force github HEAD
