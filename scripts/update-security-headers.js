// Script para adicionar headers de segurança em todos os arquivos HTML
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const projectFiles = [
  'projects/project-ai-interaction.html',
  'projects/project-brazilian-retail.html',
  'projects/project-museum-app.html',
  'projects/project-scientific-collaboration.html',
  'projects/project-teachers-ux.html',
  'projects/project-ux-mapping.html'
];

const securityHeaders = `
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
    `;

projectFiles.forEach(file => {
  try {
    let content = readFileSync(file, 'utf-8');
    
    // Adiciona security headers após viewport se não existir
    if (!content.includes('Content-Security-Policy')) {
      content = content.replace(
        /(<meta name="viewport"[^>]*>)/,
        `$1${securityHeaders}`
      );
    }
    
    // Atualiza Lucide para versão fixa com defer
    content = content.replace(
      /<script src="https:\/\/unpkg\.com\/lucide@latest\/dist\/umd\/lucide\.js"><\/script>/g,
      '<script src="https://unpkg.com/lucide@0.294.0/dist/umd/lucide.js" defer></script>'
    );
    
    // Adiciona defer aos scripts customizados
    content = content.replace(
      /<script src="(\.\.\/assets\/js\/[^"]+)">/g,
      '<script src="$1" defer>'
    );
    
    writeFileSync(file, content, 'utf-8');
    console.log(`✅ Atualizado: ${file}`);
  } catch (error) {
    console.error(`❌ Erro em ${file}:`, error.message);
  }
});

console.log('\n✨ Todos os arquivos foram atualizados!');
