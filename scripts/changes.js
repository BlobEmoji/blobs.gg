import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import RecentChanges from './components/RecentChanges';

const HISTORY_ENDPOINT = 'https://api.mousey.app/v3/emoji/test/changes'; // TODO: repalce with actual endpoint

class Changes {
  constructor(data) {

    this.changes = {}

    for (const change of data) {
      if (['EMOJI_CREATE', 'EMOJI_RENAME', 'EMOJI_UPDATE', 'EMOJI_REMOVE'].includes(change.event)) {
        const date = new Date(change.changed_at);
        const key = [change.guild.id, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()];
        this.changes[key] = (this.changes[key] ?? [])
        this.changes[key].push(change);

      }

    }
  }
}


function mount_history(data) {
  const changes = new Changes(data);

  log('changes:', changes)

  ReactDOM.render(<RecentChanges changes={changes} />, document.getElementById('changestarget'))
}


if (typeof window.fetch !== 'undefined') {
  log('Fetching data...')
  const headers = new Headers();
  headers.append('x-no-bigint', 'true') // TODO we wont need this in prod
  fetch(HISTORY_ENDPOINT, { headers })
    .then((resp) => resp.json())
    .then((history) => {
      mount_history(history)
    })
} else {
  log('No window.fetch.')
}
