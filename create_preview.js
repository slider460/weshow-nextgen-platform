// Скрипт для создания превью благодарственного письма
const fs = require('fs');
const path = require('path');

// Создаем простое превью в виде HTML, которое можно будет сконвертировать
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Museum Samara Thank You Letter Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        .letter-preview {
            width: 400px;
            height: 565px;
            background: #ff8c00;
            position: relative;
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
        }
        .letter-content {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            border-radius: 0 0 8px 8px;
            padding: 20px;
            box-sizing: border-box;
        }
        .letter-content::before {
            content: '';
            position: absolute;
            top: -30px;
            left: 0;
            right: 0;
            height: 30px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }
        .emblem {
            width: 40px;
            height: 40px;
            background: #1e40af;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }
        .emblem.green {
            background: #10b981;
        }
        .ministry-text {
            font-size: 12px;
            font-weight: bold;
            color: #374151;
            line-height: 1.2;
        }
        .main-title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #374151;
            margin: 40px 0;
        }
        .reason-text {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #374151;
            line-height: 1.4;
            margin: 20px 0;
        }
        .recipient {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #374151;
            margin: 40px 0;
        }
        .footer {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .signature {
            font-size: 12px;
            color: #374151;
            line-height: 1.3;
        }
        .signature .name {
            font-weight: bold;
        }
        .seal {
            width: 50px;
            height: 50px;
            background: #1e40af;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            text-align: center;
            line-height: 1.1;
        }
        .year {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            font-weight: bold;
            color: #374151;
        }
    </style>
</head>
<body>
    <div class="letter-preview">
        <div class="letter-content">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="emblem">С</div>
                    <div class="ministry-text">
                        МИНИСТЕРСТВО ТУРИЗМА<br>
                        САМАРСКОЙ ОБЛАСТИ
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="emblem green">S</div>
                    <div class="ministry-text">
                        САМАРСКАЯ<br>
                        область
                    </div>
                </div>
            </div>
            
            <div class="main-title">БЛАГОДАРСТВЕННОЕ ПИСЬМО</div>
            
            <div class="reason-text">
                ЗА ВЫСОКИЙ ПРОФЕССИОНАЛИЗМ,<br>
                ЛИЧНЫЙ ВКЛАД<br>
                В ПОДГОТОВКУ И ПРОВЕДЕНИЕ<br>
                РЕГИОНАЛЬНОЙ ВЫСТАВКИ «САМАРА»
            </div>
            
            <div class="recipient">
                Коммуникационная группа<br>
                Триплан
            </div>
            
            <div class="footer">
                <div class="signature">
                    Министр туризма<br>
                    Самарской области<br>
                    <span class="name">Матвеева Е.А.</span>
                </div>
                <div class="seal">
                    МИНИСТЕРСТВО<br>
                    ТУРИЗМА<br>
                    САМАРСКОЙ<br>
                    ОБЛАСТИ
                </div>
            </div>
            
            <div class="year">2025</div>
        </div>
    </div>
</body>
</html>
`;

// Сохраняем HTML файл
fs.writeFileSync('museum_preview.html', htmlContent);
console.log('HTML превью создано: museum_preview.html');
console.log('Откройте файл в браузере и сделайте скриншот для получения JPG');



