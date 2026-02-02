import { Render } from './render'

export default function JSONTableDemo() {
  const json = {
    name: 'gog',
    description:
      'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.',
    homepage: 'https://gogcli.sh',
    metadata: {
      clawdbot: {
        emoji: '🎮',
        requires: { bins: ['gog'] },
        install: [
          {
            id: 'brew',
            kind: 'brew',
            formula: 'steipete/tap/gogcli',
            bins: ['gog'],
            label: 'Install gog (brew)',
          },
        ],
      },
    },
  }

  return (
    <div className="dev__json-table">
      <Render json={json} />
    </div>
  )
}
