(function() {
    const projectName = document.title || "Maksym Didukh Project";
    const contactEmail = "didukh.maxim@gmail.com";

    // =========================================================================
    // 🎨 НАСТРОЙКА ЦВЕТОВОЙ ПАЛИТРЫ (Меняйте значения здесь)
    // =========================================================================
    const themeConfig = {
        overlayBg: "rgba(15, 23, 42, 0.85)",     // Полупрозрачный фон модалки (более светлый/мягкий)
        boxBg: "#1e293b",                        // Основной фон карточки (осветлен до slate-800)
        boxText: "#e2e8f0",                      // Основной цвет текста
        boxBorder: "#334155",                    // Границы блоков
        accentColor: "#38bdf8",                  // Акцентный цвет (заголовки, ссылки)
        
        infoBoxBg: "#0f172a",                    // Фон блока с условиями
        infoBoxText: "#cbd5e1",                  // Текст условий
        
        btnPrimaryBg: "#16a34a",                 // Зеленая кнопка "Akzeptieren"
        btnPrimaryHover: "#22c55e",              // Ховер зеленой кнопки
        btnSecondaryBg: "#475569",               // Серая кнопка "Ablehnen"
        btnSecondaryHover: "#64748b",            // Ховер серой кнопки
        
        footerBg: "rgba(30, 41, 59, 0.95)",      // Фон нижнего футера
        footerText: "#94a3b8",                   // Текст футера
        warningText: "#f87171"                   // Цвет предупреждения
    };
    // =========================================================================

    const styleId = 'dm-styles-integrated';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            #dm-legal-consent, .dm-universal-footer {
                all: initial !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
                box-sizing: border-box !important;
            }
            .dm-lock-hard {
                overflow: hidden !important;
                height: 100vh !important;
                width: 100vw !important;
                position: fixed !important;
            }
            #dm-legal-consent {
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 100vh !important;
                background: ${themeConfig.overlayBg} !important;
                z-index: 2147483647 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                backdrop-filter: blur(12px) !important;
                padding: 10px !important; 
            }
            .dm-consent-box {
                background: ${themeConfig.boxBg} !important; 
                color: ${themeConfig.boxText} !important; 
                padding: 24px 20px !important;
                border-radius: 16px !important; 
                max-width: 550px !important; width: 100% !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
                border: 1px solid ${themeConfig.boxBorder} !important; 
                text-align: center !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
            }
            .dm-btn-group { 
                display: flex !important; 
                flex-wrap: wrap !important; 
                gap: 10px !important; 
                justify-content: center !important; 
                margin-top: 20px !important; 
            }
            .dm-btn {
                background: ${themeConfig.btnPrimaryBg} !important; 
                color: #fff !important; 
                border: none !important;
                padding: 12px 20px !important; 
                border-radius: 8px !important; 
                cursor: pointer !important;
                font-weight: bold !important; 
                font-size: 14px !important; 
                transition: background 0.2s, transform 0.1s !important;
                flex: 1 1 120px !important;
            }
            .dm-btn:hover { background: ${themeConfig.btnPrimaryHover} !important; }
            .dm-btn-secondary { background: ${themeConfig.btnSecondaryBg} !important; }
            .dm-btn-secondary:hover { background: ${themeConfig.btnSecondaryHover} !important; }
            
            .dm-universal-footer {
                position: fixed !important; bottom: 0 !important; left: 0 !important; width: 100% !important;
                background: ${themeConfig.footerBg} !important; 
                color: ${themeConfig.footerText} !important; 
                text-align: center !important;
                padding: 8px 5px !important; font-size: 11px !important; z-index: 2147483646 !important;
                border-top: 1px solid ${themeConfig.boxBorder} !important; 
                display: block !important;
            }
            .dm-universal-footer a { 
                color: ${themeConfig.accentColor} !important; 
                text-decoration: none !important; 
                margin: 0 5px !important; 
                font-weight: bold !important; 
            }
            
            @media (max-height: 250px) {
                .dm-universal-footer { position: static !important; }
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    let isAccepted = false;

    function mount() {
        if (isAccepted || document.getElementById('dm-legal-consent')) return;

        document.documentElement.classList.add('dm-lock-hard');

        const modal = document.createElement('div');
        modal.id = 'dm-legal-consent';
        modal.innerHTML = `
           <div class="dm-consent-box">
                <h2 style="color:${themeConfig.accentColor} !important; margin:0 0 10px 0 !important; font-size:22px !important; font-weight:bold !important;">
                    Rechtliche Bestätigung
                </h2>

                <p style="color:${themeConfig.boxText} !important; margin-bottom:15px !important; font-size:14px !important;">
                    Sie nutzen gerade das Projekt: <span style="color:${themeConfig.btnPrimaryHover} !important; font-weight:bold !important;">${projectName}</span>
                </p>

                <div style="margin-bottom:20px !important; font-size:13px !important;">
                    <a href="https://dmamax.vercel.app/impressum.html" target="_blank" style="color:${themeConfig.accentColor} !important;">Impressum</a> |
                    <a href="https://dmamax.vercel.app/datenschutz.html" target="_blank" style="color:${themeConfig.accentColor} !important;">Datenschutz</a>
                </div>

                <div style="text-align:left !important; background:${themeConfig.infoBoxBg} !important; padding:15px !important; border-radius:8px !important; border-left:4px solid ${themeConfig.accentColor} !important; font-size:12.5px !important; line-height:1.6 !important; color:${themeConfig.infoBoxText} !important; margin-bottom:20px !important;">
                    • <b>Inhalte:</b> Nutzer können Inhalte (Texte, Zeichnungen, Nachrichten) erstellen. Diese können im Rahmen der Funktionalität gespeichert werden.<br><br>
                    • <b>Externe Inhalte:</b> Einige Projekte können externe Webseiten oder Dienste einbinden. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich.<br><br>
                    • <b>Verhaltensregeln:</b> Die Nutzung für rechtswidrige, beleidigende oder schädliche Inhalte ist untersagt.<br><br>
                    • <b>Datenverarbeitung:</b> Es können technische Daten (z. B. IP-Adresse, Browser, Zeitstempel) sowie LocalStorage-Daten zur Funktion gespeichert werden.
                </div>

                <p style="color:${themeConfig.warningText} !important; font-weight:bold !important; margin:0 0 15px 0 !important; font-size:14px !important;">
                    Stimmen Sie den Bedingungen für <b>${projectName}</b> zu?
                </p>

                <div class="dm-btn-group">
                    <button class="dm-btn" id="dm-ok-btn">Akzeptieren</button>
                    <button class="dm-btn dm-btn-secondary" onclick="window.location.href='https://google.com'">
                        Ablehnen
                    </button>
                </div>
            </div>`;
        
        document.documentElement.appendChild(modal);

        document.getElementById('dm-ok-btn').addEventListener('click', function() {
            isAccepted = true;
            const el = document.getElementById('dm-legal-consent');
            if (el) el.remove();
            document.documentElement.classList.remove('dm-lock-hard');
            addFooter();
        });
    }

    function addFooter() {
        if (!isAccepted || document.querySelector('.dm-universal-footer')) return;
        const footer = document.createElement('div');
        footer.className = 'dm-universal-footer';
        footer.innerHTML = `
            &copy; 2026 Maksym Didukh | Contact: ${contactEmail} | Project: <b>${projectName}</b> | 
            <a href="https://dmamax.vercel.app/impressum.html" target="_blank">Impressum</a> | 
            <a href="https://dmamax.vercel.app/datenschutz.html" target="_blank">Datenschutz</a>
        `;
        document.documentElement.appendChild(footer);
    }

    setInterval(() => {
        if (!isAccepted) {
            mount();
        } else {
            addFooter();
        }
    }, 1000);

    mount();
})();
