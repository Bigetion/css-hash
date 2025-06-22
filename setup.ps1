$ErrorActionPreference = "Stop"

# Install required dependencies
Write-Host "🔧 Installing required dependencies..." -ForegroundColor Cyan

try {
    # Install dev dependencies
    npm install --save-dev @babel/core@7.22.9 @babel/preset-env@7.22.9 babel-jest@29.6.1 jest@29.6.1 jest-environment-jsdom@29.6.1

    # Run build
    Write-Host "🏗️ Building the library..." -ForegroundColor Cyan
    npm run build

    # Run tests
    Write-Host "🧪 Running tests..." -ForegroundColor Cyan
    npm test

    Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Review the built files in the 'dist' directory" -ForegroundColor White
    Write-Host "  2. Check that tests passed successfully" -ForegroundColor White
    Write-Host "  3. Try importing the library in your projects" -ForegroundColor White
    Write-Host "  4. Update the README.md if needed" -ForegroundColor White
    Write-Host "  5. Publish to npm with 'npm publish'" -ForegroundColor White

} catch {
    Write-Host "❌ Setup failed: $_" -ForegroundColor Red
    exit 1
}
