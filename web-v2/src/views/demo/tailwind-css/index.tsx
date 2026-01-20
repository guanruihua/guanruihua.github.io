import React from 'react'
import { usePageState } from './state'
import './index.less'
import { Div } from 'aurad'
import { classNames } from 'harpe'
import { ItemColor } from './module/color'
import './index.css'

export default function TailwindCSS() {
  const { Items, state, setState } = usePageState()

  const item = Items.find((_) => _ === state.select)

  return (
    <div className="demo__tailwind-css">
      <h2 className='mb-3!'>Tailwind CSS v4</h2>
      <div className="flex flex-wrap gap-2 mb-2!">
        {Items.map((item) => (
          <div
            key={item}
            className={classNames(
              'py-1! px-3! flex items-center rounded-xl cursor-pointer transition-all delay-100 ',
              state.select === item
                ? 'bg-green-400/80! text-white!'
                : 'bg-white/30 hover:bg-green-400/60 hover:text-white/80!',
            )}
            onClick={() => setState({ select: item })}
          >
            {item.slice(0, 1).toUpperCase()}
            {item.slice(1)}
          </div>
        ))}
      </div>
      <Div key={item} none={item !== 'color'}>
        <ItemColor />
      </Div>
      {/* <p className="demo__tailwind-css-case1">The quick brown fox...</p> */}
      {/* <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <div>
          <div className="text-xl font-medium text-black dark:text-white">
            ChitChat
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            You have a new message!
          </p>
        </div>
      </div> */}
    </div>
  )
}
