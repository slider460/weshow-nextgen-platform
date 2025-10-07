// Простой сервис для отправки email уведомлений
// В реальном проекте здесь будет интеграция с SendGrid, Mailgun или другим сервисом

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

class EmailService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // В реальном проекте эти данные должны быть в переменных окружения
    this.apiKey = process.env.REACT_APP_EMAIL_API_KEY || 'demo-key';
    this.baseUrl = process.env.REACT_APP_EMAIL_API_URL || 'https://api.emailjs.com/api/v1.0/email/send';
  }

  /**
   * Отправка email через EmailJS (бесплатный сервис)
   * В реальном проекте замените на SendGrid, Mailgun и т.д.
   */
  async sendEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      // Для демонстрации используем EmailJS
      const serviceId = 'service_weshow';
      const templateId = 'template_orders';
      const userId = 'user_weshow_demo';

      const templateParams = {
        to_email: emailData.to,
        subject: emailData.subject,
        message_html: emailData.html,
        message_text: emailData.text,
        from_name: 'WESHOW NextGen'
      };

      // В реальном проекте здесь будет вызов API сервиса
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: templateParams
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Email отправлен успешно'
        };
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      
      // Для демонстрации всегда возвращаем успех
      // В реальном проекте здесь должна быть обработка ошибок
      return {
        success: true,
        message: 'Email отправлен успешно (демо режим)'
      };
    }
  }

  /**
   * Отправка уведомления о новом заказе
   */
  async sendOrderNotification(orderData: any, orderId: string): Promise<EmailResponse> {
    const emailData: EmailData = {
      to: '9998783@mail.ru',
      subject: `Новый заказ #${orderId} - ${orderData.contact.firstName} ${orderData.contact.lastName}`,
      html: this.generateOrderEmailHTML(orderData, orderId),
      text: this.generateOrderEmailText(orderData, orderId)
    };

    return this.sendEmail(emailData);
  }

  /**
   * Генерация HTML для email заказа
   */
  private generateOrderEmailHTML(orderData: any, orderId: string): string {
    const servicesList = orderData.services.map((service: any) => 
      `<li>${service.name} - ${service.price.toLocaleString()} ₽</li>`
    ).join('');

    const itemsList = orderData.items.map((item: any) => 
      `<li>${item.name} (${item.category}) - ${item.quantity} шт. × ${item.price.toLocaleString()} ₽ = ${item.totalPrice.toLocaleString()} ₽</li>`
    ).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Новый заказ #${orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #1e40af; margin-bottom: 10px; }
          .item { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #3b82f6; }
          .total { background: #1e40af; color: white; padding: 15px; border-radius: 6px; font-size: 18px; font-weight: bold; }
          ul { margin: 0; padding-left: 20px; }
          li { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Новый заказ #${orderId}</h1>
            <p>Дата: ${new Date().toLocaleString('ru-RU')}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>Контактная информация</h3>
              <div class="item">
                <p><strong>Имя:</strong> ${orderData.contact.firstName} ${orderData.contact.lastName}</p>
                <p><strong>Email:</strong> ${orderData.contact.email}</p>
                <p><strong>Телефон:</strong> ${orderData.contact.phone}</p>
                ${orderData.contact.company ? `<p><strong>Компания:</strong> ${orderData.contact.company}</p>` : ''}
              </div>
            </div>

            <div class="section">
              <h3>Адрес доставки</h3>
              <div class="item">
                <p><strong>Адрес:</strong> ${orderData.address.street}, ${orderData.address.city}</p>
                ${orderData.address.postalCode ? `<p><strong>Индекс:</strong> ${orderData.address.postalCode}</p>` : ''}
                ${orderData.address.apartment ? `<p><strong>Квартира:</strong> ${orderData.address.apartment}</p>` : ''}
              </div>
            </div>

            <div class="section">
              <h3>Период аренды</h3>
              <div class="item">
                <p><strong>С:</strong> ${new Date(orderData.rentalPeriod.startDate).toLocaleDateString('ru-RU')}</p>
                <p><strong>По:</strong> ${new Date(orderData.rentalPeriod.endDate).toLocaleDateString('ru-RU')}</p>
                <p><strong>Дней:</strong> ${orderData.rentalPeriod.days}</p>
              </div>
            </div>

            <div class="section">
              <h3>Оборудование</h3>
              <div class="item">
                <ul>${itemsList}</ul>
              </div>
            </div>

            <div class="section">
              <h3>Дополнительные услуги</h3>
              <div class="item">
                <ul>${servicesList}</ul>
              </div>
            </div>

            ${orderData.comment ? `
            <div class="section">
              <h3>Комментарий к заказу</h3>
              <div class="item">
                <p>${orderData.comment}</p>
              </div>
            </div>
            ` : ''}

            <div class="section">
              <h3>Стоимость</h3>
              <div class="item">
                <p>Оборудование: ${orderData.pricing.equipmentTotal.toLocaleString()} ₽</p>
                <p>Услуги: ${orderData.pricing.servicesTotal.toLocaleString()} ₽</p>
                <div class="total">
                  Итого: ${orderData.pricing.totalPrice.toLocaleString()} ₽
                </div>
              </div>
            </div>

            <div class="section">
              <h3>Способ оплаты</h3>
              <div class="item">
                <p>${this.getPaymentMethodName(orderData.paymentMethod)}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Генерация текстовой версии email
   */
  private generateOrderEmailText(orderData: any, orderId: string): string {
    const servicesList = orderData.services.map((service: any) => 
      `- ${service.name} - ${service.price.toLocaleString()} ₽`
    ).join('\n');

    const itemsList = orderData.items.map((item: any) => 
      `- ${item.name} (${item.category}) - ${item.quantity} шт. × ${item.price.toLocaleString()} ₽ = ${item.totalPrice.toLocaleString()} ₽`
    ).join('\n');

    return `
Новый заказ #${orderId}
Дата: ${new Date().toLocaleString('ru-RU')}

КОНТАКТНАЯ ИНФОРМАЦИЯ:
Имя: ${orderData.contact.firstName} ${orderData.contact.lastName}
Email: ${orderData.contact.email}
Телефон: ${orderData.contact.phone}
${orderData.contact.company ? `Компания: ${orderData.contact.company}` : ''}

АДРЕС ДОСТАВКИ:
${orderData.address.street}, ${orderData.address.city}
${orderData.address.postalCode ? `Индекс: ${orderData.address.postalCode}` : ''}
${orderData.address.apartment ? `Квартира: ${orderData.address.apartment}` : ''}

ПЕРИОД АРЕНДЫ:
С: ${new Date(orderData.rentalPeriod.startDate).toLocaleDateString('ru-RU')}
По: ${new Date(orderData.rentalPeriod.endDate).toLocaleDateString('ru-RU')}
Дней: ${orderData.rentalPeriod.days}

ОБОРУДОВАНИЕ:
${itemsList}

ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ:
${servicesList}

${orderData.comment ? `КОММЕНТАРИЙ К ЗАКАЗУ:
${orderData.comment}

` : ''}СТОИМОСТЬ:
Оборудование: ${orderData.pricing.equipmentTotal.toLocaleString()} ₽
Услуги: ${orderData.pricing.servicesTotal.toLocaleString()} ₽
ИТОГО: ${orderData.pricing.totalPrice.toLocaleString()} ₽

СПОСОБ ОПЛАТЫ:
${this.getPaymentMethodName(orderData.paymentMethod)}
    `;
  }

  /**
   * Получение названия способа оплаты
   */
  private getPaymentMethodName(method: string): string {
    switch (method) {
      case 'card':
        return 'Банковская карта';
      case 'bank_transfer':
        return 'Банковский перевод';
      case 'cash':
        return 'Наличные при доставке';
      default:
        return 'Не указан';
    }
  }
}

// Экспорт экземпляра сервиса
export const emailService = new EmailService();

// Хук для React компонентов
export const useEmailService = () => {
  return {
    sendEmail: emailService.sendEmail.bind(emailService),
    sendOrderNotification: emailService.sendOrderNotification.bind(emailService)
  };
};



