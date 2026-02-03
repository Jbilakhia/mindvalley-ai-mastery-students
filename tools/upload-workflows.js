const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];
const N8N_HOST = 'jbilakhia.app.n8n.cloud';

const WORKFLOWS_TO_UPLOAD = [
  { file: '00-test-connection.json', name: '00 - Test Connection' },
  { file: '00-Filter-Email-Classification.json', name: '[0] Gmail Trigger → Classify → Route' },
  { file: 'w1-email-pipeline-2025-12-12.json', name: 'W1: Email Processing Pipeline' },
  { file: 'w2-approval-handler-2025-12-12.json', name: 'W2: Approval Handler' },
  { file: 'sub-revision-2025-12-12.json', name: 'SUB: Revision Processor' },
  { file: 'Gemini-Librarian-Tool-v2.json', name: 'Librarian Tool v2 (File Search)' },
  { file: 'gemini-drive-watcher-v1-2025-11-27.json', name: 'Gemini File Search - Drive Watcher' }
];

function cleanWorkflow(workflow) {
  // Remove properties that cause issues
  const cleaned = {
    name: workflow.name,
    nodes: workflow.nodes.map(node => {
      const cleanNode = {
        parameters: node.parameters,
        id: node.id,
        name: node.name,
        type: node.type,
        typeVersion: node.typeVersion,
        position: node.position
      };
      if (node.credentials) cleanNode.credentials = node.credentials;
      if (node.webhookId) cleanNode.webhookId = node.webhookId;
      return cleanNode;
    }),
    connections: workflow.connections,
    settings: workflow.settings || { executionOrder: 'v1' }
  };
  return cleaned;
}

function uploadWorkflow(workflowData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(workflowData);

    const options = {
      hostname: N8N_HOST,
      port: 443,
      path: '/api/v1/workflows',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': API_KEY,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  if (!API_KEY) {
    console.error('Usage: node upload-workflows.js <API_KEY>');
    process.exit(1);
  }

  const workflowsDir = path.join(__dirname, '..', 'workflows');
  const results = [];

  for (const wf of WORKFLOWS_TO_UPLOAD) {
    const filePath = path.join(workflowsDir, wf.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${wf.file} - file not found`);
      continue;
    }

    try {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const workflow = JSON.parse(rawContent);
      const cleaned = cleanWorkflow(workflow);

      console.log(`📤 Uploading: ${cleaned.name}...`);
      const result = await uploadWorkflow(cleaned);

      if (result.status === 200 || result.status === 201) {
        console.log(`✅ Success: ${cleaned.name} (ID: ${result.data.id})`);
        results.push({ name: cleaned.name, status: 'success', id: result.data.id });
      } else {
        console.log(`❌ Failed: ${cleaned.name} - ${JSON.stringify(result.data)}`);
        results.push({ name: cleaned.name, status: 'failed', error: result.data });
      }
    } catch (err) {
      console.log(`❌ Error: ${wf.file} - ${err.message}`);
      results.push({ name: wf.file, status: 'error', error: err.message });
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Success: ${results.filter(r => r.status === 'success').length}`);
  console.log(`   Failed: ${results.filter(r => r.status !== 'success').length}`);
}

main();
