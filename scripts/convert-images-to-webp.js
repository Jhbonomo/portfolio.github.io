/**
 * Image Conversion Script
 * Converte imagens PNG/JPEG para WebP mantendo originais como fallback
 */

import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const IMAGE_DIRS = [
  'assets/images/AI',
  'assets/images/Edtech',
  'assets/images/museu',
  'assets/images/pnipe',
  'assets/images/SUS',
  'assets/images/Via'
];

const QUALITY = 85; // 0-100, 85 é bom balanço qualidade/tamanho

async function convertToWebP(imagePath) {
  try {
    const ext = extname(imagePath).toLowerCase();
    const filename = basename(imagePath, ext);
    const outputPath = join(dirname(imagePath), `${filename}.webp`);
    
    // Só converte PNG e JPEG
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return null;
    }
    
    await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const originalSize = (await sharp(imagePath).metadata()).size;
    const webpSize = (await sharp(outputPath).metadata()).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${filename}${ext} → ${filename}.webp (${savings}% menor)`);
    return { original: imagePath, webp: outputPath, savings };
  } catch (error) {
    console.error(`❌ Erro em ${imagePath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  try {
    const files = await readdir(dir);
    const results = [];
    
    for (const file of files) {
      const filePath = join(dir, file);
      const result = await convertToWebP(filePath);
      if (result) {
        results.push(result);
      }
    }
    
    return results;
  } catch (error) {
    console.error(`❌ Erro ao processar ${dir}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('🖼️  Iniciando conversão de imagens para WebP...\n');
  
  const allResults = [];
  
  for (const dir of IMAGE_DIRS) {
    console.log(`\n📁 Processando ${dir}...`);
    const results = await processDirectory(dir);
    allResults.push(...results);
  }
  
  console.log(`\n✨ Conversão concluída!`);
  console.log(`📊 ${allResults.length} imagens convertidas`);
  
  const avgSavings = allResults.reduce((sum, r) => sum + parseFloat(r.savings), 0) / allResults.length;
  console.log(`💾 Economia média: ${avgSavings.toFixed(1)}%`);
}

// Só executa se for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { convertToWebP, processDirectory };
