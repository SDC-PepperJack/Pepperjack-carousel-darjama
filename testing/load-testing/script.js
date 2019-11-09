import http from "k6/http";
import { sleep } from "k6";

export default function() {
  for (let id = 9999999; id >= 9999900; id -= 1) {
    http.get(`http://localhost:3333/?productId=${id}`, {tags: {name: 'ProductCarouselURL'}});
  }
  sleep(1)
};