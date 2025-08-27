#!/bin/bash

echo "🔍 Checking server status..."
echo ""

# Check Context7 server
echo "📊 Context7 Server Status:"
if curl -s http://localhost:3003 > /dev/null 2>&1; then
    echo "✅ Context7 server is running on port 3003"
    echo "   URL: http://localhost:3003"
    echo "   MCP endpoint: http://localhost:3003/mcp"
else
    echo "❌ Context7 server is not responding on port 3003"
fi

echo ""

# Check local site server
echo "📊 Local Site Server Status:"
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Local site server is running on port 8080"
    echo "   URL: http://localhost:8080"
    echo "   Open in browser: http://localhost:8080"
else
    echo "❌ Local site server is not responding on port 8080"
fi

echo ""

# Check MCP configuration
echo "📊 MCP Configuration Status:"
if [ -f ".cursor/mcp.json" ]; then
    echo "✅ MCP configuration file exists"
    echo "   Path: .cursor/mcp.json"
else
    echo "❌ MCP configuration file missing"
fi

echo ""

# Check running processes
echo "📊 Running Processes:"
echo "Context7 server:"
ps aux | grep "mcp-context7-server" | grep -v grep || echo "   No Context7 server process found"

echo ""
echo "Local site server:"
ps aux | grep "vite" | grep -v grep || echo "   No Vite process found"

echo ""
echo "🎉 Status check complete!"
