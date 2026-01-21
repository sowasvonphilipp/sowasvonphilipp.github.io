<template>
    <div class="footer-container">
        <div class="footer-icon">
            <img src="http://91.99.206.192/logo-modified.png" alt="Logo" width="32" height="32" />
        </div>
        <div class="footer-texts">
            <div class="footer-brand-name">
                DeepAI 
            </div>
            <div class="footer-slogan">
                AI ohne Limits
            </div>
            <div class="disclaimer-container">
                <div class="disclaimer">
                    DeepAI ist ein Hobby Projekt und steht nur im Freunde oder Familienkreis von Server Administratoren mit Codes zur Verfügung. DeepAI ist nicht für kommerzielle Zwecke gedacht und wird ohne jegliche Garantie bereitgestellt. Die ToS und Datenschutzrichtlinien müssen akzeptiert werden, bevor DeepAI genutzt werden kann.
                </div>
            </div>
            <div class="copyright">
                Copyright © 2026-{{ currentYear }} DeepAI. Alle Rechte vorbehalten.
            </div>
        </div>
        <!-- Remove old .footer-actions, keep only .footer-actions-multi for clarity -->
        <div class="footer-actions-multi">
      <div class="footer-category">
        <span class="footer-actions-title">DeepAI</span>
        <NuxtLink to="/ueber-uns" class="footer-animated-link">Über uns</NuxtLink>
        <NuxtLink to="/preise" class="footer-animated-link">Preise</NuxtLink>
        <NuxtLink to="/account" class="footer-animated-link">Account</NuxtLink>
        <NuxtLink to="/connect" class="footer-animated-link">Connect</NuxtLink>
        <NuxtLink to="/chat" class="footer-animated-link">Chat</NuxtLink>
      </div>
      <div class="footer-category">
        <span class="footer-actions-title">Support</span>
        <NuxtLink to="/faq" class="footer-animated-link">FAQ</NuxtLink>
        <NuxtLink to="/help" class="footer-animated-link">Hilfe</NuxtLink>
        <NuxtLink to="/kontakt" class="footer-animated-link">Kontakt</NuxtLink>
        <NuxtLink to="/feedback" class="footer-animated-link">Feedback</NuxtLink>
      </div>
      <div class="footer-category">
        <span class="footer-actions-title">Rechtliches</span>
        <NuxtLink to="/tos" class="footer-animated-link">ToS</NuxtLink>
        <NuxtLink to="/datenschutz" class="footer-animated-link">Datenschutz</NuxtLink>
      </div>
      <div class="footer-category">
        <span class="footer-actions-title">Social</span>
        <a href="https://whatsapp.com/channel/0029VbBx3BgFMqrRNGzHX53t" target="_blank" class="footer-animated-link">Whatsapp</a>
      </div>
    </div>
    </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 28px 20px 20px 20px;
  background-color: #f5f5f5;
  border-top: 1.5px solid #e0e0e0;
  gap: 32px;
}
.footer-icon {
  margin-right: 16px;
  margin-top: 4px;
}
.footer-texts {
  display: flex;
  flex-direction: column;
  min-width: 220px;
}
.footer-brand-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.footer-slogan {
  font-size: 14px;
  color: #555;
}
.disclaimer-container {
  margin-top: 8px;
  margin-bottom: 8px;
  background: #f0f0f0;
  border-radius: 6px;
  padding: 8px 12px;
  max-width: 350px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.disclaimer {
  font-size: 10px;
  color: gray;
  text-align: left;
}
.copyright {
  text-align: center;
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}
.footer-actions-multi {
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
  margin-left: auto;
  padding-top: 8px;
  min-width: 220px;
}
.footer-category {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 120px;
  margin-bottom: 8px;
}
.footer-actions-title {
  font-size: 1.02rem;
  font-weight: 700;
  color: #0c89e3;
  margin-bottom: 2px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.footer-animated-link {
  display: inline-block;
  position: relative;
  font-size: 1.08rem;
  font-weight: 700;
  color: #0c89e3;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-decoration: none;
  padding: 2px 10px;
  border-radius: 8px;
  transition: transform 0.18s, box-shadow 0.18s, background 0.3s;
  box-shadow: 0 1px 8px rgba(12,137,227,0.08);
  cursor: pointer;
  overflow: hidden;
}
.footer-animated-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(.4,2,.6,1);
}
.footer-animated-link:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 4px 24px rgba(12,137,227,0.18), 0 0 8px #f7e01744;
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
.footer-animated-link:hover::after {
  transform: scaleX(1);
}
@media (max-width: 700px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
  .footer-actions {
    margin-left: 0;
    min-width: unset;
    width: 100%;
    align-items: flex-start;
  }
}
@media (max-width: 900px) {
  .footer-actions-multi {
    flex-direction: column;
    gap: 18px;
    min-width: unset;
    width: 100%;
  }
  .footer-category {
    min-width: unset;
    width: 100%;
  }
}
/* Dark mode support */
:root.dark .footer-container {
  background: #181c1f;
  border-top: 1.5px solid #232323;
}
:root.dark .footer-brand-name {
  color: #f7e017;
}
:root.dark .footer-slogan {
  color: #e3f2fd;
}
:root.dark .footer-texts {
  color: #e3f2fd;
}
:root.dark .disclaimer-container {
  background: #232323;
  color: #bbb;
}
:root.dark .copyright {
  color: #aaa;
}
:root.dark .footer-actions-title {
  color: #f7e017;
}
</style>