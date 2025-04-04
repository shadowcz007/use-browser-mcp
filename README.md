# MCP Use Browser

这是一个基于微软开源的MCP Server的Playwright扩展服务，添加了JavaScript注入代码工具，并同时适配了AIO标准和MCP标准协议。

## 功能特点

- 使用系统已安装的浏览器（优先使用Edge、Chrome）
- 支持AIO标准协议通过stdio自动发现服务
- 支持MCP标准协议
- 提供JavaScript代码注入工具
- 支持SSE模式和stdio传输模式

## 使用方式

### 1. AIO标准协议

通过stdio，使用help方法获取类型和可用方法：
```bash
cat help.json | dist/mcp-use-browser.exe
```

### 2. MCP stdio模式

通过命令行参数开启MCP stdio传输模式：

```bash
mcp-use-browser.exe --transport stdio
```

[MCP 客户端接入示例](./mcpClient.js)

### 3. SSE模式

直接双击可执行文件运行MCP Server的SSE模式。

### 4. 调试

在SSE模式下，可以通过访问 `/debug` 端点查看所有可用的上下文。

## 浏览器支持

服务会使用系统中已安装的浏览器，优先顺序为：
1. Microsoft Edge
2. Google Chrome
3. 其他Chromium内核浏览器
