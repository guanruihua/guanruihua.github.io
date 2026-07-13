import React from 'react'
import { TagType } from './type'
import { isObject, isString } from 'asura-eye'

export const useTag = (list: TagType[]) => {
  const getDefault = () =>
    [...list].map((_) => {
      if (_.select === undefined) _.select = true
      return _
    })

  const [tags, setTags] = React.useState<TagType[]>(getDefault())

  return {
    tags,
    setTags,
    isSelectTag: (newTag: string | TagType) => {
      return (
        tags.find((_) =>
          isObject<TagType>(newTag)
            ? _.value === newTag.value
            : _.value === (newTag as string),
        )?.select ?? false
      )
    },
    setTag: (newTag: string | TagType) => {
      setTags(
        tags.map((tag) => {
          if (isString(newTag) && tag.value === newTag) {
            tag.select = tag?.select ? false : true
          } else if (isObject<TagType>(newTag) && tag.value === newTag.value) {
            tag.select = tag?.select ? false : true
          }
          return tag
        }),
      )
    },
  }
}
