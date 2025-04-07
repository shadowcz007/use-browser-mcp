import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

// const transport = new StdioClientTransport({
//   command: 'node',
//   args: ['src/index.js', '--transport', 'stdio'],
//   stderr: 'pipe'
// })

const transport = new StdioClientTransport({
  command: 'dist/mcp-use-browser.exe',
  // command: 'node',
  args: [  '--transport', 'stdio'],
  stderr: 'pipe'
})

console.log('初始化传输层...')

// 不要在这里调用 transport.start()，因为 client.connect() 会自动调用它

// 设置错误输出监听
const stderrStream = transport.stderr
if (stderrStream) {
  stderrStream.on('data', data => {
    console.error(`命令错误输出: ${data.toString()}`)
  })
}

const client = new Client(
  {
    name: 'example-client',
    version: '1.0.0'
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
)

console.log('客户端配置完成，准备连接...')

await client.connect(transport)
console.log('连接成功！')

try {
  const serverInfo = await client.getServerVersion()
  console.log('服务器信息:', JSON.stringify(serverInfo, null, 2))

  // 检查服务器支持的方法
  console.log('正在检查服务器支持的方法...')
  const capabilities = await client.getServerCapabilities()

  // 有条件地调用方法
  if (capabilities.prompts) {
    console.log('正在获取可用提示...')
    const prompts = await client.listPrompts()
    console.log('可用提示列表:', JSON.stringify(prompts, null, 2))
  } else {
    console.log('服务器不支持提示功能')
  }

  if (capabilities.resources) {
    console.log('正在获取可用资源...')
    const resources = await client.listResources()
    console.log('可用资源列表:', JSON.stringify(resources, null, 2))
  } else {
    console.log('服务器不支持资源功能')
  }

  if (capabilities.tools) {
    // console.log('正在获取可用工具...')
    // const tools = await client.listTools()
    // console.log('可用工具列表:', JSON.stringify(tools, null, 2))

  
    const result = await client.callTool({
      name: 'browser_navigate',
      arguments: {
       url:"https://news.ycombinator.com/"
      }
    });
    console.log(result)

  } else {
    console.log('服务器不支持工具功能')
  }
} catch (error) {
  console.error('操作过程中发生错误:', error.message)
  if (error.code) {
    console.error(`错误代码: ${error.code}`)
  }
  if (error.data) {
    console.error(`错误数据: ${JSON.stringify(error.data)}`)
  }
}
