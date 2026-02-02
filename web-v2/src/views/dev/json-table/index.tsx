import { Render } from './render'

export default function JSONTableDemo() {
  const json = {
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
  }

  return (
    <div className="dev__json-table">
      <Render json={json.clawdbot} />
    </div>
  )
}
