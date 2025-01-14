import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_MIN_APPS } from '@renderer/config/minapps'
import { MinAppType, SidebarIcon } from '@renderer/types'

export const DEFAULT_SIDEBAR_ICONS: SidebarIcon[] = [
  'assistants',
  'agents',
  'paintings',
  'translate',
  'minapp',
  'knowledge',
  'files'
]

export interface MinAppsState {
  enabled: MinAppType[]
  disabled: MinAppType[]
  pinned: MinAppType[]
  custom: MinAppType[]
}

const initialState: MinAppsState = {
  enabled: DEFAULT_MIN_APPS,
  disabled: [],
  pinned: [],
  custom: []
}

const minAppsSlice = createSlice({
  name: 'minApps',
  initialState,
  reducers: {
    setMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.enabled = action.payload
    },
    addMinApp: (state, action: PayloadAction<MinAppType>) => {
      state.enabled.push(action.payload)
    },
    setDisabledMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.disabled = action.payload
    },
    setPinnedMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.pinned = action.payload
    },
    setCustomMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.custom = action.payload
    }
  }
})

export const { setMinApps, addMinApp, setDisabledMinApps, setPinnedMinApps, setCustomMinApps } = minAppsSlice.actions

export default minAppsSlice.reducer
