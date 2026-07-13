import './index.less'
import { TagType } from './type'

export interface TagsProps {
  tags: TagType[]
  setTag(tag: string | TagType): void
  [key: string]: any
}

export function Tags(props: TagsProps) {
  const { tags = [], setTag } = props
  return (
    <div className="tags">
      {tags.map((tag) => {
        const { value, label, select = false, type = 'default' } = tag
        return (
          <div
            className="tag"
            key={value}
            onDoubleClick={()=>{
              
            }}
            onClick={() => setTag(tag)}
            data-type={type}
            data-select={select}
          >
            {label || value}
          </div>
        )
      })}
    </div>
  )
}
