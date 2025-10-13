#!/bin/bash

# Muselet Landing - Quick Push Script
# Usage: ./push.sh "Your commit message here"

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Usage: ./push.sh \"Your commit message here\""
    echo "Example: ./push.sh \"Fix scroll behavior and improve navigation\""
    exit 1
fi

# Get the commit message from the first argument
COMMIT_MSG="$1"

echo "🚀 Pushing changes to GitHub..."
echo "📝 Commit message: $COMMIT_MSG"
echo ""

# Stage all changes
echo "📦 Staging changes..."
git add .

# Commit with the provided message
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to main branch
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/BenjaminDelShreve/muselet-landing.git"
