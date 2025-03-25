// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.



const fs = require('fs');
const STATUS_CODE = require('../constants/statusCode');

const renderAddProductPage = (response) => {
  response.setHeader("Content-Type", "text/html");
  const html = `
  <html>
    <head>
      <title>Shop - Add product</title>
    </head>
    <body>
      <h1>Add product</h1>
      <nav>
        <a href="/">Home</a><br>
        <a href="/product/new">Newest product</a><br>
        <a href="/logout">Logout</a><br>
      </nav>
      <form method="POST" action="/product/add">
        <input type="text" name="name" placeholder="Product name" required><br>
        <input type="text" name="description" placeholder="Product description" required>
        <button type="submit">Add Product</button>
      </form>
    </body>
  </html>
  `;
  response.end(html);
};

const renderNewProductPage = (response) => {
  response.setHeader("Content-Type", "text/html");
  fs.readFile('product.txt', 'utf8', (err, data) => {
    let productContent = '';
    if (err || !data) {
      productContent = '<p>Brak nowych produktow</p>';
    } else {
      productContent = `<p>${data}</p>`;
    }
    const html = `
    <html>
      <head>
        <title>Shop - Newest product</title>
      </head>
      <body>
        <h1>Newest product</h1>
        <nav>
          <a href="/">Home</a><br>
          <a href="/product/add">Add product</a><br>
          <a href="/logout">Logout</a><br>
        </nav>
        ${productContent}
      </body>
    </html>
    `;
    response.end(html);
  });
};

const addNewProduct = (request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const parsedBody = {};
    body.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      parsedBody[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    const productData = `Name: ${parsedBody.name}\nDescription: ${parsedBody.description}`;
    fs.writeFile('product.txt', productData, (err) => {
      if (err) {
        console.error('Error writing product:', err);
        response.statusCode = 500;
        response.end('Internal Server Error');
        return;
      }
      response.statusCode = STATUS_CODE.FOUND;
      response.setHeader("Location", "/product/new");
      response.end();
    });
  });
};

const productRouting = (request, response) => {
  const url = request.url;
  const method = request.method;
  
  if (url.includes('/product/add')) {
    if (method === 'GET') {
      renderAddProductPage(response);
    } else if (method === 'POST') {
      addNewProduct(request, response);
    } else {
      response.statusCode = STATUS_CODE.NOT_FOUND;
      response.setHeader("Content-Type", "text/html");
      response.end('<h1>404 Not Found</h1>');
    }
  } else if (url === '/product/new') {
    renderNewProductPage(response);
  } else {
    console.error(`ERROR: requested url ${url} doesn’t exist.`);
    response.statusCode = STATUS_CODE.NOT_FOUND;
    response.setHeader("Content-Type", "text/html");
    response.end('<h1>404 Not Found</h1>');
  }
};

module.exports = productRouting;

