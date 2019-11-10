import http from 'k6/http';
import { check, fail } from 'k6';

export default function () {
  for (let id = 10000000; id <= 10019999; id += 1) {
    http.del(`http://localhost:3333/products/${id}`);
  }
}
