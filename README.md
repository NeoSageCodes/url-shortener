
# URL Shortener

A simple URL shortener built with **Node.js** and **Express.js**. It converts long URLs into short links, redirects users to the original websites, and tracks the number of visits each link receives.

## Features

- Create short links for long URLs.
- Generate unique six-character codes.
- Redirect users to the original URLs.
- Track the number of visits to each link.
- Save link data in a JSON file.
- Validate URLs and check for unknown codes.
- Handle errors when saving data fails.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON file storage

## Project Structure

```text
url-shortener/
├── Controller/
│   └── user.js
├── Middleware/
│   └── validate.js
├── Model/
│   └── database.json
├── Router/
│   └── router.js
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Requirements

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NeoSageCodes/url-shortener
   ```

2. Navigate to the project folder:

   ```bash
   cd url-shortener
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

The server runs at:

`http://localhost:1000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/links` | Create a short link |
| GET | `/:code` | Redirect to the original URL |
| GET | `/links/:code/stats` | View link statistics |

### 1. Create a Short Link

**Request**

```http
POST /links
```

**Request body**

```json
{
  "url": "https://example.com/article"
}
```

**Example response**

```json
{
  "message": "Long URL shortened successfully",
  "code": "Ab3xYz",
  "shortURL": "http://localhost:1000/Ab3xYz"
}
```

The code and short URL shown above are examples. Your application generates them.

### 2. Redirect to the Original URL

**Request**

```http
GET /Ab3xYz
```

Replace `Ab3xYz` with the code generated for your link.

The application redirects the user to the original URL and updates the visit count.

### 3. View Link Statistics

**Request**

```http
GET /links/Ab3xYz/stats
```

**Example response**

```json
{
  "message": "Number of visits received by Ab3xYz gotten successfully",
  "originalURL": "https://example.com/article",
  "Visit_Count": 2
}
```

The visit count depends on how many visits have been recorded for the link.

## Error Responses

| Status Code | Description |
|---|---|
| `200 OK` | The request was successful |
| `400 Bad Request` | The submitted URL is invalid |
| `404 Not Found` | The requested short code does not exist |
| `500 Internal Server Error` | The server failed to complete an operation |

## Data Storage

Link information is stored in `Model/database.json`.

Each link contains:

- `code`: The short code.
- `url`: The original URL.
- `shortURL`: The generated short link.
- `visitCount`: The number of recorded visits.

**Example record**

```json
{
  "code": "Ab3xYz",
  "url": "https://example.com/article",
  "shortURL": "http://localhost:1000/Ab3xYz",
  "visitCount": 0
}
```

The JSON file allows link information to remain available after the server restarts.

## Testing

You can test the API using Postman or Thunder Client.

1. Create a short link using a valid URL.
2. Create another link and check that it receives a different code.
3. Open a short link and confirm that it redirects correctly.
4. Check the visit count using the statistics endpoint.
5. Restart the server and confirm that saved links remain available.
6. Test invalid URLs and unknown short codes.
7. Test what happens when saving data fails.

## Limitations

- Data is stored in a JSON file rather than a database server.
- Short links use `localhost`, so they are intended for local testing.
- The project is for learning and would need further improvements before production use.

## What I Learned

Through this project, I practised:

- Building routes with Express.js.
- Working with HTTP methods and status codes.
- Using middleware to validate requests.
- Working with Promises and `async`/`await`.
- Reading and writing files with Node.js.
- Handling errors and undoing changes when saving fails.
- Saving and retrieving data from a JSON file.

## Author
**Chigoziem Ogbonnaya** - **NeoSageCodes**
