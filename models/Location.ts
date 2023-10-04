export interface LocationDataMin {
  name: string
}

export interface LocationData extends LocationDataMin {
  description: string
}

export interface Location extends LocationData {
  id: number
}

export interface LocationMin extends LocationDataMin {
  id: number
}
