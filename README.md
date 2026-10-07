# Laiza Carvalho — Nutrição clínica e esportiva

Site em português, responsivo e renderizado no servidor com React, TanStack Start e Vite. Fotos reais, navegação por âncoras, WhatsApp, FAQ acessível e animações progressivas que respeitam a preferência por movimento reduzido.

## Desenvolvimento

Node.js 24 e npm.

```sh
npm ci
npm run dev
```

## Verificação e build

```sh
npm run test
npx tsc --noEmit
npm run build
```

## Vercel

Importe este repositório com diretório raiz `.`. O arquivo `vercel.json` define `npm ci` e `npm run build`; o preset Nitro `vercel` produz `.vercel/output` com os arquivos estáticos e a função de renderização. Use o runtime Node.js 24. Se houver um Output Directory manual no painel da Vercel, remova-o para utilizar a Build Output API; não configure `dist`.

## Conteúdo e imagens

Telefone, Instagram, e-mail, CRN e áreas de atendimento vieram do projeto fornecido. Confirme os dados profissionais com Laiza antes da divulgação. Nenhum depoimento, endereço específico ou garantia de resultado foi acrescentado.

A foto real foi recuperada da página pública `https://bio.site/laizacarvalho` e otimizada em `public/images/laiza-consultorio.webp`. Os dois arquivos `src/assets/*.asset.json` preservam a referência da mídia e a URL de origem, mas utilizam a cópia local para evitar os caminhos privados `/__l5e/` do Lovable. A mesma fotografia é apresentada com enquadramentos diferentes no início e na seção sobre a profissional.

Animações: entrada inicial em CSS, revelação progressiva com IntersectionObserver, interações dos cartões e indicação de leitura. O conteúdo permanece visível quando JavaScript está desativado e com movimento reduzido. Consultas presenciais e on-line abrem mensagens específicas no WhatsApp.
