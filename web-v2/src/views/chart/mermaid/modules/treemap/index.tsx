export default function Page_mermaid_treemap() {
  // treemap-beta
  const conf = {
    type: 'journey',
    title: 'My working day',
    items: [
      {
        label: 'Category A',
        items: [
          { label: 'Item A1', value: 10 },
          { label: 'Item A2', value: 20 },
          {
            label: 'Item A3',
            value: 10,
            items: [
              { label: 'Item C1', value: 10 },
              { label: 'Item C2', value: 20 },
            ],
          },
        ],
      },
      {
        label: 'Category B',
        items: [
          { label: 'Item B1', value: 15 },
          { label: 'Item B2', value: 25 },
        ],
      },
    ],
  }

  const getTotal = (item) => {
    const { value = 0, items = [] } = item
    return items.reduce((total, item) => total + getTotal(item), value || 0)
  }

  const Item = (props: any) => {
    const { item, depth = 0 } = props
    const { label, items = [] } = item
    const value = getTotal(item)

    return (
      <div
        className="border-2 border-white/50 p-1! grid gap-1.5 rounded-sm"
        style={{
          flex: value,
          gridTemplateRows: items.length ? 'auto 1fr' : 'auto',
          gridTemplateColumns: '1fr',
          background: `rgba(0,255,0,.${depth + 1})`,
        }}
      >
        <div
          className={
            depth === 0
              ? 'flex justify-between flex-wrap'
              : 'flex flex-col justify-center items-center h-full'
          }
        >
          <label className="text-[10px]">{label}</label>
          <label className="text-[10px]">{value}</label>
        </div>
        <div
          className={`${items.length ? 'flex' : 'hidden'} flex-wrap gap-1.5`}
        >
          {items.map((item, j) => (
            <Item key={j} item={item} depth={depth + 1} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="animation__mermaid-treemap h-(--height) flex bg-white/10! w-full justify-center items-center">
      <div className="gap-0.5 flex max-w-full w-150 h-50">
        {conf.items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
