# CODEBGs — Landing Page

Landing page da **CODEBGs Technologies** — automação de processos com N8N.
Site estático (HTML + CSS + JS), sem dependências e sem build. Pronto para GitHub + Vercel.

```
codebgs-landing/
├── index.html      → estrutura e conteúdo
├── styles.css      → design (cores, tipografia, layout, animações)
├── script.js       → menu, animações de rolagem e formulário
└── README.md       → este arquivo
```

---

## ✏️ O que trocar antes de publicar

1. **Número do WhatsApp** — abra `script.js` e edite a primeira linha:
   ```js
   const WHATSAPP_NUMERO = "5511999999999";
   ```
   Formato internacional, só dígitos: `55` (Brasil) + `11` (DDD) + número. Sem `+`, espaços ou traços.

2. **Links dos projetos** — em `index.html`, na seção `Projetos`, troque cada `href="#"`
   pelo link real do case (post, vídeo, estudo de caso, etc.).

3. **Instagram** — já está apontando para `https://instagram.com/codebgs`. Ajuste se mudar o @.

4. **Textos** — todo o conteúdo (sobre, serviços, projetos) está em `index.html`, é só editar.

---

## 📬 Formulário de captação

Como o site é estático (sem servidor), o formulário **monta a mensagem e abre o WhatsApp**
já preenchido com os dados do lead. Funciona no GitHub Pages e na Vercel sem nenhuma configuração.

### Quer receber os leads por e-mail em vez do WhatsApp?
Use o [Formspree](https://formspree.io) (plano gratuito):

1. Crie um formulário no Formspree e copie o endpoint (ex.: `https://formspree.io/f/abcdxyz`).
2. Em `index.html`, adicione ao `<form id="leadForm" ...>`:
   ```html
   action="https://formspree.io/f/SEU_ID" method="POST"
   ```
3. Em `script.js`, remova o `ev.preventDefault()` e a parte que abre o WhatsApp
   (deixe o navegador enviar o formulário normalmente).

---

## 🚀 Publicar na Vercel

### Opção A — pela interface (mais fácil)
1. Suba esta pasta para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. Framework Preset: **Other** (não precisa de build). Clique em **Deploy**.
4. Pronto: a Vercel gera a URL. A cada `git push`, o site atualiza sozinho.

### Opção B — pela linha de comando
```bash
npm i -g vercel
cd codebgs-landing
vercel          # segue o assistente
vercel --prod   # publica em produção
```

---

## 🐙 Subir para o GitHub

```bash
cd codebgs-landing
git init
git add .
git commit -m "Landing page CODEBGs"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/codebgs-landing.git
git push -u origin main
```

> Dica: também dá para hospedar de graça no **GitHub Pages**
> (Settings → Pages → Branch: `main` / root), mas a Vercel entrega HTTPS e domínio próprio com menos passos.

---

## 🎨 Design

- **Paleta:** fundo quase-preto azulado, **indigo** (ação) e **teal** (resultado automatizado).
- **Tipografia:** Space Grotesk (títulos), Inter (texto), JetBrains Mono (rótulos) — todas Google Fonts.
- **Assinatura:** diagrama de fluxo animado no topo, representando o trabalho manual virando fluxo automático.
- Responsivo, acessível por teclado e respeita `prefers-reduced-motion`.
