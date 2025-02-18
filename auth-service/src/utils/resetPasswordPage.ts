export function resetPasswordPage(resetLink: string, username: string) {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
          body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          }
          .email-container {
          max-width: 700px;
          margin: 50px auto;
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          }
          .header {
          background-color: #000;
          color: white;
          text-align: center;
          padding: 30px;
          font-size: 32px;
          font-weight: bold;
          }
          .body {
          padding: 30px;
          color: #333;
          font-size: 20px;
          line-height: 1.8;
          }
          .warning-text {
          color: #666;
          font-size: 16px;
          font-style: italic;
          margin-top: 20px;
          padding: 15px;
          background-color: #fff9e6;
          border-radius: 8px;
          border-left: 4px solid #ffd700;
          }
          .cta-button {
          display: block;
          margin: 40px auto;
          padding: 20px 30px;
          background-color: #000;
          color: white;
          text-decoration: none;
          font-size: 20px;
          font-weight: bold;
          border-radius: 10px;
          text-align: center;
          width: fit-content;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .cta-button:hover {
          background-color: #333;
          }
          .link-fallback {
          margin: 20px 0;
          padding: 15px;
          background-color: #f5f5f5;
          border-radius: 8px;
          word-break: break-all;
          font-size: 14px;
          color: #666;
          }
          .footer {
          text-align: center;
          color: #888;
          padding: 20px 30px;
          font-size: 16px;
          border-top: 1px solid #eee;
          background-color: #f7f7f7;
          }
          .footer a {
          color: #000;
          text-decoration: none;
          font-weight: bold;
          }
  
          /* Responsive Styles */
          @media (max-width: 768px) {
          .email-container {
              margin: 20px;
          }
          .header {
              font-size: 28px;
              padding: 20px;
          }
          .body {
              padding: 20px;
              font-size: 18px;
          }
          .cta-button {
              font-size: 18px;
              padding: 15px 20px;
          }
          .footer {
              font-size: 14px;
              padding: 15px 20px;
          }
          }
  
          @media (max-width: 480px) {
          .header {
              font-size: 24px;
              padding: 15px;
          }
          .body {
              font-size: 16px;
              padding: 15px;
          }
          .cta-button {
              font-size: 16px;
              padding: 10px 15px;
          }
          .link-fallback {
              font-size: 12px;
          }
          .footer {
              font-size: 12px;
              padding: 10px 15px;
          }
          }
      </style>
      </head>
      <body>
      <div class="email-container">
          <div class="header">
          CodeAurora
          </div>
          <div class="body">
          <p>Hello ${username},</p>
          <p>We received a request to reset the password for your CodeAurora account. Click the button below to reset your password. This link will expire in 15 minutes.</p>
          
          <a href="${resetLink}" class="cta-button">
              Reset Password
          </a>

          <div class="warning-text">
              If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </div>

          <p class="link-fallback">
              If the button above doesn't work, copy and paste this link into your browser:<br>
              ${resetLink}
          </p>

          <p>For security reasons, this password reset link will expire in 15 minutes. If you need a new link, you can always request another password reset.</p>
          </div>
          <div class="footer">
          <p>&copy; 2025 CodeAurora. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
          </div>
      </div>
      </body>
      </html>`;
}