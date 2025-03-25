// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.


const logoutRouting = (method, response) => {
    response.setHeader("Content-Type", "text/html");
    const html = `
    <html>
      <head>
        <title>Shop - Logout</title>
      </head>
      <body>
        <h1>Logout</h1>
        <nav>
          <a href="/">Home  </a><br>
          <a href="/kill">Logout from application</a><br>
        </nav>
      </body>
    </html>
    `;
    response.end(html);
  };
  
  module.exports = logoutRouting;
  