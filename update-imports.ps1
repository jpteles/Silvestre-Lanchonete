# ============================================
# Atualiza imports apos reorganizacao
# Execute na RAIZ do projeto no PowerShell
# ============================================

Write-Host "Atualizando imports..." -ForegroundColor Cyan

$files = Get-ChildItem -Recurse -Include *.tsx,*.ts -Path src | Where-Object { $_.FullName -notlike "*node_modules*" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Layout
    $content = $content -replace "components/Header'", "components/layout/Header'"
    $content = $content -replace 'components/Header"', 'components/layout/Header"'
    $content = $content -replace "components/Footer'", "components/layout/Footer'"
    $content = $content -replace 'components/Footer"', 'components/layout/Footer"'
    $content = $content -replace "components/Main'", "components/layout/Main'"
    $content = $content -replace 'components/Main"', 'components/layout/Main"'
    $content = $content -replace "components/Hero'", "components/layout/Hero'"
    $content = $content -replace 'components/Hero"', 'components/layout/Hero"'

    # Navigation
    $content = $content -replace "components/MainNav'", "components/navigation/MainNav'"
    $content = $content -replace 'components/MainNav"', 'components/navigation/MainNav"'
    $content = $content -replace "components/MobileNavLinks'", "components/navigation/MobileNavLinks'"
    $content = $content -replace 'components/MobileNavLinks"', 'components/navigation/MobileNavLinks"'
    $content = $content -replace "components/MobileNav'", "components/navigation/MobileNav'"
    $content = $content -replace 'components/MobileNav"', 'components/navigation/MobileNav"'
    $content = $content -replace "components/NavLink'", "components/navigation/NavLink'"
    $content = $content -replace 'components/NavLink"', 'components/navigation/NavLink"'
    $content = $content -replace "components/DropdownMenu'", "components/navigation/DropdownMenu'"
    $content = $content -replace 'components/DropdownMenu"', 'components/navigation/DropdownMenu"'
    $content = $content -replace "components/UsernameMenu'", "components/navigation/UsernameMenu'"
    $content = $content -replace 'components/UsernameMenu"', 'components/navigation/UsernameMenu"'

    # Menu
    $content = $content -replace "components/Menu'", "components/menu/Menu'"
    $content = $content -replace 'components/Menu"', 'components/menu/Menu"'
    $content = $content -replace "components/HeaderMenu'", "components/menu/HeaderMenu'"
    $content = $content -replace 'components/HeaderMenu"', 'components/menu/HeaderMenu"'
    $content = $content -replace "components/WeeklyHighlight'", "components/menu/WeeklyHighlight'"
    $content = $content -replace 'components/WeeklyHighlight"', 'components/menu/WeeklyHighlight"'
    $content = $content -replace "components/DialogMenu'", "components/menu/DialogMenu'"
    $content = $content -replace 'components/DialogMenu"', 'components/menu/DialogMenu"'

    # Auth
    $content = $content -replace "components/LoginForm'", "components/auth/LoginForm'"
    $content = $content -replace 'components/LoginForm"', 'components/auth/LoginForm"'
    $content = $content -replace "components/RegisterForm'", "components/auth/RegisterForm'"
    $content = $content -replace 'components/RegisterForm"', 'components/auth/RegisterForm"'
    $content = $content -replace "components/CreatePasswordForm'", "components/auth/CreatePasswordForm'"
    $content = $content -replace 'components/CreatePasswordForm"', 'components/auth/CreatePasswordForm"'
    $content = $content -replace "components/ResetPasswordForm'", "components/auth/ResetPasswordForm'"
    $content = $content -replace 'components/ResetPasswordForm"', 'components/auth/ResetPasswordForm"'
    $content = $content -replace "components/VerificationForm'", "components/auth/VerificationForm'"
    $content = $content -replace 'components/VerificationForm"', 'components/auth/VerificationForm"'
    $content = $content -replace "components/SocialLoginButton'", "components/auth/SocialLoginButton'"
    $content = $content -replace 'components/SocialLoginButton"', 'components/auth/SocialLoginButton"'

    # Contact
    $content = $content -replace "components/ContactLocal'", "components/contact/ContactLocal'"
    $content = $content -replace 'components/ContactLocal"', 'components/contact/ContactLocal"'
    $content = $content -replace "components/SocialIcons'", "components/contact/SocialIcons'"
    $content = $content -replace 'components/SocialIcons"', 'components/contact/SocialIcons"'

    # UI
    $content = $content -replace "components/Dialog'", "components/ui/Dialog'"
    $content = $content -replace 'components/Dialog"', 'components/ui/Dialog"'
    $content = $content -replace "components/Sheet'", "components/ui/Sheet'"
    $content = $content -replace 'components/Sheet"', 'components/ui/Sheet"'
    $content = $content -replace "components/AboutUs'", "components/ui/AboutUs'"
    $content = $content -replace 'components/AboutUs"', 'components/ui/AboutUs"'

    # AuthContent para AuthContext
    $content = $content -replace "contexts/AuthContent", "contexts/AuthContext"

    Set-Content $file.FullName $content -NoNewline
    Write-Host "OK: $($file.Name)" -ForegroundColor Green
}

Write-Host "Imports atualizados!" -ForegroundColor Cyan
Write-Host "Rode: npm run dev para testar" -ForegroundColor Yellow