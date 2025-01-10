interface IconData {
    src:  [any]
    alt: string
    bgColor: string
  }
  
  export interface CardData {
    type: 'earnings' | 'connect' | 'learn'
    title: string
    mainValue?: string
    subtitle?: string
    subtitleValue?: string
    icons?: IconData[]
    messages?: string[]
    buttonText?: string
  }