## API Basejump: URL Shortener Microservice

Written by: [Nicholas Asimov](https://www.freecodecamp.com/nicholasasimov)  
[FreeCodeCamp](https://www.freecodecamp.com) - [API Project: URL Shortener Microservice](https://www.freecodecamp.com/challenges/url-shortener-microservice)

### User stories
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

### Example creation usage
```
https://reducer.herokuapp.com/new/http://www.example.com
https://reducer.herokuapp.com/new/http://example.com
```

### Example creation output
```
{ "original_url":"http://www.example.com", "short_url":"https://reducer.herokuapp.com/3682" }
```

### Usage
```
https://reducer.herokuapp.com/3682
```
will redirect to:
```
http://www.example.com
```

### [Live Website](https://reducer.herokuapp.com/)
