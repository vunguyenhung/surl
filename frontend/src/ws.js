import SocketIO from 'socket.io-client';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_HTTP_URL, API_WS_URL } from './configs';

export default function connectNewURLStream() {
  const wsClient = SocketIO(API_WS_URL);
  return fromEvent(wsClient, 'newURL')
    .pipe(
      map(data => JSON.parse(data)),
      map(({ key }) => `${API_HTTP_URL}/${key}`),
    );
}
