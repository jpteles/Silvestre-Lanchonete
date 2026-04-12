# ============================================
# Script de reorganização - SILVESTRE_LANCHON
# Execute na RAIZ do projeto no PowerShell
# ============================================

Write-Host "🚀 Iniciando reorganização do projeto..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path src/components/layout
New-Item -ItemType Directory -Force -Path src/components/navigation
New-Item -ItemType Directory -Force -Path src/components/menu
New-Item -ItemType Directory -Force -Path src/components/auth
New-Item -ItemType Directory -Force -Path src/components/contact
New-Item -ItemType Directory -Force -Path src/components/ui

Write-Host "✅ Subpastas criadas!" -ForegroundColor Green

Move-Item -Force src/components/Header.tsx        src/components/layout/
Move-Item -Force src/components/Footer.tsx        src/components/layout/
Move-Item -Force src/components/Main.tsx          src/components/layout/
Move-Item -Force src/components/Hero.tsx          src/components/layout/

Move-Item -Force src/components/MainNav.tsx        src/components/navigation/
Move-Item -Force src/components/MobileNav.tsx      src/components/navigation/
Move-Item -Force src/components/MobileNavLinks.tsx src/components/navigation/
Move-Item -Force src/components/NavLink.tsx        src/components/navigation/
Move-Item -Force src/components/DropdownMenu.tsx   src/components/navigation/
Move-Item -Force src/components/UsernameMenu.tsx   src/components/navigation/

Move-Item -Force src/components/Menu.tsx            src/components/menu/
Move-Item -Force src/components/HeaderMenu.tsx      src/components/menu/
Move-Item -Force src/components/WeeklyHighlight.tsx src/components/menu/
Move-Item -Force src/components/DialogMenu.tsx      src/components/menu/

Move-Item -Force src/components/LoginForm.tsx          src/components/auth/
Move-Item -Force src/components/RegisterForm.tsx       src/components/auth/
Move-Item -Force src/components/CreatePasswordForm.tsx src/components/auth/
Move-Item -Force src/components/ResetPasswordForm.tsx  src/components/auth/
Move-Item -Force src/components/VerificationForm.tsx   src/components/auth/
Move-Item -Force src/components/SocialLoginButton.tsx  src/components/auth/

Move-Item -Force src/components/ContactLocal.tsx   src/components/contact/
Move-Item -Force src/components/SocialIcons.tsx    src/components/contact/

Move-Item -Force src/components/Dialog.tsx         src/components/ui/
Move-Item -Force src/components/Sheet.tsx          src/components/ui/
Move-Item -Force src/components/AboutUs.tsx        src/components/ui/

if (Test-Path src/contexts/AuthContent.tsx) {
  Rename-Item src/contexts/AuthContent.tsx AuthContext.tsx
  Write-Host "✅ AuthContent.tsx renomeado para AuthContext.tsx" -ForegroundColor Green
}

if (Test-Path src/ui/App.tsx)       { Move-Item -Force src/ui/App.tsx src/App.tsx }
if (Test-Path src/ui/main.tsx)      { Move-Item -Force src/ui/main.tsx src/main.tsx }
if (Test-Path src/ui/global.css)    { Move-Item -Force src/ui/global.css src/global.css }
if (Test-Path src/ui/types.ts)      { Move-Item -Force src/ui/types.ts src/types.ts }
if (Test-Path src/ui/vite-env.d.ts) { Move-Item -Force src/ui/vite-env.d.ts src/vite-env.d.ts }

Write-Host ""
Write-Host "🎉 Reorganização concluída!" -ForegroundColor Cyan
Write-Host "⚠️  Agora rode: npm run dev para testar" -ForegroundColor Yellow