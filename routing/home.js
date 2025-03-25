// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();

// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.


const homeRouting = (method, response) => {
    response.setHeader("Content-Type", "text/html");
    const html = `
    <html>
      <head>
        <title>Shop – Home</title>
      </head>
      <body>
        <h1>Home</h1>
        <nav>
          <a href="/product/add">Add product    </a><br>
          <a href="/product/new">Newest product </a><br>
          <a href="/logout">Logout</a><br>
        </nav>
      </body>
    </html>
    `;
    response.end(html);
  };
  
  module.exports = homeRouting;
  