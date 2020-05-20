import React from 'react'
import ReactDOM from 'react-dom'

import { log } from './utils'
import RecentChanges from './components/RecentChanges';

const HISTORY_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
    process.env.NODE_ENV === 'development' ?
    'https://api.mousey.app/v3/emoji/test/changes'
    : 'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes';

class Changes {
  constructor(data) {

    this.changes = {}

    for (const change of data) {
      if (['EMOJI_CREATE', 'EMOJI_RENAME', 'EMOJI_UPDATE', 'EMOJI_REMOVE'].includes(change.event)) {
        const date = change.changed_at = new Date(change.changed_at);
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

  ReactDOM.render(<RecentChanges changes={changes.changes} />, document.getElementById('changestarget'))
}


if (typeof window.fetch !== 'undefined') {
  log('Fetching data...')
  fetch(HISTORY_ENDPOINT)
    .then((resp) => resp.json())
    .then((history) => {
      mount_history(history)
    })
} else {
  log('No window.fetch.')
}
