/* ============================================================
   CODEBGs — interações da landing page
   ============================================================ */

/* >>> AJUSTE AQUI: número do WhatsApp.
   Pode digitar como quiser — o código remove espaços, +, () e -.
   Precisa ter: 55 (Brasil) + DDD + número. Ex.: 5511999999999 */
const WHATSAPP_NUMERO = "5511922316433";

const WHATSAPP_MSG_PADRAO =
  "Olá, CODEBGs! Encontrei vocês pela landing page e quero automatizar um processo.";

// Deixa só os dígitos do número (evita link quebrado)
const NUM = WHATSAPP_NUMERO.replace(/\D/g, "");

// Monta o link do WhatsApp
const linkWhats = (msg) =>
  `https://wa.me/${NUM}?text=${encodeURIComponent(msg)}`;

// Abre o WhatsApp de forma que o navegador não bloqueie (clique de link real)
function abrirWhatsApp(url) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Reforço: se por algum motivo a aba não abrir, navega na mesma aba
  setTimeout(() => { window.location.href = url; }, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  // Ano no rodapé
  document.getElementById("year").textContent = new Date().getFullYear();

  // Links diretos de WhatsApp (botões do topo e rodapé)
  ["whatsDirect", "whatsFooter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = linkWhats(WHATSAPP_MSG_PADRAO);
  });

  // Nav: sombra ao rolar
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const closeMenu = () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("open");
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Formulário de captação -> monta mensagem e abre o WhatsApp
  const form = document.getElementById("leadForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const campos = ["nome", "contato", "mensagem"];
    let valido = true;
    campos.forEach((id) => {
      const el = document.getElementById(id);
      const vazio = !el.value.trim();
      el.classList.toggle("invalid", vazio);
      if (vazio) valido = false;
    });

    if (!valido) {
      note.textContent = "Preencha os campos obrigatórios para continuar.";
      note.classList.add("err");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const contato = document.getElementById("contato").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const texto =
      `Olá, CODEBGs! Quero automatizar um processo.\n\n` +
      `*Nome:* ${nome}\n` +
      (empresa ? `*Empresa:* ${empresa}\n` : "") +
      `*Contato:* ${contato}\n` +
      `*O que automatizar:* ${mensagem}`;

    note.classList.remove("err");
    note.textContent = "Abrindo o WhatsApp com seus dados…";

    abrirWhatsApp(linkWhats(texto));
    form.reset();
    setTimeout(() => { note.textContent = "Pronto! É só enviar a mensagem no WhatsApp."; }, 1200);
  });

  // Remove estado inválido ao digitar
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => el.classList.remove("invalid"));
  });
});
