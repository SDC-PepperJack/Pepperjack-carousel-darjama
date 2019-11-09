import http from 'k6/http';
import { check, fail } from 'k6';

export default function () {
  for (let id = 10000000; id <= 10019999; id += 1) {
    http.post('http://localhost:3333/products/', JSON.stringify({
      productId: id,
      productItem: 'something made up',
      pictureUrl: ['http://delete.me/nota.jpg'],
      likes: false,
    }), {headers: {"Content-Type": "application/json"}});
  }
}
