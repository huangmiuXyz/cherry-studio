import { Assistant, Topic } from '@renderer/types'
import { find } from 'lodash'
import { useEffect, useState } from 'react'

let _activeTopic: Topic

export function useActiveTopic(assistant: Assistant) {
  const [activeTopic, setActiveTopic] = useState(_activeTopic || assistant?.topics[0])

  useEffect(() => {
    // activeTopic not in assistant.topics
    if (assistant && !find(assistant.topics, { id: activeTopic?.id })) {
      setActiveTopic(assistant.topics[0])
    }
  }, [activeTopic?.id, assistant])

  return { activeTopic, setActiveTopic }
}

export function getTopic(assistant: Assistant, topicId: string) {
  return assistant?.topics.find((topic) => topic.id === topicId)
}
