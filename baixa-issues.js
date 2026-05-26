const axios = require('axios');
const fs = require('fs');
const path = require('path');

function loadEnvFile(envFilePath) {
    if (!fs.existsSync(envFilePath)) return;

    fs.readFileSync(envFilePath, 'utf8')
        .split(/\r?\n/)
        .forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;

            const separatorIndex = trimmedLine.indexOf('=');
            if (separatorIndex === -1) return;

            const key = trimmedLine.slice(0, separatorIndex).trim();
            let value = trimmedLine.slice(separatorIndex + 1).trim();

            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            if (key && process.env[key] === undefined) {
                process.env[key] = value;
            }
        });
}

loadEnvFile(path.join(__dirname, '.env'));

// --- CONFIGURAÇÕES (via .env) ---
const GITLAB_URL = process.env.GITLAB_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const PRIVATE_TOKEN = process.env.PRIVATE_TOKEN;
const ISSUE_LABEL = process.env.ISSUE_LABEL;
const ISSUE_FILENAME_PATTERN = process.env.ISSUE_FILENAME_PATTERN;
const OUTPUT_DIR = './data/issues_markdown';
const ARCHIVE_DIR = './data/outras_issues';
// ---------------------------------

if (!PROJECT_ID || !PRIVATE_TOKEN) {
    console.error('❌ Defina PROJECT_ID e PRIVATE_TOKEN no arquivo .env antes de executar o script.');
    process.exit(1);
}

if (!ISSUE_LABEL) {
    console.error('❌ Defina ISSUE_LABEL no arquivo .env para filtrar qual label de issues baixar.');
    process.exit(1);
}

const api = axios.create({
    baseURL: `${GITLAB_URL}/api/v4`,
    headers: { 'PRIVATE-TOKEN': PRIVATE_TOKEN }
});

function ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
}

function shouldKeepIssueFile(fileName) {
    if (!ISSUE_FILENAME_PATTERN) return true;
    return new RegExp(ISSUE_FILENAME_PATTERN).test(fileName);
}

function moveNonMatchingIssues() {
    if (!ISSUE_FILENAME_PATTERN) return;

    ensureDirectory(ARCHIVE_DIR);

    fs.readdirSync(OUTPUT_DIR).forEach(fileName => {
        if (!fileName.endsWith('.md')) return;
        if (shouldKeepIssueFile(fileName)) return;

        const sourcePath = path.join(OUTPUT_DIR, fileName);
        const targetPath = path.join(ARCHIVE_DIR, fileName);
        fs.renameSync(sourcePath, targetPath);
    });
}

async function downloadIssues() {
    ensureDirectory(OUTPUT_DIR);

    let page = 1;
    let hasMore = true;

    const filterLabel = ISSUE_LABEL;

    console.log(`🚀 Buscando issues com a label "${filterLabel}"...`);

    while (hasMore) {
        try {
            const response = await api.get(`/projects/${PROJECT_ID}/issues`, {
                params: {
                    labels: filterLabel,
                    page: page,
                    per_page: 100
                }
            });

            const issues = response.data;

            if (issues.length === 0) {
                hasMore = false;
                break;
            }

            issues.forEach(issue => {
                const fileName = `issue-${issue.iid}-${issue.title.replace(/[/\\?%*:|"<>]/g, '-')}.md`;
                const filePath = path.join(OUTPUT_DIR, fileName);

                const content = `# ${issue.title}\n\n**Estado:** ${issue.state}\n**Autor:** ${issue.author.name}\n\n---\n\n${issue.description || '_Sem descrição_'}`;

                fs.writeFileSync(filePath, content);
            });

            console.log(`✅ Página ${page} processada (${issues.length} issues).`);

            const totalPages = response.headers['x-total-pages'];
            if (page >= totalPages) {
                hasMore = false;
            } else {
                page++;
            }

        } catch (error) {
            console.error('❌ Erro ao buscar issues:', error.message);
            hasMore = false;
        }
    }

    console.log(`\n🎉 Pronto! As issues estão em: ${path.resolve(OUTPUT_DIR)}`);

    moveNonMatchingIssues();
}

downloadIssues();
