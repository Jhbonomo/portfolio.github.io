# Image Optimization Guide

## Ferramentas Recomendadas

### 1. Conversão para WebP
```bash
# Instalar sharp para conversão de imagens
npm install --save-dev sharp

# Executar script de conversão
node scripts/convert-images-to-webp.js
```

### 2. Ferramentas Online (Alternativa)
- **Squoosh**: https://squoosh.app/ (Google)
- **TinyPNG**: https://tinypng.com/
- **ImageOptim**: https://imageoptim.com/ (Mac)

## Implementação Recomendada

### Picture Element com Fallback
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Responsive Images
```html
<img 
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-1024w.webp 1024w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         1024px"
  src="image-640w.webp"
  alt="Description"
  loading="lazy"
  width="1024"
  height="768">
```

## Próximos Passos

1. **Manual** (Recomendado para este projeto):
   - Use Squoosh.app para converter imagens grandes (>100KB)
   - Converta PNG → WebP com fallback
   - Adicione width/height em todas as tags `<img>`

2. **Automatizado** (Para projetos maiores):
   - Use o script `convert-images-to-webp.js`
   - Configure Vite plugin para otimização automática
   - Implemente responsive images com srcset

## Prioridades

### Alta Prioridade (>500KB)
- `assets/images/pnipe/Pnipe - design system.svg` (18.9MB!)
- `assets/images/pnipe/Pnipe - cover.svg` (5.6MB)
- `assets/images/Via/via - featured categories.svg` (4.3MB)
- `assets/images/pnipe/pnipe - features.svg` (3.2MB)
- `assets/images/educacao museu.png` (2.2MB)

### Média Prioridade (100KB-500KB)
- Todas as imagens PNG/JPEG em `assets/images/AI/`
- Imagens em `assets/images/museu/`
- Screenshots em outros diretórios

### Baixa Prioridade (<100KB)
- SVGs pequenos (já otimizados)
- Ícones

## Resultado Esperado

- **Redução de 60-80%** no tamanho total das imagens
- **FCP (First Contentful Paint)** melhorado em 2-3 segundos
- **LCP (Largest Contentful Paint)** melhorado significativamente
- **Lighthouse Performance Score**: 85-95+
