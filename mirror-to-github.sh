#!/usr/bin/env bash

set -euo pipefail

username=$USER_NAME
token=$GH_PAT
repo=$REPOSITORY

echo "--- Add GitHub origin"
git remote add github "https://${username}:${token}@github.com/${repo}.git"

echo "--- Pushing to GitHub"
git push --force github HEAD
