# 📸 INSTRUÇÕES PARA ADICIONAR IMAGENS DE CORTES

## 📁 Como organizar suas imagens:

### Opção 1: Numeração Sequencial (Recomendado)
1. Crie uma pasta chamada `haircuts` dentro do diretório do site
2. Nomeie suas imagens como:
   - `corte1.jpg`
   - `corte2.jpg` 
   - `corte3.jpg`
   - ... até `corte60.jpg` (ou quantas você tiver)

### Opção 2: Nomes Personalizados
Se você quiser usar nomes específicos, edite o arquivo `script.js` na linha das `customNames`:

```javascript
customNames: [
    'fade-moderno.jpg',
    'pompadour-classico.jpg',
    'undercut-criativo.jpg',
    'degrade-lateral.jpg',
    // ... adicione todos os nomes das suas imagens
]
```

## ⚙️ Configuração no código:

No arquivo `script.js`, ajuste estas configurações conforme suas imagens:

```javascript
const HAIRCUT_IMAGES = {
    folder: 'haircuts/',     // Nome da sua pasta
    totalImages: 60,         // Número total de imagens
    extension: '.jpg',       // Extensão (.jpg, .png, .webp)
    customNames: []          // Nomes específicos (opcional)
};
```

## 📋 Formatos suportados:
- ✅ JPG/JPEG (recomendado)
- ✅ PNG
- ✅ WebP
- ✅ GIF

## 📐 Tamanho recomendado:
- **Largura**: 400-800px
- **Altura**: 400-600px
- **Proporção**: 1:1 ou 4:3
- **Tamanho**: Máximo 500KB por imagem

## 🚀 Como funciona:

1. **Carregamento automático**: O site seleciona uma imagem aleatória para cada post
2. **Fallback inteligente**: Se uma imagem não carrega, mostra um placeholder
3. **Performance otimizada**: Imagens são carregadas conforme necessário
4. **Efeitos visuais**: Hover com zoom suave

## 📂 Estrutura final do projeto:
```
RKBarberSite/
├── haircuts/           ← SUA PASTA DE IMAGENS
│   ├── corte1.jpg
│   ├── corte2.jpg
│   ├── ...
│   └── corte60.jpg
├── index.html
├── styles.css
├── script.js
└── outros arquivos...
```

## 🔧 Se precisar de ajuda:

1. **Mudança na quantidade**: Ajuste `totalImages` no código
2. **Mudança na extensão**: Ajuste `extension` no código  
3. **Pasta diferente**: Ajuste `folder` no código
4. **Problemas de carregamento**: Verifique os caminhos das imagens

**💡 Dica**: Após adicionar as imagens, recarregue a página para ver os cortes reais no feed!