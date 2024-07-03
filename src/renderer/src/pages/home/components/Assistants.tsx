import { FC, useRef } from 'react'
import styled from 'styled-components'
import useAssistants from '@renderer/hooks/useAssistants'
import { Assistant } from '@renderer/types'
import { Button, Dropdown, MenuProps } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { last } from 'lodash'
import AssistantSettingPopup from '@renderer/components/Popups/AssistantSettingPopup'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface Props {
  activeAssistant: Assistant
  onActive: (assistant: Assistant) => void
}

const Assistants: FC<Props> = ({ activeAssistant, onActive }) => {
  const { assistants, removeAssistant, updateAssistant } = useAssistants()
  const targetAssistant = useRef<Assistant | null>(null)
  const menuOpenRef = useRef(false)

  const onDelete = (assistant: Assistant) => {
    removeAssistant(assistant.id)
    setTimeout(() => {
      const _assistant = last(assistants.filter((a) => a.id !== assistant.id))
      _assistant && onActive(_assistant)
    }, 0)
  }

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
      async onClick() {
        if (targetAssistant.current) {
          const _assistant = await AssistantSettingPopup.show({ assistant: targetAssistant.current })
          updateAssistant(_assistant)
        }
      }
    },
    { type: 'divider' },
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        targetAssistant.current && onDelete(targetAssistant.current)
      }
    }
  ]

  return (
    <Container>
      {assistants.map((assistant) => (
        <Dropdown
          key={assistant.id}
          menu={{ items }}
          trigger={['contextMenu']}
          onOpenChange={() => (targetAssistant.current = assistant)}>
          <AssistantItem
            onClick={() => onActive(assistant)}
            className={assistant.id === activeAssistant?.id ? 'active' : ''}>
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement="bottom"
              destroyPopupOnHide
              arrow
              onOpenChange={() => (targetAssistant.current = assistant)}>
              <MenuButton type="text" onClick={(e) => e.stopPropagation()}>
                <MoreOutlined />
              </MenuButton>
            </Dropdown>
            <AssistantName>{assistant.name}</AssistantName>
            <AssistantLastMessage>{assistant.description}</AssistantLastMessage>
          </AssistantItem>
        </Dropdown>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: var(--assistants-width);
  max-width: var(--assistants-width);
  border-right: 0.5px solid var(--color-border);
  height: calc(100vh - var(--navbar-height));
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const AssistantItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  position: relative;
  cursor: pointer;
  .anticon {
    display: none;
  }
  &:hover {
    background-color: var(--color-background-soft);
    .anticon {
      display: block;
      color: var(--color-text-1);
    }
  }
  &.active {
    background-color: var(--color-background-mute);
    cursor: pointer;
  }
`

const AssistantName = styled.div`
  font-size: 14px;
  color: var(--color-text-1);
  font-weight: bold;
`

const AssistantLastMessage = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: var(--color-text-2);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 20px;
`

const MenuButton = styled(Button)`
  position: absolute;
  width: 28px;
  height: 28px;
  padding: 0;
  right: 6px;
  top: 6px;
  font-size: 18px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  z-index: 10;
  .anticon {
    transition: all 0.3s ease;
    color: var(--color-icon);
  }
  &:hover {
    background-color: #ffffff30;
    .anticon {
      color: white;
    }
  }
`

export default Assistants
